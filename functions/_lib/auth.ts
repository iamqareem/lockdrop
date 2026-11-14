/**
 * Admin authentication and lightweight abuse protection.
 *
 * The old build hard-coded the admin PIN in client-side JavaScript, which
 * made the admin panel public to anyone who opened the bundle. The PIN is now
 * replaced by a server-side secret: the browser holds a token the operator
 * types once, and every privileged route compares it in constant time.
 */
import type { Env } from "./types";
import { clientIp } from "./http";

/** Constant-time string comparison that does not leak length via early exit. */
export function timingSafeEqual(a: string, b: string): boolean {
  const len = Math.max(a.length, b.length);
  let diff = a.length ^ b.length;
  for (let i = 0; i < len; i += 1) {
    diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  return diff === 0;
}

export function isAdmin(request: Request, env: Env): boolean {
  const expected = (env.ADMIN_TOKEN || "").trim();
  if (!expected) return false;
  const header = request.headers.get("x-admin-token") || "";
  const bearer = request.headers.get("authorization") || "";
  const token = header || (bearer.startsWith("Bearer ") ? bearer.slice(7) : "");
  return token.length > 0 && timingSafeEqual(token, expected);
}

/* ------------------------------------------------------------------------- */
/* Rate limiting                                                             */
/* ------------------------------------------------------------------------- */

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

/**
 * Fixed-window limiter kept in isolate memory. It is a speed bump against
 * casual abuse, not a security boundary — the real boundary is the on-chain
 * payment check.
 */
export function rateLimit(
  request: Request,
  env: Env,
  bucket: string,
  limit: number,
  windowMs: number
): { ok: boolean; remaining: number; retryAfter: number } {
  const key = `${bucket}:${clientIp(request)}`;
  const now = Date.now();
  const entry = buckets.get(key);

  if (!entry || entry.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, retryAfter: 0 };
  }

  if (entry.count >= limit) {
    return {
      ok: false,
      remaining: 0,
      retryAfter: Math.ceil((entry.resetAt - now) / 1000),
    };
  }

  entry.count += 1;
  return { ok: true, remaining: limit - entry.count, retryAfter: 0 };
}

/** Periodic sweep so the in-memory map cannot grow without bound. */
export function pruneBuckets(now = Date.now()): void {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}
