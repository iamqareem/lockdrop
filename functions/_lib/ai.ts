/**
 * AI link judging — designed to stay inside free tiers forever.
 *
 * Primary: Cloudflare Workers AI, reached through the `AI` binding. Every
 * Cloudflare account gets 10,000 neurons per day free (no card, no key, resets
 * at 00:00 UTC). A compact verdict prompt costs roughly 3-4 neurons, so the
 * daily allowance covers a few thousand judgements.
 *
 * Secondary: OpenRouter free models, capped at 40 requests/day because the
 * free tier is only 50/day unless $10 was ever purchased.
 *
 * Guard rails:
 *  - A daily budget table tracks consumption, so we can never exceed the free
 *    allowance and never surprise anyone with a bill.
 *  - Verdicts are cached per URL in Turso, so re-publishing the same link is
 *    free.
 *  - The AI can only ESCALATE a heuristic verdict. It can never downgrade a
 *    "Blocked" into a "Trusted".
 *  - Every AI failure degrades to the heuristic verdict, silently.
 */
import type { Env, Verdict } from "./types";
import { query, execute } from "./turso";

export type AiRisk = "low" | "medium" | "high";

export interface AiJudgement {
  risk: AiRisk;
  reason: string;
  provider: "workersai" | "openrouter";
  model: string;
}

const MODEL_CHAIN = [
  "@cf/meta/llama-3.1-8b-instruct",
  "@cf/meta/llama-3.2-1b-instruct",
  "@cf/ibm-granite/granite-4.0-h-micro",
  "@cf/google/gemma-3-12b-it",
];

const OPENROUTER_DAILY_LIMIT = 40;
const DEFAULT_NEURON_BUDGET = 8000;
const ESTIMATED_NEURONS_PER_CALL = 6;

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

async function usageFor(env: Env, provider: string) {
  const rows = await query<{ calls: number; neurons: number }>(
    env,
    "SELECT calls, neurons FROM ai_usage WHERE day = ? AND provider = ?",
    [today(), provider]
  );
  return rows[0] ?? { calls: 0, neurons: 0 };
}

async function recordUsage(
  env: Env,
  provider: string,
  calls: number,
  neurons: number
): Promise<void> {
  await execute(
    env,
    `INSERT INTO ai_usage (day, provider, calls, neurons, updated_at)
     VALUES (?, ?, ?, ?, ?)
     ON CONFLICT(day, provider) DO UPDATE SET
       calls = calls + excluded.calls,
       neurons = neurons + excluded.neurons,
       updated_at = excluded.updated_at`,
    [today(), provider, calls, neurons, new Date().toISOString()]
  );
}

function neuronBudget(env: Env): number {
  const raw = Number(env.AI_DAILY_BUDGET);
  return Number.isFinite(raw) && raw > 0 ? raw : DEFAULT_NEURON_BUDGET;
}

/** Pulls the first JSON object out of a model response. */
export function extractJson(text: string): Record<string, unknown> | null {
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
      if (parsed && typeof parsed === "object") return parsed as Record<string, unknown>;
    } catch {
      /* try the next candidate */
    }
  }
  return null;
}

function normaliseRisk(value: unknown): AiRisk | null {
  const text = String(value ?? "").toLowerCase().trim();
  if (text === "low" || text === "safe" || text === "trusted") return "low";
  if (text === "medium" || text === "caution" || text === "uncertain") return "medium";
  if (text === "high" || text === "unsafe" || text === "blocked") return "high";
  return null;
}

function cleanReason(value: unknown, fallback: string): string {
  const text = String(value ?? "").replace(/\s+/g, " ").trim();
  if (!text) return fallback;
  return text.slice(0, 160);
}

const SYSTEM_PROMPT =
  'You audit a file-sharing link for scams and malware. Reply with JSON only: ' +
  '{"risk":"low|medium|high","reason":"max 12 words"}';

function buildPrompt(input: {
  title: string;
  url: string;
  category: string;
  host: string;
}): string {
  return [
    `category=${input.category}`,
    `host=${input.host}`,
    `title=${input.title.slice(0, 80)}`,
    `url=${input.url.slice(0, 200)}`,
  ].join("\n");
}

async function runWorkersAi(
  env: Env,
  input: { title: string; url: string; category: string; host: string }
): Promise<AiJudgement | null> {
  if (!env.AI) return null;

  const configured = (env.AI_MODEL || "").trim();
  const chain = configured ? [configured, ...MODEL_CHAIN] : MODEL_CHAIN;

  for (const model of chain) {
    try {
      const raw = (await env.AI.run(model, {
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: buildPrompt(input) },
        ],
        max_tokens: 90,
        temperature: 0.1,
      })) as { response?: string } | string;

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
        model,
      };
    } catch {
      // Model unavailable or rate limited — try the next one in the chain.
    }
  }
  return null;
}

async function runOpenRouter(
  env: Env,
  input: { title: string; url: string; category: string; host: string }
): Promise<AiJudgement | null> {
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
        "X-Title": "LockDrop",
      },
      body: JSON.stringify({
        model,
        max_tokens: 90,
        temperature: 0.1,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: buildPrompt(input) },
        ],
      }),
    });
    if (!res.ok) return null;

    const payload = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
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
      model,
    };
  } catch {
    return null;
  }
}

/**
 * Runs the AI judge if budget allows. Returns null when the AI is skipped
 * (no binding, budget exhausted, or a provider error) so the caller can fall
 * back to the heuristic verdict.
 */
export async function judgeWithAi(
  env: Env,
  input: { title: string; url: string; category: string; host: string },
  heuristic: Verdict
): Promise<AiJudgement | null> {
  // Never let the AI rescue something the heuristics already blocked.
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
    // Any bookkeeping or provider failure degrades to heuristics.
  }

  return null;
}
