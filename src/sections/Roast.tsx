import { useEffect, useRef, useState } from 'react';
import { useAct } from '@/hooks/useAct';
import { useTicker } from '@/hooks/useTicker';
import { useReveal } from '@/hooks/useReveal';
import { SplitText } from '@/components/SplitText';
import { scrollState } from '@/lib/scroll';
import { ROAST_WINDOW } from '@/three/stage';
import { lerp, range } from '@/lib/math';
import { PHASES } from '@/content/site';

const CURVE = 'M 8 232 C 96 226, 138 196, 196 150 S 300 78, 384 54 S 520 34, 592 30';

/**
 * The roast. Pinned for four viewport heights while the bean darkens in WebGL.
 * The DOM side is a roast log — temperature, phase and a self-drawing curve —
 * derived from the same scroll position, so the two can never disagree.
 */
export function Roast() {
  const act = useAct('roast');
  const scope = useReveal<HTMLElement>();

  const live = useRef<SVGPathElement>(null);
  const head = useRef<SVGCircleElement>(null);
  const length = useRef(0);

  const [temp, setTemp] = useState(PHASES[0].temp);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const path = live.current;
    if (!path) return;
    length.current = path.getTotalLength();
    path.style.strokeDasharray = `${length.current}`;
    path.style.strokeDashoffset = `${length.current}`;
  }, []);

  useTicker(() => {
    const p = range(scrollState.tl, ROAST_WINDOW[0], ROAST_WINDOW[1]);

    // Interpolate temperature between the two phases bracketing this progress.
    let i = 0;
    for (let k = 0; k < PHASES.length; k++) if (p >= PHASES[k].at) i = k;
    const a = PHASES[i];
    const b = PHASES[i + 1] ?? a;
    const t = b.at === a.at ? 1 : (p - a.at) / (b.at - a.at);
    const nextTemp = Math.round(lerp(a.temp, b.temp, Math.min(1, Math.max(0, t))));

    if (nextTemp !== temp) setTemp(nextTemp);
    if (i !== index) setIndex(i);

    const path = live.current;
    const len = length.current;
    if (!path || !len) return;

    path.style.strokeDashoffset = `${len * (1 - p)}`;
    if (head.current) {
      const pt = path.getPointAtLength(len * p);
      head.current.setAttribute('cx', `${pt.x}`);
      head.current.setAttribute('cy', `${pt.y}`);
      head.current.style.opacity = p > 0.004 && p < 0.998 ? '1' : '0';
    }
  });

  const phase = PHASES[index];

  return (
    <section
      className="roast"
      id="roast"
      ref={(el) => {
        act(el);
        scope.current = el;
      }}
      aria-labelledby="roast-title"
    >
      <div className="roast__pin">
        <div className="shell roast__stack">
          <div className="roast__panel scrim">
            <div className="roast__readout">
              <div className="section__head">
                <span className="label">Roast</span>
              </div>

              <h2 className="panel-title" id="roast-title">
                <SplitText lines={['Eleven minutes', <>of <em>judgement</em></>]} />
              </h2>

              <div className="roast__temp" aria-hidden="true">
                {temp}
                <sup>°C</sup>
              </div>

              <p className="roast__stage">
                <span className="sr-only">Current phase: </span>
                {phase.time} · {phase.name}
              </p>
              <p className="roast__desc" aria-live="polite">
                {phase.copy}
              </p>
            </div>

            <div className="roast__curve" data-reveal="fade">
              <svg viewBox="0 0 600 260" role="img" aria-label="Roast temperature curve">
                <defs>
                  <linearGradient id="emberStroke" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stopColor="#b7551f" />
                    <stop offset="55%" stopColor="#e0803c" />
                    <stop offset="100%" stopColor="#f6d9a8" />
                  </linearGradient>
                </defs>

                {[0, 1, 2, 3].map((r) => (
                  <line
                    key={r}
                    x1="8"
                    x2="592"
                    y1={30 + r * 67}
                    y2={30 + r * 67}
                    stroke="currentColor"
                    strokeWidth="1"
                    opacity="0.09"
                  />
                ))}

                <path className="roast__curve-path" d={CURVE} />
                <path className="roast__curve-live" ref={live} d={CURVE} />
                <circle className="roast__curve-head" ref={head} r="5" cx="8" cy="232" opacity="0" />
              </svg>

              <div className="roast__ticks" aria-hidden="true">
                <span>00:00</span>
                <span>04:00</span>
                <span>08:00</span>
                <span>12:00</span>
              </div>

              <div className="roast__phases">
                {PHASES.map((p, i) => (
                  <div className="roast__phase" key={p.name} data-on={i === index}>
                    <i aria-hidden="true" />
                    <span>{p.name}</span>
                    <span>
                      {p.time} · {p.temp}°C
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reserved for the roasting bean. */}
          <div aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
