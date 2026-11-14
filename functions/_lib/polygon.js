import { sha256Hex } from "./crypto.js";
const POLYGON_CHAIN_ID = 137;
const DEFAULT_POLYGON_RPC = "https://polygon-bor-rpc.publicnode.com";
const PAID_EVENT_TOPIC0 = "0x20d5c9619a03316e55848062a41d31803677de035ccdd9c50fa5ac29fdb4c5e1";
function rpcUrl(env) {
  return (env.POLYGON_RPC_URL || DEFAULT_POLYGON_RPC).trim();
}
async function rpc(env, method, params) {
  const res = await fetch(rpcUrl(env), {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params })
  });
  if (!res.ok) throw new Error(`Polygon RPC ${res.status}`);
  const payload = await res.json();
  if (payload.error) throw new Error(payload.error.message || "RPC error");
  return payload.result;
}
function hexToBigInt(value) {
  if (!value || value === "0x") return 0n;
  return BigInt(value);
}
function hexWord(value) {
  if (!value) return "0x" + "0".repeat(64);
  return value.toLowerCase().replace(/^0x/, "").padStart(64, "0");
}
async function verifyEscrowPayment(env, txHash, check) {
  const clean = txHash.trim();
  if (!/^0x[a-fA-F0-9]{64}$/.test(clean)) {
    return { ok: false, reason: "Invalid Polygon transaction hash." };
  }
  if (!/^0x[a-fA-F0-9]{40}$/.test(check.escrowAddress)) {
    return { ok: false, reason: "Escrow contract address is not configured." };
  }
  let receipt = null;
  try {
    receipt = await rpc(env, "eth_getTransactionReceipt", [clean]);
  } catch (err) {
    return {
      ok: false,
      reason: `Could not read the Polygon receipt: ${err instanceof Error ? err.message : "RPC error"}`
    };
  }
  if (!receipt) {
    return { ok: false, reason: "Transaction not found on Polygon PoS yet." };
  }
  if (receipt.status !== "0x1") {
    return { ok: false, reason: "Transaction reverted on Polygon PoS." };
  }
  const expectedDrop = (await sha256Hex(check.dropId)).slice(2);
  const match = matchPaidEvent(receipt.logs ?? [], {
    ...check,
    expectedDrop
  });
  if (!match.ok) {
    return { ok: false, reason: match.reason, txHash: clean };
  }
  return {
    ok: true,
    reason: "Escrow payment confirmed on Polygon PoS.",
    txHash: clean,
    blockNumber: Number(hexToBigInt(receipt.blockNumber))
  };
}
function matchPaidEvent(logs, check) {
  const expectedSeller = check.sellerWallet.toLowerCase().replace(/^0x/, "").padStart(64, "0");
  const expectedToken = check.tokenAddress.toLowerCase().replace(/^0x/, "").padStart(64, "0");
  const escrow = check.escrowAddress.toLowerCase();
  for (const log of logs) {
    if (log.address?.toLowerCase() !== escrow) continue;
    if (log.topics?.[0]?.toLowerCase() !== PAID_EVENT_TOPIC0) continue;
    const dropTopic = hexWord(log.topics[1]).replace(/^0x/, "");
    const sellerTopic = hexWord(log.topics[3]).replace(/^0x/, "");
    const data = (log.data || "").replace(/^0x/, "");
    if (dropTopic !== check.expectedDrop) continue;
    if (sellerTopic !== expectedSeller) continue;
    const tokenWord = data.slice(0, 64);
    const amountWord = data.slice(64, 128);
    const feeWord = data.slice(128, 192);
    if (tokenWord !== expectedToken) continue;
    let amount = 0n;
    try {
      amount = BigInt(`0x${amountWord || "0"}`);
    } catch {
      continue;
    }
    if (amount < check.amountUnits) {
      return {
        ok: false,
        reason: "Escrow payment amount is lower than the drop price."
      };
    }
    let feeBps = 0n;
    try {
      feeBps = BigInt(`0x${feeWord || "0"}`);
    } catch {
      return {
        ok: false,
        reason: "The escrow event did not report a fee tier."
      };
    }
    if (Number(feeBps) !== check.expectedFeeBps) {
      return {
        ok: false,
        reason: `The payment was made at ${Number(feeBps) / 100}% but this drop is sold at ${check.expectedFeeBps / 100}%.`
      };
    }
    return { ok: true, reason: "Escrow payment confirmed.", feeBps: Number(feeBps), amount };
  }
  return {
    ok: false,
    reason: "No matching PolygonEscrow Paid event was found in this transaction."
  };
}
function toUnits(amount, decimals) {
  const clean = String(amount).trim();
  if (!/^\d+(\.\d+)?$/.test(clean)) {
    throw new Error(`Invalid amount: ${amount}`);
  }
  const [whole, fraction = ""] = clean.split(".");
  const padded = (fraction + "0".repeat(decimals)).slice(0, decimals);
  return BigInt(whole) * 10n ** BigInt(decimals) + BigInt(padded || "0");
}
export {
  DEFAULT_POLYGON_RPC,
  PAID_EVENT_TOPIC0,
  POLYGON_CHAIN_ID,
  matchPaidEvent,
  toUnits,
  verifyEscrowPayment
};
