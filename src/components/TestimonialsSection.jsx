import { useCallback, useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion } from 'motion/react';
import SectionHeading from './ui/SectionHeading';
import Button from './ui/Button';
import ArrowButton from './ui/ArrowButton';
import { Reveal } from '../motion/Reveal';
import { VIEWPORT, cardItem, stagger } from '../motion/presets';
import { REVIEWS } from '../data/treatmentData';
import { GOOGLE_REVIEWS_URL } from '../data/links';
import './TestimonialsSection.css';

const SLIDE_SPRING = { type: 'spring', stiffness: 210, damping: 32, mass: 0.9 };

const starVariants = {
  hidden: { scale: 0.2, opacity: 0, rotate: -40 },
  show: (i) => ({
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: { delay: 0.55 + i * 0.09, type: 'spring', stiffness: 420, damping: 17 },
  }),
};

const initialsOf = (name) =>
  name
    .replace(/^(Dr|Mr|Mrs|Ms|Miss)\.?\s+/i, '')
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .replace(/[^A-Za-z]/g, '')
    .slice(0, 2)
    .toUpperCase();

function GoogleMark() {
  return (
    <svg className="ap-reviews__google" viewBox="0 0 48 48" width="20" height="20" role="img" aria-label="Google review">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"
      />
    </svg>
  );
}

const STAR_PATH =
  'M12 2.4l2.83 5.99 6.57.8-4.84 4.52 1.26 6.5L12 16.97l-5.82 3.24 1.26-6.5L2.6 9.19l6.57-.8L12 2.4z';

function Stars({ rating, reduce }) {
  return (
    <div className="ap-reviews__stars" role="img" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span className="ap-reviews__star" key={i} aria-hidden="true">
          <svg viewBox="0 0 24 24" className="ap-reviews__star-base">
            <path d={STAR_PATH} />
          </svg>
          {i < rating ? (
            <motion.svg
              viewBox="0 0 24 24"
              className="ap-reviews__star-fill"
              {...(reduce ? {} : { variants: starVariants, custom: i })}
            >
              <path d={STAR_PATH} />
            </motion.svg>
          ) : null}
        </span>
      ))}
    </div>
  );
}

function ReviewCard({ review, index, total, reduce }) {
  const motionProps = reduce
    ? {}
    : {
        variants: cardItem,
        whileHover: { y: -6, transition: { type: 'spring', stiffness: 320, damping: 26 } },
      };
  return (
    <motion.article
      className="ap-reviews__card"
      role="group"
      aria-roledescription="slide"
      aria-label={`Review ${index + 1} of ${total}`}
      {...motionProps}
    >
      <span className="ap-reviews__glow" aria-hidden="true" />
      <header className="ap-reviews__head">
        <span className="ap-reviews__avatar" aria-hidden="true">
          {initialsOf(review.author)}
        </span>
        <div className="ap-reviews__who">
          <h3 className="ap-reviews__name">{review.author}</h3>
          <p className="ap-reviews__date">{review.date}</p>
        </div>
        <GoogleMark />
      </header>
      <Stars rating={review.rating} reduce={reduce} />
      <blockquote className="ap-reviews__quote">
        <p>{review.text}</p>
      </blockquote>
      <p className="ap-reviews__tag">{review.treatment}</p>
    </motion.article>
  );
}

/**
 * Section 10 — "What Our Patients Say". Figma review cards (warm corner glow, Google mark,
 * gold stars) in a draggable carousel: three across at 1440, two on tablets, one on phones.
 */
