/**
 * Server-side verification of Polygon PoS escrow payments.
 *
 * The browser submits a transaction hash; the server independently re-reads
 * the receipt from the chain and checks that a `Paid` event was emitted by the
 * configured escrow contract for this drop, seller, token and amount. The
 * browser is never trusted for this — it only proposes a hash.
 */
import type { Env } from "./types";
import { sha256Hex } from "./crypto";
import { expectedFeeBps } from "./tiers";

export const POLYGON_CHAIN_ID = 137;
export const DEFAULT_POLYGON_RPC = "https://polygon-bor-rpc.publicnode.com";

/**
 * keccak256("Paid(bytes32,address,address,address,uint256,uint16)")
 * Event signature of PolygonEscrow.sol. Computed once at build time and
 * embedded so the server needs no keccak implementation.
 *
 * `scripts/check-contract.mjs` asserts this against the compiled ABI.
 */
export const PAID_EVENT_TOPIC0 =
  "0x20d5c9619a03316e55848062a41d31803677de035ccdd9c50fa5ac29fdb4c5e1";

interface RpcLog {
  address: string;
  topics: string[];
  data: string;
}

interface RpcReceipt {
  status?: string;
  blockNumber?: string;
  logs?: RpcLog[];
}

function rpcUrl(env: Env): string {
  return (env.POLYGON_RPC_URL || DEFAULT_POLYGON_RPC).trim();
}

async function rpc(env: Env, method: string, params: unknown[]): Promise<unknown> {
  const res = await fetch(rpcUrl(env), {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
  });
  if (!res.ok) throw new Error(`Polygon RPC ${res.status}`);
  const payload = (await res.json()) as { result?: unknown; error?: { message: string } };
  if (payload.error) throw new Error(payload.error.message || "RPC error");
  return payload.result;
}

function hexToBigInt(value: string | undefined): bigint {
  if (!value || value === "0x") return 0n;
  return BigInt(value);
}

function hexWord(value: string | undefined): string {
  if (!value) return "0x" + "0".repeat(64);
  return value.toLowerCase().replace(/^0x/, "").padStart(64, "0");
}

export interface PaymentCheck {
  escrowAddress: string;
  dropId: string;
  sellerWallet: string;
  tokenAddress: string;
  amountUnits: bigint;
  /** The fee tier the drop was sold at, in basis points. */
  expectedFeeBps: number;
}

export interface PaymentResult {
  ok: boolean;
  reason: string;
  txHash?: string;
  blockNumber?: number;
}

/**
 * Confirms that `txHash` contains a matching escrow payment.
 *
 * The drop id is hashed the same way the client hashes it (SHA-256 of the
 * UTF-8 id) so both sides agree on the bytes32 value.
 */
export async function verifyEscrowPayment(
  env: Env,
  txHash: string,
  check: PaymentCheck
): Promise<PaymentResult> {
  const clean = txHash.trim();
  if (!/^0x[a-fA-F0-9]{64}$/.test(clean)) {
    return { ok: false, reason: "Invalid Polygon transaction hash." };
  }
  if (!/^0x[a-fA-F0-9]{40}$/.test(check.escrowAddress)) {
    return { ok: false, reason: "Escrow contract address is not configured." };
  }

  let receipt: RpcReceipt | null = null;
  try {
    receipt = (await rpc(env, "eth_getTransactionReceipt", [clean])) as RpcReceipt | null;
  } catch (err) {
    return {
      ok: false,
      reason: `Could not read the Polygon receipt: ${
        err instanceof Error ? err.message : "RPC error"
      }`,
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
    expectedDrop,
  });

  if (!match.ok) {
    return { ok: false, reason: match.reason, txHash: clean };
  }

  return {
    ok: true,
    reason: "Escrow payment confirmed on Polygon PoS.",
    txHash: clean,
    blockNumber: Number(hexToBigInt(receipt.blockNumber)),
  };
}

/**
 * Scans a receipt's logs for the escrow payment that unlocks a drop.
 *
 * Split out from the RPC call so it can be unit tested against synthetic
 * logs — in particular the case where a premium drop was paid at the
 * standard tier.
 */
export function matchPaidEvent(
  logs: RpcLog[],
  check: PaymentCheck & { expectedDrop: string }
): { ok: boolean; reason: string; feeBps?: number; amount?: bigint } {
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

    // data = token (32 bytes) ++ amount (32 bytes) ++ feeBps (32 bytes)
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
        reason: "Escrow payment amount is lower than the drop price.",
      };
    }

    // The fee tier must match the one the drop was sold at. This is what
    // proves a premium drop was paid at the premium rate.
    let feeBps = 0n;
    try {
      feeBps = BigInt(`0x${feeWord || "0"}`);
    } catch {
      return {
        ok: false,
        reason: "The escrow event did not report a fee tier.",
      };
    }
    if (Number(feeBps) !== check.expectedFeeBps) {
      return {
        ok: false,
        reason: `The payment was made at ${Number(feeBps) / 100}% but this drop is sold at ${
          check.expectedFeeBps / 100
        }%.`,
      };
    }

    return { ok: true, reason: "Escrow payment confirmed.", feeBps: Number(feeBps), amount };
  }

  return {
    ok: false,
    reason: "No matching PolygonEscrow Paid event was found in this transaction.",
  };
}

/** Converts a decimal token amount into base units. */
export function toUnits(amount: string, decimals: number): bigint {
  const clean = String(amount).trim();
  if (!/^\d+(\.\d+)?$/.test(clean)) {
    throw new Error(`Invalid amount: ${amount}`);
  }
  const [whole, fraction = ""] = clean.split(".");
  const padded = (fraction + "0".repeat(decimals)).slice(0, decimals);
  return BigInt(whole) * 10n ** BigInt(decimals) + BigInt(padded || "0");
}
