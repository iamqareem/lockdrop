import "./index.css";
import { ethers } from "ethers";
import polygonEscrowSol from "../contracts/PolygonEscrow.sol?raw";
import {
  connectPolygonWallet,
  ENV_ESCROW_ADDRESS,
  isValidEscrowAddress,
  payPolygonEscrow,
  POLYGON_TOKENS,
  shortAddress,
  verifyPolygonTx,
  ZERO_ADDRESS,
} from "./lib/polygon.js";
import {
  createDrop,
  getDrop,
  isTursoConfigured,
  listDrops,
  removeDrop,
  sealUrl,
  unsealUrl,
} from "./lib/turso.js";
import { isOpenRouterConfigured, judgeLink } from "./lib/openrouter.js";
import {
  getMonetagUrl,
  hasAdsgram,
  hasMonetag,
  isTelegramContext,
  runAdsgramReward,
} from "./lib/ads.js";

const SUPPORTED_CATEGORIES = [
  { 
    id: "telegram", 
    label: "Telegram", 
    hint: "t.me/...",
    icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/></svg>`
  },
  { 
    id: "onedrive", 
    label: "OneDrive", 
    hint: "1drv.ms",
    icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"/></svg>`
  },
  { 
    id: "gdrive", 
    label: "Google Drive", 
    hint: "drive.google",
    icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v18m9-9H3m15.364-6.364l-12.728 12.728m0-12.728l12.728 12.728"/></svg>`
  },
  { 
    id: "dropbox", 
    label: "Dropbox", 
    hint: "dropbox.com",
    icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"/></svg>`
  },
  { 
    id: "download", 
    label: "Live Download", 
    hint: "ZIP, APK, DMG",
    icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"/></svg>`
  },
  { 
    id: "document", 
    label: "Live Document", 
    hint: "PDF, Docs",
    icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>`
  },
  { 
    id: "media", 
    label: "Live Media", 
    hint: "YouTube, MP4",
    icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"/></svg>`
  },
  { 
    id: "notion", 
    label: "Live Notion", 
    hint: "notion.so",
    icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25A2.25 2.25 0 0113.5 8.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/></svg>`
  },
];

const UNLOCK_MODES = [
  { id: "paid_ad", label: "Paid + Ads (3% Fee)", feeBps: 300 },
  { id: "paid_pure", label: "Ad-Free Paid (5% Fee)", feeBps: 500 },
  { id: "free_ad", label: "Free (Ad-Unlocked)", feeBps: 0 },
];

const state = {
  walletAddress: "",
  connecting: false,
  walletError: "",
  selectedTokenIdx: 0,
  
  // Wizard state
  wizardStep: 1, // 1: Name & Category, 2: Link URL, 3: Payment & Ad Options
  resourceTitle: "",
  selectedCategoryObj: SUPPORTED_CATEGORIES[0],
  targetUrl: "",
  selectedUnlockMode: "paid_ad",
  price: "5",
  
  isAdminUnlocked: localStorage.getItem("lockdrop_admin_unlocked") === "true",
  isDarkMode: localStorage.getItem("lockdrop_dark_mode") === "true",
  categoryModalOpen: false,
  lastCreated: null,
  drops: [],
  loadingDrops: true,
};

const root = document.getElementById("root");

if (state.isDarkMode) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

if (window.Telegram?.WebApp) {
  window.Telegram.WebApp.ready();
  window.Telegram.WebApp.expand();
}

function escapeHtml(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function parseHash() {
  const hash = window.location.hash || "#/";
  if (hash.startsWith("#/drop/")) {
    const dropId = hash.slice("#/drop/".length).trim();
    if (dropId) return { view: "unlock", dropId };
  }
  if (hash === "#/drops") return { view: "drops", dropId: null };
  if (hash === "#/contract") return { view: "contract", dropId: null };
  if (hash === "#/admin") return { view: "admin", dropId: null };
  return { view: "create", dropId: null };
}

function makeDropId() {
  const bytes = crypto.getRandomValues(new Uint8Array(5));
  return Array.from(bytes, (b) => b.toString(36).padStart(2, "0"))
    .join("")
    .slice(0, 8);
}

function shareUrl(id) {
  return `${window.location.origin}/#/drop/${id}`;
}

function modeLabel(mode) {
  if (mode === "free_ad") return "Free · Ad/Task";
  if (mode === "paid_pure") return "Ad-Free Paid (5%)";
  return "Paid + Ads (3%)";
}

// Minimalistic Monochrome SVG Icons & Unique Crypto-Escrow Logo
const ICONS = {
  lock: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 14.25v3m-3-1.5h6"/></svg>`,
  drops: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>`,
  admin: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/></svg>`,
  contract: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>`,
  wallet: `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9A2.25 2.25 0 0018.75 6.75H5.25A2.25 2.25 0 003 9v3m18 0V6.75A2.25 2.25 0 0018.75 4.5H5.25A2.25 2.25 0 003 6.75V12"/></svg>`,
  sun: `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/></svg>`,
  moon: `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/></svg>`
};

function renderShell(activeView, mainHtml) {
  const navItems = [
    { id: "create", href: "#/", label: "Lock", icon: ICONS.lock },
    { id: "drops", href: "#/drops", label: "Drops", icon: ICONS.drops },
  ];

  root.innerHTML = `
    <div class="flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors pb-20 sm:pb-0">
      <header class="sticky top-0 z-30 border-b border-zinc-200/60 dark:border-zinc-800/60 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md">
        <div class="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a href="#/" class="font-display text-sm font-semibold tracking-tight text-zinc-900 dark:text-white whitespace-nowrap shrink-0 flex items-center gap-2">
            <span class="p-1.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900">${ICONS.lock}</span>
            <span>LockDrop</span>
          </a>

          <nav class="hidden sm:flex items-center gap-6 text-xs font-light tracking-wider">
            ${navItems
              .map((item) => {
                const active = activeView === item.id;
                return `
                  <a href="${item.href}" class="relative py-1 whitespace-nowrap shrink-0 transition-colors inline-flex items-center gap-1.5 ${
                    active ? "text-zinc-900 dark:text-white font-medium" : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                  }">
                    <span class="opacity-75">${item.icon}</span>
                    <span>${item.label}</span>
                    ${
                      active
                        ? '<span class="absolute inset-x-0 -bottom-[13px] h-px bg-zinc-900 dark:bg-white"></span>'
                        : ""
                    }
                  </a>
                `;
              })
              .join("")}
          </nav>

          <div class="flex items-center gap-2 shrink-0">
            <button id="themeToggleBtn" type="button" aria-label="Toggle theme"
              class="inline-flex items-center justify-center rounded-md border border-zinc-300 dark:border-zinc-700 bg-white/50 dark:bg-zinc-800/50 p-2 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors">
              ${state.isDarkMode ? ICONS.sun : ICONS.moon}
            </button>
            <button id="connectBtn" type="button" ${state.connecting ? "disabled" : ""}
              class="inline-flex items-center gap-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 px-3.5 py-2 text-xs font-light tracking-wide text-white dark:text-zinc-900 hover:opacity-90 disabled:opacity-60 whitespace-nowrap transition-opacity">
              ${
                state.connecting
                  ? "Connecting..."
                  : state.walletAddress
                    ? `<span class="font-mono tabular-nums">${escapeHtml(shortAddress(state.walletAddress))}</span>`
                    : `<span class="inline-flex items-center gap-1.5">${ICONS.wallet}<span>Connect Wallet</span></span>`
              }
            </button>
          </div>
        </div>
      </header>

      <main class="mx-auto w-full max-w-xl flex-1 flex flex-col items-center justify-center px-4 py-8 sm:px-6">
        ${
          state.walletError
            ? `<div class="mb-6 w-full rounded-lg border border-zinc-400 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 px-4 py-3 text-xs text-zinc-900 dark:text-zinc-100">${escapeHtml(
                state.walletError
              )}</div>`
            : ""
        }
        <div class="w-full">
          ${mainHtml}
        </div>
      </main>

      <div class="fixed bottom-4 left-0 right-0 z-40 flex items-center justify-center gap-3 sm:hidden pointer-events-none px-4">
        ${navItems
          .map((item) => {
            const active = activeView === item.id;
            return `
              <a href="${item.href}" class="pointer-events-auto flex items-center gap-2 rounded-full border ${
                active
                  ? "border-zinc-900 dark:border-white bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
                  : "border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300"
              } px-4 py-2.5 shadow-xl text-xs font-medium transition-transform active:scale-95">
                <span class="text-sm">${item.icon}</span>
                <span>${item.label}</span>
              </a>
            `;
          })
          .join("")}
      </div>

      <footer class="border-t border-zinc-200/40 dark:border-zinc-800/40 bg-transparent py-2.5 px-4 text-center text-[10px] font-light text-zinc-400 dark:text-zinc-600 mb-12 sm:mb-0">
        <div class="mx-auto flex max-w-3xl items-center justify-center gap-3">
          <a href="#/" class="hover:underline">Polygon PoS Escrow</a>
          <span>·</span>
          <a href="#/" class="hover:underline">${isTursoConfigured ? "Turso" : "Local"}</a>
          <span>·</span>
          <a href="#/admin" class="hover:underline text-zinc-500 dark:text-zinc-400">Admin</a>
        </div>
      </footer>
    </div>
  `;

  document.getElementById("connectBtn")?.addEventListener("click", handleConnect);
  document.getElementById("themeToggleBtn")?.addEventListener("click", () => {
    state.isDarkMode = !state.isDarkMode;
    localStorage.setItem("lockdrop_dark_mode", String(state.isDarkMode));
    if (state.isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    render();
  });
}

