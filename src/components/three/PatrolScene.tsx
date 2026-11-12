"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Grid, Line, RoundedBox, Sparkles } from "@react-three/drei";
import { DomLabel } from "./DomLabel";
import { SceneCanvas, useIsSmall, type SceneProps } from "./SceneCanvas";
import { CameraRig, StudioLights } from "./Station";
import { Glow, PulseRing } from "./fx";
import { AMBER, CYAN, createMats } from "./materials";

type Mats = ReturnType<typeof createMats>;

type Palette = {
  light: boolean;
  accent: string;
  covered: string;
  blind: string;
  fog: string;
  grid: [string, string];
  fence: string;
  windows: string;
  containers: string[];
};

const PALETTES: Record<"default" | "section", Palette> = {
  default: {
    light: false,
    accent: CYAN,
    covered: CYAN,
    blind: AMBER,
    fog: "#04070d",
    grid: ["#0f2142", "#1b437f"],
    fence: "#41608f",
    windows: "#9fdcff",
    containers: ["#1f4fa6", "#8a3a2a", "#2d6f5e", "#7a6a2a"],
  },
  // Physical AI stage: the pale site map, green patrol route, amber blind spots
  section: {
    light: true,
    accent: "#0b6e50",
    covered: "#0b6e50",
    blind: "#f5a524",
    fog: "#f3f7f5",
    grid: ["#d3e6dc", "#9cc9b2"],
    fence: "#9fb3ad",
    windows: "#5fd4a0",
    containers: ["#14304f", "#c2671c", "#0b6e50", "#4a5868"],
  },
};

const LABEL_CLASS =
  "whitespace-nowrap rounded-md bg-white/90 px-2 py-0.5 text-[0.72rem] font-medium text-[#4a5868] shadow-[0_6px_14px_-8px_rgba(20,48,79,0.5)] ring-1 ring-[#14304f]/10";

const ROUTE: THREE.Vector3Tuple[] = [
  [-6.5, 0, -6],
  [0, 0, -6.8],
  [6.4, 0, -5.6],
  [7, 0, 0.5],
  [5.8, 0, 6.2],
  [0.5, 0, 4.2],
  [-2.2, 0, 0.6],
  [-6.8, 0, 3.8],
  [-7.4, 0, -1.2],
];

// The robot always starts its patrol here: the blind spot beside the "Gate" building, then drives on along the loop.
const START_AT = new THREE.Vector3(-1.2, 0, 2.6);
const SPEED = 0.022; // fraction of the loop per second
const HOLD = 2.5; // seconds parked at the start point
const LAP = HOLD + 1 / SPEED;
const patrolU = (t: number, u0: number) => {
  const tt = t % LAP;
  return (u0 + (tt < HOLD ? 0 : (tt - HOLD) * SPEED)) % 1;
};

// Position along the loop (0..1) closest to START_AT.
const startU = (curve: THREE.CatmullRomCurve3) => {
  let best = 0;
  let bestD = Infinity;
  for (let i = 0; i < 1000; i++) {
    const d = curve.getPointAt(i / 1000).distanceToSquared(START_AT);
    if (d < bestD) {
      bestD = d;
      best = i / 1000;
    }
  }
  return best;
};

const BLIND_SPOTS: THREE.Vector3Tuple[] = [
  [3.6, 0, -6.6],
  [7.2, 0, 3.6],
  [-1.2, 0, 2.6],
  [-7.6, 0, 1.4],
];

const HEAT_AT: THREE.Vector3Tuple = [4.1, 0, 3.2];

