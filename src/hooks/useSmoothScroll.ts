import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { measureActs, setPointer, setVelocity, updateTimeline } from '@/lib/scroll';
import { prefersReducedMotion } from '@/lib/device';

let lenisInstance: Lenis | null = null;

export const getLenis = () => lenisInstance;

export const scrollTo = (target: number | string, offset = 0) => {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset, duration: 1.6, lock: false });
    return;
  }
  const el = typeof target === 'string' ? document.querySelector(target) : null;
  const top =
    typeof target === 'number' ? target : (el?.getBoundingClientRect().top ?? 0) + window.scrollY;
  window.scrollTo({ top: top + offset, behavior: 'smooth' });
};

export const lockScroll = (locked: boolean) => {
  document.body.dataset.locked = String(locked);
  if (!lenisInstance) return;
  if (locked) lenisInstance.stop();
  else lenisInstance.start();
};

/**
 * Single source of truth for scrolling: Lenis drives the native scroll
 * position, GSAP's ticker drives Lenis, and ScrollTrigger listens to Lenis so
 * pinned DOM sections stay in lockstep with the WebGL timeline.
 */
export const useSmoothScroll = () => {
  const ready = useRef(false);

  useEffect(() => {
    if (ready.current) return;
    ready.current = true;

    const reduced = prefersReducedMotion();

    const lenis = new Lenis({
      autoRaf: false,
      lerp: reduced ? 1 : 0.085,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      syncTouch: false,
      gestureOrientation: 'vertical',
      anchors: false,
    });
    lenisInstance = lenis;
    document.documentElement.classList.add('lenis');

    lenis.on('scroll', (e: Lenis) => {
      updateTimeline(e.scroll);
      setVelocity(e.velocity);
      ScrollTrigger.update();
    });

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const onPointerMove = (e: PointerEvent) => {
      setPointer((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1));
    };

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        lenis.resize();
        measureActs();
        updateTimeline(lenis.scroll);
        ScrollTrigger.refresh();
      }, 140);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('resize', onResize);

    // Fonts change layout height — re-measure once they land.
    document.fonts?.ready.then(() => {
      measureActs();
      ScrollTrigger.refresh();
    });

    measureActs();
    updateTimeline(lenis.scroll);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      window.clearTimeout(resizeTimer);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisInstance = null;
      document.documentElement.classList.remove('lenis');
      ready.current = false;
    };
  }, []);
};
