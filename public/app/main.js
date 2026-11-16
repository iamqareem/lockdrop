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
        <div class="topbar-actions topbar-tools">
          <button type="button" class="icon-btn" data-theme-toggle aria-label="Toggle theme">
            ${state.isDarkMode ? icon("sun", "", 16) : icon("moon", "", 16)}
          </button>
          <button type="button" class="btn btn-primary" data-connect ${
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

/**
 * The bottom bar.
 *
 * On a phone this is the only navigation there is, so it is a row of icons:
 * the two destinations, the wallet and the search. They are all the same
 * size and the same weight, and the theme toggle sits alone in the corner.
 */
function bottomNavHtml(activeView) {
  const items = [
    { id: "create", href: "#/lock", label: "Lock a link", icon: "lock" },
    { id: "feed", href: "#/", label: "Drops", icon: "drops" },
  ];

  return `
    <nav class="bottomnav">
      <div class="bottomnav-row">
        ${items
          .map(
            (item) => `
        <a href="${item.href}" class="nav-icon ${
          activeView === item.id ? "is-active" : ""
        }" aria-label="${escapeHtml(item.label)}">
          ${icon(item.icon, "", 18)}
        </a>`
          )
          .join("")}
        ${walletIconHtml()}
        <button type="button" class="nav-icon" id="searchOpenBtn"
          aria-label="Search the drops">${icon("search", "", 18)}</button>
      </div>
      <button type="button" class="nav-theme" data-theme-toggle aria-label="Toggle theme">
        ${icon(state.isDarkMode ? "sun" : "moon", "", 16)}
      </button>
    </nav>`;
}

/**
 * The wallet, as one of the icons in the bottom bar.
 *
 * It is an account rather than a destination, so it carries no label.
 */
function walletIconHtml() {
  return `
    <button type="button" class="nav-icon" data-connect aria-label="Connect wallet" ${
      state.connecting ? "disabled" : ""
    }>
      ${
        state.walletAddress
          ? `<span class="mono nav-wallet-addr">${escapeHtml(
              shortAddress(state.walletAddress)
            )}</span>`
          : icon("wallet", "", 18)
      }
    </button>`;
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
    <div class="shell is-${escapeHtml(activeView)}">
      ${topbarHtml(activeView)}
      <main class="main is-${escapeHtml(activeView)}">
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

  document.getElementById("searchOpenBtn")?.addEventListener("click", () => {
    state.searchOpen = true;
    if (parseHash().view !== "feed") {
      location.hash = "#/";
      return;
    }
    document.getElementById("feedSearch")?.focus();
  });

  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      setDarkMode(!state.isDarkMode);
      // The glyph is baked into the markup, so it is swapped in place
      // rather than re-rendering the view behind it.
      paintThemeButtons();
    });
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

  /*
   * Two independent sources. The Turso read config is what the feed needs;
   * the gateway config is what locking and unlocking need. Neither blocks
   * the other, and neither blocks the first paint — the feed reads Turso
   * directly, so the escrow gateway has no say in when the page appears.
   */
  const tursoReady = loadTursoConfig().then((config) => {
    state.tursoReady = Boolean(config);
    return config;
  });

  loadConfig()
    .then((gateway) => {
      state.escrowReady = Boolean(gateway?.escrowAddress);
      // The feed does not care; the wizard does. Only re-render if that is
      // what is on screen, so the feed is never fetched twice.
      if (state.escrowReady && parseHash().view !== "feed") render();
    })
    .catch(() => {
      /* the escrow gateway is optional for reading the feed */
    });

  await tursoReady;

  window.addEventListener("hashchange", render);
  render();

  /*
   * The wallet is not needed to read the feed, and asking the provider for
   * an account is a network round trip of its own. It is restored in the
   * background so it never delays the first paint.
   */
  restoreAccount()
    .then((address) => {
      state.walletAddress = address;
      if (address && !state.sellerWallet) {
        state.sellerWallet = address;
      }
      paintWalletButtons();
      // The wizard and the drop view read the wallet; the feed does not.
      if (parseHash().view !== "feed") render();
    })
    .catch(() => {
      /* no wallet, or the provider refused — the feed does not care */
    });
}

/**
 * Repaints the wallet buttons in place.
 *
 * The address can arrive after the first paint, and re-rendering the whole
 * view to show it would throw the feed away and fetch it again.
 */
function paintWalletButtons() {
  const short = state.walletAddress
    ? `<span class="mono">${escapeHtml(shortAddress(state.walletAddress))}</span>`
    : `${icon("wallet", "", 15)}<span>Connect Wallet</span>`;

  document.querySelectorAll("[data-connect]").forEach((btn) => {
    const compact = btn.classList.contains("nav-icon");
    btn.innerHTML = compact
      ? state.walletAddress
        ? `<span class="mono nav-wallet-addr">${escapeHtml(
            shortAddress(state.walletAddress)
          )}</span>`
        : icon("wallet", "", 18)
      : short;
  });
}

/**
 * Repaints the theme toggles.
 *
 * The sun and the moon are baked into the markup, so the glyph has to be
 * swapped by hand when the theme changes.
 */
function paintThemeButtons() {
  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
    btn.innerHTML = state.isDarkMode ? icon("sun", "", 16) : icon("moon", "", 16);
  });
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