function Site({ mats, pal, labels }: { mats: Mats; pal: Palette; labels?: string[] }) {
  const buildings: { p: THREE.Vector3Tuple; s: THREE.Vector3Tuple }[] = [
    { p: [-3, 0, -3], s: [4.2, 2.2, 3] },
    { p: [3.2, 0, -2.6], s: [3.2, 1.6, 2.6] },
    { p: [2.6, 0, 1.6], s: [2.2, 1.2, 1.6] },
    { p: [-4.4, 0, 6.6], s: [3, 1.4, 1.8] },
  ];
  const containers: { p: THREE.Vector3Tuple; c: string; r?: number }[] = [
    { p: [-0.4, 0.3, 6.8], c: pal.containers[0] },
    { p: [1.2, 0.3, 6.9], c: pal.containers[1] },
    { p: [0.4, 0.9, 6.85], c: pal.containers[2] },
    { p: [-8.6, 0.3, -4.4], c: pal.containers[3], r: Math.PI / 2 },
  ];
  return (
    <group>
      {buildings.map((b, i) => (
        <group key={i} position={b.p}>
          <mesh position={[0, b.s[1] / 2, 0]} material={mats.concrete} castShadow receiveShadow>
            <boxGeometry args={b.s} />
          </mesh>
          <mesh position={[0, b.s[1] + 0.03, 0]} material={mats.frame}>
            <boxGeometry args={[b.s[0] + 0.1, 0.06, b.s[2] + 0.1]} />
          </mesh>
          {/* Lit windows strip */}
          <mesh position={[0, b.s[1] * 0.6, b.s[2] / 2 + 0.01]}>
            <planeGeometry args={[b.s[0] * 0.8, 0.1]} />
            <meshBasicMaterial color={pal.windows} transparent opacity={0.55} toneMapped={false} />
          </mesh>
          {labels?.[i] && <DomLabel text={labels[i]} className={LABEL_CLASS} position={[b.p[0], b.s[1] + 0.5, b.p[2]]} />}
        </group>
      ))}
      {containers.map((c, i) => (
        <mesh key={i} position={c.p} rotation={[0, c.r ?? 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.5, 0.6, 0.62]} />
          <meshStandardMaterial color={c.c} metalness={0.5} roughness={0.55} />
        </mesh>
      ))}
      {/* Perimeter fence */}
      {Array.from({ length: 40 }, (_, i) => {
        const side = Math.floor(i / 10);
        const f = (i % 10) / 10;
        const L = 9.6;
        const pos: THREE.Vector3Tuple =
          side === 0 ? [-L + f * 2 * L, 0.4, -L] : side === 1 ? [L, 0.4, -L + f * 2 * L] : side === 2 ? [L - f * 2 * L, 0.4, L] : [-L, 0.4, L - f * 2 * L];
        return (
          <mesh key={i} position={pos} material={mats.frame}>
            <cylinderGeometry args={[0.03, 0.03, 0.8, 6]} />
          </mesh>
        );
      })}
      <Line
        points={[
          [-9.6, 0.75, -9.6],
          [9.6, 0.75, -9.6],
          [9.6, 0.75, 9.6],
          [-9.6, 0.75, 9.6],
          [-9.6, 0.75, -9.6],
        ]}
        color={pal.fence}
        lineWidth={1}
      />
      {/* Thermal source: an electrical cabinet running hot */}
      <group position={HEAT_AT}>
        <mesh position={[0, 0.45, 0]} material={mats.skid} castShadow>
          <boxGeometry args={[0.5, 0.9, 0.35]} />
        </mesh>
      </group>
    </group>
  );
}

