import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { createBeanGeometry, roastColor } from '../geometry/bean';
import { Embers } from './Embers';
import { stage } from '../stage';
import { clamp, damp, lerp, randRange, range } from '@/lib/math';
import { sceneQuality } from '@/lib/device';

const dummy = new THREE.Object3D();
const euler = new THREE.Euler();

/**
 * The roast act's subject: a single bean at hero scale that darkens, gains oil
 * sheen and glows through first and second crack, orbited by a small drum of
 * satellite beans.
 */
export function HeroBean() {
  const quality = useMemo(() => sceneQuality(), []);
  const group = useRef<THREE.Group>(null);
  const bean = useRef<THREE.Mesh>(null);
  const orbit = useRef<THREE.InstancedMesh>(null);
  const light = useRef<THREE.PointLight>(null);

  const orbitCount = quality.tier === 'high' ? 46 : quality.tier === 'mid' ? 28 : 14;

  const geometry = useMemo(
    () => createBeanGeometry({ segments: quality.tier === 'low' ? 40 : 96 }),
    [quality.tier],
  );

  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#8e9a6a').convertSRGBToLinear(),
        roughness: 0.85,
        metalness: 0,
        clearcoat: 0,
        clearcoatRoughness: 0.4,
        sheen: 0.14,
        sheenColor: new THREE.Color('#ffcf9b').convertSRGBToLinear(),
        emissive: new THREE.Color('#ff5a12').convertSRGBToLinear(),
        emissiveIntensity: 0,
        transparent: true,
        opacity: 0,
        envMapIntensity: 0.58,
      }),
    [],
  );

  const satellites = useMemo(
    () =>
      Array.from({ length: orbitCount }, (_, i) => {
        const s = i * 3.7 + 11;
        return {
          radius: randRange(s, 1.5, 3.1),
          angle: randRange(s + 1, 0, Math.PI * 2),
          y: randRange(s + 2, -0.9, 1.1),
          scale: randRange(s + 3, 0.06, 0.14),
          rate: randRange(s + 4, 0.3, 1.1),
          tilt: randRange(s + 5, -0.5, 0.5),
        };
      }),
    [orbitCount],
  );

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  const shown = useRef(0);
  const roasted = useRef(0);

  useFrame(() => {
    shown.current = damp(shown.current, clamp(stage.heroBean), 5, stage.dt);
    const vis = shown.current > 0.005;
    if (group.current) group.current.visible = vis;
    material.opacity = shown.current;
    if (!vis) return;

    roasted.current = damp(roasted.current, clamp(stage.roast), 6, stage.dt);
    const r = roasted.current;

    roastColor(r, material.color);
    material.roughness = lerp(0.88, 0.26, Math.pow(r, 1.3));
    material.clearcoat = range(r, 0.55, 1, 0, 0.85);
    material.clearcoatRoughness = lerp(0.5, 0.14, r);

    // First crack around 55%, second near 88% — two glows, second one hotter.
    const crackA = Math.exp(-Math.pow((r - 0.55) / 0.09, 2));
    const crackB = Math.exp(-Math.pow((r - 0.88) / 0.07, 2));
    const flicker = 0.75 + 0.25 * Math.sin(stage.time * 14) * Math.sin(stage.time * 6.3);
    const heat = (crackA * 0.7 + crackB) * flicker;
    material.emissiveIntensity = heat * 0.34 * shown.current;

    if (light.current) {
      light.current.intensity = (1.8 + heat * 11) * shown.current;
      light.current.position.set(Math.sin(stage.time * 0.6) * 0.6, 0.4, 1.3);
    }

    const t = stage.time;
    const g = group.current!;
    // Keep the creased face toward camera — a bean that spins away just reads
    // as an egg. Scroll turns it through a quarter, no further.
    g.rotation.y = -0.5 + Math.sin(t * 0.22) * 0.3 + stage.tl * 0.34 + stage.px * 0.2;
    g.rotation.z = 0.3 + Math.sin(t * 0.3) * 0.05 + stage.py * 0.06;
    g.rotation.x = -0.12 + Math.sin(t * 0.19) * 0.05;
    // Crack jolts: the bean visibly swells as it pops.
    const pop = 1 + crackA * 0.035 + crackB * 0.05;
    g.scale.setScalar(lerp(0.62, 0.86, shown.current) * pop);
    g.position.y = 0.28 + Math.sin(t * 0.45) * 0.06;

    const o = orbit.current;
    if (o) {
      for (let i = 0; i < orbitCount; i++) {
        const s = satellites[i];
        const a = s.angle + t * 0.18 * s.rate;
        dummy.position.set(Math.cos(a) * s.radius, s.y + Math.sin(t * 0.6 + s.angle) * 0.16, Math.sin(a) * s.radius);
        euler.set(t * s.rate, t * s.rate * 0.7, s.tilt);
        dummy.quaternion.setFromEuler(euler);
        dummy.scale.setScalar(s.scale * shown.current);
        dummy.updateMatrix();
        o.setMatrixAt(i, dummy.matrix);
      }
      o.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={group}>
      <mesh ref={bean} geometry={geometry} material={material} />
      <instancedMesh ref={orbit} args={[geometry, material, orbitCount]} frustumCulled={false} />
      <pointLight ref={light} color="#ff7a2a" distance={9} decay={2} intensity={0} />
      <Embers />
    </group>
  );
}
