import React from 'react';
import { Award, ArrowRight } from 'lucide-react';
import SplitWords from '../motion/SplitWords';

export default function AccreditationsSection({ onNavigate }) {
  return (
    <section
      style={{
        backgroundColor: '#FAF7F2',
        padding: '6.5rem 0',
        borderBottom: '1px solid rgba(28, 27, 24, 0.08)',
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 1.5rem' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div
            data-reveal
            style={{
              fontSize: '0.78rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#A87F3D',
              fontWeight: '600',
              marginBottom: '0.75rem',
            }}
          >
            Clinical Governance & Industry Recognition
          </div>
          <h2
            data-reveal="words"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
              color: '#1C1B18',
              fontWeight: '400',
              lineHeight: 1.15,
              marginBottom: '1rem',
            }}
          >
            <SplitWords>Recognised Excellence</SplitWords>
          </h2>
          <p
            data-reveal
            style={{
              color: '#4A4740',
              fontSize: '1.05rem',
              maxWidth: '640px',
              margin: '0 auto',
              fontWeight: '300',
            }}
          >
            Operating under rigorous UK clinical governance, Professional Standards Authority accreditation, and verified industry recognition.
          </p>
        </div>

        {/* 2 Prestigious Accreditation Plaques */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
            gap: '2.5rem',
            maxWidth: '1200px',
            margin: '0 auto 3.5rem auto',
          }}
        >
          {/* Plaque 1: JCCP Registered Practice & Public Safety */}
          <div
            className="card-white-elevation"
            style={{
              background: '#FFFFFF',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid rgba(168, 127, 61, 0.28)',
              padding: 'clamp(2.25rem, 4vw, 3rem) clamp(1.75rem, 3.5vw, 2.5rem)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              boxShadow: '0 8px 30px rgba(28, 27, 24, 0.04)',
            }}
          >
            <div>
              {/* Official Seal Showcase */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '2rem',
                  padding: '1.25rem',
                  background: '#FAF7F2',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid rgba(168, 127, 61, 0.2)',
                  minHeight: '140px',
                }}
              >
                <img
                  src="/assets/images/jccp_badge_real.png"
                  alt="Joint Council for Cosmetic Practitioners - Assuring Public Safety"
                  style={{
                    maxHeight: '100px',
                    maxWidth: '260px',
                    width: 'auto',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
              </div>

              {/* Status Pill */}
              <div style={{ marginBottom: '1rem' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    background: 'rgba(168, 127, 61, 0.09)',
                    border: '1px solid rgba(168, 127, 61, 0.25)',
                    padding: '0.35rem 0.85rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.72rem',
                    fontWeight: '600',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#A87F3D',
                  }}
                >
                  <Award size={13} color="#A87F3D" />
                  <span>PSA Government-Approved Register</span>
                </span>
              </div>

              {/* Title & Subtitle */}
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.5rem, 2.2vw, 1.85rem)',
                  color: '#1C1B18',
                  fontWeight: '500',
                  lineHeight: 1.2,
                  marginBottom: '0.5rem',
                }}
              >
                Joint Council for Cosmetic Practitioners
              </h3>

              <div
                style={{
                  fontSize: '0.85rem',
                  color: '#A87F3D',
                  fontWeight: '600',
                  marginBottom: '1.25rem',
                }}
              >
                Level 6 Clinical Care • PSA Accredited Oversight
              </div>

              <p
                style={{
                  fontSize: '0.925rem',
                  color: '#4A4740',
                  lineHeight: '1.75',
                  marginBottom: '2rem',
                  fontWeight: '300',
                }}
              >
                Allure Passions UK operates under the accredited clinical register of the <strong>Joint Council for Cosmetic Practitioners (JCCP)</strong>, recognized by the UK Professional Standards Authority. Every procedure meets rigorous Level 6 clinical training benchmarks, sterile suite protocols, and verified patient safety guidelines.
              </p>

              {/* Credential Attributes */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
                <div style={{ background: '#FAF7F2', padding: '0.85rem 1rem', borderRadius: '4px', border: '1px solid rgba(28, 27, 24, 0.08)' }}>
                  <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', color: '#7A756C', letterSpacing: '0.06em' }}>Registry Tier</div>
                  <div style={{ fontSize: '0.825rem', color: '#1C1B18', fontWeight: '600', marginTop: '0.2rem' }}>PSA Approved</div>
                </div>
                <div style={{ background: '#FAF7F2', padding: '0.85rem 1rem', borderRadius: '4px', border: '1px solid rgba(28, 27, 24, 0.08)' }}>
                  <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', color: '#7A756C', letterSpacing: '0.06em' }}>Competence</div>
                  <div style={{ fontSize: '0.825rem', color: '#1C1B18', fontWeight: '600', marginTop: '0.2rem' }}>Level 6 Certified</div>
                </div>
                <div style={{ background: '#FAF7F2', padding: '0.85rem 1rem', borderRadius: '4px', border: '1px solid rgba(28, 27, 24, 0.08)' }}>
                  <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', color: '#7A756C', letterSpacing: '0.06em' }}>Suite Location</div>
                  <div style={{ fontSize: '0.825rem', color: '#1C1B18', fontWeight: '600', marginTop: '0.2rem' }}>Knightsbridge</div>
                </div>
              </div>
            </div>

            <div
              style={{
                borderTop: '1px solid rgba(28, 27, 24, 0.08)',
                paddingTop: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.785rem',
                color: '#7A756C',
              }}
            >
              <span>189 Brompton Road, SW3 1NE</span>
              <span style={{ color: '#A87F3D', fontWeight: '600' }}>Active PSA Registry</span>
            </div>
          </div>

          {/* Plaque 2: GHP Global Excellence Award 2026 */}
          <div
            className="card-white-elevation"
            style={{
              background: '#FFFFFF',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid rgba(168, 127, 61, 0.28)',
              padding: 'clamp(2.25rem, 4vw, 3rem) clamp(1.75rem, 3.5vw, 2.5rem)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              boxShadow: '0 8px 30px rgba(28, 27, 24, 0.04)',
            }}
          >
            <div>
              {/* Official Seal Showcase */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '2rem',
                  padding: '1.25rem',
                  background: '#FAF7F2',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid rgba(168, 127, 61, 0.2)',
                  minHeight: '140px',
                }}
              >
                <img
                  src="/assets/images/ghp_award_official.svg"
                  alt="Global Health & Pharma - Global Excellence Awards 2026 Winner"
                  style={{
                    maxHeight: '110px',
                    maxWidth: '110px',
                    width: 'auto',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
              </div>

              {/* Status Pill */}
              <div style={{ marginBottom: '1rem' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    background: 'rgba(168, 127, 61, 0.09)',
                    border: '1px solid rgba(168, 127, 61, 0.25)',
                    padding: '0.35rem 0.85rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.72rem',
                    fontWeight: '600',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#A87F3D',
                  }}
                >
                  <Award size={13} color="#A87F3D" />
                  <span>Global Health & Pharma • 2026 Winner</span>
                </span>
              </div>

              {/* Title & Subtitle */}
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.5rem, 2.2vw, 1.85rem)',
                  color: '#1C1B18',
                  fontWeight: '500',
                  lineHeight: 1.2,
                  marginBottom: '0.5rem',
                }}
              >
                Global Excellence Awards 2026
              </h3>

              <div
                style={{
                  fontSize: '0.85rem',
                  color: '#A87F3D',
                  fontWeight: '600',
                  marginBottom: '1.25rem',
                }}
              >
                Best Advanced Skin & Body Aesthetics Clinic — London
              </div>

              <p
                style={{
                  fontSize: '0.925rem',
                  color: '#4A4740',
                  lineHeight: '1.75',
                  marginBottom: '2rem',
                  fontWeight: '300',
                }}
              >
                Conferred in the prestigious <strong>Global Excellence Awards 2026</strong> hosted by Global Health & Pharma (GHP). Awarded in recognition of clinical excellence in non-surgical cellular renewal, dual-wavelength laser mechanics (ADVATx®), and transformative body sculpting standards.
              </p>

              {/* Credential Attributes */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
                <div style={{ background: '#FAF7F2', padding: '0.85rem 1rem', borderRadius: '4px', border: '1px solid rgba(28, 27, 24, 0.08)' }}>
                  <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', color: '#7A756C', letterSpacing: '0.06em' }}>Category</div>
                  <div style={{ fontSize: '0.825rem', color: '#1C1B18', fontWeight: '600', marginTop: '0.2rem' }}>Skin & Body Clinic</div>
                </div>
                <div style={{ background: '#FAF7F2', padding: '0.85rem 1rem', borderRadius: '4px', border: '1px solid rgba(28, 27, 24, 0.08)' }}>
                  <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', color: '#7A756C', letterSpacing: '0.06em' }}>Jurisdiction</div>
                  <div style={{ fontSize: '0.825rem', color: '#1C1B18', fontWeight: '600', marginTop: '0.2rem' }}>Central London</div>
                </div>
                <div style={{ background: '#FAF7F2', padding: '0.85rem 1rem', borderRadius: '4px', border: '1px solid rgba(28, 27, 24, 0.08)' }}>
                  <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', color: '#7A756C', letterSpacing: '0.06em' }}>Award Year</div>
                  <div style={{ fontSize: '0.825rem', color: '#1C1B18', fontWeight: '600', marginTop: '0.2rem' }}>2026 Honouree</div>
                </div>
              </div>
            </div>

            <div
              style={{
                borderTop: '1px solid rgba(28, 27, 24, 0.08)',
                paddingTop: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.785rem',
                color: '#7A756C',
              }}
            >
              <span>Citation: GHP-LON-2026-AP</span>
              <span style={{ color: '#A87F3D', fontWeight: '600' }}>Verified Award</span>
            </div>
          </div>
        </div>

        {/* Bottom CTA to /about */}
        <div data-reveal style={{ textAlign: 'center' }}>
          <button
            onClick={() => onNavigate && onNavigate('about')}
            className="btn-outline-bronze"
            style={{
              padding: '0.85rem 2.2rem',
              fontSize: '0.825rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span>Learn More About Our Clinical Governance</span>
            <ArrowRight size={15} />
          </button>
        </div>

      </div>
    </section>
  );
}
