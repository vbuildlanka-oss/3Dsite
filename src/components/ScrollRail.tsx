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
  const [pct, setPct] = useState(0);
  const [act, setAct] = useState('hero');
  const [visible, setVisible] = useState(false);

  useTicker(() => {
    const p = scrollState.progress;
    if (fill.current) fill.current.style.transform = `scaleY(${Math.max(0.01, p)})`;
    const next = Math.round(p * 100);
    if (next !== pct) setPct(next);
    if (scrollState.act !== act) setAct(scrollState.act);
    const show = scrollState.y > 240;
    if (show !== visible) setVisible(show);
  });

  return (
    <div className="rail" data-visible={visible} aria-hidden="true">
      <span className="rail__num">{String(pct).padStart(2, '0')}</span>
      <div className="rail__track">
        <i className="rail__fill" ref={fill} />
      </div>
      <span className="rail__num" style={{ writingMode: 'vertical-rl' }}>
        {LABELS[act] ?? ''}
      </span>
    </div>
  );
}
