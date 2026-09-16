import React from 'react';

const PILLARS = [
  {
    numeral: 'I',
    title: 'Tier-One Medical Platforms',
    description:
      'We invest exclusively in gold-standard clinical systems—including Morpheus8™, PicoWay®, Sofwave™, ADVATx®, and Emsculpt Neo®. Every platform is FDA-cleared and chosen for verified clinical efficacy.',
    detail: 'Morpheus8™ · PicoWay® · Sofwave™ · ADVATx® · Emsculpt Neo®',
  },
  {
    numeral: 'II',
    title: 'Anatomical Calibration',
    description:
      'No two tissue structures are alike. Every protocol begins with comprehensive anatomical analysis, matching energy wavelengths and penetration depths directly to your tissue biology.',
    detail: 'Level 6 Medical Practice · JCCP Registered Oversight',
  },
  {
    numeral: 'III',
    title: 'Undetectable Rejuvenation',
    description:
      'Our aesthetic philosophy avoids artificial distortion or over-filling. We stimulate your body’s endogenous collagen and elastin reserves for elegant, enduring transformation that honors your natural facial harmony.',
    detail: 'Natural Facial Architecture · Autologous Neocollagenesis',
  },
];

export default function PillarsSection() {
  return (
    <section
      style={{
        backgroundColor: '#121110',
        color: '#FFFFFF',
        padding: '6.5rem 0',
        borderBottom: '1px solid rgba(168, 127, 61, 0.18)',
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 2rem' }}>
        
        {/* Section Header - Minimal & Classy */}
        <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <div
            style={{
              fontSize: '0.75rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#D4AF37',
              fontWeight: '600',
              marginBottom: '0.75rem',
            }}
          >
            The Allure Standard
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
              color: '#FFFFFF',
              fontWeight: '400',
              lineHeight: 1.15,
              marginBottom: '1rem',
            }}
          >
            Pillars of Clinical Excellence
          </h2>

          <p
            style={{
              color: '#C4C0B6',
              fontSize: '1.05rem',
              maxWidth: '620px',
              margin: '0 auto',
              fontWeight: '300',
              lineHeight: '1.7',
            }}
          >
            The core principles of patient safety, anatomical precision, and subtle aesthetic harmony that guide every treatment at 189 Brompton Road.
          </p>
        </div>

        {/* 3 Minimalist, Understated Luxury Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '2.5rem',
            marginBottom: '3rem',
          }}
        >
          {PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(24, 23, 21, 0.7)',
                border: '1px solid rgba(168, 127, 61, 0.22)',
                borderRadius: 'var(--radius-sm)',
                padding: '2.5rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'border-color 0.3s ease, transform 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.5)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(168, 127, 61, 0.22)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div>
                {/* Subtle Roman Numeral */}
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.1rem',
                    letterSpacing: '0.15em',
                    color: '#D4AF37',
                    fontWeight: '600',
                    marginBottom: '1.25rem',
                  }}
                >
                  {pillar.numeral}
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.6rem',
                    color: '#FFFFFF',
                    fontWeight: '400',
                    lineHeight: '1.25',
                    marginBottom: '1rem',
                  }}
                >
                  {pillar.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.925rem',
                    color: '#B8B3A8',
                    lineHeight: '1.8',
                    fontWeight: '300',
                    marginBottom: '2rem',
                  }}
                >
                  {pillar.description}
                </p>
              </div>

              {/* Discreet Detail Footer */}
              <div
                style={{
                  borderTop: '1px solid rgba(168, 127, 61, 0.15)',
                  paddingTop: '1rem',
                  fontSize: '0.75rem',
                  color: '#A87F3D',
                  letterSpacing: '0.04em',
                }}
              >
                {pillar.detail}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
