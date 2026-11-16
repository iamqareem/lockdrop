/**
 * The drop feed.
 *
 * The page is deliberately quiet: a toolbar, a masonry of cards, and one
 * vivid search composer docked along the bottom. The composer is the hero —
 * it is the only thing on the page that moves, and it is always in reach.
 *
 * Typing queries Turso straight from the browser and repaints the feed in
 * place. Only the list is re-rendered, never the whole shell, so the input
 * keeps its focus and the caret keeps its position while the user types.
 */
import { listDrops, searchDrops, countByCategory } from "../drops.js";
import { state } from "../state.js";
import { renderShell } from "../main.js";
import { brandMark, icon } from "../icons.js";
import { CATEGORIES } from "../categories.js";
import {
  escapeHtml,
  timeAgo,
  formatPrice,
  verdictClass,
  verdictSlug,
} from "../util.js";

/** Fast enough that the page feels like it is answering you. */
const SEARCH_DEBOUNCE = 110;

/** Guards against a slow response landing on top of a newer one. */
let requestId = 0;

/** The query currently in flight, so the next one can cancel it. */
let inFlight = null;

/** The debounce timer for the composer. */
let searchTimer = null;

/** The document-level Escape handler, re-bound on every render. */
let escapeHandler = null;

function cardHtml(drop) {
  const score = Math.max(0, Math.min(100, drop.verdictScore ?? 0));
  const slug = verdictSlug(drop.verdict);
  const price =
    drop.unlockMode === "free_ad" || drop.isAdminAd
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

/**
 * The toolbar. One control for browsing, one for adding — and nothing else.
 */
function toolbarHtml() {
  const active = CATEGORIES.find((c) => c.id === state.feedCategory);
  return `
    <div class="feed-toolbar">
      <button type="button" class="feed-tool" id="categoryBtn"
        aria-haspopup="dialog" aria-expanded="${state.feedCategoryModalOpen}">
        ${icon("chevronDown", "", 13)}
        <span id="categoryLabel">${escapeHtml(
          active ? active.label : "Categories"
        )}</span>
      </button>
      <a href="#/lock" class="btn btn-secondary">Lock a link</a>
    </div>`;
}

/**
 * The status line inside the composer.
 *
 * It carries the count the old subtitle used to carry, in the one place
 * where a count belongs — next to the thing that produced it.
 */
function statusText() {
  if (state.searchStatus === "searching") return "searching";
  if (state.searchStatus === "error") return "unavailable";
  if (state.searchStatus === "ready") {
    const n = state.searchCount;
    return `${n} ${n === 1 ? "result" : "results"}`;
  }
  if (state.feedBusy) return "loading";
  const n = state.drops.length;
  return `${n} ${n === 1 ? "drop" : "drops"}`;
}

/**
 * The composer — the one vivid thing on the page.
 */
function composerHtml() {
  return `
    <div class="composer${state.searchQuery ? " has-text" : ""}" role="search">
      <span class="composer-icon">${icon("search", "", 16)}</span>
      <input id="feedSearch" type="search" class="composer-input"
        placeholder="Search the drops" aria-label="Search the drops"
        autocomplete="off" spellcheck="false"
        value="${escapeHtml(state.searchQuery)}" />
      <span class="composer-status" id="composerStatus">${escapeHtml(
        statusText()
      )}</span>
      <button type="button" class="composer-clear" id="searchClearBtn"
        aria-label="Clear the search">${icon("close", "", 13)}</button>
    </div>`;
}

/**
 * The category picker.
 *
 * A modal rather than a strip of links: one control in the toolbar, and the
 * categories appear only when they are asked for.
 */
function categoryModalHtml() {
  if (!state.feedCategoryModalOpen) return "";
  const counts = state.categoryCounts ?? {};
  const total = Object.values(counts).reduce((sum, n) => sum + n, 0);

  const option = (id, label, hint) => `
    <button type="button" class="category-option ${
      state.feedCategory === id ? "is-active" : ""
    }" data-feed-category="${escapeHtml(id)}">
      ${brandMark(id || "all", "brand-mark", 16)}
      <span class="category-option-text">
        <span class="category-option-name">${escapeHtml(label)}</span>
        <span class="category-option-hint">${escapeHtml(hint)}</span>
      </span>
      <span class="category-count" data-count-for="${escapeHtml(id)}">${
        id ? (counts[id] ?? 0) : total
      }</span>
    </button>`;

  return `
    <div class="modal-backdrop" id="feedCategoryBackdrop">
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="feedCategoryTitle">
        <div class="modal-head">
          <div>
            <h2 class="modal-title" id="feedCategoryTitle">Browse by category</h2>
            <p class="modal-subtitle">Everything that is locked, grouped by where it lives.</p>
          </div>
          <button id="closeFeedCategory" type="button" class="icon-btn" aria-label="Close">
            ${icon("close", "", 14)}
          </button>
        </div>
        <div class="category-grid">
          ${option("", "Everything", "all drops")}
          ${CATEGORIES.map((cat) => option(cat.id, cat.label, cat.hint)).join("")}
        </div>
      </div>
    </div>`;
}

/**
 * The list itself.
 *
 * Only this is repainted while the user types, which is why the composer
 * keeps its focus.
 */
function listHtml() {
  if (state.feedLoading && !state.feedLoaded) {
    return `<div class="feed">${Array.from({ length: 6 })
      .map(
        () => `<div class="skeleton" style="height:170px;margin-bottom:16px"></div>`
      )
      .join("")}</div>`;
  }

  if (state.drops.length === 0) {
    const category = CATEGORIES.find((c) => c.id === state.feedCategory);
    const where = category ? ` in ${category.label}` : "";
    let message;
    if (state.searchQuery) {
      message = `Nothing matches “${escapeHtml(state.searchQuery)}”${where}.`;
    } else if (category) {
      message = `Nothing in ${escapeHtml(category.label)} yet.`;
    } else {
      message = "Nothing published yet.";
    }
    return `<div class="panel empty">${message}</div>`;
  }

  const cards = `<div class="feed">${state.drops.map(cardHtml).join("")}</div>`;
  if (!state.feedHasMore) return cards;
  return `${cards}
    <div class="feed-more">
      <button id="loadMoreBtn" type="button" class="btn btn-secondary">Load more</button>
    </div>`;
}

/* ------------------------------------------------------------------ paint */

function paintFeed() {
  const slot = document.getElementById("feedSlot");
  if (!slot) return;
  slot.innerHTML = listHtml();
  slot.classList.toggle(
    "is-busy",
    state.searchStatus === "searching" || state.feedBusy
  );
  document.getElementById("loadMoreBtn")?.addEventListener("click", loadMore);
}

/**
 * Repaints the composer without touching the input.
 *
 * The text is only written back when it has drifted from the state, which
 * happens when the state changed from somewhere else — the clear button, the
 * Escape key. While the user is typing they are always the same, so the
 * caret never moves.
 */
function paintComposer() {
  const composer = document.querySelector(".composer");
  if (!composer) return;
  composer.classList.toggle("has-text", Boolean(state.searchQuery));

  const input = document.getElementById("feedSearch");
  if (input && input.value !== state.searchQuery) {
    input.value = state.searchQuery;
    const end = state.searchQuery.length;
    input.setSelectionRange(end, end);
  }

  const status = document.getElementById("composerStatus");
  if (status) status.textContent = statusText();
}

function paintToolbar() {
  const label = document.getElementById("categoryLabel");
  if (!label) return;
  const active = CATEGORIES.find((c) => c.id === state.feedCategory);
  label.textContent = active ? active.label : "Categories";
}

function paintModal() {
  const slot = document.getElementById("feedModalSlot");
  if (!slot) return;
  slot.innerHTML = categoryModalHtml();
  wireModal();
}

/* ------------------------------------------------------------------- load */

/**
 * Fetches the feed — or the search results — and paints them.
 *
 * A new call cancels the one in flight and takes the request number with
 * it, so a slow answer can never overwrite a newer one.
 */
async function loadFeed() {
  const id = ++requestId;
  if (inFlight) {
    inFlight.abort();
    inFlight = null;
  }
  const controller = new AbortController();
  inFlight = controller;

  const term = (state.searchQuery || "").trim();
  const searching = Boolean(term);
  state.searchStatus = searching ? "searching" : "idle";
  state.feedBusy = true;
  // The skeleton is only for the very first paint. Afterwards the old cards
  // stay on screen, dimmed, until the new ones arrive.
  state.feedLoading = !state.feedLoaded && state.drops.length === 0;
  paintFeed();
  paintComposer();

  try {
    const data = searching
      ? await searchDrops({
          term,
          category: state.feedCategory,
          limit: 40,
          signal: controller.signal,
        })
      : await listDrops({ limit: 40, category: state.feedCategory });

    if (id !== requestId) return;
    state.drops = data.drops ?? [];
    state.feedCursor = data.nextCursor ?? null;
    state.feedHasMore = Boolean(data.hasMore);
    state.searchCount = state.drops.length;
    state.searchStatus = searching ? "ready" : "idle";
    state.feedLoaded = true;
  } catch (err) {
    if (id !== requestId) return;
    if (err && err.name === "AbortError") return;
    state.drops = [];
    state.feedHasMore = false;
    state.searchStatus = "error";
    state.feedLoaded = true;
  } finally {
    if (id !== requestId) return;
    state.feedLoading = false;
    state.feedBusy = false;
    inFlight = null;
    paintFeed();
    paintComposer();
  }
}

/** Debounced so a fast typist makes one query, not one per keystroke. */
function scheduleSearch() {
  if (searchTimer) clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    searchTimer = null;
    loadFeed();
  }, SEARCH_DEBOUNCE);
}

