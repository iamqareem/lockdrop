/**
 * Hash routing.
 *
 * Views used to import `render()` out of `main.js` while `main.js` imported
 * every view — a cycle that only worked because every call was deferred to
 * a click. This file is the way out of it: services register themselves
 * with the service registry (`core/service.js`) and the router knows
 * nothing about any of their internals.
 *
 *   router → service registry   (activate, get)
 *   services → router           (render, parseHash)
 *   main   → router + services  (registers them)
 *
 * There is no bundler, so this also doubles as the wiring diagram:
 * `main.js` is the only place that decides which service answers which
 * route.
 */
import { activate, getService } from "./service.js";

/** The service that answers each route. */
const ROUTES = {
  feed: "feed",
  drop: "drop",
  create: "lock",
  admin: "admin",
  contract: "contract",
};

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
 * Re-entrant on purpose: a service calls this after it changes its own
 * state, and `rendering` keeps that from stacking a second full render
 * inside the first one.
 */
export function render() {
  if (rendering) return;
  rendering = true;
  try {
    const { view, dropId } = parseHash();
    const id = ROUTES[view] ?? ROUTES.feed;
    activate(id);
    const service = getService(id);
    if (service) service.render(dropId);
  } finally {
    rendering = false;
  }
}

let rendering = false;
