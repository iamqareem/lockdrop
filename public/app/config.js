/**
 * Runtime configuration.
 *
 * Two independent sources, so that neither one can take the app down:
 *
 *   public/turso.json  — the read-only Turso config. The feed comes from
 *                         here and works even with no backend at all.
 *   /api/config        — the escrow gateway config (escrow address, fee
 *                         tiers, ad ids). Only needed for locking and
 *                         unlocking, so its absence only disables those.
 */

let gatewayConfig = null;
let gatewayAvailable = false;
let pending = null;

const FALLBACK = {
  categories: [],
  escrowAddress: "",
  polygonRpc: null,
  feeTiers: {},
  ads: { adsgramBlockId: "", monetagLink: "" },
  adminConfigured: false,
  features: { ai: false, openrouter: false },
};

/**
 * Loads the escrow gateway config.
 * Never throws: a missing gateway simply means locking and unlocking are
 * unavailable, while the feed keeps working.
 */
export async function loadConfig(force = false) {
  if (gatewayConfig && !force) return gatewayConfig;
  if (pending && !force) return pending;

  pending = fetch("/api/config")
    .then((res) => (res.ok ? res.json() : null))
    .then((data) => {
      gatewayConfig = data ? { ...FALLBACK, ...data } : { ...FALLBACK };
      gatewayAvailable = Boolean(data);
      pending = null;
      return gatewayConfig;
    })
    .catch(() => {
      pending = null;
      gatewayConfig = { ...FALLBACK };
      gatewayAvailable = false;
      return gatewayConfig;
    });

  return pending;
}

export function getConfig() {
  return gatewayConfig ?? { ...FALLBACK };
}

/** True when the escrow gateway (Pages Functions) is reachable. */
export function isEscrowAvailable() {
  return gatewayAvailable;
}
