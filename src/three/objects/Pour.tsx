import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { PourMaterial } from '../shaders/pour';
import { stage } from '../stage';
import { CUP } from '../geometry/cup';
import { clamp, damp, lerp } from '@/lib/math';

/** World height the stream issues from — also where the kettle spout parks. */
export const POUR_TOP = 1.7;

const HEIGHT = POUR_TOP - CUP.floor;

/**
 * The pour: a tapering, swaying column falling from the kettle spout into the
 * cup, with a splash ring riding the rising surface. Length is scroll-driven,
 * so the viewer is the one tipping the kettle.
 */
export function Pour() {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);

  const material = useMemo(() => new PourMaterial(), []);
  const geometry = useMemo(
    () => new THREE.CylinderGeometry(0.036, 0.023, HEIGHT, 20, 30, true),
    [],
  );

  const ringGeo = useMemo(() => new THREE.RingGeometry(0.05, 0.24, 44), []);
  const ringMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color('#f0c391').convertSRGBToLinear(),
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    [],
  );

  useEffect(
    () => () => {
      geometry.dispose();
      ringGeo.dispose();
      material.dispose();
      ringMat.dispose();
    },
    [geometry, ringGeo, material, ringMat],
  );

  const shown = useRef(0);

  useFrame(() => {
    shown.current = damp(shown.current, clamp(stage.pour), 6, stage.dt);
    const vis = shown.current > 0.005;
    if (group.current) group.current.visible = vis;
    if (!vis) return;

    // Follows the same spiral the kettle traces.
    if (group.current) group.current.position.set(stage.pourX, CUP.seat, stage.pourZ);

    const u = material.uniforms;
    u.uTime.value = stage.time;
    u.uOpacity.value = shown.current;
    u.uProgress.value = damp(u.uProgress.value, stage.pourLen, 5, stage.dt);
    u.uWobble.value = 0.7 + Math.abs(stage.vel) * 1.4;

    if (ring.current) {
      const beat = (stage.time * 1.8) % 1;
      ring.current.position.y = lerp(CUP.floor + 0.06, CUP.height - 0.09, clamp(stage.fill));
      ring.current.scale.setScalar(0.6 + beat * 1.5);
      ringMat.opacity = (1 - beat) * 0.45 * shown.current * u.uProgress.value;
    }
  });

  return (
    <group ref={group} position={[0, CUP.seat, 0]}>
      <mesh geometry={geometry} material={material} position={[0, CUP.floor + HEIGHT / 2, 0]} />
      <mesh ref={ring} geometry={ringGeo} material={ringMat} rotation={[-Math.PI / 2, 0, 0]} />
    </group>
  );
}