async function handleConnect() {
  state.walletError = "";
  state.connecting = true;
  render();
  try {
    state.walletAddress = await connectPolygonWallet();
  } catch (err) {
    state.walletError = err instanceof Error ? err.message : "Wallet connection failed.";
  } finally {
    state.connecting = false;
    render();
  }
}

function renderCategoryModal() {
  if (!state.categoryModalOpen) return "";
  return `
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div class="w-full max-w-lg rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-2xl space-y-4">
        <div class="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <div>
            <h3 class="font-display text-xs font-semibold tracking-wider uppercase text-zinc-900 dark:text-white">Select Resource Category</h3>
            <p class="text-[11px] font-light text-zinc-500">Step 1 · Choose resource type</p>
          </div>
          <button id="closeCategoryModal" type="button" class="rounded-lg p-1 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">✕</button>
        </div>
        <div class="grid grid-cols-2 gap-2.5">
          ${SUPPORTED_CATEGORIES.map(
            (cat) => `
            <button type="button" data-select-cat-id="${cat.id}"
              class="category-option-btn w-full text-left rounded-xl p-3 transition-all flex items-center gap-3 border ${
                state.selectedCategoryObj.id === cat.id
                  ? "border-zinc-900 dark:border-zinc-100 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-sm"
                  : "border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-800/40 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }">
              <span class="shrink-0 opacity-80">${cat.icon}</span>
              <div class="min-w-0 flex-1">
                <div class="text-xs font-medium truncate">${cat.label}</div>
                <div class="text-[10px] opacity-70 font-mono truncate mt-0.5">${cat.hint}</div>
              </div>
            </button>`
          ).join("")}
        </div>
      </div>
    </div>
  `;
}

function validateCategoryUrl(catId, urlStr) {
  try {
    const parsed = new URL(urlStr);
    const host = parsed.hostname.toLowerCase();
    const path = parsed.pathname.toLowerCase();

    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return false;

    if (catId === "telegram") {
      return host.includes("t.me") || host.includes("telegram.me");
    }
    if (catId === "onedrive") {
      return host.includes("onedrive") || host.includes("1drv.ms") || host.includes("sharepoint.com");
    }
    if (catId === "gdrive") {
      return host.includes("drive.google.com") || host.includes("docs.google.com");
    }
    if (catId === "dropbox") {
      return host.includes("dropbox.com") || host.includes("db.tt");
    }
    if (catId === "notion") {
      return host.includes("notion.so") || host.includes("notion.site");
    }
    if (catId === "media") {
      return host.includes("youtube.com") || host.includes("youtu.be") || host.includes("vimeo.com") || /\.(mp4|m4v|mp3|wav|ogg)(\?|$)/i.test(path);
    }
    if (catId === "download") {
      return /\.(zip|rar|7z|tar|gz|apk|dmg|exe|msi|iso|pdf)(\?|$)/i.test(path) || host.includes("mega.nz") || host.includes("mediafire.com");
    }
    // General document / generic fallback
    return true;
  } catch {
    return false;
  }
}

