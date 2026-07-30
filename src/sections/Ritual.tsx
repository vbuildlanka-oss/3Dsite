import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useAct } from '@/hooks/useAct';
import { useReveal } from '@/hooks/useReveal';
import { Marquee } from '@/components/Marquee';
import { prefersReducedMotion } from '@/lib/device';
import { MARQUEE_ITEMS, PLATES } from '@/content/site';

/**
 * The ritual: a horizontally scrubbed gallery. The panel is held with CSS
 * `position: sticky` rather than a ScrollTrigger pin — no pin-spacer is
 * injected, so the document height stays stable and the act boundaries the
 * WebGL timeline measured earlier remain valid.
 */
export function Ritual() {
  const act = useAct('ritual');
  const scope = useReveal<HTMLElement>();
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapEl = wrap.current;
    const trackEl = track.current;
    if (!wrapEl || !trackEl || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const distance = () => Math.max(0, trackEl.scrollWidth - window.innerWidth + 48);

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: wrapEl,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.7,
          invalidateOnRefresh: true,
        },
      });

      tl.to(trackEl, { x: () => -distance() }, 0);
      // Art drifts against the track: cheap, convincing parallax inside frames.
      tl.fromTo(trackEl.querySelectorAll('.plate__art'), { xPercent: -7 }, { xPercent: 7 }, 0);

      ScrollTrigger.refresh();
    }, wrapEl);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="ritual"
      id="ritual"
      ref={(el) => {
        act(el);
        scope.current = el;
      }}
      aria-label="The ritual"
    >
      <div className="ritual__marquee">
        <Marquee items={MARQUEE_ITEMS} duration={38} />
      </div>

      <figure className="quote shell">
        <blockquote data-reveal="lines">
          <span className="split">
            <span className="split__line">
              <span className="split__inner">Coffee is agriculture, not alchemy.</span>
            </span>
            <span className="split__line">
              <span className="split__inner">
                <em>Our job is to get out of its way.</em>
              </span>
            </span>
          </span>
        </blockquote>
        <figcaption data-reveal="fade">Marta Oyelaran — Head Roaster</figcaption>
      </figure>

      <div className="ritual__track-wrap" ref={wrap}>
        <div className="ritual__pin">
          <div className="ritual__track" ref={track}>
            {PLATES.map((plate) => (
              <figure className="plate" key={plate.title} data-cursor="Look">
                <div className="plate__art">
                  <div className={`art ${plate.art}`} />
                </div>
                <figcaption className="plate__cap">
                  <h3>{plate.title}</h3>
                  <p>{plate.body}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>

      <div className="ritual__marquee">
        <Marquee items={[...MARQUEE_ITEMS].reverse()} duration={46} reverse />
      </div>
    </section>
  );
}
