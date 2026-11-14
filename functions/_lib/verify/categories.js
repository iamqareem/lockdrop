const CATEGORY_RULES = [
  {
    id: "telegram",
    label: "Telegram",
    hint: "t.me/...",
    hosts: ["t.me", "telegram.me", "telegram.org"],
    strictHost: true,
    pathPatterns: [/^\/(s|joinchat)\//i, /^\/[A-Za-z0-9_]{4,}$/],
    extensions: [],
    specific: true
  },
  {
    id: "onedrive",
    label: "OneDrive",
    hint: "1drv.ms",
    hosts: ["1drv.ms", "onedrive.live.com", "onedrive.com", "sharepoint.com"],
    strictHost: true,
    pathPatterns: [/^\/s/i, /^\/u\//i, /redir/i, /download/i, /:f:\/g\//i],
    extensions: [],
    specific: true
  },
  {
    id: "gdrive",
    label: "Google Drive",
    hint: "drive.google.com",
    hosts: ["drive.google.com", "docs.google.com"],
    strictHost: true,
    pathPatterns: [/^\/file\/d\//i, /^\/open/i, /^\/document\/d\//i, /^\/uc\?/i],
    extensions: [],
    specific: true
  },
  {
    id: "dropbox",
    label: "Dropbox",
    hint: "dropbox.com",
    hosts: ["dropbox.com", "db.tt", "dropboxusercontent.com"],
    strictHost: true,
    pathPatterns: [/^\/s\//i, /^\/scl\/fi\//i, /download/i],
    extensions: [],
    specific: true
  },
  {
    id: "nextcloud",
    label: "Nextcloud",
    hint: "cloud / self-hosted",
    hosts: ["nextcloud.com", "nextcloud.de", "nextcloud.net"],
    strictHost: false,
    pathPatterns: [
      /\/s\/[A-Za-z0-9_]{6,}/i,
      /\/index\.php\/s\//i,
      /\/remote\.php/i,
      /\/apps\//i,
      /\/login/i,
      /\/remote\.php\/dav\//i
    ],
    extensions: [],
    specific: true,
    detectByPath: true
  },
  {
    id: "quark",
    label: "Quark Cloud",
    hint: "pan.quark.cn",
    hosts: ["quark.cn", "quark-cdn.com", "alicdn.com"],
    strictHost: true,
    pathPatterns: [/^\/s\//i, /^\/list\//i, /^\/share\//i],
    extensions: [],
    specific: true
  },
  {
    id: "notion",
    label: "Notion",
    hint: "notion.so",
    hosts: ["notion.so", "notion.site"],
    strictHost: true,
    pathPatterns: [
      /^\/$/,
      /\/workspace\//i,
      /\/page\//i,
      /\/[A-Za-z0-9-]*[0-9a-f]{32}(\?|$)/i
    ],
    extensions: [],
    specific: true
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
      "filebin.net"
    ],
    strictHost: false,
    pathPatterns: [],
    extensions: [
      "zip",
      "rar",
      "7z",
      "tar",
      "gz",
      "bz2",
      "xz",
      "apk",
      "dmg",
      "deb",
      "rpm",
      "iso",
      "img",
      "pkg",
      "exe",
      "msi",
      "pdf",
      "csv",
      "json"
    ],
    specific: false
  },
  {
    id: "document",
    label: "Live Document",
    hint: "PDF, Docs",
    hosts: ["docs.google.com", "notion.so", "notion.site", "office.com", "atlassian.net"],
    strictHost: false,
    pathPatterns: [],
    extensions: [
      "pdf",
      "doc",
      "docx",
      "xls",
      "xlsx",
      "ppt",
      "pptx",
      "odt",
      "ods",
      "rtf",
      "md",
      "txt",
      "epub",
      "csv"
    ],
    specific: false
  },
  {
    id: "media",
    label: "Live Media",
    hint: "YouTube, MP4",
    hosts: [
      "youtube.com",
      "youtu.be",
      "vimeo.com",
      "dailymotion.com",
      "twitch.tv",
      "streamable.com",
      "odysee.com"
    ],
    strictHost: false,
    pathPatterns: [],
    extensions: ["mp4", "m4v", "webm", "mov", "avi", "mkv", "mp3", "wav", "ogg", "flac"],
    specific: false
  }
];
const CATEGORY_BY_ID = new Map(CATEGORY_RULES.map((c) => [c.id, c]));
function hostMatches(host, suffix) {
  const h = host.toLowerCase();
  const s = suffix.toLowerCase();
  return h === s || h.endsWith(`.${s}`);
}
function matchesHost(rule, host) {
  return rule.hosts.some((suffix) => hostMatches(host, suffix));
}
function extensionOf(pathname) {
  const last = pathname.split("/").pop() ?? "";
  const dot = last.lastIndexOf(".");
  if (dot <= 0 || dot === last.length - 1) return null;
  const ext = last.slice(dot + 1).toLowerCase();
  if (!/^[a-z0-9]{1,8}$/.test(ext)) return null;
  return ext;
}
function evaluateCategory(rule, host, pathname) {
  const findings = [];
  const ext = extensionOf(pathname);
  const hostOk = matchesHost(rule, host);
  const extOk = ext !== null && rule.extensions.includes(ext);
  const pathOk = rule.pathPatterns.some((p) => p.test(pathname));
  if (rule.strictHost) {
    if (!hostOk) {
      findings.push({
        code: "category.host_mismatch",
        severity: "high",
        message: `Host does not belong to ${rule.label}.`,
        detail: `Expected one of: ${rule.hosts.join(", ")}`
      });
      return { matched: false, findings };
    }
    if (!pathOk && !extOk) {
      findings.push({
        code: "category.path_shape",
        severity: "low",
        message: `Link shape is unusual for ${rule.label}.`
      });
    }
    return { matched: true, findings };
  }
  if (hostOk || extOk || pathOk) {
    return { matched: true, findings };
  }
  findings.push({
    code: "category.shape_mismatch",
    severity: "medium",
    message: `Link does not look like a ${rule.label}.`,
    detail: rule.extensions.length ? `Expected one of: ${rule.extensions.slice(0, 8).join(", ")}` : void 0
  });
  return { matched: false, findings };
}
function detectCategories(host, pathname) {
  return CATEGORY_RULES.filter((rule) => {
    if (matchesHost(rule, host)) return true;
    const ext = extensionOf(pathname);
    if (ext !== null && rule.extensions.includes(ext)) return true;
    if (rule.detectByPath && rule.pathPatterns.some((p) => p.test(pathname))) return true;
    return false;
  }).map((rule) => rule.id);
}
export {
  CATEGORY_BY_ID,
  CATEGORY_RULES,
  detectCategories,
  evaluateCategory,
  extensionOf,
  matchesHost
};
