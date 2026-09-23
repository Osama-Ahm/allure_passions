import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import SectionHeading from './ui/SectionHeading';
import ArrowButton from './ui/ArrowButton';
import Button from './ui/Button';
import ResponsiveImg from './ui/ResponsiveImg';
import { coverWidth, preloadResponsive } from '../utils/responsiveImages';
import { Reveal } from '../motion/Reveal';
import { EASE_INOUT, EASE_OUT } from '../motion/presets';
import { POPULAR_TREATMENTS } from '../data/treatmentData';
import { routeLinkHandler } from '../utils/navigation';
import './BodyContouringSection.css';

const TREATMENT = Object.fromEntries(POPULAR_TREATMENTS.map((t) => [t.id, t]));
const plainName = (id) => TREATMENT[id].name.replace(/[®™]/g, '').replace(/\s+/g, ' ').trim();

// Title / subtitle / description come from POPULAR_TREATMENTS (tagline, summary); the three
// "support" lines only use concerns that CONCERNS_LIST maps to that treatment.
const fromData = (id, rest) => ({
  id,
  title: plainName(id),
  subtitle: TREATMENT[id].tagline,
  description: TREATMENT[id].summary,
  ...rest,
});

const TECHNOLOGIES = [
  {
    id: 'emsculpt_neo',
    title: 'Emsculpt Neo',
    label: 'Emsculpt Neo',
    subtitle: 'Redefining Body Contouring',
    description:
      'Emsculpt Neo combines radiofrequency technology with high-intensity muscle stimulation to provide an advanced approach to body contouring.',
    supports: ['Body contouring', 'Muscle tone', 'Muscle definition'],
    image: '/assets/images/site/emsculpt-neo.webp',
    position: '60% 45%',
    alt: 'An Emsculpt NEO applicator strapped across a client’s abdomen as she lies on a treatment bed',
  },
  fromData('emerald_laser', {
    label: 'Emerald Laser',
    supports: ['Stubborn fat deposits', 'Body contouring', 'Body slimming'],
    image: '/assets/images/site/emerald-laser.webp',
    position: '45% 55%',
    alt: 'A client in orange safety glasses lies beneath the Emerald laser’s curved arms as green laser lines cross her abdomen',
  }),
  fromData('morpheus8', {
    label: 'Morpheus8',
    supports: ['Skin laxity & sagging', 'Fine lines & wrinkles', 'Acne scarring'],
    image: '/assets/images/site/treatment-morpheus8.webp',
    position: '46% 50%',
    alt: 'A radiofrequency microneedling handpiece held against a patient’s cheek during treatment',
  }),
  fromData('sofwave', {
    label: 'Sofwave',
    supports: ['Skin laxity & sagging', 'Fine lines & wrinkles', 'Signs of ageing'],
    image: '/assets/images/site/treatment-sofwave.webp',
    position: '56% 50%',
    alt: 'A practitioner guiding an ultrasound handpiece along a patient’s jawline',
  }),
  fromData('picoway', {
    label: 'PicoWay',
    supports: ['Hyperpigmentation', 'Acne scarring', 'Tattoo removal'],
    image: '/assets/images/site/treatment-picoway.webp',
    position: '56% 50%',
    alt: 'A patient wearing protective eyewear while a laser handpiece is used on her cheek',
  }),
  fromData('advatx', {
    label: 'ADVATx',
    supports: ['Active acne', 'Rosacea & redness', 'Hyperpigmentation'],
    image: '/assets/images/site/treatment-advatx.webp',
    position: '56% 50%',
    alt: 'A gloved practitioner holding a laser handpiece to a patient’s cheek, with protective eyewear in place',
  }),
];

const TOTAL = TECHNOLOGIES.length;
const FOOTNOTE = '*Subject to preliminary physical assessment and suitability criteria during clinical intake.';

// Rendered width of a photo below 1280px: full card width in a 5:4.4 (phones) or 4:3 frame,
// then a ~544px-tall column beside the copy (see BodyContouringSection.css).
const photoSizes = (src) =>
  `(max-width: 600px) ${coverWidth(src, 100, 88)}vw, (max-width: 860px) ${coverWidth(src, 100, 75)}vw, ${coverWidth(src, 360, 544)}px`;
const pad = (n) => String(n).padStart(2, '0');

