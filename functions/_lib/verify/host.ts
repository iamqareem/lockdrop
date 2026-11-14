/**
 * Host reputation analysis.
 *
 * Looks at the shape of the domain itself: does it imitate a brand we know,
 * does it use a high-risk TLD, does it mix scripts to imitate another domain,
 * is it buried under an unusual number of subdomains.
 */
import type { Finding } from "./types";

/** Domains a user is likely to trust, used for typosquat detection. */
const TRUSTED_BRANDS = [
  "t.me",
  "telegram.org",
  "1drv.ms",
  "onedrive.live.com",
  "drive.google.com",
  "docs.google.com",
  "dropbox.com",
  "db.tt",
  "notion.so",
  "notion.site",
  "nextcloud.com",
  "quark.cn",
  "pan.quark.cn",
  "mega.nz",
  "mediafire.com",
  "youtube.com",
  "youtu.be",
];

const HIGH_RISK_TLDS = new Set([
  "tk", "ml", "ga", "cf", "gq", "xyz", "top", "buzz", "monster", "rest",
  "quest", "sbs", "buzz", "icu", "bond", "lol", "fit", "cam", "surf", "wang",
  "live", "life", "space", "website", "host", "press", "one", "zip",
]);

/**
 * Phrases that only appear on pages built to steal credentials. Their
 * presence is treated as a hard block.
 */
const STRONG_PHISHING_TOKENS = [
  "seed-phrase", "seedphrase", "mnemonic", "recovery-phrase", "wallet-verify",
  "metamask-sync", "trustwallet", "verify-wallet", "phish", "private-key",
];

/**
 * Phrases that are merely associated with scams. Suspicious, but not proof.
 */
const WEAK_PHISHING_TOKENS = [
  "wallet", "airdrop", "claim", "giveaway", "freemoney", "doubler",
  "login-secure", "signin-verify", "account-recover", "support",
];

/** Classic Damerau-Levenshtein distance, good enough for host comparison. */
export function editDistance(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  let prevPrev = new Array<number>(b.length + 1);
  let prev = new Array<number>(b.length + 1);
  let current = new Array<number>(b.length + 1);

  for (let j = 0; j <= b.length; j += 1) prev[j] = j;

  for (let i = 1; i <= a.length; i += 1) {
    current[0] = i;
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      current[j] = Math.min(current[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        current[j] = Math.min(current[j], prevPrev[j - 2] + 1);
      }
    }
    prevPrev = prev;
    prev = current;
    current = new Array<number>(b.length + 1);
  }
  return prev[b.length];
}

function registrableDomain(host: string): string {
  const parts = host.split(".");
  if (parts.length <= 2) return host;
  return parts.slice(-2).join(".");
}

function hasMixedScript(host: string): boolean {
  // Latin plus any other writing system in the same host is a homograph risk.
  const asciiHost = host.replace(/^xn--/, "");
  const hasLatin = /[a-z]/i.test(asciiHost);
  const hasNonAscii = /[^\x00-\x7f]/.test(asciiHost);
  return hasLatin && hasNonAscii;
}

