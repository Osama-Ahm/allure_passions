import React, { useEffect, useRef } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { POPULAR_TREATMENTS } from '../data/treatmentData';
import SplitWords from '../motion/SplitWords';
import { routeLinkHandler } from '../utils/navigation';
import { withTrademarks } from '../utils/trademarks';
import './SignatureTreatmentsSection.css';

// Short image tags, plus focal points for the landscape crop of each square photograph.
const CARD_DETAILS = {
  picoway: { tag: 'Skin Renewal', imagePosition: '50% 0%' },
  advatx: { tag: 'Redness & Rosacea', imagePosition: '50% 100%' },
  morpheus8: { tag: 'Skin Tightening', imagePosition: '40% 55%' },
  sofwave: { tag: 'Face & Neck Lift', imagePosition: '50% 100%' },
  emsculpt_neo: { tag: 'Body Contouring', imagePosition: '50% 100%' },
  emerald_laser: { tag: 'Targeted Fat Loss', imagePosition: '50% 85%' },
};

const startingPrice = (pricing = '') => pricing.match(/£[\d,]+/)?.[0];

export default function SignatureTreatmentsSection({ onNavigate }) {
  const railRef = useRef(null);
  const progressRef = useRef(null);

  // Mobile rail: mirror horizontal scroll position in the progress bar.
  useEffect(() => {
    const rail = railRef.current;
    const progress = progressRef.current;
    if (!rail || !progress) return undefined;

    let frame = 0;
    const update = () => {
      frame = 0;
      const maxScroll = rail.scrollWidth - rail.clientWidth;
      const visible = rail.clientWidth / rail.scrollWidth;
      const travelled = maxScroll > 0 ? rail.scrollLeft / maxScroll : 0;
      progress.style.setProperty('--rail-size', visible.toFixed(3));
      progress.style.setProperty('--rail-progress', travelled.toFixed(3));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    rail.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      rail.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section
      id="signature-treatments"
      className="signature ap-on-dark"
      aria-labelledby="signature-title"
    >
      <div className="ap-container">
        <header className="ap-head">
          <div className="ap-head__title">
            <span className="ap-eyebrow" data-reveal>Clinical Excellence</span>
            <h2 id="signature-title" className="ap-display" data-reveal="words">
              <SplitWords>
                Advanced Treatments. <em>Personalised to You.</em>
              </SplitWords>
            </h2>
          </div>
          <div className="ap-head__aside" data-reveal>
            <p className="ap-lede">
              Every technology works differently, which is why each recommendation begins with your individual concern
              and suitability. Explore our most sought-after treatments.
            </p>
            <a
              href="/treatments"
              className="ap-btn ap-btn--ghost"
              onClick={routeLinkHandler(onNavigate, 'treatments')}
            >
              <span>Explore All Treatments</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </header>

        <ul ref={railRef} className="signature__grid">
          {POPULAR_TREATMENTS.map((treatment) => {
            const price = startingPrice(treatment.pricing);
            const details = CARD_DETAILS[treatment.id] || {};
            return (
              <li key={treatment.id} className="signature__cell">
                <div className="signature__reveal" data-reveal>
                  <a
                    href={`/treatments/${treatment.id}`}
                    className="signature__card"
                    onClick={routeLinkHandler(onNavigate, 'treatment-detail', treatment.id)}
                  >
                    <div className="signature__media">
                      <img
                        src={treatment.image}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        style={{ objectPosition: details.imagePosition || 'center' }}
                      />
                      <span className="signature__category">{details.tag || treatment.category}</span>
                      <span className="signature__arrow" aria-hidden="true">
                        <ArrowUpRight size={18} strokeWidth={1.75} />
                      </span>
                    </div>

                    <div className="signature__body">
                      <h3 className="signature__name">{withTrademarks(treatment.name)}</h3>
                      <p className="signature__summary">{treatment.summary || treatment.shortDesc}</p>
                      <div className="signature__meta">
                        {price && (
                          <span className="signature__price">
                            From <strong>{price}</strong>
                          </span>
                        )}
                        <span className="signature__cta">
                          Discover
                          <ArrowRight size={15} />
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
              </li>
            );
          })}
        </ul>

        <div ref={progressRef} className="signature__progress" aria-hidden="true">
          <span />
        </div>
      </div>
    </section>
  );
}
