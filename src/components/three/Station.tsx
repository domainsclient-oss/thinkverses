"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Environment, Grid, Lightformer } from "@react-three/drei";
import { PumpUnit, PUMP_SENSORS } from "./PumpUnit";
import { PulseRing, Glow } from "./fx";
import { AMBER, CYAN, type Mats } from "./materials";

export const PUMP_Z = [-3.3, -1.1, 1.1, 3.3];
export const HOT_PUMP = 2; // "Pump 3"
const PLINTH = 0.14;

export function sensorWorld(i: number, key: keyof typeof PUMP_SENSORS): THREE.Vector3Tuple {
  const p = PUMP_SENSORS[key];
  return [p.x, p.y + PLINTH, p.z + PUMP_Z[i]];
}

/* ---------- Lighting + reflections (no network: env is built from light formers) ---------- */

export function StudioLights({ shadows = true }: { shadows?: boolean }) {
  return (
    <>
      <ambientLight intensity={0.18} />
      <hemisphereLight args={["#9cc4ff", "#05080f", 0.45]} />
      <directionalLight
        position={[7, 11, 6]}
        intensity={1.9}
        color="#eaf3ff"
        castShadow={shadows}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-9}
        shadow-camera-right={9}
        shadow-camera-top={9}
        shadow-camera-bottom={-9}
        shadow-bias={-0.0004}
      />
      <spotLight position={[-7, 6, -7]} angle={0.6} penumbra={0.8} intensity={60} color={CYAN} distance={22} />
      <spotLight position={[8, 4, 8]} angle={0.5} penumbra={1} intensity={28} color="#5d8bff" distance={20} />
      <Environment resolution={256} frames={1}>
        <color attach="background" args={["#04070d"]} />
        <Lightformer form="rect" intensity={3} position={[0, 8, 0]} rotation-x={Math.PI / 2} scale={[14, 3, 1]} color="#ffffff" />
        <Lightformer form="rect" intensity={2} position={[-8, 3, 2]} rotation-y={Math.PI / 2} scale={[10, 1.2, 1]} color={CYAN} />
        <Lightformer form="rect" intensity={1.6} position={[8, 3, -2]} rotation-y={-Math.PI / 2} scale={[10, 1.2, 1]} color="#6f8dff" />
        <Lightformer form="ring" intensity={1.2} position={[0, 2, 9]} scale={4} color="#cfe6ff" />
      </Environment>
    </>
  );
}

/* ---------- Camera: slow cinematic drift plus pointer parallax ---------- */

export function CameraRig({
  position,
  target,
  sway = 0.6,
  parallax = 0.8,
}: {
  position: THREE.Vector3Tuple;
  target: THREE.Vector3Tuple;
  sway?: number;
  parallax?: number;
}) {
  const { camera } = useThree();
  const base = useMemo(() => new THREE.Vector3(...position), [position]);
  const look = useMemo(() => new THREE.Vector3(...target), [target]);
  const tmp = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ clock, pointer }, dt) => {
    const t = clock.elapsedTime;
    tmp.set(
      base.x + Math.sin(t * 0.11) * sway + pointer.x * parallax,
      base.y + Math.sin(t * 0.17) * sway * 0.25 + pointer.y * parallax * 0.4,
      base.z + Math.cos(t * 0.09) * sway * 0.6,
    );
    camera.position.lerp(tmp, 1 - Math.exp(-dt * 2));
    camera.lookAt(look);
  });
  return null;
}

/* ---------- Static plant structure ---------- */

function Pipe({ from, to, r, mat }: { from: THREE.Vector3Tuple; to: THREE.Vector3Tuple; r: number; mat: THREE.Material }) {
  const { pos, quat, len } = useMemo(() => {
    const a = new THREE.Vector3(...from);
    const b = new THREE.Vector3(...to);
    const dir = b.clone().sub(a);
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
    return { pos: a.clone().add(b).multiplyScalar(0.5), quat: q, len: dir.length() };
  }, [from, to]);
  return (
    <mesh position={pos} quaternion={quat} material={mat} castShadow receiveShadow>
      <cylinderGeometry args={[r, r, len, 28]} />
    </mesh>
  );
}

