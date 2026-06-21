import { NextRequest, NextResponse } from "next/server";
import { rateLimit, getClientIp } from "@/lib/rateLimit";

function sanitize(input: unknown): string {
  if (typeof input !== "string") return "";
  return input.replace(/<[^>]*>/g, "").trim().slice(0, 320);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 320;
}

export async function POST(req: NextRequest) {
  // ── Rate limiting ──────────────────────────────────────────
  const ip = getClientIp(req);
  const rl = rateLimit(`newsletter:${ip}`, 5, 3600); // 5 attempts per hour per IP

  if (!rl.success) {
    return NextResponse.json(
      { error: "Too many subscription attempts. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)),
          "X-RateLimit-Limit": String(rl.limit),
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  // ── Validate ───────────────────────────────────────────────
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = sanitize(body.email);
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "A valid email address is required." }, { status: 422 });
  }

  // ── ConvertKit integration ─────────────────────────────────
  const CK_API_KEY = process.env.CONVERTKIT_API_KEY;
  const CK_FORM_ID = process.env.CONVERTKIT_FORM_ID;

  if (CK_API_KEY && CK_FORM_ID) {
    try {
      const res = await fetch(
        `https://api.convertkit.com/v3/forms/${CK_FORM_ID}/subscribe`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ api_key: CK_API_KEY, email }),
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        console.error("[newsletter] ConvertKit error:", data);
        return NextResponse.json({ error: "Subscription failed. Please try again." }, { status: 502 });
      }
    } catch (err) {
      console.error("[newsletter] Network error:", err);
      return NextResponse.json({ error: "Subscription failed. Please try again." }, { status: 502 });
    }
  } else {
    // Dev fallback
    console.log("[newsletter] (no CK keys) Would subscribe:", email);
  }

  return NextResponse.json({ success: true }, { status: 200 });
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
