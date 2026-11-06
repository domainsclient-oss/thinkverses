"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Edges, Line, RoundedBox, Sparkles } from "@react-three/drei";
import { SceneCanvas, useIsSmall, type SceneProps } from "./SceneCanvas";
import { CameraRig, StudioLights } from "./Station";
import { FlowLine, Glow } from "./fx";
import { BLUE, CYAN } from "./materials";

const GAP = 0.62;
const SOURCES = 8;

function Decor({ index }: { index: number }) {
  const y = 0.08;
  if (index === 0) {
    // Foundation: tiled base
    return (
      <group position={[0, y, 0]}>
        {Array.from({ length: 24 }, (_, i) => (
          <mesh key={i} position={[-1.25 + (i % 6) * 0.5, 0, -0.75 + Math.floor(i / 6) * 0.5]}>
            <boxGeometry args={[0.42, 0.03, 0.42]} />
            <meshStandardMaterial color="#1a3766" metalness={0.6} roughness={0.4} />
          </mesh>
        ))}
      </group>
    );
  }
  if (index === 1) {
    // Ingest and store: data stores
    return (
      <group position={[0, y, 0]}>
        {[-1, -0.33, 0.33, 1].map((x, i) => (
          <group key={x} position={[x, 0, (i % 2) * 0.4 - 0.2]}>
            {[0, 0.12, 0.24].map((h) => (
              <mesh key={h} position={[0, h + 0.05, 0]}>
                <cylinderGeometry args={[0.22, 0.22, 0.09, 32]} />
                <meshStandardMaterial color="#2a4f8c" metalness={0.7} roughness={0.3} emissive={BLUE} emissiveIntensity={0.25} />
              </mesh>
            ))}
          </group>
        ))}
      </group>
    );
  }
  if (index === 2) {
    // Model and analyze: network + forecast line
    const pts: THREE.Vector3Tuple[] = Array.from({ length: 20 }, (_, i) => [-1.4 + i * 0.15, 0.12 + Math.sin(i * 0.7) * 0.06 + (i > 13 ? (i - 13) * 0.04 : 0), 0.4]);
    return (
      <group position={[0, y, 0]}>
        <Line points={pts} color={CYAN} lineWidth={2.2} />
        {[
          [-0.9, -0.4],
          [0, -0.6],
          [0.9, -0.3],
          [0.4, 0.05],
          [-0.5, 0],
        ].map(([x, z], i) => (
          <mesh key={i} position={[x, 0.08, z]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshBasicMaterial color={CYAN} toneMapped={false} />
          </mesh>
        ))}
      </group>
    );
  }
  if (index === 3) {
    // Serve and decide: answer panels with one alert
    return (
      <group position={[0, y, -0.2]}>
        {[-0.9, 0, 0.9].map((x, i) => (
          <group key={x} position={[x, 0.3, 0]}>
            <mesh>
              <boxGeometry args={[0.7, 0.5, 0.03]} />
              <meshStandardMaterial color="#0d2244" emissive={i === 1 ? "#ffb547" : BLUE} emissiveIntensity={i === 1 ? 0.35 : 0.2} />
            </mesh>
          </group>
        ))}
      </group>
    );
  }
  // Business value: rising columns
  return (
    <group position={[0, y, 0]}>
      {[0.2, 0.32, 0.46, 0.62, 0.82].map((h, i) => (
        <mesh key={i} position={[-1 + i * 0.5, h / 2, 0]}>
          <boxGeometry args={[0.28, h, 0.28]} />
          <meshStandardMaterial color="#1f6bff" emissive={CYAN} emissiveIntensity={0.25 + i * 0.08} metalness={0.4} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function Slab({ index, selected, onSelect }: { index: number; selected: number; onSelect?: (i: number) => void }) {
  const ref = useRef<THREE.Group>(null);
  const mat = useRef<THREE.MeshPhysicalMaterial>(null);
  const on = index === selected;
  useFrame((_, dt) => {
    if (!ref.current) return;
    const lift = index > selected ? 0.55 : index === selected ? 0.25 : 0;
    const targetY = index * GAP + lift;
    ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, targetY, 5, dt);
    const s = on ? 1.04 : 1;
    ref.current.scale.x = THREE.MathUtils.damp(ref.current.scale.x, s, 5, dt);
    ref.current.scale.z = ref.current.scale.x;
    if (mat.current) mat.current.emissiveIntensity = THREE.MathUtils.damp(mat.current.emissiveIntensity, on ? 0.55 : 0.08, 5, dt);
  });
  return (
    <group
      ref={ref}
      position={[0, index * GAP, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onSelect?.(index);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => (document.body.style.cursor = "")}
    >
      <RoundedBox args={[3.4, 0.14, 2.3]} radius={0.05} smoothness={3} castShadow receiveShadow>
        <meshPhysicalMaterial ref={mat} color="#0b1d3c" metalness={0.35} roughness={0.22} clearcoat={1} transparent opacity={0.86} emissive={on ? CYAN : BLUE} emissiveIntensity={0.08} />
        <Edges color={on ? CYAN : "#3d6fc4"} threshold={15} />
      </RoundedBox>
      <Decor index={index} />
      {on && (
        <>
          <Glow color={CYAN} scale={4.2} opacity={0.22} position={[0, 0.1, 0]} />
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.09, 0]}>
            <planeGeometry args={[3.9, 2.8]} />
            <meshBasicMaterial color={CYAN} transparent opacity={0.06} depthWrite={false} toneMapped={false} />
          </mesh>
        </>
      )}
    </group>
  );
}

function Spine() {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.children.forEach((c, i) => (c.position.y = ((clock.elapsedTime * 0.6 + i * 0.25) % 1) * 3.4 - 0.2));
  });
  return (
    <group>
      {[
        [-1.55, -1.0],
        [1.55, -1.0],
        [-1.55, 1.0],
        [1.55, 1.0],
      ].map(([x, z]) => (
        <mesh key={`${x}${z}`} position={[x, 1.4, z]}>
          <cylinderGeometry args={[0.012, 0.012, 3.4, 6]} />
          <meshBasicMaterial color={CYAN} transparent opacity={0.45} toneMapped={false} />
        </mesh>
      ))}
      <group ref={ref}>
        {[
          [-1.55, -1.0],
          [1.55, -1.0],
          [-1.55, 1.0],
          [1.55, 1.0],
        ].map(([x, z]) => (
          <group key={`${x}${z}`} position={[x, 0, z]}>
            <Glow color={CYAN} scale={0.28} />
          </group>
        ))}
      </group>
    </group>
  );
}

function Sources() {
  const ring = useRef<THREE.Group>(null);
  const nodes = useMemo(
    () =>
      Array.from({ length: SOURCES }, (_, i) => {
        const a = (i / SOURCES) * Math.PI * 2;
        return [Math.cos(a) * 3.3, -0.25, Math.sin(a) * 3.3] as THREE.Vector3Tuple;
      }),
    [],
  );
  useFrame((_, dt) => {
    if (ring.current) ring.current.rotation.y += dt * 0.05;
  });
  return (
    <group ref={ring}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.26, 0]}>
        <ringGeometry args={[3.28, 3.31, 128]} />
        <meshBasicMaterial color={BLUE} transparent opacity={0.6} toneMapped={false} />
      </mesh>
      {nodes.map((p, i) => (
        <group key={i}>
          <mesh position={p}>
            <octahedronGeometry args={[0.13, 0]} />
            <meshStandardMaterial color="#cfe8ff" emissive={i % 2 ? CYAN : BLUE} emissiveIntensity={1.2} metalness={0.3} roughness={0.2} />
          </mesh>
          <group position={p}>
            <Glow color={i % 2 ? CYAN : BLUE} scale={0.7} opacity={0.6} />
          </group>
          <FlowLine from={p} to={[p[0] * 0.3, GAP, p[2] * 0.3]} lift={0.4} speed={0.3 + (i % 3) * 0.08} pulses={1} width={1.2} color={i % 2 ? CYAN : "#7fa4ff"} opacity={0.6} />
        </group>
      ))}
    </group>
  );
}

