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
 *
 * This service owns its state (`./state.js`). Nothing outside reaches into
 * it — the shell emits `search:open` on the bus and this service decides
 * what that means for its composer.
 */
import { listDrops, searchDrops, countByCategory } from "../../drops.js";
import { renderShell } from "../../core/shell.js";
import { bus } from "../../core/bus.js";
import { defineService } from "../../core/service.js";
import { brandMark, icon } from "../../icons.js";
import { CATEGORIES } from "../../categories.js";
import {
  escapeHtml,
  shortAddress,
  timeAgo,
  formatPrice,
  verdictClass,
  verdictSlug,
  copyText,
} from "../../util.js";
import { feedState } from "./state.js";

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

/** The bus subscription returned by mount, removed on unmount. */
let onSearchOpen = null;

function cardHtml(drop) {
  const score = Math.max(0, Math.min(100, drop.verdictScore ?? 0));
  const slug = verdictSlug(drop.verdict);
  const price =
    drop.unlockMode === "free_ad" || drop.isAdminAd
      ? "Free"
      : formatPrice(drop.price, drop.tokenSymbol);

  return `
    <div class="card">
      <a class="card-hit" href="#/drop/${escapeHtml(drop.id)}"
        aria-label="${escapeHtml(drop.title)}"></a>
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
        <span class="card-foot-right">
          <span>${escapeHtml(timeAgo(drop.createdAt))}</span>
          <button type="button" class="card-share" data-share-id="${escapeHtml(
            drop.id
          )}" aria-label="Copy link to ${escapeHtml(drop.title)}"
            title="Copy link to this drop">
            ${icon("share", "", 12)}<span>Share</span>
          </button>
        </span>
      </div>
    </div>`;
}

/**
 * The toolbar. One control for browsing, one for adding — and nothing else.
 *
 * The theme and the wallet live in the top nav panel from tablet upwards,
 * and in the bottom bar on a phone. Either way they are never here.
 */
function toolbarHtml() {
  const active = CATEGORIES.find((c) => c.id === feedState.feedCategory);
  return `
    <div class="feed-toolbar">
      <button type="button" class="feed-tool" id="categoryBtn"
        aria-haspopup="dialog" aria-expanded="${feedState.feedCategoryModalOpen}">
        ${icon("chevronDown", "", 13)}
        <span id="categoryLabel">${escapeHtml(
          active ? active.label : "Categories"
        )}</span>
      </button>
      <a href="#/lock" class="btn btn-secondary feed-tool-cta">Lock a link</a>
    </div>`;
}

/**
 * The status line inside the composer.
 *
 * It carries the count the old subtitle used to carry, in the one place
 * where a count belongs — next to the thing that produced it.
 */
function statusText() {
  if (feedState.searchStatus === "searching") return "searching";
  if (feedState.searchStatus === "error") return "unavailable";
  if (feedState.searchStatus === "ready") {
    const n = feedState.searchCount;
    return `${n} ${n === 1 ? "result" : "results"}`;
  }
  if (feedState.feedBusy) return "loading";
  const n = feedState.drops.length;
  return `${n} ${n === 1 ? "drop" : "drops"}`;
}

/**
 * The composer — the one vivid thing on the page.
 */
