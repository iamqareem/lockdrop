/**
 * The escrow contract source.
 *
 * Served from the backend so there is a single source of truth: the .sol file
 * in the repository is compiled into the function bundle at deploy time.
 */
import { api } from "../api.js";
import { renderShell } from "../core/shell.js";
import { escapeHtml, copyText } from "../util.js";

export async function renderContractView() {
  renderShell("contract", `<div class="narrow"><div class="panel empty">Loading source…</div></div>`);

  let source = "";
  try {
    const result = await api.contract();
    source = result.source ?? "";
  } catch {
    source = "";
  }

  renderShell(
    "contract",
    `
    <div class="stack">
      <div class="row" style="flex-wrap:wrap;gap:12px">
        <div>
          <h1 class="feed-title">PolygonEscrow.sol</h1>
          <p class="feed-subtitle">
            Deploy once on Polygon PoS (chain 137) with your treasury wallet.
            The contract splits each payment 97/3 between seller and platform.
          </p>
        </div>
        <button id="copySolBtn" type="button" class="btn btn-secondary">Copy Solidity</button>
      </div>
      <pre class="code">${escapeHtml(source || "// Source unavailable.")}</pre>
    </div>`
  );

  document.getElementById("copySolBtn")?.addEventListener("click", async () => {
    const btn = document.getElementById("copySolBtn");
    const ok = await copyText(source);
    btn.textContent = ok ? "Copied" : "Failed";
    setTimeout(() => {
      btn.textContent = "Copy Solidity";
    }, 1400);
  });
}
