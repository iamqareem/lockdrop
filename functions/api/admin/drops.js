import { json, fail, readJson } from "../../_lib/http.js";
import { isAdmin } from "../../_lib/auth.js";
import { execute } from "../../_lib/turso.js";
import { seal } from "../../_lib/crypto.js";
import { generateDropId, toPublicDrop } from "../../_lib/drops.js";
import { CATEGORY_BY_ID } from "../../_lib/verify/categories.js";
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const onRequestPost = async ({ request, env }) => {
  if (!isAdmin(request, env)) {
    return fail("Admin authorisation required.", 401);
  }
  const body = await readJson(request);
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
  const createdAt = (/* @__PURE__ */ new Date()).toISOString();
  const reason = "Platform-published drop, curated by the LockDrop team.";
  try {
    await execute(
      env,
      `INSERT INTO drops (
         id, title, summary, category_id, category, seller_wallet,
         token_address, token_symbol, token_decimals, price, unlock_mode, verdict,
         verdict_reason, verdict_score, verdict_source, is_admin_ad,
         status, created_at
       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 'active', ?)`,
      [
        id,
        title,
        reason,
        categoryId,
        CATEGORY_BY_ID.get(categoryId).label,
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
        createdAt
      ]
    );
    await execute(
      env,
      "INSERT INTO drop_secrets (drop_id, ciphertext, iv) VALUES (?, ?, ?)",
      [id, sealed.ciphertext, sealed.iv]
    );
  } catch (err) {
    return fail(err instanceof Error ? err.message : "Could not publish the drop.", 500);
  }
  const row = {
    id,
    title,
    summary: reason,
    category_id: categoryId,
    category: CATEGORY_BY_ID.get(categoryId).label,
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
    is_admin_ad: 1,
    status: "active",
    created_at: createdAt
  };
  return json({ drop: toPublicDrop(row) }, 201);
};
export {
  onRequestPost
};
