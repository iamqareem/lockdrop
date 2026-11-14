/**
 * GET /api/contract
 *
 * Returns the canonical PolygonEscrow.sol source, taken from the compiled
 * artifact so the served source is always the source that was deployed.
 */
import artifact from "../../contracts/artifacts/PolygonEscrow.json";
import { json } from "../_lib/http";

export const onRequestGet = async () => json({ source: artifact.source });
