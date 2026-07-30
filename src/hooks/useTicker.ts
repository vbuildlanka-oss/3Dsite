import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

type TickFn = (time: number, deltaMs: number) => void;

/**
 * Runs a callback on GSAP's ticker — the same clock that drives Lenis and
 * ScrollTrigger — so DOM readouts never fight the scroll loop for frames.
 * The callback is kept in a ref so consumers can close over fresh values
 * without re-subscribing.
 */
export const useTicker = (fn: TickFn, enabled = true) => {
  const ref = useRef(fn);
  ref.current = fn;

  useEffect(() => {
    if (!enabled) return;
    const tick = (time: number, delta: number) => ref.current(time, delta);
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, [enabled]);
};
