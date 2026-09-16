import React from 'react';
import { ArrowRight, MessageSquare } from 'lucide-react';
import SplitWords from '../motion/SplitWords';
import CountUp from '../motion/CountUp';

export default function BodyContouringSection({ onNavigate }) {
  return (
    <section
      style={{
        backgroundColor: '#121110',
        color: '#FFFFFF',
        padding: '7rem 0',
        borderBottom: '1px solid rgba(168, 127, 61, 0.22)',
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 2rem' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div
            data-reveal
            style={{
              fontSize: '0.8rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#D4AF37',
              fontWeight: '600',
              marginBottom: '0.75rem',
            }}
          >
            Revolutionary Body Contouring
          </div>
          <h2
            data-reveal="words"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.3rem, 4.2vw, 3.4rem)',
              color: '#FFFFFF',
              fontWeight: '400',
              lineHeight: 1.15,
              marginBottom: '1rem',
            }}
          >
            <SplitWords>Emsculpt Neo® at Allure Passions UK</SplitWords>
          </h2>
          <p
            data-reveal
            style={{
              color: '#ECE8E1',
              fontSize: '1.05rem',
              maxWidth: '650px',
              margin: '0 auto',
              fontWeight: '300',
            }}
          >
            The world's first and only non-invasive body shaping procedure that combines synchronized Radiofrequency and HIFEM+ energy in a single 30-minute session.
          </p>
        </div>

        {/* Featured Spotlight Card (Figma Exact) */}
        <div
          className="card-dark-glass"
          style={{
            maxWidth: '1120px',
            margin: '0 auto',
            borderRadius: 'var(--radius-sm)',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            alignItems: 'center',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
          }}
        >
          {/* Left: Applicator & Treatment Room Photography */}
          <div
            data-reveal="image"
            style={{
              height: '100%',
              minHeight: '380px',
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: '#1C1B18',
            }}
          >
            <img
              src="/assets/images/emsculpt_applicator.jpg"
              alt="Patient undergoing Emsculpt Neo body contouring treatment"
              loading="lazy"
              data-parallax="0.07"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                background: 'rgba(18, 17, 16, 0.85)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                padding: '0.4rem 0.85rem',
                borderRadius: '2px',
                fontSize: '0.72rem',
                color: '#D4AF37',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: '600',
              }}
            >
              76 Cleveland Street • Body Suite
            </div>
          </div>

          {/* Right: Metrics & Clinical Protocol */}
          <div style={{ padding: '3.5rem 3rem' }}>
            <div
              data-reveal
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#D4AF37',
                fontWeight: '600',
                marginBottom: '0.5rem',
              }}
            >
              Dual Synchronised Modality
            </div>

            <h3
              data-reveal
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2rem',
                color: '#FFFFFF',
                fontWeight: '500',
                marginBottom: '1.5rem',
                lineHeight: 1.2,
              }}
            >
              30% Fat Reduction • 25% Muscle Hypertrophy
            </h3>

            {/* Metric Pills */}
            <div
              data-reveal-children
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1.25rem',
                marginBottom: '2rem',
              }}
            >
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(168, 127, 61, 0.25)',
                  padding: '1rem',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#D4AF37', fontFamily: 'var(--font-serif)' }}>
                  <CountUp to={30} prefix="-" suffix="%" />
                </div>
                <div style={{ fontSize: '0.75rem', color: '#ECE8E1' }}>
                  Subcutaneous Fat Layer
                </div>
              </div>

              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(168, 127, 61, 0.25)',
                  padding: '1rem',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#D4AF37', fontFamily: 'var(--font-serif)' }}>
                  <CountUp to={25} prefix="+" suffix="%" />
                </div>
                <div style={{ fontSize: '0.75rem', color: '#ECE8E1' }}>
                  Muscle Tone & Definition
                </div>
              </div>

              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(168, 127, 61, 0.25)',
                  padding: '1rem',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#FFFFFF', fontFamily: 'var(--font-serif)' }}>
                  <CountUp to={30} suffix=" Min" />
                </div>
                <div style={{ fontSize: '0.75rem', color: '#ECE8E1' }}>
                  Comfortable Session
                </div>
              </div>

              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(168, 127, 61, 0.25)',
                  padding: '1rem',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#FFFFFF', fontFamily: 'var(--font-serif)' }}>
                  Zero
                </div>
                <div style={{ fontSize: '0.75rem', color: '#ECE8E1' }}>
                  Social or Work Downtime
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div data-reveal style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href="https://wa.me/447342052249?text=Hello%20Allure%20Passions%20UK,%20I%20would%20like%20to%20consult%20regarding%20Emsculpt%20Neo%20Body%20Contouring."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-bronze"
                style={{
                  padding: '0.9rem 2rem',
                  fontSize: '0.825rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  textDecoration: 'none',
                }}
              >
                <MessageSquare size={15} />
                <span>Enquire Regarding Neo®</span>
              </a>

              <button
                onClick={() => onNavigate && onNavigate('treatment-detail', 'emsculpt_neo')}
                style={{
                  background: 'none',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.85rem 1.6rem',
                  color: '#FFFFFF',
                  fontSize: '0.825rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#D4AF37';
                  e.currentTarget.style.color = '#D4AF37';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
              >
                <span>Full Protocol Specs</span>
                <ArrowRight size={14} />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
