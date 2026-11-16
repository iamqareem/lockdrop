/**
 * The create wizard.
 *
 * Step 1  Name the resource and pick a category.
 * Step 2  Paste the link — it is verified server-side against that category
 *         and a full report is shown before the wizard advances.
 * Step 3  Choose the unlock mode, token and price, and set the payout wallet.
 *
 * The verification in step 2 is the gate: a Blocked verdict never reaches
 * step 3, and the server refuses to store a blocked link regardless.
 */
import { api } from "../api.js";
import { getConfig } from "../config.js";
import { state, notify } from "../state.js";
import { renderShell, render } from "../main.js";
import { brandMark, icon } from "../icons.js";
import { CATEGORIES, CATEGORY_BY_ID, quickCheck } from "../categories.js";
import { feeTierFor } from "../shared/drop.js";
import { escapeHtml, debounce, copyText, isAddress } from "../util.js";

const TOKENS = [
  {
    symbol: "POL",
    address: "0x0000000000000000000000000000000000000000",
    decimals: 18,
  },
  {
    symbol: "USDT",
    address: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
    decimals: 6,
  },
  {
    symbol: "USDC",
    address: "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
    decimals: 6,
  },
];

const UNLOCK_MODES = [
  {
    id: "paid_ad",
    label: "Paid + Ads",
    hint: "Buyers can pay, or unlock by watching a sponsored task.",
  },
  {
    id: "paid_pure",
    label: "Ad-free",
    hint: "Payment only — no sponsored task offered to buyers.",
  },
  {
    id: "free_ad",
    label: "Free",
    hint: "No payment. Buyers unlock by completing a sponsored task.",
  },
];

/**
 * The fee tier a mode is sold at, read from the shared contract mirror so the
 * browser never hard-codes the fee. `npm run check` keeps it in step with
 * the compiled contract.
 */
function modeTier(mode) {
  return feeTierFor(mode);
}

const STEP_LABELS = ["name", "link", "price"];

function stepperHtml(step) {
  return `
    <div class="steps">
      ${STEP_LABELS.map(
        (label, i) =>
          `<span class="${i + 1 === step ? "is-current" : ""}">${i + 1} ${label}</span>`
      ).join('<span aria-hidden="true">·</span>')}
    </div>`;
}

function categoryGridHtml() {
  return `
    <div class="category-grid">
      ${CATEGORIES.map(
        (cat) => `
        <button type="button" class="category-option ${
          state.categoryId === cat.id ? "is-active" : ""
        }" data-category="${cat.id}">
          ${brandMark(cat.id, "brand-mark", 16)}
          <span class="category-option-text">
            <span class="category-option-name">${escapeHtml(cat.label)}</span>
            <span class="category-option-hint">${escapeHtml(cat.hint)}</span>
          </span>
        </button>`
      ).join("")}
    </div>`;
}

function reportHtml(report) {
  if (!report) return "";
  const slug = report.verdict.toLowerCase();
  const findings = (report.findings ?? []).filter(
    (f) => f.severity !== "info"
  );

  const probe = report.probe;
  const probeLines = [];
  if (probe) {
    if (probe.status) probeLines.push(`HTTP ${probe.status}`);
    if (probe.contentType) probeLines.push(probe.contentType);
    if (probe.redirectChain?.length > 1) {
      probeLines.push(`${probe.redirectChain.length - 1} redirect(s)`);
    }
    if (probe.title) probeLines.push(probe.title);
    if (probe.error) probeLines.push(probe.error);
  }

  return `
    <div class="report">
      <div class="row" style="align-items:flex-start">
        <div style="min-width:0">
          <span class="verdict verdict-${escapeHtml(report.verdict)}">
            <span class="verdict-dot"></span>${escapeHtml(report.verdict)}
          </span>
          <p class="muted" style="margin:8px 0 0;font-size:12px;line-height:1.55">
            ${escapeHtml(report.reason)}
          </p>
        </div>
        <div style="text-align:right;flex-shrink:0">
          <div class="mono tiny subtle">risk ${report.score ?? 0}/100</div>
          <div class="tiny subtle" style="margin-top:2px">
            ${report.source === "cached"
              ? "cached verdict"
              : report.source === "ai"
                ? "AI judged"
                : "local checks"}
          </div>
        </div>
      </div>

      ${
        probeLines.length
          ? `<div class="tiny subtle" style="margin-top:10px;font-family:var(--font-mono)">
               ${escapeHtml(probeLines.join(" · "))}
             </div>`
          : ""
      }

      ${
        findings.length
          ? `<div style="margin-top:12px">
               ${findings
                 .map(
                   (f) => `
                 <div class="finding sev-${escapeHtml(f.severity)}">
                   <span class="finding-dot"></span>
                   <span>
                     ${escapeHtml(f.message)}
                     ${
                       f.detail
                         ? `<span class="subtle tiny" style="display:block;margin-top:2px">${escapeHtml(
                             f.detail
                           )}</span>`
                         : ""
                     }
                   </span>
                 </div>`
                 )
                 .join("")}
             </div>`
          : `<div class="tiny subtle" style="margin-top:10px">No issues found.</div>`
      }

      <div class="card-score is-${escapeHtml(slug)}" style="margin-top:12px">
        <span style="width:${Math.max(4, Math.min(100, report.score ?? 0))}%"></span>
      </div>
    </div>`;
}

