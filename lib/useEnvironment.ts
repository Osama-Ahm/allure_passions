'use client';

import { useEffect, useState } from 'react';

/**
 * Environment probes for the walkthrough. Every one of these starts at its
 * "no capability" value so the server render and the first client render agree;
 * the real answer arrives in an effect, after hydration.
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);

    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** Anyone who has asked for less movement gets the static composition instead. */
export function useReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

export function useIsMobile() {
  return useMediaQuery('(max-width: 767px)');
}

/**
 * Whether this browser can give us a WebGL context at all. `null` means the
 * check has not run yet, which is the state the server renders in.
 */
export function useWebGLSupport() {
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    let context: WebGLRenderingContext | WebGL2RenderingContext | null = null;
    try {
      const canvas = document.createElement('canvas');
      context =
        (canvas.getContext('webgl2') as WebGL2RenderingContext | null) ??
        (canvas.getContext('webgl') as WebGLRenderingContext | null);
      setSupported(Boolean(context));
    } catch {
      setSupported(false);
    }
    // Hand the probe context back rather than leaving it for the GC; browsers
    // cap how many live WebGL contexts a page may hold.
    context?.getExtension('WEBGL_lose_context')?.loseContext();
  }, []);

  return supported;
}
