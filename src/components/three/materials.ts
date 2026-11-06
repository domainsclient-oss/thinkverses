import * as THREE from "three";

// One material set per Canvas: three.js keeps GPU state per renderer, so scenes never share instances.
export function createMats() {
  return {
    motor: new THREE.MeshPhysicalMaterial({ color: "#1d4fa6", metalness: 0.45, roughness: 0.36, clearcoat: 0.7, clearcoatRoughness: 0.25 }),
    pumpBody: new THREE.MeshPhysicalMaterial({ color: "#2a5fbf", metalness: 0.5, roughness: 0.42, clearcoat: 0.5, clearcoatRoughness: 0.35 }),
    skid: new THREE.MeshStandardMaterial({ color: "#232a35", metalness: 0.75, roughness: 0.48 }),
    steel: new THREE.MeshStandardMaterial({ color: "#b4bfcc", metalness: 0.96, roughness: 0.24 }),
    pipe: new THREE.MeshStandardMaterial({ color: "#7c8898", metalness: 0.88, roughness: 0.32 }),
    pipePaint: new THREE.MeshPhysicalMaterial({ color: "#3b4a5f", metalness: 0.55, roughness: 0.4, clearcoat: 0.4 }),
    guard: new THREE.MeshStandardMaterial({ color: "#e3a21a", metalness: 0.25, roughness: 0.48 }),
    rubber: new THREE.MeshStandardMaterial({ color: "#0f1319", metalness: 0.1, roughness: 0.85 }),
    floor: new THREE.MeshStandardMaterial({ color: "#070b14", metalness: 0.35, roughness: 0.62 }),
    concrete: new THREE.MeshStandardMaterial({ color: "#121a28", metalness: 0.2, roughness: 0.8 }),
    frame: new THREE.MeshStandardMaterial({ color: "#1a2333", metalness: 0.7, roughness: 0.5 }),
    tank: new THREE.MeshPhysicalMaterial({ color: "#c7d0db", metalness: 0.85, roughness: 0.3, clearcoat: 0.3 }),
    hazard: new THREE.MeshStandardMaterial({ color: "#c79a1e", metalness: 0.1, roughness: 0.7 }),
    led: new THREE.MeshBasicMaterial({ color: "#5ff0ff", toneMapped: false }),
    ledAmber: new THREE.MeshBasicMaterial({ color: "#ffb547", toneMapped: false }),
    ledRed: new THREE.MeshBasicMaterial({ color: "#ff4d5e", toneMapped: false }),
    lamp: new THREE.MeshBasicMaterial({ color: "#dff6ff", toneMapped: false }),
    glass: new THREE.MeshPhysicalMaterial({
      color: "#0d1d38",
      metalness: 0.1,
      roughness: 0.15,
      transparent: true,
      opacity: 0.55,
      clearcoat: 1,
      depthWrite: false,
    }),
  };
}

export type Mats = ReturnType<typeof createMats>;

export const CYAN = "#3ee0ff";
export const BLUE = "#2f6bff";
export const AMBER = "#ffb547";
