import React from 'react';
import { ArrowRight, ShieldCheck, Award, GraduationCap, Phone } from 'lucide-react';
import { CLINIC_INFO } from '../data/treatmentData';

export default function FounderSection({ onNavigate }) {
  return (
    <section
      style={{
        backgroundColor: '#FFFFFF',
        padding: '7rem 0',
        borderBottom: '1px solid rgba(28, 27, 24, 0.08)',
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 2rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '4rem',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Editorial Bio (Figma Exact) */}
          <div>
            <div
              style={{
                fontSize: '0.8rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#A87F3D',
                fontWeight: '600',
                marginBottom: '1rem',
              }}
            >
              Meet Our Founder & Clinical Lead
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.3rem, 4.2vw, 3.4rem)',
                color: '#1C1B18',
                fontWeight: '400',
                lineHeight: 1.15,
                marginBottom: '1.75rem',
              }}
            >
              Welcome to Allure Passions UK
            </h2>

            <p
              style={{
                fontSize: '1.05rem',
                color: '#4A4740',
                lineHeight: '1.8',
                marginBottom: '1.25rem',
              }}
            >
              Founded on the belief that aesthetic medicine should enhance—never distort—your natural facial architecture, Allure Passions UK delivers doctor-led, evidence-based treatments in the heart of Knightsbridge.
            </p>

            <p
              style={{
                fontSize: '0.95rem',
                color: '#4A4740',
                lineHeight: '1.75',
                marginBottom: '2rem',
              }}
            >
              As a Level 6 medical aesthetician certified in advanced laser physics, dermal histology, and energy-based tissue remodeling, Abigail tailors every protocol with uncompromising precision. From non-surgical facial lifting with Sofwave™ to deep subdermal collagen renewal with Morpheus8™, every treatment begins with an in-depth clinical consultation.
            </p>

            {/* Credential Tags */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                marginBottom: '2.5rem',
                padding: '1.25rem',
                background: '#FAF7F2',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid rgba(168, 127, 61, 0.2)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <ShieldCheck size={20} color="#A87F3D" style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#1C1B18' }}>JCCP Registered</div>
                  <div style={{ fontSize: '0.75rem', color: '#7A756C' }}>Joint Council for Cosmetic Practitioners</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <GraduationCap size={20} color="#A87F3D" style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#1C1B18' }}>Level 6 Certified</div>
                  <div style={{ fontSize: '0.75rem', color: '#7A756C' }}>Advanced Aesthetic Practice</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Award size={20} color="#A87F3D" style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#1C1B18' }}>GHP 2026 Winner</div>
                  <div style={{ fontSize: '0.75rem', color: '#7A756C' }}>Best Skin & Body Clinic London</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Phone size={20} color="#A87F3D" style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#1C1B18' }}>Direct Clinical Line</div>
                  <a href={`tel:${CLINIC_INFO.phone}`} style={{ fontSize: '0.75rem', color: '#A87F3D', textDecoration: 'none' }}>
                    {CLINIC_INFO.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => onNavigate && onNavigate('about')}
                className="btn-bronze"
                style={{
                  padding: '0.9rem 2.2rem',
                  fontSize: '0.85rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                <span>About Our Practice</span>
                <ArrowRight size={15} style={{ marginLeft: '0.5rem' }} />
              </button>

              <a
                href="https://wa.me/447342052249?text=Hello%20Abigail,%20I%20would%20like%20to%20consult%20with%20you%20at%20Allure%20Passions%20UK."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-bronze"
                style={{
                  padding: '0.85rem 1.8rem',
                  fontSize: '0.85rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span>Enquire With Abigail</span>
              </a>
            </div>
          </div>

          {/* Right Column: High-End Studio Portrait (Figma Exact) */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                position: 'relative',
                maxWidth: '460px',
                width: '100%',
              }}
            >
              {/* Decorative Hairline Border Behind */}
              <div
                style={{
                  position: 'absolute',
                  inset: '-12px',
                  border: '1px solid rgba(168, 127, 61, 0.3)',
                  borderRadius: 'var(--radius-sm)',
                  zIndex: 0,
                }}
              />

              {/* Main Portrait Frame */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 1,
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden',
                  boxShadow: '0 20px 50px rgba(28, 27, 24, 0.15)',
                  backgroundColor: '#1C1B18',
                }}
              >
                <img
                  src="/assets/images/practitioner_portrait.jpg"
                  alt="Abigail - Lead Aesthetician & Clinic Founder"
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    objectFit: 'cover',
                  }}
                />

                {/* Overlaid Title Badge */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '1.5rem',
                    background: 'linear-gradient(180deg, transparent 0%, rgba(18, 17, 16, 0.95) 100%)',
                    color: '#FFFFFF',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.4rem',
                      fontWeight: '600',
                      letterSpacing: '0.04em',
                    }}
                  >
                    Abigail
                  </div>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      letterSpacing: '0.15em',
                      color: '#D4AF37',
                      textTransform: 'uppercase',
                    }}
                  >
                    Clinic Founder & Level 6 Aesthetician
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
