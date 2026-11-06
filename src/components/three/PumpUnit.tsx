"use client";

import { forwardRef, useMemo } from "react";
import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import type { ThreeElements } from "@react-three/fiber";
import type { Mats } from "./materials";

// Procedural end-suction centrifugal pump on a steel skid, driven by a finned TEFC motor.
// Units are roughly metres; the skid is centred on the origin with the shaft along +X.

let finGeom: THREE.BufferGeometry | null = null;
let boltGeom: THREE.BufferGeometry | null = null;

function motorFins() {
  if (finGeom) return finGeom;
  const parts: THREE.BufferGeometry[] = [];
  const n = 28;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const g = new THREE.BoxGeometry(1.08, 0.075, 0.018);
    g.translate(0, 0.405, 0);
    g.rotateX(a);
    parts.push(g);
  }
  finGeom = mergeGeometries(parts)!;
  return finGeom;
}

// Ring of flange bolts in the XZ plane (axis = Y).
function flangeBolts() {
  if (boltGeom) return boltGeom;
  const parts: THREE.BufferGeometry[] = [];
  const n = 8;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const g = new THREE.CylinderGeometry(0.022, 0.022, 0.09, 6);
    g.translate(Math.cos(a) * 0.19, 0, Math.sin(a) * 0.19);
    parts.push(g);
  }
  boltGeom = mergeGeometries(parts)!;
  return boltGeom;
}

export const PUMP_SENSORS = {
  bearing: new THREE.Vector3(0.78, 0.86, 0),
  motor: new THREE.Vector3(-1.02, 1.04, 0.2),
  discharge: new THREE.Vector3(1.1, 1.5, 0),
};

type Props = Omit<ThreeElements["group"], "ref"> & {
  mats: Mats;
  /** 0..1, drives the bearing housing glow */
  heat?: number;
  showSensors?: boolean;
};

