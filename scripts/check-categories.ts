/**
 * Asserts that the browser's category list matches the server's authoritative
 * rules. The two live in different runtimes (static ES module vs. TypeScript
 * bundle), so this check is what keeps them from drifting apart.
 *
 *   npx tsx scripts/check-categories.ts
 */
import { CATEGORY_RULES } from "../functions/_lib/verify/categories";
import { CATEGORIES } from "../public/app/categories";

let failures = 0;

const serverIds = CATEGORY_RULES.map((c) => c.id).sort();
const clientIds = CATEGORIES.map((c) => c.id).sort();

if (serverIds.join(",") !== clientIds.join(",")) {
  console.error("FAIL  category ids differ");
  console.error(`  server: ${serverIds.join(", ")}`);
  console.error(`  client: ${clientIds.join(", ")}`);
  failures += 1;
} else {
  console.log(`ok    ${serverIds.length} categories match: ${serverIds.join(", ")}`);
}

if (serverIds.length > 10) {
  console.error(`FAIL  expected at most 10 categories, found ${serverIds.length}`);
  failures += 1;
}

for (const rule of CATEGORY_RULES) {
  const client = CATEGORIES.find((c) => c.id === rule.id);
  if (!client) continue;

  if (client.label !== rule.label) {
    console.error(`FAIL  ${rule.id}: label "${client.label}" != "${rule.label}"`);
    failures += 1;
  }
  if (client.hint !== rule.hint) {
    console.error(`FAIL  ${rule.id}: hint "${client.hint}" != "${rule.hint}"`);
    failures += 1;
  }
  if (client.strictHost !== rule.strictHost) {
    console.error(`FAIL  ${rule.id}: strictHost mismatch`);
    failures += 1;
  }
  if (Boolean(client.detectByPath) !== Boolean(rule.detectByPath)) {
    console.error(`FAIL  ${rule.id}: detectByPath mismatch`);
    failures += 1;
  }

  const serverHosts = [...rule.hosts].sort().join(",");
  const clientHosts = [...client.hosts].sort().join(",");
  if (serverHosts !== clientHosts) {
    console.error(`FAIL  ${rule.id}: hosts differ`);
    console.error(`  server: ${serverHosts}`);
    console.error(`  client: ${clientHosts}`);
    failures += 1;
  }

  const serverExts = [...rule.extensions].sort().join(",");
  const clientExts = [...client.extensions].sort().join(",");
  if (serverExts !== clientExts) {
    console.error(`FAIL  ${rule.id}: extensions differ`);
    failures += 1;
  }
}

if (failures > 0) {
  console.error(`\n${failures} category check(s) failed.`);
  process.exit(1);
}
console.log("All category checks passed.");
