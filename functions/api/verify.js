import { json, fail, readJson } from "../_lib/http.js";
import { rateLimit } from "../_lib/auth.js";
import { verifyWithCache } from "../_lib/verify/index.js";
import { CATEGORY_BY_ID } from "../_lib/verify/categories.js";
const onRequestPost = async ({ request, env }) => {
  const limit = rateLimit(request, env, "verify", 60, 60 * 60 * 1e3);
  if (!limit.ok) {
    return fail("Too many verification requests. Try again shortly.", 429, {
      retryAfter: limit.retryAfter
    });
  }
  const body = await readJson(request);
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
      body?.refresh ? 0 : 1e3 * 60 * 60 * 24
    );
    return json({ report });
  } catch (err) {
    return fail(
      err instanceof Error ? err.message : "Verification failed.",
      500
    );
  }
};
export {
  onRequestPost
};
