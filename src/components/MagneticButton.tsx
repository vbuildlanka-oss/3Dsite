import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { useMagnetic } from '@/hooks/useMagnetic';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: 'outline' | 'solid' | 'ghost';
  arrow?: boolean;
  strength?: number;
};

const Arrow = () => (
  <svg className="btn__arrow" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M2 8h11M9 4l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function MagneticButton({
  children,
  variant = 'outline',
  arrow = true,
  strength = 0.28,
  className,
  ...rest
}: Props) {
  const ref = useMagnetic<HTMLButtonElement>(strength);
  const cls = ['btn', variant === 'solid' && 'btn--solid', variant === 'ghost' && 'btn--ghost', className]
    .filter(Boolean)
    .join(' ');

  return (
    <button ref={ref} className={cls} type="button" {...rest}>
      <span>{children}</span>
      {arrow && <Arrow />}
    </button>
  );
}
