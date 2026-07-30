import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { stage } from '../stage';
import { surfaceMaps } from '../textures';
import { damp } from '@/lib/math';
import { sceneQuality } from '@/lib/device';

/**
 * The counter.
 *
 * This used to be a shader plane faking a pool of light. It is now a real
 * surface with a procedural concrete normal/roughness pair, lit by a real
 * spotlight and receiving real shadows — the pool of light and the contact
 * darkening under the cup are consequences of the lighting rather than a
 * painted-on gradient, which is most of why the scene now reads as photographed.
 */
export function Floor() {
  const quality = useMemo(() => sceneQuality(), []);

  const geometry = useMemo(() => new THREE.PlaneGeometry(44, 44, 1, 1), []);

  const material = useMemo(() => {
    const { normalMap, roughnessMap } = surfaceMaps('concrete');
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#20150f').convertSRGBToLinear(),
      roughness: 0.82,
      metalness: 0,
      normalMap,
      normalScale: new THREE.Vector2(0.22, 0.22),
      roughnessMap,
      envMapIntensity: 0.35,
    });
  }, []);

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  useFrame(() => {
    // Warmth in the surface tracks the roast: the counter picks up ember light.
    material.envMapIntensity = damp(material.envMapIntensity, 0.28 + stage.glow * 0.3, 2, stage.dt);
  });

  return (
    <mesh
      geometry={geometry}
      material={material}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.002, 0]}
      receiveShadow={quality.shadows}
    />
  );
}