function composerHtml() {
  return `
    <div class="composer${feedState.searchQuery ? " has-text" : ""}" role="search">
      <span class="composer-icon">${icon("search", "", 16)}</span>
      <input id="feedSearch" type="search" class="composer-input"
        placeholder="Search the drops" aria-label="Search the drops"
        autocomplete="off" spellcheck="false"
        value="${escapeHtml(feedState.searchQuery)}" />
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
  if (!feedState.feedCategoryModalOpen) return "";
  const counts = feedState.categoryCounts ?? {};
  const total = Object.values(counts).reduce((sum, n) => sum + n, 0);

  const option = (id, label, hint) => `
    <button type="button" class="category-option ${
      feedState.feedCategory === id ? "is-active" : ""
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
  if (feedState.feedLoading && !feedState.feedLoaded) {
    return `<div class="feed">${Array.from({ length: 6 })
      .map(
        () => `<div class="skeleton" style="height:170px;margin-bottom:16px"></div>`
      )
      .join("")}</div>`;
  }

  if (feedState.drops.length === 0) {
    const category = CATEGORIES.find((c) => c.id === feedState.feedCategory);
    const where = category ? ` in ${category.label}` : "";
    let message;
    if (feedState.searchQuery) {
      message = `Nothing matches “${escapeHtml(feedState.searchQuery)}”${where}.`;
    } else if (category) {
      message = `Nothing in ${escapeHtml(category.label)} yet.`;
    } else {
      message = "Nothing published yet.";
    }
    return `<div class="panel empty">${message}</div>`;
  }

  const cards = `<div class="feed">${feedState.drops.map(cardHtml).join("")}</div>`;
  if (!feedState.feedHasMore) return cards;
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
    feedState.searchStatus === "searching" || feedState.feedBusy
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
  composer.classList.toggle("has-text", Boolean(feedState.searchQuery));
  composer.classList.toggle(
    "is-busy",
    feedState.searchStatus === "searching" || feedState.feedBusy
  );

  const input = document.getElementById("feedSearch");
  if (input && input.value !== feedState.searchQuery) {
    input.value = feedState.searchQuery;
    const end = feedState.searchQuery.length;
    input.setSelectionRange(end, end);
  }

  const status = document.getElementById("composerStatus");
  if (status) status.textContent = statusText();

  // The shell is rebuilt on every route change, so the composing flag has
  // to be carried across rather than remembered.
  setComposing(feedState.searchOpen);
}

function paintToolbar() {
  const label = document.getElementById("categoryLabel");
  if (!label) return;
  const active = CATEGORIES.find((c) => c.id === feedState.feedCategory);
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

  const term = (feedState.searchQuery || "").trim();
  const searching = Boolean(term);
  feedState.searchStatus = searching ? "searching" : "idle";
  feedState.feedBusy = true;
  // The skeleton is only for the very first paint. Afterwards the old cards
  // stay on screen, dimmed, until the new ones arrive.
  feedState.feedLoading = !feedState.feedLoaded && feedState.drops.length === 0;
  paintFeed();
  paintComposer();

  try {
    const data = searching
      ? await searchDrops({
          term,
          category: feedState.feedCategory,
          limit: 40,
          signal: controller.signal,
        })
      : await listDrops({ limit: 40, category: feedState.feedCategory });

    if (id !== requestId) return;
    feedState.drops = data.drops ?? [];
    feedState.feedCursor = data.nextCursor ?? null;
    feedState.feedHasMore = Boolean(data.hasMore);
    feedState.searchCount = feedState.drops.length;
    feedState.searchStatus = searching ? "ready" : "idle";
    feedState.feedLoaded = true;
  } catch (err) {
    if (id !== requestId) return;
    if (err && err.name === "AbortError") return;
    feedState.drops = [];
    feedState.feedHasMore = false;
    feedState.searchStatus = "error";
    feedState.feedLoaded = true;
  } finally {
    if (id !== requestId) return;
    feedState.feedLoading = false;
    feedState.feedBusy = false;
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
      category: feedState.feedCategory,
      cursor: feedState.feedCursor,
    });
    feedState.drops = feedState.drops.concat(data.drops ?? []);
    feedState.feedCursor = data.nextCursor ?? null;
    feedState.feedHasMore = Boolean(data.hasMore);
  } catch {
    /* the list stays as it is */
  }
  paintFeed();
  paintComposer();
}

/** Reads the category counts the first time the picker is opened. */
async function loadCategoryCounts() {
  if (feedState.categoryCounts) return;
  try {
    feedState.categoryCounts = await countByCategory();
    paintCounts();
  } catch {
    /* the counts are a nicety, not a requirement */
  }
}