function Robot({ curve, pal, time, u0 }: { curve: THREE.CatmullRomCurve3; pal: Palette; time: { current: number }; u0: number }) {
  const ref = useRef<THREE.Group>(null);
  const lidar = useRef<THREE.Group>(null);
  const sweep = useRef<THREE.Mesh>(null);
  const wheels = useRef<THREE.Group>(null);
  const light = useRef<THREE.SpotLight>(null);
  const target = useMemo(() => new THREE.Object3D(), []);
  const up = useMemo(() => new THREE.Vector3(0, 1, 0), []);

  useFrame((_, dt) => {
    const u = patrolU(time.current, u0);
    const p = curve.getPointAt(u);
    const tan = curve.getTangentAt(u);
    if (ref.current) {
      ref.current.position.set(p.x, 0, p.z);
      const ang = Math.atan2(tan.x, tan.z);
      ref.current.quaternion.slerp(new THREE.Quaternion().setFromAxisAngle(up, ang), 1 - Math.exp(-dt * 6));
    }
    if (lidar.current) lidar.current.rotation.y += dt * 6;
    if (sweep.current) sweep.current.rotation.z += dt * 2.2;
    wheels.current?.children.forEach((w) => (w.rotation.x += dt * 6));
  });

  return (
    <group ref={ref}>
      <RoundedBox args={[0.62, 0.26, 0.86]} radius={0.06} position={[0, 0.3, 0]} castShadow>
        <meshPhysicalMaterial color="#e6ecf3" metalness={0.3} roughness={0.35} clearcoat={0.8} />
      </RoundedBox>
      <mesh position={[0, 0.3, 0.44]}>
        <boxGeometry args={[0.5, 0.08, 0.02]} />
        <meshBasicMaterial color="#e9fbff" toneMapped={false} />
      </mesh>
      <group ref={wheels}>
        {[
          [-0.36, -0.28],
          [0.36, -0.28],
          [-0.36, 0.28],
          [0.36, 0.28],
        ].map(([x, z]) => (
          <mesh key={`${x}${z}`} position={[x, 0.16, z]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.16, 0.16, 0.1, 20]} />
            <meshStandardMaterial color="#121620" roughness={0.8} />
          </mesh>
        ))}
      </group>
      {/* Sensor mast: lidar + thermal camera */}
      <mesh position={[0, 0.62, -0.1]}>
        <cylinderGeometry args={[0.03, 0.03, 0.4, 10]} />
        <meshStandardMaterial color="#2a313c" metalness={0.7} roughness={0.4} />
      </mesh>
      <group ref={lidar} position={[0, 0.86, -0.1]}>
        <mesh>
          <cylinderGeometry args={[0.1, 0.1, 0.1, 24]} />
          <meshStandardMaterial color="#1a1f28" metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[0.1, 0, 0]}>
          <boxGeometry args={[0.02, 0.04, 0.06]} />
          <meshBasicMaterial color={pal.accent} toneMapped={false} />
        </mesh>
      </group>
      <group position={[0, 0.98, -0.1]}>
        <Glow color={pal.accent} scale={0.5} />
      </group>
      {/* Lidar sweep on the ground */}
      <mesh ref={sweep} position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.6, 48, 0, 0.7]} />
        <meshBasicMaterial color={pal.accent} transparent opacity={pal.light ? 0.14 : 0.16} depthWrite={false} blending={pal.light ? THREE.NormalBlending : THREE.AdditiveBlending} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.025, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.55, 2.6, 64]} />
        <meshBasicMaterial color={pal.accent} transparent opacity={0.35} toneMapped={false} />
      </mesh>
      {/* Headlight */}
      <primitive object={target} position={[0, 0, 3]} />
      <spotLight ref={light} position={[0, 0.4, 0.4]} angle={0.5} penumbra={0.7} intensity={18} distance={7} color="#dff4ff" target={target} />
    </group>
  );
}

function BlindSpot({ at, curve, pal, time, u0 }: { at: THREE.Vector3Tuple; curve: THREE.CatmullRomCurve3; pal: Palette; time: { current: number }; u0: number }) {
  const disc = useRef<THREE.MeshBasicMaterial>(null);
  const covered = useRef(0);
  const here = useMemo(() => new THREE.Vector3(...at), [at]);
  useFrame((_, dt) => {
    const u = patrolU(time.current, u0);
    const d = curve.getPointAt(u).distanceTo(here);
    covered.current = d < 2.6 ? 1 : Math.max(0, covered.current - dt * 0.15);
    if (disc.current) disc.current.color.lerpColors(new THREE.Color(pal.blind), new THREE.Color(pal.covered), covered.current);
  });
  return (
    <group position={at}>
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.9, 40]} />
        <meshBasicMaterial ref={disc} color={pal.blind} transparent opacity={pal.light ? 0.35 : 0.22} depthWrite={false} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.16, 24]} />
        <meshBasicMaterial color={pal.light ? "#e0522b" : pal.blind} toneMapped={false} />
      </mesh>
      <PulseRing color={pal.blind} radius={1.1} period={2.8} position={[0, 0.03, 0]} />
    </group>
  );
}

