/**
 * Application shell and hash router.
 *
 * Navigation rule: the Lock and Drops buttons live in the BOTTOM navigation
 * on phones, tablets and anything below the desktop breakpoint. The top
 * navigation only appears on desktop, where there is room for it.
 */
import { state, subscribe, notify, setDarkMode } from "./state.js";
import { loadConfig, getConfig } from "./config.js";
import { loadTursoConfig } from "./turso.js";
import { restoreAccount } from "./wallet.js";
import { icon } from "./icons.js";
import { escapeHtml, shortAddress } from "./util.js";

import { renderCreateView } from "./views/create.js";
import { renderFeedView } from "./views/feed.js";
import { renderDropView } from "./views/drop.js";
import { renderAdminView } from "./views/admin.js";
import { renderContractView } from "./views/contract.js";

const root = document.getElementById("root");

export function parseHash() {
  const hash = window.location.hash || "#/";
  if (hash.startsWith("#/drop/")) {
    const dropId = hash.slice("#/drop/".length).trim();
    if (dropId) return { view: "drop", dropId };
  }
  if (hash === "#/lock") return { view: "create" };
  if (hash === "#/drops") return { view: "feed" };
  if (hash === "#/admin") return { view: "admin" };
  if (hash === "#/contract") return { view: "contract" };
  // The feed is the front door.
  return { view: "feed" };
}

function navItems() {
  return [
    { id: "create", href: "#/lock", label: "Lock", icon: "lock" },
    { id: "feed", href: "#/", label: "Drops", icon: "drops" },
  ];
}

function topbarHtml(activeView) {
  const config = getConfig();
  return `
    <header class="topbar">
      <div class="topbar-inner">
        <a href="#/" class="brand">
          <span class="brand-mark">${icon("lock", "", 15)}</span>
          <span>LockDrop</span>
        </a>
        <nav class="topnav">
          ${navItems()
            .map(
              (item) => `
            <a href="${item.href}" class="${activeView === item.id ? "is-active" : ""}">
              ${icon(item.icon, "", 14)}<span>${item.label}</span>
            </a>`
            )
            .join("")}
        </nav>
        <div class="topbar-actions">
          <button type="button" class="icon-btn" data-theme-toggle aria-label="Toggle theme">
            ${state.isDarkMode ? icon("sun", "", 16) : icon("moon", "", 16)}
          </button>
          <button id="connectBtn" type="button" class="btn btn-primary" data-connect ${
            state.connecting ? "disabled" : ""
          }>
            ${
              state.walletAddress
                ? `<span class="mono">${escapeHtml(shortAddress(state.walletAddress))}</span>`
                : `${icon("wallet", "", 15)}<span>Connect Wallet</span>`
            }
          </button>
        </div>
      </div>
    </header>`;
}

function bottomNavHtml(activeView) {
  return `
    <nav class="bottomnav">
      ${navItems()
        .map(
          (item) => `
        <a href="${item.href}" class="${activeView === item.id ? "is-active" : ""}">
          ${icon(item.icon, "", 15)}<span>${item.label}</span>
        </a>`
        )
        .join("")}
    </nav>`;
}

function footerHtml() {
  const config = getConfig();
  return `
    <footer class="footer">
      <div style="display:flex;gap:12px;justify-content:center;align-items:center;flex-wrap:wrap">
        <a href="#/" class="hover:underline">Polygon PoS Escrow</a>
        <span>·</span>
        <span>${config.features?.ai ? "AI verified" : "Locally verified"}</span>
        <span>·</span>
        <a href="#/admin" class="hover:underline">Admin</a>
      </div>
    </footer>`;
}

export function renderShell(activeView, mainHtml) {
  root.innerHTML = `
    <div class="shell">
      ${topbarHtml(activeView)}
      <div class="mobile-tools">
        <button type="button" class="tool-btn" data-theme-toggle aria-label="Toggle theme">
          ${state.isDarkMode ? icon("sun", "", 15) : icon("moon", "", 15)}
        </button>
        <button type="button" class="tool-btn" data-connect aria-label="Connect wallet" ${
          state.connecting ? "disabled" : ""
        }>
          ${
            state.walletAddress
              ? `<span class="mono tool-addr">${escapeHtml(
                  shortAddress(state.walletAddress)
                )}</span>`
              : icon("wallet", "", 15)
          }
        </button>
      </div>
      <main class="main">
        ${
          state.walletError
            ? `<div class="alert alert-error" style="margin-bottom:18px">${escapeHtml(
                state.walletError
              )}</div>`
            : ""
        }
        ${mainHtml}
      </main>
      ${footerHtml()}
      ${bottomNavHtml(activeView)}
    </div>`;

  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => setDarkMode(!state.isDarkMode));
  });

  document.querySelectorAll("[data-connect]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      state.connecting = true;
      state.walletError = "";
      notify();
      try {
        const { connectWallet } = await import("./wallet.js");
        state.walletAddress = await connectWallet();
        // The connected wallet is the natural payout address.
        state.sellerWallet = state.walletAddress;
      } catch (err) {
        state.walletError = err instanceof Error ? err.message : "Wallet connection failed.";
      } finally {
        state.connecting = false;
        notify();
        render();
      }
    });
  });
}

let rendering = false;

export function render() {
  if (rendering) return;
  rendering = true;
  try {
    const { view, dropId } = parseHash();
    if (view === "feed") {
      renderFeedView();
    } else if (view === "drop" && dropId) {
      renderDropView(dropId);
    } else if (view === "admin") {
      renderAdminView();
    } else if (view === "contract") {
      renderContractView();
    } else {
      renderCreateView();
    }
  } finally {
    rendering = false;
  }
}

subscribe(() => {
  /* state changes are picked up by explicit render() calls */
});

export async function boot() {
  document.documentElement.classList.toggle("dark", state.isDarkMode);
  document.documentElement.classList.toggle("light", !state.isDarkMode);

  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.expand();
  }

  // Two independent sources. The Turso read config is what the feed needs;
  // the gateway config is what locking and unlocking need. Neither blocks
  // the other.
  const [turso, gateway] = await Promise.all([
    loadTursoConfig(),
    loadConfig(),
  ]);

  state.tursoReady = Boolean(turso);
  state.escrowReady = Boolean(gateway?.escrowAddress);
  state.walletAddress = await restoreAccount();
  if (state.walletAddress && !state.sellerWallet) {
    state.sellerWallet = state.walletAddress;
  }

  window.addEventListener("hashchange", render);
  render();
}

/* Surface failures instead of leaving the boot placeholder on screen. */
function showFatal(message) {
  const target = document.getElementById("root");
  if (!target) return;
  target.innerHTML = `
    <div class="boot" style="max-width:32rem;padding:24px;text-align:center">
      <p style="font-weight:500;color:var(--text)">LockDrop could not start</p>
      <p style="margin-top:8px;line-height:1.6">${escapeHtml(message)}</p>
    </div>`;
}

window.addEventListener("error", (event) => {
  showFatal(event.message || "Unexpected error.");
});
window.addEventListener("unhandledrejection", (event) => {
  const reason = event.reason;
  showFatal(reason instanceof Error ? reason.message : String(reason));
});

boot().catch((err) => {
  showFatal(err instanceof Error ? err.message : "Unexpected error.");
});