// Photo: the incoming frame wipes across the outgoing one, which drifts away underneath.
const frameVariants = {
  enter: (dir) => ({ clipPath: dir > 0 ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)', x: '0%', zIndex: 2 }),
  center: { clipPath: 'inset(0% 0% 0% 0%)', x: '0%', zIndex: 2, transition: { duration: 1.05, ease: EASE_INOUT } },
  exit: (dir) => ({ x: `${dir * -14}%`, zIndex: 1, transition: { duration: 1.05, ease: EASE_INOUT } }),
};
const photoVariants = {
  enter: (dir) => ({ scale: 1.16, x: `${dir * 7}%` }),
  center: { scale: 1, x: '0%', transition: { duration: 1.5, ease: EASE_OUT } },
  exit: { scale: 1.06, transition: { duration: 1.05, ease: EASE_INOUT } },
};

// Copy: lines rise in one after another, from the side the slide is travelling from.
const copyVariants = {
  enter: {},
  center: { transition: { staggerChildren: 0.055, delayChildren: 0.06 } },
  exit: { transition: { staggerChildren: 0.015, staggerDirection: -1 } },
};
const lineVariants = {
  enter: (dir) => ({ opacity: 0, x: dir * 26, y: 6 }),
  center: { opacity: 1, x: 0, y: 0, transition: { duration: 0.75, ease: EASE_OUT } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.24, ease: EASE_INOUT } },
};

const STILL = { enter: {}, center: {}, exit: {} };

