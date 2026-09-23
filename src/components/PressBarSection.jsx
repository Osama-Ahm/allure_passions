import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react';
import TextReveal from '../motion/TextReveal';
import { Reveal } from '../motion/Reveal';
import './PressBarSection.css';

// Publications the clinic has been featured in (client-supplied list, 2026-09-23).
// Each wordmark gets its own typographic treatment; `lines` stacks a masthead over its section name.
const PRESS_LOGOS = [
  { name: 'HELLO!', variant: 'hello' },
  { name: 'The Times', variant: 'times', display: 'THE TIMES' },
  { name: 'The Sun', variant: 'sun', lines: ['The', 'Sun'] },
  { name: 'Daily Mail Femail', variant: 'femail', lines: ['Daily Mail', 'femail'] },
  { name: "Women's Health", variant: 'womens-health', display: 'Women’sHealth' },
  { name: 'Daily Mail', variant: 'daily-mail' },
];

const SPEED = 38; // px per second at full speed

function Wordmark({ press, hidden }) {
  return (
    <li className={`ap-press__item ap-press__item--${press.variant}`} aria-hidden={hidden || undefined}>
      {press.lines || press.display ? (
        <>
          <span className="ap-press__mark" aria-hidden="true">
            {press.lines
              ? press.lines.map((line) => (
                  <span key={line} className="ap-press__line">
                    {line}
                  </span>
                ))
              : press.display}
          </span>
          <span className="ap-visually-hidden">{press.name}</span>
        </>
      ) : (
        <span className="ap-press__mark">{press.name}</span>
      )}
    </li>
  );
}

/**
 * Section 9 — "As Featured In". A calm, endless ribbon of press wordmarks on charcoal.
 * The ribbon eases to a stop while hovered or focused and never moves for reduced motion.
 */
export default function PressBarSection() {
  const reduce = useReducedMotion();
  const marqueeRef = useRef(null);
  const groupRef = useRef(null);
  const groupWidth = useRef(0);
  const x = useMotionValue(0);
  const speed = useSpring(1, { stiffness: 45, damping: 18, mass: 1 });
  const inView = useInView(marqueeRef, { margin: '120px 0px' });
  // Copies of the list in each group: a group must be at least as wide as the ribbon,
  // or ultra-wide screens would see the track run out before it loops.
  const [copies, setCopies] = useState(2);

  useEffect(() => {
    const group = groupRef.current;
    const marquee = marqueeRef.current;
    if (!group || !marquee || reduce) return undefined;
    const measure = () => {
      groupWidth.current = group.offsetWidth;
      const listWidth = group.offsetWidth / copies;
      if (!listWidth) return;
      const needed = Math.max(2, Math.ceil(marquee.clientWidth / listWidth) + 1);
      if (needed !== copies) setCopies(needed);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(group);
    observer.observe(marquee);
    return () => observer.disconnect();
  }, [reduce, copies]);

  useAnimationFrame((_, delta) => {
    const width = groupWidth.current;
    if (reduce || !inView || !width) return;
    const step = SPEED * speed.get() * (Math.min(delta, 64) / 1000);
    if (step === 0) return;
    let next = x.get() - step;
    if (next <= -width) next += width;
    x.set(next);
  });

  const slow = () => speed.set(0);
  const resume = () => speed.set(1);

  return (
    <section className="ap-press" aria-labelledby="ap-press-title">
      <div className="ap-container">
        <TextReveal as="h2" id="ap-press-title" className="ap-press__title">
          As Featured In
        </TextReveal>
      </div>

      {reduce ? (
        <div className="ap-container">
          <ul className="ap-press__static" aria-label="Publications">
            {PRESS_LOGOS.map((press) => (
              <Wordmark key={press.name} press={press} />
            ))}
          </ul>
        </div>
      ) : (
        <Reveal delay={0.2} amount={0.4}>
          <div
            ref={marqueeRef}
            className="ap-press__marquee"
            data-overflow-ok
            role="region"
            aria-label="Publications (the ribbon pauses while hovered or focused)"
            tabIndex={0}
            onPointerEnter={slow}
            onPointerLeave={resume}
            onFocus={slow}
            onBlur={resume}
          >
            <motion.div className="ap-press__track" style={{ x }}>
              {/* Each group repeats the list until it is wider than the ribbon (see `copies`). */}
              <ul ref={groupRef} className="ap-press__group">
                {PRESS_LOGOS.map((press) => (
                  <Wordmark key={press.name} press={press} />
                ))}
                {Array.from({ length: copies - 1 }, (_, copy) =>
                  PRESS_LOGOS.map((press) => <Wordmark key={`${press.name}-a${copy}`} press={press} hidden />),
                )}
              </ul>
              <ul className="ap-press__group" aria-hidden="true">
                {Array.from({ length: copies }, (_, copy) =>
                  PRESS_LOGOS.map((press) => <Wordmark key={`${press.name}-b${copy}`} press={press} hidden />),
                )}
              </ul>
            </motion.div>
          </div>
        </Reveal>
      )}
    </section>
  );
}
