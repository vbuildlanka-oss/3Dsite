import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useAct } from '@/hooks/useAct';
import { scrollTo } from '@/hooks/useSmoothScroll';
import { actScrollTarget } from '@/lib/scroll';
import { prefersReducedMotion } from '@/lib/device';
import { MagneticButton } from '@/components/MagneticButton';
import { SplitChars } from '@/components/SplitText';
import { BRAND } from '@/content/site';

type Props = { start: boolean };

/**
 * The open. Type is set in two rows with a deliberate hole in the second so the
 * cup can sit inside the wordmark rather than behind it.
 */
export function Hero({ start }: Props) {
  const act = useAct('hero');
  const root = useRef<HTMLDivElement>(null);
  const played = useRef(false);

  useEffect(() => {
    if (!start || played.current || !root.current) return;
    played.current = true;

    // Nothing to do for reduced motion: `from` tweens are the only thing that
    // would hide the copy, so skipping them leaves the hero fully visible.
    if (prefersReducedMotion()) return;

    const ctx = gsap.context((self) => {
      const q = self.selector!;
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      tl.from(q('.hero__eyebrow'), { autoAlpha: 0, y: 18, duration: 1 })
        .from(
          q('.hero__title .split__char'),
          { yPercent: 118, autoAlpha: 0, duration: 1.5, stagger: 0.045 },
          '-=0.7',
        )
        .from(q('.hero__sub'), { autoAlpha: 0, y: 24, duration: 1.2 }, '-=1.05')
        .from(
          q('.hero__foot > *'),
          { autoAlpha: 0, y: 22, duration: 1.1, stagger: 0.09 },
          '-=0.95',
        );
    }, root);

    return () => ctx.revert();
  }, [start]);

  return (
    <section className="hero shell" id="hero" ref={act} aria-label="Ember and Oak">
      <div ref={root} style={{ display: 'contents' }}>
        <div className="hero__type">
          <p className="hero__eyebrow">
            <span className="label">Micro-roastery · Est. {BRAND.est} · Shoreditch</span>
          </p>

          <h1 className="hero__title">
            <span className="row">
              <SplitChars text="EMBER" reveal={false} />
            </span>
            <span className="row row--split">
              <SplitChars text="&" reveal={false} as="em" />
              <SplitChars text="OAK" reveal={false} />
            </span>
          </h1>

          <p className="hero__sub">
            Eleven minutes on the drum, four days of rest, then ninety seconds of your
            undivided attention.
          </p>
        </div>

        <div className="hero__foot">
          <div className="hero__meta">
            <span>{BRAND.coords}</span>
            <span>
              Today <strong>07:00 — 18:00</strong>
            </span>
          </div>

          <button
            type="button"
            className="hint"
            data-cursor="Scroll"
            onClick={() => scrollTo(actScrollTarget('origin'))}
            aria-label="Scroll to the origin section"
          >
            <span className="label">Scroll to begin</span>
            <span className="hint__line" aria-hidden="true" />
          </button>

          <MagneticButton
            variant="outline"
            data-cursor="Menu"
            onClick={() => scrollTo(actScrollTarget('menu'))}
          >
            See the menu
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