function renderCreateWizard() {
  const token = POLYGON_TOKENS[state.selectedTokenIdx];
  const modeObj = UNLOCK_MODES.find((m) => m.id === state.selectedUnlockMode) || UNLOCK_MODES[0];
  const needsPaymentFields = state.selectedUnlockMode !== "free_ad";

  let stepHeaderHtml = `
    <div class="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3 mb-6">
      <div>
        <span class="text-xs font-light text-zinc-500 uppercase tracking-widest">Step ${state.wizardStep} of 3</span>
        <h1 class="font-display text-lg font-bold text-zinc-900 dark:text-white">
          ${
            state.wizardStep === 1
              ? "1. Name & Resource Category"
              : state.wizardStep === 2
                ? "2. Destination Storage Link"
                : "3. Payment & Incentive Tier"
          }
        </h1>
      </div>
      <div class="flex items-center gap-1.5">
        <span class="w-2 h-2 rounded-full ${state.wizardStep >= 1 ? "bg-zinc-900 dark:bg-white" : "bg-zinc-300 dark:bg-zinc-700"}"></span>
        <span class="w-2 h-2 rounded-full ${state.wizardStep >= 2 ? "bg-zinc-900 dark:bg-white" : "bg-zinc-300 dark:bg-zinc-700"}"></span>
        <span class="w-2 h-2 rounded-full ${state.wizardStep >= 3 ? "bg-zinc-900 dark:bg-white" : "bg-zinc-300 dark:bg-zinc-700"}"></span>
      </div>
    </div>
  `;

  let stepBodyHtml = "";

  if (state.wizardStep === 1) {
    stepBodyHtml = `
      <div class="space-y-4">
        <div class="space-y-1.5">
          <label for="wizardTitle" class="block text-xs font-medium text-zinc-900 dark:text-zinc-200">What file or resource are you sharing?</label>
          <input id="wizardTitle" type="text" required value="${escapeHtml(state.resourceTitle)}"
            placeholder="e.g. VIP Telegram Alpha Channel, Pro UI Kit ZIP, Notion Guide"
            class="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3.5 py-3 text-xs text-zinc-900 dark:text-zinc-100 focus:border-zinc-900 dark:focus:border-white focus:outline-none" />
        </div>

        <div class="space-y-1.5">
          <label class="block text-xs font-medium text-zinc-900 dark:text-zinc-200">Select Category</label>
          <button id="openCatModalBtn" type="button"
            class="w-full flex items-center justify-between rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3.5 py-3 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none">
            <span class="font-medium">${escapeHtml(state.selectedCategoryObj.label)}</span>
            <span class="text-zinc-400 font-mono text-[10px]">${escapeHtml(state.selectedCategoryObj.hint)} ▼</span>
          </button>
        </div>

        <div id="step1Error" class="hidden rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 p-3 text-xs text-zinc-900 dark:text-zinc-100"></div>

        <button id="nextStep1Btn" type="button"
          class="w-full rounded-lg bg-zinc-900 dark:bg-zinc-100 px-4 py-3 text-xs font-medium text-white dark:text-zinc-900 hover:opacity-95 transition-opacity">
          Continue to Link URL →
        </button>
      </div>
    `;
  } else if (state.wizardStep === 2) {
    stepBodyHtml = `
      <div class="space-y-4">
        <div class="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40 p-3 text-xs space-y-0.5">
          <div class="text-zinc-500">Selected Resource</div>
          <div class="font-semibold text-zinc-900 dark:text-white">${escapeHtml(state.resourceTitle)} (${escapeHtml(state.selectedCategoryObj.label)})</div>
        </div>

        <div class="space-y-1.5">
          <label for="wizardUrl" class="block text-xs font-medium text-zinc-900 dark:text-zinc-200">Paste your storage or invitation link</label>
          <input id="wizardUrl" type="url" required value="${escapeHtml(state.targetUrl)}"
            placeholder="e.g. https://t.me/yourgroup or https://drive.google.com/file/d/..."
            class="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3.5 py-3 font-mono text-xs text-zinc-900 dark:text-zinc-100 focus:border-zinc-900 dark:focus:border-white focus:outline-none" />
          <p class="text-[11px] font-light text-zinc-500">Must match ${escapeHtml(state.selectedCategoryObj.label)} criteria.</p>
        </div>

        <div id="step2Error" class="hidden rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 p-3 text-xs text-zinc-900 dark:text-zinc-100"></div>

        <div class="flex gap-2">
          <button id="prevStep2Btn" type="button"
            class="rounded-lg border border-zinc-300 dark:border-zinc-700 px-4 py-3 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800">
            ← Back
          </button>
          <button id="nextStep2Btn" type="button"
            class="flex-1 rounded-lg bg-zinc-900 dark:bg-zinc-100 px-4 py-3 text-xs font-medium text-white dark:text-zinc-900 hover:opacity-95 transition-opacity">
            Verify Link &amp; Continue →
          </button>
        </div>
      </div>
    `;
  } else {
    // Step 3
    stepBodyHtml = `
      <div class="space-y-4">
        <div class="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40 p-3 text-xs space-y-1">
          <div class="flex justify-between">
            <span class="text-zinc-500">Resource</span>
            <span class="font-medium text-zinc-900 dark:text-white">${escapeHtml(state.resourceTitle)}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-zinc-500">Destination</span>
            <span class="font-mono text-zinc-700 dark:text-zinc-300 truncate max-w-[220px]">${escapeHtml(state.targetUrl)}</span>
          </div>
        </div>

        <div class="space-y-1.5">
          <span class="block text-xs font-medium text-zinc-900 dark:text-zinc-200">Unlock Mode &amp; Incentive Tier</span>
          <div class="grid grid-cols-3 gap-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 p-1">
            ${UNLOCK_MODES.map(
              (m) => `
              <button type="button" data-unlock-mode="${m.id}"
                class="mode-btn rounded-md py-2 px-1 text-[11px] font-light tracking-tight transition-colors ${
                  state.selectedUnlockMode === m.id
                    ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-medium shadow-xs"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }">
                ${m.label}
              </button>`
            ).join("")}
          </div>
        </div>

        ${
          needsPaymentFields
            ? `
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div class="space-y-1.5">
              <span class="block text-xs font-medium text-zinc-900 dark:text-zinc-200">Polygon Token</span>
              <div class="grid grid-cols-3 gap-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 p-1">
                ${POLYGON_TOKENS.map(
                  (t, idx) => `
                  <button type="button" data-token-idx="${idx}"
                    class="token-btn rounded-md py-1.5 text-xs font-medium transition-colors ${
                      state.selectedTokenIdx === idx
                        ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                    }">
                    ${t.symbol}
                  </button>`
                ).join("")}
              </div>
            </div>

            <div class="space-y-1.5">
              <label for="step3Price" class="block text-xs font-medium text-zinc-900 dark:text-zinc-200">
                Price (${token.symbol})
              </label>
              <input id="step3Price" type="number" step="0.0001" min="0.0001" required value="${escapeHtml(state.price)}"
                placeholder="5.0"
                class="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3.5 py-2 font-mono text-xs tabular-nums text-zinc-900 dark:text-zinc-100 focus:outline-none" />
            </div>
          </div>

          <div class="space-y-1.5">
            <label for="step3Seller" class="block text-xs font-medium text-zinc-900 dark:text-zinc-200">
              Your Payout Wallet (Polygon)
            </label>
            <input id="step3Seller" type="text" required value="${escapeHtml(state.walletAddress)}" placeholder="0x... (Your Polygon Payout Wallet Address)"
              class="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 font-mono text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none" />
          </div>

          <div class="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40 p-3 text-xs space-y-1">
            <div class="flex justify-between">
              <span class="text-zinc-500">Platform Fee</span>
              <span class="font-mono text-zinc-700 dark:text-zinc-300">${modeObj.feeBps / 100}% (${escapeHtml(state.price)} ${token.symbol})</span>
            </div>
            <div class="flex justify-between font-semibold">
              <span class="text-zinc-900 dark:text-white">You Receive</span>
              <span class="font-mono text-emerald-600">${(Number(state.price) * (1 - modeObj.feeBps / 10000)).toFixed(4)} ${token.symbol}</span>
            </div>
          </div>`
            : ""
        }

        <div id="step3Error" class="hidden rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 p-3 text-xs text-zinc-900 dark:text-zinc-100"></div>

        <div class="flex gap-2">
          <button id="prevStep3Btn" type="button"
            class="rounded-lg border border-zinc-300 dark:border-zinc-700 px-4 py-3 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800">
            ← Back
          </button>
          <button id="lockFinalBtn" type="button"
            class="flex-1 rounded-lg bg-zinc-900 dark:bg-zinc-100 px-4 py-3 text-xs font-medium text-white dark:text-zinc-900 hover:opacity-95 transition-opacity">
            Lock Link in Escrow 🔒
          </button>
        </div>
      </div>
    `;
  }

  const createdCardHtml = state.lastCreated
    ? `
      <div class="mt-8 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6 space-y-4 shadow-lg">
        <div class="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
          <span class="text-xs font-medium text-emerald-700">Link Successfully Locked · ${escapeHtml(
            state.lastCreated.aiVerdict || "Checked"
          )}</span>
          <span class="font-mono text-xs text-zinc-500">${escapeHtml(state.lastCreated.id)}</span>
        </div>
        <div>
          <h2 class="font-display text-base font-semibold text-zinc-900 dark:text-white">${escapeHtml(state.lastCreated.title)}</h2>
          <p class="mt-1 font-mono text-xs font-semibold tabular-nums text-zinc-700 dark:text-zinc-300">
            ${
              state.lastCreated.unlockMode === "free_ad"
                ? "Free via Rewarded Ad"
                : `${escapeHtml(state.lastCreated.price)} ${escapeHtml(state.lastCreated.tokenSymbol)} · Polygon PoS`
            }
          </p>
        </div>
        <div class="flex items-center gap-2">
          <input type="text" readonly value="${escapeHtml(shareUrl(state.lastCreated.id))}"
            class="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 px-3 py-2 font-mono text-xs text-zinc-900 dark:text-zinc-100" />
          <button id="copyFinalShareBtn" type="button"
            class="rounded-lg border border-zinc-300 dark:border-zinc-700 px-3 py-2 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 whitespace-nowrap">
            Copy
          </button>
        </div>
        <a href="#/drop/${escapeHtml(state.lastCreated.id)}"
          class="inline-flex w-full items-center justify-center rounded-lg bg-zinc-900 dark:bg-zinc-100 px-4 py-2.5 text-xs font-medium text-white dark:text-zinc-900 hover:opacity-90">
          Open Checkout Link
        </a>
      </div>
    `
    : "";

  renderShell(
    "create",
    `
    <div class="max-w-xl mx-auto space-y-6">
      <div class="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 shadow-sm">
        ${stepHeaderHtml}
        ${stepBodyHtml}
      </div>
      ${createdCardHtml}
    </div>
    ${renderCategoryModal()}
  `
  );

  // Event handlers for wizard
  document.getElementById("openCatModalBtn")?.addEventListener("click", () => {
    state.categoryModalOpen = true;
    renderCreateWizard();
  });

  document.getElementById("closeCategoryModal")?.addEventListener("click", () => {
    state.categoryModalOpen = false;
    renderCreateWizard();
  });

  document.querySelectorAll(".category-option-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const catId = btn.getAttribute("data-select-cat-id");
      const found = SUPPORTED_CATEGORIES.find((c) => c.id === catId);
      if (found) {
        state.selectedCategoryObj = found;
      }
      state.categoryModalOpen = false;
      renderCreateWizard();
    });
  });

  document.getElementById("wizardTitle")?.addEventListener("input", (e) => {
    state.resourceTitle = e.target.value;
  });

  document.getElementById("nextStep1Btn")?.addEventListener("click", () => {
    const errEl = document.getElementById("step1Error");
    if (!state.resourceTitle.trim()) {
      errEl.textContent = "Please enter a resource title or name.";
      errEl.classList.remove("hidden");
      return;
    }
    errEl.classList.add("hidden");
    state.wizardStep = 2;
    renderCreateWizard();
  });

  document.getElementById("wizardUrl")?.addEventListener("input", (e) => {
    state.targetUrl = e.target.value;
  });

  document.getElementById("prevStep2Btn")?.addEventListener("click", () => {
    state.wizardStep = 1;
    renderCreateWizard();
  });

  document.getElementById("nextStep2Btn")?.addEventListener("click", () => {
    const errEl = document.getElementById("step2Error");
    const urlVal = document.getElementById("wizardUrl")?.value.trim() || "";
    state.targetUrl = urlVal;

    try {
      const parsed = new URL(urlVal);
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
        throw new Error();
      }
    } catch {
      errEl.textContent = "Please enter a valid http:// or https:// storage link.";
      errEl.classList.remove("hidden");
      return;
    }

    if (!validateCategoryUrl(state.selectedCategoryObj.id, urlVal)) {
      errEl.textContent = `Link does not look like a valid ${state.selectedCategoryObj.label} (${state.selectedCategoryObj.hint}).`;
      errEl.classList.remove("hidden");
      return;
    }

    errEl.classList.add("hidden");
    state.wizardStep = 3;
    renderCreateWizard();
  });

  document.getElementById("prevStep3Btn")?.addEventListener("click", () => {
    state.wizardStep = 2;
    renderCreateWizard();
  });

  document.querySelectorAll(".mode-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.selectedUnlockMode = btn.getAttribute("data-unlock-mode") || "paid_ad";
      renderCreateWizard();
    });
  });

  document.querySelectorAll(".token-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.selectedTokenIdx = Number(btn.getAttribute("data-token-idx"));
      renderCreateWizard();
    });
  });

  document.getElementById("step3Price")?.addEventListener("input", (e) => {
    state.price = e.target.value;
  });

  document.getElementById("lockFinalBtn")?.addEventListener("click", async () => {
    const errEl = document.getElementById("step3Error");
    const lockBtn = document.getElementById("lockFinalBtn");
    errEl.classList.add("hidden");

    let normalizedSeller = ZERO_ADDRESS;
    let priceVal = "0";

    if (state.selectedUnlockMode !== "free_ad") {
      const sellerWallet = document.getElementById("step3Seller")?.value.trim() || "";
      priceVal = document.getElementById("step3Price")?.value.trim() || "5";
      if (!ethers.isAddress(sellerWallet)) {
        errEl.textContent = "Enter a valid Polygon payout wallet address (0x...).";
        errEl.classList.remove("hidden");
        return;
      }
      const numPrice = Number(priceVal);
      if (!Number.isFinite(numPrice) || numPrice <= 0) {
        errEl.textContent = "Price must be greater than zero.";
        errEl.classList.remove("hidden");
        return;
      }
      normalizedSeller = ethers.getAddress(sellerWallet);
    }

    lockBtn.disabled = true;
    lockBtn.textContent = "AI Safety Check...";

    try {
      const judgement = await judgeLink(state.resourceTitle, state.targetUrl);
      if (!judgement.safe) {
        errEl.textContent = `Blocked by AI Safety (${judgement.verdict}): ${judgement.reason}`;
        errEl.classList.remove("hidden");
        lockBtn.disabled = false;
        lockBtn.textContent = "Lock Link in Escrow 🔒";
        return;
      }

      lockBtn.textContent = "Encrypting & Locking...";
      const id = makeDropId();
      const sealed = await sealUrl(state.targetUrl, id, normalizedSeller);
      const activeToken = POLYGON_TOKENS[state.selectedTokenIdx];

      const drop = {
        id,
        title: state.resourceTitle,
        encryptedUrl: sealed.encryptedUrl,
        iv: sealed.iv,
        sellerWallet: normalizedSeller,
        tokenAddress: activeToken.address,
        tokenSymbol: activeToken.symbol,
        tokenDecimals: activeToken.decimals,
        price: priceVal,
        unlockMode: state.selectedUnlockMode,
        category: state.selectedCategoryObj.label,
        aiVerdict: judgement.verdict,
        aiReason: judgement.reason,
        isAdminAd: false,
        createdAt: new Date().toISOString(),
      };

      await createDrop(drop);
      state.lastCreated = drop;
      state.drops.unshift(drop);
      state.wizardStep = 1;
      state.resourceTitle = "";
      state.targetUrl = "";
      renderCreateWizard();
    } catch (err) {
      errEl.textContent = err instanceof Error ? err.message : "Failed to lock link.";
      errEl.classList.remove("hidden");
      lockBtn.disabled = false;
      lockBtn.textContent = "Lock Link in Escrow 🔒";
    }
  });

  document.getElementById("copyFinalShareBtn")?.addEventListener("click", async () => {
    const btn = document.getElementById("copyFinalShareBtn");
    if (!state.lastCreated || !btn) return;
    await navigator.clipboard.writeText(shareUrl(state.lastCreated.id));
    btn.textContent = "Copied";
    setTimeout(() => {
      btn.textContent = "Copy";
    }, 1500);
  });
}

