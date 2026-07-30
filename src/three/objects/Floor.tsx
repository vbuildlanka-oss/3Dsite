import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { FloorMaterial } from '../shaders/floor';
import { stage } from '../stage';
import { clamp, damp } from '@/lib/math';

/** Ground plane with a warm pool of light, plus a fake contact shadow. */
export function Floor() {
  const floorMat = useMemo(() => new FloorMaterial(), []);
  const geometry = useMemo(() => new THREE.PlaneGeometry(36, 36, 1, 1), []);

  const shadowGeo = useMemo(() => new THREE.CircleGeometry(1.9, 48), []);
  const shadowMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: { uOpacity: { value: 0 } },
        vertexShader: /* glsl */ `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          uniform float uOpacity;
          varying vec2 vUv;
          void main() {
            float d = length((vUv - 0.5) * 2.0);
            // Two falloffs stacked: a tight core contact plus a broad ambient.
            float core = exp(-d * d * 9.0);
            float soft = exp(-d * d * 2.2) * 0.5;
            gl_FragColor = vec4(0.0, 0.0, 0.0, min(1.0, (core + soft)) * uOpacity);
          }
        `,
      }),
    [],
  );

  const shadow = useRef<THREE.Mesh>(null);

  useEffect(
    () => () => {
      geometry.dispose();
      shadowGeo.dispose();
      floorMat.dispose();
      shadowMat.dispose();
    },
    [geometry, shadowGeo, floorMat, shadowMat],
  );

  useFrame(() => {
    floorMat.uniforms.uTime.value = stage.time;
    floorMat.uniforms.uGlow.value = damp(floorMat.uniforms.uGlow.value, stage.glow, 3, stage.dt);
    floorMat.uniforms.uOpacity.value = damp(
      floorMat.uniforms.uOpacity.value,
      clamp(stage.floor),
      3,
      stage.dt,
    );

    const target = clamp(stage.cup) * 0.72 + clamp(stage.trio) * 0.2;
    shadowMat.uniforms.uOpacity.value = damp(shadowMat.uniforms.uOpacity.value, target, 4, stage.dt);
    if (shadow.current) shadow.current.visible = shadowMat.uniforms.uOpacity.value > 0.004;
  });

  return (
    <group>
      <mesh
        geometry={geometry}
        material={floorMat}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.03, 0]}
      />
      <mesh
        ref={shadow}
        geometry={shadowGeo}
        material={shadowMat}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.002, 0]}
        scale={[1, 0.85, 1]}
      />
    </group>
  );
}
