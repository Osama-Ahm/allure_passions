import { useRef, useSyncExternalStore } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import TextReveal from '../motion/TextReveal';
import { Reveal } from '../motion/Reveal';
import { EASE_OUT, VIEWPORT } from '../motion/presets';
import { scrollToTarget } from '../motion/smoothScroll';
import Button from './ui/Button';
import { BOOK_CONSULTATION_URL } from '../data/links';
import { CONCERNS_LIST, POPULAR_TREATMENTS } from '../data/treatmentData';
import { routeLinkHandler, showConcernsPath } from '../utils/navigation';
import './WhatWeTreatSection.css';

// Figma copy (section 6). `concern` names the CONCERNS_LIST entry an item matches, if any.
const CATEGORIES = [
  {
    title: 'Skin & Complexion',
    items: [
      { label: 'Hyperpigmentation', concern: 'hyperpigmentation' },
      { label: 'Melasma', concern: 'melasma' },
      { label: 'Acne', concern: 'acne' },
      { label: 'Acne scarring', concern: 'acne_scarring' },
      { label: 'Rosacea', concern: 'rosacea' },
      { label: 'Redness', concern: 'rosacea' },
      { label: 'Lentigines / age spots', concern: 'lentigines' },
      { label: 'Vascular lesions', concern: 'vascular' },
      { label: 'Skin clarity', concern: 'skin_clarity' },
    ],
  },
  {
    title: 'Ageing & Skin Quality',
    items: [
      { label: 'Fine lines', concern: 'wrinkles' },
      { label: 'Wrinkles', concern: 'wrinkles' },
      { label: 'Skin laxity', concern: 'skin_laxity' },
      { label: 'Signs of ageing', concern: 'signs_ageing' },
      { label: 'Texture' },
      { label: 'Striae', concern: 'striae' },
    ],
  },
  {
    title: 'Body',
    items: [
      { label: 'Stubborn fat', concern: 'stubborn_fat' },
      { label: 'Body contouring', concern: 'body_contouring' },
      { label: 'Muscle tone', concern: 'muscle_tone' },
      { label: 'Muscle definition', concern: 'muscle_tone' },
      { label: 'Skin tightening' },
    ],
  },
  {
    title: 'Additional Concerns',
    items: [
      { label: 'Tattoo removal', concern: 'tattoo_removal' },
      { label: 'Lip enhancement and plumping', concern: 'lip_plumping' },
      { label: 'Wellness', concern: 'wellness' },
      { label: 'Cellular health', concern: 'wellness' },
    ],
  },
];

// A concern links to the first treatment CONCERNS_LIST recommends that has its own page.
const SHORT_NAMES = {
  picoway: 'PicoWay',
  advatx: 'ADVATx',
  morpheus8: 'Morpheus8',
  sofwave: 'Sofwave',
  emsculpt_neo: 'Emsculpt Neo',
  emerald_laser: 'Emerald Green Laser Lipo',
};
const TREATMENT_NAMES = Object.fromEntries(
  POPULAR_TREATMENTS.map((t) => [t.id, SHORT_NAMES[t.id] || t.name.replace(/[®™]/g, '')]),
);
function treatmentFor(concernId) {
  const concern = CONCERNS_LIST.find((c) => c.id === concernId);
  const id = concern?.treatments.find((t) => TREATMENT_NAMES[t]);
  return id ? { id, name: TREATMENT_NAMES[id] } : null;
}

const BACKGROUND = '/assets/images/area_eyes.jpg';

// Card stagger: 4-up on wide screens, 2-up on tablets, stacked on phones.
const GRID_4 = '(min-width: 1200px)';
const GRID_2 = '(min-width: 640px)';
function subscribeLayout(onChange) {
  const queries = [GRID_4, GRID_2].map((q) => window.matchMedia(q));
  queries.forEach((q) => q.addEventListener('change', onChange));
  return () => queries.forEach((q) => q.removeEventListener('change', onChange));
}
const getColumns = () => (window.matchMedia(GRID_4).matches ? 4 : window.matchMedia(GRID_2).matches ? 2 : 1);
const getServerColumns = () => 4;

// Glass cards rise in and come into focus (blur to sharp) on the copy only,
// so the frosted surface itself never loses its backdrop blur.
const cardVariants = {
  hidden: { opacity: 0, y: 48 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: EASE_OUT, delay },
  }),
};
const contentVariants = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  show: (delay = 0) => ({
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 1, ease: EASE_OUT, delay: delay + 0.15 },
    transitionEnd: { filter: 'none' },
  }),
};

