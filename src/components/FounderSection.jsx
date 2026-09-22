import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import TextReveal from '../motion/TextReveal';
import RevealImage from '../motion/RevealImage';
import { Reveal, RevealGroup, RevealItem } from '../motion/Reveal';
import Button from './ui/Button';
import { routeLinkHandler } from '../utils/navigation';
import './FounderSection.css';

const PARAGRAPHS = [
  'Allure Passions UK Aesthetic Clinic is an advanced aesthetics clinic focused on delivering personalised, technology-led treatments for skin, body and wellbeing.',
  'Recognised as Best Advanced Skin & Body Aesthetics Clinic 2026 – London by Global Health & Pharma as part of the Global Excellence Awards, our approach combines advanced treatment technologies with professional assessment, education and individualised care.',
  'Our treatment offering includes solutions for skin tightening, pigmentation, skin clarity, acne and redness, body contouring, muscle definition and cellular wellbeing.',
];

// The founder's own photograph and feature follow in FounderFeatureSection, so this half
// shows the clinic's reception (a generated mood image; the alt text says what it shows).
const RECEPTION = '/assets/images/site/hero_section/slide_01';

/**
 * Section 3 — "Welcome to Allure Passions / UK Aesthetic Clinic".
 * Copy on a soft silk ground at left; the reception fills the right half to the edge.
 */
export default function FounderSection({ onNavigate }) {
  const sectionRef = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const sheenY = useTransform(scrollYProgress, [0, 1], ['-7%', '7%']);

  return (
    <section ref={sectionRef} className="ap-welcome" aria-labelledby="ap-welcome-title">
      <div className="ap-welcome__copy">
        <motion.div
          className="ap-welcome__silk"
          style={reduce ? undefined : { y: sheenY }}
          aria-hidden="true"
        />
        <div className="ap-welcome__inner">
          <TextReveal as="h2" id="ap-welcome-title" className="ap-h2 ap-welcome__title">
            Welcome to Allure Passions <em className="ap-accent ap-welcome__accent">UK Aesthetic Clinic</em>
          </TextReveal>

          <RevealGroup className="ap-welcome__body" gap={0.1} delay={0.2}>
            {PARAGRAPHS.map((text) => (
              <RevealItem as="p" key={text.slice(0, 24)} className="ap-welcome__para">
                {text}
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.45} className="ap-welcome__cta">
            <Button href="/about" onClick={routeLinkHandler(onNavigate, 'about')}>
              Discover Our Approach
            </Button>
          </Reveal>
        </div>
      </div>

      <div className="ap-welcome__portrait">
        <RevealImage
          className="ap-welcome__media"
          src={`${RECEPTION}-1920.webp`}
          srcSet={`${RECEPTION}-1280.webp 1280w, ${RECEPTION}-1920.webp 1920w, ${RECEPTION}-2560.webp 2560w`}
          alt="Reception desk in warm stone tones beneath the Allure Passions monogram, with an armchair by the window"
          sizes="(max-width: 860px) 100vw, 50vw"
          position="3% 50%"
          radius={0}
          direction="left"
          parallax={0.05}
        >
          <span className="ap-welcome__vignette" aria-hidden="true" />
        </RevealImage>
      </div>
    </section>
  );
}
