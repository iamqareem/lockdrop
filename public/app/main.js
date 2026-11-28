/**
 * The composition root.
 *
 * This file does three things and nothing else:
 *
 *   1. imports the services and the shell
 *   2. binds each route to the view that answers it
 *   3. boots the cross-cutting concerns (theme, config, wallet session)
 *
 * It deliberately owns no markup and no view logic — that lives in
 * `core/shell.js` and `views/`. Keeping it this thin is what lets a view be
 * lifted out into its own service without dragging the app apart with it.
 */
import { state } from "./state.js";
import { loadConfig } from "./config.js";
import { loadTursoConfig } from "./turso.js";
import { restoreAccount } from "./wallet.js";
import { escapeHtml } from "./util.js";

import { parseHash, render } from "./core/router.js";
import { bus } from "./core/bus.js";
import { paintWalletButtons } from "./core/shell.js";

/* The services that own their state. */
import "./services/admin/index.js";
import "./services/contract/index.js";
import "./services/feed/index.js";
import "./services/lock/index.js";
import "./services/payment/index.js";

export async function boot() {
  document.documentElement.classList.toggle("dark", state.isDarkMode);
  document.documentElement.classList.toggle("light", !state.isDarkMode);

  if (window.Telegram?.WebApp) {
    const tg = window.Telegram.WebApp;
    /*
     * The Telegram SDK is progressive enhancement: it loads on every page,
     * but most of its methods only work inside a Telegram client. Calling
     * one outside the client throws `WebAppMethodUnsupported` — notably
     * requestFullscreen — which would otherwise reject boot() and swap the
     * whole app for "LockDrop could not start". Keep every call guarded.
     */
    try {
      tg.ready();
      tg.expand();
      const bg = state.isDarkMode ? "#1f1e1d" : "#faf9f5";
      tg.setHeaderColor?.(bg);
      tg.setBackgroundColor?.(bg);
      // Fullscreen is only meaningful — and only supported — in the client.
      if (tg.initData) tg.requestFullscreen?.();
    } catch {
      /* not in a Telegram client, or an older SDK — the web app stands alone */
    }
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
      if (address) {
        if (!state.sellerWallet) state.sellerWallet = address;
        bus.emit("wallet:connected", address);
      }
      paintWalletButtons();
      // The wizard and the drop view read the wallet; the feed does not.
      if (parseHash().view !== "feed") render();
    })
    .catch(() => {
      /* no wallet, or the provider refused — the feed does not care */
    });

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js").catch(() => {
      /* offline caching is progressive enhancement */
    });
  }
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
