"use client";

import { Suspense, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame, useThree, type CanvasProps } from "@react-three/fiber";
import * as THREE from "three";
import { waitForCalm } from "./calm";

export type SceneProps = {
  /** false pauses rendering while the canvas is off-screen */
  active: boolean;
  /** visitors who prefer reduced motion get a single still frame */
  still: boolean;
  /** hero: skip full-scene shader warmup so the first frame can render immediately */
  immediate?: boolean;
};

export function useIsSmall() {
  // Read the breakpoint on first client render: starting at `false` and flipping on phones would
  // toggle shadows right after the first frame and recompile every material (a visible stall).
  const [small, setSmall] = useState(() => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setSmall(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return small;
}

/* Precompile background scenes before showing them. The hero skips this full-scene gate so its
   visible frame is not delayed; its shaders are compiled as the first frame is rendered. */
function Warmup({ onReady, immediate }: { onReady: () => void; immediate?: boolean }) {
  const { gl, scene, camera } = useThree();
  useEffect(() => {
    if (immediate) {
      onReady();
      return;
    }

    let alive = true;
    const id = requestAnimationFrame(() => {
      gl.compileAsync(scene, camera)
        .catch(() => undefined)
        // The first frame also builds the environment map synchronously: keep it out of a scroll.
        .then(() => waitForCalm())
        .then(() => alive && onReady());
    });
    return () => {
      alive = false;
      cancelAnimationFrame(id);
    };
  }, [gl, scene, camera, onReady, immediate]);
  return null;
}

/* Shadow maps are re-rendered every frame by default (a second full pass over the scene).
   Refreshing them every third frame is visually identical here and frees that time. */
function ShadowThrottle() {
  const gl = useThree((st) => st.gl);
  const n = useRef(0);
  useEffect(() => {
    gl.shadowMap.autoUpdate = false;
    gl.shadowMap.needsUpdate = true;
    return () => {
      gl.shadowMap.autoUpdate = true;
    };
  }, [gl]);
  useFrame(() => {
    n.current = (n.current + 1) % 3;
    if (n.current === 0) gl.shadowMap.needsUpdate = true;
  });
  return null;
}

/* While the page scrolls under a resting cursor, the browser keeps sending pointer moves and
   R3F would raycast the whole scene for each one. Switch its event handling off until the
   scroll settles (no DOM/style changes involved). */
function ScrollQuietEvents() {
  const setEvents = useThree((st) => st.setEvents);
  useEffect(() => {
    let t = 0;
    const onScroll = () => {
      if (!t) setEvents({ enabled: false });
      else window.clearTimeout(t);
      t = window.setTimeout(() => {
        t = 0;
        setEvents({ enabled: true });
      }, 150);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(t);
    };
  }, [setEvents]);
  return null;
}

function Kick({ ready }: { ready: boolean }) {
  // Draw the first frame as soon as shaders are ready (needed for the reduced-motion "demand" loop),
  // then tell the surrounding SceneMount it can hide its poster.
  const invalidate = useThree((st) => st.invalidate);
  const gl = useThree((st) => st.gl);
  useEffect(() => {
    if (!ready) return;
    invalidate();
    let id = requestAnimationFrame(() => {
      id = requestAnimationFrame(() => gl.domElement.dispatchEvent(new Event("scene-ready", { bubbles: true })));
    });
    return () => cancelAnimationFrame(id);
  }, [ready, invalidate, gl]);
  return null;
}

export function SceneCanvas({
  active,
  still,
  immediate = false,
  children,
  camera,
  shadows = true,
  ...rest
}: SceneProps & { children: ReactNode; camera: CanvasProps["camera"]; shadows?: boolean } & Omit<CanvasProps, "children" | "camera">) {
  const small = useIsSmall();
  const [ready, setReady] = useState(false);
  const markReady = useCallback(() => setReady(true), []);
  return (
    <Canvas
      // Capped pixel ratio: big fill-rate saving on hi-DPI screens, keeps frames smooth while scrolling
      dpr={small ? [1, 1.25] : [1, 1.5]}
      shadows={shadows && !small ? "percentage" : false}
      frameloop={!ready ? "never" : still ? "demand" : active ? "always" : "never"}
      camera={camera}
      // offsetSize ignores CSS transforms, so canvases inside scaled/rotated wrappers keep their true size
      resize={{ offsetSize: true }}
      gl={{ antialias: !small, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
        gl.localClippingEnabled = true;
      }}
      {...rest}
    >
      <Suspense fallback={null}>
        {children}
        <Warmup onReady={markReady} immediate={immediate} />
      </Suspense>
      <Kick ready={ready} />
      <ShadowThrottle />
      <ScrollQuietEvents />
    </Canvas>
  );
}
