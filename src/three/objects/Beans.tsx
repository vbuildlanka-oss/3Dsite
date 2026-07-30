import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { createBeanGeometry, roastColor } from '../geometry/bean';
import { stage } from '../stage';
import { clamp, damp, randRange } from '@/lib/math';
import { sceneQuality } from '@/lib/device';

const dummy = new THREE.Object3D();
const tint = new THREE.Color();

type Bean = {
  radius: number;
  angle: number;
  y: number;
  scale: number;
  spin: THREE.Vector3;
  rate: number;
  bob: number;
  phase: number;
};

/**
 * The origin field: a slow galaxy of beans on a wide annulus. One instanced
 * draw call, matrices rebuilt per frame only while the field is on screen.
 */
export function Beans() {
  const quality = useMemo(() => sceneQuality(), []);
  const mesh = useRef<THREE.InstancedMesh>(null);
  const count = quality.beanCount;

  const geometry = useMemo(
    () => createBeanGeometry({ segments: quality.tier === 'low' ? 24 : 40 }),
    [quality.tier],
  );

  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        roughness: 0.58,
        metalness: 0,
        clearcoat: 0.3,
        clearcoatRoughness: 0.45,
        transparent: true,
        opacity: 0,
        envMapIntensity: 0.85,
      }),
    [],
  );

  const beans = useMemo<Bean[]>(
    () =>
      Array.from({ length: count }, (_, i) => {
        const s = i * 1.37;
        return {
          radius: randRange(s + 1, 1.4, 7.2),
          angle: randRange(s + 2, 0, Math.PI * 2),
          y: randRange(s + 3, -0.35, 2.6) * (randRange(s + 9, 0, 1) > 0.72 ? 1 : 0.28),
          scale: randRange(s + 4, 0.075, 0.185),
          spin: new THREE.Vector3(
            randRange(s + 5, -1, 1),
            randRange(s + 6, -1, 1),
            randRange(s + 7, -1, 1),
          ).normalize(),
          rate: randRange(s + 8, 0.12, 0.55),
          bob: randRange(s + 10, 0.05, 0.3),
          phase: randRange(s + 11, 0, Math.PI * 2),
        };
      }),
    [count],
  );

  useEffect(() => {
    const m = mesh.current;
    if (!m) return;
    for (let i = 0; i < count; i++) {
      roastColor(randRange(i * 2.11 + 5, 0.42, 0.95), tint);
      m.setColorAt(i, tint);
    }
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  }, [count]);

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  const shown = useRef(0);

  useFrame(() => {
    const m = mesh.current;
    if (!m) return;

    shown.current = damp(shown.current, clamp(stage.beans), 4.5, stage.dt);
    const vis = shown.current > 0.005;
    m.visible = vis;
    material.opacity = shown.current;
    if (!vis) return;

    const t = stage.time;
    // The whole field turns, and pulls inward as it fades up.
    const gather = 0.72 + 0.28 * shown.current;
    m.rotation.y = t * 0.028 + stage.tl * 0.16;

    for (let i = 0; i < count; i++) {
      const b = beans[i];
      const a = b.angle + t * 0.012 * b.rate;
      const r = b.radius * gather;
      dummy.position.set(
        Math.cos(a) * r,
        b.y + Math.sin(t * 0.4 * b.rate + b.phase) * b.bob,
        Math.sin(a) * r,
      );
      dummy.quaternion.setFromAxisAngle(b.spin, t * b.rate + b.phase);
      dummy.scale.setScalar(b.scale * (0.6 + 0.4 * shown.current));
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    }
    m.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={mesh}
      args={[geometry, material, count]}
      frustumCulled={false}
      position={[0, 0.1, 0]}
    />
  );
}
