/**
 * Reading drops.
 *
 * These queries go straight to Turso from the browser — no Functions in the
 * path — using the read-only token in `public/turso.json`.
 *
 * The projection and the fee tiers come from `shared/drop.js`, which the
 * server imports too, so the two data paths cannot drift.
 */
import { query } from "./turso.js";
import { PUBLIC_DROP_COLUMNS, toPublicDrop } from "./shared/drop.js";

const COLUMNS = PUBLIC_DROP_COLUMNS.join(", ");

/**
 * The public drop feed, newest first.
 * `cursor` is the `created_at` of the last row from the previous page.
 */
export async function listDrops({ category = "", cursor = "", limit = 40 } = {}) {
  const where = ["status = 'active'"];
  const args = [];

  if (cursor) {
    where.push("created_at < ?");
    args.push(cursor);
  }
  if (category) {
    where.push("category_id = ?");
    args.push(category);
  }

  const rows = await query(
    `SELECT ${COLUMNS} FROM drops WHERE ${where.join(" AND ")} ORDER BY created_at DESC LIMIT ?`,
    [...args, limit + 1]
  );

  const hasMore = rows.length > limit;
  const page = hasMore ? rows.slice(0, limit) : rows;

  return {
    drops: page.map(toPublicDrop),
    nextCursor: hasMore ? page[page.length - 1]?.created_at ?? null : null,
    hasMore,
  };
}

/** A single drop's public metadata. */
export async function getDrop(id) {
  const rows = await query(`SELECT ${COLUMNS} FROM drops WHERE id = ? LIMIT 1`, [
    id,
  ]);
  return rows.length ? toPublicDrop(rows[0]) : null;
}
