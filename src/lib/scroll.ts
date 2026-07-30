import { clamp } from './math';

/* --------------------------------------------------------------------------
 * The timeline
 *
 * Every act is one integer unit on a single continuous timeline. The scene
 * director reads `state.tl` (e.g. 2.35 === third act, 35% through) which makes
 * cross-act choreography a plain numeric interpolation instead of a pile of
 * per-section special cases.
 * ------------------------------------------------------------------------ */

export const ACTS = ['hero', 'origin', 'roast', 'brew', 'menu', 'ritual', 'visit'] as const;
export type ActId = (typeof ACTS)[number];

export const ACT_INDEX = ACTS.reduce<Record<ActId, number>>(
  (acc, id, i) => {
    acc[id] = i;
    return acc;
  },
  {} as Record<ActId, number>,
);

type Bounds = { start: number; end: number };

export type ScrollState = {
  /** Raw page scroll in px. */
  y: number;
  /** 0..1 through the document. */
  progress: number;
  /** Continuous act-space position: actIndex + actProgress. */
  tl: number;
  /** Signed scroll velocity, normalised to roughly -1..1. */
  velocity: number;
  /** Direction of travel: 1 down, -1 up. */
  direction: 1 | -1;
  /** Currently dominant act. */
  act: ActId;
  /** 0..1 within the dominant act. */
  actT: number;
  /** Pointer position, -1..1 on both axes. */
  pointer: { x: number; y: number };
  /** Viewport. */
  vw: number;
  vh: number;
  maxScroll: number;
  /** True once the preloader has handed control over. */
  live: boolean;
};

export const scrollState: ScrollState = {
  y: 0,
  progress: 0,
  tl: 0,
  velocity: 0,
  direction: 1,
  act: 'hero',
  actT: 0,
  pointer: { x: 0, y: 0 },
  vw: 1280,
  vh: 800,
  maxScroll: 1,
  live: false,
};

const elements = new Map<ActId, HTMLElement>();
const bounds = new Map<ActId, Bounds>();

export const registerAct = (id: ActId, el: HTMLElement | null) => {
  if (el) elements.set(id, el);
  else elements.delete(id);
  measureActs();
};

export const measureActs = () => {
  if (typeof window === 'undefined') return;
  const doc = document.documentElement;
  scrollState.vw = window.innerWidth;
  scrollState.vh = window.innerHeight;
  scrollState.maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);

  const present = ACTS.filter((id) => elements.has(id));
  const tops = present.map((id) => {
    const el = elements.get(id)!;
    return el.getBoundingClientRect().top + window.scrollY;
  });

  present.forEach((id, i) => {
    const start = i === 0 ? 0 : tops[i];
    const end = i === present.length - 1 ? scrollState.maxScroll : tops[i + 1];
    bounds.set(id, { start, end: Math.max(end, start + 1) });
  });
};

/** Progress-space position of an act boundary, useful for nav dots. */
export const actBounds = (id: ActId): Bounds | undefined => bounds.get(id);

const EPS = 1e-4;

export const updateTimeline = (y: number) => {
  const prev = scrollState.y;
  scrollState.y = y;
  scrollState.progress = clamp(y / scrollState.maxScroll);
  if (Math.abs(y - prev) > EPS) scrollState.direction = y > prev ? 1 : -1;

  const present = ACTS.filter((id) => bounds.has(id));
  if (!present.length) {
    scrollState.tl = scrollState.progress * (ACTS.length - 1);
    return;
  }

  let tl = 0;
  let act: ActId = present[0];
  let actT = 0;

  for (let i = 0; i < present.length; i++) {
    const id = present[i];
    const b = bounds.get(id)!;
    if (y >= b.start && y < b.end) {
      actT = clamp((y - b.start) / (b.end - b.start));
      tl = ACT_INDEX[id] + actT;
      act = id;
      break;
    }
    if (i === present.length - 1) {
      actT = 1;
      tl = ACT_INDEX[id] + 1;
      act = id;
    }
  }

  scrollState.tl = tl;
  scrollState.act = act;
  scrollState.actT = actT;
};

export const setVelocity = (v: number) => {
  scrollState.velocity = clamp(v / 45, -1, 1);
};

export const setPointer = (x: number, y: number) => {
  scrollState.pointer.x = x;
  scrollState.pointer.y = y;
};

export const setLive = (live: boolean) => {
  scrollState.live = live;
};

/** Scroll offset (px) of the start of an act — used by nav anchors. */
export const actScrollTarget = (id: ActId) => bounds.get(id)?.start ?? 0;
