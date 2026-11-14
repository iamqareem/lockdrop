/**
 * Runtime configuration, fetched once from the backend.
 *
 * Nothing here is a secret. The escrow address, the ad block id and the
 * Monetag link are public by nature; the Turso token, the master encryption
 * key and the admin token stay on the server and never reach this file.
 */

let cached = null;
let pending = null;

const FALLBACK = {
  categories: [],
  escrowAddress: "",
  polygonRpc: null,
  ads: { adsgramBlockId: "", monetagLink: "" },
  adminConfigured: false,
  features: { ai: false, openrouter: false },
};

export async function loadConfig(force = false) {
  if (cached && !force) return cached;
  if (pending && !force) return pending;

  pending = fetch("/api/config")
    .then((res) => (res.ok ? res.json() : null))
    .then((data) => {
      cached = data ? { ...FALLBACK, ...data } : { ...FALLBACK };
      pending = null;
      return cached;
    })
    .catch(() => {
      pending = null;
      cached = { ...FALLBACK };
      return cached;
    });

  return pending;
}

export function getConfig() {
  return cached ?? { ...FALLBACK };
}
