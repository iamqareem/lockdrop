/** Small helpers shared across the app. */

export function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function shortAddress(addr) {
  if (!addr || addr.length < 10) return addr || "";
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

export function isAddress(value) {
  return /^0x[0-9a-fA-F]{40}$/.test(String(value || "").trim());
}

export function timeAgo(iso) {
  const then = new Date(iso).getTime();
  if (!Number.isFinite(then)) return "";
  const seconds = Math.max(0, Math.floor((Date.now() - then) / 1000));
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

export function formatPrice(price, symbol) {
  if (!price || Number(price) === 0) return "Free";
  return `${price} ${symbol || ""}`.trim();
}

/** Class name for a verdict pill. */
export function verdictClass(verdict) {
  if (verdict === "Trusted") return "verdict verdict-Trusted";
  if (verdict === "Caution") return "verdict verdict-Caution";
  if (verdict === "Blocked") return "verdict verdict-Blocked";
  return "verdict";
}

export function verdictSlug(verdict) {
  if (verdict === "Trusted") return "trusted";
  if (verdict === "Caution") return "caution";
  if (verdict === "Blocked") return "blocked";
  return "checked";
}

export function modeLabel(mode) {
  if (mode === "free_ad") return "Free · Ad";
  if (mode === "paid_pure") return "Paid · Ad-free";
  return "Paid + Ads";
}

export function debounce(fn, wait = 220) {
  let timer = null;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
