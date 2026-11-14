import { clientIp } from "./http.js";
function timingSafeEqual(a, b) {
  const len = Math.max(a.length, b.length);
  let diff = a.length ^ b.length;
  for (let i = 0; i < len; i += 1) {
    diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  return diff === 0;
}
function isAdmin(request, env) {
  const expected = (env.ADMIN_TOKEN || "").trim();
  if (!expected) return false;
  const header = request.headers.get("x-admin-token") || "";
  const bearer = request.headers.get("authorization") || "";
  const token = header || (bearer.startsWith("Bearer ") ? bearer.slice(7) : "");
  return token.length > 0 && timingSafeEqual(token, expected);
}
const buckets = /* @__PURE__ */ new Map();
function rateLimit(request, env, bucket, limit, windowMs) {
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
      retryAfter: Math.ceil((entry.resetAt - now) / 1e3)
    };
  }
  entry.count += 1;
  return { ok: true, remaining: limit - entry.count, retryAfter: 0 };
}
function pruneBuckets(now = Date.now()) {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}
export {
  isAdmin,
  pruneBuckets,
  rateLimit,
  timingSafeEqual
};
