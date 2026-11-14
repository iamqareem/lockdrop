/**
 * Fee tiers.
 *
 * The escrow contract charges one of two fixed fees, selected by the buyer
 * through the `Tier` enum. The unlock mode of a drop decides which tier that
 * drop is sold at:
 *
 *   paid_ad   — the buyer may unlock with a sponsored task instead of paying,
 *               so the drop is sold at the standard tier (3%).
 *   paid_pure — no sponsored task is offered, so the drop is sold at the
 *               premium tier (5%).
 *   free_ad   — no payment at all, no tier.
 *
 * The server verifies that the `Paid` event reports exactly the tier the drop
 * was sold at, so a tampered client cannot pay the lower tier for a premium
 * drop.
 */

export const TIER_STANDARD = 0;
export const TIER_PREMIUM = 1;

export const FEE_BPS_STANDARD = 300;
export const FEE_BPS_PREMIUM = 500;

export interface FeeTier {
  /** The `Tier` enum value the contract expects. */
  tier: number;
  /** The fee in basis points. */
  bps: number;
  /** Short label for the UI. */
  label: string;
}

export const FEE_TIERS: Record<string, FeeTier | null> = {
  paid_ad: { tier: TIER_STANDARD, bps: FEE_BPS_STANDARD, label: "3%" },
  paid_pure: { tier: TIER_PREMIUM, bps: FEE_BPS_PREMIUM, label: "5%" },
  free_ad: null,
};

/** The fee tier a drop sold under the given unlock mode, or null if free. */
export function feeTierFor(unlockMode: string): FeeTier | null {
  return FEE_TIERS[unlockMode] ?? null;
}

/** The basis points the contract must report for a given unlock mode. */
export function expectedFeeBps(unlockMode: string): number | null {
  return feeTierFor(unlockMode)?.bps ?? null;
}
