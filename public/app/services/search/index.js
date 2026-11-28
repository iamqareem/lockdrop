/**
 * Search service.
 *
 * Owns the search query, runs it against Turso, and renders and wires the
 * composers. The feed renders the list; this service turns keystrokes into
 * a `search:changed` event the feed answers with a fresh query. There are
 * two composers — a compact one in the desktop top bar and the docked one
 * on mobile — but only one query state behind them.
 */
import { searchDrops } from "../../drops.js";
import { bus } from "../../core/bus.js";
import { icon } from "../../icons.js";
import { escapeHtml } from "../../util.js";
import { searchState } from "./state.js";

/** The in-flight search request, so a slow answer never lands late. */
let inFlight = null;

/** Debounce timer shared by whichever composer is being typed into. */
let searchTimer = null;

// The shell emits this from any route. Listen permanently so tapping search
// on #/lock or #/admin still opens the composer on arrival at the feed.
bus.on("search:open", () => {
  searchState.searchOpen = true;
});

// The shell asks the search service to focus whichever composer is visible.
bus.on("search:focus", () => focusComposer());

/**
 * The status line inside a composer.
 *
 * `dropsCount` and `feedBusy` come from the feed — this service doesn't
 * own the list, only the query.
 */
export function statusText(dropsCount, feedBusy) {
  if (searchState.searchStatus === "searching") return "searching";
  if (searchState.searchStatus === "error") return "unavailable";
  if (searchState.searchStatus === "ready") {
    const n = searchState.searchCount;
    return `${n} ${n === 1 ? "result" : "results"}`;
  }
  if (feedBusy) return "loading";
  return `${dropsCount} ${dropsCount === 1 ? "drop" : "drops"}`;
}

/**
 * A composer. `prefix` keeps ids unique when two are on the page (one is
 * hidden by CSS at any given breakpoint, but both exist in the DOM).
 */
export function composerHtml(prefix = "") {
  return `
    <div class="composer${searchState.searchQuery ? " has-text" : ""}" role="search">
      <span class="composer-icon">${icon("search", "", 16)}</span>
      <input id="${prefix}feedSearch" type="search" class="composer-input"
        placeholder="Search the drops" aria-label="Search the drops"
        autocomplete="off" spellcheck="false"
        value="${escapeHtml(searchState.searchQuery)}" />
      <span class="composer-status">${escapeHtml(statusText(0, false))}</span>
      <button type="button" class="composer-clear"
        aria-label="Clear the search">${icon("close", "", 13)}</button>
    </div>`;
}

/** Sets the query without running a search. */
export function setQuery(term) {
  searchState.searchQuery = term;
}

/** Clears the query and the results flag. */
export function clearQuery() {
  searchState.searchQuery = "";
  searchState.searchStatus = "idle";
  searchState.searchCount = 0;
}

/**
 * Records the size of the full (non-searched) list, so the composer status
 * line shows "N drops" when nobody is searching.
 */
export function setListSize(n) {
  searchState.searchCount = n;
  if (searchState.searchStatus !== "searching") {
    searchState.searchStatus = "idle";
  }
}

/**
 * Runs a search against Turso and updates this service's state. Returns the
 * drops so the feed can paint its list. A new call cancels the one in
 * flight unless an external signal is passed in (the feed's load flow
 * manages its own abort controller).
 */
export async function runSearch(term, { category, limit, signal } = {}) {
  const controller = signal ? null : new AbortController();
  const effectiveSignal = signal ?? controller.signal;

  if (inFlight && !signal) {
    inFlight.abort();
    inFlight = null;
  }
  if (!signal) inFlight = controller;

  const searching = Boolean((term || "").trim());
  searchState.searchStatus = searching ? "searching" : "idle";

  try {
    const data = searching
      ? await searchDrops({
          term,
          category: category || "",
          limit: limit ?? 40,
          signal: effectiveSignal,
        })
      : { drops: [] };

    if (!signal && inFlight !== controller) return [];
    searchState.searchCount = (data.drops ?? []).length;
    searchState.searchStatus = searching ? "ready" : "idle";
    return data.drops ?? [];
  } catch (err) {
    if (!signal && inFlight !== controller) return [];
    if (err && err.name === "AbortError") return [];
    searchState.searchStatus = "error";
    return [];
  } finally {
    if (!signal) inFlight = null;
  }
}

/** Emits the feed's reload signal, cancelling any pending debounce. */
function changed() {
  if (searchTimer) {
    clearTimeout(searchTimer);
    searchTimer = null;
  }
  bus.emit("search:changed");
}

/**
 * Binds one composer input. Handles focus reporting, debounced typing,
 * Enter, Escape and clear, then tells the feed to reload the list.
 */
export function bind(inputEl, opts = {}) {
  if (!inputEl) return () => {};
  const composer = inputEl.closest(".composer");
  const clearBtn = composer?.querySelector(".composer-clear");
  const onCompose = opts.onCompose || (() => {});

  const onFocus = () => {
    searchState.searchOpen = true;
    onCompose(true);
  };
  const onBlur = () => {
    searchState.searchOpen = false;
    onCompose(false);
  };
  const onInput = (e) => {
    setQuery(e.target.value);
    if (searchTimer) clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      searchTimer = null;
      changed();
    }, 110);
    bus.emit("search:paint");
  };
  const onKeydown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      changed();
    } else if (e.key === "Escape" && searchState.searchQuery) {
      e.preventDefault();
      clearQuery();
      inputEl.focus();
      changed();
    }
  };
  const onClearClick = () => {
    clearQuery();
    inputEl.focus();
    changed();
  };

  inputEl.addEventListener("focus", onFocus);
  inputEl.addEventListener("blur", onBlur);
  inputEl.addEventListener("input", onInput);
  inputEl.addEventListener("keydown", onKeydown);
  clearBtn?.addEventListener("click", onClearClick);

  return () => {
    inputEl.removeEventListener("focus", onFocus);
    inputEl.removeEventListener("blur", onBlur);
    inputEl.removeEventListener("input", onInput);
    inputEl.removeEventListener("keydown", onKeydown);
    clearBtn?.removeEventListener("click", onClearClick);
    if (searchTimer) {
      clearTimeout(searchTimer);
      searchTimer = null;
    }
  };
}

/** Repaints every composer on the page without stealing focus. */
export function paintComposers(dropsCount, feedBusy) {
  const text = statusText(dropsCount, feedBusy);
  document.querySelectorAll(".composer").forEach((composer) => {
    composer.classList.toggle("has-text", Boolean(searchState.searchQuery));
    composer.classList.toggle(
      "is-busy",
      searchState.searchStatus === "searching" || feedBusy
    );
    const input = composer.querySelector(".composer-input");
    if (input && input.value !== searchState.searchQuery) {
      input.value = searchState.searchQuery;
      const end = searchState.searchQuery.length;
      input.setSelectionRange(end, end);
    }
    const status = composer.querySelector(".composer-status");
    if (status) status.textContent = text;
  });
}

/** Focuses whichever composer is visible at the current breakpoint. */
export function focusComposer() {
  const desktop = window.matchMedia?.("(min-width: 768px)").matches;
  const id = desktop ? "top-feedSearch" : "feedSearch";
  document.getElementById(id)?.focus();
}

/** Mounts the compact top-bar composer (desktop only). */
export function mountTopSearch() {
  const slot = document.getElementById("topSearchSlot");
  if (!slot) return () => {};
  slot.innerHTML = composerHtml("top-");
  return bind(document.getElementById("top-feedSearch"));
}
