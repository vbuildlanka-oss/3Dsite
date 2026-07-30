import { useCallback, useEffect } from 'react';
import { registerAct, type ActId } from '@/lib/scroll';

/**
 * Registers a section element as one act of the timeline. The returned ref goes
 * on the outermost element of the section.
 */
export const useAct = (id: ActId) => {
  const ref = useCallback(
    (el: HTMLElement | null) => {
      registerAct(id, el);
    },
    [id],
  );

  useEffect(() => () => registerAct(id, null), [id]);

  return ref;
};
