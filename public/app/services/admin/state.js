/**
 * Admin service state.
 *
 * Owned by the admin service alone: the token, the unlocked flag and the
 * service's own copy of the drop list. The list used to live in the shared
 * store as `state.drops`, where it silently collided with the feed's — the
 * feed would repaint the dashboard's rows and the dashboard would repaint
 * the feed's, depending on which rendered last.
 */
const STORAGE_KEY = "lockdrop_admin_token";

export const adminState = {
  /** The token, kept in sessionStorage so a refresh does not log you out. */
  token: sessionStorage.getItem(STORAGE_KEY) || "",
  /** True once the token has been accepted by the server this session. */
  unlocked: false,
  /** The admin service's own list of drops, independent of the feed's. */
  drops: [],
};

export function setAdminToken(token) {
  adminState.token = token;
  adminState.unlocked = Boolean(token);
  if (token) sessionStorage.setItem(STORAGE_KEY, token);
  else sessionStorage.removeItem(STORAGE_KEY);
}
