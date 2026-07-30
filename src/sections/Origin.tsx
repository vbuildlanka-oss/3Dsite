import { useCallback } from 'react';
import { useAct } from '@/hooks/useAct';
import { useReveal } from '@/hooks/useReveal';
import { SplitText } from '@/components/SplitText';
import { LOTS } from '@/content/site';

/** Where the coffee comes from: a sticky thesis beside three lot cards. */
export function Origin() {
  const act = useAct('origin');
  const scope = useReveal<HTMLElement>();

  // Pointer-tracked highlight on each card, written straight to CSS vars.
  const onMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
  }, []);

  return (
    <section
      className="section origin"
      id="origin"
      ref={(el) => {
        act(el);
        scope.current = el;
      }}
      aria-labelledby="origin-title"
    >
      <div className="shell origin__grid">
        <div className="origin__sticky">
          <div className="section__head">
            <span className="label">Origin</span>
          </div>

          <h2 className="origin__title" id="origin-title">
            <SplitText lines={['Three farms.', <>One <em>obsession</em>.</>]} />
          </h2>

          <p className="lead" data-reveal="fade" data-reveal-delay={0.15}>
            We buy small — sixty to two hundred kilos at a time — from producers we can
            call by name. Everything we pour is traceable to a single harvest, a single
            washing station, and a price we are happy to print on the bag.
          </p>

          <p className="prose" data-reveal="fade" data-reveal-delay={0.25}>
            Lots rotate as they peak. When one is gone it is gone, and something else
            takes the grinder.
          </p>
        </div>

        <ul className="origin__lots">
          {LOTS.map((lot, i) => (
            <li
              key={lot.id}
              className="lot"
              data-reveal="scale"
              data-reveal-delay={i * 0.06}
              onPointerMove={onMove}
            >
              <div className="lot__body">
                <h3 className="lot__name">
                  {lot.origin}
                  <small>
                    {lot.farm} · {lot.process} · {lot.altitude}
                  </small>
                </h3>

                <ul className="lot__notes">
                  {lot.notes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>

                <div className="lot__meter">
                  {lot.metrics.map((m) => (
                    <div className="lot__meter-row" key={m.label}>
                      <span>{m.label}</span>
                      <span className="lot__meter-track">
                        <i data-reveal="meter" data-v={m.value} />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