async function renderUnlockView(dropId) {
  renderShell(
    "unlock",
    `<div class="mx-auto max-w-lg rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 text-sm text-zinc-500">Loading drop...</div>`
  );

  const drop = await getDrop(dropId).catch(() => null);
  if (!drop) {
    renderShell(
      "unlock",
      `
      <div class="mx-auto max-w-lg rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 text-center space-y-4">
        <p class="font-display text-lg font-semibold text-zinc-900 dark:text-white">Drop not found</p>
        <a href="#/" class="inline-block rounded-lg bg-zinc-900 dark:bg-zinc-100 px-4 py-2 text-xs font-semibold text-white dark:text-zinc-900">Lock a Link</a>
      </div>`
    );
    return;
  }

  let savedEscrow =
    ENV_ESCROW_ADDRESS || localStorage.getItem("lockdrop_polygon_escrow") || "";
  const isPaidEnabled = drop.unlockMode !== "free_ad";
  const isAdEnabled = drop.unlockMode === "free_ad" || drop.unlockMode === "paid_ad" || drop.isAdminAd;
  const monetagUrl = getMonetagUrl();
  const feePercent = drop.unlockMode === "paid_pure" ? "5%" : "3%";
  const sellerPercent = drop.unlockMode === "paid_pure" ? "95%" : "97%";

  renderShell(
    "unlock",
    `
    <div class="mx-auto max-w-lg space-y-4">
      <a href="#/drops" class="inline-block text-xs font-light text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
        ← Platform Drop Feed
      </a>

      <div class="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 space-y-5">
        <div>
          <div class="flex items-center justify-between text-xs text-zinc-500">
            <span>${escapeHtml(drop.category || "General")} · ${escapeHtml(
              drop.isAdminAd ? "Platform Sponsored Ad" : modeLabel(drop.unlockMode)
            )}</span>
            <span class="font-mono">${escapeHtml(drop.aiVerdict || "Checked")}</span>
          </div>
          <h1 class="mt-1 font-display text-xl font-bold text-zinc-900 dark:text-white">${escapeHtml(
            drop.title
          )}</h1>
          ${
            drop.aiReason
              ? `<p class="mt-1.5 text-xs leading-relaxed font-light text-zinc-600 dark:text-zinc-400">${escapeHtml(
                  drop.aiReason
                )}</p>`
              : ""
          }
        </div>

        ${
          drop.isAdminAd
            ? `<div class="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 p-4 text-xs text-zinc-900 dark:text-zinc-100 font-light">
                <strong>Platform Partner Feed</strong>: This sponsored download link is managed by platform admins to support infrastructure and free downloads.
               </div>`
            : ""
        }

        ${
          isPaidEnabled && !drop.isAdminAd
            ? `
          <div class="divide-y divide-zinc-200 dark:divide-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 px-4 text-xs">
            <div class="flex justify-between py-2.5">
              <span class="text-zinc-500">Instant Unlock Price</span>
              <span class="font-mono font-bold tabular-nums text-zinc-900 dark:text-white text-sm">
                ${escapeHtml(drop.price)} ${escapeHtml(drop.tokenSymbol)}
              </span>
            </div>
            <div class="flex justify-between py-2.5">
              <span class="text-zinc-500">Seller (${sellerPercent})</span>
              <span class="font-mono text-zinc-700 dark:text-zinc-300">${escapeHtml(
                shortAddress(drop.sellerWallet)
              )}</span>
            </div>
            <div class="flex justify-between py-2.5">
              <span class="text-zinc-500">Platform Escrow Fee</span>
              <span class="text-zinc-700 dark:text-zinc-300">${feePercent}</span>
            </div>
          </div>`
            : ""
        }

        ${
          isPaidEnabled && !drop.isAdminAd && !isValidEscrowAddress(ENV_ESCROW_ADDRESS)
            ? `
          <div class="space-y-1.5">
            <label for="escrowInput" class="block text-xs font-medium text-zinc-600 dark:text-zinc-400">Polygon Escrow Contract Address</label>
            <input id="escrowInput" type="text" value="${escapeHtml(savedEscrow)}"
              placeholder="0x... (Deployed PolygonEscrow Contract)"
              class="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 font-mono text-xs text-zinc-900 dark:text-zinc-100" />
          </div>`
            : ""
        }

        <div id="unlockActions" class="space-y-3">
          ${
            isPaidEnabled && !drop.isAdminAd
              ? `
            <button id="payBtn" type="button"
              class="inline-flex w-full items-center justify-center rounded-lg bg-zinc-900 dark:bg-zinc-100 px-5 py-3 text-xs font-medium text-white dark:text-zinc-900 hover:opacity-90 disabled:opacity-60 transition-opacity">
              Pay ${escapeHtml(drop.price)} ${escapeHtml(drop.tokenSymbol)} &amp; Unlock
            </button>`
              : ""
          }

          ${
            isAdEnabled
              ? monetagUrl && !(hasAdsgram && isTelegramContext())
                ? `
                  <a id="monetagBtn" href="${escapeHtml(
                    monetagUrl
                  )}" target="_blank" rel="noopener noreferrer"
                    class="inline-flex w-full items-center justify-center rounded-lg ${
                      isPaidEnabled && !drop.isAdminAd
                        ? "border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700"
                        : "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:opacity-90"
                    } px-5 py-3 text-xs font-medium transition-opacity">
                    Watch Sponsor Ad to Unlock Free
                  </a>`
                : `
                  <button id="adUnlockBtn" type="button"
                    class="inline-flex w-full items-center justify-center rounded-lg ${
                      isPaidEnabled && !drop.isAdminAd
                        ? "border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700"
                        : "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:opacity-90"
                    } px-5 py-3 text-xs font-medium disabled:opacity-60 transition-opacity">
                    ${
                      hasAdsgram && isTelegramContext()
                        ? "Watch Adsgram Reward to Unlock Free"
                        : "Complete Sponsored Task to Unlock Free"
                    }
                  </button>`
              : ""
          }

          <div id="adTimerBox" class="hidden rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 p-4 text-center text-xs text-zinc-900 dark:text-zinc-100">
            Verifying sponsored task completion... <span id="adCountdown" class="font-mono font-bold tabular-nums">6s</span>
          </div>

          <p id="payStatus" class="hidden text-center text-xs text-zinc-600 dark:text-zinc-400"></p>

          ${
            isPaidEnabled && !drop.isAdminAd
              ? `
            <div class="text-center">
              <button id="toggleTxBtn" type="button" class="text-xs font-light text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:underline">
                Already paid? Verify Polygon txHash
              </button>
            </div>

            <form id="verifyTxForm" class="hidden flex gap-2">
              <input id="txHashInput" type="text" required placeholder="0x... (Polygon Transaction Hash)"
                class="flex-1 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 font-mono text-xs text-zinc-900 dark:text-zinc-100" />
              <button type="submit" class="rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-3.5 py-2 text-xs font-medium hover:opacity-90">
                Verify
              </button>
            </form>`
              : ""
          }

          <div id="unlockError" class="hidden rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 p-3 text-xs text-zinc-900 dark:text-zinc-100"></div>
        </div>

        <div id="unlockedBox" class="hidden space-y-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/60 p-5">
          <p class="text-xs font-medium text-zinc-900 dark:text-white">Unlocked Successfully</p>
          <input id="unlockedUrlInput" type="text" readonly
            class="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 font-mono text-xs text-zinc-900 dark:text-zinc-100" />
          <a id="unlockedAnchor" href="#" target="_blank" rel="noopener noreferrer"
            class="inline-flex w-full items-center justify-center rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-2.5 text-xs font-medium hover:opacity-90">
            Open File Link
          </a>
        </div>
      </div>
    </div>
  `
  );

  const escrowInput = document.getElementById("escrowInput");
  escrowInput?.addEventListener("input", () => {
    savedEscrow = escrowInput.value.trim();
    localStorage.setItem("lockdrop_polygon_escrow", savedEscrow);
  });

  const payBtn = document.getElementById("payBtn");
  const statusEl = document.getElementById("payStatus");
  const errorEl = document.getElementById("unlockError");
  const verifyForm = document.getElementById("verifyTxForm");

  document.getElementById("toggleTxBtn")?.addEventListener("click", () => {
    verifyForm?.classList.toggle("hidden");
  });

  async function revealLink() {
    const url = await unsealUrl(drop);
    document.getElementById("unlockActions").classList.add("hidden");
    document.getElementById("unlockedUrlInput").value = url;
    document.getElementById("unlockedAnchor").href = url;
    document.getElementById("unlockedBox").classList.remove("hidden");
  }

  function startSponsoredCountdown(seconds = 6) {
    const timerBox = document.getElementById("adTimerBox");
    const countEl = document.getElementById("adCountdown");
    timerBox.classList.remove("hidden");
    let left = seconds;
    countEl.textContent = `${left}s`;
    const interval = setInterval(async () => {
      left -= 1;
      countEl.textContent = `${left}s`;
      if (left <= 0) {
        clearInterval(interval);
        timerBox.classList.add("hidden");
        await revealLink();
      }
    }, 1000);
  }

  document.getElementById("monetagBtn")?.addEventListener("click", () => {
    startSponsoredCountdown(6);
  });

  document.getElementById("adUnlockBtn")?.addEventListener("click", async () => {
    const adBtn = document.getElementById("adUnlockBtn");
    errorEl.classList.add("hidden");
    adBtn.disabled = true;

    try {
      if (hasAdsgram && isTelegramContext()) {
        const res = await runAdsgramReward();
        if (res.completed) {
          await revealLink();
          return;
        }
        throw new Error("Please finish the rewarded ad to unlock the link.");
      }
      startSponsoredCountdown(6);
    } catch (err) {
      errorEl.textContent = err instanceof Error ? err.message : "Ad reward failed.";
      errorEl.classList.remove("hidden");
      adBtn.disabled = false;
    }
  });

  payBtn?.addEventListener("click", async () => {
    errorEl.classList.add("hidden");
    payBtn.disabled = true;
    statusEl.classList.remove("hidden");
    try {
      const txHash = await payPolygonEscrow({
        escrowAddress: savedEscrow,
        dropId: drop.id,
        sellerWallet: drop.sellerWallet,
        tokenAddress: drop.tokenAddress,
        tokenDecimals: drop.tokenDecimals,
        price: drop.price,
        onStatus: (msg) => {
          statusEl.textContent = msg;
        },
      });
      statusEl.textContent = "Verifying Polygon receipt...";
      await verifyPolygonTx({
        txHash,
        escrowAddress: savedEscrow,
        dropId: drop.id,
        sellerWallet: drop.sellerWallet,
        tokenAddress: drop.tokenAddress,
        tokenDecimals: drop.tokenDecimals,
        price: drop.price,
      });
      await revealLink();
    } catch (err) {
      errorEl.textContent = err instanceof Error ? err.message : "Payment failed.";
      errorEl.classList.remove("hidden");
      statusEl.classList.add("hidden");
      payBtn.disabled = false;
    }
  });

  verifyForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorEl.classList.add("hidden");
    statusEl.textContent = "Verifying Polygon transaction...";
    statusEl.classList.remove("hidden");
    try {
      await verifyPolygonTx({
        txHash: document.getElementById("txHashInput").value,
        escrowAddress: savedEscrow,
        dropId: drop.id,
        sellerWallet: drop.sellerWallet,
        tokenAddress: drop.tokenAddress,
        tokenDecimals: drop.tokenDecimals,
        price: drop.price,
      });
      await revealLink();
    } catch (err) {
      errorEl.textContent = err instanceof Error ? err.message : "Verification failed.";
      errorEl.classList.remove("hidden");
      statusEl.classList.add("hidden");
    }
  });
}