function Content({ small, pal, labels, active }: { small: boolean; pal: Palette; labels?: string[]; active: boolean }) {
  // Patrol clock: restarts each time the scene comes into view, so the robot is always seen setting off from the gate.
  const time = useRef(0);
  useEffect(() => {
    if (active) time.current = 0;
  }, [active]);
  useFrame((_, dt) => {
    time.current += Math.min(dt, 0.5); // cap only guards against a huge first step after a long pause
  });

  const mats = useMemo(() => {
    const m = createMats();
    if (pal.light) {
      m.floor.color.set("#eef4f1");
      m.floor.metalness = 0.05;
      m.floor.roughness = 0.9;
      m.concrete.color.set("#dfe7ee");
      m.frame.color.set("#b9c6c2");
      m.skid.color.set("#4a5868");
    }
    return m;
  }, [pal]);
  const curve = useMemo(() => new THREE.CatmullRomCurve3(ROUTE.map((p) => new THREE.Vector3(...p)), true, "catmullrom", 0.4), []);
  const u0 = useMemo(() => startU(curve), [curve]);
  const routePts = useMemo(() => curve.getPoints(160).map((p) => [p.x, 0.03, p.z] as THREE.Vector3Tuple), [curve]);
  const dash = useRef<{ material: { dashOffset: number } } | null>(null);
  useFrame((_, dt) => {
    if (dash.current) dash.current.material.dashOffset -= dt * 0.6;
  });
  return (
    <>
      <fog attach="fog" args={[pal.fog, 14, 34]} />
      {pal.light && <ambientLight intensity={0.6} />}
      <StudioLights shadows={!small} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} material={mats.floor} receiveShadow>
        <planeGeometry args={[60, 60]} />
      </mesh>
      <Grid position={[0, 0.004, 0]} args={[40, 40]} cellSize={1} cellColor={pal.grid[0]} sectionSize={4} sectionColor={pal.grid[1]} fadeDistance={30} infiniteGrid />
      <Site mats={mats} pal={pal} labels={labels} />
      <Line points={routePts} color={pal.accent} lineWidth={pal.light ? 5 : 1} transparent opacity={pal.light ? 0.15 : 0.25} />
      <Line ref={dash as never} points={routePts} color={pal.accent} lineWidth={2.2} dashed dashSize={0.35} gapSize={0.35} />
      {BLIND_SPOTS.map((b) => (
        <BlindSpot key={b.join()} at={b} curve={curve} pal={pal} time={time} u0={u0} />
      ))}
      {/* Thermal signature */}
      {!pal.light && (
      <group position={[HEAT_AT[0], 0.7, HEAT_AT[2]]}>
        <Glow color="#ff5a1f" scale={2.2} opacity={0.75} />
        <Glow color="#ffd23f" scale={0.9} />
      </group>
      )}
      {!pal.light && <PulseRing color="#ff6a2a" radius={1.4} period={2} position={[HEAT_AT[0], 0.03, HEAT_AT[2]]} />}
      <Robot curve={curve} pal={pal} time={time} u0={u0} />
      {!pal.light && <Sparkles count={small ? 30 : 60} scale={[18, 4, 18]} position={[0, 2, 0]} size={2} speed={0.2} opacity={0.35} color="#9fe9ff" />}
      <CameraRig position={small ? (pal.light ? [16, 17, 16] : [13, 14, 13]) : [11, 11.5, 11.5]} target={[0, 0, 0]} sway={0.8} parallax={1} />
    </>
  );
}

export default function PatrolScene({ active, still, eager, tone = "default", labels }: SceneProps & { tone?: "default" | "section"; labels?: string[] }) {
  const small = useIsSmall();
  return (
    <SceneCanvas active={active} still={still} eager={eager} camera={{ position: [11, 11.5, 11.5], fov: 40 }}>
      <Content small={small} pal={PALETTES[tone]} labels={labels} active={active} />
    </SceneCanvas>
  );
}
