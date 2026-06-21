import { NextRequest, NextResponse } from "next/server";
import { rateLimit, getClientIp } from "@/lib/rateLimit";

// Simple sanitizer — strip HTML tags and control characters
function sanitize(input: unknown): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/<[^>]*>/g, "")           // strip HTML tags
    .replace(/[\x00-\x08\x0B-\x1F]/g, "") // strip control chars (allow \t \n)
    .trim()
    .slice(0, 2000);                   // max length
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 320;
}

export async function POST(req: NextRequest) {
  // ── Rate limiting ──────────────────────────────────────────
  const ip = getClientIp(req);
  const rl = rateLimit(`contact:${ip}`, 3, 300); // 3 submissions per 5 minutes per IP

  if (!rl.success) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a few minutes before trying again." },
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

  // ── Parse body ─────────────────────────────────────────────
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // ── Validate & sanitize inputs ─────────────────────────────
  const name = sanitize(body.name);
  const email = sanitize(body.email);
  const subject = sanitize(body.subject);
  const message = sanitize(body.message);

  const errors: string[] = [];
  if (!name || name.length < 2) errors.push("Name must be at least 2 characters.");
  if (!isValidEmail(email)) errors.push("A valid email address is required.");
  if (!subject || subject.length < 3) errors.push("Subject must be at least 3 characters.");
  if (!message || message.length < 10) errors.push("Message must be at least 10 characters.");

  if (errors.length > 0) {
    return NextResponse.json({ error: errors.join(" ") }, { status: 422 });
  }

  // ── Send email (Resend) ────────────────────────────────────
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "hello@rawpost.com";

  if (RESEND_API_KEY) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Raw Post Contact <noreply@rawpost.com>",
          to: [TO_EMAIL],
          reply_to: email,
          subject: `[Contact] ${subject}`,
          text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        }),
      });

      if (!res.ok) {
        console.error("[contact] Resend API error:", await res.text());
        return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 502 });
      }
    } catch (err) {
      console.error("[contact] Network error:", err);
      return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 502 });
    }
  } else {
    // Development fallback — log to console
    console.log("[contact] (no RESEND_API_KEY) Would send:", { name, email, subject, message });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}

// Block non-POST methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