export const PumpUnit = forwardRef<THREE.Group, Props>(function PumpUnit(
  { mats, heat = 0, showSensors = true, ...props },
  ref,
) {
  const fins = useMemo(() => motorFins(), []);
  const bolts = useMemo(() => flangeBolts(), []);
  const bearingMat = useMemo(() => {
    const m = mats.steel.clone();
    m.color.set("#8d99a8");
    m.userData.bearing = true;
    return m;
  }, [mats]);
  // Heat tints the bearing housing towards amber
  bearingMat.emissive.set("#ff7a1a");
  bearingMat.emissiveIntensity = heat * 1.6;

  const rotZ: [number, number, number] = [0, 0, Math.PI / 2];

  return (
    <group ref={ref} {...props}>
      {/* Skid */}
      <mesh material={mats.skid} position={[0.05, 0.09, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.1, 0.18, 1.05]} />
      </mesh>
      <mesh material={mats.skid} position={[0.05, 0.2, 0.47]} castShadow>
        <boxGeometry args={[3.1, 0.06, 0.1]} />
      </mesh>
      <mesh material={mats.skid} position={[0.05, 0.2, -0.47]} castShadow>
        <boxGeometry args={[3.1, 0.06, 0.1]} />
      </mesh>

      {/* Motor feet + frame */}
      <mesh material={mats.motor} position={[-0.55, 0.3, 0]} castShadow>
        <boxGeometry args={[0.95, 0.2, 0.72]} />
      </mesh>
      <mesh material={mats.motor} position={[-0.55, 0.66, 0]} rotation={rotZ} castShadow>
        <cylinderGeometry args={[0.38, 0.38, 1.12, 40]} />
      </mesh>
      <mesh geometry={fins} material={mats.motor} position={[-0.55, 0.66, 0]} castShadow />
      {/* Drive end shield */}
      <mesh material={mats.motor} position={[0.06, 0.66, 0]} rotation={rotZ} castShadow>
        <cylinderGeometry args={[0.3, 0.42, 0.12, 40]} />
      </mesh>
      {/* Fan cowl */}
      <mesh material={mats.pumpBody} position={[-1.22, 0.66, 0]} rotation={rotZ} castShadow>
        <cylinderGeometry args={[0.41, 0.41, 0.26, 40]} />
      </mesh>
      <mesh material={mats.rubber} position={[-1.36, 0.66, 0]} rotation={rotZ}>
        <cylinderGeometry args={[0.36, 0.36, 0.02, 40]} />
      </mesh>
      {/* Terminal box */}
      <mesh material={mats.motor} position={[-0.42, 1.12, 0]} castShadow>
        <boxGeometry args={[0.34, 0.2, 0.3]} />
      </mesh>
      <mesh material={mats.rubber} position={[-0.42, 1.12, 0.17]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.045, 0.045, 0.08, 12]} />
      </mesh>

      {/* Shaft + coupling guard */}
      <mesh material={mats.steel} position={[0.36, 0.66, 0]} rotation={rotZ}>
        <cylinderGeometry args={[0.05, 0.05, 0.5, 16]} />
      </mesh>
      <mesh material={mats.guard} position={[0.36, 0.64, 0]} castShadow>
        <boxGeometry args={[0.46, 0.46, 0.44]} />
      </mesh>

      {/* Bearing housing + pedestal */}
      <mesh material={bearingMat} position={[0.78, 0.66, 0]} rotation={rotZ} castShadow>
        <cylinderGeometry args={[0.17, 0.19, 0.38, 32]} />
      </mesh>
      <mesh material={mats.pumpBody} position={[0.78, 0.36, 0]} castShadow>
        <boxGeometry args={[0.3, 0.36, 0.5]} />
      </mesh>

      {/* Volute casing */}
      <mesh material={mats.pumpBody} position={[1.12, 0.7, 0]} rotation={rotZ} castShadow receiveShadow>
        <cylinderGeometry args={[0.52, 0.52, 0.34, 48]} />
      </mesh>
      <mesh material={mats.pumpBody} position={[1.12, 0.7, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <torusGeometry args={[0.5, 0.11, 16, 48, Math.PI * 1.55]} />
      </mesh>
      <mesh material={mats.pumpBody} position={[1.12, 0.3, 0]} castShadow>
        <boxGeometry args={[0.36, 0.26, 0.56]} />
      </mesh>

      {/* Suction nozzle (+X) */}
      <mesh material={mats.pumpBody} position={[1.46, 0.7, 0]} rotation={rotZ} castShadow>
        <cylinderGeometry args={[0.16, 0.19, 0.4, 32]} />
      </mesh>
      <mesh material={mats.steel} position={[1.68, 0.7, 0]} rotation={rotZ} castShadow>
        <cylinderGeometry args={[0.25, 0.25, 0.06, 40]} />
      </mesh>
      <mesh geometry={bolts} material={mats.steel} position={[1.7, 0.7, 0]} rotation={rotZ} />

      {/* Discharge nozzle (up) */}
      <mesh material={mats.pumpBody} position={[1.12, 1.27, 0]} castShadow>
        <cylinderGeometry args={[0.13, 0.17, 0.42, 32]} />
      </mesh>
      <mesh material={mats.steel} position={[1.12, 1.49, 0]} castShadow>
        <cylinderGeometry args={[0.24, 0.24, 0.06, 40]} />
      </mesh>
      <mesh geometry={bolts} material={mats.steel} position={[1.12, 1.51, 0]} />

      {/* Sensors with status LEDs */}
      {showSensors && (
        <group>
          <mesh material={mats.rubber} position={[0.78, 0.86, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.1, 12]} />
          </mesh>
          <mesh material={heat > 0.5 ? mats.ledAmber : mats.led} position={PUMP_SENSORS.bearing.clone().setY(0.92)}>
            <sphereGeometry args={[0.028, 12, 12]} />
          </mesh>
          <mesh material={mats.rubber} position={[-1.02, 0.98, 0.2]}>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
          </mesh>
          <mesh material={mats.led} position={[-1.02, 1.04, 0.26]}>
            <sphereGeometry args={[0.022, 12, 12]} />
          </mesh>
        </group>
      )}
    </group>
  );
});
