export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Frame-rate independent exponential smoothing. */
export const damp = (current: number, target: number, lambda: number, dt: number) =>
  lerp(current, target, 1 - Math.exp(-lambda * dt));

export const remap = (v: number, inMin: number, inMax: number, outMin = 0, outMax = 1) => {
  if (inMax - inMin === 0) return outMin;
  return outMin + ((v - inMin) / (inMax - inMin)) * (outMax - outMin);
};

/** remap + clamp, the workhorse of scroll choreography. */
export const range = (v: number, inMin: number, inMax: number, outMin = 0, outMax = 1) =>
  clamp(remap(v, inMin, inMax, outMin, outMax), Math.min(outMin, outMax), Math.max(outMin, outMax));

export const smoothstep = (t: number) => {
  const x = clamp(t);
  return x * x * (3 - 2 * x);
};

export const smootherstep = (t: number) => {
  const x = clamp(t);
  return x * x * x * (x * (x * 6 - 15) + 10);
};

export const easeOutCubic = (t: number) => 1 - Math.pow(1 - clamp(t), 3);

export const easeInOutCubic = (t: number) => {
  const x = clamp(t);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

/** A 0→1→0 pulse across [start, end] with soft shoulders. */
export const pulse = (v: number, start: number, end: number, fade = 0.18) => {
  const span = end - start;
  if (span <= 0) return 0;
  const t = (v - start) / span;
  if (t <= 0 || t >= 1) return 0;
  return smoothstep(Math.min(t / fade, (1 - t) / fade));
};

/** Cheap deterministic pseudo-random, stable across reloads. */
export const rand = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

export const randRange = (seed: number, min: number, max: number) => min + rand(seed) * (max - min);
