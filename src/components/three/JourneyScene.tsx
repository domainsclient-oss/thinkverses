"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Grid, RoundedBox, Sparkles } from "@react-three/drei";
import { SceneCanvas, useIsSmall, type SceneProps } from "./SceneCanvas";
import { StudioLights } from "./Station";
import { PumpUnit, PUMP_SENSORS } from "./PumpUnit";
import { FlowLine, Glow, Hologram, HudPanel, PulseRing, useHoloMats } from "./fx";
import { AMBER, BLUE, CYAN, createMats } from "./materials";

type Progress = { current: number };

// Camera keyframes per stage: real pump → data → twin → decision
const CAM: { p: THREE.Vector3Tuple; t: THREE.Vector3Tuple }[] = [
  { p: [3.2, 1.9, 3.6], t: [0.3, 0.8, 0] },
  { p: [5.8, 4.2, 6.4], t: [-1.2, 1.3, 0] },
  { p: [4.2, 2.6, -3.9], t: [0.4, 0.9, 0] },
  { p: [6.4, 6.2, 5.2], t: [0, 1.6, 0] },
];

const weight = (p: number, k: number) => THREE.MathUtils.clamp(1 - Math.abs(p - k), 0, 1);
const smooth = (x: number) => x * x * (3 - 2 * x);

function Rig({ progress }: { progress: Progress }) {
  const { camera } = useThree();
  const pos = useMemo(() => new THREE.Vector3(), []);
  const look = useMemo(() => new THREE.Vector3(), []);
  const cur = useMemo(() => new THREE.Vector3(0.3, 0.8, 0), []);
  const a = useMemo(() => new THREE.Vector3(), []);
  const b = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ pointer, clock }, dt) => {
    const p = THREE.MathUtils.clamp(progress.current, 0, 3);
    const i = Math.min(2, Math.floor(p));
    const f = smooth(p - i);
    pos.lerpVectors(a.set(...CAM[i].p), b.set(...CAM[i + 1].p), f);
    look.lerpVectors(a.set(...CAM[i].t), b.set(...CAM[i + 1].t), f);
    pos.x += pointer.x * 0.35 + Math.sin(clock.elapsedTime * 0.2) * 0.12;
    pos.y += pointer.y * 0.2;
    const k = 1 - Math.exp(-dt * 3.2);
    camera.position.lerp(pos, k);
    cur.lerp(look, k);
    camera.lookAt(cur);
  });
  return null;
}

// Four textless source glyphs: control room (SCADA), maintenance log, ERP cubes, inspection robot.
const SOURCE_AT: THREE.Vector3Tuple[] = [
  [-4.4, 2.6, -1.6],
  [-4.6, 0.6, 1.4],
  [-2.2, 3.4, 1.8],
  [-2.6, 0.2, -2.4],
];
const STORE_AT: THREE.Vector3Tuple = [-2.2, 1.2, 0];

function SourceGlyph({ kind }: { kind: number }) {
  const mat = <meshStandardMaterial color="#d7e9ff" emissive={kind % 2 ? CYAN : BLUE} emissiveIntensity={0.9} metalness={0.4} roughness={0.25} />;
  if (kind === 0)
    return (
      <group>
        <mesh>
          <boxGeometry args={[0.7, 0.42, 0.05]} />
          {mat}
        </mesh>
        <mesh position={[0, -0.3, 0]}>
          <boxGeometry args={[0.08, 0.2, 0.08]} />
          {mat}
        </mesh>
      </group>
    );
  if (kind === 1)
    return (
      <group>
        {[0, 0.08, 0.16].map((y) => (
          <mesh key={y} position={[0, y, 0]}>
            <boxGeometry args={[0.5, 0.04, 0.62]} />
            {mat}
          </mesh>
        ))}
      </group>
    );
  if (kind === 2)
    return (
      <group>
        {[
          [0, 0, 0],
          [0.26, 0, 0],
          [0.13, 0.24, 0],
          [0.13, 0.08, 0.24],
        ].map((p, i) => (
          <mesh key={i} position={p as THREE.Vector3Tuple}>
            <boxGeometry args={[0.2, 0.2, 0.2]} />
            {mat}
          </mesh>
        ))}
      </group>
    );
  return (
    <group>
      <RoundedBox args={[0.44, 0.18, 0.6]} radius={0.04}>
        {mat}
      </RoundedBox>
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.12, 16]} />
        {mat}
      </mesh>
    </group>
  );
}

function DataStage({ progress }: { progress: Progress }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    const w = Math.max(weight(progress.current, 1), progress.current > 1 ? 0.25 * weight(progress.current, 2) : 0);
    if (ref.current) {
      ref.current.scale.setScalar(THREE.MathUtils.damp(ref.current.scale.x, Math.max(0.001, w), 6, 1 / 60));
      ref.current.visible = ref.current.scale.x > 0.01;
    }
  });
  return (
    <group ref={ref} scale={0.001}>
      {SOURCE_AT.map((p, i) => (
        <group key={i}>
          <group position={p}>
            <SourceGlyph kind={i} />
            <Glow color={i % 2 ? CYAN : BLUE} scale={1.2} opacity={0.5} />
          </group>
          <FlowLine from={p} to={STORE_AT} lift={0.6} speed={0.45} pulses={3} color={i % 2 ? CYAN : "#7fa4ff"} />
        </group>
      ))}
      {/* One place: the checked, clean store */}
      <group position={STORE_AT}>
        {[0, 0.28, 0.56].map((y) => (
          <mesh key={y} position={[0, y - 0.28, 0]}>
            <cylinderGeometry args={[0.42, 0.42, 0.22, 40]} />
            <meshStandardMaterial color="#1c3f7a" emissive={CYAN} emissiveIntensity={0.35} metalness={0.7} roughness={0.25} />
          </mesh>
        ))}
        <Glow color={CYAN} scale={2.4} opacity={0.4} />
        <PulseRing color={CYAN} radius={1.1} period={2} position={[0, -0.42, 0]} />
      </group>
      <FlowLine from={STORE_AT} to={[0.8, 0.95, 0]} lift={0.8} speed={0.5} pulses={3} />
    </group>
  );
}

