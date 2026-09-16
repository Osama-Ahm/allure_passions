import React, { useState } from 'react';
import SplitWords from '../motion/SplitWords';
import './PillarsSection.css';

const PILLARS = [
  {
    title: 'Tier-One Medical Platforms',
    description:
      'We invest exclusively in gold-standard clinical systems. Every platform in our Fitzrovia suite is FDA-cleared and chosen for verified clinical efficacy.',
    details: ['Morpheus8™', 'PicoWay®', 'Sofwave™', 'ADVATx®', 'Emsculpt Neo®'],
    image: '/assets/images/concern_hooded_brows.jpg',
    imagePosition: '52% 50%',
  },
  {
    title: 'Anatomical Calibration',
    description:
      'No two tissue structures are alike. Every protocol begins with a comprehensive anatomical analysis, matching energy wavelengths and penetration depths to your tissue biology.',
    details: ['Level 6 Medical Practice', 'JCCP Registered Oversight'],
    image: '/assets/images/area_eyes.jpg',
    imagePosition: '55% 45%',
  },
  {
    title: 'Undetectable Rejuvenation',
    description:
      'Our philosophy avoids artificial distortion or over-filling. We stimulate your own collagen and elastin for elegant, enduring results that honour your natural facial harmony.',
    details: ['Natural Facial Architecture', 'Collagen-Led Renewal'],
    image: '/assets/images/area_jawline.jpg',
    imagePosition: '50% 35%',
  },
];

const pad = (value) => String(value).padStart(2, '0');

export default function PillarsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="allure-standard" className="pillars" aria-labelledby="pillars-title">
      <div className="ap-container">
        <header className="ap-head">
          <div className="ap-head__title">
            <span className="ap-eyebrow" data-reveal>The Allure Standard</span>
            <h2 id="pillars-title" className="ap-display" data-reveal="words">
              <SplitWords>
                Pillars of <em>Clinical Excellence</em>
              </SplitWords>
            </h2>
          </div>
          <div className="ap-head__aside" data-reveal>
            <p className="ap-lede">
              The principles of patient safety, anatomical precision and subtle aesthetic harmony that guide every
              treatment at 76 Cleveland Street.
            </p>
          </div>
        </header>

        <div className="pillars__layout">
          {/* Decorative imagery follows whichever pillar is hovered or tapped */}
          <div className="pillars__media" data-reveal="image" aria-hidden="true">
            {PILLARS.map((pillar, index) => (
              <img
                key={pillar.title}
                src={pillar.image}
                alt=""
                loading="lazy"
                decoding="async"
                className={`pillars__image${index === activeIndex ? ' is-active' : ''}`}
                style={{ objectPosition: pillar.imagePosition }}
              />
            ))}
            <div className="pillars__counter">
              <span>{pad(activeIndex + 1)}</span>
              <span className="pillars__counter-rule" />
              <span>{pad(PILLARS.length)}</span>
            </div>
          </div>

          <ol className="pillars__list">
            {PILLARS.map((pillar, index) => (
              <li
                key={pillar.title}
                className={`pillars__item${index === activeIndex ? ' is-active' : ''}`}
                data-reveal
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
              >
                <span className="pillars__index" aria-hidden="true">{pad(index + 1)}</span>
                <h3 className="pillars__title">{pillar.title}</h3>
                <p className="pillars__description">{pillar.description}</p>
                <ul className="pillars__tags">
                  {pillar.details.map((detail) => (
                    <li key={detail} className="pillars__tag">{detail}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
