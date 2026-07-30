import * as THREE from 'three';
import { NOISE } from './common';

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uVel;
  uniform float uAgitate;

  varying vec2 vUv;
  varying float vR;
  varying float vWave;

  ${NOISE}

  float surface(vec2 p, float t) {
    float r = length(p);
    // Concentric rings radiating from the centre, plus a slow swell.
    float rings = sin(r * 26.0 - t * 2.4) * exp(-r * 2.6) * 0.35;
    float swell = snoise(p * 2.1 + vec2(t * 0.12, -t * 0.09)) * 0.5;
    // Sloshing tilt driven by scroll velocity.
    float slosh = sin(p.x * 3.2 + t * 3.1) * uVel * 0.9;
    return rings * uAgitate + swell + slosh;
  }

  void main() {
    vUv = uv;
    vec3 p = position;
    vR = length(p.xy);

    float w = surface(p.xy, uTime);
    vWave = w;

    // Meniscus: the surface climbs slightly where it meets the wall.
    float meniscus = smoothstep(0.78, 1.0, vR) * 0.045;
    p.z += (1.0 - vR * vR) * 0.028 + w * 0.018 * (1.0 - vR) + meniscus;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uOpacity;
  uniform float uCrema;
  uniform vec3 uDeep;
  uniform vec3 uCremaColor;
  uniform vec3 uHighlight;

  varying vec2 vUv;
  varying float vR;
  varying float vWave;

  ${NOISE}

  void main() {
    vec2 p = (vUv - 0.5) * 2.0;
    float r = length(p);
    if (r > 1.0) discard;

    float a = atan(p.y, p.x);

    // Crema: two counter-rotating noise fields sheared in polar space, which is
    // what gives espresso foam its marbled, dragged-out look.
    vec2 sw = vec2(cos(a), sin(a)) * r;
    float n1 = fbm(sw * 3.4 * rot(uTime * 0.05) + vec2(uTime * 0.06, 0.0));
    float n2 = fbm(sw * 6.8 * rot(-uTime * 0.08) - vec2(0.0, uTime * 0.05));
    float marble = n1 * 0.65 + n2 * 0.35;

    float foam = smoothstep(-0.05, 0.55, marble + (1.0 - r) * 0.35) * uCrema;

    vec3 col = mix(uDeep, uCremaColor, clamp(foam, 0.0, 1.0));

    // Denser ring of crema pushed against the wall.
    float ring = smoothstep(0.6, 0.95, r) * (1.0 - smoothstep(0.95, 1.0, r));
    col = mix(col, uCremaColor * 1.06, ring * 0.55 * uCrema);

    // Fake specular from the wave slope — a soft window reflection up-left.
    float slope = vWave;
    vec2 hp = p - vec2(-0.32, 0.42) - slope * 0.05;
    float spec = exp(-dot(hp, hp) * 5.2) * 0.55;
    spec += exp(-dot(p - vec2(0.28, -0.34), p - vec2(0.28, -0.34)) * 22.0) * 0.18;
    col += uHighlight * spec * (0.55 + 0.45 * uCrema);

    // Glints riding the ripples.
    float glint = smoothstep(0.55, 0.95, sin(vWave * 7.0 + uTime * 1.2)) * 0.06;
    col += uHighlight * glint;

    // Darken where the surface meets the ceramic.
    col *= 1.0 - smoothstep(0.86, 1.0, r) * 0.55;

    float alpha = uOpacity * (1.0 - smoothstep(0.985, 1.0, r));
    gl_FragColor = vec4(col, alpha);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

export class LiquidMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      side: THREE.FrontSide,
      uniforms: {
        uTime: { value: 0 },
        uVel: { value: 0 },
        uAgitate: { value: 0.25 },
        uOpacity: { value: 1 },
        uCrema: { value: 1 },
        uDeep: { value: new THREE.Color('#1a0c06').convertSRGBToLinear() },
        uCremaColor: { value: new THREE.Color('#c98a4a').convertSRGBToLinear() },
        uHighlight: { value: new THREE.Color('#ffd9a8').convertSRGBToLinear() },
      },
    });
  }
}
