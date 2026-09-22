import { motion, useReducedMotion } from 'motion/react';
import { Download } from 'lucide-react';
import TextReveal from '../motion/TextReveal';
import RevealImage from '../motion/RevealImage';
import { Reveal, RevealGroup, RevealItem } from '../motion/Reveal';
import { EASE_INOUT, VIEWPORT } from '../motion/presets';
import Button from './ui/Button';
import { GHP_FEATURE } from '../data/ghpFeature';
import { sectionLinkHandler } from '../utils/navigation';
import './FounderFeatureSection.css';

const { founder } = GHP_FEATURE;

/**
 * Founder spotlight: an excerpt of the clinic's Global Health & Pharma (Q3 2026)
 * feature with Abigail Frimpong's photograph. The full article lives on /about#ghp-feature.
 */
export default function FounderFeatureSection({ onNavigate }) {
  const reduce = useReducedMotion();

  return (
    <section className="ap-feature" aria-labelledby="ap-feature-title">
      <div className="ap-container ap-feature__grid">
        <figure className="ap-feature__figure">
          <RevealImage
            className="ap-feature__photo"
            src={founder.photo}
            alt={founder.photoAlt}
            sizes="(max-width: 960px) 100vw, 46vw"
            position="62% 40%"
            parallax={0.04}
            direction="up"
          >
            <span className="ap-feature__tag">
              <span className="ap-feature__tag-mark">GHP</span>
              <span>
                {GHP_FEATURE.issue} · p.{GHP_FEATURE.page}
              </span>
            </span>
          </RevealImage>
          <Reveal as="figcaption" delay={0.3} className="ap-feature__caption">
            <span className="ap-feature__caption-name">{founder.name}</span>
            <span className="ap-feature__caption-role">{founder.role}</span>
          </Reveal>
        </figure>

        <div className="ap-feature__copy">
          <Reveal as="p" className="ap-eyebrow ap-feature__eyebrow">
            As featured in {GHP_FEATURE.publication} · {GHP_FEATURE.issue}
          </Reveal>

          <TextReveal as="h2" id="ap-feature-title" className="ap-h2 ap-feature__title">
            {GHP_FEATURE.title} <em className="ap-accent ap-feature__accent">{GHP_FEATURE.titleAccent}</em>
          </TextReveal>

          <Reveal as="p" delay={0.12} className="ap-lead ap-feature__summary">
            {GHP_FEATURE.summary}
          </Reveal>

          <figure className="ap-feature__quote">
            <motion.span
              className="ap-feature__quote-rule"
              aria-hidden="true"
              initial={reduce ? false : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: 1.1, ease: EASE_INOUT, delay: 0.2 }}
            />
            <TextReveal as="blockquote" className="ap-feature__quote-text" gap={0.025} delay={0.2} amount={0.4}>
              {`“${GHP_FEATURE.quote}”`}
            </TextReveal>
            <Reveal as="figcaption" delay={0.5} className="ap-feature__quote-cite">
              {founder.name}, {founder.role}
            </Reveal>
          </figure>

          <RevealGroup as="ol" className="ap-feature__pillars" gap={0.08} delay={0.25} aria-label="The clinic's three pillars">
            {GHP_FEATURE.pillars.map((pillar, index) => (
              <RevealItem as="li" key={pillar} className="ap-feature__pillar">
                <span className="ap-feature__pillar-index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="ap-feature__pillar-text">{pillar}</span>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.3} className="ap-feature__actions">
            <Button
              href="/about#ghp-feature"
              onClick={sectionLinkHandler(onNavigate, { route: 'about', path: '/about', selector: '#ghp-feature' })}
            >
              Read the Full Feature
            </Button>
            <a className="ap-feature__pdf" href={GHP_FEATURE.pdf} download target="_blank" rel="noopener">
              <Download size={17} strokeWidth={1.6} aria-hidden="true" />
              <span>Download the article (PDF)</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