export default function TestimonialsSection() {
  const reduce = useReducedMotion();
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const metricsRef = useRef({ step: 0, max: 0, visible: 1 });
  const [metrics, setMetrics] = useState({ step: 0, max: 0, visible: 1, maxIndex: 0 });
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);
  const x = useMotionValue(0);
  const thumbX = useMotionValue('0%');
  const total = REVIEWS.length;

  const offsetFor = useCallback((i) => {
    const { step, max } = metricsRef.current;
    return -Math.min(i * step, max);
  }, []);

  const syncThumb = useCallback(
    (value) => {
      const { max, visible } = metricsRef.current;
      const progress = max > 0 ? Math.min(1, Math.max(0, -value / max)) : 0;
      const travel = visible > 0 ? ((total - visible) / visible) * 100 : 0;
      thumbX.set(`${progress * travel}%`);
    },
    [thumbX, total],
  );

  useMotionValueEvent(x, 'change', syncThumb);

  // Measure card pitch and overflow; re-measure whenever the viewport resizes.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    const measure = () => {
      const cards = track.children;
      if (!cards.length) return;
      const first = cards[0];
      const last = cards[cards.length - 1];
      const step = cards.length > 1 ? cards[1].offsetLeft - first.offsetLeft : first.offsetWidth;
      const contentWidth = last.offsetLeft + last.offsetWidth - first.offsetLeft;
      const max = Math.max(0, Math.round(contentWidth - track.clientWidth));
      const visible = Math.min(total, Math.max(1, Math.round((track.clientWidth + (step - first.offsetWidth)) / step)));
      const maxIndex = step ? Math.ceil(max / step - 0.02) : 0;
      metricsRef.current = { step, max, visible };
      setMetrics({ step, max, visible, maxIndex });
      const clamped = Math.min(indexRef.current, maxIndex);
      indexRef.current = clamped;
      setIndex(clamped);
      x.set(offsetFor(clamped));
      syncThumb(x.get());
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [offsetFor, syncThumb, total, x]);

  const goTo = useCallback(
    (next, velocity = 0) => {
      const clamped = Math.max(0, Math.min(next, metrics.maxIndex));
      indexRef.current = clamped;
      setIndex(clamped);
      const target = offsetFor(clamped);
      if (reduce) x.set(target);
      else animate(x, target, { ...SLIDE_SPRING, velocity });
    },
    [metrics.maxIndex, offsetFor, reduce, x],
  );

  const onDragEnd = (_, info) => {
    const { step } = metricsRef.current;
    if (!step) return;
    const projected = x.get() + info.velocity.x * 0.22;
    goTo(Math.round(-projected / step), info.velocity.x);
  };

  const onKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(index + 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(index - 1);
    }
  };

  const canSlide = metrics.maxIndex > 0;
  const firstShown = index + 1;
  const lastShown = Math.min(total, index + metrics.visible);
  const status =
    firstShown === lastShown
      ? `Showing review ${firstShown} of ${total}`
      : `Showing reviews ${firstShown} to ${lastShown} of ${total}`;

  const trackMotion = reduce
    ? {}
    : {
        variants: stagger(0.11, 0.05),
        initial: 'hidden',
        whileInView: 'show',
        viewport: VIEWPORT,
      };

  return (
    <section className="ap-reviews" aria-labelledby="ap-reviews-title">
      <div className="ap-container">
        <SectionHeading
          id="ap-reviews-title"
          className="ap-reviews__heading"
          title="What Our"
          accent="Patients Say"
          align="center"
          intro={[
            'The experience of our patients is at the centre of everything we do.',
            'Read genuine Google reviews from patients who have visited Allure Passions UK Aesthetic Clinic for their skin, body and aesthetic treatment journeys.',
          ]}
        />

        <div className="ap-reviews__frame">
          <div
            ref={viewportRef}
            className={`ap-reviews__viewport${canSlide ? ' is-slidable' : ''}`}
            data-overflow-ok
            role="region"
            aria-roledescription="carousel"
            aria-label="Patient reviews"
            tabIndex={canSlide ? 0 : undefined}
            onKeyDown={canSlide ? onKeyDown : undefined}
          >
            <motion.div
              ref={trackRef}
              className="ap-reviews__track"
              style={{ x }}
              drag={canSlide ? 'x' : false}
              dragConstraints={{ left: -metrics.max, right: 0 }}
              dragElastic={0.08}
              dragMomentum={false}
              onDragEnd={onDragEnd}
              {...trackMotion}
            >
              {REVIEWS.map((review, i) => (
                <ReviewCard key={review.id} review={review} index={i} total={total} reduce={reduce} />
              ))}
            </motion.div>
          </div>
          <p className="ap-visually-hidden" aria-live="polite">
            {canSlide ? status : ''}
          </p>

          <Reveal className={`ap-reviews__controls${canSlide ? '' : ' is-static'}`} delay={0.15}>
            {canSlide ? (
              <div className="ap-reviews__progress" aria-hidden="true">
                <span className="ap-reviews__count">
                  {String(lastShown).padStart(2, '0')}
                  <span className="ap-reviews__count-total"> / {String(total).padStart(2, '0')}</span>
                </span>
                <span className="ap-reviews__rail">
                  <motion.span
                    className="ap-reviews__thumb"
                    style={{ width: `${(metrics.visible / total) * 100}%`, x: thumbX }}
                  />
                </span>
              </div>
            ) : null}

            <Button
              className="ap-reviews__cta"
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              View More Google Reviews
            </Button>

            {canSlide ? (
              <div className="ap-arrows ap-reviews__arrows">
                <ArrowButton
                  dir="prev"
                  label="Previous reviews"
                  onClick={() => goTo(index - 1)}
                  disabled={index === 0}
                />
                <ArrowButton
                  dir="next"
                  label="Next reviews"
                  onClick={() => goTo(index + 1)}
                  disabled={index >= metrics.maxIndex}
                />
              </div>
            ) : null}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