async function loadMore() {
  const btn = document.getElementById("loadMoreBtn");
  if (!btn || btn.disabled) return;
  btn.disabled = true;
  btn.textContent = "Loading…";
  try {
    const data = await listDrops({
      limit: 40,
      category: state.feedCategory,
      cursor: state.feedCursor,
    });
    state.drops = state.drops.concat(data.drops ?? []);
    state.feedCursor = data.nextCursor ?? null;
    state.feedHasMore = Boolean(data.hasMore);
  } catch {
    /* the list stays as it is */
  }
  paintFeed();
  paintComposer();
}

/** Reads the category counts the first time the picker is opened. */
async function loadCategoryCounts() {
  if (state.categoryCounts) return;
  try {
    state.categoryCounts = await countByCategory();
    paintCounts();
  } catch {
    /* the counts are a nicety, not a requirement */
  }
}

function paintCounts() {
  const counts = state.categoryCounts;
  if (!counts) return;
  const total = Object.values(counts).reduce((sum, n) => sum + n, 0);
  document.querySelectorAll("[data-count-for]").forEach((span) => {
    const id = span.getAttribute("data-count-for") || "";
    span.textContent = String(id ? counts[id] ?? 0 : total);
  });
}

/* ------------------------------------------------------------------ wire */

function closeCategoryModal() {
  state.feedCategoryModalOpen = false;
  paintModal();
  document.getElementById("categoryBtn")?.focus();
}

