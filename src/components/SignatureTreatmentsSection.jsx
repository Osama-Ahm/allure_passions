import React from 'react';
import { ArrowRight } from 'lucide-react';
import { POPULAR_TREATMENTS } from '../data/treatmentData';

export default function SignatureTreatmentsSection({ onNavigate }) {
  return (
    <section
      style={{
        backgroundColor: '#1C1B18',
        color: '#FFFFFF',
        padding: '7rem 0',
        borderBottom: '1px solid rgba(168, 127, 61, 0.22)',
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
              color: '#D4AF37',
              fontWeight: '600',
              marginBottom: '0.75rem',
            }}
          >
            Clinical Excellence
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.3rem, 4.2vw, 3.4rem)',
              color: '#FFFFFF',
              fontWeight: '400',
              lineHeight: 1.15,
              marginBottom: '1rem',
            }}
          >
            Signature Treatments
          </h2>
          <p
            style={{
              color: '#ECE8E1',
              fontSize: '1.05rem',
              maxWidth: '650px',
              margin: '0 auto',
              fontWeight: '300',
            }}
          >
            Six world-class, FDA-cleared technologies delivering clinically transformative results across face, neck, and body.
          </p>
        </div>

        {/* 3x2 Grid of 6 White Cards (Figma Exact) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem',
          }}
        >
          {POPULAR_TREATMENTS.map((treatment) => (
            <div
              key={treatment.id}
              className="card-white-elevation"
              style={{
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: '#FFFFFF',
                color: '#1C1B18',
              }}
            >
              {/* Card Image */}
              <div
                style={{
                  height: '240px',
                  width: '100%',
                  overflow: 'hidden',
                  position: 'relative',
                  backgroundColor: '#EAE5DC',
                }}
              >
                <img
                  src={treatment.image}
                  alt={treatment.name}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1.0)';
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    background: 'rgba(20, 19, 17, 0.8)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    color: '#FFFFFF',
                    fontSize: '0.68rem',
                    fontWeight: '600',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    padding: '0.3rem 0.75rem',
                    borderRadius: '2px',
                    border: '1px solid rgba(212, 175, 55, 0.35)',
                  }}
                >
                  {treatment.category}
                </div>
              </div>

              {/* Card Content */}
              <div
                style={{
                  padding: '1.8rem 1.6rem',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.65rem',
                      color: '#1C1B18',
                      fontWeight: '600',
                      marginBottom: '0.35rem',
                      lineHeight: 1.2,
                    }}
                  >
                    {treatment.name}
                  </h3>
                  
                  <div
                    style={{
                      fontSize: '0.8rem',
                      color: '#A87F3D',
                      fontWeight: '600',
                      letterSpacing: '0.04em',
                      marginBottom: '0.85rem',
                    }}
                  >
                    {treatment.tagline}
                  </div>

                  <p
                    style={{
                      fontSize: '0.9rem',
                      color: '#4A4740',
                      lineHeight: '1.65',
                      marginBottom: '1.25rem',
                    }}
                  >
                    {treatment.shortDesc}
                  </p>
                </div>

                {/* Price & Action Button */}
                <div>
                  <div
                    style={{
                      borderTop: '1px solid rgba(28, 27, 24, 0.08)',
                      paddingTop: '1rem',
                      marginBottom: '1.25rem',
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span style={{ fontSize: '0.75rem', color: '#7A756C', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      Clinical Investment
                    </span>
                    <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#1C1B18' }}>
                      {treatment.pricing.split('|')[0].trim()}
                    </span>
                  </div>

                  <button
                    onClick={() => onNavigate && onNavigate('treatment-detail', treatment.id)}
                    className="btn-bronze"
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      fontSize: '0.825rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <span>View Treatment Details</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Centered Button (Figma Exact) */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => onNavigate && onNavigate('treatments')}
            style={{
              background: 'transparent',
              color: '#FFFFFF',
              border: '1px solid rgba(212, 175, 55, 0.5)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.95rem 2.8rem',
              fontSize: '0.85rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--bronze-gradient)';
              e.currentTarget.style.borderColor = '#D4AF37';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(168, 127, 61, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.5)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            View Full Treatment Portfolio
          </button>
        </div>

      </div>
    </section>
  );
}
