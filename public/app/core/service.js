/**
 * The service contract.
 *
 * A service is a self-contained slice of the application: it owns its own
 * state, renders itself inside the shell, and cleans up after itself. The
 * shell and the router know the contract and nothing more — they never
 * reach into a service's fields, and a service never reaches into another
 * service's. When two services need to talk, they meet on the bus.
 *
 *   defineService({
 *     id: "admin",          // matches the route id from the router
 *     render(dropId),       // draw the service into the shell
 *     mount(),              // optional: run once, on first activation
 *     unmount(),            // optional: run on leaving the route
 *   })
 *
 * `mount`/`unmount` are for anything that outlives a single render: bus
 * subscriptions, timers, watchers. A service that only draws HTML needs
 * neither — the router calls `render` on every hash change and on every
 * state change the service itself triggers.
 */
const registry = new Map();

let activeId = null;

export function defineService({ id, render, mount, unmount }) {
  if (typeof id !== "string" || typeof render !== "function") {
    throw new Error("defineService needs an id and a render function");
  }
  registry.set(id, { id, render, mount, unmount });
}

export function getService(id) {
  return registry.get(id);
}

/**
 * Moves the active service to `id`, running the lifecycle hooks around the
 * transition. A no-op when the service is already active, so calling this
 * on every render does not re-mount anything.
 */
export function activate(id) {
  if (id === activeId) return;

  const previous = activeId ? registry.get(activeId) : null;
  if (previous?.unmount) {
    try {
      previous.unmount();
    } catch (err) {
      console.error(`[service] ${previous.id} unmount threw`, err);
    }
  }

  activeId = id;

  const next = registry.get(id);
  if (next?.mount) {
    try {
      next.mount();
    } catch (err) {
      console.error(`[service] ${next.id} mount threw`, err);
    }
  }
}

/** The service currently on screen, or null before the first render. */
export function activeService() {
  return activeId ? registry.get(activeId) ?? null : null;
}
