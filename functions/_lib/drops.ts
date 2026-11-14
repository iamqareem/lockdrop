/** Helpers for shaping drop rows into the public representation. */
import type { DropRow, PublicDrop } from "./types";
import { feeTierFor } from "./tiers";

const ID_ALPHABET = "abcdefghijklmnopqrstuvwxyz0123456789";

/** Generates a short, URL-safe drop identifier. */
export function generateDropId(length = 10): string {
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  let id = "";
  for (let i = 0; i < length; i += 1) {
    id += ID_ALPHABET[bytes[i] % ID_ALPHABET.length];
  }
  return id;
}

/**
 * Projects a stored drop into the shape the browser receives.
 *
 * `ciphertext` and `iv` are deliberately absent: the sealed URL never leaves
 * the server until a payment has been verified.
 */
export function toPublicDrop(row: DropRow): PublicDrop {
  const fee = feeTierFor(row.unlock_mode);
  return {
    id: row.id,
    title: row.title,
    summary: row.summary,
    categoryId: row.category_id,
    category: row.category,
    sellerWallet: row.seller_wallet,
    tokenAddress: row.token_address,
    tokenSymbol: row.token_symbol,
    tokenDecimals: row.token_decimals,
    price: row.price,
    unlockMode: row.unlock_mode,
    feeTier: fee?.tier ?? null,
    feeBps: fee?.bps ?? 0,
    verdict: row.verdict,
    verdictReason: row.verdict_reason,
    verdictScore: row.verdict_score,
    verdictSource: row.verdict_source,
    isAdminAd: Boolean(row.is_admin_ad),
    createdAt: row.created_at,
  };
}

export const DROP_COLUMNS =
  "id, title, summary, category_id, category, ciphertext, iv, seller_wallet, " +
  "token_address, token_symbol, token_decimals, price, unlock_mode, verdict, " +
  "verdict_reason, verdict_score, verdict_source, verdict_report, is_admin_ad, " +
  "status, created_at";

export function isValidAddress(value: string): boolean {
  return /^0x[0-9a-fA-F]{40}$/.test(value.trim());
}

export function normaliseAddress(value: string): string {
  return value.trim().toLowerCase();
}
