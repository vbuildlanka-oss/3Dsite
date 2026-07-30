import { createElement, type ElementType, type ReactNode } from 'react';

type LinesProps = {
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  reveal?: boolean;
  delay?: number;
};

/**
 * Author-declared line splitting. Explicit lines beat runtime measurement:
 * the markup is identical on first paint and after any resize, so a masked
 * reveal can never flash unsplit text.
 */
export function SplitText({ lines, as = 'span', className, reveal = true, delay }: LinesProps) {
  return createElement(
    as,
    {
      className: ['split', className].filter(Boolean).join(' '),
      ...(reveal ? { 'data-reveal': 'lines', 'data-reveal-delay': delay } : {}),
    },
    lines.map((line, i) =>
      createElement(
        'span',
        { className: 'split__line', key: i },
        createElement('span', { className: 'split__inner' }, line),
      ),
    ),
  );
}

type CharsProps = {
  text: string;
  as?: ElementType;
  className?: string;
  reveal?: boolean;
  stagger?: number;
  delay?: number;
};

export function SplitChars({
  text,
  as = 'span',
  className,
  reveal = true,
  stagger = 0.045,
  delay,
}: CharsProps) {
  return createElement(
    as,
    {
      className: ['split__line', className].filter(Boolean).join(' '),
      'aria-label': text,
      ...(reveal
        ? { 'data-reveal': 'chars', 'data-reveal-stagger': stagger, 'data-reveal-delay': delay }
        : {}),
    },
    Array.from(text).map((ch, i) =>
      createElement(
        'span',
        { className: 'split__char', key: `${ch}-${i}`, 'aria-hidden': 'true' },
        ch,
      ),
    ),
  );
}
