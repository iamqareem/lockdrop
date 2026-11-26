/**
 * Payment service state.
 *
 * The drop currently on screen and where it is in the unlock flow. Nothing
 * else reads these fields — the feed only links to `#/drop/<id>` and lets
 * the payment service resolve it — so they live here rather than in the
 * shared store.
 */
export const paymentState = {
  /** The drop being checked out, once it has been fetched. */
  drop: null,
  /** True while a payment or unlock request is in flight. */
  unlocking: false,
  /** Human-readable progress, shown under the buttons. */
  unlockStatus: "",
};
