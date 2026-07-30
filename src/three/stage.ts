import { clamp, damp, lerp, range } from '@/lib/math';
import { scrollState } from '@/lib/scroll';

/**
 * A window function on the timeline: ramps up over [a,b], holds, ramps down
 * over [c,d]. Every object's presence is expressed this way, which keeps the
 * whole film readable in one place instead of scattered `if (act === ...)`.
 */
const win = (v: number, a: number, b: number, c: number, d: number) =>
  Math.min(range(v, a, b), 1 - range(v, c, d));

export type Stage = {
  /** Damped timeline position, in act units. */
  tl: number;
  /** Un-damped timeline position. */
  tlRaw: number;
  /** Smoothed scroll velocity, -1..1. */
  vel: number;
  time: number;
  dt: number;
  aspect: number;
  narrow: boolean;
  /** Damped pointer, -1..1. */
  px: number;
  py: number;

  /* Presence + parameters, all 0..1 unless noted. */
  cup: number;
  trio: number;
  fill: number;
  crema: number;
  steam: number;
  pour: number;
  pourLen: number;
  /** Kettle presence — arrives before the pour, leaves after. */
  kettle: number;
  /** Pour spiral offset. Kettle and stream both read these so they stay welded. */
  pourX: number;
  pourZ: number;
  beans: number;
  heroBean: number;
  roast: number;
  embers: number;
  dust: number;
  floor: number;
  glow: number;
  /**
   * Horizontal framing of the subject as a fraction of the visible half-width
   * (0 = centred, 1 = at the frame edge). Rig converts it to world units using
   * the live shot, so the subject lands in the same place on every screen.
   */
  subjectShift: number;
  /** World-space offset of the subject group, resolved by the Rig. */
  subjectX: number;
  subjectY: number;
};

export const stage: Stage = {
  tl: 0,
  tlRaw: 0,
  vel: 0,
  time: 0,
  dt: 0.016,
  aspect: 1.6,
  narrow: false,
  px: 0,
  py: 0,
  cup: 1,
  trio: 0,
  subjectShift: 0,
  fill: 0.86,
  crema: 1,
  steam: 1,
  pour: 0,
  pourLen: 0,
  kettle: 0,
  pourX: 0,
  pourZ: 0,
  beans: 0,
  heroBean: 0,
  roast: 0,
  embers: 0,
  dust: 0.4,
  floor: 1,
  glow: 0.6,
  subjectX: 0,
  subjectY: 0,
};

/**
 * Timeline window the roast animates across. Exported so the DOM read-outs can
 * derive the same value straight from the scroll position — the roast log stays
 * correct even if WebGL never starts.
 */
export const ROAST_WINDOW: [number, number] = [2.02, 2.92];

/** Timeline window the four brew steps are distributed across. */
export const BREW_WINDOW: [number, number] = [3.04, 3.86];

export const updateStage = (elapsed: number, delta: number, aspect: number) => {
  const dt = Math.min(delta, 1 / 20);
  stage.dt = dt;
  stage.time = elapsed;
  stage.aspect = aspect;
  stage.narrow = scrollState.vw < 900;

  stage.tlRaw = scrollState.tl;
  // Damping the timeline is what turns a jittery wheel into a camera move.
  stage.tl = damp(stage.tl, scrollState.tl, 7.5, dt);
  stage.vel = damp(stage.vel, scrollState.velocity, 5, dt);

  const pointerGain = stage.narrow ? 0.25 : 1;
  stage.px = damp(stage.px, scrollState.pointer.x * pointerGain, 3.2, dt);
  stage.py = damp(stage.py, scrollState.pointer.y * pointerGain, 3.2, dt);

  const tl = stage.tl;

  /* --- Hero cup: present at the open, returns for the brew and stays ------ */
  const cupIntro = 1 - range(tl, 0.7, 0.98);
  const cupReturn = range(tl, 2.72, 3.02);
  stage.cup = Math.max(cupIntro, cupReturn);

  stage.trio = win(tl, 3.85, 4.18, 4.82, 5.12);

  /* --- Liquid: full at the open, emptied and re-poured during the brew --- */
  const brewFill = range(tl, 3.14, 3.62, 0.05, 0.94);
  stage.fill = tl < 2.2 ? 0.86 : brewFill;
  stage.crema = tl < 2.2 ? 1 : range(tl, 3.3, 3.8, 0.1, 1);

  stage.pour = win(tl, 3.04, 3.15, 3.5, 3.62);
  stage.pourLen = range(tl, 3.04, 3.2);
  stage.kettle = win(tl, 2.9, 3.06, 3.6, 3.82);

  // The barista's spiral: a slow circle over the bed, widening then closing.
  const spiral = 0.155 * stage.pour * (0.55 + 0.45 * Math.sin(elapsed * 0.5));
  stage.pourX = Math.cos(elapsed * 2.3) * spiral;
  stage.pourZ = Math.sin(elapsed * 2.3) * spiral;

  stage.steam = stage.cup * clamp(0.18 + stage.fill * 1.05) * (1 - stage.pour * 0.35);

  /* --- Beans: the origin field, plus a lighter reprise in the ritual ----- */
  stage.beans = Math.max(win(tl, 0.32, 0.86, 1.7, 2.0), win(tl, 4.7, 5.1, 5.9, 6.2) * 0.75);

  stage.heroBean = win(tl, 1.7, 2.06, 2.86, 3.08);
  stage.roast = range(tl, ROAST_WINDOW[0], ROAST_WINDOW[1]);
  stage.embers = win(tl, 2.12, 2.4, 2.88, 3.1);

  stage.dust = 0.35 + 0.45 * win(tl, 4.3, 5.0, 6.1, 6.5);

  /* --- Framing ----------------------------------------------------------- */
  const offsetGain = stage.narrow ? 0 : clamp(range(stage.aspect, 1.1, 1.6, 0.4, 1));
  const push = range(tl, 1.55, 2.1);
  const pull = 1 - range(tl, 3.5, 3.98);
  stage.subjectShift = 0.46 * push * pull * offsetGain;
  stage.subjectY = -1.55 * win(tl, 3.86, 4.22, 4.86, 5.18);

  stage.glow = 0.45 + 0.55 * stage.embers + 0.25 * stage.cup;
  stage.floor = lerp(1, 0.35, range(tl, 4.6, 5.4));
};
