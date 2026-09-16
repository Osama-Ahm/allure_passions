import React from 'react';
import { Phone, MessageSquare, MapPin } from 'lucide-react';
import { CLINIC_INFO } from '../data/treatmentData';
import SplitWords from '../motion/SplitWords';

export default function PreFooterCtaSection() {
  return (
    <section
      style={{
        backgroundColor: '#161514',
        color: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(168, 127, 61, 0.25)',
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Editorial Consultation Invitation */}
          <div
            style={{
              padding: '6rem 3rem',
            }}
          >
            <div
              data-reveal
              style={{
                fontSize: '0.8rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#D4AF37',
                fontWeight: '600',
                marginBottom: '1rem',
              }}
            >
              Private Consultations
            </div>

            <h2
              data-reveal="words"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.3rem, 4.2vw, 3.4rem)',
                color: '#FFFFFF',
                fontWeight: '400',
                lineHeight: 1.15,
                marginBottom: '1.5rem',
              }}
            >
              <SplitWords>Begin Your Aesthetic Journey With Us</SplitWords>
            </h2>

            <p
              data-reveal
              style={{
                fontSize: '1.05rem',
                color: '#ECE8E1',
                lineHeight: '1.75',
                marginBottom: '2rem',
                fontWeight: '300',
                maxWidth: '520px',
              }}
            >
              Meet with our clinical practitioners in Fitzrovia to discuss your aesthetic goals, evaluate skin tissue health, and tailor an individualized treatment protocol.
            </p>

            <div data-reveal style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.5rem', fontSize: '0.9rem', color: '#C7C2B8' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <MapPin size={16} color="#D4AF37" />
                <span>76 Cleveland Street, Fitzrovia, London, W1T 6NB</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Phone size={16} color="#D4AF37" />
                <a href={`tel:${CLINIC_INFO.phone}`} style={{ color: '#FFFFFF', textDecoration: 'none' }}>
                  {CLINIC_INFO.phone}
                </a>
              </div>
            </div>

            <div data-reveal style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
              <a
                href="https://wa.me/447342052249?text=Hello%20Allure%20Passions%20UK,%20I%20would%20like%20to%20request%20an%20Initial%20Clinical%20Consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-bronze"
                style={{
                  padding: '0.95rem 2.4rem',
                  fontSize: '0.85rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  textDecoration: 'none',
                }}
              >
                <MessageSquare size={16} />
                <span>Request Consultation</span>
              </a>

              <a
                href={`tel:${CLINIC_INFO.phone}`}
                style={{
                  padding: '0.9rem 2rem',
                  fontSize: '0.85rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                  borderRadius: 'var(--radius-sm)',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#D4AF37';
                  e.currentTarget.style.color = '#D4AF37';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
              >
                <Phone size={15} />
                <span>Call Practice</span>
              </a>
            </div>
          </div>

          {/* Right Column: Close-Up Photography (Figma Exact) */}
          <div
            data-reveal="image"
            style={{
              height: '100%',
              minHeight: '440px',
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: '#121110',
            }}
          >
            <img
              src="/assets/images/prefooter_serum.jpg"
              alt="Hydrating serum application to glowing skin"
              loading="lazy"
              data-parallax="0.08"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
