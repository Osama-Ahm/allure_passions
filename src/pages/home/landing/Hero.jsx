import { Pause, Play } from 'lucide-react';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { clinic } from '../../../content/clinic';
import { consultationCta } from '../../../content/navigation';
import { tickerItems } from '../../../content/home';
import { prefersReducedMotion } from '../../../lib/motion';
import cx from '../../../lib/cx';
import PillButton, { ArrowGlyph } from '../../../components/ui/PillButton';
import { clamp01, useScrollFrame } from './useLandingMotion';
import './Hero.css';

const POSTER = '/assets/videos/hero-clinic-poster.webp';

/** Opening status in London time: Monday to Saturday, 09:30 to 19:30 (content/clinic.js). */
function openingStatus(now = new Date()) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false })
      .formatToParts(now)
      .map((part) => [part.type, part.value]),
  );
  const minutes = Number(parts.hour) * 60 + Number(parts.minute);
  const isOpen = parts.weekday !== 'Sun' && minutes >= 570 && minutes < 1170;
  if (isOpen) return { isOpen, text: 'Open now · until 19:30' };
  return { isOpen, text: parts.weekday === 'Sun' ? 'Sunday · by appointment' : 'Closed · opens 09:30' };
}

function useOpeningStatus() {
  const [status, setStatus] = useState(openingStatus);
  useEffect(() => {
    const timer = window.setInterval(() => setStatus(openingStatus()), 60_000);
    return () => window.clearInterval(timer);
  }, []);
  return status;
}

export default function Hero() {
  const shellRef = useRef(null);
  const videoRef = useRef(null);
  const sealPathId = useId();
  const status = useOpeningStatus();
  const [reduceMotion] = useState(prefersReducedMotion);
  const [isPlaying, setPlaying] = useState(!reduceMotion);

  // The hero draws back into a rounded window as the page scrolls. The whole
  // shell scales, so nothing inside it is ever cropped.
  const onScroll = useCallback(() => {
    const shell = shellRef.current;
    if (!shell) return;
    const progress = clamp01(window.scrollY / shell.offsetHeight);
    shell.style.transform = `scale(${1 - progress * 0.06})`;
    shell.style.borderRadius = `0 0 ${progress * 56}px ${progress * 56}px`;
    if (videoRef.current) videoRef.current.style.transform = `scale(${1.06 + progress * 0.1}) translateY(${progress * 5}%)`;
  }, []);
  useScrollFrame(onScroll, !reduceMotion);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <section className="ap-hero" data-tone="night" aria-labelledby="ap-hero-title">
        <div className="ap-hero__shell" ref={shellRef}>
          <video
            ref={videoRef}
            className="ap-hero__video"
            autoPlay={!reduceMotion}
            muted
            loop
            playsInline
            poster={POSTER}
            aria-hidden="true"
            tabIndex={-1}
          >
            <source src="/assets/videos/hero-clinic.webm" type="video/webm" />
            <source src="/assets/videos/hero-clinic.mp4" type="video/mp4" />
          </video>
          <div className="ap-hero__scrim" aria-hidden="true" />

          <div className="ap-hero__seal" aria-hidden="true">
            <svg viewBox="0 0 120 120">
              <defs>
                <path id={sealPathId} d="M60 60m-48 0a48 48 0 1 1 96 0a48 48 0 1 1-96 0" />
              </defs>
              <text fontSize="10.5" letterSpacing="3.2" fill="currentColor" fontWeight="600" style={{ fontFamily: 'var(--font-sans)' }}>
                <textPath href={`#${sealPathId}`}>AWARD WINNING · GHP 2026 · FITZROVIA · </textPath>
              </text>
            </svg>
            <b>AP</b>
          </div>

          <div className="ap-wrap ap-hero__inner">
            <div className="ap-hero__copy">
              <p className="ap-dot-eyebrow">Advanced aesthetic clinic · {clinic.address.area}, {clinic.address.city}</p>
              <h1 className="ap-display ap-display--xl" id="ap-hero-title">
                <span className="ap-mask">
                  <span style={{ '--d': '.15s' }}>Advanced care</span>
                </span>{' '}
                <span className="ap-mask">
                  <span style={{ '--d': '.28s' }}>
                    for <em>skin, body</em>
                  </span>
                </span>{' '}
                <span className="ap-mask">
                  <span style={{ '--d': '.41s' }}>&amp; wellbeing.</span>
                </span>
              </h1>
              <div className="ap-hero__sub" data-reveal style={{ '--d': '.7s' }}>
                <p>An award-winning, practitioner-led clinic offering non-invasive treatments planned around your concerns.</p>
                <PillButton to={consultationCta.to} variant="light">
                  Begin your consultation
                </PillButton>
              </div>
            </div>

            <div className="ap-hero__bottom" data-reveal style={{ '--d': '.9s' }}>
              <a className="ap-hero__path" href="#concerns">
                <span>
                  <small>Start with a concern</small>
                  <span>Pigmentation, laxity, acne, stubborn fat…</span>
                </span>
                <span className="ap-hero__path-arrow">
                  <ArrowGlyph />
                </span>
              </a>
              <a className="ap-hero__path" href="#treatments">
                <span>
                  <small>Start with a treatment</small>
                  <span>PicoWay, Morpheus8, Sofwave, Emsculpt Neo…</span>
                </span>
                <span className="ap-hero__path-arrow">
                  <ArrowGlyph />
                </span>
              </a>
              <p className={cx('ap-hero__status', !status.isOpen && 'is-closed')}>
                <i aria-hidden="true" />
                <span>{status.text}</span>
              </p>
              <button
                type="button"
                className="ap-hero__pause"
                onClick={toggleVideo}
                aria-label={isPlaying ? 'Pause background video' : 'Play background video'}
              >
                {isPlaying ? <Pause size={16} strokeWidth={1.5} aria-hidden="true" /> : <Play size={16} strokeWidth={1.5} aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>
      </section>

      <Ticker />
    </>
  );
}

function TickerGroup({ hidden = false }) {
  return (
    <div className="ap-ticker__group" aria-hidden={hidden || undefined}>
      {tickerItems.map((item) => (
        <span className="ap-ticker__item ap-serif" key={item.text}>
          {item.text}
          {item.accent && (
            <>
              {' '}
              <em>{item.accent}</em>
            </>
          )}
          {item.after && ` ${item.after}`}
        </span>
      ))}
    </div>
  );
}

/** The credentials, drifting past under the hero. Pauses on hover and focus. */
function Ticker() {
  return (
    <div className="ap-ticker" role="region" aria-label="Credentials">
      <div className="ap-ticker__track">
        <TickerGroup />
        <TickerGroup hidden />
      </div>
    </div>
  );
}
