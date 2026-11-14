/**
 * POST /api/verify
 *
 * Runs the full verification chain against a candidate link and returns the
 * report the wizard shows before the user reaches step 3.
 */
import type { Env } from "../_lib/types";
import { json, fail, readJson } from "../_lib/http";
import { rateLimit } from "../_lib/auth";
import { verifyWithCache } from "../_lib/verify";
import { CATEGORY_BY_ID } from "../_lib/verify/categories";

interface VerifyBody {
  url?: string;
  categoryId?: string;
  title?: string;
  refresh?: boolean;
}

export const onRequestPost = async ({ request, env }: { request: Request; env: Env }) => {
  const limit = rateLimit(request, env, "verify", 60, 60 * 60 * 1000);
  if (!limit.ok) {
    return fail("Too many verification requests. Try again shortly.", 429, {
      retryAfter: limit.retryAfter,
    });
  }

  const body = await readJson<VerifyBody>(request);
  const url = (body?.url || "").trim();
  const categoryId = (body?.categoryId || "").trim();
  const title = (body?.title || "").trim();

  if (!url) return fail("A link is required.");
  if (url.length > 2048) return fail("That link is too long.");
  if (!CATEGORY_BY_ID.has(categoryId)) {
    return fail(`Unknown category "${categoryId}".`);
  }

  try {
    const report = await verifyWithCache(
      env,
      { url, categoryId, title },
      body?.refresh ? 0 : 1000 * 60 * 60 * 24
    );
    return json({ report });
  } catch (err) {
    return fail(
      err instanceof Error ? err.message : "Verification failed.",
      500
    );
  }
};
