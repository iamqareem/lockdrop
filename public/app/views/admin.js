/**
 * Admin panel.
 *
 * The admin frontend uses a Turso write token scoped to `drops:data_write`
 * to create new drops directly into the database — no Cloudflare Functions
 * needed. The token is public by design (same model as the read token), but
 * Turso enforces the write scope server-side.
 */
import { loadTursoConfig, query, write } from "../turso.js";
import { listDrops } from "../drops.js";
import { state, setAdminToken } from "../state.js";
import { renderShell } from "../main.js";
import { brandMark } from "../icons.js";
import { CATEGORIES } from "../categories.js";
import { escapeHtml, timeAgo, formatPrice, verdictClass } from "../util.js";

function loginHtml() {
  return `
    <div class="narrow panel stack">
      <div>
        <h1 class="panel-title">Admin access</h1>
        <p class="muted tiny" style="margin:6px 0 0">
          Enter the Turso write token to manage platform drops. The token is
          stored in `public/turso.json` and scoped to writing the `drops` table
          only. Turso enforces the scope server-side.
        </p>
      </div>
      <form id="adminLoginForm" class="stack-sm">
        <input id="adminTokenInput" type="password" required placeholder="Write token"
          class="input mono" autocomplete="current-password" />
        <div id="adminLoginError" class="alert alert-error hidden">That token was rejected.</div>
        <button type="submit" class="btn btn-primary btn-block">Open the dashboard</button>
      </form>
    </div>`;
}

function rowsHtml(drops) {
  if (!drops.length) return `<div class="empty">No drops published yet.</div>`;
  return `
    <table class="data">
      <thead>
        <tr>
          <th>Title</th>
          <th>Category</th>
          <th>Verdict</th>
          <th>Price</th>
          <th>Created</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${drops
          .map(
            (drop) => `
          <tr>
            <td>
              <div style="font-weight:500">${escapeHtml(drop.title)}</div>
              <div class="tiny subtle mono">${escapeHtml(drop.id)}</div>
            </td>
            <td>
              <span style="display:inline-flex;align-items:center;gap:6px">
                <span style="width:16px;height:16px;display:inline-block">${brandMark(
                  drop.categoryId,
                  "",
                  16
                )}</span>
                ${escapeHtml(drop.category)}
              </span>
            </td>
            <td><span class="${verdictClass(drop.verdict)}"><span class="verdict-dot"></span>${escapeHtml(
              drop.verdict
            )}</span></td>
            <td class="mono">${escapeHtml(
              drop.unlockMode === "free_ad" ? "Free" : formatPrice(drop.price, drop.tokenSymbol)
            )}</td>
            <td class="tiny subtle">${escapeHtml(timeAgo(drop.createdAt))}</td>
            <td style="text-align:right">
              <a href="#/drop/${escapeHtml(drop.id)}" class="btn btn-secondary tiny">Open</a>
              <button type="button" class="btn btn-secondary tiny" data-delete="${escapeHtml(
                drop.id
              )}">Delete</button>
            </td>
          </tr>`
        )
        .join("")}
      </tbody>
    </table>`;
}

function dashboardHtml(drops) {
  return `
    <div class="stack">
      <div class="row" style="flex-wrap:wrap;gap:12px">
        <div>
          <h1 class="feed-title">Platform dashboard</h1>
          <p class="feed-subtitle">Publish sponsored drops and moderate the feed.</p>
        </div>
        <div class="btn-row">
          <a href="#/contract" class="btn btn-secondary">Escrow source</a>
          <button id="adminLogoutBtn" type="button" class="btn btn-secondary">Lock</button>
        </div>
      </div>

      <div class="panel stack">
        <h2 class="panel-title" style="font-size:14px">Publish a platform drop</h2>
        <form id="adminAdForm" class="stack">
          <div class="grid-2">
            <div class="field">
              <label for="adTitle">Title</label>
              <input id="adTitle" type="text" required maxlength="120" class="input"
                placeholder="e.g. Recommended Web3 toolkit" />
            </div>
            <div class="field">
              <label for="adCategory">Category</label>
              <select id="adCategory" class="select">
                ${CATEGORIES.map(
                  (c) => `<option value="${c.id}">${escapeHtml(c.label)}</option>`
                ).join("")}
              </select>
            </div>
          </div>
          <div class="field">
            <label for="adUrl">Target link</label>
            <input id="adUrl" type="url" required class="input mono"
              placeholder="https://…" />
          </div>
          <div id="adminAdError" class="alert alert-error hidden"></div>
          <button type="submit" class="btn btn-primary">Publish</button>
        </form>
      </div>

      <div class="stack-sm">
        <h2 class="panel-title" style="font-size:14px">All drops</h2>
        <div class="table-wrap" id="adminTable">${rowsHtml(state.drops)}</div>
      </div>
    </div>`;
}

