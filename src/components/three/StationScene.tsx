"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { SceneCanvas, useIsSmall, type SceneProps } from "./SceneCanvas";
import { Station, StudioLights, CameraRig, PUMP_Z, HOT_PUMP, sensorWorld } from "./Station";
import { PumpUnit } from "./PumpUnit";
import { FlowLine, Glow, Hologram, HudPanel, useHoloMats } from "./fx";
import { AMBER, CYAN, createMats } from "./materials";

const GREEN = "#0b6e50";

type Props = SceneProps & {
  mode?: "hero" | "twin";
  light?: boolean;
  selected?: number;
  onSelect?: (i: number) => void;
};

function SpinningTwin({ position, light = false }: { position: THREE.Vector3Tuple; light?: boolean }) {
  const accent = light ? GREEN : CYAN;
  const holo = useHoloMats(accent, light ? 0.95 : 0.9, light ? 0.1 : 0.05, !light);
  const spin = useRef<THREE.Group>(null);
  const mats = useMemo(() => createMats(), []);
  useFrame(({ clock }, dt) => {
    if (spin.current) spin.current.rotation.y += dt * 0.18;
    holo.fill.opacity = (light ? 0.08 : 0.04) + Math.abs(Math.sin(clock.elapsedTime * 2.2)) * 0.03;
  });
  return (
    <group position={position}>
      <Float speed={1.4} rotationIntensity={0.08} floatIntensity={0.35}>
        <group ref={spin}>
          <Hologram mats={holo} position={[-0.3, -0.7, 0]}>
            <PumpUnit mats={mats} showSensors={false} />
          </Hologram>
          {/* Bearing hotspot mirrored on the twin */}
          <group position={[0.48, -0.04, 0]}>
            <Glow color={AMBER} scale={0.9} />
          </group>
        </group>
        {/* Projection disc */}
        <mesh position={[0, -0.95, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.5, 1.56, 96]} />
          <meshBasicMaterial color={accent} transparent opacity={0.6} toneMapped={false} />
        </mesh>
        <mesh position={[0, -0.95, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.5, 64]} />
          <meshBasicMaterial color={accent} transparent opacity={light ? 0.1 : 0.06} depthWrite={false} toneMapped={false} />
        </mesh>
      </Float>
      {/* Projection beam down to the floor */}
      <mesh position={[0, -2.6, 0]}>
        <cylinderGeometry args={[1.5, 0.2, 3.2, 48, 1, true]} />
        <meshBasicMaterial color={accent} transparent opacity={light ? 0.06 : 0.035} side={THREE.DoubleSide} depthWrite={false} blending={light ? THREE.NormalBlending : THREE.AdditiveBlending} toneMapped={false} />
      </mesh>
    </group>
  );
}

function HeroContent({ small, light = false }: { small: boolean; light?: boolean }) {
  const mats = useMemo(() => {
    const m = createMats();
    if (light) {
      // Bright plant room so the scene melts into the white hero background
      m.floor.color.set("#eef4f1");
      m.floor.metalness = 0.05;
      m.floor.roughness = 0.9;
      m.concrete.color.set("#dfe8e4");
      m.frame.color.set("#b9c6c2");
      m.hazard.color.set("#d9b23a");
    }
    return m;
  }, [light]);
  const twinAt: THREE.Vector3Tuple = [0.4, 4.6, -0.8];
  const accent = light ? GREEN : CYAN;
  const panel = light ? { bg: "#14304f", accent: "#5fd4a0" } : { bg: undefined, accent: CYAN };
  return (
    <>
      <fog attach="fog" args={light ? ["#f6fbf8", 14, 32] : ["#05080f", 13, 30]} />
      {light && <ambientLight intensity={0.55} />}
      <StudioLights shadows={!small} />
      <Station mats={mats} selected={HOT_PUMP} grid={light ? ["#d3e6dc", "#9cc9b2"] : undefined} />
      <SpinningTwin position={twinAt} light={light} />
      <FlowLine from={sensorWorld(HOT_PUMP, "bearing")} to={[twinAt[0] + 0.4, twinAt[1] - 0.6, twinAt[2]]} lift={1.4} color={light ? "#e08a00" : AMBER} speed={0.32} />
      <FlowLine from={sensorWorld(HOT_PUMP, "motor")} to={[twinAt[0] - 0.4, twinAt[1] - 0.6, twinAt[2]]} lift={1.8} speed={0.28} color={accent} />
      <FlowLine from={sensorWorld(1, "discharge")} to={[twinAt[0], twinAt[1] - 0.8, twinAt[2]]} lift={1} speed={0.4} pulses={1} color={accent} />
      <FlowLine from={sensorWorld(3, "bearing")} to={[twinAt[0] + 0.8, twinAt[1] - 0.7, twinAt[2]]} lift={1.6} speed={0.36} pulses={1} color={accent} />
      {!light && <HudPanel position={[-3.2, 4.6, -2.6]} width={1.8} height={1.05} seed={2} bg={panel.bg} accent={panel.accent} />}
      <HudPanel position={[3.4, 5, 2.2]} width={1.6} height={1} seed={5} warn bg={panel.bg} accent={panel.accent} />
      <HudPanel position={[2.8, 2.9, 4.2]} width={1.3} height={0.8} seed={8} bars={5} bg={panel.bg} accent={panel.accent} />
      {!light && <Sparkles count={small ? 40 : 90} scale={[16, 7, 14]} position={[0, 3.2, 0]} size={2.2} speed={0.25} opacity={0.5} color="#9fe9ff" />}
      <CameraRig position={small ? [-12, 6.8, 11] : [-10.4, 5.8, 9.6]} target={[0.2, 2.3, -0.4]} sway={0.7} parallax={0.9} />
    </>
  );
}

function TwinContent({ selected = HOT_PUMP, onSelect, small }: { selected?: number; onSelect?: (i: number) => void; small: boolean }) {
  const mats = useMemo(() => createMats(), []);
  const z = PUMP_Z[selected];
  const hot = selected === HOT_PUMP;
  return (
    <>
      <fog attach="fog" args={["#05080f", 11, 26]} />
      <StudioLights shadows={!small} />
      <Station mats={mats} selected={selected} onSelect={onSelect} />
      <HudPanel position={[-0.4, 3.7, z]} width={1.7} height={1} seed={selected + 1} warn={hot} />
      <FlowLine from={sensorWorld(selected, "bearing")} to={[-0.4, 3.2, z]} lift={0.6} color={hot ? AMBER : CYAN} speed={0.45} />
      <Sparkles count={small ? 30 : 60} scale={[14, 6, 12]} position={[0, 3, 0]} size={2} speed={0.2} opacity={0.45} color="#9fe9ff" />
      <CameraRig position={small ? [-10, 6.4, 9.4] : [-8.2, 4.8, 7.6]} target={[0.6, 1.2, 0]} sway={0.45} parallax={0.6} />
    </>
  );
}

export default function StationScene({ active, still, mode = "hero", light = false, selected, onSelect }: Props) {
  const small = useIsSmall();
  return (
    <SceneCanvas active={active} still={still} camera={{ position: [-10.4, 5.8, 9.6], fov: 38, near: 0.1, far: 80 }}>
      {mode === "hero" ? <HeroContent small={small} light={light} /> : <TwinContent selected={selected} onSelect={onSelect} small={small} />}
    </SceneCanvas>
  );
}