function PumpPiping({ z, mats }: { z: number; mats: Mats }) {
  const y = PLINTH;
  return (
    <group>
      {/* Discharge riser with gate valve */}
      <Pipe from={[1.12, 1.52 + y, z]} to={[1.12, 2.58 + y, z]} r={0.12} mat={mats.pipe} />
      <mesh position={[1.12, 1.98 + y, z]} material={mats.pipePaint} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.3, 28]} />
      </mesh>
      <Pipe from={[1.12, 1.98 + y, z]} to={[0.72, 1.98 + y, z]} r={0.035} mat={mats.steel} />
      <mesh position={[0.7, 1.98 + y, z]} rotation={[0, Math.PI / 2, 0]} material={mats.ledRed}>
        <torusGeometry args={[0.2, 0.022, 10, 36]} />
      </mesh>
      <mesh position={[1.12, 2.58 + y, z]} material={mats.pipe} castShadow>
        <sphereGeometry args={[0.15, 20, 20]} />
      </mesh>
      <Pipe from={[1.12, 2.58 + y, z]} to={[2.75, 2.58 + y, z]} r={0.12} mat={mats.pipe} />
      {/* Suction spool */}
      <Pipe from={[1.7, 0.7 + y, z]} to={[2.55, 0.7 + y, z]} r={0.17} mat={mats.pipe} />
      <mesh position={[2.15, 0.7 + y, z]} rotation={[0, 0, Math.PI / 2]} material={mats.steel}>
        <cylinderGeometry args={[0.25, 0.25, 0.06, 32]} />
      </mesh>
      {/* Plinth */}
      <mesh position={[0.15, PLINTH / 2, z]} material={mats.concrete} receiveShadow castShadow>
        <boxGeometry args={[3.5, PLINTH, 1.45]} />
      </mesh>
    </group>
  );
}

function Headers({ mats }: { mats: Mats }) {
  const flanges = [-4.4, -2.2, 0, 2.2, 4.4];
  return (
    <group>
      <Pipe from={[2.85, 2.72, -5.2]} to={[2.85, 2.72, 5.2]} r={0.3} mat={mats.pipePaint} />
      <Pipe from={[2.85, 0.84, -5.2]} to={[2.85, 0.84, 5.2]} r={0.32} mat={mats.pipePaint} />
      {flanges.map((z) => (
        <group key={z}>
          <mesh position={[2.85, 2.72, z]} rotation={[Math.PI / 2, 0, 0]} material={mats.steel}>
            <cylinderGeometry args={[0.37, 0.37, 0.07, 36]} />
          </mesh>
          <mesh position={[2.85, 0.84, z]} rotation={[Math.PI / 2, 0, 0]} material={mats.steel}>
            <cylinderGeometry args={[0.39, 0.39, 0.07, 36]} />
          </mesh>
          <mesh position={[2.85, 1.3, z]} material={mats.frame} castShadow>
            <boxGeometry args={[0.14, 2.6, 0.14]} />
          </mesh>
        </group>
      ))}
      {/* Header exits through the wall */}
      <Pipe from={[2.85, 2.72, -5.2]} to={[2.85, 2.72, -7]} r={0.3} mat={mats.pipePaint} />
    </group>
  );
}

