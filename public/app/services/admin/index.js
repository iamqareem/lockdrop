/**
 * Admin service.
 *
 * The old build compared the entered PIN against values hard-coded in the
 * client bundle, which made it public. The token is now a server-side secret
 * and every privileged call is authorised on the backend.
 *
 * This service owns its state (`./state.js`), its markup and its API calls.
 * Nothing outside imports it except the composition root, which only wires
 * it to a route.
 */
import { api } from "../../api.js";
import { listDrops } from "../../drops.js";
import { renderShell } from "../../core/shell.js";
import { defineService } from "../../core/service.js";
import { brandMark } from "../../icons.js";
import { CATEGORIES } from "../../categories.js";
import { escapeHtml, timeAgo, formatPrice, verdictClass } from "../../util.js";
import { adminState, setAdminToken } from "./state.js";

function loginHtml() {
  return `
    <div class="narrow panel stack">
      <div>
        <h1 class="panel-title">Admin access</h1>
        <p class="muted tiny" style="margin:6px 0 0">
          Enter the admin token to manage platform drops. The token is stored in
          a Cloudflare secret and checked on the server.
        </p>
      </div>
      <form id="adminLoginForm" class="stack-sm">
        <input id="adminTokenInput" type="password" required placeholder="Admin token"
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
        <div class="table-wrap" id="adminTable">${rowsHtml(drops)}</div>
      </div>
    </div>`;
}

async function renderAdmin() {
  if (!adminState.unlocked) {
    renderShell("admin", loginHtml());
    document.getElementById("adminLoginForm")?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const token = document.getElementById("adminTokenInput").value.trim();
      try {
        // A side-effect-free probe: 200 means the token is accepted.
        const probe = await fetch("/api/admin/check", {
          headers: { "x-admin-token": token },
        });
        if (!probe.ok) throw new Error("rejected");
        setAdminToken(token);
        await renderAdmin();
      } catch {
        document.getElementById("adminLoginError")?.classList.remove("hidden");
      }
    });
    return;
  }

  renderShell("admin", dashboardHtml(adminState.drops));
  await refreshAdminTable();

  document.getElementById("adminLogoutBtn")?.addEventListener("click", () => {
    setAdminToken("");
    renderAdmin();
  });

  document.getElementById("adminAdForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const errorEl = document.getElementById("adminAdError");
    errorEl.classList.add("hidden");
    const title = document.getElementById("adTitle").value.trim();
    const categoryId = document.getElementById("adCategory").value;
    const url = document.getElementById("adUrl").value.trim();

    try {
      await api.adminCreateDrop({ title, categoryId, url }, adminState.token);
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
        await api.adminDeleteDrop(id, adminState.token);
        adminState.drops = adminState.drops.filter((d) => d.id !== id);
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
    adminState.drops = result.drops ?? [];
  } catch {
    adminState.drops = [];
  }
  const table = document.getElementById("adminTable");
  if (table) table.innerHTML = rowsHtml(adminState.drops);
}

defineService({ id: "admin", render: renderAdmin });
