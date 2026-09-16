import { ArrowRight, Pause, Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { clinic } from '../../../content/clinic';
import { consultationCta } from '../../../content/navigation';
import { prefersReducedMotion } from '../../../lib/motion';
import scrollToSection from '../../../lib/scrollToSection';
import { Button, Container, Heading, Text } from '../../../components/ui';
import './Hero.css';

const POSTER = '/assets/videos/hero-clinic-poster.webp';

const PATHWAYS = [
  {
    id: 'concerns',
    label: 'Start with a concern',
    text: 'Pigmentation, laxity, acne, stubborn fat and more',
  },
  {
    id: 'treatments',
    label: 'Start with a treatment',
    text: 'PicoWay, Morpheus8, Sofwave, Emsculpt Neo and more',
  },
];

/**
 * Block 1 (plan §6). The clinic's single media moment: a muted walkthrough
 * under an ink scrim, the promise on the left, and two ways in along the
 * bottom edge. Reduced-motion visitors get the poster and a play control
 * rather than motion they didn't ask for (WCAG 2.2.2).
 */
export default function Hero() {
  const videoRef = useRef(null);
  const [isPlaying, setPlaying] = useState(false);
  const [autoplays] = useState(() => !prefersReducedMotion());

  // Keep the control honest: the browser, not this component, decides whether
  // the video actually plays (low power mode, data saver, a failed autoplay).
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const sync = () => setPlaying(!video.paused && !video.ended);
    sync();

    video.addEventListener('play', sync);
    video.addEventListener('pause', sync);
    return () => {
      video.removeEventListener('play', sync);
      video.removeEventListener('pause', sync);
    };
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => setPlaying(false));
    else video.pause();
  };

  const onPathwayClick = (event, id) => {
    if (scrollToSection(id)) event.preventDefault();
  };

  return (
    <section className="ap-hero" id="hero" data-tone="night" aria-labelledby="ap-hero-title">
      <div className="ap-hero__media">
        <video
          ref={videoRef}
          className="ap-hero__video"
          poster={POSTER}
          preload={autoplays ? 'metadata' : 'none'}
          autoPlay={autoplays}
          muted
          loop
          playsInline
          disablePictureInPicture
          tabIndex={-1}
          aria-hidden="true"
        >
          <source src="/assets/videos/hero-clinic.webm" type="video/webm" />
          <source src="/assets/videos/hero-clinic.mp4" type="video/mp4" />
        </video>
        <div className="ap-hero__scrim" />
      </div>

      <Container className="ap-hero__inner">
        <div className="ap-hero__content">
          <p className="ap-eyebrow">
            Advanced aesthetic clinic · {clinic.address.area}, {clinic.address.city}
          </p>
          <Heading as="h1" size="xl" id="ap-hero-title">
            Advanced care for skin, body &amp; wellbeing.
          </Heading>
          <Text size="lede">
            An award-winning, practitioner-led clinic offering non-invasive treatments planned around your concerns.
          </Text>
          <Button to={consultationCta.to}>{consultationCta.label}</Button>
        </div>
      </Container>

      <div className="ap-hero__pathways">
        <Container className="ap-hero__pathways-inner">
          {PATHWAYS.map((pathway) => (
            <a
              key={pathway.id}
              className="ap-hero__pathway"
              href={`#${pathway.id}`}
              onClick={(event) => onPathwayClick(event, pathway.id)}
            >
              <span className="ap-hero__pathway-label">{pathway.label}</span>
              <span className="ap-hero__pathway-text">
                {pathway.text}
                <ArrowRight className="ap-hero__pathway-icon" aria-hidden="true" size={18} strokeWidth={1.25} absoluteStrokeWidth />
              </span>
            </a>
          ))}

          <button
            type="button"
            className="ap-hero__playback"
            onClick={togglePlayback}
            aria-label={isPlaying ? 'Pause the background video' : 'Play the background video'}
          >
            {isPlaying ? (
              <Pause aria-hidden="true" size={16} strokeWidth={1.25} absoluteStrokeWidth />
            ) : (
              <Play aria-hidden="true" size={16} strokeWidth={1.25} absoluteStrokeWidth />
            )}
          </button>
        </Container>
      </div>
    </section>
  );
}
