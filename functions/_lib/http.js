function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...headers
    }
  });
}
function fail(message, status = 400, extra = {}) {
  return json({ error: message, ...extra }, status);
}
function methodNotAllowed(allowed) {
  return json(
    { error: `Method not allowed. Allowed: ${allowed.join(", ")}` },
    405,
    { allow: allowed.join(", ") }
  );
}
function clientIp(request) {
  const cf = request.headers.get("CF-Connecting-IP");
  if (cf) return cf;
  const xff = request.headers.get("X-Forwarded-For");
  if (xff) return xff.split(",")[0].trim();
  return "local";
}
async function readJson(request) {
  try {
    const text = await request.text();
    if (!text) return null;
    return JSON.parse(text);
  } catch {
    return null;
  }
}
export {
  clientIp,
  fail,
  json,
  methodNotAllowed,
  readJson
};
