/**
 * Shared drop shape.
 *
 * This module is imported by BOTH the browser and the Cloudflare Functions.
 * The browser fetches the feed straight from Turso, so the two sides must
 * agree on the exact column list and the exact projection — otherwise the
 * two data paths would drift.
 *
 * It lives under `public/` because that is the only directory Cloudflare
 * Pages serves statically; the Functions bundle reaches it with a relative
 * import.
 */

/** The public columns of the `drops` table, in query order. */
export const PUBLIC_DROP_COLUMNS = [
  "id",
  "title",
  "summary",
  "category_id",
  "category",
  "seller_wallet",
  "token_address",
  "token_symbol",
  "token_decimals",
  "price",
  "unlock_mode",
  "verdict",
  "verdict_reason",
  "verdict_score",
  "verdict_source",
  "is_admin_ad",
  "status",
  "created_at",
  "roadmap_slug",
  "step_slug",
];

/**
 * The escrow's fee tiers, mirroring the `Tier` enum in PolygonEscrow.sol.
 *
 * `scripts/check-contract.mjs` asserts these against the compiled ABI, so
 * the browser can never charge a fee the contract does not accept.
 */
export const TIER_STANDARD = 0;
export const TIER_PREMIUM = 1;

export const FEE_BPS_STANDARD = 300;
export const FEE_BPS_PREMIUM = 500;

export const FEE_TIERS = {
  paid_ad: { tier: TIER_STANDARD, bps: FEE_BPS_STANDARD, label: "3%" },
  paid_pure: { tier: TIER_PREMIUM, bps: FEE_BPS_PREMIUM, label: "5%" },
  free_ad: null,
};

/** The fee tier a drop sold under the given unlock mode, or null if free. */
export function feeTierFor(unlockMode) {
  return FEE_TIERS[unlockMode] ?? null;
}

/** The basis points the contract must report for a given unlock mode. */
export function expectedFeeBps(unlockMode) {
  return feeTierFor(unlockMode)?.bps ?? null;
}

/**
 * Projects a `drops` row into the public shape the UI consumes.
 *
 * The sealed URL lives in a separate `drop_secrets` table and is never part
 * of this projection — a browser holding a read-only Turso token cannot
 * reach it at all.
 */
export function toPublicDrop(row) {
  const fee = feeTierFor(row.unlock_mode);
  return {
    id: String(row.id),
    title: String(row.title),
    summary: String(row.summary ?? ""),
    categoryId: String(row.category_id),
    category: String(row.category),
    sellerWallet: String(row.seller_wallet),
    tokenAddress: String(row.token_address),
    tokenSymbol: String(row.token_symbol),
    tokenDecimals: Number(row.token_decimals),
    price: String(row.price),
    unlockMode: String(row.unlock_mode),
    feeTier: fee ? fee.tier : null,
    feeBps: fee ? fee.bps : 0,
    verdict: String(row.verdict ?? "Checked"),
    verdictReason: String(row.verdict_reason ?? ""),
    verdictScore: Number(row.verdict_score ?? 0),
    verdictSource: String(row.verdict_source ?? "heuristic"),
    isAdminAd: Boolean(Number(row.is_admin_ad ?? 0)),
    status: String(row.status ?? "active"),
    createdAt: String(row.created_at),
    roadmapSlug: String(row.roadmap_slug ?? ""),
    stepSlug: String(row.step_slug ?? ""),
  };
}
