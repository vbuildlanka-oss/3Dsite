import { useRef, useState } from 'react';
import { useTicker } from '@/hooks/useTicker';
import { scrollState } from '@/lib/scroll';

const LABELS: Record<string, string> = {
  hero: 'Arrival',
  origin: 'Origin',
  roast: 'Roast',
  brew: 'Brew',
  menu: 'Menu',
  ritual: 'Ritual',
  visit: 'Visit',
};

/** Right-hand progress rail: percentage read-out plus the current act name. */
export function ScrollRail() {
  const fill = useRef<HTMLElement>(null);
  const [act, setAct] = useState('hero');
  const [visible, setVisible] = useState(false);

  useTicker(() => {
    const p = scrollState.progress;
    if (fill.current) fill.current.style.transform = `scaleY(${Math.max(0.01, p)})`;
    if (scrollState.act !== act) setAct(scrollState.act);
    const show = scrollState.y > 240;
    if (show !== visible) setVisible(show);
  });

  return (
    <div className="rail" data-visible={visible} aria-hidden="true">
      <div className="rail__track">
        <i className="rail__fill" ref={fill} />
      </div>
      <span className="rail__num" style={{ writingMode: 'vertical-rl' }}>
        {LABELS[act] ?? ''}
      </span>
    </div>
  );
}