function ConcernItem({ item, onNavigate }) {
  const treatment = item.concern ? treatmentFor(item.concern) : null;
  if (!treatment) {
    return (
      <li className="ap-concerns__item">
        <span className="ap-concerns__label">{item.label}</span>
      </li>
    );
  }
  return (
    <li className="ap-concerns__item">
      <a
        className="ap-concerns__link"
        href={`/treatments/${treatment.id}`}
        onClick={routeLinkHandler(onNavigate, 'treatment-detail', treatment.id)}
        aria-label={`${item.label}: explore ${treatment.name}`}
      >
        <span className="ap-concerns__label">{item.label}</span>
        <ArrowUpRight className="ap-concerns__arrow" size={15} strokeWidth={1.75} aria-hidden="true" />
      </a>
    </li>
  );
}

/**
 * Section 6 — "Skin, Body & Wellness Concerns" + "Not sure where to begin?"
 * Four frosted concern cards over a dimmed skin close-up that drifts with the scroll.
 */
export default function WhatWeTreatSection({ onNavigate }) {
  const sectionRef = useRef(null);
  const reduce = useReducedMotion();
  const columns = useSyncExternalStore(subscribeLayout, getColumns, getServerColumns);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-7%', '7%']);

  const exploreConcerns = () => {
    showConcernsPath();
    scrollToTarget('#concerns', { offset: -110 });
  };

  return (
    <section ref={sectionRef} className="ap-concerns" aria-labelledby="ap-concerns-title">
      <div className="ap-concerns__bg" aria-hidden="true">
        <motion.div className="ap-concerns__photo" style={reduce ? undefined : { y: bgY }}>
          <img src={BACKGROUND} alt="" loading="lazy" decoding="async" />
        </motion.div>
        <div className="ap-concerns__tint" />
        <div className="ap-concerns__shade" />
      </div>

      <div className="ap-container ap-concerns__inner">
        <header className="ap-concerns__head">
          <TextReveal as="h2" id="ap-concerns-title" className="ap-h2 ap-concerns__title">
            Skin, Body &amp; <em className="ap-accent ap-concerns__accent">Wellness Concerns</em>
          </TextReveal>
          <Reveal as="p" delay={0.15} className="ap-lead ap-concerns__note">
            You do not need to know which treatment you need before speaking with us.
          </Reveal>
          <Reveal as="p" delay={0.23} className="ap-lead ap-concerns__text">
            Start with the concern you would like to improve, and explore the treatment options that may be appropriate
            for you.
          </Reveal>
          <Reveal delay={0.3} className="ap-concerns__action">
            <Button onClick={exploreConcerns}>Explore Your Concern</Button>
          </Reveal>
        </header>

        <ul className="ap-concerns__grid" aria-label="Concerns we treat">
          {CATEGORIES.map((category, index) => {
            const delay = (index % columns) * 0.1;
            const titleId = `ap-concerns-cat-${index + 1}`;
            return (
              <motion.li
                key={category.title}
                className="ap-concerns__card"
                aria-labelledby={titleId}
                {...(reduce
                  ? {}
                  : {
                      variants: cardVariants,
                      custom: delay,
                      initial: 'hidden',
                      whileInView: 'show',
                      viewport: { ...VIEWPORT, amount: 0.3 },
                    })}
              >
                <span className="ap-concerns__sheen" aria-hidden="true" />
                <motion.div
                  className="ap-concerns__card-inner"
                  variants={reduce ? undefined : contentVariants}
                  custom={delay}
                >
                  <p className="ap-concerns__cat">Category {String(index + 1).padStart(2, '0')}</p>
                  <h3 id={titleId} className="ap-concerns__card-title">
                    {category.title}
                  </h3>
                  <ul className="ap-concerns__list">
                    {category.items.map((item) => (
                      <ConcernItem key={item.label} item={item} onNavigate={onNavigate} />
                    ))}
                  </ul>
                </motion.div>
              </motion.li>
            );
          })}
        </ul>

        <div className="ap-concerns__cta">
          <div className="ap-concerns__cta-copy">
            <TextReveal as="h3" className="ap-concerns__cta-title">
              Not sure where to begin?
            </TextReveal>
            <Reveal as="p" delay={0.15} className="ap-lead ap-concerns__cta-text">
              Our consultation process is designed to understand your concerns first and recommend an appropriate
              treatment pathway based on your individual needs.
            </Reveal>
          </div>
          <Reveal delay={0.25} className="ap-concerns__cta-action">
            <Button href={BOOK_CONSULTATION_URL} target="_blank" rel="noopener noreferrer">
              Book a Consultation
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
