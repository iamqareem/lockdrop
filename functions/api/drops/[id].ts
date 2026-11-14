/**
 * /api/drops/:id
 *
 *   GET    -> a single drop's public metadata (never the ciphertext)
 *   DELETE -> remove a drop (admin only)
 */
import type { DropRow, Env } from "../../_lib/types";
import { json, fail } from "../../_lib/http";
import { isAdmin } from "../../_lib/auth";
import { query, execute } from "../../_lib/turso";
import { DROP_COLUMNS, toPublicDrop } from "../../_lib/drops";

export const onRequestGet = async ({
  params,
  env,
}: {
  params: { id: string };
  env: Env;
}) => {
  const id = (params.id || "").trim();
  if (!id) return fail("Missing drop id.");

  try {
    const rows = await query<DropRow>(
      env,
      `SELECT ${DROP_COLUMNS} FROM drops WHERE id = ? LIMIT 1`,
      [id]
    );
    const row = rows[0];
    if (!row) return fail("Drop not found.", 404);
    return json({ drop: toPublicDrop(row) });
  } catch (err) {
    return fail(err instanceof Error ? err.message : "Could not load the drop.", 500);
  }
};

export const onRequestDelete = async ({
  request,
  params,
  env,
}: {
  request: Request;
  params: { id: string };
  env: Env;
}) => {
  if (!isAdmin(request, env)) {
    return fail("Admin authorisation required.", 401);
  }

  const id = (params.id || "").trim();
  if (!id) return fail("Missing drop id.");

  try {
    const removed = await execute(env, "DELETE FROM drops WHERE id = ?", [id]);
    if (!removed) return fail("Drop not found.", 404);
    return json({ ok: true, id });
  } catch (err) {
    return fail(err instanceof Error ? err.message : "Could not delete the drop.", 500);
  }
};
