import { json, fail, readJson } from "../_lib/http.js";
import { query, execute } from "../_lib/turso.js";
import { unseal } from "../_lib/crypto.js";
import { verifyEscrowPayment, toUnits } from "../_lib/polygon.js";
import { expectedFeeBps } from "../_lib/tiers.js";
import { rateLimit } from "../_lib/auth.js";
const AD_TASK_SECONDS = 8;
function generateId(length = 16) {
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  let id = "";
  const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i += 1) id += alphabet[bytes[i] % alphabet.length];
  return id;
}
async function loadDrop(env, id) {
  const rows = await query(
    env,
    `SELECT d.id, d.title, d.summary, d.category_id, d.category, d.seller_wallet,
            d.token_address, d.token_symbol, d.token_decimals, d.price, d.unlock_mode,
            d.verdict, d.verdict_reason, d.verdict_score, d.verdict_source,
            d.is_admin_ad, d.status, d.created_at,
            s.ciphertext, s.iv
       FROM drops d
       LEFT JOIN drop_secrets s ON s.drop_id = d.id
      WHERE d.id = ? LIMIT 1`,
    [id]
  );
  return rows[0] ?? null;
}
const onRequestPost = async ({ request, env }) => {
  const limit = rateLimit(request, env, "unlock", 60, 10 * 60 * 1e3);
  if (!limit.ok) {
    return fail("Too many unlock attempts. Try again shortly.", 429, {
      retryAfter: limit.retryAfter
    });
  }
  const body = await readJson(request);
  const dropId = (body?.dropId || "").trim();
  if (!dropId) return fail("Missing drop id.");
  let drop = null;
  try {
    drop = await loadDrop(env, dropId);
  } catch (err) {
    return fail(err instanceof Error ? err.message : "Could not load the drop.", 500);
  }
  if (!drop) return fail("Drop not found.", 404);
  if (drop.status !== "active") return fail("This drop is no longer available.", 410);
  const isFree = drop.unlock_mode === "free_ad" || Boolean(drop.is_admin_ad);
  const method = body?.method;
  const taskId = (body?.taskId || "").trim();
  // A sponsored task is the whole unlock for a free drop, and the documented
  // alternative to paying for a `paid_ad` drop. `paid_pure` never offers it.
  const adAllowed = isFree || drop.unlock_mode === "paid_ad";
  const wantsAd = method === "ad" || Boolean(taskId);
  if (wantsAd && !adAllowed) {
    return fail("This drop does not offer a sponsored unlock. Pay to unlock it.", 400);
  }
  if (!isFree && !wantsAd) {
    const txHash = (body?.txHash || "").trim();
    if (!txHash) return fail("A transaction hash is required to unlock this drop.");
    const escrowAddress = (env.ESCROW_ADDRESS || "").trim();
    if (!escrowAddress) {
      return fail("The escrow contract is not configured on this deployment.", 503);
    }
    let amountUnits;
    try {
      amountUnits = toUnits(drop.price, drop.token_decimals);
    } catch {
      return fail("The stored price for this drop is invalid.", 500);
    }
    const feeBps = expectedFeeBps(drop.unlock_mode);
    if (feeBps === null) {
      return fail("This drop does not accept payments.", 400);
    }
    const payment = await verifyEscrowPayment(env, txHash, {
      escrowAddress,
      dropId: drop.id,
      sellerWallet: drop.seller_wallet,
      tokenAddress: drop.token_address,
      amountUnits,
      expectedFeeBps: feeBps
    });
    if (!payment.ok) {
      return json({ error: payment.reason, verified: false }, 402);
    }
    let url2;
    try {
      url2 = await unseal(env, drop.id, drop.ciphertext, drop.iv);
    } catch {
      return fail("The stored link could not be decrypted.", 500);
    }
    await execute(
      env,
      "INSERT INTO unlocks (id, drop_id, buyer, tx_hash, method, created_at) VALUES (?, ?, ?, ?, ?, ?)",
      [generateId(), drop.id, "", payment.txHash ?? txHash, "chain", (/* @__PURE__ */ new Date()).toISOString()]
    ).catch(() => void 0);
    return json({ url: url2, method: "chain", txHash: payment.txHash ?? txHash });
  }
  if (!wantsAd) {
    return fail("Start the sponsored task before unlocking.", 428);
  }
  if (method === "ad") {
    const taskId2 = generateId();
    const earliestAt = new Date(Date.now() + AD_TASK_SECONDS * 1e3).toISOString();
    await execute(
      env,
      "INSERT INTO ad_tasks (id, drop_id, earliest_at, created_at) VALUES (?, ?, ?, ?)",
      [taskId2, drop.id, earliestAt, (/* @__PURE__ */ new Date()).toISOString()]
    ).catch(() => void 0);
    return json({
      taskId: taskId2,
      earliestAt,
      waitSeconds: AD_TASK_SECONDS
    });
  }
  const tasks = await query(
    env,
    "SELECT id, drop_id, earliest_at FROM ad_tasks WHERE id = ? AND drop_id = ? LIMIT 1",
    [taskId, drop.id]
  );
  const task = tasks[0];
  if (!task) return fail("That sponsored task has expired. Start it again.", 410);
  const earliest = new Date(task.earliest_at).getTime();
  if (Date.now() < earliest) {
    return json(
      {
        error: "The sponsored task is still running.",
        retryAfter: Math.ceil((earliest - Date.now()) / 1e3)
      },
      425
    );
  }
  let url;
  try {
    url = await unseal(env, drop.id, drop.ciphertext, drop.iv);
  } catch {
    return fail("The stored link could not be decrypted.", 500);
  }
  await execute(
    env,
    "INSERT INTO unlocks (id, drop_id, buyer, tx_hash, method, created_at) VALUES (?, ?, ?, ?, ?, ?)",
    [generateId(), drop.id, "", "", "ad", (/* @__PURE__ */ new Date()).toISOString()]
  ).catch(() => void 0);
  await execute(env, "DELETE FROM ad_tasks WHERE id = ?", [taskId]).catch(() => void 0);
  return json({ url, method: "ad" });
};
export {
  onRequestPost
};
