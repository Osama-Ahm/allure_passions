import { useEffect, useRef, useState } from 'react';
import cx from '../../lib/cx';
import { prefersReducedMotion } from '../../lib/motion';
import './Reveal.css';

const canAnimate = () => typeof window !== 'undefined' && 'IntersectionObserver' in window && !prefersReducedMotion();

/**
 * Fades content up once when it first scrolls into view.
 * `stagger` reveals direct children one after another instead of as a block.
 * Reduced-motion users (and browsers without IntersectionObserver) see content immediately.
 */
export default function Reveal({ as: Element = 'div', stagger = false, className, children, ...rest }) {
  const ref = useRef(null);
  const [isShown, setIsShown] = useState(() => !canAnimate());

  useEffect(() => {
    const element = ref.current;
    if (!element || isShown) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsShown(true);
        observer.disconnect();
      },
      { threshold: 0 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [isShown]);

  return (
    <Element
      ref={ref}
      className={cx('ap-reveal', stagger && 'ap-reveal--stagger', isShown && 'is-shown', className)}
      {...rest}
    >
      {children}
    </Element>
  );
}
