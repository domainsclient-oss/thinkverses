"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useRef, useState, useSyncExternalStore, type ComponentType } from "react";
import { CALM_MS, hookScroll, quietFor } from "./calm";

type AnyScene = ComponentType<Record<string, unknown> & { active: boolean; still: boolean; immediate?: boolean; eager?: boolean }>;

// Same modules as below; called ahead of mounting so the chunk is already in memory
const loaders: Record<SceneName, () => Promise<unknown>> = {
  station: () => import("./StationScene"),
  layers: () => import("./LayerStackScene"),
  inspection: () => import("./InspectionScene"),
  patrol: () => import("./PatrolScene"),
  journey: () => import("./JourneyScene"),
};
const scenes = {
  station: dynamic(() => import("./StationScene"), { ssr: false }),
  layers: dynamic(() => import("./LayerStackScene"), { ssr: false }),
  inspection: dynamic(() => import("./InspectionScene"), { ssr: false }),
  patrol: dynamic(() => import("./PatrolScene"), { ssr: false }),
  journey: dynamic(() => import("./JourneyScene"), { ssr: false }),
} as unknown as Record<string, AnyScene>;
// Hero copy of the station scene, server-rendered as an empty shell so Next emits a <link rel="preload">
// for its chunk in the HTML. three.js then downloads in parallel with the page bundles instead of
// starting only after hydration, which is what delayed the hero animation on load.
const heroScenes = {
  station: dynamic(() => import("./StationScene")),
} as unknown as Partial<Record<string, AnyScene>>;

export type SceneName = "station" | "layers" | "inspection" | "patrol" | "journey";

/* ---------- Engagement gate ----------
   WebGL (three.js + R3F, ~1 MB of JS) only boots once the visitor shows intent: a pointer move,
   touch, wheel or key press. Until then each scene shows a still poster frame, so the first load
   stays light and interactive. One shared flag for the whole page. */
let engaged = false;
const listeners = new Set<() => void>();
const INTENT = ["pointermove", "pointerdown", "touchstart", "wheel", "keydown"] as const;

function engage() {
  if (engaged) return;
  engaged = true;
  INTENT.forEach((e) => window.removeEventListener(e, engage));
  listeners.forEach((l) => l());
}
function subscribeEngaged(cb: () => void) {
  if (!engaged && listeners.size === 0) INTENT.forEach((e) => window.addEventListener(e, engage, { passive: true, once: true }));
  listeners.add(cb);
  return () => listeners.delete(cb);
}
const getEngaged = () => engaged;

/* ---------- Calm-moment scheduler ----------
   Creating a WebGL scene compiles shaders and builds the environment map: a few hundred ms of
   main-thread work. Doing that mid-scroll freezes every CSS/SVG animation on the page, so scenes
   are only created once scrolling has settled, during idle time, and one at a time. */
let queue: Promise<void> = Promise.resolve();
function whenCalm(run: () => void, isCancelled: () => boolean, prepare?: () => Promise<unknown>) {
  hookScroll();
  queue = queue.then(
    () =>
      new Promise<void>((done) => {
        const attempt = () => {
          if (isCancelled()) return done();
          const q = quietFor();
          if (q < CALM_MS) return void window.setTimeout(attempt, CALM_MS - q + 20);
          const go = async () => {
            // Fetch the scene code first, so the canvas is never inserted after scrolling resumes
            if (prepare) {
              await prepare().catch(() => undefined);
              prepare = undefined;
            }
            // Re-check: the visitor may have started scrolling while we waited
            if (quietFor() < CALM_MS) return attempt();
            if (!isCancelled()) run();
            window.setTimeout(done, 450); // let this scene finish its first frames before the next one starts
          };
          if ("requestIdleCallback" in window) window.requestIdleCallback(() => void go(), { timeout: 1200 });
          else setTimeout(() => void go(), 60);
        };
        attempt();
      }),
  );
}

