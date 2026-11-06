"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useSyncExternalStore, type ComponentType } from "react";

type AnyScene = ComponentType<Record<string, unknown> & { active: boolean; still: boolean }>;

const scenes = {
  station: dynamic(() => import("./StationScene"), { ssr: false }),
  layers: dynamic(() => import("./LayerStackScene"), { ssr: false }),
  inspection: dynamic(() => import("./InspectionScene"), { ssr: false }),
  patrol: dynamic(() => import("./PatrolScene"), { ssr: false }),
  journey: dynamic(() => import("./JourneyScene"), { ssr: false }),
} as unknown as Record<string, AnyScene>;

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
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [active, setActive] = useState(false);
  const [still, setStill] = useState(false);
  const [live, setLive] = useState(false);
  const isEngaged = useSyncExternalStore(subscribeEngaged, getEngaged, () => false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setStill(mq.matches);
    const nearIO = new IntersectionObserver(([e]) => setNear(e.isIntersecting), { rootMargin: "600px 0px" });
    const seen = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { rootMargin: "0px" });
    nearIO.observe(el);
    seen.observe(el);
    return () => {
      nearIO.disconnect();
      seen.disconnect();
    };
  }, []);

  const mounted = isEngaged && near;

  // Hand over from the poster once the canvas has had time to draw its first frames
  useEffect(() => {
    if (!mounted) return;
    const id = window.setTimeout(() => setLive(true), 900);
    return () => {
      window.clearTimeout(id);
      setLive(false);
    };
  }, [mounted]);

  const Scene = scenes[scene];
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
          className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${live && mounted ? "opacity-0" : "opacity-100"} ${posterDesktopOnly && !isEngaged ? "max-lg:hidden" : ""}`}
        />
      )}
      {mounted && (
        <div className="scene-fade absolute inset-0">
          <Scene active={active && !paused} still={still} {...props} />
        </div>
      )}
    </div>
  );
}
