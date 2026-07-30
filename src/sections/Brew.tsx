import { useState } from 'react';
import { useAct } from '@/hooks/useAct';
import { useReveal } from '@/hooks/useReveal';
import { useTicker } from '@/hooks/useTicker';
import { SplitText } from '@/components/SplitText';
import { scrollState } from '@/lib/scroll';
import { BREW_WINDOW } from '@/three/stage';
import { range } from '@/lib/math';
import { BREW_SPEC, BREW_STEPS } from '@/content/site';

/**
 * The brew. Pinned while the cup fills in WebGL — the active step is derived
 * from the same scroll position that drives the pour, so copy and liquid can
 * never drift out of sync.
 */
export function Brew() {
  const act = useAct('brew');
  const scope = useReveal<HTMLElement>();
  const [active, setActive] = useState(0);

  useTicker(() => {
    const p = range(scrollState.tl, BREW_WINDOW[0], BREW_WINDOW[1]);
    const next = Math.min(BREW_STEPS.length - 1, Math.floor(p * BREW_STEPS.length));
    if (next !== active) setActive(next);
  });

  return (
    <section
      className="brew"
      id="brew"
      ref={(el) => {
        act(el);
        scope.current = el;
      }}
      aria-labelledby="brew-title"
    >
      <div className="brew__pin">
        <div className="shell brew__inner">
          <div>
            <div className="section__head">
              <span className="label">Brew</span>
            </div>

            <h2 className="panel-title" id="brew-title" style={{ marginBottom: '1.6rem' }}>
              <SplitText lines={['The pour is', <>a <em>ritual</em></>]} />
            </h2>

            <ol className="brew__steps">
              {BREW_STEPS.map((step, i) => (
                <li className="brew__step" key={step.title} data-on={i === active}>
                  <span className="brew__step-mark" aria-hidden="true" />
                  <div>
                    <h3 className="brew__step-title">{step.title}</h3>
                    <p className="brew__step-body">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="brew__aside">
            <dl className="brew__spec" data-reveal="scale">
              {BREW_SPEC.map((s) => (
                <div key={s.label}>
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>

            <p className="prose" data-reveal="fade" data-reveal-delay={0.1}>
              Every recipe on the bar is written on the bag. Take it home, weigh it out,
              and if it does not taste like it did here, come back and we will fix it
              with you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
