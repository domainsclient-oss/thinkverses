"use client";

import { useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";
import { useFrame, type ThreeElements } from "@react-three/fiber";
import { Billboard, Line } from "@react-three/drei";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { CYAN } from "./materials";

/* ---------- Hologram: edge + fill twin of any child geometry ---------- */

export function useHoloMats(color = CYAN, line = 0.85, fill = 0.06, additive = true) {
  const blending = additive ? THREE.AdditiveBlending : THREE.NormalBlending;
  return useMemo(
    () => ({
      line: new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: line,
        blending,
        depthWrite: false,
        toneMapped: false,
      }),
      fill: new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: fill,
        blending,
        depthWrite: false,
        side: THREE.DoubleSide,
        toneMapped: false,
      }),
    }),
    [color, line, fill, blending],
  );
}

type HoloProps = Omit<ThreeElements["group"], "ref"> & {
  children: ReactNode;
  mats: ReturnType<typeof useHoloMats>;
  angle?: number;
};

// Renders the children invisibly, then rebuilds them as one merged edge mesh and one merged fill mesh.
export function Hologram({ children, mats, angle = 28, ...props }: HoloProps) {
  const src = useRef<THREE.Group>(null);
  const [geo, setGeo] = useState<{ edges: THREE.BufferGeometry; fill: THREE.BufferGeometry } | null>(null);

  useLayoutEffect(() => {
    const g = src.current;
    if (!g) return;
    g.updateWorldMatrix(true, true);
    const inv = g.matrixWorld.clone().invert();
    const edges: THREE.BufferGeometry[] = [];
    const fills: THREE.BufferGeometry[] = [];
    g.traverse((o) => {
      const m = o as THREE.Mesh;
      if (!m.isMesh) return;
      const rel = new THREE.Matrix4().multiplyMatrices(inv, m.matrixWorld);
      const e = new THREE.EdgesGeometry(m.geometry, angle);
      e.applyMatrix4(rel);
      edges.push(e);
      const f = new THREE.BufferGeometry();
      const base = m.geometry.index ? m.geometry.toNonIndexed() : m.geometry;
      f.setAttribute("position", base.getAttribute("position").clone());
      f.applyMatrix4(rel);
      fills.push(f);
    });
    const next = { edges: mergeGeometries(edges)!, fill: mergeGeometries(fills)! };
    setGeo(next);
    return () => {
      next.edges.dispose();
      next.fill.dispose();
    };
  }, [angle]);

  return (
    <group {...props}>
      <group ref={src} visible={false}>
        {children}
      </group>
      {geo && (
        <>
          <lineSegments geometry={geo.edges} material={mats.line} />
          <mesh geometry={geo.fill} material={mats.fill} />
        </>
      )}
    </group>
  );
}

/* ---------- Glow sprite ---------- */

let glowTex: THREE.Texture | null = null;
function glowTexture() {
  if (glowTex) return glowTex;
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.25, "rgba(255,255,255,0.55)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  glowTex = new THREE.CanvasTexture(c);
  return glowTex;
}

export function Glow({ color = CYAN, scale = 1, opacity = 0.9, ...props }: Omit<ThreeElements["sprite"], "ref"> & { color?: string; opacity?: number; scale?: number }) {
  const map = useMemo(() => glowTexture(), []);
  return (
    <sprite scale={[scale, scale, scale]} {...props}>
      <spriteMaterial map={map} color={color} transparent opacity={opacity} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
    </sprite>
  );
}

/* ---------- Animated data connection ---------- */

type FlowProps = {
  from: THREE.Vector3Tuple;
  to: THREE.Vector3Tuple;
  lift?: number;
  color?: string;
  speed?: number;
  width?: number;
  pulses?: number;
  opacity?: number;
};

