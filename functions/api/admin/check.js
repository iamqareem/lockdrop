/**
 * GET /api/admin/check
 *
 * Confirms an admin token without side effects. Used by the admin panel to
 * validate the token the operator typed before letting them in.
 */
import { json, fail } from "../../_lib/http.js";
import { isAdmin, rateLimit } from "../../_lib/auth.js";

export const onRequestGet = async ({ request, env }) => {
  // This endpoint is a guess oracle for the admin token — it must not be
  // unthrottled, or the token could be brute-forced against a live site.
  const limit = rateLimit(request, env, "admin-check", 10, 10 * 60 * 1000);
  if (!limit.ok) {
    return fail("Too many attempts. Try again later.", 429, {
      retryAfter: limit.retryAfter,
    });
  }

  if (!isAdmin(request, env)) {
    return fail("Admin authorisation required.", 401);
  }
  return json({ ok: true });
};
