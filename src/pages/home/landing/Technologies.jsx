import { useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { signatureTreatments, treatmentPath } from '../../../content/treatments';
import useMediaQuery from '../../../lib/useMediaQuery';
import PillButton from '../../../components/ui/PillButton';
import { clamp01, pad2, useScrollFrame } from './useLandingMotion';
import './Technologies.css';

const PINNED_QUERY = '(min-width: 901px)';
const total = signatureTreatments.length;

/**
 * The six signature technologies as a gallery. On wide screens the section
 * pins and scrolling down moves the cards sideways; on smaller screens it is a
 * swipeable row with snap points.
 */
export default function Technologies() {
  const isPinned = useMediaQuery(PINNED_QUERY);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const indexRef = useRef(null);
  const barRef = useRef(null);

  const setProgress = (progress, index) => {
    if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
    if (indexRef.current) indexRef.current.textContent = pad2(index);
  };

  // The section is as tall as the sideways distance, so the pin lasts exactly as long as the track.
  const sizeSection = useCallback(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    section.style.height = isPinned ? `${window.innerHeight + Math.max(track.scrollWidth - window.innerWidth, 0)}px` : '';
    if (!isPinned) track.style.transform = '';
  }, [isPinned]);

  useEffect(() => {
    sizeSection();
    window.addEventListener('resize', sizeSection);
    document.fonts?.ready.then(sizeSection);
    return () => window.removeEventListener('resize', sizeSection);
  }, [sizeSection]);

  const onScroll = useCallback(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    const rect = section.getBoundingClientRect();
    const progress = clamp01(-rect.top / (section.offsetHeight - window.innerHeight || 1));
    track.style.transform = `translate3d(${-progress * (track.scrollWidth - window.innerWidth)}px, 0, 0)`;
    setProgress(progress, Math.min(total, Math.floor(progress * total) + 1));
  }, []);
  useScrollFrame(onScroll, isPinned);

  // Tabbing onto a card that is still off to the side scrolls the page until it slides into view.
  const onCardFocus = (event) => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!isPinned || !section || !track) return;
    const item = event.currentTarget.closest('.ap-tcard-item');
    const distance = track.scrollWidth - window.innerWidth;
    const progress = clamp01((item.offsetLeft - (window.innerWidth - item.offsetWidth) / 2) / (distance || 1));
    const top = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + progress * (section.offsetHeight - window.innerHeight), behavior: 'instant' });
  };

  const onTrackScroll = (event) => {
    if (isPinned) return;
    const track = event.currentTarget;
    const progress = track.scrollLeft / (track.scrollWidth - track.clientWidth || 1);
    setProgress(progress, Math.min(total, Math.round(progress * (total - 1)) + 1));
  };

  return (
    <section className="ap-tech" id="treatments" data-tone="night" data-chapter="explore" aria-labelledby="ap-tech-title" ref={sectionRef}>
      <div className="ap-tech__sticky">
        <div className="ap-wrap ap-tech__head">
          <div>
            <p className="ap-dot-eyebrow">Signature technologies</p>
            <h2 className="ap-display ap-display--l" id="ap-tech-title">
              Six technologies,
              <br />
              <em>learned properly.</em>
            </h2>
          </div>
          <div className="ap-tech__count" aria-hidden="true">
            <b ref={indexRef}>01</b> / {pad2(total)}
            <span className="ap-tech__bar">
              <i ref={barRef} />
            </span>
          </div>
        </div>

        <ul className="ap-tech__track" ref={trackRef} onScroll={onTrackScroll}>
          {signatureTreatments.map((treatment, index) => (
            <li key={treatment.slug} className="ap-tcard-item">
              <Link className="ap-tcard" to={treatmentPath(treatment.slug)} data-cursor="View" onFocus={onCardFocus} viewTransition>
                <img src={`/assets/images/site/treatment-${treatment.slug}.webp`} alt="" loading="lazy" decoding="async" />
                <span className="ap-tcard__num ap-nums" aria-hidden="true">
                  {pad2(index + 1)}
                </span>
                <span className="ap-tcard__price">from {treatment.fromPrice}</span>
                <span className="ap-tcard__body">
                  <span className="ap-tcard__type">{treatment.type}</span>
                  <span className="ap-tcard__name ap-serif">{treatment.name}</span>
                  <span className="ap-tcard__more">
                    <span>
                      <span className="ap-tcard__summary">{treatment.summary}</span>
                      <span className="ap-tcard__meta">
                        <span>{treatment.sessions}</span>
                        <span>Downtime: {treatment.downtime}</span>
                      </span>
                    </span>
                  </span>
                </span>
              </Link>
            </li>
          ))}
          <li className="ap-tcard-item">
            <div className="ap-tcard ap-tcard--end" data-tone="canvas">
              <p className="ap-dot-eyebrow">Up next</p>
              <div>
                <p className="ap-display ap-tcard__end-title">
                  What a course <em>can look like.</em>
                </p>
                <PillButton href="#results" className="ap-tcard__end-btn" onFocus={onCardFocus}>
                  See results
                </PillButton>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
