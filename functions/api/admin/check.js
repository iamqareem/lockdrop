/**
 * GET /api/admin/check
 *
 * Confirms an admin token without side effects. Used by the admin panel to
 * validate the token the operator typed before letting them in.
 */
import { json, fail } from "../../_lib/http.js";
import { isAdmin } from "../../_lib/auth.js";

export const onRequestGet = async ({ request, env }) => {
  if (!isAdmin(request, env)) {
    return fail("Admin authorisation required.", 401);
  }
  return json({ ok: true });
};
