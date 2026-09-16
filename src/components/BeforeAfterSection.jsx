import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { CLINIC_INFO } from '../data/treatmentData';
import SplitWords from '../motion/SplitWords';
import CountUp from '../motion/CountUp';

// Divider positions for the one-time "try me" sweep, and ms per leg.
const DEMO_STOPS = [50, 30, 68, 50];
const DEMO_LEG_MS = 950;
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function BeforeAfterSection() {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const hasInteracted = useRef(false);

  // When the comparison first comes into view, sweep the divider once to show it can be dragged.
  useEffect(() => {
    const container = containerRef.current;
    if (!container || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now() + 700;
        const tick = (now) => {
          if (hasInteracted.current) return;
          const elapsed = (now - start) / DEMO_LEG_MS;
          const leg = Math.floor(elapsed);
          if (elapsed >= 0 && leg >= DEMO_STOPS.length - 1) {
            setSliderPos(DEMO_STOPS[DEMO_STOPS.length - 1]);
            return;
          }
          if (elapsed >= 0) {
            const from = DEMO_STOPS[leg];
            const to = DEMO_STOPS[leg + 1];
            setSliderPos(from + (to - from) * easeInOutCubic(elapsed - leg));
          }
          frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    observer.observe(container);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const percentage = (offsetX / rect.width) * 100;
    setSliderPos(Math.min(Math.max(percentage, 5), 95));
  }, []);

  const handleMouseDown = () => {
    hasInteracted.current = true;
    setIsDragging(true);
  };
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging && e.buttons !== 1) return;
    updatePosition(e.clientX);
  };

  const handleTouchMove = (e) => {
    hasInteracted.current = true;
    if (e.touches && e.touches[0]) {
      updatePosition(e.touches[0].clientX);
    }
  };

  const whatsappUrl = `https://wa.me/447342052249?text=${encodeURIComponent(
    'Hello Allure Passions UK, I would like to consult regarding the Before & After facial rejuvenation protocol.'
  )}`;

  return (
    <section
      style={{
        backgroundColor: '#FAF7F2',
        padding: '7rem 0',
        borderBottom: '1px solid rgba(28, 27, 24, 0.08)',
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 2rem' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div
            data-reveal
            style={{
              fontSize: '0.8rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#A87F3D',
              fontWeight: '600',
              marginBottom: '0.75rem',
            }}
          >
            Verified Clinical Outcomes
          </div>
          <h2
            data-reveal="words"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.3rem, 4.2vw, 3.4rem)',
              color: '#1C1B18',
              fontWeight: '400',
              lineHeight: 1.15,
              marginBottom: '1rem',
            }}
          >
            <SplitWords>Real Results & Patient Transformations</SplitWords>
          </h2>
          <p
            data-reveal
            style={{
              color: '#4A4740',
              fontSize: '1.05rem',
              maxWidth: '640px',
              margin: '0 auto',
            }}
          >
            Slide the interactive divider horizontally to reveal the before and after transformation.
          </p>
        </div>

        {/* Before & After Interactive Showcase Container */}
        <div
          data-reveal="frame"
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            background: '#FFFFFF',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid rgba(168, 127, 61, 0.25)',
            boxShadow: '0 20px 45px rgba(28, 27, 24, 0.08)',
            overflow: 'hidden',
          }}
        >
          {/* Comparison Viewport */}
          <div
            ref={containerRef}
            style={{
              position: 'relative',
              height: '520px',
              width: '100%',
              overflow: 'hidden',
              cursor: 'ew-resize',
              userSelect: 'none',
              backgroundColor: '#ECE7DF',
            }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onClick={(e) => {
              hasInteracted.current = true;
              updatePosition(e.clientX);
            }}
          >
            {/* 1. Base Layer: AFTER Image (Visible on the Right) */}
            <img
              src="/assets/images/after_face.jpg"
              alt="After treatment outcome"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 25%',
                pointerEvents: 'none',
              }}
            />

            {/* 2. Top Layer: BEFORE Image (Clipped Dynamically from the Right) */}
            <img
              src="/assets/images/before_face.jpg"
              alt="Before treatment condition"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 25%',
                clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
                WebkitClipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
                pointerEvents: 'none',
              }}
            />

            {/* Floating Badge: Before Treatment */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                background: 'rgba(20, 19, 17, 0.85)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                color: '#FFFFFF',
                fontSize: '0.72rem',
                fontWeight: '600',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                padding: '0.45rem 1rem',
                borderRadius: '2px',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                pointerEvents: 'none',
                zIndex: 10,
              }}
            >
              Before Treatment
            </div>

            {/* Floating Badge: After Treatment */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'var(--bronze-gradient)',
                color: '#FFFFFF',
                fontSize: '0.72rem',
                fontWeight: '600',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                padding: '0.45rem 1rem',
                borderRadius: '2px',
                boxShadow: '0 4px 14px rgba(168, 127, 61, 0.45)',
                pointerEvents: 'none',
                zIndex: 10,
              }}
            >
              After Clinical Protocol
            </div>

            {/* Interactive Vertical Divider Line & Gold Handle */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: `${sliderPos}%`,
                width: '2px',
                background: '#FFFFFF',
                boxShadow: '0 0 12px rgba(0, 0, 0, 0.5)',
                pointerEvents: 'none',
                zIndex: 20,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'var(--bronze-gradient)',
                  border: '2px solid #FFFFFF',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                }}
              >
                ⟷
              </div>
            </div>

            {/* Subtle Drag Instruction */}
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(20, 19, 17, 0.7)',
                backdropFilter: 'blur(6px)',
                color: '#ECE8E1',
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '0.3rem 0.8rem',
                borderRadius: 'var(--radius-full)',
                pointerEvents: 'none',
                zIndex: 10,
              }}
            >
              Drag Handle to Compare
            </div>
          </div>

          {/* Clinical Details Bar (Direct Phone/WhatsApp - Zero Contact Forms) */}
          <div
            style={{
              padding: '2.2rem 2.5rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '2rem',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
            }}
          >
            <div>
              <div style={{ fontSize: '0.75rem', color: '#A87F3D', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>
                Synergy Protocol
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#1C1B18', fontWeight: '600' }}>
                PicoWay® Laser + Morpheus8™
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#4A4740', marginTop: '0.35rem', lineHeight: '1.5' }}>
                Pigment clearance & collagen contraction achieved over 3 tailored sessions.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '2rem' }}>
              <div>
                <div style={{ fontSize: '1.35rem', fontWeight: '700', color: '#1C1B18', fontFamily: 'var(--font-serif)' }}>
                  3 Sessions
                </div>
                <div style={{ fontSize: '0.75rem', color: '#7A756C' }}>Clinical Course</div>
              </div>
              <div>
                <div style={{ fontSize: '1.35rem', fontWeight: '700', color: '#1C1B18', fontFamily: 'var(--font-serif)' }}>
                  Zero
                </div>
                <div style={{ fontSize: '0.75rem', color: '#7A756C' }}>Social Downtime</div>
              </div>
              <div>
                <div style={{ fontSize: '1.35rem', fontWeight: '700', color: '#A87F3D', fontFamily: 'var(--font-serif)' }}>
                  <CountUp to={100} suffix="%" />
                </div>
                <div style={{ fontSize: '0.75rem', color: '#7A756C' }}>Patient Satisfaction</div>
              </div>
            </div>

            {/* Direct Consultation Triggers (Strictly No Form Popups) */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-bronze"
                style={{
                  padding: '0.8rem 1.4rem',
                  fontSize: '0.8rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  textDecoration: 'none',
                }}
              >
                <MessageCircle size={15} />
                <span>WhatsApp Clinic</span>
              </a>

              <a
                href={`tel:${CLINIC_INFO.phone}`}
                className="btn-outline-bronze"
                style={{
                  padding: '0.8rem 1.2rem',
                  fontSize: '0.8rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  textDecoration: 'none',
                }}
              >
                <Phone size={14} />
                <span>Call Practice</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