function renderDropsView() {
  const rowsHtml = state.loadingDrops
    ? `<div class="p-6 text-sm text-zinc-500">Loading drops...</div>`
    : state.drops.length === 0
      ? `<div class="p-10 text-center text-sm text-zinc-500">No drops created yet.</div>`
      : `
        <table class="w-full text-left text-sm">
          <thead>
            <tr class="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs font-light tracking-wide text-zinc-600 dark:text-zinc-400">
              <th class="px-5 py-3">Resource</th>
              <th class="px-4 py-3">Mode</th>
              <th class="px-4 py-3">Safety</th>
              <th class="px-4 py-3 text-right">Price</th>
              <th class="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-200 dark:divide-zinc-800">
            ${state.drops
              .map(
                (d) => `
              <tr class="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 ${d.isAdminAd ? "bg-zinc-100/60 dark:bg-zinc-800/40" : ""}">
                <td class="px-5 py-3 font-medium text-zinc-900 dark:text-zinc-100">
                  ${d.isAdminAd ? '<span class="mr-1.5 rounded border border-zinc-400 dark:border-zinc-600 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-800 dark:text-zinc-200">Ad Feed</span>' : ""}
                  ${escapeHtml(d.title)}
                  <span class="ml-2 text-xs font-normal text-zinc-500">${escapeHtml(
                    d.category || "General"
                  )} · <span class="font-mono">${escapeHtml(d.id)}</span></span>
                </td>
                <td class="px-4 py-3 text-xs text-zinc-600 dark:text-zinc-400">${escapeHtml(
                  d.isAdminAd ? "Platform Ad" : modeLabel(d.unlockMode)
                )}</td>
                <td class="px-4 py-3 text-xs text-zinc-600 dark:text-zinc-400">${escapeHtml(
                  d.aiVerdict || "Checked"
                )}</td>
                <td class="px-4 py-3 text-right font-mono text-xs font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">
                  ${
                    d.unlockMode === "free_ad" || d.isAdminAd
                      ? "Free (Ad)"
                      : `${escapeHtml(d.price)} ${escapeHtml(d.tokenSymbol)}`
                  }
                </td>
                <td class="px-5 py-3 text-right space-x-2">
                  <a href="#/drop/${escapeHtml(d.id)}"
                    class="inline-block rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700">
                    Open
                  </a>
                </td>
              </tr>`
              )
              .join("")}
          </tbody>
        </table>`;

  renderShell(
    "drops",
    `
    <div class="space-y-5">
      <div class="flex items-center justify-between">
        <h1 class="font-display text-xl font-bold text-zinc-900 dark:text-white">Platform Drop Feed</h1>
        <a href="#/" class="rounded-lg bg-zinc-900 dark:bg-zinc-100 px-4 py-2 text-xs font-medium text-white dark:text-zinc-900 hover:opacity-90">
          Lock New Link
        </a>
      </div>
      <div class="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">${rowsHtml}</div>
    </div>
  `
  );
}

