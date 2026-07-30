import * as THREE from 'three';
import { NOISE } from './common';

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uWobble;

  varying vec2 vUv;
  varying float vY;

  void main() {
    vUv = uv;
    vec3 p = position;
    // Local Y runs -0.5..0.5 on a unit cylinder; 0 = top of the stream.
    float t = 0.5 - p.y;
    vY = t;

    // The stream necks down and sways as it falls.
    float taper = mix(1.0, 0.52, smoothstep(0.0, 1.0, t));
    p.xz *= taper;
    p.x += sin(t * 7.0 + uTime * 6.0) * 0.028 * uWobble * t;
    p.z += cos(t * 6.2 + uTime * 5.2) * 0.024 * uWobble * t;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uProgress;
  uniform float uOpacity;
  uniform vec3 uColor;
  uniform vec3 uSheen;

  varying vec2 vUv;
  varying float vY;

  ${NOISE}

  void main() {
    // The stream extends downward as the pour begins.
    if (vY > uProgress) discard;

    float flow = fbm(vec2(vUv.x * 4.0, vY * 7.0 - uTime * 3.4)) * 0.5 + 0.5;

    // Cylindrical shading: bright edge-lit column with a hot specular seam.
    float edge = abs(vUv.x - 0.5) * 2.0;
    float body = 1.0 - pow(edge, 2.2);
    float seam = exp(-pow((vUv.x - 0.36) * 9.0, 2.0));

    vec3 col = uColor * (0.55 + 0.75 * flow * body);
    col += uSheen * seam * 0.7;

    float tipFade = 1.0 - smoothstep(uProgress - 0.12, uProgress, vY);
    float alpha = uOpacity * body * (0.55 + 0.45 * flow) * tipFade;

    gl_FragColor = vec4(col, alpha);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

export class PourMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uOpacity: { value: 0 },
        uWobble: { value: 1 },
        uColor: { value: new THREE.Color('#5a2a12').convertSRGBToLinear() },
        uSheen: { value: new THREE.Color('#e8b784').convertSRGBToLinear() },
      },
    });
  }
}
