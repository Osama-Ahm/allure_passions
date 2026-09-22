import { useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react';
import { animate, motion, useInView, useMotionValue, useReducedMotion } from 'motion/react';
import SectionHeading from './ui/SectionHeading';
import Button from './ui/Button';
import TextReveal from '../motion/TextReveal';
import { Reveal } from '../motion/Reveal';
import { EASE_INOUT, EASE_OUT, VIEWPORT } from '../motion/presets';
import { routeLinkHandler } from '../utils/navigation';
import './PillarsSection.css';

// `measure` reproduces the Figma line breaks at 1440 (each text box there has its own width).
const EXPERTISE = [
  {
    title: 'JCCP Registered',
    text: 'Professional registration supporting recognised standards within aesthetic practice.',
    measure: '18.4rem',
  },
  {
    title: 'Advanced Aesthetic Practitioner',
    text: 'Advanced knowledge and experience across skin, body and aesthetic treatments.',
  },
  {
    title: 'Professional Qualifications',
    text: 'Level 6 and current professional qualifications supporting advanced aesthetic practice.',
  },
  {
    title: 'Advanced Technology Training',
    text: 'Training across the specialist devices and technologies offered within the clinic.',
    measure: '23rem',
  },
  {
    title: 'Continuing Professional Education',
    text: 'Ongoing development to remain informed about evolving treatment techniques, technologies and professional standards.',
  },
  {
    title: 'Professional Standards & Memberships',
    text: 'A commitment to responsible, patient-centred aesthetic care.',
  },
];

// One continuous photograph runs behind the whole panel, as in the Figma.
const PANEL_IMAGE = '/assets/images/hero_clinic_ambiance.png';

const GLIDE = { duration: 0.9, ease: EASE_INOUT };
const PUSH_IN = { duration: 8, times: [0, 0.11, 1], ease: ['easeInOut', 'easeOut'] };

const panelVariants = { hidden: {}, show: {} };
const settleVariants = {
  hidden: { scale: 1.1 },
  show: { scale: 1, transition: { duration: 1.8, ease: EASE_OUT } },
};
const photoVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.2, ease: EASE_OUT } },
};
const glowVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.1, ease: EASE_OUT, delay: 0.85 } },
};
const lineVariants = {
  hidden: ({ axis }) => ({ [axis]: 0 }),
  show: ({ axis, order }) => ({
    [axis]: 1,
    transition: { duration: 1.3, ease: EASE_INOUT, delay: 0.25 + order * 0.1 },
  }),
};
const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.3 } },
};
const cellVariants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE_OUT } },
};

const LINES = [
  { id: 'v1', axis: 'scaleY', order: 0 },
  { id: 'v2', axis: 'scaleY', order: 1 },
  { id: 'h1', axis: 'scaleX', order: 0 },
  { id: 'h2', axis: 'scaleX', order: 1 },
];

const SINGLE_COLUMN = '(max-width: 639px)';
const subscribeSingleColumn = (onChange) => {
  const query = window.matchMedia(SINGLE_COLUMN);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
};
const getSingleColumn = () => window.matchMedia(SINGLE_COLUMN).matches;
const getSingleColumnServer = () => false;

/** Measures every cell inside the panel so the highlight window can glide between them. */
function useCellGeometry(panelRef, cellRefs) {
  const [geometry, setGeometry] = useState(null);

  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) return undefined;
    const measure = () => {
      const rects = cellRefs.current.map((cell) =>
        cell ? { x: cell.offsetLeft, y: cell.offsetTop, w: cell.offsetWidth, h: cell.offsetHeight } : null,
      );
      setGeometry({ w: panel.clientWidth, h: panel.clientHeight, rects });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(panel);
    return () => observer.disconnect();
  }, [panelRef, cellRefs]);

  return geometry;
}

/**
 * Section 4 — Expertise Behind Every Treatment + Personalised Treatment Guidance.
 * Six credentials over one dimmed clinic photograph. A warm olive "window" onto the same
 * photograph glides to whichever credential is hovered (on phones: whichever sits mid-screen)
 * and slowly pushes in on it.
 */
