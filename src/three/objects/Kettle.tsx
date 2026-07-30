import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import {
  KETTLE_TIP,
  createKettleBody,
  createKettleHandle,
  createKettleLid,
  createKettleSpout,
} from '../geometry/kettle';
import { POUR_TOP } from './Pour';
import { stage } from '../stage';
import { surfaceMaps } from '../textures';
import { clamp, damp, lerp } from '@/lib/math';
import { sceneQuality } from '@/lib/device';

/**
 * The gooseneck kettle, pivoted about its own spout tip.
 *
 * Because the pivot is the tip and the tip is parked exactly where the stream
 * starts, tipping the kettle never slides the stream off the spout — the two
 * stay welded together through the whole pour. The body swings up as it tips,
 * which is the motion that actually sells it.
 */
export function Kettle() {
  const quality = useMemo(() => sceneQuality(), []);
  const pivot = useRef<THREE.Group>(null);
  const detail = quality.tier === 'low' ? 0.4 : 1;

  const bodyGeo = useMemo(() => createKettleBody(quality.cupSegments), [quality.cupSegments]);
  const lidGeo = useMemo(
    () => createKettleLid(Math.round(quality.cupSegments * 0.7)),
    [quality.cupSegments],
  );
  const spoutGeo = useMemo(() => createKettleSpout(detail), [detail]);
  const handleGeo = useMemo(() => createKettleHandle(detail), [detail]);

  const steel = useMemo(() => {
    const { normalMap, roughnessMap } = surfaceMaps('metal');
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#b9bcc0').convertSRGBToLinear(),
      metalness: 0.94,
      roughness: 0.3,
      normalMap,
      normalScale: new THREE.Vector2(0.1, 0.1),
      roughnessMap,
      transparent: true,
      opacity: 0,
      envMapIntensity: 1.25,
    });
  }, []);

  const walnut = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#3a241a').convertSRGBToLinear(),
        metalness: 0,
        roughness: 0.52,
        clearcoat: 0.35,
        transparent: true,
        opacity: 0,
        envMapIntensity: 0.7,
      }),
    [],
  );

  useEffect(
    () => () => {
      [bodyGeo, lidGeo, spoutGeo, handleGeo].forEach((g) => g.dispose());
      [steel, walnut].forEach((m) => m.dispose());
    },
    [bodyGeo, lidGeo, spoutGeo, handleGeo, steel, walnut],
  );

  const shown = useRef(0);
  const tip = useRef(0);

  useFrame(() => {
    // Present a little before and after the pour so it arrives and leaves.
    const target = clamp(stage.kettle);
    shown.current = damp(shown.current, target, 5, stage.dt);
    const vis = shown.current > 0.006;

    const g = pivot.current;
    if (g) g.visible = vis;
    steel.opacity = shown.current;
    walnut.opacity = shown.current;
    if (!vis || !g) return;

    tip.current = damp(tip.current, clamp(stage.pour), 4, stage.dt);
    const t = stage.time;

    // Pivot sits at the head of the stream and traces the pour spiral.
    g.position.set(stage.pourX, POUR_TOP + lerp(0.16, 0, shown.current), stage.pourZ);

    // Tipping: negative Z rotation lifts the body and drops the spout.
    g.rotation.z = -0.05 - 0.6 * tip.current + Math.sin(t * 1.7) * 0.014 * tip.current;
    // Held in a hand, not clamped in a rig.
    g.rotation.y = -0.52 + Math.sin(t * 0.5) * 0.05 + stage.px * 0.12;
    g.rotation.x = Math.sin(t * 0.42) * 0.02;
  });

  const shadows = quality.shadows;

  return (
    <group ref={pivot}>
      {/* Author-space geometry shifted so the spout tip lands on the pivot. */}
      <group scale={0.78} position={[-KETTLE_TIP.x * 0.78, -KETTLE_TIP.y * 0.78, 0]}>
        <mesh geometry={bodyGeo} material={steel} castShadow={shadows} />
        <mesh geometry={lidGeo} material={steel} castShadow={shadows} />
        <mesh geometry={spoutGeo} material={steel} castShadow={shadows} />
        <mesh geometry={handleGeo} material={walnut} castShadow={shadows} />
      </group>
    </group>
  );
}
