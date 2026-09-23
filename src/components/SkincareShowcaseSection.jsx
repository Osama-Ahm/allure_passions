import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useMotionValue, useReducedMotion } from 'motion/react';
import { ShieldAlert } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import ArrowButton from './ui/ArrowButton';
import Button from './ui/Button';
import { Reveal } from '../motion/Reveal';
import { EASE_INOUT, EASE_OUT } from '../motion/presets';
import { routeLinkHandler } from '../utils/navigation';
import './SkincareShowcaseSection.css';

// Tretinoin is a prescription-only medicine: it carries the disclaimer, never a price,
// a basket/buy action or a list of benefits (POMs may not be promoted to the public).
const POM_NOTICE = {
  lead: 'Prescription-only medicine.',
  rest: 'Available only after a consultation and clinical assessment.',
};

const SHOWCASE = [
  {
    id: 'kojivit_ultra',
    name: 'Kojivit Ultra Gel',
    image: '/assets/images/kojivit_ultra_cream.png',
    srcSet: '/assets/images/kojivit-ultra.webp 800w, /assets/images/kojivit_ultra_cream.png 1024w',
    position: '50% 50%',
    alt: 'Kojivit Ultra brightening gel (30g), boxed and tube packaging',
    lead: 'Professional skincare developed for concerns including:',
    concerns: ['Hyperpigmentation', 'Uneven skin tone', 'Skin brightening', 'Exfoliation', 'Signs of ageing'],
    cta: 'Explore Kojivit Ultra',
  },
  {
    id: 'tretinoin_prescription',
    name: 'Tretiheal Tretinoin',
    prescription: true,
    image: '/assets/images/tretiheal-0025-pack.webp',
    position: '50% 50%',
    alt: 'Tretiheal Tretinoin Cream USP 0.025% (20g), boxed and tube packaging',
    lead: 'Suitability is assessed by a prescriber during your consultation.',
    cta: 'Book a Prescription Consultation',
  },
];

const TOTAL = SHOWCASE.length;
const TRACK_SPRING = { type: 'spring', stiffness: 150, damping: 26, mass: 1 };

const copyVariants = {
  off: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
  on: { transition: { staggerChildren: 0.07, delayChildren: 0.22 } },
};
const lineVariants = {
  off: { opacity: 0, y: 16, transition: { duration: 0.3, ease: EASE_INOUT } },
  on: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
};
const STILL = { off: {}, on: {} };