function PumpStage({ progress }: { progress: Progress }) {
  const mats = useMemo(() => createMats(), []);
  const holo = useHoloMats(CYAN, 0.95, 0.06);
  const real = useRef<THREE.Group>(null);
  const scan = useRef<THREE.Group>(null);
  const hot = useRef<THREE.Group>(null);
  const panels = useRef<THREE.Group>(null);
  const realPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), []);
  const holoPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, -1, 0), 0), []);

  useLayoutEffect(() => {
    real.current?.traverse((o) => {
      const m = (o as THREE.Mesh).material as THREE.Material | undefined;
      if (m) m.clippingPlanes = [realPlane];
    });
    holo.line.clippingPlanes = [holoPlane];
    holo.fill.clippingPlanes = [holoPlane];
  }, [holo, realPlane, holoPlane]);

  useFrame(({ clock }) => {
    const p = progress.current;
    // Scan sweeps up through the pump between stage 1.4 and 2.1
    const f = THREE.MathUtils.clamp((p - 1.4) / 0.7, 0, 1);
    const h = -0.05 + f * 1.75;
    realPlane.constant = -h;
    holoPlane.constant = h;
    if (scan.current) {
      scan.current.position.y = h;
      scan.current.visible = f > 0.001 && f < 0.999;
    }
    const twin = weight(p, 2) + (p > 2 ? weight(p, 3) : 0);
    if (hot.current) {
      hot.current.visible = f > 0.6;
      hot.current.scale.setScalar(0.8 + Math.sin(clock.elapsedTime * 3) * 0.12);
    }
    holo.fill.opacity = 0.04 + twin * 0.04;
    if (panels.current) {
      const w = THREE.MathUtils.clamp(p - 2.2, 0, 1);
      panels.current.scale.setScalar(Math.max(0.001, smooth(w)));
      panels.current.visible = w > 0.01;
    }
  });

  return (
    <group>
      <PumpUnit ref={real} mats={mats} />
      <Hologram mats={holo}>
        <PumpUnit mats={mats} showSensors={false} />
      </Hologram>
      {/* Scan plane */}
      <group ref={scan}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.2, 0, 0]}>
          <planeGeometry args={[3.8, 1.8]} />
          <meshBasicMaterial color={CYAN} transparent opacity={0.12} side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
        </mesh>
      </group>
      {/* Sensors pulsing on the real pump */}
      {(["bearing", "motor"] as const).map((k) => (
        <group key={k} position={PUMP_SENSORS[k]}>
          <Glow color={CYAN} scale={0.5} />
        </group>
      ))}
      <group ref={hot} position={[0.78, 0.66, 0]}>
        <Glow color={AMBER} scale={1.4} />
        <PulseRing color={AMBER} radius={0.6} period={1.4} rotation={[0, 0, Math.PI / 2]} />
      </group>
      <group ref={panels} position={[0, 0, 0]}>
        <HudPanel position={[-1.4, 2.9, -0.6]} width={1.7} height={1} seed={3} warn />
        <HudPanel position={[1.4, 3.2, 0.9]} width={1.5} height={0.9} seed={6} />
        <HudPanel position={[0.2, 3.9, -1.8]} width={1.3} height={0.8} seed={9} bars={5} />
        <FlowLine from={[0.78, 0.9, 0]} to={[-1.4, 2.4, -0.6]} lift={0.4} color={AMBER} speed={0.5} />
      </group>
    </group>
  );
}

function Content({ progress, small }: { progress: Progress; small: boolean }) {
  return (
    <>
      <fog attach="fog" args={["#05080f", 8, 22]} />
      <StudioLights shadows={!small} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#070b14" metalness={0.35} roughness={0.6} />
      </mesh>
      <Grid position={[0, 0.004, 0]} args={[30, 30]} cellSize={0.5} cellColor="#10264a" sectionSize={2.5} sectionColor="#1d4f9a" fadeDistance={20} infiniteGrid />
      <PumpStage progress={progress} />
      <DataStage progress={progress} />
      <Sparkles count={small ? 24 : 50} scale={[10, 5, 10]} position={[0, 2, 0]} size={2} speed={0.25} opacity={0.45} color="#9fe9ff" />
      <Rig progress={progress} />
    </>
  );
}

export default function JourneyScene({ active, still, progress }: SceneProps & { progress: Progress }) {
  const small = useIsSmall();
  return (
    <SceneCanvas active={active} still={still} camera={{ position: CAM[0].p, fov: 40 }}>
      <Content progress={progress} small={small} />
    </SceneCanvas>
  );
}