/**
 * Step one is a prompt, not a form. The name is the only thing asked for,
 * and the category modal opens as soon as the name makes sense.
 */
function stepOneHtml() {
  return `
    <div class="prompt">
      <p class="prompt-ask">What are you sharing?</p>
      <input id="wizardTitle" type="text" maxlength="120" class="prompt-field"
        placeholder="Name what you are sharing" autocomplete="off"
        value="${escapeHtml(state.title)}" />
      <p class="prompt-hint">
        press <kbd>enter</kbd> to choose a category
      </p>
    </div>
    <div id="step1Error" class="alert alert-error hidden" style="margin-top:16px"></div>`;
}

/**
 * The category modal. Picking a mark is the confirmation — there is no second
 * button to press.
 */
function categoryModalHtml() {
  if (!state.categoryModalOpen) return "";
  return `
    <div class="modal-backdrop" id="categoryModalBackdrop">
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="categoryModalTitle">
        <div class="modal-head">
          <div>
            <h2 class="modal-title" id="categoryModalTitle">What kind of resource is this?</h2>
            <p class="modal-subtitle">Pick the service it lives on, so the link can be checked against it.</p>
          </div>
          <button id="closeCategoryModal" type="button" class="icon-btn" aria-label="Close">
            ${icon("close", "", 14)}
          </button>
        </div>
        ${categoryGridHtml()}
      </div>
    </div>`;
}

function stepTwoHtml() {
  const category = CATEGORY_BY_ID.get(state.categoryId);
  return `
    <div class="stack">
      <div class="panel" style="background:var(--surface-2);padding:14px">
        <div class="tiny subtle">Selected resource</div>
        <div style="font-weight:600;font-size:13px;margin-top:2px">
          ${escapeHtml(state.title)}
          <span class="subtle" style="font-weight:400">· ${escapeHtml(category?.label ?? "")}</span>
        </div>
      </div>

      <div class="field">
        <label for="wizardUrl">Destination link</label>
        <input id="wizardUrl" type="url" inputmode="url" spellcheck="false"
          placeholder="${escapeHtml(category?.hint ?? "https://…")}"
          value="${escapeHtml(state.url)}" />
        <span id="urlHint" class="hint">Must be a ${escapeHtml(category?.label ?? "")} link.</span>
      </div>

      <div class="btn-row">
        <button id="prevStep2Btn" type="button" class="btn btn-secondary">← Back</button>
        <button id="verifyBtn" type="button" class="btn btn-secondary grow">Verify link</button>
        <button id="nextStep2Btn" type="button" class="btn btn-primary grow" disabled>
          Continue
        </button>
      </div>

      <div id="step2Error" class="alert alert-error hidden"></div>
      <div id="reportBox">${reportHtml(state.report)}</div>
    </div>`;
}