function Content({ selected, onSelect, small }: { selected: number; onSelect?: (i: number) => void; small: boolean }) {
  return (
    <>
      <fog attach="fog" args={["#05080f", 9, 20]} />
      <StudioLights shadows={false} />
      <group position={[0, -0.6, 0]}>
        {Array.from({ length: 5 }, (_, i) => (
          <Slab key={i} index={i} selected={selected} onSelect={onSelect} />
        ))}
        <Spine />
        <Sources />
      </group>
      <Sparkles count={small ? 30 : 60} scale={[8, 5, 8]} position={[0, 1.5, 0]} size={2} speed={0.3} opacity={0.5} color="#9fe9ff" />
      <CameraRig position={small ? [8.6, 6, 8.6] : [7.6, 5.2, 7.8]} target={[0, 0.9, 0]} sway={0.35} parallax={0.6} />
    </>
  );
}

export default function LayerStackScene({ active, still, selected = 0, onSelect }: SceneProps & { selected?: number; onSelect?: (i: number) => void }) {
  const small = useIsSmall();
  return (
    <SceneCanvas active={active} still={still} shadows={false} camera={{ position: [6.2, 4.4, 6.4], fov: 40 }}>
      <Content selected={selected} onSelect={onSelect} small={small} />
    </SceneCanvas>
  );
}
