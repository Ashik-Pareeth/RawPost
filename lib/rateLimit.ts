/**
 * Simple in-memory rate limiter for Next.js API routes.
 * Uses a sliding window approach. In production, replace with
 * Redis (e.g. @upstash/ratelimit) for multi-instance deployments.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

/** Clean up expired entries to prevent memory leaks */
function cleanup() {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (entry.resetAt < now) store.delete(key);
  }
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: number;
  limit: number;
}

/**
 * Check if a given identifier (e.g. IP) has exceeded the rate limit.
 * @param identifier - Unique key per client (e.g. IP address)
 * @param limit      - Max requests per window (default: env RATE_LIMIT_MAX or 5)
 * @param windowSec  - Window duration in seconds (default: env RATE_LIMIT_WINDOW or 60)
 */
export function rateLimit(
  identifier: string,
  limit = parseInt(process.env.RATE_LIMIT_MAX || "5", 10),
  windowSec = parseInt(process.env.RATE_LIMIT_WINDOW || "60", 10)
): RateLimitResult {
  // Periodically clean up old entries (1% chance per call — cheap enough)
  if (Math.random() < 0.01) cleanup();

  const now = Date.now();
  const windowMs = windowSec * 1000;
  const key = `rl:${identifier}`;

  const existing = store.get(key);

  if (!existing || existing.resetAt < now) {
    // First request in this window
    const entry: RateLimitEntry = { count: 1, resetAt: now + windowMs };
    store.set(key, entry);
    return { success: true, remaining: limit - 1, resetAt: entry.resetAt, limit };
  }

  if (existing.count >= limit) {
    return { success: false, remaining: 0, resetAt: existing.resetAt, limit };
  }

  existing.count++;
  return { success: true, remaining: limit - existing.count, resetAt: existing.resetAt, limit };
}

/** Get the real client IP from Next.js request headers */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}
