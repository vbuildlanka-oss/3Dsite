import { useRef, useState } from 'react';
import { MagneticButton } from './MagneticButton';
import { useTicker } from '@/hooks/useTicker';
import { scrollTo } from '@/hooks/useSmoothScroll';
import { actScrollTarget, scrollState, type ActId } from '@/lib/scroll';

const LINKS: { id: ActId; label: string }[] = [
  { id: 'origin', label: 'Origin' },
  { id: 'roast', label: 'Roast' },
  { id: 'brew', label: 'Brew' },
  { id: 'menu', label: 'Menu' },
  { id: 'visit', label: 'Visit' },
];

const Mark = () => (
  <span className="nav__mark" aria-hidden="true">
    <svg viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="14.2" stroke="currentColor" strokeWidth="1" opacity=".45" />
      <circle cx="16" cy="16" r="6.4" stroke="currentColor" strokeWidth="1.4" />
      <path d="M16 1.8v6M16 24.2v6M1.8 16h6M24.2 16h6" stroke="currentColor" strokeWidth="1" />
    </svg>
  </span>
);

export function Nav() {
  const [stuck, setStuck] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState<ActId>('hero');
  const lastY = useRef(0);

  useTicker(() => {
    const y = scrollState.y;
    const nextStuck = y > 80;
    if (nextStuck !== stuck) setStuck(nextStuck);

    const goingDown = y > lastY.current + 4;
    const goingUp = y < lastY.current - 4;
    if (goingDown && y > 520 && !hidden) setHidden(true);
    if ((goingUp || y < 200) && hidden) setHidden(false);
    if (goingDown || goingUp) lastY.current = y;

    if (scrollState.act !== active) setActive(scrollState.act);
  });

  return (
    <header className="nav" data-stuck={stuck} data-hidden={hidden}>
      <a
        className="nav__brand"
        href="#top"
        data-cursor="Top"
        onClick={(e) => {
          e.preventDefault();
          scrollTo(0);
        }}
      >
        <Mark />
        Ember&nbsp;&amp;&nbsp;Oak
      </a>

      <nav className="nav__links" aria-label="Sections">
        {LINKS.map((link) => (
          <a
            key={link.id}
            className="nav__link"
            href={`#${link.id}`}
            data-active={active === link.id}
            onClick={(e) => {
              e.preventDefault();
              scrollTo(actScrollTarget(link.id));
            }}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <MagneticButton
        className="nav__cta"
        variant="solid"
        data-cursor="Reserve"
        onClick={() => scrollTo(actScrollTarget('visit'))}
      >
        Book a table
      </MagneticButton>
    </header>
  );
}
