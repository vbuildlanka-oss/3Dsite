import { useAct } from '@/hooks/useAct';
import { useReveal } from '@/hooks/useReveal';
import { SplitText } from '@/components/SplitText';
import { MagneticButton } from '@/components/MagneticButton';
import { scrollTo } from '@/hooks/useSmoothScroll';
import { actScrollTarget } from '@/lib/scroll';
import { MENU } from '@/content/site';

/** The counter. A list, priced honestly, with nothing hidden behind a modal. */
export function Menu() {
  const act = useAct('menu');
  const scope = useReveal<HTMLElement>();

  return (
    <section
      className="section menu scrim"
      id="menu"
      ref={(el) => {
        act(el);
        scope.current = el;
      }}
      aria-labelledby="menu-title"
    >
      <div className="shell">
        <div className="section__head">
          <span className="label">04 — Counter</span>
        </div>

        <h2 className="panel-title" id="menu-title" style={{ marginBottom: '2.5rem' }}>
          <SplitText lines={[<>Everything <em>on the bar</em></>]} />
        </h2>

        <ul className="menu__list">
          {MENU.map((item, i) => (
            <li
              className="menu__row"
              key={item.n}
              data-cursor="Taste"
              data-reveal="fade"
              data-reveal-delay={i * 0.04}
            >
              <span className="menu__n">{item.n}</span>
              <span className="menu__name">
                {item.name}
                <small>{item.detail}</small>
              </span>
              <span className="menu__price">{item.price}</span>
            </li>
          ))}
        </ul>

        <div className="menu__foot">
          <p>
            Oat, whole and Jersey milk at no extra charge. Beans by the bag, ground to
            your brewer.
          </p>
          <MagneticButton
            variant="solid"
            data-cursor="Visit"
            onClick={() => scrollTo(actScrollTarget('visit'))}
          >
            Find us
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
