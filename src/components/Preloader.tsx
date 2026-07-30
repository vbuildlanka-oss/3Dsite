import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/device';

const WORDS = ['Sourcing', 'Roasting', 'Grinding', 'Ember & Oak'];

type Props = {
  ready: boolean;
  onDone: () => void;
};

/**
 * The preloader owns the first two seconds: it hides the WebGL warm-up, sets
 * the tone, and hands scroll control over only once the scene is drawing.
 */
export function Preloader({ ready, onDone }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLElement>(null);
  const word = useRef<HTMLSpanElement>(null);
  const curtain = useRef<HTMLDivElement>(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [done, setDone] = useState(false);
  const finished = useRef(false);

  /* Simulated load: eases to 92% then waits for the real ready signal. */
  useEffect(() => {
    const state = { v: 0 };
    const tween = gsap.to(state, {
      v: 0.92,
      duration: prefersReducedMotion() ? 0.2 : 2.1,
      ease: 'power2.out',
      onUpdate: () => {
        if (bar.current) bar.current.style.transform = `scaleX(${state.v})`;
      },
    });

    let i = 0;
    const cycle = window.setInterval(() => {
      i = Math.min(i + 1, WORDS.length - 1);
      if (!word.current) return;
      gsap
        .timeline()
        .to(word.current, { yPercent: -110, duration: 0.5, ease: 'expo.inOut' })
        .add(() => setWordIndex(i))
        .fromTo(
          word.current,
          { yPercent: 110 },
          { yPercent: 0, duration: 0.6, ease: 'expo.out' },
        );
    }, 620);

    return () => {
      tween.kill();
      window.clearInterval(cycle);
    };
  }, []);

  /* Real hand-off. */
  useEffect(() => {
    if (!ready || finished.current) return;
    finished.current = true;

    const reduced = prefersReducedMotion();
    const state = { v: 0.92 };

    const tl = gsap.timeline({
      onComplete: () => {
        setDone(true);
        onDone();
      },
    });

    tl.to(state, {
      v: 1,
      duration: reduced ? 0.1 : 0.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (bar.current) bar.current.style.transform = `scaleX(${state.v})`;
      },
    });

    if (!reduced) {
      tl.to('.loader__inner', { yPercent: -8, autoAlpha: 0, duration: 0.7, ease: 'expo.inOut' }, '+=0.15')
        .to(
          root.current,
          { yPercent: -100, duration: 1.15, ease: 'expo.inOut' },
          '-=0.35',
        )
        .fromTo(
          curtain.current,
          { yPercent: 0 },
          { yPercent: -100, duration: 1.25, ease: 'expo.inOut' },
          '<0.08',
        );
    } else {
      tl.set([root.current, curtain.current], { autoAlpha: 0 });
    }

    return () => {
      tl.kill();
    };
  }, [ready, onDone]);

  if (done) return null;

  return (
    <>
      <div className="loader" ref={root} data-done={ready} role="status" aria-live="polite">
        <div className="loader__inner">
          <h1 className="loader__word">
            <span ref={word}>{WORDS[wordIndex]}</span>
          </h1>
          <div className="loader__meta">
            <span>Ember &amp; Oak</span>
            <span>Shoreditch</span>
          </div>
          <div className="loader__bar">
            <i ref={bar} />
          </div>
        </div>
      </div>
      <div className="loader__curtain" ref={curtain} aria-hidden="true" />
    </>
  );
}
