import * as THREE from 'three';
import { NOISE } from './common';

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uGlow;
  uniform float uOpacity;
  uniform vec3 uBase;
  uniform vec3 uWarm;

  varying vec2 vUv;

  ${NOISE}

  void main() {
    vec2 p = (vUv - 0.5) * 2.0;
    float d = length(p);

    // Pool of light directly beneath the subject.
    float pool = exp(-d * d * 5.5);
    float halo = exp(-d * d * 1.4) * 0.35;

    // Brushed concrete: two noise octaves at different scales.
    float grain = fbm(vUv * 34.0) * 0.5 + 0.5;
    float sweep = fbm(vUv * 6.0 + vec2(uTime * 0.01, 0.0)) * 0.5 + 0.5;

    vec3 col = uBase * (0.65 + grain * 0.5);
    col = mix(col, uWarm, (pool * 0.7 + halo * 0.6) * uGlow);
    col *= 0.8 + sweep * 0.35;

    // Fade the plate out toward the horizon so it never shows an edge.
    float fade = 1.0 - smoothstep(0.18, 0.92, d);
    gl_FragColor = vec4(col, fade * uOpacity);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

export class FloorMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uGlow: { value: 1 },
        uOpacity: { value: 1 },
        uBase: { value: new THREE.Color('#150d09').convertSRGBToLinear() },
        uWarm: { value: new THREE.Color('#4d2610').convertSRGBToLinear() },
      },
    });
  }
}
