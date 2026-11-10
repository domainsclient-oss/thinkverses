"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Edges, Grid, RoundedBox, Sparkles } from "@react-three/drei";
import { DomLabel } from "./DomLabel";
import { SceneCanvas, useIsSmall, type SceneProps } from "./SceneCanvas";
import { CameraRig, StudioLights } from "./Station";
import { Glow } from "./fx";
import { CYAN, createMats } from "./materials";

const LEN = 11;
const N = 8;
const SPEED = 0.75;
const BELT_Y = 0.86;

type Palette = { accent: string; alert: string; fog: string; cell: string; section: string; spark: string; unit: string };

const PALETTES: Record<"default" | "section", Palette> = {
  default: { accent: CYAN, alert: "#ff4d5e", fog: "#05080f", cell: "#10264a", section: "#1d4f9a", spark: "#9fe9ff", unit: "#c9d3df" },
  // Physical AI stage: navy ground, green optics, amber defect call-outs
  section: { accent: "#5fd4a0", alert: "#f5a524", fog: "#0f1a2b", cell: "#16304a", section: "#1f5a4a", spark: "#bff5dc", unit: "#b8c4d2" },
};

function Conveyor({ mats, pal }: { mats: ReturnType<typeof createMats>; pal: Palette }) {
  const rollers = useRef<THREE.Group>(null);
  useFrame((_, dt) => rollers.current?.children.forEach((r) => (r.rotation.z -= dt * SPEED * 6)));
  return (
    <group>
      <mesh position={[0, BELT_Y - 0.05, 0]} material={mats.rubber} receiveShadow>
        <boxGeometry args={[LEN, 0.1, 1.1]} />
      </mesh>
      {/* End rollers */}
      <group ref={rollers}>
        {[-LEN / 2, LEN / 2].map((x) => (
          <mesh key={x} position={[x, BELT_Y - 0.05, 0]} rotation={[Math.PI / 2, 0, 0]} material={mats.steel}>
            <cylinderGeometry args={[0.07, 0.07, 1.12, 20]} />
          </mesh>
        ))}
      </group>
      {[-0.62, 0.62].map((z) => (
        <mesh key={z} position={[0, BELT_Y - 0.02, z]} material={mats.steel} castShadow>
          <boxGeometry args={[LEN, 0.16, 0.08]} />
        </mesh>
      ))}
      {/* Side light strips */}
      {[-0.67, 0.67].map((z) => (
        <mesh key={z} position={[0, BELT_Y - 0.02, z]}>
          <boxGeometry args={[LEN, 0.02, 0.01]} />
          <meshBasicMaterial color={pal.accent} transparent opacity={0.55} toneMapped={false} />
        </mesh>
      ))}
      {Array.from({ length: 6 }, (_, i) => -LEN / 2 + 0.6 + i * ((LEN - 1.2) / 5)).map((x) => (
        <group key={x} position={[x, 0, 0]}>
          {[-0.6, 0.6].map((z) => (
            <mesh key={z} position={[0, (BELT_Y - 0.1) / 2, z]} material={mats.frame} castShadow>
              <boxGeometry args={[0.08, BELT_Y - 0.1, 0.08]} />
            </mesh>
          ))}
        </group>
      ))}
      {/* Gantry with vision camera */}
      {[-0.95, 0.95].map((z) => (
        <mesh key={z} position={[0, 1.45, z]} material={mats.frame} castShadow>
          <boxGeometry args={[0.12, 2.9, 0.12]} />
        </mesh>
      ))}
      <mesh position={[0, 2.88, 0]} material={mats.frame} castShadow>
        <boxGeometry args={[0.16, 0.14, 2.05]} />
      </mesh>
      <group position={[0, 2.62, 0]}>
        <RoundedBox args={[0.34, 0.34, 0.42]} radius={0.04} material={mats.skid} castShadow />
        <mesh position={[0, -0.24, 0]} material={mats.rubber}>
          <cylinderGeometry args={[0.1, 0.12, 0.16, 24]} />
        </mesh>
        <mesh position={[0, -0.33, 0]}>
          <circleGeometry args={[0.085, 24]} />
          <meshBasicMaterial color={pal.accent} toneMapped={false} side={THREE.DoubleSide} />
        </mesh>
        {/* Ring light */}
        <mesh position={[0, -0.34, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.2, 0.018, 8, 48]} />
          <meshBasicMaterial color="#effff7" toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

function ScanCone({ pal }: { pal: Palette }) {
  const sweep = useRef<THREE.Mesh>(null);
  const cone = useRef<THREE.MeshBasicMaterial>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (sweep.current) sweep.current.position.z = Math.sin(t * 2.4) * 0.5;
    if (cone.current) cone.current.opacity = 0.06 + Math.abs(Math.sin(t * 1.6)) * 0.05;
  });
  return (
    <group>
      <mesh position={[0, (2.28 + BELT_Y) / 2, 0]}>
        <coneGeometry args={[0.78, 2.28 - BELT_Y, 48, 1, true]} />
        <meshBasicMaterial ref={cone} color={pal.accent} transparent opacity={0.07} side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
      </mesh>
      <mesh ref={sweep} position={[0, BELT_Y + 0.004, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.5, 0.04]} />
        <meshBasicMaterial color={pal.accent} transparent opacity={0.9} toneMapped={false} />
      </mesh>
      <mesh position={[0, BELT_Y + 0.003, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.78, 48]} />
        <meshBasicMaterial color={pal.accent} transparent opacity={0.08} depthWrite={false} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Units({
  mats,
  pal,
  beacon,
  tag,
  tagOn,
}: {
  mats: ReturnType<typeof createMats>;
  pal: Palette;
  beacon: React.RefObject<THREE.Group | null>;
  tag: React.RefObject<THREE.Group | null>;
  tagOn: React.RefObject<boolean>;
}) {
  const refs = useRef<(THREE.Group | null)[]>([]);
  const boxes = useRef<(THREE.Group | null)[]>([]);
  const state = useMemo(() => Array.from({ length: N }, (_, i) => ({ defect: i % 3 === 1, flagged: false })), []);
  const unitMat = useMemo(() => {
    const m = mats.steel.clone();
    m.color.set(pal.unit);
    m.roughness = 0.32;
    if (pal.accent !== CYAN) {
      // Brushed aluminium that reads clearly against the navy room
      m.metalness = 0.55;
      m.roughness = 0.38;
    }
    return m;
  }, [mats, pal]);
  const flaggedMat = useMemo(() => {
    const m = unitMat.clone();
    m.emissive.set(pal.alert);
    m.emissiveIntensity = 0.35;
    return m;
  }, [unitMat, pal]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    let alarm = false;
    let tagX: number | null = null;
    refs.current.forEach((g, i) => {
      if (!g) return;
      const raw = ((t * SPEED + (i * LEN) / N) % LEN) - LEN / 2;
      // Wrap: reset flag when the unit re-enters
      if (raw < -LEN / 2 + 0.2) {
        state[i].flagged = false;
        state[i].defect = Math.random() < 0.3;
      }
      g.position.x = raw;
      if (Math.abs(raw) < 0.25 && state[i].defect) state[i].flagged = true;
      if (Math.abs(raw) < 1.2 && state[i].flagged) alarm = true;
      // The label follows the nearest flagged unit downstream of the camera
      if (state[i].flagged && raw > -0.3 && raw < 3.2 && (tagX === null || raw < tagX)) tagX = raw;
      const mesh = g.children[0] as THREE.Mesh;
      mesh.material = state[i].flagged ? flaggedMat : unitMat;
      g.children[1].visible = state[i].defect;
      const box = boxes.current[i];
      if (box) {
        box.visible = state[i].flagged;
        box.scale.setScalar(1 + Math.sin(t * 8) * 0.02);
      }
    });
    if (beacon.current) beacon.current.visible = alarm && Math.sin(t * 14) > 0;
    if (tag.current && tagX !== null) tag.current.position.x = tagX;
    tagOn.current = tagX !== null;
  });

  return (
    <>
      {state.map((_, i) => (
        <group key={i} ref={(el) => void (refs.current[i] = el)} position={[0, BELT_Y + 0.17, 0]}>
          <mesh material={unitMat} castShadow>
            <boxGeometry args={[0.5, 0.34, 0.5]} />
          </mesh>
          {/* Visible surface defect */}
          <mesh position={[0.06, 0.172, -0.05]} rotation={[-Math.PI / 2, 0, 0.6]}>
            <planeGeometry args={[0.28, 0.035]} />
            <meshBasicMaterial color="#1b1f26" />
          </mesh>
          {/* Bounding box drawn around the defect */}
          <group ref={(el) => void (boxes.current[i] = el)} visible={false}>
            <mesh>
              <boxGeometry args={[0.66, 0.5, 0.66]} />
              <meshBasicMaterial transparent opacity={0} depthWrite={false} />
              <Edges color={pal.alert} threshold={10} />
            </mesh>
            <Glow color={pal.alert} scale={1.1} opacity={0.35} />
          </group>
        </group>
      ))}
    </>
  );
}

function Content({ small, pal, tag: label }: { small: boolean; pal: Palette; tag?: { text: string; className: string } }) {
  const mats = useMemo(() => {
    const m = createMats();
    m.floor.color.set(pal.fog);
    return m;
  }, [pal]);
  const beacon = useRef<THREE.Group>(null);
  const tag = useRef<THREE.Group>(null);
  const tagOn = useRef(false);
  return (
    <>
      <fog attach="fog" args={[pal.fog, 7, 18]} />
      <StudioLights shadows={!small} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} material={mats.floor} receiveShadow>
        <planeGeometry args={[40, 40]} />
      </mesh>
      <Grid position={[0, 0.004, 0]} args={[30, 30]} cellSize={0.5} cellColor={pal.cell} sectionSize={2.5} sectionColor={pal.section} fadeDistance={18} infiniteGrid />
      <Conveyor mats={mats} pal={pal} />
      <ScanCone pal={pal} />
      <Units mats={mats} pal={pal} beacon={beacon} tag={tag} tagOn={tagOn} />
      <group ref={tag} position={[0, BELT_Y + 0.62, 0]} />
      {label && <DomLabel text={label.text} className={label.className} follow={tag} shown={tagOn} />}
      <group ref={beacon} position={[0, 3.05, 0]}>
        <Glow color={pal.alert} scale={1.4} />
        <pointLight color={pal.alert} intensity={6} distance={4} />
      </group>
      <pointLight position={[0, 2.3, 0]} color={pal.accent} intensity={4} distance={3.5} />
      <Sparkles count={small ? 20 : 40} scale={[8, 4, 5]} position={[0, 2, 0]} size={1.8} speed={0.2} opacity={0.4} color={pal.spark} />
      <CameraRig position={small ? [4.6, 3.6, 5.4] : [3.9, 3, 4.4]} target={[0, 1.15, 0]} sway={0.3} parallax={0.5} />
    </>
  );
}

export default function InspectionScene({
  active,
  still,
  eager,
  tone = "default",
  tag,
}: SceneProps & { tone?: "default" | "section"; tag?: { text: string; className: string } }) {
  const small = useIsSmall();
  return (
    <SceneCanvas active={active} still={still} eager={eager} camera={{ position: [3.9, 3, 4.4], fov: 42 }}>
      <Content small={small} pal={PALETTES[tone]} tag={tag} />
    </SceneCanvas>
  );
}
