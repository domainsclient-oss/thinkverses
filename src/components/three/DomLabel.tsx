"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

// A plain DOM label pinned to a point in the scene. Lighter than drei <Html> and free of its
// nested React root, which React 19 warns about on unmount. Text is set verbatim.
export function DomLabel({
  text,
  className,
  position = [0, 0, 0],
  follow,
  shown,
}: {
  text: string;
  className: string;
  position?: THREE.Vector3Tuple;
  /** Pin to this object's world position instead of a fixed point */
  follow?: RefObject<THREE.Object3D | null>;
  /** Read every frame; false hides the label */
  shown?: RefObject<boolean>;
}) {
  const { gl, camera, size } = useThree();
  const el = useRef<HTMLSpanElement | null>(null);
  const fixed = useMemo(() => new THREE.Vector3(...position), [position]);
  const v = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    const host = gl.domElement.parentElement;
    if (!host) return;
    const span = document.createElement("span");
    span.textContent = text;
    span.className = className;
    span.setAttribute("aria-hidden", "true");
    Object.assign(span.style, { position: "absolute", left: "0", top: "0", pointerEvents: "none", willChange: "transform", transition: "opacity .25s" });
    host.appendChild(span);
    el.current = span;
    return () => {
      span.remove();
      el.current = null;
    };
  }, [gl, text, className]);

  useFrame(() => {
    const span = el.current;
    if (!span) return;
    if (follow?.current) follow.current.getWorldPosition(v);
    else v.copy(fixed);
    v.project(camera);
    const x = (v.x * 0.5 + 0.5) * size.width;
    const y = (-v.y * 0.5 + 0.5) * size.height;
    span.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
    span.style.opacity = v.z > 1 || (shown && !shown.current) ? "0" : "1";
  });

  return null;
}
