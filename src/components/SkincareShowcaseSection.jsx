import React from 'react';
import { ArrowRight, ShieldAlert, MessageSquare } from 'lucide-react';

export default function SkincareShowcaseSection({ onNavigate }) {
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
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div
            style={{
              fontSize: '0.8rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#A87F3D',
              fontWeight: '600',
              marginBottom: '0.75rem',
            }}
          >
            Prescription & Clinical Formulations
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.3rem, 4.2vw, 3.4rem)',
              color: '#1C1B18',
              fontWeight: '400',
              lineHeight: 1.15,
              marginBottom: '1rem',
            }}
          >
            Medical-Grade Skincare
          </h2>
          <p
            style={{
              color: '#4A4740',
              fontSize: '1.05rem',
              maxWidth: '650px',
              margin: '0 auto',
            }}
          >
            Dermatologist-formulated homecare regimes that maintain cellular turnover and accelerate post-treatment skin renewal.
          </p>
        </div>

        {/* 2 Product Podium Cards (Figma Exact) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2.5rem',
            maxWidth: '1060px',
            margin: '0 auto',
          }}
        >
          {/* Card 1: Kojivit Ultra */}
          <div
            className="card-white-elevation"
            style={{
              borderRadius: 'var(--radius-sm)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              background: '#FFFFFF',
            }}
          >
            <div>
              <div
                style={{
                  height: '300px',
                  width: '100%',
                  backgroundColor: '#F3EFE9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2rem',
                  position: 'relative',
                }}
              >
                <img
                  src="/assets/images/kojivit_ultra_cream.png"
                  alt="Kojivit Ultra Brightening Cream"
                  loading="lazy"
                  style={{
                    maxHeight: '100%',
                    maxWidth: '100%',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 15px 25px rgba(28, 27, 24, 0.15))',
                    transition: 'transform 0.4s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1.0)';
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    background: '#FFFFFF',
                    color: '#1C1B18',
                    fontSize: '0.68rem',
                    fontWeight: '600',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    padding: '0.3rem 0.75rem',
                    borderRadius: '2px',
                    border: '1px solid rgba(168, 127, 61, 0.25)',
                  }}
                >
                  Clinical OTC Skincare
                </span>
              </div>

              <div style={{ padding: '2rem' }}>
                <div style={{ fontSize: '0.75rem', color: '#A87F3D', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.35rem' }}>
                  Targeted Pigment Correction
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.75rem',
                    color: '#1C1B18',
                    fontWeight: '600',
                    marginBottom: '0.75rem',
                  }}
                >
                  Kojivit Ultra Cream
                </h3>

                <p style={{ fontSize: '0.9rem', color: '#4A4740', lineHeight: '1.65', marginBottom: '1.25rem' }}>
                  Advanced multi-action brightening formula combining Kojic Acid Dipalmitate, Arbutin, Glycolic Acid, and Mulberry Extract to fade stubborn melasma and sun damage.
                </p>

                <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1C1B18', fontFamily: 'var(--font-serif)', marginBottom: '1.5rem' }}>
                  £45.00 <span style={{ fontSize: '0.8rem', fontWeight: '400', color: '#7A756C' }}>/ 30g Tube</span>
                </div>
              </div>
            </div>

            <div style={{ padding: '0 2rem 2rem 2rem' }}>
              <a
                href="https://wa.me/447342052249?text=Hello%20Allure%20Passions%20UK,%20I%20would%20like%20to%20enquire%20about%20purchasing%20Kojivit%20Ultra%20Cream."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-bronze"
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  fontSize: '0.825rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  textDecoration: 'none',
                }}
              >
                <MessageSquare size={15} />
                <span>Enquire Regarding Skincare</span>
              </a>
            </div>
          </div>

          {/* Card 2: Tretinoin Prescription POM */}
          <div
            className="card-white-elevation"
            style={{
              borderRadius: 'var(--radius-sm)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              background: '#FFFFFF',
              border: '1px solid rgba(168, 127, 61, 0.35)',
            }}
          >
            <div>
              <div
                style={{
                  height: '300px',
                  width: '100%',
                  backgroundColor: '#F3EFE9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2rem',
                  position: 'relative',
                }}
              >
                <img
                  src="/assets/images/tretinoin_prescription.png"
                  alt="Tretinoin Prescription Skincare"
                  loading="lazy"
                  style={{
                    maxHeight: '100%',
                    maxWidth: '100%',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 15px 25px rgba(28, 27, 24, 0.15))',
                    transition: 'transform 0.4s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1.0)';
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    background: '#1C1B18',
                    color: '#D4AF37',
                    fontSize: '0.68rem',
                    fontWeight: '600',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    padding: '0.3rem 0.75rem',
                    borderRadius: '2px',
                    border: '1px solid rgba(212, 175, 55, 0.4)',
                  }}
                >
                  Prescription Medicine (POM)
                </span>
              </div>

              <div style={{ padding: '2rem' }}>
                <div style={{ fontSize: '0.75rem', color: '#A87F3D', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.35rem' }}>
                  Medical Retinoid Therapy
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.75rem',
                    color: '#1C1B18',
                    fontWeight: '600',
                    marginBottom: '0.75rem',
                  }}
                >
                  Tretinoin 0.025% & 0.1%
                </h3>

                <p style={{ fontSize: '0.9rem', color: '#4A4740', lineHeight: '1.65', marginBottom: '1rem' }}>
                  Gold-standard pure retinoic acid. Accelerates epidermal turnover, repairs cellular photodamage, and stimulates dermal collagen. Requires clinical assessment before dispensation.
                </p>

                <div
                  style={{
                    background: 'rgba(168, 127, 61, 0.08)',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.75rem',
                    color: '#4A4740',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <ShieldAlert size={16} color="#A87F3D" style={{ flexShrink: 0 }} />
                  <span>Physical in-clinic collection and payment at 189 Brompton Road.</span>
                </div>
              </div>
            </div>

            <div style={{ padding: '0 2rem 2rem 2rem' }}>
              <button
                onClick={() => onNavigate && onNavigate('prescription-skincare')}
                className="btn-bronze"
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  fontSize: '0.825rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                }}
              >
                <span>Prescription Consultation Portal</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
