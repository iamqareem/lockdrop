import { json, fail } from "../../_lib/http.js";
import { isAdmin } from "../../_lib/auth.js";
import { query, execute } from "../../_lib/turso.js";
import { PUBLIC_DROP_COLUMNS, toPublicDrop } from "../../_lib/drops.js";
const onRequestGet = async ({
  params,
  env
}) => {
  const id = (params.id || "").trim();
  if (!id) return fail("Missing drop id.");
  try {
    const rows = await query(
      env,
      `SELECT ${PUBLIC_DROP_COLUMNS.join(", ")} FROM drops WHERE id = ? LIMIT 1`,
      [id]
    );
    const row = rows[0];
    if (!row) return fail("Drop not found.", 404);
    return json({ drop: toPublicDrop(row) });
  } catch (err) {
    return fail(err instanceof Error ? err.message : "Could not load the drop.", 500);
  }
};
const onRequestDelete = async ({
  request,
  params,
  env
}) => {
  if (!isAdmin(request, env)) {
    return fail("Admin authorisation required.", 401);
  }
  const id = (params.id || "").trim();
  if (!id) return fail("Missing drop id.");
  try {
    const removed = await execute(env, "DELETE FROM drop_secrets WHERE drop_id = ?", [id]);
    await execute(env, "DELETE FROM drops WHERE id = ?", [id]);
    if (!removed) return fail("Drop not found.", 404);
    return json({ ok: true, id });
  } catch (err) {
    return fail(err instanceof Error ? err.message : "Could not delete the drop.", 500);
  }
};
export {
  onRequestDelete,
  onRequestGet
};
