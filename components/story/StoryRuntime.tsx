'use client';

import { useEffect } from 'react';
import { measure, update } from '@/lib/story/runtime';
import { onFrame, useSmoothScroll } from '@/lib/useSmoothScroll';

/**
 * Starts the page's single loop and keeps the story measured. Renders nothing.
 *
 * Adding `story-live` to <html> is what switches scroll-linked copy on; until
 * then (and without JavaScript) every line is simply visible.
 */
export function StoryRuntime() {
  useSmoothScroll();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('story-live');

    let frame = 0;
    const remeasure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        measure();
        update();
      });
    };

    measure();
    update();

    const stop = onFrame(() => update());

    // Chapters change height when an accordion opens, when fonts arrive and
    // when the window resizes; any of those moves every chapter below.
    const main = document.getElementById('main');
    const observer = new ResizeObserver(remeasure);
    if (main) observer.observe(main);
    window.addEventListener('resize', remeasure);
    document.fonts?.ready.then(remeasure);

    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener('resize', remeasure);
      cancelAnimationFrame(frame);
      root.classList.remove('story-live');
    };
  }, []);

  return null;
}
