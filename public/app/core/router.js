/**
 * Hash routing and the view registry.
 *
 * Views used to import `render()` out of `main.js` while `main.js` imported
 * every view — a cycle that only worked because every call was deferred to
 * a click. This file is the way out of it: a view registers itself, and the
 * router knows nothing about any view's internals.
 *
 *   router → views   (nothing)
 *   views  → router  (render, parseHash)
 *   main   → router + views
 *
 * There is no bundler, so this registry also doubles as the wiring diagram:
 * `main.js` is the only place that decides which view answers which route.
 */

const views = new Map();

/**
 * Binds a route id to the function that renders it.
 *
 * `renderFn(dropId)` receives the id parsed out of `#/drop/<id>` and nothing
 * on other routes.
 */
export function registerView(id, renderFn) {
  views.set(id, renderFn);
}

export function parseHash() {
  const hash = window.location.hash || "#/";
  if (hash.startsWith("#/drop/")) {
    const dropId = hash.slice("#/drop/".length).trim();
    if (dropId) return { view: "drop", dropId };
  }
  if (hash === "#/lock") return { view: "create" };
  if (hash === "#/drops") return { view: "feed" };
  if (hash === "#/admin") return { view: "admin" };
  if (hash === "#/contract") return { view: "contract" };
  // The feed is the front door.
  return { view: "feed" };
}

/**
 * Renders whatever the current hash points at.
 *
 * Re-entrant on purpose: a view calls this after it changes its own state,
 * and `rendering` keeps that from stacking a second full render inside the
 * first one.
 */
export function render() {
  if (rendering) return;
  rendering = true;
  try {
    const { view, dropId } = parseHash();
    const renderFn = views.get(view) ?? views.get("feed");
    if (renderFn) renderFn(dropId);
  } finally {
    rendering = false;
  }
}

let rendering = false;
