import { useCallback, useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  LayoutGroup,
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import { Reveal } from '../motion/Reveal';
import { EASE_INOUT, EASE_OUT, SPRING_SNAPPY, VIEWPORT } from '../motion/presets';
import './BeforeAfterSection.css';

// One before/after case per filter chip; `position` frames each photo in the wide frame.
// TODO before launch: none of these are Allure Passions UK patients. Skin is the site's old
// placeholder pair; Tightening and Body are InMode's Morpheus8 gallery photos (inmodemd.com,
// from other clinics), used uncredited while the design is signed off. Replace them with the
// clinic's own consented patient photos, or credit them (with the distributor's permission)
// and change the intro copy, which says these are treatments performed at the clinic.
const CASES = [
  {
    id: 'skin',
    label: 'Skin',
    before: {
      src: '/assets/images/before_face.jpg',
      alt: 'Before: close-up of facial skin with freckling and uneven pigmentation across the nose and cheek',
    },
    after: {
      src: '/assets/images/after_face.jpg',
      alt: 'After: the same view of the face with a clearer, more even skin tone',
    },
  },
  {
    id: 'tightening',
    label: 'Tightening',
    position: '50% 58%',
    before: {
      src: '/assets/images/results/tightening-face-before.webp',
      alt: 'Before: the lower face with deep lines around the mouth and softening along the jawline',
    },
    after: {
      src: '/assets/images/results/tightening-face-after.webp',
      alt: 'After: the same lower face looking firmer and smoother, with softer lines around the mouth',
    },
  },
  {
    id: 'body',
    label: 'Body',
    position: '50% 52%',
    before: {
      src: '/assets/images/results/body-abdomen-before.webp',
      alt: 'Before: the skin around the navel with deep crepey folds and loose texture',
    },
    after: {
      src: '/assets/images/results/body-abdomen-after.webp',
      alt: 'After: the same area with visibly smoother, tighter skin around the navel',
    },
  },
];

const SLIDER_MIN = 4;
const SLIDER_MAX = 96;
const clamp = (value) => Math.min(SLIDER_MAX, Math.max(SLIDER_MIN, value));

// Follows the pointer closely but glides when the handle jumps (click, tap, keys).
const HANDLE_SPRING = { stiffness: 560, damping: 48, mass: 0.55 };
// A gentle left-right sway that shows the comparison can be dragged.
const HINT_FRAMES = [50, 40, 60, 50];

/**
 * Draggable before/after comparison. Position lives in a motion value, so dragging never
 * re-renders React; the before layer is clipped and the handle is translated on the GPU.
 */
function CompareSlider({ item, hint }) {
  const reduce = useReducedMotion();
  // The drag hint (and the slower handle pop after the frame's opening wipe) is for the first case only.
  const hintPending = useRef(hint);
  const [handleDelay] = useState(hint ? 0.95 : 0.3);
  const frameRef = useRef(null);
  const handleRef = useRef(null);
  const ringRef = useRef(null);
  const gesture = useRef(null);
  const stopHint = useRef(() => {});
  const [dragging, setDragging] = useState(false);

  const target = useMotionValue(50);
  const smooth = useSpring(target, HANDLE_SPRING);
  const position = reduce ? target : smooth;
  const clipPath = useTransform(position, (v) => `inset(0 ${100 - v}% 0 0)`);
  const x = useTransform(position, (v) => `${v}%`);

  useMotionValueEvent(target, 'change', (value) => {
    const handle = handleRef.current;
    if (!handle) return;
    const rounded = Math.round(value);
    handle.setAttribute('aria-valuenow', String(rounded));
    handle.setAttribute('aria-valuetext', `${rounded}% before, ${100 - rounded}% after`);
  });

  // One-time idle hint the first time the comparison is properly in view.
  const inView = useInView(frameRef, { once: true, amount: 0.6 });
  useEffect(() => {
    if (!inView || reduce || !hintPending.current) return undefined;
    hintPending.current = false;
    const running = [];
    let started = false;
    const timer = window.setTimeout(() => {
      started = true;
      running.push(animate(target, HINT_FRAMES, { duration: 2.8, ease: 'easeInOut', times: [0, 0.3, 0.72, 1] }));
      if (ringRef.current) {
        running.push(
          animate(
            ringRef.current,
            { scale: [1, 1.9], opacity: [0.55, 0] },
            { duration: 1.4, ease: 'easeOut', repeat: 1, repeatDelay: 0.2 },
          ),
        );
      }
    }, 1100);
    const stop = () => {
      window.clearTimeout(timer);
      running.forEach((controls) => controls.stop());
    };
    stopHint.current = stop;
    return () => {
      stop();
      // Torn down before it began (e.g. a dev StrictMode re-run): let the next run play it.
      if (!started) hintPending.current = true;
    };
  }, [inView, reduce, target]);

  const valueFromClientX = useCallback((clientX) => {
    const rect = frameRef.current.getBoundingClientRect();
    return clamp(((clientX - rect.left) / rect.width) * 100);
  }, []);

  const onPointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    stopHint.current();
    gesture.current = { id: event.pointerId, startX: event.clientX, startY: event.clientY, active: false };
    // Mouse and pen drag straight away; touch waits to see if the swipe is horizontal (so the page can still scroll).
    if (event.pointerType !== 'touch') {
      event.preventDefault();
      gesture.current.active = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      target.set(valueFromClientX(event.clientX));
      handleRef.current?.focus({ preventScroll: true });
      setDragging(true);
    }
  };

  const onPointerMove = (event) => {
    const g = gesture.current;
    if (!g || g.id !== event.pointerId) return;
    if (!g.active) {
      const dx = Math.abs(event.clientX - g.startX);
      const dy = Math.abs(event.clientY - g.startY);
      if (dx < 6 || dx < dy) return;
      g.active = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      setDragging(true);
    }
    target.set(valueFromClientX(event.clientX));
  };

  const endGesture = (event) => {
    const g = gesture.current;
    if (!g || g.id !== event.pointerId) return;
    // A tap without a drag moves the divider to the tapped point.
    if (!g.active && event.type === 'pointerup') target.set(valueFromClientX(event.clientX));
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    gesture.current = null;
    setDragging(false);
  };

  const onKeyDown = (event) => {
    const step = event.shiftKey ? 10 : 2;
    const current = target.get();
    const next = {
      ArrowLeft: current - step,
      ArrowDown: current - step,
      ArrowRight: current + step,
      ArrowUp: current + step,
      PageDown: current - 10,
      PageUp: current + 10,
      Home: SLIDER_MIN,
      End: SLIDER_MAX,
    }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    stopHint.current();
    target.set(clamp(next));
  };

  return (
    <div
      ref={frameRef}
      className={`ap-results__compare${dragging ? ' is-dragging' : ''}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endGesture}
      onPointerCancel={endGesture}
    >
      <div className="ap-results__layer">
        <img
          className="ap-results__img"
          src={item.after.src}
          alt={item.after.alt}
          style={item.position ? { objectPosition: item.position } : undefined}
          loading="lazy"
          decoding="async"
          draggable="false"
        />
        <span className="ap-results__label ap-results__label--after" aria-hidden="true">
          After
        </span>
      </div>

      <motion.div className="ap-results__layer ap-results__layer--before" style={{ clipPath }}>
        <img
          className="ap-results__img"
          src={item.before.src}
          alt={item.before.alt}
          style={item.position ? { objectPosition: item.position } : undefined}
          loading="lazy"
          decoding="async"
          draggable="false"
        />
        <span className="ap-results__label ap-results__label--before" aria-hidden="true">
          Before
        </span>
      </motion.div>

      <motion.div className="ap-results__divider" style={{ x }}>
        <span className="ap-results__rule" aria-hidden="true" />
        <motion.div
          className="ap-results__handle-pop"
          initial={reduce ? false : { opacity: 0, scale: 0.4 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={VIEWPORT}
          transition={{ ...SPRING_SNAPPY, delay: handleDelay }}
        >
          <div
            ref={handleRef}
            className="ap-results__handle"
            role="slider"
            tabIndex={0}
            aria-label="Before and after comparison"
            aria-orientation="horizontal"
            aria-valuemin={SLIDER_MIN}
            aria-valuemax={SLIDER_MAX}
            aria-valuenow={50}
            aria-valuetext="50% before, 50% after"
            onKeyDown={onKeyDown}
          >
            <span ref={ringRef} className="ap-results__ring" aria-hidden="true" />
            <span className="ap-results__handle-core" aria-hidden="true">
              <ChevronLeft size={18} strokeWidth={2} />
              <ChevronRight size={18} strokeWidth={2} />
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/**
 * Section 7 — Real Treatments. Real Patient Journeys.
 * Filter chips (gliding gold pill), each showing its own draggable before/after frame.
 */
export default function BeforeAfterSection() {
  const reduce = useReducedMotion();
  const [caseId, setCaseId] = useState(CASES[0].id);
  const [switched, setSwitched] = useState(false);
  const current = CASES.find((entry) => entry.id === caseId);

  const choose = (id) => {
    if (id === caseId) return;
    setCaseId(id);
    setSwitched(true);
  };
  // Watch an unclipped wrapper: Chrome's IntersectionObserver honours the frame's own clip-path,
  // so a frame that starts fully clipped would never register as in view.
  const frameAnchorRef = useRef(null);
  const frameInView = useInView(frameAnchorRef, VIEWPORT);

  return (
    <section id="results" className="ap-section ap-results" aria-labelledby="ap-results-title">
      <div className="ap-container">
        <SectionHeading
          id="ap-results-title"
          className="ap-results__heading"
          align="center"
          title="Real Treatments."
          accent="Real Patient Journeys."
          intro="Explore a selection of before-and-after results from treatments performed at Allure Passions UK Aesthetic Clinic."
          note="Every patient is different, and results can vary depending on the individual, treatment and treatment plan."
        />

        <Reveal delay={0.3} className="ap-results__filters-wrap">
          <LayoutGroup id="ap-results-filters">
            <div className="ap-results__filters" role="group" aria-label="Filter results by category">
              {CASES.map((entry) => {
                const active = entry.id === caseId;
                return (
                  <button
                    key={entry.id}
                    type="button"
                    className={`ap-results__chip${active ? ' is-active' : ''}`}
                    aria-pressed={active}
                    aria-controls="ap-results-frame"
                    onClick={() => choose(entry.id)}
                  >
                    {active ? (
                      <motion.span
                        layoutId="ap-results-pill"
                        className="ap-results__pill"
                        transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 36 }}
                        aria-hidden="true"
                      />
                    ) : null}
                    <span className="ap-results__chip-label">{entry.label}</span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </Reveal>

        <div ref={frameAnchorRef} className="ap-results__frame-anchor">
          <motion.div
            id="ap-results-frame"
            className="ap-results__frame"
            role="group"
            aria-label="Before and after results"
            initial={reduce ? false : { clipPath: 'inset(0% 50% 0% 50% round 24px)' }}
            animate={frameInView ? { clipPath: 'inset(0% 0% 0% 0% round 24px)' } : undefined}
            transition={{ duration: 1.3, ease: EASE_INOUT }}
          >
            <motion.div
              className="ap-results__zoom"
              initial={reduce ? false : { scale: 1.12 }}
              animate={frameInView ? { scale: 1 } : undefined}
              transition={{ duration: 1.8, ease: EASE_OUT }}
            >
              <AnimatePresence initial={false}>
                <motion.div
                  key={current.id}
                  className="ap-results__stage"
                  initial={{ opacity: 0, scale: 1.035 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={reduce ? { duration: 0 } : { duration: 0.7, ease: EASE_OUT }}
                >
                  <CompareSlider item={current} hint={!switched} />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>

        <p className="ap-visually-hidden" aria-live="polite">
          {`Showing ${current.label.toLowerCase()} result.`}
        </p>
      </div>
    </section>
  );
}
