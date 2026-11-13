const OPENROUTER_API_KEY = (
  import.meta.env.VITE_OPENROUTER_API_KEY || ""
).trim();
const OPENROUTER_MODEL = (
  import.meta.env.VITE_OPENROUTER_MODEL || "openrouter/free"
).trim();

export const isOpenRouterConfigured = Boolean(
  OPENROUTER_API_KEY && !OPENROUTER_API_KEY.includes("YOUR_OPENROUTER")
);

const SUSPICIOUS_TLDS = [".zip", ".mov", ".tk", ".ml", ".ga", ".cf", ".gq", ".xyz"];

function localHeuristicJudgement(title, rawUrl, note) {
  const parsed = new URL(rawUrl);
  const host = parsed.hostname.toLowerCase();
  const full = `${title} ${rawUrl}`.toLowerCase();

  const isIp = /^\d{1,3}(\.\d{1,3}){3}$/.test(host);
  const hasExecutable = /\.(exe|scr|bat|cmd|msi|ps1|apk)(\?|$)/i.test(parsed.pathname);
  const hasPhishWords = /(seed-phrase|mnemonic|wallet-verify|airdrop-claim|metamask-sync)/i.test(
    full
  );
  const hasSuspiciousTld = SUSPICIOUS_TLDS.some((tld) => host.endsWith(tld));

  if (isIp || hasExecutable || hasPhishWords) {
    return {
      safe: false,
      verdict: "Blocked",
      reason: "Suspicious executable, raw IP host, or wallet-phishing pattern detected.",
      source: "heuristic",
    };
  }

  if (hasSuspiciousTld || parsed.protocol === "http:") {
    return {
      safe: true,
      verdict: "Caution",
      reason: note || "Unencrypted HTTP or high-risk TLD; verify sender before opening.",
      source: "heuristic",
    };
  }

  return {
    safe: true,
    verdict: "Checked",
    reason: note || `HTTPS storage link on ${host} passed local format checks.`,
    source: "heuristic",
  };
}

/**
 * Lightweight OpenRouter AI judgement strictly within free-tier token limits.
 * Prompt + completion stay under ~260 tokens total.
 */
export async function judgeLink(title, rawUrl) {
  if (!isOpenRouterConfigured) {
    return localHeuristicJudgement(
      title,
      rawUrl,
      "Local check only (set VITE_OPENROUTER_API_KEY for AI judgement)."
    );
  }

  let host = "";
  try {
    host = new URL(rawUrl).hostname;
  } catch {
    return {
      safe: false,
      verdict: "Blocked",
      reason: "Malformed destination URL.",
      source: "heuristic",
    };
  }

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.origin,
        "X-Title": "LockDrop",
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        max_tokens: 140,
        temperature: 0.1,
        messages: [
          {
            role: "system",
            content:
              'Judge if a paid file link looks legitimate or phishing/malware. Reply ONLY with compact JSON: {"safe":boolean,"verdict":"Trusted"|"Caution"|"Blocked","reason":"under 16 words"}.',
          },
          {
            role: "user",
            content: `Title: ${title.slice(0, 80)}\nDomain: ${host}\nURL: ${rawUrl.slice(0, 220)}`,
          },
        ],
      }),
    });

    if (!res.ok) {
      return localHeuristicJudgement(
        title,
        rawUrl,
        `OpenRouter free tier returned ${res.status}; fell back to local check.`
      );
    }

    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content || "";
    const start = content.indexOf("{");
    const end = content.lastIndexOf("}");
    if (start === -1 || end === -1) {
      return localHeuristicJudgement(title, rawUrl);
    }

    const parsed = JSON.parse(content.slice(start, end + 1));
    const verdict =
      parsed.verdict === "Blocked" || parsed.verdict === "Caution"
        ? parsed.verdict
        : parsed.safe === false
          ? "Blocked"
          : "Trusted";

    return {
      safe: verdict !== "Blocked" && parsed.safe !== false,
      verdict,
      reason: String(parsed.reason || `AI judgement on ${host}`).slice(0, 140),
      source: "openrouter",
    };
  } catch {
    return localHeuristicJudgement(
      title,
      rawUrl,
      "OpenRouter unreachable; passed local URL safety check."
    );
  }
}