function BadgeTick() {
  return (
    <svg className="ap-skincare__tick" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
      <path
        d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="m8.9 12.1 2.15 2.15 4.1-4.3" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ProductCard({ product, position, active, side, shown, reduce, onActivate, onNavigate }) {
  const line = reduce ? STILL : lineVariants;
  const href = '/prescription-skincare';
  return (
    <motion.li
      className={`ap-skincare__card${active ? ' is-active' : ''}${product.prescription ? ' ap-skincare__card--pom' : ''}`}
      role="group"
      aria-roledescription="slide"
      aria-label={`${position} of ${TOTAL}: ${product.name}`}
      style={{ transformOrigin: side < 0 ? '100% 50%' : '0% 50%' }}
      animate={reduce ? undefined : { scale: active ? 1 : 0.955, opacity: active ? 1 : 0.62 }}
      transition={{ duration: 0.9, ease: EASE_OUT }}
      onClick={active ? undefined : onActivate}
      onFocus={active ? undefined : onActivate}
    >
      <div className="ap-skincare__media">
        <img
          src={product.image}
          srcSet={product.srcSet}
          sizes="(min-width: 861px) 640px, 92vw"
          alt={product.alt}
          loading="lazy"
          decoding="async"
          draggable="false"
          style={{ objectPosition: product.position }}
        />
        {product.prescription ? (
          <span className="ap-skincare__chip">
            <ShieldAlert size={14} strokeWidth={1.8} aria-hidden="true" />
            Prescription-only medicine
          </span>
        ) : null}
      </div>

      <motion.div
        className="ap-skincare__body"
        variants={reduce ? STILL : copyVariants}
        initial={false}
        animate={shown ? 'on' : 'off'}
      >
        <motion.h3 className="ap-skincare__title" variants={line}>
          {product.name}
        </motion.h3>

        {product.prescription ? (
          <>
            <motion.p className="ap-skincare__notice" role="note" variants={line}>
              <ShieldAlert className="ap-skincare__notice-icon" size={20} strokeWidth={1.6} aria-hidden="true" />
              <span>
                <strong>{POM_NOTICE.lead}</strong> {POM_NOTICE.rest}
              </span>
            </motion.p>
            <motion.p className="ap-skincare__lead" variants={line}>
              {product.lead}
            </motion.p>
          </>
        ) : (
          <>
            <motion.p className="ap-skincare__lead" variants={line}>
              {product.lead}
            </motion.p>
            <ul className="ap-skincare__list">
              {product.concerns.map((text) => (
                <motion.li key={text} className="ap-skincare__item" variants={line}>
                  <BadgeTick />
                  <span>{text}</span>
                </motion.li>
              ))}
            </ul>
          </>
        )}

        <motion.div className="ap-skincare__cta" variants={line}>
          <Button block href={href} onClick={routeLinkHandler(onNavigate, 'prescription-skincare')}>
            {product.cta}
          </Button>
        </motion.div>
      </motion.div>
    </motion.li>
  );
}

/**
 * Section 13 — Professional Skincare Beyond the Clinic.
 * A spring-driven track of product cards with the next card peeking in from the right.
 * Arrows, drag/swipe, ←/→ keys and tabbing into a card all move the track.
 */
export default function SkincareShowcaseSection({ onNavigate }) {
  const reduce = useReducedMotion();
  const trackRef = useRef(null);
  const inView = useInView(trackRef, { once: true, amount: 0.35 });
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(0);
  const x = useMotionValue(0);
  const lastStep = useRef(0);

  // Distance between card starts, measured from the live layout (card width + gap).
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    const measure = () => {
      const card = track.firstElementChild;
      if (!card) return;
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      setStep(card.offsetWidth + gap);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const target = -index * step;
    if (reduce || lastStep.current !== step) {
      lastStep.current = step;
      x.set(target);
      return undefined;
    }
    const controls = animate(x, target, TRACK_SPRING);
    return () => controls.stop();
  }, [index, step, reduce, x]);

  const go = useCallback((delta) => setIndex((current) => (current + delta + TOTAL) % TOTAL), []);

  const onKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      go(1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      go(-1);
    }
  };

  const onDragEnd = (_event, info) => {
    if (!step) return;
    const projected = x.get() + info.velocity.x * 0.25;
    let next = Math.round(-projected / step);
    if (next === index) {
      if (info.offset.x < -60) next = index + 1;
      else if (info.offset.x > 60) next = index - 1;
    }
    next = Math.min(TOTAL - 1, Math.max(0, next));
    if (next === index) animate(x, -index * step, TRACK_SPRING);
    else setIndex(next);
  };

  return (
    <section className="ap-skincare" aria-labelledby="ap-skincare-title">
      <div className="ap-container">
        <SectionHeading
          id="ap-skincare-title"
          className="ap-skincare__heading"
          title="Professional Skincare"
          accent="Beyond the Clinic"
          align="center"
          intro="Support your skincare journey with professional products and personalised guidance from Allure Passions UK Aesthetic Clinic."
        />
      </div>

      <div
        className="ap-skincare__carousel"
        role="region"
        aria-roledescription="carousel"
        aria-label="Professional skincare (use the left and right arrow keys to browse)"
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        <div className="ap-skincare__viewport" data-overflow-ok>
          <div className="ap-container">
            <Reveal amount={0.15} delay={0.05}>
              <motion.ul
                ref={trackRef}
                className="ap-skincare__track"
                style={{ x }}
                drag={reduce || !step ? false : 'x'}
                dragConstraints={{ left: -(TOTAL - 1) * step, right: 0 }}
                dragElastic={0.12}
                dragMomentum={false}
                onDragEnd={onDragEnd}
              >
                {SHOWCASE.map((product, i) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    position={i + 1}
                    active={i === index}
                    side={i - index}
                    shown={reduce || (inView && i === index)}
                    reduce={reduce}
                    onActivate={() => setIndex(i)}
                    onNavigate={onNavigate}
                  />
                ))}
              </motion.ul>
            </Reveal>
          </div>
        </div>

        <p className="ap-visually-hidden" aria-live="polite">
          {`${SHOWCASE[index].name}, ${index + 1} of ${TOTAL}`}
        </p>

        <Reveal className="ap-container ap-skincare__controls" delay={0.2} amount={0.5}>
          <div className="ap-arrows">
            <ArrowButton dir="prev" label="Previous product" onClick={() => go(-1)} />
            <ArrowButton dir="next" label="Next product" onClick={() => go(1)} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