export function FlowLine({ from, to, lift = 1.2, color = CYAN, speed = 0.35, width = 1.6, pulses = 2, opacity = 0.75 }: FlowProps) {
  const curve = useMemo(() => {
    const a = new THREE.Vector3(...from);
    const b = new THREE.Vector3(...to);
    const mid = a.clone().lerp(b, 0.5);
    mid.y += lift;
    return new THREE.QuadraticBezierCurve3(a, mid, b);
  }, [from, to, lift]);
  const points = useMemo(() => curve.getPoints(48), [curve]);
  const line = useRef<{ material: { dashOffset: number } } | null>(null);
  const dots = useRef<(THREE.Object3D | null)[]>([]);

  useFrame((_, dt) => {
    if (line.current) line.current.material.dashOffset -= dt * speed * 2;
    const t = performance.now() / 1000;
    dots.current.forEach((d, i) => {
      if (!d) return;
      const u = (t * speed + i / pulses) % 1;
      d.position.copy(curve.getPoint(u));
    });
  });

  return (
    <group>
      <Line points={points} color={color} lineWidth={width * 0.5} transparent opacity={opacity * 0.25} />
      <Line
        ref={line as never}
        points={points}
        color={color}
        lineWidth={width}
        dashed
        dashSize={0.18}
        gapSize={0.22}
        transparent
        opacity={opacity}
      />
      {Array.from({ length: pulses }, (_, i) => (
        <group key={i} ref={(el) => void (dots.current[i] = el)}>
          <Glow color={color} scale={0.32} />
          <mesh>
            <sphereGeometry args={[0.035, 10, 10]} />
            <meshBasicMaterial color="#ffffff" toneMapped={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ---------- Expanding ring (vibration / selection) ---------- */

export function PulseRing({ color = CYAN, radius = 1, period = 2.4, delay = 0, ...props }: Omit<ThreeElements["mesh"], "ref"> & { color?: string; radius?: number; period?: number; delay?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshBasicMaterial>(null);
  useFrame(({ clock }) => {
    const u = ((clock.elapsedTime + delay) % period) / period;
    if (ref.current) ref.current.scale.setScalar(radius * (0.4 + u * 0.9));
    if (mat.current) mat.current.opacity = (1 - u) * 0.7;
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} {...props}>
      <ringGeometry args={[0.92, 1, 64]} />
      <meshBasicMaterial ref={mat} color={color} transparent blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} side={THREE.DoubleSide} />
    </mesh>
  );
}

/* ---------- Textless monitoring panel ---------- */

export function HudPanel({
  width = 1.6,
  height = 1,
  bars = 7,
  seed = 1,
  accent = CYAN,
  warn = false,
  bg = "#071630",
  ...props
}: Omit<ThreeElements["group"], "ref"> & { width?: number; height?: number; bars?: number; seed?: number; accent?: string; warn?: boolean; bg?: string }) {
  const barRefs = useRef<(THREE.Mesh | null)[]>([]);
  const spark = useMemo(() => {
    const pts: THREE.Vector3Tuple[] = [];
    for (let i = 0; i <= 24; i++) {
      const x = -width / 2 + 0.12 + (i / 24) * (width - 0.24);
      const base = Math.sin(i * 0.6 + seed) * 0.06 + Math.sin(i * 1.7 + seed * 3) * 0.03;
      const rise = warn && i > 16 ? (i - 16) * 0.025 : 0;
      pts.push([x, height * 0.18 + base + rise, 0.01]);
    }
    return pts;
  }, [width, height, seed, warn]);
  const frame = useMemo<THREE.Vector3Tuple[]>(() => {
    const w = width / 2;
    const h = height / 2;
    return [
      [-w, -h, 0],
      [w, -h, 0],
      [w, h, 0],
      [-w, h, 0],
      [-w, -h, 0],
    ];
  }, [width, height]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    barRefs.current.forEach((b, i) => {
      if (!b) return;
      const v = 0.35 + 0.65 * Math.abs(Math.sin(t * 0.8 + i * 0.9 + seed));
      b.scale.y = v;
      b.position.y = -height / 2 + 0.1 + (v * height * 0.32) / 2;
    });
  });

  const bw = (width - 0.3) / bars;
  return (
    <Billboard {...props}>
      <mesh>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial color={bg} transparent opacity={bg === "#071630" ? 0.62 : 0.92} depthWrite={false} />
      </mesh>
      <Line points={frame} color={accent} lineWidth={1.2} transparent opacity={0.8} />
      <mesh position={[-width / 2 + 0.16, height / 2 - 0.12, 0.01]}>
        <circleGeometry args={[0.035, 16]} />
        <meshBasicMaterial color={warn ? "#ffb547" : accent} toneMapped={false} />
      </mesh>
      <mesh position={[-width / 2 + 0.5, height / 2 - 0.12, 0.01]}>
        <planeGeometry args={[0.5, 0.035]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.35} />
      </mesh>
      <Line points={spark} color={warn ? "#ffb547" : accent} lineWidth={1.8} />
      {Array.from({ length: bars }, (_, i) => (
        <mesh
          key={i}
          ref={(el) => void (barRefs.current[i] = el)}
          position={[-width / 2 + 0.15 + bw * (i + 0.5), -height / 2 + 0.2, 0.01]}
        >
          <planeGeometry args={[bw * 0.62, height * 0.32]} />
          <meshBasicMaterial color={accent} transparent opacity={0.55} toneMapped={false} />
        </mesh>
      ))}
    </Billboard>
  );
}
