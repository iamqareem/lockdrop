/**
 * The application shell: top bar, bottom bar, footer, and the frame every
 * view renders inside.
 *
 * The shell owns the chrome and nothing else — it does not know what a drop
 * is or what the wizard is asking for. Views hand it a block of HTML for
 * `<main>` and it wraps them.
 *
 * Navigation rule: the Lock and Drops buttons live in the BOTTOM navigation
 * on phones, tablets and anything below the desktop breakpoint. The top
 * navigation only appears on desktop, where there is room for it.
 */
import { state, setDarkMode } from "../state.js";
import { getConfig } from "../config.js";
import { icon } from "../icons.js";
import { escapeHtml, shortAddress } from "../util.js";
import { parseHash, render } from "./router.js";
import { bus } from "./bus.js";

/**
 * Asks for the search. The shell knows only the bus and the route — never
 * which composer exists or where the query lives.
 */
function openSearch() {
  bus.emit("search:open");
  if (parseHash().view !== "feed") {
    location.hash = "#/";
    return;
  }
  bus.emit("search:focus");
}

// Bind the two triggers after each shell render, and the shortcut only once.
function wireSearchTriggers() {
  for (const id of ["searchOpenBtn", "searchTrigger"]) {
    document.getElementById(id)?.addEventListener("click", openSearch);
  }
}

document.addEventListener("keydown", (e) => {
  const target = e.target;
  const typing =
    target instanceof HTMLElement &&
    (target.matches("input, textarea, select") || target.isContentEditable);
  if (typing) return;
  if (e.key === "/" || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")) {
    e.preventDefault();
    openSearch();
  }
});

export function navItems() {
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
        <div id="topSearchSlot" class="topsearch"></div>
        <div class="topbar-actions topbar-tools">
          <button type="button" id="searchTrigger" class="search-trigger"
            aria-label="Search the drops" title="Search ( / )">
            ${icon("search", "", 15)}<span>Search</span><kbd>/</kbd>
          </button>
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

export function renderShell(activeView, mainHtml) {
  const root = document.getElementById("root");
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
      ${bottomNavHtml(activeView)}
    </div>`;

  wireSearchTriggers();

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
      try {
        const { connectWallet } = await import("../wallet.js");
        state.walletAddress = await connectWallet();
        // The connected wallet is the natural payout address.
        state.sellerWallet = state.walletAddress;
        bus.emit("wallet:connected", state.walletAddress);
      } catch (err) {
        state.walletError = err instanceof Error ? err.message : "Wallet connection failed.";
      } finally {
        state.connecting = false;
        render();
      }
    });
  });
}

/**
 * Repaints the wallet buttons in place.
 *
 * The address can arrive after the first paint, and re-rendering the whole
 * view to show it would throw the feed away and fetch it again.
 */
export function paintWalletButtons() {
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
export function paintThemeButtons() {
  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
    btn.innerHTML = state.isDarkMode ? icon("sun", "", 16) : icon("moon", "", 16);
  });
}
