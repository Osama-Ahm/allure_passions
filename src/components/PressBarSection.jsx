import { useEffect, useRef } from 'react';
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

// Publications listed on the live site. Each wordmark gets its own typographic treatment.
const PRESS_LOGOS = [
  { name: 'VOGUE', variant: 'vogue' },
  { name: 'TATLER', variant: 'tatler' },
  { name: "HARPER'S BAZAAR", variant: 'bazaar' },
  { name: 'GQ', variant: 'gq' },
  { name: 'ELLE', variant: 'elle' },
  { name: 'GHP GLOBAL', variant: 'ghp' },
];

const SPEED = 38; // px per second at full speed

function Wordmark({ press, hidden }) {
  return (
    <li className={`ap-press__item ap-press__item--${press.variant}`} aria-hidden={hidden || undefined}>
      <span className="ap-press__mark">{press.name}</span>
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

  useEffect(() => {
    const group = groupRef.current;
    if (!group || reduce) return undefined;
    const measure = () => {
      groupWidth.current = group.offsetWidth;
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(group);
    return () => observer.disconnect();
  }, [reduce]);

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
              {/* Each group holds the list twice so one group is always wider than the screen. */}
              <ul ref={groupRef} className="ap-press__group">
                {PRESS_LOGOS.map((press) => (
                  <Wordmark key={press.name} press={press} />
                ))}
                {PRESS_LOGOS.map((press) => (
                  <Wordmark key={`${press.name}-b`} press={press} hidden />
                ))}
              </ul>
              <ul className="ap-press__group" aria-hidden="true">
                {[...PRESS_LOGOS, ...PRESS_LOGOS].map((press, index) => (
                  <Wordmark key={`${press.name}-c${index}`} press={press} hidden />
                ))}
              </ul>
            </motion.div>
          </div>
        </Reveal>
      )}
    </section>
  );
}
