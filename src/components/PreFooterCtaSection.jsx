import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import TextReveal from '../motion/TextReveal';
import { Reveal } from '../motion/Reveal';
import { EASE_OUT, VIEWPORT } from '../motion/presets';
import { scrollToTarget } from '../motion/smoothScroll';
import Button from './ui/Button';
import ResponsiveImg from './ui/ResponsiveImg';
import { BOOK_CONSULTATION_URL } from '../data/links';
import { showConcernsPath } from '../utils/navigation';
import './PreFooterCtaSection.css';

const PHOTO = {
  src: '/assets/images/prefooter_serum.jpg',
  alt: 'Close-up of a woman applying a clear serum from a glass dropper to her cheek',
  position: '30% 38%',
};

// The concerns section id (older builds used #what-we-treat).
const CONCERNS_TARGETS = ['#concerns', '#what-we-treat'];

function exploreConcerns(event) {
  const target = CONCERNS_TARGETS.map((selector) => document.querySelector(selector)).find(Boolean);
  if (!target) return;
  event.preventDefault();
  // Keep Lenis's own anchor handler from re-targeting the same click.
  event.stopPropagation();
  showConcernsPath();
  scrollToTarget(target);
}

/**
 * Section 14 — "Not Sure Which Treatment Is Right for You?"
 * Consultation invitation on the mist panel, with the serum close-up easing in
 * from the right and drifting gently against the scroll.
 */
export default function PreFooterCtaSection() {
  const sectionRef = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const drift = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.5 });
  const photoY = useTransform(drift, [0, 1], ['-5%', '5%']);
  const photoScale = useTransform(drift, [0, 0.5, 1], [1.1, 1.04, 1.02]);

  return (
    <section ref={sectionRef} className="ap-cta" aria-labelledby="ap-cta-title">
      <motion.div
        className="ap-cta__media"
        initial={reduce ? false : { opacity: 0, x: 40 }}
        whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 1.6, ease: EASE_OUT }}
      >
        <motion.div className="ap-cta__media-inner" style={reduce ? undefined : { y: photoY, scale: photoScale }}>
          <ResponsiveImg
            className="ap-cta__photo"
            src={PHOTO.src}
            alt={PHOTO.alt}
            width="1376"
            height="768"
            loading="lazy"
            decoding="async"
            imgSizes="(max-width: 899px) 100vw, 58vw"
            sizes="(max-width: 599px) 130vw, (max-width: 899px) 100vw, 1200px"
            style={{ objectPosition: PHOTO.position }}
          />
        </motion.div>
      </motion.div>

      <div className="ap-container ap-cta__layout">
        <div className="ap-cta__copy">
          <TextReveal as="h2" id="ap-cta-title" className="ap-cta__title" gap={0.055}>
            <span className="ap-cta__line">Not Sure Which</span>{' '}
            <span className="ap-cta__line">
              Treatment <em className="ap-accent">Is Right for You?</em>
            </span>
          </TextReveal>

          <Reveal as="p" className="ap-cta__lead" delay={0.28}>
            You do not need to make that decision alone.
          </Reveal>

          <div className="ap-cta__body">
            <Reveal as="p" delay={0.38}>
              Tell us what you would like to improve and our team can help you understand the treatment options
              available and the most appropriate next step for your individual concerns.
            </Reveal>
            <Reveal as="p" delay={0.46}>
              Whether your focus is your skin, body or overall wellbeing, your journey starts with a personalised
              consultation.
            </Reveal>
          </div>

          <Reveal className="ap-cta__actions" delay={0.56}>
            <Button
              className="ap-cta__btn"
              href={BOOK_CONSULTATION_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book Your Consultation
              <span className="ap-visually-hidden"> (opens WhatsApp in a new tab)</span>
            </Button>
            <Button className="ap-cta__btn" variant="dark" href="#concerns" onClick={exploreConcerns}>
              Explore Your Concerns
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
