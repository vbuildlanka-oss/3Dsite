import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { isTouch, prefersReducedMotion } from '@/lib/device';

/**
 * Difference-blended cursor with a lagging ring. Any element carrying
 * `data-cursor="label"` swells the ring and prints its label inside.
 */
export function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('');
  const [hot, setHot] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(!isTouch());
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const el = root.current;
    const ringEl = ring.current;
    if (!el || !ringEl) return;

    const fast = prefersReducedMotion() ? 0 : 0.14;
    const x = gsap.quickTo(el, 'x', { duration: fast, ease: 'power2.out' });
    const y = gsap.quickTo(el, 'y', { duration: fast, ease: 'power2.out' });
    const rx = gsap.quickTo(ringEl, 'x', { duration: fast * 4.5, ease: 'power2.out' });
    const ry = gsap.quickTo(ringEl, 'y', { duration: fast * 4.5, ease: 'power2.out' });

    let last = { x: 0, y: 0 };

    const onMove = (e: PointerEvent) => {
      x(e.clientX);
      y(e.clientY);
      rx((e.clientX - last.x) * 0.06);
      ry((e.clientY - last.y) * 0.06);
      last = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e: PointerEvent) => {
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-cursor]');
      if (target) {
        setHot(true);
        setLabel(target.dataset.cursor || '');
      } else {
        setHot(false);
        setLabel('');
      }
    };

    const onDown = () => gsap.to(ringEl, { scale: 0.78, duration: 0.25, ease: 'power2.out' });
    const onUp = () => gsap.to(ringEl, { scale: 1, duration: 0.4, ease: 'power2.out' });
    const onLeaveWindow = () => gsap.to(el, { autoAlpha: 0, duration: 0.3 });
    const onEnterWindow = () => gsap.to(el, { autoAlpha: 1, duration: 0.3 });

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    document.addEventListener('pointerleave', onLeaveWindow);
    document.addEventListener('pointerenter', onEnterWindow);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('pointerleave', onLeaveWindow);
      document.removeEventListener('pointerenter', onEnterWindow);
      gsap.killTweensOf([el, ringEl]);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="cursor" ref={root} data-hot={hot} aria-hidden="true">
      <div className="cursor__ring" ref={ring} />
      <div className="cursor__dot" />
      <span className="cursor__label">{label}</span>
    </div>
  );
}
