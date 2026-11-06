"use client";

import { Suspense, useEffect, useState, type ReactNode } from "react";
import { Canvas, type CanvasProps } from "@react-three/fiber";
import * as THREE from "three";

export type SceneProps = {
  /** false pauses rendering while the canvas is off-screen */
  active: boolean;
  /** visitors who prefer reduced motion get a single still frame */
  still: boolean;
};

export function useIsSmall() {
  const [small, setSmall] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setSmall(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return small;
}

export function SceneCanvas({
  active,
  still,
  children,
  camera,
  shadows = true,
  ...rest
}: SceneProps & { children: ReactNode; camera: CanvasProps["camera"]; shadows?: boolean } & Omit<CanvasProps, "children" | "camera">) {
  const small = useIsSmall();
  return (
    <Canvas
      dpr={small ? [1, 1.4] : [1, 1.8]}
      shadows={shadows && !small ? "percentage" : false}
      frameloop={still ? "demand" : active ? "always" : "never"}
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
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  );
}