export default function PillarsSection({ onNavigate }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const panelRef = useRef(null);
  const cellRefs = useRef([]);
  const geometry = useCellGeometry(panelRef, cellRefs);
  const inView = useInView(panelRef, { once: true, amount: 0.25 });
  const singleColumn = useSyncExternalStore(subscribeSingleColumn, getSingleColumn, getSingleColumnServer);

  const litScale = useMotionValue(1);
  const originX = useMotionValue(1 / 6);
  const originY = useMotionValue(0.25);

  const setCellRef = useCallback(
    (index) => (node) => {
      cellRefs.current[index] = node;
    },
    [],
  );

  // Phones: the credential crossing the middle of the screen becomes the active one.
  useEffect(() => {
    if (!singleColumn) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number(entry.target.dataset.index));
        });
      },
      { rootMargin: '-48% 0px -48% 0px' },
    );
    cellRefs.current.forEach((cell) => cell && observer.observe(cell));
    return () => observer.disconnect();
  }, [singleColumn]);

  const rect = geometry?.rects[active];
  const clip = rect
    ? `inset(${rect.y}px ${geometry.w - rect.x - rect.w}px ${geometry.h - rect.y - rect.h}px ${rect.x}px)`
    : 'inset(0% 66.667% 50% 0%)';
  const focusX = rect ? (rect.x + rect.w / 2) / geometry.w : 1 / 6;
  const focusY = rect ? (rect.y + rect.h / 2) / geometry.h : 0.25;

  // The lit photograph re-centres on the active cell, eases back to 1 and slowly pushes in again.
  useEffect(() => {
    if (reduce || !inView) {
      originX.set(focusX);
      originY.set(focusY);
      litScale.set(1);
      return undefined;
    }
    const moves = [
      animate(originX, focusX, GLIDE),
      animate(originY, focusY, GLIDE),
      animate(litScale, [litScale.get(), 1, 1.06], PUSH_IN),
    ];
    return () => moves.forEach((move) => move.stop());
  }, [active, focusX, focusY, reduce, inView, originX, originY, litScale]);

  const entrance = reduce ? {} : { initial: 'hidden', whileInView: 'show', viewport: { ...VIEWPORT, amount: 0.25 } };
  const variantsIf = (variants) => (reduce ? undefined : variants);

  return (
    <section id="expertise" className="ap-expertise" aria-labelledby="ap-expertise-title">
      <div className="ap-container">
        <SectionHeading
          id="ap-expertise-title"
          className="ap-expertise__heading"
          title="Expertise Behind"
          accent="Every Treatment"
          align="center"
          intro={[
            'Choosing an aesthetic clinic is about more than technology.',
            'It is about knowing that your treatment is supported by appropriate training, professional standards and an ongoing commitment to safe and responsible practice.',
          ]}
        />

        <motion.div ref={panelRef} className="ap-expertise__panel" variants={panelVariants} {...entrance}>
          <motion.div className="ap-expertise__backdrop" aria-hidden="true" variants={variantsIf(settleVariants)}>
            <motion.img
              className="ap-expertise__photo"
              src={PANEL_IMAGE}
              alt=""
              loading="lazy"
              decoding="async"
              variants={variantsIf(photoVariants)}
            />
          </motion.div>

          {/* The warm window: the same photograph, lifted and tinted, clipped to the active cell */}
          <motion.div className="ap-expertise__glow-wrap" aria-hidden="true" variants={variantsIf(glowVariants)}>
            <motion.div
              className="ap-expertise__glow"
              initial={false}
              animate={{ clipPath: clip }}
              transition={reduce ? { duration: 0 } : GLIDE}
            >
              <motion.div className="ap-expertise__glow-media" variants={variantsIf(settleVariants)}>
                <motion.img
                  className="ap-expertise__photo ap-expertise__photo--lit"
                  src={PANEL_IMAGE}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  style={{ scale: litScale, originX, originY }}
                />
              </motion.div>
            </motion.div>
          </motion.div>

          <div className="ap-expertise__lines" aria-hidden="true">
            {LINES.map((line) => (
              <motion.span
                key={line.id}
                className={`ap-expertise__line ap-expertise__line--${line.id}`}
                variants={variantsIf(lineVariants)}
                custom={line}
              />
            ))}
          </div>

          <motion.ul className="ap-expertise__grid" variants={variantsIf(gridVariants)}>
            {EXPERTISE.map((entry, index) => (
              <motion.li
                key={entry.title}
                ref={setCellRef(index)}
                data-index={index}
                className={`ap-expertise__cell${index === active ? ' is-active' : ''}`}
                variants={variantsIf(cellVariants)}
                onPointerEnter={(event) => {
                  if (event.pointerType === 'mouse') setActive(index);
                }}
                onClick={() => setActive(index)}
              >
                <span className="ap-expertise__ring" aria-hidden="true" />
                <span className="ap-expertise__edge" aria-hidden="true" />
                <span className="ap-expertise__index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="ap-expertise__copy" style={entry.measure ? { '--measure': entry.measure } : undefined}>
                  <h3 className="ap-expertise__title">{entry.title}</h3>
                  <p className="ap-expertise__text">{entry.text}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <div className="ap-expertise__guidance">
          <div className="ap-expertise__guidance-copy">
            <TextReveal as="h3" className="ap-expertise__guidance-title">
              Personalised Treatment Guidance
            </TextReveal>
            <Reveal as="p" delay={0.12} className="ap-expertise__guidance-text">
              Comprehensive clinical consultation prior to any energy or medical protocol.
            </Reveal>
          </div>
          <Reveal delay={0.2} className="ap-expertise__guidance-action">
            <Button href="/about" onClick={routeLinkHandler(onNavigate, 'about')}>
              Meet Your Practitioner
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
