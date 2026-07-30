export type PerfTier = 'low' | 'mid' | 'high';

const query = (q: string) => typeof window !== 'undefined' && window.matchMedia(q).matches;

export const prefersReducedMotion = () => query('(prefers-reduced-motion: reduce)');

export const isTouch = () => query('(hover: none)') || query('(pointer: coarse)');

let cachedTier: PerfTier | null = null;

/**
 * Conservative capability probe. We only look at signals that are cheap and
 * available synchronously — never block first paint to measure the GPU.
 */
export const perfTier = (): PerfTier => {
  if (cachedTier) return cachedTier;
  if (typeof window === 'undefined') return 'mid';

  const cores = navigator.hardwareConcurrency ?? 4;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const narrow = window.innerWidth < 760;
  const dpr = window.devicePixelRatio || 1;

  let score = 0;
  score += cores >= 8 ? 2 : cores >= 4 ? 1 : 0;
  score += mem >= 8 ? 2 : mem >= 4 ? 1 : 0;
  score += narrow ? 0 : 1;
  score += dpr > 2.5 ? 0 : 1;

  cachedTier = score >= 5 ? 'high' : score >= 3 ? 'mid' : 'low';
  return cachedTier;
};

export const sceneQuality = () => {
  const tier = perfTier();
  const reduced = prefersReducedMotion();
  return {
    tier,
    reduced,
    dpr: (tier === 'high' ? [1, 1.75] : tier === 'mid' ? [1, 1.4] : [0.85, 1]) as [number, number],
    postFx: tier !== 'low' && !reduced,
    /* Real shadow maps and AO are the two biggest realism levers, so they are
       the last things to go — but they are also the most expensive. */
    shadows: tier !== 'low',
    ao: tier === 'high' || tier === 'mid',
    shadowMapSize: tier === 'high' ? 2048 : 1024,
    beanCount: tier === 'high' ? 220 : tier === 'mid' ? 130 : 60,
    steamCount: tier === 'high' ? 1900 : tier === 'mid' ? 1000 : 340,
    emberCount: tier === 'high' ? 420 : tier === 'mid' ? 240 : 110,
    dustCount: tier === 'high' ? 700 : tier === 'mid' ? 380 : 160,
    cupSegments: tier === 'low' ? 40 : tier === 'mid' ? 80 : 128,
  };
};
