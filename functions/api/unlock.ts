/**
 * POST /api/unlock
 *
 * Releases the sealed destination URL — but only after the server has
 * independently confirmed the payment.
 *
 *   { dropId, txHash }        paid drops: verifies the Polygon escrow event
 *   { dropId, method: "ad" }  free drops: starts a sponsored-task gate
 *   { dropId, taskId }        free drops: completes the gate and releases
 */
import type { DropRow, Env } from "../_lib/types";
import { json, fail, readJson } from "../_lib/http";
import { query, execute } from "../_lib/turso";
import { unseal } from "../_lib/crypto";
import { verifyEscrowPayment, toUnits } from "../_lib/polygon";
import { expectedFeeBps } from "../_lib/tiers";
import { rateLimit } from "../_lib/auth";

/** Minimum time a sponsored task must run before the link is released. */
const AD_TASK_SECONDS = 8;

interface UnlockBody {
  dropId?: string;
  txHash?: string;
  method?: "chain" | "ad";
  taskId?: string;
}

function generateId(length = 16): string {
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  let id = "";
  const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i += 1) id += alphabet[bytes[i] % alphabet.length];
  return id;
}

async function loadDrop(env: Env, id: string): Promise<DropRow | null> {
  const rows = await query<DropRow>(
    env,
    "SELECT id, title, summary, category_id, category, ciphertext, iv, seller_wallet, " +
      "token_address, token_symbol, token_decimals, price, unlock_mode, verdict, " +
      "verdict_reason, verdict_score, verdict_source, verdict_report, is_admin_ad, " +
      "status, created_at FROM drops WHERE id = ? LIMIT 1",
    [id]
  );
  return rows[0] ?? null;
}

export const onRequestPost = async ({ request, env }: { request: Request; env: Env }) => {
  const limit = rateLimit(request, env, "unlock", 60, 10 * 60 * 1000);
  if (!limit.ok) {
    return fail("Too many unlock attempts. Try again shortly.", 429, {
      retryAfter: limit.retryAfter,
    });
  }

  const body = await readJson<UnlockBody>(request);
  const dropId = (body?.dropId || "").trim();
  if (!dropId) return fail("Missing drop id.");

  let drop: DropRow | null = null;
  try {
    drop = await loadDrop(env, dropId);
  } catch (err) {
    return fail(err instanceof Error ? err.message : "Could not load the drop.", 500);
  }
  if (!drop) return fail("Drop not found.", 404);
  if (drop.status !== "active") return fail("This drop is no longer available.", 410);

  const isFree = drop.unlock_mode === "free_ad" || Boolean(drop.is_admin_ad);

  /* --------------------------------------------------------------------- */
  /* Paid path: the chain is the authority.                                 */
  /* --------------------------------------------------------------------- */
  if (!isFree) {
    const txHash = (body?.txHash || "").trim();
    if (!txHash) return fail("A transaction hash is required to unlock this drop.");

    const escrowAddress = (env.ESCROW_ADDRESS || "").trim();
    if (!escrowAddress) {
      return fail("The escrow contract is not configured on this deployment.", 503);
    }

    let amountUnits: bigint;
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
      expectedFeeBps: feeBps,
    });

    if (!payment.ok) {
      return json({ error: payment.reason, verified: false }, 402);
    }

    let url: string;
    try {
      url = await unseal(env, drop.id, drop.ciphertext, drop.iv);
    } catch {
      return fail("The stored link could not be decrypted.", 500);
    }

    await execute(
      env,
      "INSERT INTO unlocks (id, drop_id, buyer, tx_hash, method, created_at) VALUES (?, ?, ?, ?, ?, ?)",
      [generateId(), drop.id, "", payment.txHash ?? txHash, "chain", new Date().toISOString()]
    ).catch(() => undefined);

    return json({ url, method: "chain", txHash: payment.txHash ?? txHash });
  }

  /* --------------------------------------------------------------------- */
  /* Free path: sponsored task gate.                                       */
  /* --------------------------------------------------------------------- */
  const method = body?.method;

  if (method === "ad") {
    const taskId = generateId();
    const earliestAt = new Date(Date.now() + AD_TASK_SECONDS * 1000).toISOString();
    await execute(
      env,
      "INSERT INTO ad_tasks (id, drop_id, earliest_at, created_at) VALUES (?, ?, ?, ?)",
      [taskId, drop.id, earliestAt, new Date().toISOString()]
    ).catch(() => undefined);

    return json({
      taskId,
      earliestAt,
      waitSeconds: AD_TASK_SECONDS,
    });
  }

  const taskId = (body?.taskId || "").trim();
  if (!taskId) {
    return fail("Start the sponsored task before unlocking.", 428);
  }

  const tasks = await query<{ id: string; drop_id: string; earliest_at: string }>(
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
        retryAfter: Math.ceil((earliest - Date.now()) / 1000),
      },
      425
    );
  }

  let url: string;
  try {
    url = await unseal(env, drop.id, drop.ciphertext, drop.iv);
  } catch {
    return fail("The stored link could not be decrypted.", 500);
  }

  await execute(
    env,
    "INSERT INTO unlocks (id, drop_id, buyer, tx_hash, method, created_at) VALUES (?, ?, ?, ?, ?, ?)",
    [generateId(), drop.id, "", "", "ad", new Date().toISOString()]
  ).catch(() => undefined);
  await execute(env, "DELETE FROM ad_tasks WHERE id = ?", [taskId]).catch(() => undefined);

  return json({ url, method: "ad" });
};
