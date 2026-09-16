import React from 'react';

const PRESS_LOGOS = [
  { name: 'VOGUE', style: { fontFamily: "'Didot', 'Playfair Display', serif", letterSpacing: '0.22em', fontSize: '1.45rem', fontWeight: '700' } },
  { name: 'TATLER', style: { fontFamily: "'Bodoni MT', 'Didot', serif", letterSpacing: '0.3em', fontSize: '1.35rem', fontWeight: '600' } },
  { name: "HARPER'S BAZAAR", style: { fontFamily: "'Didot', 'Bodoni MT', serif", letterSpacing: '0.18em', fontSize: '1.25rem', fontWeight: '600' } },
  { name: 'GQ', style: { fontFamily: "'Inter', sans-serif", letterSpacing: '0.25em', fontSize: '1.45rem', fontWeight: '900' } },
  { name: 'ELLE', style: { fontFamily: "'Didot', serif", letterSpacing: '0.25em', fontSize: '1.4rem', fontWeight: '600' } },
  { name: 'GHP GLOBAL', style: { fontFamily: "'Inter', sans-serif", letterSpacing: '0.15em', fontSize: '1.1rem', fontWeight: '600', color: '#D4AF37' } },
];

export default function PressBarSection() {
  return (
    <section
      style={{
        backgroundColor: '#161514',
        padding: '3rem 0',
        borderTop: '1px solid rgba(168, 127, 61, 0.15)',
        borderBottom: '1px solid rgba(168, 127, 61, 0.15)',
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 2rem' }}>
        <div
          style={{
            fontSize: '0.7rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#7A756C',
            textAlign: 'center',
            marginBottom: '1.75rem',
            fontWeight: '500',
          }}
        >
          As Featured & Recognised In British & International Press
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            gap: '2.5rem',
            flexWrap: 'wrap',
            opacity: 0.85,
          }}
        >
          {PRESS_LOGOS.map((press, idx) => (
            <div
              key={idx}
              style={{
                color: press.style.color || '#ECE8E1',
                ...press.style,
                userSelect: 'none',
                transition: 'opacity 0.2s, transform 0.2s',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = 'scale(1.04)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0.85';
                e.currentTarget.style.transform = 'scale(1.0)';
              }}
            >
              {press.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
