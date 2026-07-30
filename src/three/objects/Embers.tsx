import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { EmberMaterial } from '../shaders/particles';
import { stage } from '../stage';
import { clamp, damp } from '@/lib/math';
import { sceneQuality } from '@/lib/device';

/** Sparks thrown off the roast — seeded in a shell around the subject. */
export function Embers() {
  const quality = useMemo(() => sceneQuality(), []);
  const gl = useThree((s) => s.gl);
  const points = useRef<THREE.Points>(null);
  const count = quality.emberCount;

  const material = useMemo(() => new EmberMaterial(), []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    const scale = new Float32Array(count);
    const speed = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const r = 0.7 + Math.random() * 1.9;
      const a = Math.random() * Math.PI * 2;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = -1.1 + Math.random() * 0.9;
      pos[i * 3 + 2] = Math.sin(a) * r * 0.8;
      seed[i] = Math.random();
      scale[i] = 0.3 + Math.random() * 1;
      speed[i] = 0.5 + Math.random() * 1.2;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
    geo.setAttribute('aScale', new THREE.BufferAttribute(scale, 1));
    geo.setAttribute('aSpeed', new THREE.BufferAttribute(speed, 1));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 1, 0), 6);
    return geo;
  }, [count]);

  useEffect(() => {
    material.uniforms.uWorldSize.value = quality.tier === 'low' ? 0.03 : 0.024;
  }, [material, quality.tier]);

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  const shown = useRef(0);

  useFrame(() => {
    shown.current = damp(shown.current, clamp(stage.embers), 4, stage.dt);
    material.uniforms.uTime.value = stage.time;
    material.uniforms.uViewHeight.value = gl.domElement.height;
    material.uniforms.uIntensity.value = shown.current * 0.85;
    if (points.current) points.current.visible = shown.current > 0.004;
  });

  return <points ref={points} geometry={geometry} material={material} frustumCulled={false} />;
}
