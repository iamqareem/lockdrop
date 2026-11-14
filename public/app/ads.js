/** Rewarded-ad providers. */
import { getConfig } from "./config.js";

export function isTelegramContext() {
  return Boolean(window.Telegram?.WebApp?.initData);
}

export function adsgramBlockId() {
  return getConfig().ads?.adsgramBlockId ?? "";
}

export function monetagLink() {
  return getConfig().ads?.monetagLink ?? "";
}

export function hasAdsgram() {
  return Boolean(adsgramBlockId());
}

export function hasMonetag() {
  return Boolean(monetagLink());
}

/**
 * Runs the Adsgram rewarded video. Resolves to `{ completed, provider }`.
 */
export async function runAdsgramReward() {
  if (!hasAdsgram() || !window.Adsgram) {
    return { completed: false, provider: "none" };
  }
  try {
    const controller = window.Adsgram.init({ blockId: adsgramBlockId() });
    const result = await controller.show();
    return { completed: Boolean(result && result.done), provider: "adsgram" };
  } catch {
    return { completed: false, provider: "adsgram" };
  }
}
