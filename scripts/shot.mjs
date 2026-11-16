/**
 * A tiny CDP driver: opens a page in headless Chrome, runs a snippet, and
 * saves a screenshot. Used to check the category modal and the search states
 * without a visible browser window.
 *
 *   node scripts/shot.mjs <url> <out.png> <width> <height> <script-file>
 */
import { spawn } from "node:child_process";
import { writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const [, , url, out, w = "1400", h = "900", scriptFile] = process.argv;
if (!url || !out) {
  console.error("usage: node scripts/shot.mjs <url> <out.png> [w] [h] [script]");
  process.exit(1);
}

const profile = mkdtempSync(join(tmpdir(), "cdp-"));
const port = 9333 + Math.floor(process.pid % 500);

const chrome = spawn(
  "google-chrome-stable",
  [
    "--headless=new",
    "--no-sandbox",
    "--disable-gpu",
    "--hide-scrollbars",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profile}`,
    `--window-size=${w},${h}`,
    "about:blank",
  ],
  { stdio: "ignore" }
);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function targetUrl() {
  for (let i = 0; i < 80; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/list`);
      const list = await res.json();
      const page = list.find((t) => t.type === "page");
      if (page?.webSocketDebuggerUrl) return page.webSocketDebuggerUrl;
    } catch {
      /* not up yet */
    }
    await sleep(150);
  }
  throw new Error("Chrome never came up.");
}

class Cdp {
  constructor(ws) {
    this.ws = ws;
    this.id = 0;
    this.pending = new Map();
    ws.addEventListener("message", (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) reject(new Error(msg.error.message));
        else resolve(msg.result);
      }
    });
  }
  send(method, params = {}) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
  async eval(expression) {
    const res = await this.send("Runtime.evaluate", {
      expression,
      awaitPromise: true,
      returnByValue: true,
    });
    if (res.exceptionDetails) {
      throw new Error(res.exceptionDetails.exception?.description ?? "eval failed");
    }
    return res.result?.value;
  }
}

const wsUrl = await targetUrl();
const ws = new WebSocket(wsUrl);
await new Promise((res, rej) => {
  ws.addEventListener("open", res, { once: true });
  ws.addEventListener("error", rej, { once: true });
});

const cdp = new Cdp(ws);
await cdp.send("Page.enable");
await cdp.send("Runtime.enable");
await cdp.send("Emulation.setDeviceMetricsOverride", {
  width: Number(w),
  height: Number(h),
  deviceScaleFactor: 1,
  mobile: Number(w) < 700,
});

await cdp.send("Page.navigate", { url });
await sleep(3500);

/*
 * Dark mode is a preference in localStorage, so it has to be set on the
 * origin and then the page reloaded for the app to read it.
 */
if (process.argv.includes("--dark")) {
  await cdp.eval('localStorage.setItem("lockdrop_dark_mode", "true")');
  await cdp.send("Page.navigate", { url });
  await sleep(3500);
}

if (scriptFile) {
  const { readFileSync } = await import("node:fs");
  const snippet = readFileSync(scriptFile, "utf8");
  const value = await cdp.eval(`(async () => { ${snippet} })()`);
  if (value !== undefined) console.log("result:", JSON.stringify(value, null, 2));
}

await sleep(600);
const shot = await cdp.send("Page.captureScreenshot", { format: "png" });
writeFileSync(out, Buffer.from(shot.data, "base64"));
console.log("wrote", out);

ws.close();
chrome.kill();
process.exit(0);
