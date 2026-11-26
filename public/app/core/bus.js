/**
 * The application's event bus.
 *
 * Services are not allowed to reach into each other's internals: the feed
 * does not know how the search composer is built, and the search composer
 * does not know how the list is rendered. They meet here instead — one says
 * "the query changed", the other decides what that means for its rows.
 *
 * Deliberately tiny and synchronous. A listener that throws is logged rather
 * than rethrown, because an uncaught error here would trip the shell's
 * global handler and swap the whole page for "LockDrop could not start".
 */

export function createBus() {
  const handlers = new Map();

  function on(event, handler) {
    let set = handlers.get(event);
    if (!set) handlers.set(event, (set = new Set()));
    set.add(handler);
    // Returns its own unsubscribe, so a service can clean up on unmount.
    return () => off(event, handler);
  }

  function off(event, handler) {
    handlers.get(event)?.delete(handler);
  }

  function emit(event, payload) {
    const set = handlers.get(event);
    if (!set) return;
    for (const handler of [...set]) {
      try {
        handler(payload);
      } catch (err) {
        console.error(`[bus] listener for "${event}" threw`, err);
      }
    }
  }

  function clear(event) {
    if (event === undefined) handlers.clear();
    else handlers.delete(event);
  }

  return { on, off, emit, clear };
}

/** The one bus the application shares. */
export const bus = createBus();