function stepThreeHtml() {
  const mode = UNLOCK_MODES.find((m) => m.id === state.unlockMode) ?? UNLOCK_MODES[0];
  const token = TOKENS.find((t) => t.address === state.tokenAddress) ?? TOKENS[0];
  const isFree = state.unlockMode === "free_ad";
  const fee = modeTier(state.unlockMode);
  const feeBps = fee?.bps ?? 0;
  const feePercent = feeBps / 100;
  const price = Number(state.price) || 0;
  const net = price * (1 - feeBps / 10000);

  return `
    <div class="stack">
      <div class="panel" style="background:var(--surface-2);padding:14px">
        <div class="kv"><dt>Resource</dt><dd style="font-family:var(--font-sans)">${escapeHtml(
          state.title
        )}</dd></div>
        <div class="kv"><dt>Category</dt><dd style="font-family:var(--font-sans)">${escapeHtml(
          CATEGORY_BY_ID.get(state.categoryId)?.label ?? ""
        )}</dd></div>
        <div class="kv"><dt>Verdict</dt><dd><span class="verdict verdict-${escapeHtml(
          state.report?.verdict ?? "Checked"
        )}"><span class="verdict-dot"></span>${escapeHtml(
          state.report?.verdict ?? "Checked"
        )}</span></dd></div>
      </div>

      <div class="field">
        <span class="field-label">Unlock mode</span>
        <div class="segmented">
          ${UNLOCK_MODES.map(
            (m) => `
            <button type="button" class="${state.unlockMode === m.id ? "is-active" : ""}" data-mode="${m.id}">
              ${escapeHtml(m.label)}
            </button>`
          ).join("")}
        </div>
        <span class="hint">${escapeHtml(mode.hint)}</span>
      </div>

      ${
        isFree
          ? ""
          : `
        <div class="grid-2">
          <div class="field">
            <span class="field-label">Token</span>
            <div class="segmented">
              ${TOKENS.map(
                (t) => `
                <button type="button" class="${
                  state.tokenAddress === t.address ? "is-active" : ""
                }" data-token="${t.address}">${t.symbol}</button>`
              ).join("")}
            </div>
          </div>
          <div class="field">
            <label for="step3Price">Price (${escapeHtml(token.symbol)})</label>
            <input id="step3Price" type="number" inputmode="decimal" step="0.0001" min="0.0001"
              value="${escapeHtml(state.price)}" />
          </div>
        </div>

        <div class="field">
          <label for="step3Seller">Your payout wallet (Polygon)</label>
          <input id="step3Seller" type="text" spellcheck="false" class="mono"
            placeholder="0x…" value="${escapeHtml(state.sellerWallet)}" />
          <span class="hint">Payments land here. Connect a wallet to fill it automatically.</span>
        </div>

        <div class="panel" style="background:var(--surface-2);padding:14px">
          <div class="kv">
            <dt>Platform fee</dt>
            <dd>${feePercent}%${fee ? ` <span class="subtle">(${
              fee.tier === 1 ? "premium tier" : "standard tier"
            })</span>` : ""}</dd>          </div>
          <div class="kv"><dt>You receive</dt><dd style="color:var(--ok)">${net.toFixed(
            4
          )} ${escapeHtml(token.symbol)}</dd></div>
        </div>`
      }

      <div id="step3Error" class="alert alert-error hidden"></div>

      <div class="btn-row">
        <button id="prevStep3Btn" type="button" class="btn btn-secondary">← Back</button>
        <button id="lockBtn" type="button" class="btn btn-primary grow" ${
          state.creating ? "disabled" : ""
        }>${state.creating ? "Locking…" : "Lock link in escrow"}</button>
      </div>
    </div>`;
}

function successHtml() {
  const drop = state.lastCreated;
  if (!drop) return "";
  const shareUrl = `${window.location.origin}/#/drop/${drop.id}`;
  return `
    <div class="panel" style="margin-top:18px">
      <div class="row" style="padding-bottom:12px;border-bottom:1px solid var(--border)">
        <span class="verdict verdict-Trusted"><span class="verdict-dot"></span>Locked</span>
        <span class="mono tiny subtle">${escapeHtml(drop.id)}</span>
      </div>
      <h3 class="panel-title" style="margin:14px 0 4px">${escapeHtml(drop.title)}</h3>
      <p class="mono tiny muted" style="margin:0">
        ${
          drop.unlockMode === "free_ad"
            ? "Free via sponsored task"
            : `${escapeHtml(drop.price)} ${escapeHtml(drop.tokenSymbol)} · Polygon PoS`
        }
      </p>
      <div class="urlbox" style="margin-top:16px">
        <input type="text" readonly class="input mono" value="${escapeHtml(shareUrl)}" />
        <button id="copyShareBtn" type="button" class="btn btn-secondary">Copy</button>
      </div>
      <a href="#/drop/${escapeHtml(drop.id)}" class="btn btn-primary btn-block" style="margin-top:10px">
        Open checkout link
      </a>
    </div>`;
}

