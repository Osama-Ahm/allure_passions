import React, { useEffect, useRef, useState } from 'react';

const canAnimate = () =>
  typeof window !== 'undefined' &&
  'IntersectionObserver' in window &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const easeOutExpo = (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

const SCREEN_READER_ONLY = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
};

// Counts a figure up from zero the first time it scrolls into view.
export default function CountUp({ to, prefix = '', suffix = '', duration = 1800 }) {
  const ref = useRef(null);
  const [value, setValue] = useState(() => (canAnimate() ? 0 : to));

  useEffect(() => {
    const element = ref.current;
    if (!element || !canAnimate()) return undefined;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min(1, (now - start) / duration);
          setValue(Math.round(to * easeOutExpo(progress)));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { rootMargin: '0px 0px -10% 0px' }
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to, duration]);

  return (
    <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums' }}>
      <span aria-hidden="true">
        {prefix}
        {value}
        {suffix}
      </span>
      <span style={SCREEN_READER_ONLY}>
        {prefix}
        {to}
        {suffix}
      </span>
    </span>
  );
}