// Mounts a WebGL scene only after engagement and while it is near the viewport (keeps GPU
// contexts bounded), pauses it when it scrolls out, and renders a still frame for reduced-motion visitors.
export function SceneMount({
  scene,
  className = "",
  label,
  props,
  paused = false,
  poster,
  priority = false,
  posterDesktopOnly = false,
  autoStart = false,
  eager = false,
}: {
  scene: SceneName;
  className?: string;
  /** Accessible name; only pass existing copy */
  label?: string;
  props?: Record<string, unknown>;
  /** Stop rendering while visually hidden (e.g. a crossfaded-out view) */
  paused?: boolean;
  /** Still frame shown until the live scene takes over */
  poster?: string;
  /** Above-the-fold poster: load eagerly */
  priority?: boolean;
  /** Below lg the poster waits for engagement too (keeps a small mobile window from becoming the LCP) */
  posterDesktopOnly?: boolean;
  /** Hero scene: start playing on page load (no engagement gate, no idle/calm waits) */
  autoStart?: boolean;
  /** Must already be playing when scrolled into view: fetch the code as soon as the visitor engages,
      create the scene well before it is visible, and skip the calm/idle waits */
  eager?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [active, setActive] = useState(autoStart);
  const [still, setStill] = useState(false);
  const [live, setLive] = useState(false);
  // Latches true once created; afterwards the scene pauses off-screen instead of being torn down
  // and recompiled on every pass.
  const [mounted, setMounted] = useState(autoStart);
  const isEngaged = useSyncExternalStore(subscribeEngaged, getEngaged, () => false);
  // Poster shows on every breakpoint once the scene is on its way
  const started = isEngaged || autoStart;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setStill(mq.matches);
    const nearIO = new IntersectionObserver(([e]) => setNear(e.isIntersecting), { rootMargin: eager ? "1400px 0px" : "600px 0px" });
    const seen = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { rootMargin: "0px" });
    nearIO.observe(el);
    seen.observe(el);
    return () => {
      nearIO.disconnect();
      seen.disconnect();
    };
  }, [eager]);

  // Eager scenes: download the scene code the moment the visitor engages, wherever they are on the page
  useEffect(() => {
    if (eager && isEngaged) loaders[scene]().catch(() => undefined);
  }, [eager, isEngaged, scene]);

  useEffect(() => {
    if (autoStart || mounted || !isEngaged) return;
    let cancelled = false;
    if (eager) {
      // Building the scene (shaders, environment map) takes seconds on weaker GPUs, so it must be done
      // long before the section is reached: at the visitor's first scroll pause after engaging, wherever
      // they are. It then idles off-screen with one frame pre-drawn. If they scroll straight down without
      // pausing, create it immediately once within ~1400px instead of waiting for calm.
      if (near) {
        loaders[scene]()
          .catch(() => undefined)
          .then(() => !cancelled && setMounted(true));
      } else {
        whenCalm(() => setMounted(true), () => cancelled, loaders[scene]);
      }
      return () => {
        cancelled = true;
      };
    }
    if (!near) return;
    whenCalm(() => setMounted(true), () => cancelled, loaders[scene]);
    return () => {
      cancelled = true;
    };
  }, [autoStart, eager, mounted, isEngaged, near, scene]);

  // A section with `content-visibility: auto` skips layout while off-screen, so a canvas inside it
  // measures 0×0 and three.js cannot draw its pre-warm frame. Lift it for this section once an eager
  // scene is being created (initial page load keeps the optimization; nothing visual changes).
  useEffect(() => {
    if (!eager || !mounted) return;
    const host = ref.current?.closest<HTMLElement>(".cv-auto");
    if (host) host.style.contentVisibility = "visible";
  }, [eager, mounted]);

  // Hand over from the poster once the canvas reports its first real frame
  useEffect(() => {
    const el = ref.current;
    if (!mounted || !el) return;
    const onReady = () => setLive(true);
    el.addEventListener("scene-ready", onReady);
    return () => el.removeEventListener("scene-ready", onReady);
  }, [mounted]);

  const Scene = (autoStart && heroScenes[scene]) || scenes[scene];
  return (
    <div ref={ref} data-scene={scene} className={className} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      {poster && (
        // eslint-disable-next-line @next/next/no-img-element -- decorative still; sized by its container
        <img
          src={poster}
          alt=""
          decoding="async"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${live && mounted ? "opacity-0" : "opacity-100"} ${posterDesktopOnly && !started ? "max-lg:hidden" : ""}`}
        />
      )}
      {mounted && (
        <div className="scene-fade absolute inset-0">
          {/* Own boundary: while the chunk is still downloading, only this subtree waits to hydrate */}
          <Suspense fallback={null}>
            <Scene active={active && !paused} still={still} immediate={autoStart} eager={eager} {...props} />
          </Suspense>
        </div>
      )}
    </div>
  );
}
