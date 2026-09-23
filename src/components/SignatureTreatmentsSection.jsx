import { useRef, useSyncExternalStore } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import SectionHeading from './ui/SectionHeading';
import Button from './ui/Button';
import { Reveal } from '../motion/Reveal';
import { DURATION, EASE_OUT, SPRING_SOFT, VIEWPORT } from '../motion/presets';
import { routeLinkHandler } from '../utils/navigation';
import './SignatureTreatmentsSection.css';

const IMAGE_ROOT = '/assets/images/site/technologies';

// Figma copy (section 5). `position` frames each client photo in the 390x336 slot.
const TREATMENTS = [
  {
    id: 'picoway',
    name: 'PicoWay',
    subtitle: 'Precision Laser Technology for Skin Clarity',
    description:
      'PicoWay uses advanced picosecond laser technology and may be used within personalised treatment plans for concerns including pigmentation, skin revitalisation and tattoo removal.',
    cta: 'Explore PicoWay',
    image: `${IMAGE_ROOT}/picoway.jpg`,
    position: '45% 50%',
    alt: 'Gloved practitioner holding a laser handpiece to a client’s cheek, the client wearing protective eyewear',
  },
  {
    id: 'advatx',
    name: 'ADVATx',
    subtitle: 'Advanced Laser Treatment for Healthier Skin',
    description:
      'ADVATx technology can be used to address a range of skin concerns including acne, redness, pigmentation and overall skin rejuvenation with zero thermal compromise.',
    cta: 'Explore ADVATx',
    image: `${IMAGE_ROOT}/advantx.jpg`,
    position: '50% 50%',
    alt: 'ADVATx laser handpiece directing a warm beam towards a client’s face',
  },
  {
    id: 'morpheus8',
    name: 'Morpheus8',
    subtitle: 'Advanced Skin Remodelling',
    description:
      'Morpheus8 combines fractional radiofrequency with microneedling technology to support skin remodelling, improved texture, skin tightening and subcutaneous adipose reshaping.',
    cta: 'Explore Morpheus8',
    image: `${IMAGE_ROOT}/Morpheus8.jpg`,
    position: '38% 50%',
    alt: 'Microneedling applicator tip poised above a client’s forehead',
  },
  {
    id: 'sofwave',
    name: 'Sofwave',
    subtitle: 'Non-Invasive Skin Tightening',
    description:
      'Sofwave uses ultrasound technology designed to stimulate collagen production and support firmer, tighter-looking skin across the face, submental and neck areas.',
    cta: 'Explore Sofwave',
    image: `${IMAGE_ROOT}/Sofwave.jpg`,
    position: '42% 50%',
    alt: 'Ultrasound applicator held beneath a relaxed client’s jawline',
  },
  {
    id: 'emsculpt_neo',
    name: 'Emsculpt Neo',
    subtitle: 'Body Contouring & Muscle Definition',
    description:
      'Emsculpt Neo combines radiofrequency energy with muscle stimulation technology to support body contouring and improved muscle definition simultaneously.',
    cta: 'Explore Emsculpt Neo',
    image: '/assets/images/site/emsculpt-neo.webp',
    position: '62% 45%',
    alt: 'An Emsculpt NEO applicator strapped across a client’s abdomen as she lies on a treatment bed',
  },
  {
    id: 'emerald_laser',
    name: 'Emerald Green Laser Lipo',
    subtitle: 'Non-Invasive Body Contouring',
    description:
      'Emerald Green Laser uses low-level laser technology as part of a non-invasive approach to body contouring, circumference reduction and holistic lymphatic wellness.',
    cta: 'Explore Emerald Green Laser',
    image: '/assets/images/site/emerald-laser.webp',
    position: '45% 55%',
    alt: 'A client in orange safety glasses lies beneath the Emerald laser’s curved arms as green laser lines cross her abdomen',
  },
];

// Layout breakpoints (keep in sync with SignatureTreatmentsSection.css).
const GRID_3 = '(min-width: 1000px)';
const GRID_2 = '(min-width: 640px)';

function subscribeLayout(onChange) {
  const queries = [GRID_3, GRID_2].map((q) => window.matchMedia(q));
  queries.forEach((q) => q.addEventListener('change', onChange));
  return () => queries.forEach((q) => q.removeEventListener('change', onChange));
}
const getColumns = () => (window.matchMedia(GRID_3).matches ? 3 : window.matchMedia(GRID_2).matches ? 2 : 1);
const getServerColumns = () => 3;

// Each card rises in as it reaches the viewport; cards in the same row fan in left to right.
const cardVariants = {
  hidden: { opacity: 0, y: 44, scale: 0.97 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: DURATION.slow, ease: EASE_OUT, delay },
  }),
};

