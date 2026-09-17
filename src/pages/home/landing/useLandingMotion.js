import { useEffect } from 'react';
import { prefersReducedMotion } from '../../../lib/motion';

/**
 * One observer for every entrance on the homepage. Anything marked
 * `data-reveal` (a fade and rise) or `.ap-mask` (a line sliding up out of its
 * mask) gets `data-in` the first time it scrolls into view. An attribute rather
 * than a class, so React re-rendering an element's className never undoes it.
 * Reduced-motion visitors, and browsers without IntersectionObserver, get
 * everything shown at once.
 */
export function useRevealOnScroll(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const targets = () => root.querySelectorAll('[data-reveal]:not([data-in]), .ap-mask:not([data-in])');
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      targets().forEach((element) => element.setAttribute('data-in', ''));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute('data-in', '');
          observer.unobserve(entry.target);
        }),
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );

    const observeAll = () => targets().forEach((element) => observer.observe(element));
    observeAll();

    // Sections that arrive later (a feed that loads, a panel that opens) are picked up too.
    const mutations = new MutationObserver(observeAll);
    mutations.observe(root, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, [rootRef]);
}

/**
 * Calls `onFrame` at most once per animation frame while the page scrolls or
 * resizes, and once on mount. For scroll-linked effects that write straight to
 * the DOM rather than through React state.
 */
export function useScrollFrame(onFrame, enabled = true) {
  useEffect(() => {
    if (!enabled) return undefined;
    let frame = 0;
    const run = () => {
      frame = 0;
      onFrame();
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(run);
    };

    request();
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
    document.fonts?.ready.then(request);
    return () => {
      window.removeEventListener('scroll', request);
      window.removeEventListener('resize', request);
      cancelAnimationFrame(frame);
    };
  }, [onFrame, enabled]);
}

export const clamp01 = (value) => Math.min(Math.max(value, 0), 1);
export const pad2 = (value) => String(value).padStart(2, '0');
