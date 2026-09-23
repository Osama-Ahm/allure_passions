import { useEffect, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import TextReveal from '../motion/TextReveal';
import { Reveal } from '../motion/Reveal';
import { EASE_INOUT, EASE_OUT, VIEWPORT } from '../motion/presets';
import { INSTAGRAM_URL } from '../data/links';
import ResponsiveImg from './ui/ResponsiveImg';
import { coverWidth } from '../utils/responsiveImages';
import './InstagramSection.css';

// Rendered width of a tile's picture below 1280px (tiles are 200px on phones, else
// 6.5rem + 16.5vw; a tall tile is 1.3375x as high), for the mobile copies' `sizes`.
function tileSizes(src, tall) {
  const phone = coverWidth(src, 200, tall ? 268 : 200);
  const scale = coverWidth(src, 100, tall ? 133.75 : 100) / 100;
  return `(max-width: 605px) ${phone}px, calc((6.5rem + 16.5vw) * ${scale})`;
}

// Figma rhythm: squares with a taller tile every few steps (the row bleeds off both edges).
// Order is tall · square · tall · square · square · tall(video) · square · tall(video) · square · square.
const TILES = [
  {
    tall: true,
    src: '/assets/images/site/why-clinic-room.webp',
    alt: 'A calm treatment room with a freshly made treatment bed and soft window light',
    label: 'Behind the scenes',
    caption: 'Inside the clinic',
    position: '50% 62%',
  },
  {
    src: '/assets/images/area_lips.jpg',
    alt: 'Close-up of the lips and cheek in soft natural light',
    label: 'Educational',
    caption: 'Lip and perioral care',
    position: '50% 55%',
  },
  {
    tall: true,
    src: '/assets/images/site/emsculpt-neo.webp',
    alt: 'An Emsculpt NEO applicator strapped across a client’s abdomen as she lies on a treatment bed',
    label: 'Technology',
    caption: 'Emsculpt NEO body contouring',
    position: '62% 50%',
  },
  {
    src: '/assets/images/area_cheeks.jpg',
    alt: 'A gloved practitioner treating the cheek with an energy-based handpiece',
    label: 'Treatments',
    caption: 'Skin treatment in progress',
    position: '50% 45%',
  },
  {
    src: '/assets/images/site/treatment-sofwave.webp',
    alt: 'A practitioner guiding a Sofwave handpiece along the jawline of a relaxed client',
    label: 'Patient journeys',
    caption: 'Sofwave skin lifting',
    position: '60% 50%',
  },
  {
    tall: true,
    video: '/assets/videos/hero-clinic-live',
    poster: '/assets/videos/hero-clinic-live-poster.webp',
    alt: 'Short clinic film: the reception, a consultation and a facial treatment',
    label: 'Technology demonstrations',
    caption: 'A day in the clinic',
    position: '58% 50%',
  },
  {
    src: '/assets/images/site/treatment-picoway.webp',
    alt: 'A practitioner using a PicoWay laser handpiece on a client wearing eye protection',
    label: 'Treatments',
    caption: 'PicoWay laser session',
    position: '58% 50%',
  },
  {
    tall: true,
    video: '/assets/videos/hero-clinic-sanctuary',
    poster: '/assets/videos/hero-clinic-sanctuary-poster.webp',
    alt: 'Short clinic film: warm light moving through a quiet treatment suite',
    label: 'Behind the scenes',
    caption: 'The treatment suite',
    position: '62% 50%',
  },
  {
    src: '/assets/images/site/why-detail-hands.webp',
    alt: 'Gloved hands preparing a treatment tray with a glass dropper bottle',
    label: 'Patient journeys',
    caption: 'Preparing every treatment',
    position: '50% 50%',
  },
  {
    src: '/assets/images/prefooter_serum.jpg',
    alt: 'A woman applying a serum from a dropper to her cheek',
    label: 'Educational',
    caption: 'Aftercare and skin health',
    position: '60% 40%',
  },
];

const tileVariants = {
  hidden: { clipPath: 'inset(100% 0% 0% 0% round 16px)' },
  show: (i) => ({
    clipPath: 'inset(0% 0% 0% 0% round 16px)',
    transition: { duration: 1.15, ease: EASE_INOUT, delay: 0.05 + Math.abs(i - 4.5) * 0.08 },
  }),
};

const mediaVariants = {
  hidden: { scale: 1.18 },
  show: (i) => ({
    scale: 1,
    transition: { duration: 1.6, ease: EASE_OUT, delay: 0.05 + Math.abs(i - 4.5) * 0.08 },
  }),
};

function InstagramGlyph({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="2.75" y="2.75" width="18.5" height="18.5" rx="5.25" />
      <circle cx="12" cy="12" r="4.25" />
      <circle cx="17.35" cy="6.65" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * Muted loop that only loads and plays while it is on screen. Its poster is a lazy picture
 * underneath (a video's `poster` would download on page load, far above this row); the video
 * sits over it and stays transparent until it has a frame to show.
 */
function TileVideo({ tile, reduce }) {
  const ref = useRef(null);
  const poster = (alt) => (
    <ResponsiveImg
      src={tile.poster}
      sizes={tileSizes(tile.poster, tile.tall)}
      alt={alt}
      loading="lazy"
      decoding="async"
      style={{ objectPosition: tile.position }}
    />
  );

  useEffect(() => {
    const video = ref.current;
    if (!video || reduce) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const attempt = video.play();
          if (attempt && typeof attempt.catch === 'function') attempt.catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(video);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [reduce]);

  if (reduce) return poster(tile.alt);

  return (
    <>
      {poster('')}
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        disableRemotePlayback
        aria-label={tile.alt}
        style={{ objectPosition: tile.position }}
      >
        <source src={`${tile.video}.webm`} type="video/webm" />
        <source src={`${tile.video}.mp4`} type="video/mp4" />
      </video>
    </>
  );
}

function Tile({ tile, index, reduce }) {
  const Frame = reduce ? 'a' : motion.a;
  const Media = reduce ? 'div' : motion.div;
  const frameMotion = reduce ? {} : { variants: tileVariants, custom: index };
  const mediaMotion = reduce ? {} : { variants: mediaVariants, custom: index };

  return (
    <Frame
      className={`ap-social__tile${tile.tall ? ' ap-social__tile--tall' : ''}`}
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={reduce ? undefined : -1}
      aria-label={`${tile.caption}: see more on Instagram (opens in a new tab)`}
      {...frameMotion}
    >
      <Media className="ap-social__media" {...mediaMotion}>
        {tile.video ? (
          <TileVideo tile={tile} reduce={reduce} />
        ) : (
          <ResponsiveImg
            src={tile.src}
            sizes={tileSizes(tile.src, tile.tall)}
            alt={tile.alt}
            loading="lazy"
            decoding="async"
            style={{ objectPosition: tile.position }}
          />
        )}
      </Media>
      {tile.video ? (
        <span className="ap-social__reel" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="12" height="12">
            <path d="M8 5.5v13l10.5-6.5L8 5.5z" fill="currentColor" />
          </svg>
        </span>
      ) : null}
      <span className="ap-social__veil" aria-hidden="true">
        <span className="ap-social__glyph">
          <InstagramGlyph />
        </span>
        <span className="ap-social__caption">
          <span className="ap-social__label">{tile.label}</span>
          {tile.caption}
        </span>
      </span>
    </Frame>
  );
}

/**
 * Section 11 — "Shared Transformations @ALLUREPASSIONSUK". A row of rounded Instagram-style
 * tiles (two of them quiet clinic films) that bleeds off both edges and drifts sideways
 * as the page scrolls. Reduced motion: a still row you can scroll sideways.
 */
export default function InstagramSection() {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const eased = useSpring(scrollYProgress, { stiffness: 70, damping: 22, mass: 0.6 });
  const drift = useTransform(eased, [0, 1], ['4.2%', '-4.2%']);

  const rowMotion = reduce
    ? {}
    : {
        style: { x: drift },
        initial: 'hidden',
        whileInView: 'show',
        // The row is far wider than a phone screen (only ~18% of it is ever visible there),
        // so trigger on a small share of it rather than a quarter.
        viewport: { ...VIEWPORT, amount: 0.08 },
      };
  const Row = reduce ? 'div' : motion.div;

  return (
    <section
      ref={sectionRef}
      className={`ap-social${reduce ? ' ap-social--static' : ''}`}
      aria-labelledby="ap-social-title"
    >
      <div className="ap-container ap-social__head">
        <TextReveal as="h2" id="ap-social-title" className="ap-h2 ap-social__title">
          Shared Transformations{' '}
          <a className="ap-social__handle" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
            <span className="ap-social__handle-text">@ALLUREPASSIONSUK</span>
          </a>
        </TextReveal>
        <Reveal as="p" delay={0.15} className="ap-lead ap-social__intro">
          Follow our latest treatments, patient journeys, educational content, technology demonstrations and
          behind-the-scenes updates.
        </Reveal>
      </div>

      <div className="ap-social__rail" data-overflow-ok>
        <Row className="ap-social__row" {...rowMotion}>
          {TILES.map((tile, index) => (
            <Tile key={tile.caption} tile={tile} index={index} reduce={reduce} />
          ))}
        </Row>
      </div>
    </section>
  );
}
