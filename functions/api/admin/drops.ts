/**
 * POST /api/admin/drops
 *
 * Publishes a platform-sponsored drop: free to unlock, paid for by ad
 * revenue, and marked as platform content in the feed.
 *
 * Requires the admin token. The token lives in a Cloudflare secret and is
 * typed once by the operator — it is never embedded in the client bundle.
 */
import type { DropRow, Env } from "../../_lib/types";
import { json, fail, readJson } from "../../_lib/http";
import { isAdmin } from "../../_lib/auth";
import { execute } from "../../_lib/turso";
import { seal } from "../../_lib/crypto";
import { generateDropId, toPublicDrop } from "../../_lib/drops";
import { CATEGORY_BY_ID } from "../../_lib/verify/categories";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

interface AdminDropBody {
  title?: string;
  categoryId?: string;
  url?: string;
}

export const onRequestPost = async ({ request, env }: { request: Request; env: Env }) => {
  if (!isAdmin(request, env)) {
    return fail("Admin authorisation required.", 401);
  }

  const body = await readJson<AdminDropBody>(request);
  const title = (body?.title || "").trim();
  const targetUrl = (body?.url || "").trim();
  const categoryId = (body?.categoryId || "download").trim();

  if (title.length < 3 || title.length > 120) {
    return fail("Give the drop a title between 3 and 120 characters.");
  }
  if (!targetUrl || targetUrl.length > 2048) {
    return fail("A valid target link is required.");
  }
  if (!CATEGORY_BY_ID.has(categoryId)) {
    return fail("Choose a valid category.");
  }

  const id = generateDropId();
  const sealed = await seal(env, id, targetUrl);
  const createdAt = new Date().toISOString();
  const reason = "Platform-published drop, curated by the LockDrop team.";

  try {
    await execute(
      env,
      `INSERT INTO drops (
         id, title, summary, category_id, category, ciphertext, iv, seller_wallet,
         token_address, token_symbol, token_decimals, price, unlock_mode, verdict,
         verdict_reason, verdict_score, verdict_source, verdict_report, is_admin_ad,
         status, created_at
       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 'active', ?)`,
      [
        id,
        title,
        reason,
        categoryId,
        CATEGORY_BY_ID.get(categoryId)!.label,
        sealed.ciphertext,
        sealed.iv,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        "POL",
        18,
        "0",
        "free_ad",
        "Trusted",
        reason,
        0,
        "platform",
        JSON.stringify({ verdict: "Trusted", reason, source: "platform" }),
        createdAt,
      ]
    );
  } catch (err) {
    return fail(err instanceof Error ? err.message : "Could not publish the drop.", 500);
  }

  const row: DropRow = {
    id,
    title,
    summary: reason,
    category_id: categoryId,
    category: CATEGORY_BY_ID.get(categoryId)!.label,
    ciphertext: sealed.ciphertext,
    iv: sealed.iv,
    seller_wallet: ZERO_ADDRESS,
    token_address: ZERO_ADDRESS,
    token_symbol: "POL",
    token_decimals: 18,
    price: "0",
    unlock_mode: "free_ad",
    verdict: "Trusted",
    verdict_reason: reason,
    verdict_score: 0,
    verdict_source: "platform",
    verdict_report: "{}",
    is_admin_ad: 1,
    status: "active",
    created_at: createdAt,
  };

  return json({ drop: toPublicDrop(row) }, 201);
};