function paintCounts() {
  const counts = feedState.categoryCounts;
  if (!counts) return;
  const total = Object.values(counts).reduce((sum, n) => sum + n, 0);
  document.querySelectorAll("[data-count-for]").forEach((span) => {
    const id = span.getAttribute("data-count-for") || "";
    span.textContent = String(id ? counts[id] ?? 0 : total);
  });
}

/* ------------------------------------------------------------------ wire */

function closeCategoryModal() {
  feedState.feedCategoryModalOpen = false;
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
      feedState.feedCategory = btn.getAttribute("data-feed-category") || "";
      feedState.feedCategoryModalOpen = false;
      paintModal();
      paintToolbar();
      loadFeed();
    });
  });
}

/**
 * Marks the page as composing.
 *
 * On a phone the composer takes the whole bottom while it is open: the icon
 * bar and the theme toggle step out of the way, and the search is left
 * alone on the bottom edge.
 */
function setComposing(on) {
  feedState.searchOpen = on;
  document.querySelector(".shell")?.classList.toggle("is-composing", on);
}

function wireFeed() {
  const input = document.getElementById("feedSearch");
  if (input) {
    input.addEventListener("focus", () => setComposing(true));
    input.addEventListener("blur", () => setComposing(false));
    input.addEventListener("input", (e) => {
      feedState.searchQuery = e.target.value;
      paintComposer();
      scheduleSearch();
    });
    input.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && feedState.searchQuery) {
        e.preventDefault();
        feedState.searchQuery = "";
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
    feedState.searchQuery = "";
    paintComposer();
    document.getElementById("feedSearch")?.focus();
    loadFeed();
  });

  document.getElementById("categoryBtn")?.addEventListener("click", () => {
    feedState.feedCategoryModalOpen = true;
    paintModal();
    loadCategoryCounts();
    document.getElementById("closeFeedCategory")?.focus();
  });

  wireModal();

  // The feed repaints in place, so the share action is delegated from the
  // slot rather than rebound to every card.
  document.getElementById("feedSlot")?.addEventListener("click", async (e) => {
    const btn = e.target.closest("[data-share-id]");
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    const id = btn.getAttribute("data-share-id") || "";
    const ok = await copyText(`${window.location.origin}/#/drop/${id}`);
    const label = btn.querySelector("span");
    btn.classList.toggle("is-copied", ok);
    if (label) {
      const old = label.textContent;
      label.textContent = ok ? "Copied" : "Failed";
      setTimeout(() => {
        label.textContent = old;
        btn.classList.remove("is-copied");
      }, 1400);
    }
  });

  if (escapeHandler) document.removeEventListener("keydown", escapeHandler);
  escapeHandler = (e) => {
    if (e.key === "Escape" && feedState.feedCategoryModalOpen) {
      feedState.feedCategoryModalOpen = false;
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

async function renderFeed() {
  renderShell("feed", feedBodyHtml());
  wireFeed();

  // The search icon on another view asks for the search, so the composer
  // comes up focused once the feed is on screen.
  if (feedState.searchOpen) {
    feedState.searchOpen = false;
    document.getElementById("feedSearch")?.focus();
  }

  await loadFeed();
  /*
   * The counts are read afterwards, not alongside: the feed is the thing
   * the visitor came for, and two queries at once only make both of them
   * slower. The picker opens with the counts already there.
   */
  loadCategoryCounts();
}

function mount() {
  // The shell's search button emits this instead of touching feed state
  // directly; the feed service decides what "open the search" means.
  onSearchOpen = bus.on("search:open", () => {
    feedState.searchOpen = true;
    if (window.location.hash !== "#/" && window.location.hash !== "") {
      location.hash = "#/";
    }
  });
}

function unmount() {
  onSearchOpen?.();
  onSearchOpen = null;
  document.removeEventListener("keydown", escapeHandler);
  escapeHandler = null;
  if (searchTimer) {
    clearTimeout(searchTimer);
    searchTimer = null;
  }
  if (inFlight) {
    inFlight.abort();
    inFlight = null;
  }
}

defineService({ id: "feed", render: renderFeed, mount, unmount });
