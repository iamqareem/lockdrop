/**
 * GET /api/config
 *
 * Public runtime configuration for the browser. This is the only channel
 * through which the frontend learns anything about the deployment, which
 * keeps every secret on the server.
 */
import type { Env } from "../_lib/types";
import { json } from "../_lib/http";
import { CATEGORY_RULES } from "../_lib/verify/categories";

export const onRequestGet = async ({ env }: { env: Env }) => {
  const escrowAddress = (env.ESCROW_ADDRESS || "").trim();
  const adsgramBlockId = (env.ADSGRAM_BLOCK_ID || "").trim();
  const monetagLink = (env.MONETAG_DIRECT_LINK || "").trim();

  return json({
    categories: CATEGORY_RULES.map((rule) => ({
      id: rule.id,
      label: rule.label,
      hint: rule.hint,
      specific: rule.specific,
    })),
    escrowAddress,
    polygonRpc: (env.POLYGON_RPC_URL || "").trim() || null,
    /** Platform fee in basis points, mirroring PolygonEscrow.FEE_BPS. */
    feeBps: 300,
    ads: {
      adsgramBlockId,
      monetagLink,
    },
    adminConfigured: Boolean((env.ADMIN_TOKEN || "").trim()),
    features: {
      ai: Boolean(env.AI),
      openrouter: Boolean((env.OPENROUTER_API_KEY || "").trim()),
    },
  });
};
