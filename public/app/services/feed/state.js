/**
 * Feed service state.
 *
 * Owns the drop list and everything the composer needs to filter it. The
 * list used to live in the shared store as `state.drops`, where it collided
 * with the admin service's copy — now it has one home here.
 */
export const feedState = {
  drops: [],
  feedCursor: null,
  feedHasMore: false,
  feedLoading: true,
  /** True while a query is in flight, so the list can dim instead of blink. */
  feedBusy: false,
  /** True once the feed has been fetched at least once. */
  feedLoaded: false,
  feedCategory: "",
  /** The category picker, as a modal rather than a strip of links. */
  feedCategoryModalOpen: false,
  /** How many drops each category holds, read when the picker opens. */
  categoryCounts: null,
  searchQuery: "",
  /** True while the composer is open — on a phone it is the whole bottom. */
  searchOpen: false,
  /** "idle" | "searching" | "ready" | "error". */
  searchStatus: "idle",
  searchCount: 0,
};
