import { query, execute } from "./turso.js";
const MODEL_CHAIN = [
  "@cf/meta/llama-3.1-8b-instruct",
  "@cf/meta/llama-3.2-1b-instruct",
  "@cf/ibm-granite/granite-4.0-h-micro",
  "@cf/google/gemma-3-12b-it"
];
const OPENROUTER_DAILY_LIMIT = 40;
const DEFAULT_NEURON_BUDGET = 8e3;
const ESTIMATED_NEURONS_PER_CALL = 6;
function today() {
  return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
async function usageFor(env, provider) {
  const rows = await query(
    env,
    "SELECT calls, neurons FROM ai_usage WHERE day = ? AND provider = ?",
    [today(), provider]
  );
  return rows[0] ?? { calls: 0, neurons: 0 };
}
async function recordUsage(env, provider, calls, neurons) {
  await execute(
    env,
    `INSERT INTO ai_usage (day, provider, calls, neurons, updated_at)
     VALUES (?, ?, ?, ?, ?)
     ON CONFLICT(day, provider) DO UPDATE SET
       calls = calls + excluded.calls,
       neurons = neurons + excluded.neurons,
       updated_at = excluded.updated_at`,
    [today(), provider, calls, neurons, (/* @__PURE__ */ new Date()).toISOString()]
  );
}
function neuronBudget(env) {
  const raw = Number(env.AI_DAILY_BUDGET);
  return Number.isFinite(raw) && raw > 0 ? raw : DEFAULT_NEURON_BUDGET;
}
function extractJson(text) {
  if (!text) return null;
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const candidates = [fenced?.[1], text];
  for (const candidate of candidates) {
    if (!candidate) continue;
    const start = candidate.indexOf("{");
    const end = candidate.lastIndexOf("}");
    if (start === -1 || end === -1 || end <= start) continue;
    try {
      const parsed = JSON.parse(candidate.slice(start, end + 1));
      if (parsed && typeof parsed === "object") return parsed;
    } catch {
    }
  }
  return null;
}
function normaliseRisk(value) {
  const text = String(value ?? "").toLowerCase().trim();
  if (text === "low" || text === "safe" || text === "trusted") return "low";
  if (text === "medium" || text === "caution" || text === "uncertain") return "medium";
  if (text === "high" || text === "unsafe" || text === "blocked") return "high";
  return null;
}
function cleanReason(value, fallback) {
  const text = String(value ?? "").replace(/\s+/g, " ").trim();
  if (!text) return fallback;
  return text.slice(0, 160);
}
const SYSTEM_PROMPT = 'You audit a file-sharing link for scams and malware. Reply with JSON only: {"risk":"low|medium|high","reason":"max 12 words"}';
function buildPrompt(input) {
  return [
    `category=${input.category}`,
    `host=${input.host}`,
    `title=${input.title.slice(0, 80)}`,
    `url=${input.url.slice(0, 200)}`
  ].join("\n");
}
async function runWorkersAi(env, input) {
  if (!env.AI) return null;
  const configured = (env.AI_MODEL || "").trim();
  const chain = configured ? [configured, ...MODEL_CHAIN] : MODEL_CHAIN;
  for (const model of chain) {
    try {
      const raw = await env.AI.run(model, {
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: buildPrompt(input) }
        ],
        max_tokens: 90,
        temperature: 0.1
      });
      const text = typeof raw === "string" ? raw : raw?.response ?? "";
      const parsed = extractJson(text);
      if (!parsed) continue;
      const risk = normaliseRisk(parsed.risk ?? parsed.verdict);
      if (!risk) continue;
      return {
        risk,
        reason: cleanReason(
          parsed.reason,
          `AI assessed ${input.host} as ${risk} risk for ${input.category}.`
        ),
        provider: "workersai",
        model
      };
    } catch {
    }
  }
  return null;
}
async function runOpenRouter(env, input) {
  const apiKey = (env.OPENROUTER_API_KEY || "").trim();
  if (!apiKey) return null;
  const model = (env.OPENROUTER_MODEL || "openrouter/free").trim();
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
        "HTTP-Referer": "https://lockdrop.app",
        "X-Title": "LockDrop"
      },
      body: JSON.stringify({
        model,
        max_tokens: 90,
        temperature: 0.1,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: buildPrompt(input) }
        ]
      })
    });
    if (!res.ok) return null;
    const payload = await res.json();
    const text = payload.choices?.[0]?.message?.content ?? "";
    const parsed = extractJson(text);
    if (!parsed) return null;
    const risk = normaliseRisk(parsed.risk ?? parsed.verdict);
    if (!risk) return null;
    return {
      risk,
      reason: cleanReason(
        parsed.reason,
        `AI assessed ${input.host} as ${risk} risk for ${input.category}.`
      ),
      provider: "openrouter",
      model
    };
  } catch {
    return null;
  }
}
async function judgeWithAi(env, input, heuristic) {
  if (heuristic === "Blocked") return null;
  try {
    if (env.AI) {
      const usage = await usageFor(env, "workersai");
      if (usage.neurons + ESTIMATED_NEURONS_PER_CALL <= neuronBudget(env)) {
        const result = await runWorkersAi(env, input);
        if (result) {
          await recordUsage(env, "workersai", 1, ESTIMATED_NEURONS_PER_CALL);
          return result;
        }
      }
    }
    if ((env.OPENROUTER_API_KEY || "").trim()) {
      const usage = await usageFor(env, "openrouter");
      if (usage.calls < OPENROUTER_DAILY_LIMIT) {
        const result = await runOpenRouter(env, input);
        if (result) {
          await recordUsage(env, "openrouter", 1, 0);
          return result;
        }
      }
    }
  } catch {
  }
  return null;
}
export {
  extractJson,
  judgeWithAi
};
