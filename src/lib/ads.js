const ADSGRAM_BLOCK_ID = (import.meta.env.VITE_ADSGRAM_BLOCK_ID || "").trim();
const MONETAG_DIRECT_LINK = (
  import.meta.env.VITE_MONETAG_DIRECT_LINK || ""
).trim();

export const hasAdsgram = Boolean(
  ADSGRAM_BLOCK_ID && !ADSGRAM_BLOCK_ID.includes("YOUR_ADSGRAM")
);

export const hasMonetag = Boolean(
  MONETAG_DIRECT_LINK && !MONETAG_DIRECT_LINK.includes("your-monetag-direct-link")
);

export function getMonetagUrl() {
  return hasMonetag ? MONETAG_DIRECT_LINK : "";
}

export function isTelegramContext() {
  return Boolean(window.Telegram?.WebApp?.initData);
}

/**
 * Runs Adsgram rewarded video inside Telegram Mini App if available.
 * Returns { completed: boolean, provider: string }.
 */
export async function runAdsgramReward() {
  if (!hasAdsgram || !window.Adsgram) {
    return { completed: false, provider: "none" };
  }
  const controller = window.Adsgram.init({ blockId: ADSGRAM_BLOCK_ID });
  const result = await controller.show();
  return {
    completed: Boolean(result && result.done),
    provider: "adsgram",
  };
}
