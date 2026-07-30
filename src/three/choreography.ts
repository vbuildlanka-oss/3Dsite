import * as THREE from 'three';
import { smoothstep } from '@/lib/math';

export type CameraKey = {
  /** Timeline position, in act units. */
  tl: number;
  pos: [number, number, number];
  look: [number, number, number];
  fov: number;
  /** Camera roll, radians. */
  roll?: number;
};

/**
 * The shot list. Acts are integers on the timeline:
 * 0 hero · 1 origin · 2 roast · 3 brew · 4 menu · 5 ritual · 6 visit
 *
 * Distances are deliberately long with narrow fields of view — a compressed,
 * near-telephoto look keeps the subject small enough for type to breathe over
 * it while still feeling intimate.
 */
export const SHOTS: CameraKey[] = [
  { tl: 0.0, pos: [0, 1.34, 6.0], look: [0, 0.47, 0], fov: 30 },
  { tl: 0.55, pos: [1.05, 1.5, 5.7], look: [0, 0.5, 0], fov: 30, roll: -0.01 },
  { tl: 1.0, pos: [1.8, 2.7, 7.8], look: [0, 0.48, 0], fov: 36, roll: -0.018 },
  { tl: 1.55, pos: [0, 3.5, 9.8], look: [0, 0.28, 0], fov: 44 },
  { tl: 2.05, pos: [0, 1.05, 5.5], look: [0, 0.34, 0], fov: 34 },
  { tl: 2.5, pos: [-0.95, 0.62, 4.5], look: [0, 0.24, 0], fov: 30, roll: 0.014 },
  { tl: 2.95, pos: [0.4, 1.15, 4.9], look: [0, 0.3, 0], fov: 32 },
  { tl: 3.16, pos: [0, 2.85, 5.9], look: [0, 1.0, 0], fov: 34 },
  { tl: 3.66, pos: [0, 1.72, 4.7], look: [0, 0.58, 0], fov: 30 },
  { tl: 4.06, pos: [0, 1.32, 6.5], look: [0, 0.48, 0], fov: 36 },
  { tl: 4.6, pos: [0.6, 1.65, 7.3], look: [0, 0.44, 0], fov: 38, roll: -0.012 },
  { tl: 5.15, pos: [0, 1.95, 8.8], look: [0, 0.58, 0], fov: 44 },
  { tl: 5.9, pos: [0, 1.4, 6.5], look: [0, 0.58, 0], fov: 38 },
  { tl: 6.6, pos: [0, 1.16, 5.3], look: [0, 0.56, 0], fov: 32 },
];

const posA = new THREE.Vector3();
const posB = new THREE.Vector3();
const lookA = new THREE.Vector3();
const lookB = new THREE.Vector3();

export type Shot = {
  pos: THREE.Vector3;
  look: THREE.Vector3;
  fov: number;
  roll: number;
};

const out: Shot = {
  pos: new THREE.Vector3(),
  look: new THREE.Vector3(),
  fov: 35,
  roll: 0,
};

/** Samples the shot list at a timeline position with eased segment blending. */
export const sampleShot = (tl: number): Shot => {
  let i = 0;
  while (i < SHOTS.length - 2 && tl >= SHOTS[i + 1].tl) i++;

  const a = SHOTS[i];
  const b = SHOTS[i + 1] ?? a;
  const span = b.tl - a.tl || 1;
  const t = smoothstep((tl - a.tl) / span);

  posA.fromArray(a.pos);
  posB.fromArray(b.pos);
  lookA.fromArray(a.look);
  lookB.fromArray(b.look);

  out.pos.copy(posA).lerp(posB, t);
  out.look.copy(lookA).lerp(lookB, t);
  out.fov = THREE.MathUtils.lerp(a.fov, b.fov, t);
  out.roll = THREE.MathUtils.lerp(a.roll ?? 0, b.roll ?? 0, t);

  return out;
};
