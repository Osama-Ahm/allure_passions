import { useRef } from 'react';
import usePageMeta from '../../lib/usePageMeta';
import { Begin, Faq } from './landing/Closing';
import Concerns from './landing/Concerns';
import Hero from './landing/Hero';
import { Programmes, Skincare } from './landing/Plan';
import Recognition from './landing/Recognition';
import Results from './landing/Results';
import { Instagram, Reviews } from './landing/Social';
import Statement from './landing/Statement';
import Technologies from './landing/Technologies';
import Trust from './landing/Trust';
import { useRevealOnScroll } from './landing/useLandingMotion';
import { ChapterPill, Cursor } from './landing/Wayfinding';
import './landing/landing.css';

/**
 * The homepage, built from design/landing.html: the story told in six chapters
 * (Discover, Explore, Evidence, Trust, Plan, Begin), with the chapter pill
 * following along. Section ids double as in-page anchors. Reviews and
 * Instagram render only once their provider is connected.
 */
export default function HomePage() {
  const rootRef = useRef(null);
  usePageMeta();
  useRevealOnScroll(rootRef);

  return (
    <div className="ap-landing" ref={rootRef}>
      <Hero />
      <Statement />
      <Concerns />
      <Technologies />
      <Results />
      <Trust />
      <Recognition />
      <Reviews />
      <Instagram />
      <Programmes />
      <Skincare />
      <Faq />
      <Begin />
      <ChapterPill rootRef={rootRef} />
      <Cursor />
    </div>
  );
}
