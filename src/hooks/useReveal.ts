import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/device';

const START = 'top 86%';

/**
 * Declarative scroll reveals. Drop `data-reveal="<kind>"` on any element inside
 * the scoped container and it animates in once, on first approach.
 *
 *   fade   — soft rise + fade (default)
 *   lines  — masked line stack produced by <SplitText mode="lines" />
 *   chars  — per-character stagger from <SplitText mode="chars" />
 *   mask   — clip-path wipe
 *   scale  — subtle scale-in for cards and plates
 *   meter  — horizontal bar fill (reads --v for the target scale)
 *   rule   — hairline draw
 */
export const useReveal = <T extends HTMLElement = HTMLDivElement>(deps: unknown[] = []) => {
  const scope = useRef<T>(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return;

    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      const nodes = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));

      nodes.forEach((node) => {
        const kind = node.dataset.reveal || 'fade';
        const delay = Number(node.dataset.revealDelay ?? 0);
        const stagger = Number(node.dataset.revealStagger ?? 0.055);

        if (reduced) {
          // Only elements the stylesheet pre-hides need an explicit resting
          // state; `from` tweens are simply never created.
          if (kind === 'meter') gsap.set(node, { scaleX: Number(node.dataset.v ?? 1) });
          return;
        }

        const trigger = { trigger: node, start: START, once: true };

        switch (kind) {
          case 'lines': {
            const inners = node.querySelectorAll('.split__inner');
            gsap.from(inners.length ? inners : node, {
              yPercent: 116,
              rotate: 1.4,
              duration: 1.15,
              ease: 'expo.out',
              stagger: 0.075,
              delay,
              scrollTrigger: trigger,
            });
            break;
          }
          case 'chars': {
            const chars = node.querySelectorAll('.split__char');
            gsap.from(chars.length ? chars : node, {
              yPercent: 108,
              opacity: 0,
              duration: 0.9,
              ease: 'expo.out',
              stagger,
              delay,
              scrollTrigger: trigger,
            });
            break;
          }
          case 'mask': {
            gsap.from(node, {
              clipPath: 'inset(0% 0% 100% 0%)',
              duration: 1.3,
              ease: 'expo.out',
              delay,
              scrollTrigger: trigger,
            });
            break;
          }
          case 'scale': {
            gsap.from(node, {
              scale: 0.94,
              opacity: 0,
              duration: 1.25,
              ease: 'expo.out',
              delay,
              scrollTrigger: trigger,
            });
            break;
          }
          case 'meter': {
            const v = Number(node.dataset.v ?? 1);
            gsap.fromTo(
              node,
              { scaleX: 0 },
              {
                scaleX: v,
                duration: 1.5,
                ease: 'expo.out',
                delay,
                scrollTrigger: { trigger: node, start: 'top 92%', once: true },
              },
            );
            break;
          }
          case 'rule': {
            gsap.from(node, {
              scaleX: 0,
              transformOrigin: 'left center',
              duration: 1.4,
              ease: 'expo.inOut',
              delay,
              scrollTrigger: trigger,
            });
            break;
          }
          default: {
            gsap.from(node, {
              y: 34,
              opacity: 0,
              duration: 1.15,
              ease: 'expo.out',
              delay,
              scrollTrigger: trigger,
            });
          }
        }
      });
    }, root);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scope;
};
