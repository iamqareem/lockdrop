/**
 * Helpers for reading and writing drops.
 *
 * The public shape and the fee tiers live in `public/app/shared/drop.js` so
 * that the browser — which reads Turso directly — and the server cannot
 * disagree about them.
 */
import {
  PUBLIC_DROP_COLUMNS,
  toPublicDrop,
  feeTierFor,
} from "../../public/app/shared/drop.js";

export { PUBLIC_DROP_COLUMNS, toPublicDrop, feeTierFor };

const ID_ALPHABET = "abcdefghijklmnopqrstuvwxyz0123456789";

/** Generates a short, URL-safe drop identifier. */
export function generateDropId(length = 10) {
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  let id = "";
  for (let i = 0; i < length; i += 1) {
    id += ID_ALPHABET[bytes[i] % ID_ALPHABET.length];
  }
  return id;
}

export function isValidAddress(value) {
  return /^0x[0-9a-fA-F]{40}$/.test(String(value || "").trim());
}

export function normaliseAddress(value) {
  return String(value || "").trim().toLowerCase();
}
