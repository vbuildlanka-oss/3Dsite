import type { CSSProperties } from 'react';

type Props = {
  items: string[];
  reverse?: boolean;
  duration?: number;
  copies?: number;
};

/**
 * CSS-only infinite marquee: identical tracks translated by exactly their own
 * width. Keeping it off the JS thread means it never stutters mid scroll burst.
 */
export function Marquee({ items, reverse = false, duration = 34, copies = 2 }: Props) {
  return (
    <div
      className="marquee"
      data-reverse={reverse}
      style={{ '--marquee-duration': `${duration}s` } as CSSProperties}
    >
      {Array.from({ length: copies }, (_, copy) => (
        <div className="marquee__track" key={copy} aria-hidden="true">
          {items.map((item, i) => (
            <span className="marquee__item" key={`${item}-${i}`}>
              {item}
              <i className="marquee__sep" />
            </span>
          ))}
        </div>
      ))}
      <span className="sr-only">{items.join(' · ')}</span>
    </div>
  );
}
