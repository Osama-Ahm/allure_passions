import { useEffect } from 'react';
import { Download } from 'lucide-react';
import TextReveal from '../../../motion/TextReveal';
import RevealImage from '../../../motion/RevealImage';
import { Reveal } from '../../../motion/Reveal';
import { GHP_FEATURE } from '../../../data/ghpFeature';
import { scrollWhenReady } from '../../../utils/navigation';
import './GhpFeatureArticle.css';

const { founder, pullQuote } = GHP_FEATURE;

/**
 * About page: the full Global Health & Pharma (Q3 2026, p.55) feature on the clinic
 * and its founder, set as an editorial article. Reachable at /about#ghp-feature.
 */
export default function GhpFeatureArticle() {
  // Opened as /about#ghp-feature (e.g. from the homepage): bring the article into view.
  useEffect(() => {
    if (window.location.hash === '#ghp-feature') scrollWhenReady('#ghp-feature');
  }, []);

  return (
    <section id="ghp-feature" className="ap-ghp" aria-labelledby="ap-ghp-title">
      <header className="ap-ghp__head">
        <Reveal as="p" className="ap-eyebrow ap-ghp__eyebrow">
          Press · {GHP_FEATURE.publication}, {GHP_FEATURE.issue}
        </Reveal>
        <TextReveal as="h2" id="ap-ghp-title" className="ap-h2 ap-ghp__title">
          {GHP_FEATURE.title} <em className="ap-accent">{GHP_FEATURE.titleAccent}</em>
        </TextReveal>
        <Reveal as="p" delay={0.12} className="ap-ghp__standfirst">
          {GHP_FEATURE.standfirst}
        </Reveal>
      </header>

      <div className="ap-ghp__layout">
        <aside className="ap-ghp__aside">
          <figure className="ap-ghp__figure">
            <RevealImage
              className="ap-ghp__photo"
              src={founder.photo}
              alt={founder.photoAlt}
              sizes="(max-width: 900px) 100vw, 40vw"
              position="62% 40%"
            />
            <figcaption className="ap-ghp__caption">
              <span className="ap-ghp__caption-name">{founder.name}</span>
              <span className="ap-ghp__caption-role">{founder.role}</span>
            </figcaption>
          </figure>

          <div className="ap-ghp__pillars">
            <p className="ap-ghp__pillars-title">Three pillars</p>
            <ol>
              {GHP_FEATURE.pillars.map((pillar, index) => (
                <li key={pillar}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  {pillar}
                </li>
              ))}
            </ol>
          </div>

          <a className="ap-ghp__pdf" href={GHP_FEATURE.pdf} download target="_blank" rel="noopener">
            <Download size={17} strokeWidth={1.6} aria-hidden="true" />
            <span>Download the original article (PDF)</span>
          </a>
        </aside>

        <div className="ap-ghp__body">
          {GHP_FEATURE.body.map((paragraph, index) => (
            <div key={paragraph.slice(0, 32)}>
              <Reveal as="p" amount={0.3} className={`ap-ghp__para${index === 0 ? ' ap-ghp__para--first' : ''}`}>
                {paragraph}
              </Reveal>
              {index === pullQuote.afterParagraph ? (
                <Reveal as="figure" amount={0.4} className="ap-ghp__pull">
                  <blockquote>{`“${pullQuote.text}”`}</blockquote>
                  <figcaption>{founder.name}</figcaption>
                </Reveal>
              ) : null}
            </div>
          ))}

          <p className="ap-ghp__source">
            Originally published in {GHP_FEATURE.publication}, {GHP_FEATURE.issue}, page {GHP_FEATURE.page}.
          </p>
        </div>
      </div>
    </section>
  );
}
