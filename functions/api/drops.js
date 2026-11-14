import { json, fail, readJson } from "../_lib/http.js";
import { rateLimit } from "../_lib/auth.js";
import { query, execute } from "../_lib/turso.js";
import { seal } from "../_lib/crypto.js";
import { verifyWithCache } from "../_lib/verify/index.js";
import { CATEGORY_BY_ID } from "../_lib/verify/categories.js";
import {
  PUBLIC_DROP_COLUMNS,
  generateDropId,
  isValidAddress,
  normaliseAddress,
  toPublicDrop
} from "../_lib/drops.js";
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const UNLOCK_MODES = /* @__PURE__ */ new Set(["paid_ad", "paid_pure", "free_ad"]);
const onRequestGet = async ({ request, env }) => {
  const limit = rateLimit(request, env, "feed", 240, 60 * 1e3);
  if (!limit.ok) {
    return fail("Feed rate limit reached. Try again in a moment.", 429, {
      retryAfter: limit.retryAfter
    });
  }
  const url = new URL(request.url);
  const limitCount = Math.min(Number(url.searchParams.get("limit") || 40) || 40, 100);
  const cursor = url.searchParams.get("cursor");
  const category = url.searchParams.get("category");
  const where = ["status = 'active'"];
  const args = [];
  if (cursor) {
    where.push("created_at < ?");
    args.push(cursor);
  }
  if (category && CATEGORY_BY_ID.has(category)) {
    where.push("category_id = ?");
    args.push(category);
  }
  try {
    const rows = await query(
      env,
      `SELECT ${PUBLIC_DROP_COLUMNS.join(", ")} FROM drops WHERE ${where.join(" AND ")} ORDER BY created_at DESC LIMIT ?`,
      [...args, limitCount + 1]
    );
    const hasMore = rows.length > limitCount;
    const page = hasMore ? rows.slice(0, limitCount) : rows;
    const drops = page.map(toPublicDrop);
    const nextCursor = hasMore ? page[page.length - 1]?.created_at ?? null : null;
    return json({
      drops,
      nextCursor,
      hasMore
    });
  } catch (err) {
    return fail(err instanceof Error ? err.message : "Could not load drops.", 500);
  }
};
const onRequestPost = async ({ request, env }) => {
  const limit = rateLimit(request, env, "create", 20, 60 * 60 * 1e3);
  if (!limit.ok) {
    return fail("Creation rate limit reached. Try again later.", 429, {
      retryAfter: limit.retryAfter
    });
  }
  const body = await readJson(request);
  if (!body) return fail("Invalid request body.");
  const title = (body.title || "").trim();
  const targetUrl = (body.url || "").trim();
  const categoryId = (body.categoryId || "").trim();
  const unlockMode = (body.unlockMode || "paid_ad").trim();
  if (title.length < 3 || title.length > 120) {
    return fail("Give the resource a title between 3 and 120 characters.");
  }
  if (!targetUrl || targetUrl.length > 2048) {
    return fail("A valid link is required.");
  }
  if (!CATEGORY_BY_ID.has(categoryId)) {
    return fail("Choose a resource category.");
  }
  if (!UNLOCK_MODES.has(unlockMode)) {
    return fail("Unknown unlock mode.");
  }
  const isFree = unlockMode === "free_ad";
  const sellerWallet = normaliseAddress(body.sellerWallet || ZERO_ADDRESS);
  const tokenAddress = normaliseAddress(body.tokenAddress || ZERO_ADDRESS);
  const tokenSymbol = (body.tokenSymbol || "POL").trim().slice(0, 12);
  const tokenDecimals = Number.isInteger(body.tokenDecimals) ? Number(body.tokenDecimals) : 18;
  const price = String(body.price ?? "0").trim();
  if (!isFree) {
    if (!isValidAddress(sellerWallet)) {
      return fail("Enter a valid payout wallet address.");
    }
    if (!isValidAddress(tokenAddress)) {
      return fail("Invalid token address.");
    }
    if (!/^\d+(\.\d+)?$/.test(price) || Number(price) <= 0) {
      return fail("Price must be greater than zero.");
    }
  }
  let report;
  try {
    report = await verifyWithCache(env, {
      url: targetUrl,
      categoryId,
      title
    });
  } catch (err) {
    return fail(
      err instanceof Error ? `Verification failed: ${err.message}` : "Verification failed. Try again.",
      502
    );
  }
  if (report.verdict === "Blocked") {
    return json(
      {
        error: "This link was blocked by the verification engine.",
        report
      },
      422
    );
  }
  const id = generateDropId();
  const sealed = await seal(env, id, targetUrl);
  const createdAt = new Date().toISOString();
  const summary = report.reason.slice(0, 160);
  try {
    // The public row and the sealed URL live in separate tables, so the
    // browser's scoped read token can never reach the ciphertext.
    await execute(
      env,
      `INSERT INTO drops (
         id, title, summary, category_id, category, seller_wallet,
         token_address, token_symbol, token_decimals, price, unlock_mode, verdict,
         verdict_reason, verdict_score, verdict_source, is_admin_ad,
         status, created_at
       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 'active', ?)`,
      [
        id,
        title,
        summary,
        categoryId,
        CATEGORY_BY_ID.get(categoryId).label,
        sellerWallet,
        tokenAddress,
        tokenSymbol,
        tokenDecimals,
        isFree ? "0" : price,
        unlockMode,
        report.verdict,
        report.reason,
        report.score,
        report.source,
        createdAt
      ]
    );
    await execute(
      env,
      "INSERT INTO drop_secrets (drop_id, ciphertext, iv) VALUES (?, ?, ?)",
      [id, sealed.ciphertext, sealed.iv]
    );
  } catch (err) {
    return fail(err instanceof Error ? err.message : "Could not store the drop.", 500);
  }
  const row = {
    id,
    title,
    summary,
    category_id: categoryId,
    category: CATEGORY_BY_ID.get(categoryId).label,
    seller_wallet: sellerWallet,
    token_address: tokenAddress,
    token_symbol: tokenSymbol,
    token_decimals: tokenDecimals,
    price: isFree ? "0" : price,
    unlock_mode: unlockMode,
    verdict: report.verdict,
    verdict_reason: report.reason,
    verdict_score: report.score,
    verdict_source: report.source,
    is_admin_ad: 0,
    status: "active",
    created_at: createdAt
  };
  return json(
    {
      drop: toPublicDrop(row),
      report,
      // Echoed back so the seller can confirm what was locked.
      lockedUrl: targetUrl
    },
    201
  );
};
export {
  onRequestGet,
  onRequestPost
};
