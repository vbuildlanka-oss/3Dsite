import * as THREE from 'three';
import { NOISE, SPRITE } from './common';

/**
 * Point sizing, once, for all three systems.
 *
 * `gl_PointSize` is in device pixels, which makes hand-tuned constants drift
 * with viewport size, DPR and field of view. Instead every system declares a
 * radius in *world units* and converts here: the projection matrix's vertical
 * scale times half the drawing-buffer height gives pixels-per-world-unit at
 * one unit of depth. Sprites then hold their physical size no matter the
 * screen — a 0.2-unit puff of steam is always a 0.2-unit puff of steam.
 */
const POINT_SIZE = /* glsl */ `
  uniform float uWorldSize;
  uniform float uViewHeight;

  float pointPixels(float radius, float depth) {
    float perUnit = uViewHeight * projectionMatrix[1][1] * 0.5;
    return radius * perUnit / max(0.001, depth);
  }
`;

/* ==========================================================================
   Steam — broad, soft, low-alpha puffs that overlap into a plume.
   ========================================================================== */

const steamVert = /* glsl */ `
  uniform float uTime;
  uniform float uIntensity;
  uniform float uRise;
  uniform float uVel;
  uniform float uSpread;

  attribute float aSeed;
  attribute float aScale;
  attribute float aSpeed;

  varying float vAlpha;
  varying float vLife;
  varying float vSeed;

  ${NOISE}
  ${POINT_SIZE}

  void main() {
    float life = fract(uTime * aSpeed * 0.085 + aSeed);
    vLife = life;
    vSeed = aSeed;

    float y = pow(life, 0.82) * uRise;

    // Widen as it climbs, then curl with two out-of-phase drifts.
    float widen = mix(0.55, 1.0 + uSpread, pow(life, 1.3));
    float curl = snoise(vec2(aSeed * 31.0, uTime * 0.28 + life * 2.4)) * 0.42 * pow(life, 1.25);
    float curl2 = snoise(vec2(uTime * 0.21 - life * 1.9, aSeed * 17.0)) * 0.34 * pow(life, 1.15);

    vec3 world = vec3(
      position.x * widen + curl + uVel * 0.65 * pow(life, 1.4),
      y,
      position.z * widen + curl2
    );

    vec4 mv = modelViewMatrix * vec4(world, 1.0);

    // Fade in fast, out slow — steam thins as it dissipates.
    float fadeIn = smoothstep(0.0, 0.12, life);
    float fadeOut = 1.0 - smoothstep(0.14, 0.86, life);
    vAlpha = fadeIn * fadeOut * uIntensity * (0.35 + 0.65 * aScale);

    // Puffs expand as they rise, the way real condensation does.
    float radius = uWorldSize * aScale * (0.45 + life * 1.5);
    gl_PointSize = pointPixels(radius, -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const steamFrag = /* glsl */ `
  precision highp float;

  uniform vec3 uColorCore;
  uniform vec3 uColorEdge;
  uniform float uTime;

  varying float vAlpha;
  varying float vLife;
  varying float vSeed;

  ${SPRITE}

  void main() {
    float mask = sprite(gl_PointCoord, 1.0);
    mask = mask * mask;
    if (mask < 0.0015) discard;

    vec3 col = mix(uColorCore, uColorEdge, smoothstep(0.1, 0.8, vLife));
    float flick = 0.9 + 0.1 * sin(uTime * 3.0 + vSeed * 40.0);
    gl_FragColor = vec4(col, mask * vAlpha * flick);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

export class SteamMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      vertexShader: steamVert,
      fragmentShader: steamFrag,
      transparent: true,
      depthWrite: false,
      depthTest: true,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uIntensity: { value: 0 },
        uRise: { value: 2.1 },
        uWorldSize: { value: 0.12 },
        uViewHeight: { value: 900 },
        uVel: { value: 0 },
        uSpread: { value: 0.75 },
        uColorCore: { value: new THREE.Color('#fff1de').convertSRGBToLinear() },
        uColorEdge: { value: new THREE.Color('#6b4a34').convertSRGBToLinear() },
      },
    });
  }
}

