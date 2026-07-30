import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { isTouch, prefersReducedMotion } from '@/lib/device';

/** Pointer-attracted element: the button leans toward the cursor, then settles. */
export const useMagnetic = <T extends HTMLElement = HTMLButtonElement>(strength = 0.32) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || isTouch() || prefersReducedMotion()) return;

    const to = gsap.quickTo(el, 'x', { duration: 0.7, ease: 'power3.out' });
    const toY = gsap.quickTo(el, 'y', { duration: 0.7, ease: 'power3.out' });

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      to((e.clientX - (r.left + r.width / 2)) * strength);
      toY((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const onLeave = () => {
      to(0);
      toY(0);
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      gsap.killTweensOf(el);
    };
  }, [strength]);

  return ref;
};
