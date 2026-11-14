/**
 * The drop feed.
 *
 * A Pinterest-style masonry of text postcards: minimal, monochrome, and
 * descriptive enough that you can judge a drop from the card alone —
 * brand, category, verdict, price and freshness.
 */
import { api } from "../api.js";
import { getConfig } from "../config.js";
import { state, notify } from "../state.js";
import { renderShell, render } from "../main.js";
import { brandMark } from "../icons.js";
import { CATEGORIES } from "../categories.js";
import {
  escapeHtml,
  timeAgo,
  formatPrice,
  verdictClass,
  verdictSlug,
  modeLabel,
} from "../util.js";

function cardHtml(drop) {
  const score = Math.max(0, Math.min(100, drop.verdictScore ?? 0));
  const slug = verdictSlug(drop.verdict);
  const price = drop.unlockMode === "free_ad" || drop.isAdminAd
    ? "Free"
    : formatPrice(drop.price, drop.tokenSymbol);

  return `
    <a class="card" href="#/drop/${escapeHtml(drop.id)}">
      <div class="card-head">
        <span class="card-brand">${brandMark(drop.categoryId, "card-brand", 14)}</span>
        <span class="card-category">${escapeHtml(drop.category || drop.categoryId)}</span>
        <span class="${verdictClass(drop.verdict)} card-verdict">
          <span class="verdict-dot"></span>${escapeHtml(drop.verdict || "Checked")}
        </span>
      </div>
      <h3 class="card-title">${escapeHtml(drop.title)}</h3>
      <p class="card-summary">${escapeHtml(drop.summary || drop.verdictReason || "")}</p>
      ${
        score > 0
          ? `<div class="card-score is-${slug}"><span style="width:${Math.max(
              4,
              score
            )}%"></span></div>`
          : ""
      }
      <div class="card-foot">
        <span class="card-price">${escapeHtml(price)}${
          drop.isAdminAd ? `<span class="card-badge">Sponsored</span>` : ""
        }</span>
        <span>${escapeHtml(timeAgo(drop.createdAt))}</span>
      </div>
    </a>`;
}

function filtersHtml() {
  const chips = [{ id: "", label: "All" }].concat(
    CATEGORIES.map((c) => ({ id: c.id, label: c.label }))
  );
  return `
    <div class="feed-filters">
      ${chips
        .map(
          (chip) => `
        <button type="button" class="chip ${
          state.feedCategory === chip.id ? "is-active" : ""
        }" data-filter="${escapeHtml(chip.id)}">${escapeHtml(chip.label)}</button>`
        )
        .join("")}
    </div>`;
}

function skeletonHtml() {
  return `<div class="feed">${Array.from({ length: 6 })
    .map(() => `<div class="skeleton" style="height:170px;margin-bottom:16px"></div>`)
    .join("")}</div>`;
}

export async function renderFeedView() {
  renderShell("feed", `<div class="narrow"><div class="empty">Loading the feed…</div></div>`);

  if (state.feedLoading && state.drops.length === 0) {
    renderShell(
      "feed",
      `<div class="feed-header">
         <div>
           <h1 class="feed-title">Drop feed</h1>
           <p class="feed-subtitle">Everything locked on LockDrop, newest first.</p>
         </div>
       </div>${skeletonHtml()}`
    );
  }

  try {
    const data = await api.listDrops({ limit: 40, category: state.feedCategory });
    state.drops = data.drops ?? [];
    state.feedCursor = data.nextCursor ?? null;
    state.feedHasMore = Boolean(data.hasMore);
  } catch (err) {
    state.drops = [];
    state.feedCursor = null;
    state.feedHasMore = false;
    const message = err instanceof Error ? err.message : "Could not load the feed.";
    renderShell(
      "feed",
      `<div class="feed-header"><div>
         <h1 class="feed-title">Drop feed</h1>
         <p class="feed-subtitle">Everything locked on LockDrop, newest first.</p>
       </div></div>
       <div class="alert alert-error">${escapeHtml(message)}</div>`
    );
    return;
  } finally {
    state.feedLoading = false;
  }

  const config = getConfig();
  const aiLabel = config.features?.ai ? "AI-verified" : "locally verified";

  renderShell(
    "feed",
    `
    <div class="feed-header">
      <div>
        <h1 class="feed-title">Drop feed</h1>
        <p class="feed-subtitle">${state.drops.length} lock${
          state.drops.length === 1 ? "" : "s"
        } · every link ${escapeHtml(aiLabel)} before it is published.</p>
      </div>
      <a href="#/" class="btn btn-primary">${"Lock a link"}</a>
    </div>
    ${filtersHtml()}
    <div style="height:18px"></div>
    ${
      state.drops.length === 0
        ? `<div class="panel empty">Nothing published here yet.</div>`
        : `<div class="feed">${state.drops.map(cardHtml).join("")}</div>`
    }
    ${
      state.feedHasMore
        ? `<div style="text-align:center;margin-top:12px">
             <button id="loadMoreBtn" type="button" class="btn btn-secondary">Load more</button>
           </div>`
        : ""
    }`
  );

  document.querySelectorAll("[data-filter]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.feedCategory = btn.getAttribute("data-filter") || "";
      state.drops = [];
      state.feedCursor = null;
      state.feedHasMore = false;
      state.feedLoading = true;
      renderFeedView();
    });
  });

  document.getElementById("loadMoreBtn")?.addEventListener("click", async () => {
    const btn = document.getElementById("loadMoreBtn");
    btn.disabled = true;
    btn.textContent = "Loading…";
    try {
      const data = await api.listDrops({
        limit: 40,
        category: state.feedCategory,
        cursor: state.feedCursor,
      });
      state.drops = [...state.drops, ...(data.drops ?? [])];
      state.feedCursor = data.nextCursor ?? null;
      state.feedHasMore = Boolean(data.hasMore);
    } catch {
      /* keep what we have */
    }
    notify();
    renderFeedView();
  });
}