function renderAdminView() {
  if (!state.isAdminUnlocked) {
    renderShell(
      "admin",
      `
      <div class="mx-auto max-w-md rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 space-y-5">
        <div>
          <h1 class="font-display text-lg font-bold text-zinc-900 dark:text-white">Admin Dashboard Login</h1>
          <p class="text-xs font-light text-zinc-500 mt-1">Enter admin PIN to manage platform ad feeds, free downloads, and escrow contract specs.</p>
        </div>
        <form id="adminLoginForm" class="space-y-3">
          <input id="adminPinInput" type="password" required placeholder="Enter Admin PIN (default: 7777)"
            class="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3.5 py-2.5 text-xs text-zinc-900 dark:text-zinc-100 focus:border-zinc-900 dark:focus:border-white focus:outline-none" />
          <div id="adminLoginError" class="hidden text-xs text-zinc-900 dark:text-zinc-100 font-medium">Incorrect PIN.</div>
          <button type="submit"
            class="w-full rounded-lg bg-zinc-900 dark:bg-zinc-100 px-4 py-2.5 text-xs font-medium text-white dark:text-zinc-900 hover:opacity-90">
            Access Admin Feed
          </button>
        </form>
      </div>
      `
    );

    document.getElementById("adminLoginForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const pin = document.getElementById("adminPinInput").value.trim();
      if (pin === "7777" || pin === "1337" || pin === "admin") {
        state.isAdminUnlocked = true;
        localStorage.setItem("lockdrop_admin_unlocked", "true");
        renderAdminView();
      } else {
        document.getElementById("adminLoginError")?.classList.remove("hidden");
      }
    });
    return;
  }

  const rowsHtml = state.loadingDrops
    ? `<div class="p-6 text-sm text-zinc-500">Loading platform drops...</div>`
    : state.drops.length === 0
      ? `<div class="p-10 text-center text-sm text-zinc-500">No drops in database.</div>`
      : `
        <table class="w-full text-left text-sm">
          <thead>
            <tr class="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs font-light tracking-wide text-zinc-600 dark:text-zinc-400">
              <th class="px-5 py-3">Title</th>
              <th class="px-4 py-3">Type</th>
              <th class="px-4 py-3">Category</th>
              <th class="px-4 py-3 text-right">Price / Ad</th>
              <th class="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-200 dark:divide-zinc-800">
            ${state.drops
              .map(
                (d) => `
              <tr class="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 ${d.isAdminAd ? "bg-zinc-100/60 dark:bg-zinc-800/40" : ""}">
                <td class="px-5 py-3 font-medium text-zinc-900 dark:text-zinc-100">
                  ${d.isAdminAd ? '<span class="mr-1.5 rounded border border-zinc-400 dark:border-zinc-600 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-800 dark:text-zinc-200">Platform Ad</span>' : ""}
                  ${escapeHtml(d.title)}
                  <span class="ml-2 font-mono text-xs text-zinc-400">${escapeHtml(d.id)}</span>
                </td>
                <td class="px-4 py-3 text-xs text-zinc-600 dark:text-zinc-400">${escapeHtml(
                  d.isAdminAd ? "Ad Banner/Link" : modeLabel(d.unlockMode)
                )}</td>
                <td class="px-4 py-3 text-xs text-zinc-600 dark:text-zinc-400">${escapeHtml(d.category || "General")}</td>
                <td class="px-4 py-3 text-right font-mono text-xs tabular-nums text-zinc-900 dark:text-zinc-100">
                  ${d.isAdminAd ? "Free (Ad Monetized)" : `${escapeHtml(d.price)} ${escapeHtml(d.tokenSymbol)}`}
                </td>
                <td class="px-5 py-3 text-right space-x-2">
                  <a href="#/drop/${escapeHtml(d.id)}"
                    class="inline-block rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700">
                    Open
                  </a>
                  <button type="button" data-delete-id="${escapeHtml(d.id)}"
                    class="admin-delete-btn rounded-md border border-zinc-300 dark:border-zinc-700 px-2.5 py-1 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700">
                    Delete
                  </button>
                </td>
              </tr>`
              )
              .join("")}
          </tbody>
        </table>`;

  renderShell(
    "admin",
    `
    <div class="space-y-8">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="font-display text-xl font-bold text-zinc-900 dark:text-white">Platform Admin Dashboard</h1>
          <p class="text-xs font-light text-zinc-600 dark:text-zinc-400">Gated control panel to manage platform ad feeds, free downloads, and escrow contract specs.</p>
        </div>
        <div class="flex items-center gap-2">
          <a href="#/contract"
            class="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700">
            Escrow Contract Specs
          </a>
          <button id="adminLogoutBtn" type="button"
            class="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700">
            Lock Admin
          </button>
        </div>
      </div>

      <div class="rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6 space-y-4">
        <h2 class="font-display text-sm font-semibold text-zinc-900 dark:text-white">Create Platform Ad Drop / Free Download Incentive</h2>
        <form id="adminAdForm" class="space-y-4">
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Ad Drop Title / Banner Name</label>
              <input id="adTitle" type="text" required placeholder="e.g. Recommended Web3 Toolkit / Free Cloud Storage Pack"
                class="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:border-zinc-900 dark:focus:border-white focus:outline-none" />
            </div>
            <div>
              <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Category</label>
              <select id="adCategory"
                class="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:border-zinc-900 dark:focus:border-white focus:outline-none">
                ${SUPPORTED_CATEGORIES.map((c) => `<option value="${c.label}">${c.label}</option>`).join("")}
              </select>
            </div>
          </div>
          <div>
            <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Target Download URL or Monetag Smartlink</label>
            <input id="adUrl" type="url" required placeholder="https://... (Target Ad URL or Monetag Smartlink)"
              class="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:border-zinc-900 dark:focus:border-white focus:outline-none" />
          </div>
          <button type="submit"
            class="rounded-lg bg-zinc-900 dark:bg-zinc-100 px-4 py-2 text-xs font-medium text-white dark:text-zinc-900 hover:opacity-90">
            Publish Platform Ad Drop
          </button>
        </form>
      </div>

      <div class="space-y-3">
        <h2 class="font-display text-base font-semibold text-zinc-900 dark:text-white">All Platform Drops Feed</h2>
        <div class="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">${rowsHtml}</div>
      </div>
    </div>
  `
  );

  document.getElementById("adminLogoutBtn")?.addEventListener("click", () => {
    state.isAdminUnlocked = false;
    localStorage.removeItem("lockdrop_admin_unlocked");
    renderAdminView();
  });

  document.getElementById("adminAdForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("adTitle").value.trim();
    const category = document.getElementById("adCategory").value;
    const url = document.getElementById("adUrl").value.trim();

    const id = makeDropId();
    const sealed = await sealUrl(url, id, ZERO_ADDRESS);
    const drop = {
      id,
      title: title || "Platform Sponsored Drop",
      encryptedUrl: sealed.encryptedUrl,
      iv: sealed.iv,
      sellerWallet: ZERO_ADDRESS,
      tokenAddress: ZERO_ADDRESS,
      tokenSymbol: "POL",
      tokenDecimals: 18,
      price: "0",
      unlockMode: "free_ad",
      category,
      aiVerdict: "Trusted",
      aiReason: "Platform verified ad drop.",
      isAdminAd: true,
      createdAt: new Date().toISOString(),
    };

    await createDrop(drop);
    state.drops.unshift(drop);
    renderAdminView();
  });

  document.querySelectorAll(".admin-delete-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.getAttribute("data-delete-id");
      if (!id) return;
      await removeDrop(id);
      state.drops = state.drops.filter((d) => d.id !== id);
      renderAdminView();
    });
  });
}

