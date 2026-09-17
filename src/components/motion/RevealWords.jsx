import { Fragment, useRef } from 'react';
import { prefersReducedMotion, useInView } from '../../lib/motion';
import cx from '../../lib/cx';
import './RevealWords.css';

/**
 * Splits a heading's text into words that rise into place one after another
 * the first time it scrolls into view. Screen readers get the sentence whole.
 * Anything that isn't a plain string is rendered as it is.
 */
export default function RevealWords({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.2 });

  if (typeof children !== 'string') return children;

  const words = children.split(' ');
  const animate = !prefersReducedMotion();

  return (
    <span ref={ref} className={cx('ap-words', animate && 'is-animated', inView && 'is-shown')}>
      <span className="ap-visually-hidden">{children}</span>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <Fragment key={`${word}-${index}`}>
            <span className="ap-words__mask">
              <span className="ap-words__word" style={{ transitionDelay: `${delay + index * 45}ms` }}>
                {word}
              </span>
            </span>
            {index < words.length - 1 && ' '}
          </Fragment>
        ))}
      </span>
    </span>
  );
}
