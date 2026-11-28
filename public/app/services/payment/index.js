/**
 * Payment service — a single drop: the checkout page.
 *
 * The URL is never present in the page source. It is fetched from /api/unlock
 * only after the server has confirmed the payment (or the sponsored task),
 * which is the entire point of moving the escrow server-side.
 *
 * Owns its state in `./state.js`; the rest of the app only ever links to
 * `#/drop/<id>` and lets this service resolve what that means.
 */
import { getDrop } from "../../drops.js";
import { api } from "../../api.js";
import { renderShell } from "../../core/shell.js";
import { defineService } from "../../core/service.js";
import { brandMark, icon } from "../../icons.js";
import { CATEGORY_BY_ID } from "../../categories.js";
import {
  escapeHtml,
  shortAddress,
  formatPrice,
  verdictClass,
  copyText,
} from "../../util.js";
import { sendEscrowPayment, TIERS } from "../../wallet.js";
import { hasAdsgram, hasMonetag, isTelegramContext, monetagLink, runAdsgramReward } from "../../ads.js";
import { paymentState } from "./state.js";

function detailHtml(drop) {
  const isFree = drop.unlockMode === "free_ad" || drop.isAdminAd;
  const category = CATEGORY_BY_ID.get(drop.categoryId);
  const feeBps = drop.feeBps ?? (drop.unlockMode === "paid_pure" ? 500 : 300);
  const feePercent = feeBps / 100;
  const sellerPercent = 100 - feePercent;

  return `
    <div class="narrow stack">
      <a href="#/" class="crumb">← Back to the feed</a>

      <div class="panel panel-lg stack">
        <div>
          <div class="row" style="align-items:flex-start;gap:12px">
            <span class="drop-brand">
              ${brandMark(drop.categoryId, "", 18)}
            </span>
            <div style="min-width:0;flex:1">
              <div class="tiny subtle" style="letter-spacing:.1em;text-transform:uppercase">
                ${escapeHtml(drop.category || category?.label || "Resource")}
              </div>
              <h1 class="panel-title" style="font-size:20px;margin-top:4px">
                ${escapeHtml(drop.title)}
              </h1>
            </div>
            <span class="${verdictClass(drop.verdict)}">
              <span class="verdict-dot"></span>${escapeHtml(drop.verdict)}
            </span>
            <button id="shareDropBtn" type="button" class="icon-btn" style="flex:none"
              aria-label="Copy link to this drop" title="Copy link to this drop">
              ${icon("share", "", 15)}
            </button>
          </div>

          ${
            drop.summary
              ? `<p class="muted" style="margin:12px 0 0;font-size:12.5px;line-height:1.6">${escapeHtml(
                  drop.summary
                )}</p>`
              : ""
          }
        </div>

        ${
          drop.isAdminAd
            ? `<div class="alert">
                 <strong>Platform sponsored</strong> — this drop is published by the
                 LockDrop team and is free to unlock.
               </div>`
            : ""
        }

        ${
          isFree
            ? ""
            : `
        <div>
          <div class="kv"><dt>Price</dt><dd>${escapeHtml(
            formatPrice(drop.price, drop.tokenSymbol)
          )}</dd></div>
          <div class="kv"><dt>Seller (${sellerPercent}%)</dt><dd>${escapeHtml(
            shortAddress(drop.sellerWallet)
          )}</dd></div>
          <div class="kv"><dt>Platform fee</dt><dd>${feePercent}%</dd></div>
          <div class="kv"><dt>Network</dt><dd>Polygon PoS</dd></div>
        </div>`
        }

        <div id="unlockArea" class="stack-sm">
          ${
            isFree
              ? ""
              : `<button id="payBtn" type="button" class="btn btn-primary btn-block">
                   Pay ${escapeHtml(drop.price)} ${escapeHtml(drop.tokenSymbol)} &amp; unlock
                 </button>`
          }

          ${
            // `free_ad` has no payment path, so this button is the *only*
            // way to unlock it. It must render for free drops too.
            isFree || drop.unlockMode === "paid_ad"
              ? `<button id="adBtn" type="button" class="btn ${
                  isFree ? "btn-primary" : "btn-secondary"
                } btn-block">
                   ${
                     hasAdsgram() && isTelegramContext()
                       ? "Watch a rewarded ad to unlock free"
                       : isFree && !hasMonetag()
                         ? "Unlock the link"
                         : "Complete a sponsored task to unlock free"
                   }
                 </button>`
              : ""
          }

          <div id="adTimerBox" class="alert hidden" style="text-align:center">
            Sponsored task running… <span id="adCountdown" class="mono">0s</span>
          </div>

          <p id="payStatus" class="tiny muted hidden" style="text-align:center;margin:0"></p>

          ${
            isFree
              ? ""
              : `<div style="text-align:center">
                   <button id="toggleTxBtn" type="button" class="btn btn-ghost tiny">
                     Already paid? Verify a transaction hash
                   </button>
                 </div>
                 <form id="verifyTxForm" class="hidden btn-row" style="margin-top:8px">
                   <input id="txHashInput" type="text" required placeholder="0x… transaction hash"
                     class="input mono grow" />
                   <button type="submit" class="btn btn-primary">Verify</button>
                 </form>`
          }

          <div id="unlockError" class="alert alert-error hidden"></div>
        </div>

        <div id="unlockedBox" class="stack-sm hidden">
          <div class="alert alert-ok">Unlocked. This link is yours until the seller moves it.</div>
          <div class="urlbox">
            <input id="unlockedUrlInput" type="text" readonly class="input mono" />
            <button id="copyUnlockedBtn" type="button" class="btn btn-secondary">Copy</button>
          </div>
          <a id="unlockedAnchor" href="#" target="_blank" rel="noopener noreferrer"
            class="btn btn-primary btn-block">Open the link</a>
        </div>
      </div>

      <p class="tiny subtle" style="text-align:center;margin:0">
        The destination is encrypted at rest and released only after the server
        confirms payment on Polygon PoS.
      </p>
    </div>`;
}