export function renderCreateView() {
  const steps = { 1: stepOneHtml, 2: stepTwoHtml, 3: stepThreeHtml };
  const html = steps[state.wizardStep]();

  // Step one is just a prompt — no card around it.
  const body =
    state.wizardStep === 1
      ? `<div class="narrow">${html}</div>`
      : `
    <div class="narrow">
      <div class="panel panel-lg">
        ${stepperHtml(state.wizardStep)}
        ${html}
      </div>
      ${successHtml()}
    </div>`;

  renderShell("create", `${body}${categoryModalHtml()}`);

  wireCreateView();
}

let categoryModalTimer = null;

/** Opens the category modal shortly after the name is filled in. */
function openCategoryModalSoon() {
  if (categoryModalTimer) clearTimeout(categoryModalTimer);
  categoryModalTimer = setTimeout(() => {
    if (state.wizardStep !== 1) return;
    if (state.title.trim().length < 3) return;
    if (state.categoryModalOpen) return;
    state.categoryModalOpen = true;
    renderCreateView();
  }, 800);
}

function showError(id, message) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = message;
  el.classList.remove("hidden");
}

function clearError(id) {
  document.getElementById(id)?.classList.add("hidden");
}

function renderReport() {
  const box = document.getElementById("reportBox");
  if (box) box.innerHTML = reportHtml(state.report);

  const next = document.getElementById("nextStep2Btn");
  if (next) {
    const blocked = state.report?.verdict === "Blocked";
    next.disabled = !state.report || blocked;
    next.textContent = blocked ? "Blocked" : "Continue";
  }
}

async function runVerification() {
  const url = state.url.trim();
  const categoryId = state.categoryId;

  const local = quickCheck(categoryId, url);
  const hint = document.getElementById("urlHint");
  if (hint) {
    hint.textContent = local.message;
    hint.style.color = local.ok ? "var(--ok)" : "var(--warn)";
  }
  if (!local.ok) {
    clearError("step2Error");
    return;
  }

  state.verifying = true;
  const btn = document.getElementById("verifyBtn");
  if (btn) {
    btn.disabled = true;
    btn.textContent = "Verifying…";
  }

  try {
    const result = await api.verify({ url, categoryId, title: state.title });
    state.report = result.report;
    clearError("step2Error");
  } catch (err) {
    state.report = null;
    showError(
      "step2Error",
      err instanceof Error ? err.message : "Verification failed. Try again."
    );
  } finally {
    state.verifying = false;
    if (btn) {
      btn.disabled = false;
      btn.textContent = "Verify link";
    }
    renderReport();
  }
}

const debouncedVerify = debounce(() => {
  if (state.wizardStep === 2) void runVerification();
}, 900);

