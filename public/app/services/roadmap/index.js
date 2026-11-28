/**
 * Roadmap service — the synchronising engine.
 *
 * Joins static path steps to published drops, works out which piece is due
 * now, and listens for unlocks so the path advances at the right moment.
 * It owns its state (`./state.js`) and reaches the rest of the app only
 * through the bus.
 */
import { bus } from "../../core/bus.js";
import { escapeHtml } from "../../util.js";
import { roadmapState, saveProgress } from "./state.js";

/** Loaded once; the manifest is a static file, not an API call. */
let loading = null;

export function loadManifest(force = false) {
  if (roadmapState.manifest && !force) return Promise.resolve(roadmapState.manifest);
  if (loading && !force) return loading;
  loading = fetch("/data/roadmaps.json")
    .then((res) => (res.ok ? res.json() : null))
    .then((data) => {
      roadmapState.manifest = data && Array.isArray(data.roadmaps) ? data : { roadmaps: [] };
      if (!roadmapState.activeId && roadmapState.manifest.roadmaps.length) {
        roadmapState.activeId = roadmapState.manifest.roadmaps[0].slug;
      }
      loading = null;
      return roadmapState.manifest;
    })
    .catch(() => {
      roadmapState.manifest = { roadmaps: [] };
      loading = null;
      return roadmapState.manifest;
    });
  return loading;
}

/** The list of paths the manifest knows about. */
export function roadmaps() {
  return roadmapState.manifest?.roadmaps ?? [];
}

/** The currently selected path. */
export function activeRoadmap() {
  return roadmaps().find((r) => r.slug === roadmapState.activeId) ?? roadmaps()[0] ?? null;
}

export function selectRoadmap(slug) {
  roadmapState.activeId = slug;
  bus.emit("roadmap:changed");
}

export function setEnabled(on) {
  roadmapState.enabled = Boolean(on);
  bus.emit("roadmap:changed");
}

/** True when a drop is published for this exact step. */
export function joinSteps(roadmap, drops) {
  if (!roadmap) return [];
  const bySlug = new Map((drops ?? []).map((d) => [d.stepSlug || d.slug || d.id, d]));
  return roadmap.steps.map((step) => ({
    ...step,
    drop: bySlug.get(step.slug) ?? null,
    done: Boolean(roadmapState.progress[step.slug]),
  }));
}

/** The first step that has a drop and has not been completed. */
export function currentStep(steps) {
  return steps.find((s) => s.drop && !s.done) ?? null;
}

export function progressOf(steps) {
  const published = steps.filter((s) => s.drop);
  const done = published.filter((s) => s.done).length;
  return { done, total: published.length, percent: published.length ? (done / published.length) * 100 : 0 };
}

/** Marks a step complete when its drop is unlocked. */
export function completeStep(stepSlug) {
  if (!stepSlug || roadmapState.progress[stepSlug]) return;
  roadmapState.progress[stepSlug] = true;
  saveProgress();
  bus.emit("roadmap:changed");
}

/** Resolves a drop to a roadmap step and advances the path. */
function onUnlock(drop) {
  if (!drop?.stepSlug) return;
  completeStep(drop.stepSlug);
}

bus.on("drop:unlocked", onUnlock);

/**
 * The path rail: where you are, what is published, and what to open next.
 */
export function pathRailHtml(roadmap, steps) {
  if (!roadmap) return "";
  const current = currentStep(steps);
  const { done, total, percent } = progressOf(steps);
  const stages = roadmap.stages.length
    ? roadmap.stages
    : [{ name: "The path", from: 1, to: roadmap.steps.length }];

  const stageHtml = stages
    .map((stage) => {
      const inStage = steps.filter((s) => s.n >= stage.from && s.n <= stage.to);
      const complete = inStage.every((s) => !s.drop || s.done);
      return `<span class="path-stage${complete ? " is-done" : ""}">${escapeHtml(
        stage.name
      )}</span>`;
    })
    .join('<span class="path-sep">·</span>');

  const cta = current
    ? `<a href="#/drop/${escapeHtml(current.drop.id)}" class="btn btn-primary">
        Continue · ${escapeHtml(current.title)}
      </a>`
    : `<span class="tiny subtle">${done === total && total ? "Path complete." : "Waiting for the next piece."}</span>`;

  return `
    <div class="path-rail">
      <div class="path-rail-head">
        <div>
          <p class="prompt-ask">${escapeHtml(roadmap.title)}</p>
          <div class="path-stages">${stageHtml}</div>
        </div>
        <span class="path-count mono">${done}/${total}</span>
      </div>
      <div class="path-progress"><span style="width:${percent.toFixed(1)}%"></span></div>
      <div class="path-cta">${cta}</div>
    </div>`;
}

/**
 * A small badge on any card that belongs to the active path.
 */
export function stepBadgeHtml(drop) {
  if (!drop?.stepSlug) return "";
  const roadmap = activeRoadmap();
  const step = roadmap?.steps.find((s) => s.slug === drop.stepSlug);
  if (!step) return "";
  const done = Boolean(roadmapState.progress[step.slug]);
  return `<span class="step-badge${done ? " is-done" : ""}">${
    done ? "✓ " : ""
  }${escapeHtml(step.stage || "Path")} · ${step.n}</span>`;
}
