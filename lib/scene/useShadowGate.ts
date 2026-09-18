'use client';

import { useCallback, useRef, useState } from 'react';

/**
 * drei's ContactShadows re-renders the scene into its shadow map every frame,
 * even while the model it grounds is hidden. A scene calls `setLive` from its
 * frame loop with whether its model is on screen, and passes
 * `frames={live ? Infinity : 0}` to its shadows, so they only work while they
 * are seen. The state changes only at chapter boundaries, so this renders
 * rarely.
 *
 * Shadows start live, so their shaders compile during the stage's warm-up
 * rather than the first time each one is needed.
 */
export function useShadowGate() {
  const [live, setLiveState] = useState(true);
  const current = useRef(true);
  const setLive = useCallback((next: boolean) => {
    if (next === current.current) return;
    current.current = next;
    setLiveState(next);
  }, []);
  return [live, setLive] as const;
}