function BadgeTick() {
  return (
    <svg className="ap-tech__tick" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
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

/** The right-hand copy of one technology. `still` renders plain markup (used to size the card). */
function TechCopy({ tech, dir = 1, still = false, reduce = false, onNavigate }) {
  const M = still ? 'div' : motion.div;
  const variants = still || reduce ? STILL : lineVariants;
  const line = still ? {} : { variants, custom: dir };
  return (
    <>
      <M className="ap-tech__head" {...line}>
        <h3 className="ap-tech__title">{tech.title}</h3>
        <p className="ap-tech__subtitle">{tech.subtitle}</p>
      </M>
      <M className="ap-tech__desc" {...line}>
        <p>{tech.description}</p>
      </M>
      <M className="ap-tech__lead" {...line}>
        <p>It may be considered by patients looking to support:</p>
      </M>
      <ul className="ap-tech__list">
        {tech.supports.map((text) => (
          <motion.li key={text} className="ap-tech__item" variants={variants} custom={dir}>
            <BadgeTick />
            <span>{text}</span>
          </motion.li>
        ))}
      </ul>
      <M className="ap-tech__foot" {...line}>
        <p>{FOOTNOTE}</p>
      </M>
      <M className="ap-tech__cta" {...line}>
        <Button
          block
          href={`/treatments/${tech.id}`}
          onClick={routeLinkHandler(onNavigate, 'treatment-detail', tech.id)}
          tabIndex={still ? -1 : undefined}
        >
          Discover {tech.label}
        </Button>
      </M>
    </>
  );
}

/**
 * Section 12 — Discover Our Signature Technologies.
 * One white card that steps through the six technologies: the photo wipes across in the
 * direction of travel while the copy re-staggers. Arrows (either side of the card, or over the
 * photo on phones), swipe/drag and ←/→ keys all work.
 */
export default function BodyContouringSection({ onNavigate }) {
  const reduce = useReducedMotion();
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, amount: 0.3 });
  const [[index, dir], setSlide] = useState([0, 1]);
  const tech = TECHNOLOGIES[index];

  const go = useCallback((delta) => {
    setSlide(([current]) => [(current + delta + TOTAL) % TOTAL, delta > 0 ? 1 : -1]);
  }, []);
  const goTo = useCallback((target) => {
    setSlide(([current]) => (target === current ? [current, 1] : [target, target > current ? 1 : -1]));
  }, []);

  // Warm the cache so every wipe reveals a decoded photo.
  useEffect(() => {
    if (!inView) return;
    TECHNOLOGIES.forEach(({ image }) => preloadResponsive(image, photoSizes(image)));
  }, [inView]);

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
    const swipe = info.offset.x + info.velocity.x * 0.18;
    if (swipe < -70) go(1);
    else if (swipe > 70) go(-1);
  };

  const playing = reduce || inView;

  return (
    <section className="ap-tech" aria-labelledby="ap-tech-title">
      <div className="ap-container">
        <SectionHeading
          id="ap-tech-title"
          className="ap-tech__heading"
          title="Discover Our Signature"
          accent="Technologies"
          align="center"
          tone="dark"
          intro="The right treatment depends on what you would like to improve, your individual assessment and what is appropriate for you."
          note="Advanced technology gives us different ways to address different concerns."
        />

        <div
          className="ap-tech__carousel"
          role="region"
          aria-roledescription="carousel"
          aria-label="Signature technologies (use the left and right arrow keys to browse)"
          tabIndex={0}
          onKeyDown={onKeyDown}
        >
          <Reveal className="ap-tech__stage" delay={0.05} amount={0.15}>
            <motion.div
              ref={cardRef}
              className="ap-tech__card"
              drag={reduce ? false : 'x'}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.14}
              dragSnapToOrigin
              onDragEnd={onDragEnd}
            >
              <motion.div
                className="ap-tech__media"
                initial={reduce ? false : { clipPath: 'inset(100% 0% 0% 0% round 12px)' }}
                animate={playing ? { clipPath: 'inset(0% 0% 0% 0% round 12px)' } : undefined}
                transition={{ duration: 1.2, ease: EASE_INOUT, delay: 0.15 }}
              >
                <AnimatePresence initial={false} custom={dir}>
                  <motion.div
                    key={tech.id}
                    className="ap-tech__frame"
                    custom={dir}
                    variants={reduce ? STILL : frameVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    <ResponsiveImg
                      as={motion.img}
                      className="ap-tech__photo"
                      src={tech.image}
                      sizes={photoSizes(tech.image)}
                      alt={tech.alt}
                      loading="lazy"
                      decoding="async"
                      draggable="false"
                      style={{ objectPosition: tech.position }}
                      custom={dir}
                      variants={reduce ? STILL : photoVariants}
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              <div className="ap-tech__body">
                {/* Every slide stacked invisibly, so the card is always as tall as the longest one. */}
                <div className="ap-tech__sizer" aria-hidden="true" inert>
                  {TECHNOLOGIES.map((item) => (
                    <div key={item.id} className="ap-tech__copy">
                      <TechCopy tech={item} still />
                    </div>
                  ))}
                </div>
                <div className="ap-tech__live" aria-live="polite">
                  <AnimatePresence mode="wait" initial={false} custom={dir}>
                    <motion.div
                      key={tech.id}
                      className="ap-tech__copy"
                      role="group"
                      aria-roledescription="slide"
                      aria-label={`${index + 1} of ${TOTAL}: ${tech.title}`}
                      variants={reduce ? STILL : copyVariants}
                      initial="enter"
                      animate={playing ? 'center' : 'enter'}
                      exit="exit"
                    >
                      <TechCopy tech={tech} dir={dir} reduce={reduce} onNavigate={onNavigate} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Beside the card, vertically centred, so they stay in view with the card */}
            <div className="ap-tech__nav ap-tech__nav--prev">
              <ArrowButton dir="prev" label="Previous technology" onClick={() => go(-1)} />
            </div>
            <div className="ap-tech__nav ap-tech__nav--next">
              <ArrowButton dir="next" label="Next technology" onClick={() => go(1)} />
            </div>
          </Reveal>

          <Reveal className="ap-tech__controls" delay={0.2} amount={0.5}>
            <p className="ap-tech__count" aria-hidden="true">
              <span className="ap-tech__count-now">
                <AnimatePresence mode="popLayout" initial={false} custom={dir}>
                  <motion.span
                    key={index}
                    custom={dir}
                    initial={reduce ? false : { y: `${dir * 100}%`, opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { y: `${dir * -100}%`, opacity: 0 }}
                    transition={{ duration: 0.6, ease: EASE_OUT }}
                  >
                    {pad(index + 1)}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="ap-tech__count-sep">/</span>
              <span>{pad(TOTAL)}</span>
            </p>

            <ol className="ap-tech__ticks">
              {TECHNOLOGIES.map((item, i) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className="ap-tech__tick-btn"
                    aria-label={`Show ${item.label}`}
                    aria-current={i === index ? 'true' : undefined}
                    onClick={() => goTo(i)}
                  >
                    <span className="ap-tech__tick-bar" />
                  </button>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