export function analyseHostReputation(
  hostname: string,
  pathname = ""
): Finding[] {
  const findings: Finding[] = [];
  const host = hostname.toLowerCase().replace(/^www\./, "");
  const labels = host.split(".");
  const tld = labels[labels.length - 1];
  const domain = registrableDomain(host);

  if (HIGH_RISK_TLDS.has(tld)) {
    findings.push({
      code: "host.high_risk_tld",
      severity: "medium",
      message: `Uses the high-abuse .${tld} top-level domain.`,
      detail: "Free TLDs such as .tk and .xyz are heavily used for phishing.",
    });
  }

  if (labels.length > 4) {
    findings.push({
      code: "host.deep_subdomains",
      severity: "low",
      message: "Unusually deep subdomain chain.",
    });
  }

  const hyphenCount = domain.split(".")[0].split("-").length - 1;
  if (hyphenCount >= 3) {
    findings.push({
      code: "host.hyphen_heavy",
      severity: "low",
      message: "Domain name is stuffed with hyphens.",
    });
  }

  if (host.startsWith("xn--") || host.includes(".xn--")) {
    findings.push({
      code: "host.punycode",
      severity: "medium",
      message: "Host uses punycode encoding.",
      detail: "Punycode hosts can visually imitate any other domain.",
    });
  }

  if (hasMixedScript(host)) {
    findings.push({
      code: "host.homograph",
      severity: "critical",
      message: "Host mixes scripts and may be impersonating another domain.",
    });
  }

  // Phishing vocabulary is checked across the host AND the path, because
  // "example.com/verify-wallet" is just as luring as "verify-wallet.com".
  const haystack = `${host}${pathname}`.toLowerCase();
  const strong = STRONG_PHISHING_TOKENS.find((token) => haystack.includes(token));
  if (strong) {
    findings.push({
      code: "host.phishing_vocabulary",
      severity: "critical",
      message: "Link uses wording that only appears on credential-stealing pages.",
      detail: `Matched "${strong}".`,
    });
  } else {
    const weak = WEAK_PHISHING_TOKENS.find((token) => haystack.includes(token));
    if (weak) {
      findings.push({
        code: "host.suspicious_keyword",
        severity: "medium",
        message: "Link uses wording commonly associated with crypto scams.",
        detail: `Matched "${weak}".`,
      });
    }
  }

  // Typosquat and brand-embedding detection.
  //
  // If the host IS one of the brands we know, nothing to report. Otherwise we
  // look for a near-miss spelling (telemrgr.com) or for a brand name hiding
  // inside an unrelated domain (telegram-secure.com).
  const isKnownBrand = TRUSTED_BRANDS.some(
    (brand) => host === brand || host.endsWith(`.${brand}`)
  );

  if (!isKnownBrand) {
    const hostRoot = domain.split(".")[0];

    for (const brand of TRUSTED_BRANDS) {
      const brandLabels = brand.split(".");
      const brandRoot = brandLabels[brandLabels.length - 2] ?? brand;
      if (brandRoot.length < 4) continue;

      // A brand name embedded in a domain that is not the brand.
      if (hostRoot.includes(brandRoot)) {
        findings.push({
          code: "host.brand_embedding",
          severity: "critical",
          message: `Host imitates ${brand} but is not ${brand}.`,
          detail: `"${hostRoot}" contains "${brandRoot}".`,
        });
        break;
      }

      // A near-miss spelling.
      const distance = editDistance(hostRoot, brandRoot);
      const tolerance = brandRoot.length <= 5 ? 1 : brandRoot.length <= 9 ? 2 : 3;
      if (distance > 0 && distance <= tolerance && hostRoot.length >= 4) {
        findings.push({
          code: "host.typosquat",
          severity: "critical",
          message: `Host closely resembles ${brand}.`,
          detail: `"${hostRoot}" is ${distance} character${
            distance === 1 ? "" : "s"
          } away from "${brandRoot}".`,
        });
        break;
      }
    }
  }

  return findings;
}

/** Checks the page title and body for well-known phishing lures. */
export function analyseContent(text: string): Finding[] {
  const findings: Finding[] = [];
  const lower = text.toLowerCase();

  const strongLures = [
    "seed phrase", "seed phrase backup", "mnemonic phrase", "recovery phrase",
    "private key", "wallet connect", "connect your wallet", "verify wallet",
    "claim your", "airdrop claim", "double your", "guaranteed returns",
    "metamask unlock", "unlock your wallet", "free nitro",
  ];
  for (const lure of strongLures) {
    if (lower.includes(lure)) {
      findings.push({
        code: "content.phishing_lure",
        severity: "critical",
        message: "Page contains wallet/credential theft language.",
        detail: `Matched "${lure}".`,
      });
      return findings;
    }
  }

  const softSignals = [
    "login", "sign in", "sign-in", "password", "verify your account",
    "suspended", "unusual activity", "update your information",
  ];
  let hits = 0;
  for (const signal of softSignals) {
    if (lower.includes(signal)) hits += 1;
  }
  if (hits >= 3) {
    findings.push({
      code: "content.credential_prompt",
      severity: "medium",
      message: "Page strongly resembles a credential prompt.",
      detail: `Matched ${hits} credential-related phrases.`,
    });
  }

  return findings;
}
