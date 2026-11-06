"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ComponentType } from "react";

type AnyScene = ComponentType<Record<string, unknown> & { active: boolean; still: boolean }>;

const scenes = {
  station: dynamic(() => import("./StationScene"), { ssr: false }),
  layers: dynamic(() => import("./LayerStackScene"), { ssr: false }),
  inspection: dynamic(() => import("./InspectionScene"), { ssr: false }),
  patrol: dynamic(() => import("./PatrolScene"), { ssr: false }),
  journey: dynamic(() => import("./JourneyScene"), { ssr: false }),
} as unknown as Record<string, AnyScene>;

export type SceneName = "station" | "layers" | "inspection" | "patrol" | "journey";

// Mounts a WebGL scene only while it is near the viewport (keeps GPU contexts bounded),
// pauses it when it scrolls out, and renders a still frame for reduced-motion visitors.
export function SceneMount({
  scene,
  className = "",
  label,
  props,
  paused = false,
}: {
  scene: SceneName;
  className?: string;
  /** Accessible name; only pass existing copy */
  label?: string;
  props?: Record<string, unknown>;
  /** Stop rendering while visually hidden (e.g. a crossfaded-out view) */
  paused?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setStill(mq.matches);
    const near = new IntersectionObserver(([e]) => setMounted(e.isIntersecting), { rootMargin: "600px 0px" });
    const seen = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { rootMargin: "0px" });
    near.observe(el);
    seen.observe(el);
    return () => {
      near.disconnect();
      seen.disconnect();
    };
  }, []);

  const Scene = scenes[scene];
  return (
    <div ref={ref} className={className} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      {mounted && (
        <div className="scene-fade absolute inset-0">
          <Scene active={active && !paused} still={still} {...props} />
        </div>
      )}
    </div>
  );
}
