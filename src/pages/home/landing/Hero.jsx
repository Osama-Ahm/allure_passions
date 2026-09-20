import { useCallback, useRef, useState } from 'react';
import PillButton from '../../../components/ui/PillButton';
import { heroSlides } from '../../../content/heroSlides';
import { prefersReducedMotion } from '../../../lib/motion';
import { clamp01, pad2, useScrollFrame } from './useLandingMotion';
import './Hero.css';

const LAST = heroSlides.length - 1;

/** A card holds full strength within this much of its own slide. */
const CARD_HOLD = 0.22;

/** How far a card drifts upward, in pixels, over one slide of scrolling. */
const CARD_DRIFT = 56;

/**
 * The clinic tour opening sequence. The section is four screens tall and its
 * contents pin to the viewport, so scrolling scrubs forward and backward
 * through the clinic walkthrough video rather than just jumping down the page:
 * the video advances smoothly with scroll depth and the narrative cards float
 * above it, alternating sides.
 *
 * Everything scroll-linked is written straight to the DOM from one animation
 * frame (`useScrollFrame`) rather than through React state, so scrolling never
 * costs a re-render. Visitors who ask for reduced motion get the slides laid out
 * one under another with static clinic imagery, with nothing pinned or moving.
 */
export default function Hero() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const cardRefs = useRef([]);
  const railRefs = useRef([]);
  const cueRef = useRef(null);
  const isSeekingRef = useRef(false);
  const targetTimeRef = useRef(0);
  const [reduceMotion] = useState(prefersReducedMotion);

  const performSeek = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.duration || Number.isNaN(video.duration)) return;

    const diff = Math.abs(video.currentTime - targetTimeRef.current);
    if (diff < 0.02) return;

    if (isSeekingRef.current) return;
    isSeekingRef.current = true;

    if ('fastSeek' in video) {
      video.fastSeek(targetTimeRef.current);
    } else {
      video.currentTime = targetTimeRef.current;
    }
  }, []);

  const handleSeeked = useCallback(() => {
    isSeekingRef.current = false;
    performSeek();
  }, [performSeek]);

  const onScroll = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;
    const travel = section.offsetHeight - window.innerHeight;
    // Normalized position through the sequence (0 to 1)
    const progress = travel > 0 ? clamp01(-section.getBoundingClientRect().top / travel) : 0;
    // Where the sequence has got to, as a slide number with a fraction.
    const position = progress * LAST;
    const active = Math.round(position);

    // Sync video playback to scroll position
    const video = videoRef.current;
    if (video && video.duration) {
      const maxPlayable = Math.max(video.duration - 0.04, 0);
      targetTimeRef.current = progress * maxPlayable;
      performSeek();
    }

    // Fade the introductory tour cue as user starts scrolling
    if (cueRef.current) {
      const cueOpacity = clamp01(1 - progress * 4.5);
      cueRef.current.style.opacity = cueOpacity.toFixed(3);
      cueRef.current.style.transform = `translate3d(-50%, -${(progress * 24).toFixed(1)}px, 0)`;
      cueRef.current.style.pointerEvents = cueOpacity < 0.1 ? 'none' : 'auto';
    }

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const distance = Math.abs(position - index);
      card.style.opacity = clamp01((0.5 - distance) / (0.5 - CARD_HOLD)).toFixed(4);
      card.style.transform = `translate3d(0, ${((index - position) * CARD_DRIFT).toFixed(1)}px, 0)`;
      // Only the card you are on takes part: the rest leave the tab order and
      // the accessibility tree rather than lurking invisibly on top of it.
      card.inert = index !== active;
    });

    railRefs.current.forEach((button, index) => {
      if (!button) return;
      button.dataset.active = String(index === active);
      if (index === active) button.setAttribute('aria-current', 'true');
      else button.removeAttribute('aria-current');
    });
  }, [performSeek]);

  useScrollFrame(onScroll, !reduceMotion);

  const handleLoadedMetadata = useCallback(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video || !video.duration) return;
    const travel = section.offsetHeight - window.innerHeight;
    const progress = travel > 0 ? clamp01(-section.getBoundingClientRect().top / travel) : 0;
    const maxPlayable = Math.max(video.duration - 0.04, 0);
    targetTimeRef.current = progress * maxPlayable;
    performSeek();
  }, [performSeek]);

  /** Jump the page to a slide's resting point. */
  const goTo = (index) => {
    const section = sectionRef.current;
    if (!section) return;
    const travel = Math.max(section.offsetHeight - window.innerHeight, 0);
    const top = window.scrollY + section.getBoundingClientRect().top + (travel * index) / LAST;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <section
      className="ap-hero"
      ref={sectionRef}
      aria-labelledby="ap-hero-title"
      data-static={reduceMotion || undefined}
      style={{ '--slides': heroSlides.length }}
    >
      <div className="ap-hero__pin">
        {/* Play-on-scroll clinic walkthrough video */}
        {!reduceMotion ? (
          <video
            ref={videoRef}
            className="ap-hero__video"
            playsInline
            muted
            preload="auto"
            poster="/assets/videos/clinic_tour_poster.webp"
            onSeeked={handleSeeked}
            onLoadedMetadata={handleLoadedMetadata}
            aria-hidden="true"
            tabIndex={-1}
          >
            <source src="/assets/videos/clinic_tour_scrub.mp4" type="video/mp4" />
            <source src="/assets/videos/clinic_tour.mp4" type="video/mp4" />
          </video>
        ) : (
          <img
            className="ap-hero__video ap-hero__video--static"
            src="/assets/videos/clinic_tour_poster.webp"
            alt="Allure Passions UK Clinic"
          />
        )}

        <div className="ap-hero__scrim" aria-hidden="true" />

        {/* Narrative chapter cards floating over the video tour */}
        {heroSlides.map((slide, index) => (
          <div className="ap-hero__slide" key={slide.id}>
            {reduceMotion && (
              <img
                className="ap-hero__img"
                src="/assets/videos/clinic_tour_poster.webp"
                alt=""
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
            )}

            <div className="ap-hero__stage">
              <article
                className="ap-hero__card"
                data-side={slide.side}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                inert={!reduceMotion && index !== 0}
                style={reduceMotion ? undefined : { opacity: index === 0 ? 1 : 0 }}
              >
                <p className="ap-dot-eyebrow">{slide.tagline}</p>
                {index === 0 ? (
                  <h1 className="ap-display ap-display--m ap-hero__title" id="ap-hero-title">
                    {slide.title}
                  </h1>
                ) : (
                  <h2 className="ap-display ap-display--m ap-hero__title">{slide.title}</h2>
                )}
                <p className="ap-hero__text">{slide.text}</p>
                <PillButton to={slide.cta.to}>{slide.cta.label}</PillButton>
              </article>
            </div>
          </div>
        ))}

        {!reduceMotion && (
          <div className="ap-hero__tour-cue" ref={cueRef} aria-hidden="true">
            <span className="ap-hero__tour-dot" />
            <span className="ap-hero__tour-label">Clinic Tour • Scroll to explore</span>
          </div>
        )}

        {!reduceMotion && (
          <nav className="ap-hero__rail" aria-label="Opening sequence">
            {heroSlides.map((slide, index) => (
              <button
                type="button"
                key={slide.id}
                ref={(node) => {
                  railRefs.current[index] = node;
                }}
                data-active={index === 0 ? 'true' : 'false'}
                aria-current={index === 0 ? 'true' : undefined}
                onClick={() => goTo(index)}
              >
                <span className="ap-hero__rail-no">{pad2(index + 1)}</span>
                <span className="ap-hero__rail-bar" aria-hidden="true" />
                <span className="ap-visually-hidden">{slide.title}</span>
              </button>
            ))}
          </nav>
        )}
      </div>
    </section>
  );
}
