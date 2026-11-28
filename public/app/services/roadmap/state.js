/**
 * Roadmap service state.
 *
 * The manifest is static (built from the staged markdown library), but the
 * learner's progress is local: no private backend data is needed to know
 * which piece comes next.
 */
const PROGRESS_KEY = "lockdrop_roadmap_progress";

function readProgress() {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}") || {};
  } catch {
    return {};
  }
}

export const roadmapState = {
  /** { roadmaps: [...] } loaded from /data/roadmaps.json. */
  manifest: null,
  /** True when the feed is showing the learning path rather than the feed. */
  enabled: false,
  /** The roadmap slug currently being followed. */
  activeId: "",
  /** { [stepSlug]: true } — steps the visitor has completed. */
  progress: readProgress(),
};

export function saveProgress() {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(roadmapState.progress));
  } catch {
    /* private mode, or storage full — progress is a nicety */
  }
}
