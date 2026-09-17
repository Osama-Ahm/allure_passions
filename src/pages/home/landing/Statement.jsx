import { Fragment, useCallback, useRef, useState } from 'react';
import { statement, statementFacts } from '../../../content/home';
import { prefersReducedMotion } from '../../../lib/motion';
import Chapter from './Chapter';
import { clamp01, useScrollFrame } from './useLandingMotion';
import './Statement.css';

/** Splits the statement into lit-able pieces: one per word, one per inline image. */
const pieces = statement.flatMap((part) => {
  if (typeof part === 'string') return part.split(/\s+/).map((word) => ({ word }));
  if (part.em) return part.em.split(/\s+/).map((word) => ({ word, em: true }));
  return [part];
});

/**
 * 01 · Discover. The approach, lit word by word as it scrolls through the
 * viewport, with two small photographs set into the sentence.
 */
export default function Statement() {
  const textRef = useRef(null);
  const [reduceMotion] = useState(prefersReducedMotion);

  const onScroll = useCallback(() => {
    const text = textRef.current;
    if (!text) return;
    const rect = text.getBoundingClientRect();
    const viewport = window.innerHeight;
    const progress = clamp01((viewport * 0.85 - rect.top) / (rect.height + viewport * 0.35));
    const lit = Math.floor(progress * pieces.length * 1.05);
    text.querySelectorAll('[data-piece]').forEach((element, index) => {
      element.toggleAttribute('data-on', index < lit);
    });
  }, []);
  useScrollFrame(onScroll, !reduceMotion);

  return (
    <section className="ap-statement" id="about" data-chapter="discover" aria-labelledby="ap-approach-title">
      <div className="ap-wrap">
        <Chapter id="discover" />
        <div className="ap-statement__grid">
          <h2 className="ap-dot-eyebrow" id="ap-approach-title">
            Our approach
          </h2>
          <div>
            <p className="ap-statement__text ap-serif" ref={textRef} data-static={reduceMotion || undefined}>
              {pieces.map((piece, index) => (
                <Fragment key={index}>
                  {index > 0 && ' '}
                  {piece.image ? (
                    <span className="ap-statement__img" data-piece aria-hidden="true">
                      <img src={piece.image} alt="" loading="lazy" decoding="async" />
                    </span>
                  ) : (
                    <span className="ap-statement__w" data-piece>
                      {piece.em ? <em>{piece.word}</em> : piece.word}
                    </span>
                  )}
                </Fragment>
              ))}
            </p>
            <dl className="ap-statement__facts" data-reveal>
              {statementFacts.map((fact) => (
                <div className="ap-statement__fact" key={fact.label}>
                  <dt className="ap-serif">{fact.value}</dt>
                  <dd>{fact.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