export function renderNotFound(message) {
  renderShell(
    "drop",
    `<div class="narrow panel stack" style="text-align:center">
       <h1 class="panel-title">Drop not found</h1>
       <p class="muted tiny">${escapeHtml(message)}</p>
       <a href="#/" class="btn btn-primary">Back to the feed</a>
     </div>`
  );
}

async function renderDropView(dropId) {
  renderShell("drop", `<div class="narrow"><div class="panel empty">Loading drop…</div></div>`);

  let drop;
  try {
    drop = await getDrop(dropId);
  } catch (err) {
    renderNotFound(err instanceof Error ? err.message : "This drop does not exist.");
    return;
  }
  // getDrop returns null for an unknown id rather than throwing. Without
  // this guard, detailHtml(null) throws and the global error handler blanks
  // the whole app — a bad link should only show a "not found" panel.
  if (!drop) {
    renderNotFound("This drop does not exist.");
    return;
  }

  paymentState.drop = drop;
  renderShell("drop", detailHtml(drop));

  const errorEl = document.getElementById("unlockError");
  const statusEl = document.getElementById("payStatus");
  const timerBox = document.getElementById("adTimerBox");
  const countEl = document.getElementById("adCountdown");

  document.getElementById("shareDropBtn")?.addEventListener("click", async () => {
    const btn = document.getElementById("shareDropBtn");
    const ok = await copyText(`${window.location.origin}/#/drop/${drop.id}`);
    btn.classList.toggle("is-copied", ok);
    btn.title = ok ? "Copied" : "Copy failed";
    setTimeout(() => {
      btn.classList.remove("is-copied");
      btn.title = "Copy link to this drop";
    }, 1400);
  });

  function showError(message) {
    errorEl.textContent = message;
    errorEl.classList.remove("hidden");
  }

  function clearError() {
    errorEl.classList.add("hidden");
  }

  function reveal(url) {
    document.getElementById("unlockArea").classList.add("hidden");
    document.getElementById("unlockedUrlInput").value = url;
    document.getElementById("unlockedAnchor").href = url;
    document.getElementById("unlockedBox").classList.remove("hidden");
  }

  async function releaseByTask(taskId) {
    const result = await api.unlock({ dropId: drop.id, taskId });
    reveal(result.url);
  }

  document.getElementById("toggleTxBtn")?.addEventListener("click", () => {
    document.getElementById("verifyTxForm")?.classList.toggle("hidden");
  });

  document.getElementById("copyUnlockedBtn")?.addEventListener("click", async () => {
    const btn = document.getElementById("copyUnlockedBtn");
    const ok = await copyText(document.getElementById("unlockedUrlInput").value);
    btn.textContent = ok ? "Copied" : "Failed";
    setTimeout(() => {
      btn.textContent = "Copy";
    }, 1400);
  });

  /* ------------------------------------------------------- sponsored task */

  document.getElementById("adBtn")?.addEventListener("click", async () => {
    clearError();
    const btn = document.getElementById("adBtn");
    btn.disabled = true;

    try {
      if (hasAdsgram() && isTelegramContext()) {
        statusEl.textContent = "Waiting for the rewarded ad…";
        statusEl.classList.remove("hidden");
        const reward = await runAdsgramReward();
        if (!reward.completed) {
          throw new Error("Finish the rewarded ad to unlock the link.");
        }
        statusEl.classList.add("hidden");
        // Still ask the server for a task so the release is server-controlled.
        const task = await api.unlock({ dropId: drop.id, method: "ad" });
        await waitFor(task.waitSeconds ?? 5);
        await releaseByTask(task.taskId);
        return;
      }

      const link = monetagLink();
      if (link) {
        window.open(link, "_blank", "noopener");
      }

      statusEl.textContent = "Complete the sponsored task, then continue.";
      statusEl.classList.remove("hidden");

      const task = await api.unlock({ dropId: drop.id, method: "ad" });
      await waitFor(task.waitSeconds ?? 5);
      await releaseByTask(task.taskId);
    } catch (err) {
      showError(err instanceof Error ? err.message : "The sponsored task failed.");
      statusEl.classList.add("hidden");
      btn.disabled = false;
    }
  });

  function waitFor(seconds) {
    return new Promise((resolve) => {
      timerBox.classList.remove("hidden");
      let left = seconds;
      countEl.textContent = `${left}s`;
      const timer = setInterval(() => {
        left -= 1;
        countEl.textContent = `${left}s`;
        if (left <= 0) {
          clearInterval(timer);
          timerBox.classList.add("hidden");
          resolve();
        }
      }, 1000);
    });
  }

  /* -------------------------------------------------------------- payment */

  document.getElementById("payBtn")?.addEventListener("click", async () => {
    clearError();
    const btn = document.getElementById("payBtn");
    btn.disabled = true;
    statusEl.classList.remove("hidden");

    try {
      const config = await import("../config.js");
      const runtime = config.getConfig();

      const txHash = await sendEscrowPayment({
        escrowAddress: runtime.escrowAddress,
        dropId: drop.id,
        sellerWallet: drop.sellerWallet,
        tokenAddress: drop.tokenAddress,
        tokenDecimals: drop.tokenDecimals,
        price: drop.price,
        tier: drop.feeTier ?? (drop.unlockMode === "paid_pure" ? TIERS.PREMIUM : TIERS.STANDARD),
        onStatus: (message) => {
          statusEl.textContent = message;
        },
      });

      statusEl.textContent = "Verifying the escrow payment…";
      const result = await api.unlock({ dropId: drop.id, txHash });
      reveal(result.url);
    } catch (err) {
      showError(err instanceof Error ? err.message : "The payment failed.");
      statusEl.classList.add("hidden");
      btn.disabled = false;
    }
  });

  document.getElementById("verifyTxForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearError();
    statusEl.textContent = "Verifying the transaction…";
    statusEl.classList.remove("hidden");
    try {
      const txHash = document.getElementById("txHashInput").value.trim();
      const result = await api.unlock({ dropId: drop.id, txHash });
      reveal(result.url);
    } catch (err) {
      showError(err instanceof Error ? err.message : "Verification failed.");
      statusEl.classList.add("hidden");
    }
  });
}

defineService({ id: "drop", render: renderDropView });
