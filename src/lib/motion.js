import { useEffect, useState } from 'react';

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** True once the element has entered the viewport; stays true. */
export function useInView(ref, { threshold = 0, rootMargin = '0px' } = {}) {
  const [inView, setInView] = useState(() => typeof window === 'undefined' || !('IntersectionObserver' in window));

  useEffect(() => {
    const element = ref.current;
    if (!element || inView) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setInView(true);
        observer.disconnect();
      },
      { threshold, rootMargin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, inView, threshold, rootMargin]);

  return inView;
}

/**
 * Writes the element's scroll position as `--scroll-progress` (-1 as it enters
 * at the bottom of the viewport, 0 centred, 1 as it leaves at the top). CSS
 * turns that into parallax. Only runs while the element is on screen, and not
 * at all for reduced-motion visitors.
 */
export function useScrollProgress(ref) {
  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion() || !('IntersectionObserver' in window)) return undefined;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const viewport = window.innerHeight;
      const centre = rect.top + rect.height / 2;
      const progress = (viewport / 2 - centre) / (viewport / 2 + rect.height / 2);
      element.style.setProperty('--scroll-progress', Math.max(-1, Math.min(1, progress)).toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        update();
        window.addEventListener('scroll', onScroll, { passive: true });
      } else {
        window.removeEventListener('scroll', onScroll);
      }
    });
    observer.observe(element);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [ref]);
}

/**
 * Pointer handler that records where the pointer is inside the element as
 * `--pointer-x` / `--pointer-y` (pixels) and `--pointer-rx` / `--pointer-ry`
 * (0–1 across the element), for spotlight, tilt and follow effects in CSS.
 */
export function trackPointer(event) {
  const element = event.currentTarget;
  const rect = element.getBoundingClientRect();
  element.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`);
  element.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`);
  element.style.setProperty('--pointer-rx', ((event.clientX - rect.left) / rect.width).toFixed(3));
  element.style.setProperty('--pointer-ry', ((event.clientY - rect.top) / rect.height).toFixed(3));
}
