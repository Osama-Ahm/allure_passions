import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowRight, Gem, ShieldCheck, Sparkles } from 'lucide-react';
import TextReveal from '../motion/TextReveal';
import useCurtainOpen from '../motion/useCurtainOpen';
import { EASE_OUT } from '../motion/presets';
import Button from './ui/Button';
import useScrubVideo, { pickScrubSource, useBlobSource } from './hero/useScrubVideo';
import { BOOK_CONSULTATION_URL } from '../data/links';
import './HeroSection.css';

const SOURCES = {
  large: '/assets/videos/clinic_tour_scrub-1080.mp4',
  small: '/assets/videos/clinic_tour_scrub-720.mp4',
};
const POSTERS = {
  large: '/assets/videos/clinic_tour_poster-1920.webp',
  small: '/assets/videos/clinic_tour_poster-1280.webp',
};

// Quiet credentials in the right gutter: hairline-ruled, no cards.
const MARKS = [
  { Icon: Gem, title: 'Bespoke Plans', text: 'Anatomically tailored protocols' },
  { Icon: Sparkles, title: 'Targeted Energy', text: 'PicoWay · Morpheus8 · Sofwave' },
  { Icon: ShieldCheck, title: 'JCCP Verified', text: 'Clinical governance standards' },
];

/**
 * Section 1 — Hero. The clinic tour video is pinned full-screen and plays
 * forward and backward with the scroll (see useScrubVideo for how it stays smooth),
 * with the Figma headline, calls to action and a hairline list of credentials over it.
 */
export default function HeroSection({ onNavigate }) {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const videoRef = useRef(null);
  const reduce = useReducedMotion();
  const open = useCurtainOpen();

  const source = pickScrubSource(SOURCES);
  const poster = source === SOURCES.large ? POSTERS.large : POSTERS.small;

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });

  useBlobSource({ videoRef, src: source, enabled: !reduce });
  useScrubVideo({ videoRef, observeRef: stageRef, progress: scrollYProgress, enabled: !reduce });

  // Overlay choreography, eased with a light spring so it trails the scroll softly.
  const soft = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.6 });
  const copyY = useTransform(soft, [0, 0.8], [0, -70]);
  const copyOpacity = useTransform(soft, [0, 0.62, 0.86], [1, 1, 0]);
  const copyBlur = useTransform(soft, [0.62, 0.86], ['blur(0px)', 'blur(6px)']);
  const marksY = useTransform(soft, [0, 0.8], [0, -40]);
  const marksOpacity = useTransform(soft, [0, 0.55, 0.8], [1, 1, 0]);
  // The range runs to 1 on purpose: this can play as a scroll-linked browser animation, and
  // a range that stopped at 0.05 would ease the cue back in over the rest of the hero.
  const cueOpacity = useTransform(scrollYProgress, [0, 0.05, 1], [1, 0, 0]);
  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const mediaScale = useTransform(soft, [0, 1], [1, 1.06]);
  const shade = useTransform(soft, [0.7, 1], [0, 0.45]);

  const show = open ? 'show' : 'hidden';

  return (
    <section
      ref={sectionRef}
      className={`ap-hero${reduce ? ' ap-hero--static' : ''}`}
      aria-labelledby="ap-hero-title"
    >
      <div ref={stageRef} className="ap-hero__stage">
        <motion.div
          className="ap-hero__media"
          initial={reduce ? false : { scale: 1.14, opacity: 0 }}
          animate={open ? { scale: 1, opacity: 1 } : undefined}
          transition={{ duration: 2.1, ease: EASE_OUT }}
        >
          <motion.div className="ap-hero__media-inner" style={reduce ? undefined : { scale: mediaScale }}>
            {reduce ? (
              <img className="ap-hero__video" src={poster} alt="" />
            ) : (
              <video
                ref={videoRef}
                className="ap-hero__video"
                poster={poster}
                muted
                playsInline
                preload="auto"
                disablePictureInPicture
                disableRemotePlayback
                tabIndex={-1}
                aria-hidden="true"
              />
            )}
          </motion.div>
          <div className="ap-hero__scrim" aria-hidden="true" />
          <motion.div className="ap-hero__shade" style={reduce ? undefined : { opacity: shade }} aria-hidden="true" />
        </motion.div>

        <div className="ap-container ap-hero__layout">
          <motion.div
            className="ap-hero__copy"
            style={reduce ? undefined : { y: copyY, opacity: copyOpacity, filter: copyBlur }}
          >
            <TextReveal as="h1" id="ap-hero-title" className="ap-hero__title" play={open} delay={0.25} gap={0.07}>
              <span className="ap-hero__line">Advanced Aesthetics.</span>{' '}
              <em className="ap-hero__line ap-accent">Personalised Around You.</em>
            </TextReveal>
            <motion.p
              className="ap-hero__lead"
              variants={copyVariants}
              initial={reduce ? false : 'hidden'}
              animate={show}
              custom={0.75}
            >
              Discover advanced, non-invasive treatments for skin, body and wellbeing, delivered with a
              personalised and patient-centred approach.
            </motion.p>
            <motion.div
              className="ap-hero__actions"
              variants={copyVariants}
              initial={reduce ? false : 'hidden'}
              animate={show}
              custom={0.9}
            >
              <Button href={BOOK_CONSULTATION_URL} target="_blank" rel="noopener noreferrer">
                Book a Consultation
              </Button>
              <Button
                variant="glass"
                href="/treatments"
                icon={<ArrowRight size={18} strokeWidth={1.6} />}
                onClick={(event) => {
                  if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
                  event.preventDefault();
                  onNavigate?.('treatments');
                }}
              >
                Explore Treatments
              </Button>
            </motion.div>
          </motion.div>

          <motion.ul
            className="ap-hero__marks"
            aria-label="Why patients choose Allure Passions"
            style={reduce ? undefined : { opacity: marksOpacity, y: marksY }}
          >
            {MARKS.map(({ Icon, title, text }, index) => (
              <motion.li
                key={title}
                className="ap-hero__mark"
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={open ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 1, ease: EASE_OUT, delay: 1.05 + index * 0.12 }}
              >
                <Icon className="ap-hero__mark-icon" size={18} strokeWidth={1.3} aria-hidden="true" />
                <span className="ap-hero__mark-text">
                  <strong>{title}</strong>
                  <span>{text}</span>
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {!reduce && (
          <>
            <motion.div className="ap-hero__cue" style={{ opacity: cueOpacity }} aria-hidden="true">
              <span className="ap-hero__cue-label">Scroll to tour the clinic</span>
              <span className="ap-hero__cue-line" />
            </motion.div>
            <div className="ap-hero__rail" aria-hidden="true">
              <motion.span style={{ scaleX: railScale }} />
            </div>
          </>
        )}
      </div>
    </section>
  );
}

const copyVariants = {
  hidden: { opacity: 0, y: 26 },
  show: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 1, ease: EASE_OUT, delay } }),
};
