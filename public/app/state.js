/**
 * The shared store — cross-cutting state only.
 *
 * Each service owns its own state (`services/<name>/state.js`); what lives
 * here is what the shell and more than one service genuinely share: the
 * wallet session, the theme, and which config endpoints have answered.
 */

export const state = {
  walletAddress: "",
  connecting: false,
  walletError: "",

  isDarkMode: localStorage.getItem("lockdrop_dark_mode") === "true",

  /** True when the direct Turso read path is configured. */
  tursoReady: false,
  /** True when the escrow gateway (Pages Functions) is reachable. */
  escrowReady: false,

  /* wizard */
  wizardStep: 1,
  categoryModalOpen: false,
  title: "",
  categoryId: "",
  url: "",
  summary: "",
  report: null,
  verifying: false,
  unlockMode: "paid_ad",
  tokenAddress: "0x0000000000000000000000000000000000000000",
  tokenSymbol: "POL",
  tokenDecimals: 18,
  price: "5",
  sellerWallet: "",
  creating: false,
  lastCreated: null,
};

const listeners = new Set();

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function notify() {
  for (const fn of listeners) fn(state);
}

export function setState(patch) {
  Object.assign(state, patch);
  notify();
}

export function setDarkMode(enabled) {
  state.isDarkMode = enabled;
  localStorage.setItem("lockdrop_dark_mode", String(enabled));
  document.documentElement.classList.toggle("dark", enabled);
  document.documentElement.classList.toggle("light", !enabled);
  notify();
}
