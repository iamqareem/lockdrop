/**
 * Client mirror of the server's category rules.
 *
 * Used for instant feedback in the wizard (before the round trip to
 * /api/verify). The server remains authoritative — `scripts/check-categories.mjs`
 * asserts that both lists stay in step.
 */

export const CATEGORIES = [
  {
    id: "telegram",
    label: "Telegram",
    hint: "t.me/...",
    hosts: ["t.me", "telegram.me", "telegram.org"],
    strictHost: true,
    extensions: [],
  },
  {
    id: "onedrive",
    label: "OneDrive",
    hint: "1drv.ms",
    hosts: ["1drv.ms", "onedrive.live.com", "onedrive.com", "sharepoint.com"],
    strictHost: true,
    extensions: [],
  },
  {
    id: "gdrive",
    label: "Google Drive",
    hint: "drive.google.com",
    hosts: ["drive.google.com", "docs.google.com"],
    strictHost: true,
    extensions: [],
  },
  {
    id: "dropbox",
    label: "Dropbox",
    hint: "dropbox.com",
    hosts: ["dropbox.com", "db.tt", "dropboxusercontent.com"],
    strictHost: true,
    extensions: [],
  },
  {
    id: "nextcloud",
    label: "Nextcloud",
    hint: "cloud / self-hosted",
    hosts: ["nextcloud.com", "nextcloud.de", "nextcloud.net"],
    strictHost: false,
    extensions: [],
    detectByPath: true,
  },
  {
    id: "quark",
    label: "Quark Cloud",
    hint: "pan.quark.cn",
    hosts: ["quark.cn", "quark-cdn.com", "alicdn.com"],
    strictHost: true,
    extensions: [],
  },
  {
    id: "notion",
    label: "Notion",
    hint: "notion.so",
    hosts: ["notion.so", "notion.site"],
    strictHost: true,
    extensions: [],
  },
  {
    id: "download",
    label: "Live Download",
    hint: "ZIP, APK, DMG",
    hosts: [
      "mega.nz",
      "mediafire.com",
      "gofile.io",
      "pixeldrain.com",
      "wetransfer.com",
      "send.cm",
      "filebin.net",
    ],
    strictHost: false,
    extensions: [
      "zip", "rar", "7z", "tar", "gz", "bz2", "xz", "apk", "dmg", "deb",
      "rpm", "iso", "img", "pkg", "exe", "msi", "pdf", "csv", "json",
    ],
  },
  {
    id: "document",
    label: "Live Document",
    hint: "PDF, Docs",
    hosts: ["docs.google.com", "notion.so", "notion.site", "office.com", "atlassian.net"],
    strictHost: false,
    extensions: [
      "pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "odt", "ods",
      "rtf", "md", "txt", "epub", "csv",
    ],
  },
  {
    id: "media",
    label: "Live Media",
    hint: "YouTube, MP4",
    hosts: [
      "youtube.com", "youtu.be", "vimeo.com", "dailymotion.com",
      "twitch.tv", "streamable.com", "odysee.com",
    ],
    strictHost: false,
    extensions: ["mp4", "m4v", "webm", "mov", "avi", "mkv", "mp3", "wav", "ogg", "flac"],
  },
];

export const CATEGORY_BY_ID = new Map(CATEGORIES.map((c) => [c.id, c]));

export function hostMatches(host, suffix) {
  const h = host.toLowerCase();
  const s = suffix.toLowerCase();
  return h === s || h.endsWith(`.${s}`);
}

export function extensionOf(pathname) {
  const last = pathname.split("/").pop() ?? "";
  const dot = last.lastIndexOf(".");
  if (dot <= 0 || dot === last.length - 1) return null;
  const ext = last.slice(dot + 1).toLowerCase();
  return /^[a-z0-9]{1,8}$/.test(ext) ? ext : null;
}

/**
 * Fast local check used for instant wizard feedback.
 * Returns `{ ok, message }` — the server performs the real verification.
 */
export function quickCheck(categoryId, rawUrl) {
  const category = CATEGORY_BY_ID.get(categoryId);
  if (!category) return { ok: false, message: "Choose a category." };

  const value = (rawUrl || "").trim();
  if (!value) return { ok: false, message: "Paste the destination link." };

  let url;
  try {
    url = new URL(/^[a-z][a-z0-9+.-]*:\/\//i.test(value) ? value : `https://${value}`);
  } catch {
    return { ok: false, message: "That does not look like a valid link." };
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return { ok: false, message: "Only http and https links can be locked." };
  }

  const host = url.hostname.toLowerCase();
  const ext = extensionOf(url.pathname);
  const hostOk = category.hosts.some((suffix) => hostMatches(host, suffix));
  const extOk = ext !== null && category.extensions.includes(ext);

  if (category.strictHost) {
    if (!hostOk) {
      return {
        ok: false,
        message: `That is not a ${category.label} link. Expected ${category.hosts[0]}.`,
      };
    }
    return { ok: true, message: `Looks like a valid ${category.label} link.` };
  }

  if (!hostOk && !extOk) {
    return {
      ok: false,
      message: `That does not look like a ${category.label} (${category.hint}).`,
    };
  }
  return { ok: true, message: `Looks like a valid ${category.label} link.` };
}

/**
 * Every category the URL plausibly belongs to.
 *
 * Path shapes are only consulted for categories that opt in with
 * `detectByPath` (Nextcloud), so a generic path never produces a phantom
 * match.
 */
export function detectCategories(rawUrl) {
  try {
    const url = new URL(
      /^[a-z][a-z0-9+.-]*:\/\//i.test(rawUrl) ? rawUrl : `https://${rawUrl}`
    );
    const host = url.hostname.toLowerCase();
    const ext = extensionOf(url.pathname);
    return CATEGORIES.filter((c) => {
      if (c.hosts.some((suffix) => hostMatches(host, suffix))) return true;
      if (ext !== null && c.extensions.includes(ext)) return true;
      return false;
    }).map((c) => c.id);
  } catch {
    return [];
  }
}