const photoVariants = {
  hidden: { scale: 1.14 },
  show: (delay = 0) => ({ scale: 1, transition: { duration: 1.6, ease: EASE_OUT, delay } }),
};

const TILT = 2.5; // degrees at the card edge, kept deliberately small

function TreatmentCard({ treatment, delay, rail, onNavigate, reduce }) {
  const href = `/treatments/${treatment.id}`;
  const go = routeLinkHandler(onNavigate, 'treatment-detail', treatment.id);

  // Pointer tilt (mouse only): pointer position → spring-smoothed rotation.
  const bounds = useRef(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [TILT, -TILT]), SPRING_SOFT);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-TILT, TILT]), SPRING_SOFT);

  const onPointerEnter = (event) => {
    bounds.current = event.currentTarget.getBoundingClientRect();
  };
  const onPointerMove = (event) => {
    if (reduce || event.pointerType !== 'mouse' || !bounds.current) return;
    const { left, top, width, height } = bounds.current;
    px.set((event.clientX - left) / width - 0.5);
    py.set((event.clientY - top) / height - 0.5);
  };
  const onPointerLeave = () => {
    bounds.current = null;
    px.set(0);
    py.set(0);
  };

  const motionProps = reduce
    ? {}
    : {
        variants: cardVariants,
        custom: delay,
        initial: 'hidden',
        whileInView: 'show',
        // In the phone rail the next card only peeks in, so any visible sliver counts.
        viewport: { ...VIEWPORT, amount: rail ? 0 : 0.25 },
      };

  return (
    <motion.li className="ap-treatments__item" {...motionProps}>
      <motion.article
        className="ap-treatments__card"
        style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1400 }}
        whileHover={reduce ? undefined : { y: -8 }}
        transition={SPRING_SOFT}
        onPointerEnter={onPointerEnter}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <a className="ap-treatments__media" href={href} onClick={go} tabIndex={-1} aria-hidden="true">
          <span className="ap-treatments__zoom">
            <motion.img
              src={treatment.image}
              alt={treatment.alt}
              loading="lazy"
              decoding="async"
              style={{ objectPosition: treatment.position }}
              variants={reduce ? undefined : photoVariants}
              custom={delay}
            />
          </span>
        </a>

        <div className="ap-treatments__body">
          <h3 className="ap-treatments__title">{treatment.name}</h3>
          <p className="ap-treatments__subtitle">{treatment.subtitle}</p>
          <p className="ap-treatments__desc">{treatment.description}</p>
          <Button href={href} onClick={go} block className="ap-treatments__cta">
            {treatment.cta}
          </Button>
        </div>
      </motion.article>
    </motion.li>
  );
}

/**
 * Section 5 — "Advanced Treatments. Personalised to You."
 * Six white treatment cards on charcoal (3 x 2 on desktop, 2-up on tablet,
 * a swipeable snap rail on phones) and a link through to every treatment.
 */
export default function SignatureTreatmentsSection({ onNavigate }) {
  const reduce = useReducedMotion();
  const columns = useSyncExternalStore(subscribeLayout, getColumns, getServerColumns);
  const railRef = useRef(null);
  const { scrollXProgress } = useScroll({ container: railRef });
  const railSpring = useSpring(scrollXProgress, { stiffness: 260, damping: 40, mass: 0.4 });
  // The thumb starts at one card's share of the rail and fills as the rail is swiped.
  const railProgress = useTransform(reduce ? scrollXProgress : railSpring, [0, 1], [1 / TREATMENTS.length, 1]);

  return (
    <section id="treatments" className="ap-treatments" aria-labelledby="ap-treatments-title">
      <div className="ap-container">
        <SectionHeading
          id="ap-treatments-title"
          className="ap-treatments__head"
          title="Advanced Treatments."
          accent="Personalised to You."
          align="center"
          tone="dark"
          intro="Every technology works differently, which is why treatment recommendations should always begin with your individual concern and suitability."
          note="Explore some of our most sought-after treatments."
        />

        <ul ref={railRef} className="ap-treatments__grid" data-overflow-ok aria-label="Featured treatments">
          {TREATMENTS.map((treatment, index) => (
            <TreatmentCard
              key={treatment.id}
              treatment={treatment}
              // Stagger within a row; on the phone rail only the first two cards share the entrance.
              delay={(columns === 1 ? Math.min(index, 1) : index % columns) * 0.1}
              rail={columns === 1}
              onNavigate={onNavigate}
              reduce={reduce}
            />
          ))}
        </ul>

        <div className="ap-treatments__progress" aria-hidden="true">
          <motion.span style={{ scaleX: railProgress }} />
        </div>

        <Reveal className="ap-treatments__foot" delay={0.1}>
          <Button href="/treatments" onClick={routeLinkHandler(onNavigate, 'treatments')}>
            Explore All Treatments
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
