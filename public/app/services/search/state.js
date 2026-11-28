/**
 * Search service state.
 *
 * Owns the search query and everything derived from it: whether the
 * composer is open, whether a query is in flight, and how many results it
 * returned. The feed decides what to *show* for those results; this service
 * decides what is being *searched* and runs the query.
 */
export const searchState = {
  searchQuery: "",
  /** True while the composer is open — on a phone it is the whole bottom. */
  searchOpen: false,
  /** "idle" | "searching" | "ready" | "error". */
  searchStatus: "idle",
  searchCount: 0,
};
