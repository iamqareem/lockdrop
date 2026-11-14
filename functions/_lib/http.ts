/** Tiny HTTP helpers shared by every Pages Function route. */

export function json(data: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...headers,
    },
  });
}

export function fail(message: string, status = 400, extra: Record<string, unknown> = {}) {
  return json({ error: message, ...extra }, status);
}

export function methodNotAllowed(allowed: string[]) {
  return json(
    { error: `Method not allowed. Allowed: ${allowed.join(", ")}` },
    405,
    { allow: allowed.join(", ") }
  );
}

/**
 * Best-effort client IP. Cloudflare sets CF-Connecting-IP at the edge; the
 * first entry of X-Forwarded-For is the fallback for local emulation.
 */
export function clientIp(request: Request): string {
  const cf = request.headers.get("CF-Connecting-IP");
  if (cf) return cf;
  const xff = request.headers.get("X-Forwarded-For");
  if (xff) return xff.split(",")[0].trim();
  return "local";
}

export async function readJson<T>(request: Request): Promise<T | null> {
  try {
    const text = await request.text();
    if (!text) return null;
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}
