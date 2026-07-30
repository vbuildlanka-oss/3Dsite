import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { SteamMaterial } from '../shaders/particles';
import { stage, type Stage } from '../stage';
import { damp } from '@/lib/math';

type Props = {
  count?: number;
  radius?: number;
  rise?: number;
  /** Puff radius in world units. */
  size?: number;
  spread?: number;
  intensity?: (s: Stage) => number;
  position?: [number, number, number];
};

/**
 * A column of steam. Points are seeded once on a disc; the vertex shader owns
 * the entire lifecycle, so the CPU never touches the buffer again.
 */
export function Steam({
  count = 900,
  radius = 0.62,
  rise = 1.1,
  size = 0.19,
  spread = 0.9,
  intensity = (s) => s.steam,
  position = [0, 0, 0],
}: Props) {
  const gl = useThree((s) => s.gl);
  const points = useRef<THREE.Points>(null);

  const material = useMemo(() => new SteamMaterial(), []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    const scale = new Float32Array(count);
    const speed = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // sqrt() keeps the disc evenly filled instead of clumping at the centre.
      const r = Math.sqrt(Math.random()) * radius;
      const a = Math.random() * Math.PI * 2;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = 0;
      pos[i * 3 + 2] = Math.sin(a) * r;
      seed[i] = Math.random();
      scale[i] = 0.35 + Math.random() * 0.85;
      speed[i] = 0.55 + Math.random() * 0.9;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
    geo.setAttribute('aScale', new THREE.BufferAttribute(scale, 1));
    geo.setAttribute('aSpeed', new THREE.BufferAttribute(speed, 1));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, rise * 0.5, 0), rise + radius);
    return geo;
  }, [count, radius, rise]);

  useEffect(() => {
    material.uniforms.uRise.value = rise;
    material.uniforms.uWorldSize.value = size;
    material.uniforms.uSpread.value = spread;
  }, [material, rise, size, spread]);

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  const smoothed = useRef(0);

  useFrame(() => {
    const u = material.uniforms;
    u.uTime.value = stage.time;
    u.uViewHeight.value = gl.domElement.height;
    smoothed.current = damp(smoothed.current, intensity(stage), 4, stage.dt);
    u.uIntensity.value = smoothed.current * 0.055;
    u.uVel.value = damp(u.uVel.value, stage.vel * 0.8, 3, stage.dt);
    if (points.current) points.current.visible = smoothed.current > 0.004;
  });

  return (
    <points ref={points} geometry={geometry} material={material} position={position} frustumCulled={false} />
  );
}
