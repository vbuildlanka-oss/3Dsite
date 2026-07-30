import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { DustMaterial } from '../shaders/particles';
import { stage } from '../stage';
import { damp } from '@/lib/math';
import { sceneQuality } from '@/lib/device';

/**
 * Ambient motes in the light shaft. Always on, barely noticed — and the single
 * cheapest way to make a WebGL scene feel like it was photographed.
 */
export function Dust() {
  const quality = useMemo(() => sceneQuality(), []);
  const gl = useThree((s) => s.gl);
  const material = useMemo(() => new DustMaterial(), []);
  const count = quality.dustCount;

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    const scale = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = Math.random() * 7 - 1.2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
      seed[i] = Math.random();
      scale[i] = 0.25 + Math.random() * 0.9;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
    geo.setAttribute('aScale', new THREE.BufferAttribute(scale, 1));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 2, 0), 16);
    return geo;
  }, [count]);

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  useFrame(() => {
    const u = material.uniforms;
    u.uTime.value = stage.time;
    u.uViewHeight.value = gl.domElement.height;
    u.uIntensity.value = damp(u.uIntensity.value, stage.dust * 0.5, 2.5, stage.dt);
    // Motes lag the scroll, drifting against the direction of travel.
    u.uDrift.value = damp(u.uDrift.value, -stage.vel * 0.9, 2, stage.dt);
  });

  return <points geometry={geometry} material={material} frustumCulled={false} />;
}