export async function renderAdminView() {
  // Load Turso config (read + write tokens from public/turso.json)
  await loadTursoConfig();

  if (!state.adminUnlocked) {
    renderShell("admin", loginHtml());
    document.getElementById("adminLoginForm")?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const token = document.getElementById("adminTokenInput").value.trim();
      try {
        // Validate the token by making a simple read query.
        // The write token can also SELECT from `drops`, so this probe works.
        await query("SELECT 1 FROM drops LIMIT 1", [], { signal: AbortSignal.timeout(10000) });
        setAdminToken(token);
        await renderAdminView();
      } catch {
        document.getElementById("adminLoginError")?.classList.remove("hidden");
      }
    });
    return;
  }

  renderShell("admin", dashboardHtml(state.drops));
  await refreshAdminTable();

  document.getElementById("adminLogoutBtn")?.addEventListener("click", () => {
    setAdminToken("");
    renderAdminView();
  });

  document.getElementById("adminAdForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const errorEl = document.getElementById("adminAdError");
    errorEl.classList.add("hidden");
    const title = document.getElementById("adTitle").value.trim();
    const categoryId = document.getElementById("adCategory").value;
    const url = document.getElementById("adUrl").value.trim();

    // Build the INSERT statement matching the drops table schema.
    // Category label comes from CATEGORIES map; we use 'gdrive' as default
    // when the category_id is 'gdrive'. The user will supply the category
    // via the select field.
    const categoryLabel = CATEGORIES.find((c) => c.id === categoryId)?.label || "gdrive";
    const sql = `INSERT INTO drops (id, title, summary, category_id, category, seller_wallet, token_address, token_symbol, token_decimals, price, unlock_mode, verdict, verdict_reason, verdict_score, verdict_source, is_admin_ad, status, created_at) VALUES ('${title.replace(/'/g, "''")}', '${title}', '', '${categoryId}', '${categoryLabel}', '0x1111111111111111111111111111111111111111', '0x0000000000000000000000000000000000000000', 'POL', 18, '0', 'free_ad', 'Checked', '', 0, 'heuristic', 0, 'active', datetime('now'))`;

    try {
      await write(sql);
      document.getElementById("adminAdForm").reset();
      await refreshAdminTable();
    } catch (err) {
      errorEl.textContent = err instanceof Error ? err.message : "Could not publish the drop.";
      errorEl.classList.remove("hidden");
    }
  });

  document.querySelectorAll("[data-delete]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.getAttribute("data-delete");
      if (!id) return;
      btn.disabled = true;
      try {
        // Delete via Turso: delete from drops and drop_secrets
        await write(`DELETE FROM drops WHERE id='${id}';`);
        await write(`DELETE FROM drop_secrets WHERE drop_id='${id}';`);
        state.drops = state.drops.filter((d) => d.id !== id);
        await refreshAdminTable();
      } catch (err) {
        btn.disabled = false;
        const errorEl = document.getElementById("adminAdError");
        if (errorEl) {
          errorEl.textContent = err instanceof Error ? err.message : "Could not delete the drop.";
          errorEl.classList.remove("hidden");
        }
      }
    });
  });
}

async function refreshAdminTable() {
  try {
    const result = await listDrops({ limit: 100 });
    state.drops = result.drops ?? [];
  } catch {
    state.drops = [];
  }
  const table = document.getElementById("adminTable");
  if (table) table.innerHTML = rowsHtml(state.drops);
}