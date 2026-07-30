import * as THREE from 'three';

/* --------------------------------------------------------------------------
 * Procedural material maps.
 *
 * Smooth analytic geometry is what makes CG surfaces read as fake: real
 * ceramic has orange-peel in the glaze, real beans have pitted skin. Rather
 * than ship texture files, we bake value-noise height fields once at startup
 * and derive normal + roughness maps from them. Everything is cached, so a
 * given map is generated a single time regardless of how many meshes ask.
 * ------------------------------------------------------------------------ */

const hash = (x: number, y: number, seed: number) => {
  const n = Math.sin(x * 127.1 + y * 311.7 + seed * 74.7) * 43758.5453123;
  return n - Math.floor(n);
};

const smooth = (t: number) => t * t * (3 - 2 * t);

const valueNoise = (x: number, y: number, seed: number) => {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = smooth(x - xi);
  const yf = smooth(y - yi);
  const a = hash(xi, yi, seed);
  const b = hash(xi + 1, yi, seed);
  const c = hash(xi, yi + 1, seed);
  const d = hash(xi + 1, yi + 1, seed);
  return (a * (1 - xf) + b * xf) * (1 - yf) + (c * (1 - xf) + d * xf) * yf;
};

type FieldOptions = {
  size: number;
  /** Noise cells across the tile at the first octave. */
  frequency: number;
  octaves: number;
  seed: number;
  /** Push the field toward pits (< 0.5) or peaks (> 0.5). */
  bias?: number;
  contrast?: number;
};

/** Tiling fbm height field in [0,1]. */
const heightField = ({
  size,
  frequency,
  octaves,
  seed,
  bias = 0.5,
  contrast = 1,
}: FieldOptions) => {
  const data = new Float32Array(size * size);
  let min = Infinity;
  let max = -Infinity;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let v = 0;
      let amp = 0.5;
      let freq = frequency;
      for (let o = 0; o < octaves; o++) {
        // Sampling on a torus keeps the tile seamless.
        const u = (x / size) * freq;
        const w = (y / size) * freq;
        v +=
          amp *
          (valueNoise(u, w, seed + o) * 0.5 +
            valueNoise(u + freq, w + freq, seed + o * 7) * 0.5);
        amp *= 0.5;
        freq *= 2;
      }
      data[y * size + x] = v;
      if (v < min) min = v;
      if (v > max) max = v;
    }
  }

  const span = max - min || 1;
  for (let i = 0; i < data.length; i++) {
    const n = (data[i] - min) / span;
    data[i] = Math.min(1, Math.max(0, Math.pow(n, contrast) * (bias * 2)));
  }
  return data;
};

const finish = (tex: THREE.Texture, repeat: number) => {
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeat, repeat);
  tex.needsUpdate = true;
  return tex;
};

/** Normal map derived from a height field by central differences. */
const normalFromHeight = (height: Float32Array, size: number, strength: number) => {
  const data = new Uint8Array(size * size * 4);
  const at = (x: number, y: number) => height[((y + size) % size) * size + ((x + size) % size)];

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = (at(x + 1, y) - at(x - 1, y)) * strength;
      const dy = (at(x, y + 1) - at(x, y - 1)) * strength;
      // Normalise (-dx, -dy, 1)
      const len = Math.sqrt(dx * dx + dy * dy + 1);
      const i = (y * size + x) * 4;
      data[i] = ((-dx / len) * 0.5 + 0.5) * 255;
      data[i + 1] = ((-dy / len) * 0.5 + 0.5) * 255;
      data[i + 2] = (1 / len) * 0.5 * 255 + 127;
      data[i + 3] = 255;
    }
  }

  const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  tex.colorSpace = THREE.NoColorSpace;
  return tex;
};

/** Single-channel map (roughness / AO) written into all three channels. */
const grayFromHeight = (height: Float32Array, size: number, low: number, high: number) => {
  const data = new Uint8Array(size * size * 4);
  for (let i = 0; i < height.length; i++) {
    const v = (low + (high - low) * height[i]) * 255;
    data[i * 4] = v;
    data[i * 4 + 1] = v;
    data[i * 4 + 2] = v;
    data[i * 4 + 3] = 255;
  }
  const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  tex.colorSpace = THREE.NoColorSpace;
  return tex;
};

export type SurfaceMaps = {
  normalMap: THREE.Texture;
  roughnessMap: THREE.Texture;
};

const cache = new Map<string, SurfaceMaps>();

type SurfaceRecipe = FieldOptions & {
  normalStrength: number;
  roughLow: number;
  roughHigh: number;
  repeat: number;
};

const RECIPES: Record<string, SurfaceRecipe> = {
  /** Glaze orange-peel: very fine, very shallow. */
  ceramic: {
    size: 256,
    frequency: 12,
    octaves: 4,
    seed: 11,
    contrast: 1.1,
    normalStrength: 2.6,
    roughLow: 0.3,
    roughHigh: 0.5,
    repeat: 6,
  },
  /** Bean skin: pitted, with visible pores. */
  bean: {
    size: 256,
    frequency: 22,
    octaves: 5,
    seed: 29,
    bias: 0.55,
    contrast: 1.5,
    normalStrength: 13,
    roughLow: 0.52,
    roughHigh: 0.72,
    repeat: 2,
  },
  /** Poured concrete counter: broad mottling plus fine grain. */
  concrete: {
    size: 256,
    frequency: 7,
    octaves: 5,
    seed: 47,
    contrast: 1.2,
    normalStrength: 3.2,
    roughLow: 0.72,
    roughHigh: 0.96,
    repeat: 16,
  },
  /** Brushed metal: handled separately for the anisotropic streaks. */
  metal: {
    size: 256,
    frequency: 4,
    octaves: 3,
    seed: 71,
    contrast: 1,
    normalStrength: 1.8,
    roughLow: 0.16,
    roughHigh: 0.32,
    repeat: 2,
  },
};

export const surfaceMaps = (kind: keyof typeof RECIPES): SurfaceMaps => {
  const hit = cache.get(kind);
  if (hit) return hit;

  const recipe = RECIPES[kind];
  const height = heightField(recipe);

  // Brushed metal wants directional streaks, so smear the field along X.
  if (kind === 'metal') {
    const { size } = recipe;
    const smeared = new Float32Array(height.length);
    const span = 9;
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        let sum = 0;
        for (let k = -span; k <= span; k++) sum += height[y * size + ((x + k + size) % size)];
        smeared[y * size + x] = sum / (span * 2 + 1);
      }
    }
    height.set(smeared);
  }

  const maps: SurfaceMaps = {
    normalMap: finish(normalFromHeight(height, recipe.size, recipe.normalStrength), recipe.repeat),
    roughnessMap: finish(
      grayFromHeight(height, recipe.size, recipe.roughLow, recipe.roughHigh),
      recipe.repeat,
    ),
  };

  cache.set(kind, maps);
  return maps;
};

export const disposeSurfaces = () => {
  cache.forEach(({ normalMap, roughnessMap }) => {
    normalMap.dispose();
    roughnessMap.dispose();
  });
  cache.clear();
};