function wireCreateView() {
  const titleInput = document.getElementById("wizardTitle");

  if (titleInput) {
    titleInput.addEventListener("input", (e) => {
      state.title = e.target.value;
      clearError("step1Error");
      // The category modal opens once the name makes sense — on Enter, or
      // once they stop typing.
      if (state.title.trim().length >= 3) {
        if (!state.categoryModalOpen) openCategoryModalSoon();
      } else {
        state.categoryModalOpen = false;
      }
    });

    titleInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (state.title.trim().length < 3) {
          showError("step1Error", "Give the resource a name of at least 3 characters.");
          return;
        }
        clearError("step1Error");
        state.categoryModalOpen = true;
        renderCreateView();
        document.querySelector(".category-option")?.focus();
      }
      if (e.key === "Escape" && state.categoryModalOpen) {
        state.categoryModalOpen = false;
        renderCreateView();
        titleInput.focus();
      }
    });
  }

  document.querySelectorAll("[data-category]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.categoryId = btn.getAttribute("data-category") || "";
      state.report = null;
      state.categoryModalOpen = false;
      state.wizardStep = 2;
      renderCreateView();
    });
  });

  document.getElementById("closeCategoryModal")?.addEventListener("click", () => {
    state.categoryModalOpen = false;
    renderCreateView();
    document.getElementById("wizardTitle")?.focus();
  });

  document.getElementById("categoryModalBackdrop")?.addEventListener("click", (e) => {
    if (e.target.id !== "categoryModalBackdrop") return;
    state.categoryModalOpen = false;
    renderCreateView();
  });

  document.getElementById("prevStep2Btn")?.addEventListener("click", () => {
    state.wizardStep = 1;
    renderCreateView();
  });

  document.getElementById("wizardUrl")?.addEventListener("input", (e) => {
    state.url = e.target.value;
    state.report = null;
    renderReport();
    debouncedVerify();
  });

  document.getElementById("verifyBtn")?.addEventListener("click", () => {
    void runVerification();
  });

  document.getElementById("nextStep2Btn")?.addEventListener("click", () => {
    if (!state.report) {
      showError("step2Error", "Verify the link before continuing.");
      return;
    }
    if (state.report.verdict === "Blocked") {
      showError("step2Error", "This link was blocked and cannot be locked.");
      return;
    }
    clearError("step2Error");
    state.wizardStep = 3;
    renderCreateView();
  });

  document.getElementById("prevStep3Btn")?.addEventListener("click", () => {
    state.wizardStep = 2;
    renderCreateView();
  });

  document.querySelectorAll("[data-mode]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.unlockMode = btn.getAttribute("data-mode") || "paid_ad";
      renderCreateView();
    });
  });

  document.querySelectorAll("[data-token]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.tokenAddress = btn.getAttribute("data-token") || TOKENS[0].address;
      const token = TOKENS.find((t) => t.address === state.tokenAddress);
      if (token) state.tokenSymbol = token.symbol;
      renderCreateView();
    });
  });

  document.getElementById("step3Price")?.addEventListener("input", (e) => {
    state.price = e.target.value;
  });

  document.getElementById("step3Seller")?.addEventListener("input", (e) => {
    state.sellerWallet = e.target.value;
  });

  document.getElementById("lockBtn")?.addEventListener("click", async () => {
    const isFree = state.unlockMode === "free_ad";
    clearError("step3Error");

    if (!isFree) {
      if (!isAddress(state.sellerWallet)) {
        showError("step3Error", "Enter a valid payout wallet address (0x…).");
        return;
      }
      if (!Number.isFinite(Number(state.price)) || Number(state.price) <= 0) {
        showError("step3Error", "Price must be greater than zero.");
        return;
      }
    }

    const btn = document.getElementById("lockBtn");
    state.creating = true;
    btn.disabled = true;
    btn.textContent = "Locking…";

    const token = TOKENS.find((t) => t.address === state.tokenAddress) ?? TOKENS[0];

    try {
      const result = await api.createDrop({
        title: state.title.trim(),
        categoryId: state.categoryId,
        url: state.url.trim(),
        sellerWallet: state.sellerWallet.trim(),
        tokenAddress: token.address,
        tokenSymbol: token.symbol,
        tokenDecimals: token.decimals,
        price: state.price,
        unlockMode: state.unlockMode,
      });

      state.lastCreated = result.drop;
      state.title = "";
      state.url = "";
      state.report = null;
      state.wizardStep = 1;
      state.creating = false;
      renderCreateView();
    } catch (err) {
      state.creating = false;
      btn.disabled = false;
      btn.textContent = "Lock link in escrow";
      const message = err instanceof Error ? err.message : "Could not lock the link.";
      showError("step3Error", message);
      if (err?.payload?.report) {
        state.report = err.payload.report;
        notify();
      }
    }
  });

  document.getElementById("copyShareBtn")?.addEventListener("click", async () => {
    if (!state.lastCreated) return;
    const btn = document.getElementById("copyShareBtn");
    const ok = await copyText(`${window.location.origin}/#/drop/${state.lastCreated.id}`);
    btn.textContent = ok ? "Copied" : "Failed";
    setTimeout(() => {
      btn.textContent = "Copy";
    }, 1400);
  });
}
