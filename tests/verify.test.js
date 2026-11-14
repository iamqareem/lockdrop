import { test } from "node:test";
import assert from "node:assert/strict";
import { normalise, ensureScheme, looksLikeUrl } from "../functions/_lib/verify/normalize.js";
import { analyseHost, parseIpv4 } from "../functions/_lib/verify/structure.js";
import { analyseHostReputation, analyseContent, editDistance } from "../functions/_lib/verify/host.js";
import { evaluateCategory, detectCategories, CATEGORY_BY_ID } from "../functions/_lib/verify/categories.js";
import { scoreFindings, verdictFromScore, summarise } from "../functions/_lib/verify/rules.js";
import { assertFetchable } from "../functions/_lib/verify/probe.js";
import { verifyLink } from "../functions/_lib/verify/index.js";
const OFFLINE_ENV = {};
const offline = (url, categoryId, title = "Test resource") => verifyLink(OFFLINE_ENV, { url, categoryId, title, skipProbe: true, skipAi: true });
test("ensureScheme adds https to bare hosts", () => {
  assert.equal(ensureScheme("example.com/x"), "https://example.com/x");
  assert.equal(ensureScheme("http://example.com"), "http://example.com");
  assert.equal(ensureScheme("ftp://example.com"), "ftp://example.com");
});
test("looksLikeUrl recognises hosts and rejects prose", () => {
  assert.equal(looksLikeUrl("https://t.me/x"), true);
  assert.equal(looksLikeUrl("t.me/x"), true);
  assert.equal(looksLikeUrl("just some words"), false);
  assert.equal(looksLikeUrl(""), false);
});
test("normalise flags embedded credentials", () => {
  const result = normalise("https://user:secret@t.me/channel");
  assert.ok(result);
  assert.ok(result.findings.some((f) => f.code === "structure.credentials"));
});
test("normalise strips tracking parameters from the canonical form", () => {
  const result = normalise("https://t.me/chan?utm_source=x&id=42");
  assert.ok(result);
  assert.ok(!result.canonical.includes("utm_source"));
  assert.ok(result.canonical.includes("id=42"));
});
test("parseIpv4 understands dotted, decimal and hex forms", () => {
  assert.deepEqual(parseIpv4("192.168.1.1"), [192, 168, 1, 1]);
  assert.deepEqual(parseIpv4("2130706433"), [127, 0, 0, 1]);
  assert.deepEqual(parseIpv4("0x7f000001"), [127, 0, 0, 1]);
  assert.equal(parseIpv4("example.com"), null);
});
test("analyseHost blocks raw IPs and internal hosts", () => {
  assert.ok(analyseHost("192.168.0.5").some((f) => f.code === "host.ip_literal"));
  assert.ok(analyseHost("localhost").some((f) => f.code === "structure.local_host"));
  assert.ok(analyseHost("foo.internal").some((f) => f.code === "structure.local_host"));
  assert.equal(analyseHost("t.me").length, 0);
});
test("editDistance finds single-character typos", () => {
  assert.equal(editDistance("telegram", "telegarm"), 1);
  assert.equal(editDistance("notion", "notion"), 0);
});
test("analyseHostReputation flags typosquats", () => {
  const findings = analyseHostReputation("telemgram.com");
  assert.ok(findings.some((f) => f.code === "host.typosquat"));
});
test("analyseHostReputation flags brands embedded in another domain", () => {
  const findings = analyseHostReputation("telegram-secure-verification.com");
  assert.ok(
    findings.some((f) => f.code === "host.brand_embedding" || f.code === "host.typosquat")
  );
});
test("analyseHostReputation flags high-risk TLDs", () => {
  const findings = analyseHostReputation("something.tk");
  assert.ok(findings.some((f) => f.code === "host.high_risk_tld"));
});
test("analyseHostReputation does not flag the real brand", () => {
  const findings = analyseHostReputation("drive.google.com");
  assert.equal(findings.filter((f) => f.code === "host.typosquat").length, 0);
});
test("analyseContent catches wallet-phishing lures", () => {
  const findings = analyseContent("Please enter your seed phrase to claim your airdrop");
  assert.ok(findings.some((f) => f.code === "content.phishing_lure"));
});
test("evaluateCategory accepts the right brand", () => {
  const rule = CATEGORY_BY_ID.get("notion");
  const result = evaluateCategory(rule, "notion.so", "/my-page-abc123");
  assert.equal(result.matched, true);
});
test("evaluateCategory rejects a different brand", () => {
  const rule = CATEGORY_BY_ID.get("notion");
  const result = evaluateCategory(rule, "dropbox.com", "/s/abc/file.zip");
  assert.equal(result.matched, false);
  assert.ok(result.findings.some((f) => f.code === "category.host_mismatch"));
});
test("evaluateCategory accepts file extensions for generic categories", () => {
  const rule = CATEGORY_BY_ID.get("download");
  assert.equal(evaluateCategory(rule, "example.com", "/files/setup.apk").matched, true);
  assert.equal(evaluateCategory(rule, "example.com", "/page").matched, false);
});
test("detectCategories finds the brands a URL belongs to", () => {
  assert.ok(detectCategories("drive.google.com", "/file/d/abc").includes("gdrive"));
  assert.ok(detectCategories("pan.quark.cn", "/s/abc").includes("quark"));
  assert.ok(detectCategories("cloud.example.org", "/index.php/s/token123").includes("nextcloud"));
});
test("scoreFindings maps severities to a risk score", () => {
  assert.equal(scoreFindings([{ code: "x", severity: "info", message: "" }]), 0);
  assert.equal(scoreFindings([{ code: "x", severity: "medium", message: "" }]), 12);
  assert.equal(scoreFindings([{ code: "x", severity: "critical", message: "" }]), 70);
  assert.equal(scoreFindings([{ code: "x", severity: "critical", message: "" }]), 70);
});
test("verdictFromScore applies the thresholds", () => {
  assert.equal(verdictFromScore(0), "Trusted");
  assert.equal(verdictFromScore(30), "Caution");
  assert.equal(verdictFromScore(70), "Blocked");
});
test("summarise uses the most severe finding", () => {
  const reason = summarise(
    [
      { code: "a", severity: "low", message: "Minor thing." },
      { code: "b", severity: "critical", message: "Serious thing." }
    ],
    "Blocked",
    "example.com"
  );
  assert.match(reason, /Serious thing/);
});
test("assertFetchable refuses internal and literal addresses", () => {
  assert.equal(assertFetchable("https://example.com").ok, true);
  assert.equal(assertFetchable("http://127.0.0.1/x").ok, false);
  assert.equal(assertFetchable("http://169.254.169.254/latest/meta-data").ok, false);
  assert.equal(assertFetchable("http://localhost:8788").ok, false);
  assert.equal(assertFetchable("file:///etc/passwd").ok, false);
  assert.equal(assertFetchable("javascript:alert(1)").ok, false);
});
test("a clean Telegram link verifies as Trusted", async () => {
  const report = await offline("https://t.me/examplechannel", "telegram");
  assert.equal(report.verdict, "Trusted");
  assert.equal(report.categoryMatched, true);
  assert.ok(report.score < 25);
});
test("a phishing link is Blocked", async () => {
  const report = await offline(
    "https://seed-phrase-backup.example.xyz/verify-wallet",
    "document"
  );
  assert.equal(report.verdict, "Blocked");
});
test("a brand mismatch is Blocked", async () => {
  const report = await offline("https://drive.google.com/file/d/abc123", "notion");
  assert.equal(report.verdict, "Blocked");
  assert.ok(
    report.findings.some(
      (f) => f.code === "category.brand_mismatch" || f.code === "category.host_mismatch"
    )
  );
});
test("a plain HTTP link is at least a Caution", async () => {
  const report = await offline("http://t.me/examplechannel", "telegram");
  assert.notEqual(report.verdict, "Trusted");
});
test("a malformed URL is Blocked", async () => {
  const report = await offline("not a url at all", "telegram");
  assert.equal(report.verdict, "Blocked");
});
test("the report always carries a usable reason", async () => {
  const report = await offline("https://t.me/examplechannel", "telegram");
  assert.ok(report.reason.length > 0);
  assert.ok(report.reason.length <= 200);
});