/* ==========================================================================
   Embers — sparks off the roast drum: fast rise, gravity droop, hot flicker.
   ========================================================================== */

const emberVert = /* glsl */ `
  uniform float uTime;
  uniform float uIntensity;

  attribute float aSeed;
  attribute float aScale;
  attribute float aSpeed;

  varying float vAlpha;
  varying float vHeat;

  ${NOISE}
  ${POINT_SIZE}

  void main() {
    float life = fract(uTime * aSpeed * 0.14 + aSeed);
    float rise = life * 3.1;
    float droop = pow(life, 2.6) * 1.1;

    float swirlA = snoise(vec2(aSeed * 44.0, uTime * 0.4 + life * 3.0)) * 0.8 * life;
    float swirlB = snoise(vec2(uTime * 0.35, aSeed * 62.0 + life * 2.0)) * 0.8 * life;

    vec3 world = position + vec3(swirlA, rise - droop, swirlB);
    vec4 mv = modelViewMatrix * vec4(world, 1.0);

    vAlpha = uIntensity * sin(life * 3.14159) * (0.4 + 0.6 * aScale);
    vHeat = 1.0 - life;

    gl_PointSize = pointPixels(uWorldSize * aScale * (1.0 - life * 0.5), -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const emberFrag = /* glsl */ `
  precision highp float;

  uniform vec3 uHot;
  uniform vec3 uCool;

  varying float vAlpha;
  varying float vHeat;

  ${SPRITE}

  void main() {
    float mask = sprite(gl_PointCoord, 0.9);
    mask = pow(mask, 1.6);
    if (mask < 0.003) discard;

    vec3 col = mix(uCool, uHot, vHeat);
    gl_FragColor = vec4(col * (0.8 + vHeat * 1.6), mask * vAlpha);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

export class EmberMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      vertexShader: emberVert,
      fragmentShader: emberFrag,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uIntensity: { value: 0 },
        uWorldSize: { value: 0.022 },
        uViewHeight: { value: 900 },
        uHot: { value: new THREE.Color('#ffd08a').convertSRGBToLinear() },
        uCool: { value: new THREE.Color('#c23f11').convertSRGBToLinear() },
      },
    });
  }
}

/* ==========================================================================
   Dust — the constant, near-subliminal motes that sell depth.
   ========================================================================== */

const dustVert = /* glsl */ `
  uniform float uTime;
  uniform float uIntensity;
  uniform float uDrift;

  attribute float aSeed;
  attribute float aScale;

  varying float vAlpha;

  ${POINT_SIZE}

  void main() {
    vec3 p = position;
    float t = uTime * 0.09;
    p.x += sin(t * 1.3 + aSeed * 26.0) * 0.5;
    p.y += sin(t * 0.9 + aSeed * 41.0) * 0.42 + uDrift;
    p.z += cos(t * 1.1 + aSeed * 33.0) * 0.5;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    float twinkle = 0.45 + 0.55 * sin(uTime * 0.8 + aSeed * 55.0);
    vAlpha = uIntensity * twinkle * aScale;

    gl_PointSize = pointPixels(uWorldSize * aScale, -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const dustFrag = /* glsl */ `
  precision highp float;
  uniform vec3 uColor;
  varying float vAlpha;

  ${SPRITE}

  void main() {
    float mask = sprite(gl_PointCoord, 1.0);
    mask *= mask;
    if (mask < 0.002) discard;
    gl_FragColor = vec4(uColor, mask * vAlpha);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

export class DustMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      vertexShader: dustVert,
      fragmentShader: dustFrag,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uIntensity: { value: 0.5 },
        uWorldSize: { value: 0.009 },
        uViewHeight: { value: 900 },
        uDrift: { value: 0 },
        uColor: { value: new THREE.Color('#e8c79a').convertSRGBToLinear() },
      },
    });
  }
}
