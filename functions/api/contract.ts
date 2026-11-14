/**
 * GET /api/contract
 *
 * Returns the canonical PolygonEscrow.sol source. The file is mirrored into
 * `functions/_lib/contract-source.ts` because Pages Functions cannot import
 * arbitrary file types; `npm run check` guarantees the two never drift.
 */
import { POLYGON_ESCROW_SOURCE } from "../_lib/contract-source";
import { json } from "../_lib/http";

export const onRequestGet = async () => json({ source: POLYGON_ESCROW_SOURCE });