function wireModal() {
  document.getElementById("closeFeedCategory")?.addEventListener("click", closeCategoryModal);
  document.getElementById("feedCategoryBackdrop")?.addEventListener("click", (e) => {
    if (e.target.id !== "feedCategoryBackdrop") return;
    closeCategoryModal();
  });
  document.querySelectorAll("[data-feed-category]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.feedCategory = btn.getAttribute("data-feed-category") || "";
      state.feedCategoryModalOpen = false;
      paintModal();
      paintToolbar();
      loadFeed();
    });
  });
}

function wireFeed() {
  const input = document.getElementById("feedSearch");
  if (input) {
    input.addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      paintComposer();
      scheduleSearch();
    });
    input.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && state.searchQuery) {
        e.preventDefault();
        state.searchQuery = "";
        paintComposer();
        loadFeed();
        input.focus();
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        if (searchTimer) {
          clearTimeout(searchTimer);
          searchTimer = null;
        }
        loadFeed();
      }
    });
  }

  document.getElementById("searchClearBtn")?.addEventListener("click", () => {
    state.searchQuery = "";
    paintComposer();
    document.getElementById("feedSearch")?.focus();
    loadFeed();
  });

  document.getElementById("categoryBtn")?.addEventListener("click", () => {
    state.feedCategoryModalOpen = true;
    paintModal();
    loadCategoryCounts();
    document.getElementById("closeFeedCategory")?.focus();
  });

  wireModal();

  if (escapeHandler) document.removeEventListener("keydown", escapeHandler);
  escapeHandler = (e) => {
    if (e.key === "Escape" && state.feedCategoryModalOpen) {
      state.feedCategoryModalOpen = false;
      paintModal();
    }
  };
  document.addEventListener("keydown", escapeHandler);
}

/* ------------------------------------------------------------------ view */

function feedBodyHtml() {
  return `
    ${toolbarHtml()}
    <div id="feedSlot" class="feed-slot">${listHtml()}</div>
    <div class="composer-dock">${composerHtml()}</div>
    <div id="feedModalSlot">${categoryModalHtml()}</div>`;
}

export async function renderFeedView() {
  renderShell("feed", feedBodyHtml());
  wireFeed();
  // The counts are read in the background so the picker opens with them
  // already there.
  loadCategoryCounts();
  await loadFeed();
}