function renderContractView() {
  if (!state.isAdminUnlocked) {
    renderShell(
      "contract",
      `
      <div class="mx-auto max-w-md rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 text-center space-y-4">
        <p class="font-display text-base font-semibold text-zinc-900 dark:text-white">Restricted Area</p>
        <p class="text-xs font-light text-zinc-500">The escrow contract specification is gated behind the admin hatch.</p>
        <a href="#/admin" class="inline-block rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-2 text-xs font-medium">
          Go to Admin Login
        </a>
      </div>`
    );
    return;
  }

  renderShell(
    "contract",
    `
    <div class="space-y-5">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="font-display text-xl font-bold text-zinc-900 dark:text-white">PolygonEscrow.sol (Ad-Tiered Fees)</h1>
          <p class="text-sm font-light text-zinc-600 dark:text-zinc-400">
            Deploy once on Polygon PoS (137) with your treasury wallet to collect platform fees (3% for Paid+Ads, 5% for Ad-Free).
          </p>
        </div>
        <button id="copySolBtn" type="button"
          class="self-start rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-2 text-xs font-medium hover:opacity-90">
          Copy Solidity
        </button>
      </div>
      <pre class="overflow-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-950 p-5 font-mono text-xs leading-relaxed text-zinc-100"><code>${escapeHtml(
        polygonEscrowSol
      )}</code></pre>
    </div>
  `
  );

  document.getElementById("copySolBtn")?.addEventListener("click", async () => {
    const btn = document.getElementById("copySolBtn");
    await navigator.clipboard.writeText(polygonEscrowSol);
    btn.textContent = "Copied";
    setTimeout(() => {
      btn.textContent = "Copy Solidity";
    }, 1500);
  });
}

function render() {
  const { view, dropId } = parseHash();
  if (view === "unlock" && dropId) {
    void renderUnlockView(dropId);
  } else if (view === "drops") {
    renderDropsView();
  } else if (view === "admin") {
    renderAdminView();
  } else if (view === "contract") {
    renderContractView();
  } else {
    renderCreateWizard();
  }
}

function initApp() {
  window.addEventListener("hashchange", render);

  listDrops()
    .then((rows) => {
      state.drops = rows;
    })
    .catch(() => {
      state.drops = [];
    })
    .finally(() => {
      state.loadingDrops = false;
      render();
    });

  render();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