function Tanks({ mats }: { mats: Mats }) {
  const tanks: { p: THREE.Vector3Tuple; r: number; h: number }[] = [
    { p: [-4.6, 0, -5.6], r: 1.35, h: 4.6 },
    { p: [-1.6, 0, -6.4], r: 1, h: 3.8 },
  ];
  return (
    <group>
      {tanks.map((t, i) => (
        <group key={i} position={t.p}>
          <mesh position={[0, t.h / 2, 0]} material={mats.tank} castShadow receiveShadow>
            <cylinderGeometry args={[t.r, t.r, t.h, 48]} />
          </mesh>
          <mesh position={[0, t.h + 0.18, 0]} material={mats.tank} castShadow>
            <sphereGeometry args={[t.r, 48, 16, 0, Math.PI * 2, 0, Math.PI / 6]} />
          </mesh>
          {[0.25, 0.5, 0.75].map((f) => (
            <mesh key={f} position={[0, t.h * f, 0]} rotation={[Math.PI / 2, 0, 0]} material={mats.frame}>
              <torusGeometry args={[t.r + 0.02, 0.035, 8, 64]} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

function Frame({ mats }: { mats: Mats }) {
  const cols = [-7.5, -4.5, -1.5, 1.5, 4.5, 7.5];
  return (
    <group position={[0, 0, -7.4]}>
      {cols.map((x) => (
        <mesh key={x} position={[x, 3.4, 0]} material={mats.frame} castShadow>
          <boxGeometry args={[0.28, 6.8, 0.28]} />
        </mesh>
      ))}
      <mesh position={[0, 6.7, 0]} material={mats.frame}>
        <boxGeometry args={[15.6, 0.3, 0.3]} />
      </mesh>
      <mesh position={[0, 4.8, 0.3]} material={mats.frame}>
        <boxGeometry args={[15.6, 0.08, 0.5]} />
      </mesh>
      {/* Back wall panels with lit strips */}
      <mesh position={[0, 3.4, -0.3]} material={mats.concrete} receiveShadow>
        <boxGeometry args={[16, 6.8, 0.1]} />
      </mesh>
      {[-6, -3, 0, 3, 6].map((x) => (
        <mesh key={x} position={[x, 5.6, -0.2]} material={mats.lamp}>
          <boxGeometry args={[1.6, 0.05, 0.05]} />
        </mesh>
      ))}
    </group>
  );
}

function FloorMarkings({ mats }: { mats: Mats }) {
  return (
    <group position={[0, 0.006, 0]}>
      {[-4.6, 4.6].map((z) => (
        <mesh key={z} position={[0.4, 0, z]} rotation={[-Math.PI / 2, 0, 0]} material={mats.hazard}>
          <planeGeometry args={[9, 0.08]} />
        </mesh>
      ))}
      <mesh position={[-2.1, 0, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} material={mats.hazard}>
        <planeGeometry args={[9.2, 0.08]} />
      </mesh>
    </group>
  );
}

/* ---------- Pumps with live condition ---------- */

function LivePump({
  index,
  mats,
  selected,
  onSelect,
}: {
  index: number;
  mats: Mats;
  selected: boolean;
  onSelect?: (i: number) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const hot = index === HOT_PUMP;

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (group.current && hot) {
      // Fine vibration on the hot pump
      group.current.position.y = PLINTH + Math.sin(t * 61) * 0.004;
      group.current.position.x = Math.sin(t * 47) * 0.003;
    }
  });

  const z = PUMP_Z[index];
  return (
    <group position={[0, 0, z]}>
      <group
        ref={group}
        position={[0, PLINTH, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onSelect?.(index);
        }}
        onPointerOver={(e) => {
          if (!onSelect) return;
          e.stopPropagation();
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "";
        }}
      >
        <HeatPump mats={mats} hot={hot} />
      </group>

      {hot && (
        <group position={[0.78, 0.66 + PLINTH, 0]}>
          <Glow color={AMBER} scale={1.3} opacity={0.75} />
          <PulseRing color={AMBER} radius={0.55} period={1.6} rotation={[0, 0, Math.PI / 2]} />
          <PulseRing color={AMBER} radius={0.55} period={1.6} delay={0.8} rotation={[0, 0, Math.PI / 2]} />
        </group>
      )}

      {selected && (
        <group position={[0.15, PLINTH + 0.01, 0]}>
          <PulseRing color={hot ? AMBER : CYAN} radius={2.2} period={2.6} />
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.95, 2.0, 96]} />
            <meshBasicMaterial color={hot ? AMBER : CYAN} transparent opacity={0.9} toneMapped={false} />
          </mesh>
        </group>
      )}
      <PumpPiping z={0} mats={mats} />
    </group>
  );
}

// Pump whose bearing heat follows a slow sine; kept separate so only this subtree re-renders its material.
function HeatPump({ mats, hot }: { mats: Mats; hot: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!hot || !ref.current) return;
    const h = 0.55 + Math.sin(clock.elapsedTime * 1.6) * 0.3;
    ref.current.traverse((o) => {
      const m = (o as THREE.Mesh).material as THREE.MeshStandardMaterial | undefined;
      if (m && m.emissive && m.userData.bearing) m.emissiveIntensity = h * 1.8;
    });
  });
  return (
    <group ref={ref}>
      <PumpUnit mats={mats} heat={hot ? 0.8 : 0} />
    </group>
  );
}

export function Station({
  mats,
  selected,
  onSelect,
  grid = ["#10264a", "#1d4f9a"],
}: {
  mats: Mats;
  selected?: number;
  onSelect?: (i: number) => void;
  grid?: [string, string];
}) {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} material={mats.floor} receiveShadow>
        <planeGeometry args={[60, 60]} />
      </mesh>
      <Grid
        position={[0, 0.004, 0]}
        args={[40, 40]}
        cellSize={0.5}
        cellThickness={0.6}
        cellColor={grid[0]}
        sectionSize={2.5}
        sectionThickness={1}
        sectionColor={grid[1]}
        fadeDistance={26}
        fadeStrength={1.4}
        infiniteGrid
      />
      <FloorMarkings mats={mats} />
      {PUMP_Z.map((_, i) => (
        <LivePump key={i} index={i} mats={mats} selected={selected === i} onSelect={onSelect} />
      ))}
      <Headers mats={mats} />
      <Tanks mats={mats} />
      <Frame mats={mats} />
    </group>
  );
}
