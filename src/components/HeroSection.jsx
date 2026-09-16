import React, { useEffect, useRef } from 'react';
import { ArrowRight, MessageSquare } from 'lucide-react';
import SplitWords from '../motion/SplitWords';

export default function HeroSection({ onNavigate }) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const contentRef = useRef(null);

  // Scroll parallax: the film drifts slower than the page while the copy lifts and fades.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let frame = 0;
    const update = () => {
      frame = 0;
      const height = section.offsetHeight;
      const y = Math.min(Math.max(window.scrollY, 0), height);
      if (videoRef.current) videoRef.current.style.translate = `0 ${(y * 0.35).toFixed(1)}px`;
      if (contentRef.current) {
        contentRef.current.style.translate = `0 ${(y * -0.12).toFixed(1)}px`;
        contentRef.current.style.opacity = String(Math.max(0, 1 - y / (height * 0.75)).toFixed(3));
      }
    };
    const handleScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '92vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#121110',
        paddingTop: '6rem',
        paddingBottom: '4rem',
      }}
    >
      {/* 1. Cinematic Full-Bleed Video Background */}
      <video
        ref={videoRef}
        className="hero-media hero-parallax"
        src="/assets/videos/clinic_hero_walkthrough.mp4"
        poster="/assets/images/hero_clinic_ambiance.png"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1,
        }}
      />

      {/* 2. Gradient Vignette Overlay Scrim */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(14, 13, 12, 0.72) 0%, rgba(14, 13, 12, 0.45) 50%, rgba(14, 13, 12, 0.88) 100%)',
          zIndex: 2,
        }}
      />

      {/* 3. Hero Editorial Content (Figma Exact) */}
      <div
        ref={contentRef}
        className="hero-parallax"
        style={{
          position: 'relative',
          zIndex: 3,
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          padding: '0 2rem',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Tracked Overline */}
        <div
          className="hero-overline"
          style={{
            fontSize: '0.825rem',
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: '#D4AF37',
            fontWeight: '600',
            marginBottom: '1.25rem',
          }}
        >
          Aesthetic & Cellular Medicine • Knightsbridge, London
        </div>

        {/* Figma Exact Headline: "Advanced Aesthetics" */}
        <h1
          className="hero-title"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.8rem, 6.2vw, 5.2rem)',
            fontWeight: '400',
            color: '#FFFFFF',
            lineHeight: '1.08',
            letterSpacing: '-0.015em',
            maxWidth: '900px',
            marginBottom: '1.5rem',
            textShadow: '0 4px 30px rgba(0, 0, 0, 0.6)',
          }}
        >
          <SplitWords>Advanced Aesthetics</SplitWords>
        </h1>

        {/* Supporting Clinical Tagline */}
        <p
          className="hero-copy"
          style={{
            fontSize: 'clamp(1.05rem, 1.4vw, 1.25rem)',
            color: '#ECE8E1',
            lineHeight: '1.7',
            maxWidth: '680px',
            marginBottom: '2.5rem',
            fontWeight: '300',
            textShadow: '0 2px 14px rgba(0, 0, 0, 0.5)',
          }}
        >
          A doctor-led practice providing non-invasive clinical skin, body, and cellular rejuvenation with unmatched precision in the heart of Knightsbridge.
        </p>

        {/* Dual CTAs (Figma Exact: Left Gold Filled, Right Dark/Outline) */}
        <div
          className="hero-actions"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.25rem',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={() => onNavigate('treatments')}
            className="btn-bronze"
            style={{
              padding: '0.95rem 2.4rem',
              fontSize: '0.85rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              boxShadow: '0 8px 24px rgba(168, 127, 61, 0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span>Explore Treatments</span>
            <ArrowRight size={16} />
          </button>

          <a
            href="https://wa.me/447342052249?text=Hello%20Allure%20Passions%20UK,%20I%20would%20like%20to%20consult%20regarding%20a%20clinical%20treatment."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '0.9rem 2.2rem',
              fontSize: '0.85rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#FFFFFF',
              background: 'rgba(20, 19, 17, 0.45)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              borderRadius: 'var(--radius-sm)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              textDecoration: 'none',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#D4AF37';
              e.currentTarget.style.color = '#D4AF37';
              e.currentTarget.style.background = 'rgba(20, 19, 17, 0.7)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.background = 'rgba(20, 19, 17, 0.45)';
            }}
          >
            <MessageSquare size={15} />
            <span>Direct Consultation</span>
          </a>
        </div>
      </div>
    </section>
  );
}
