import React from 'react';
import { CLINIC_INFO } from '../data/treatmentData';
import { Phone, Mail, MapPin, ArrowUp, ShieldCheck, Award } from 'lucide-react';
import SplitWords from '../motion/SplitWords';

export default function Footer({ onNavigate }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRoute = (route, treatmentId = null) => {
    if (onNavigate) {
      onNavigate(route, treatmentId);
    }
  };

  return (
    <footer
      style={{
        backgroundColor: '#0A0A0A',
        color: '#C4C8D2',
        borderTop: '1px solid rgba(168, 127, 61, 0.3)',
        padding: '6rem 0 3rem 0',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 2rem' }}>
        
        {/* Top Brand Crest & Monogram (Figma Exact) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            marginBottom: '4.5rem',
            paddingBottom: '3.5rem',
            borderBottom: '1px solid rgba(168, 127, 61, 0.2)',
          }}
        >
          {/* Gold Serif AP Crest */}
          <div
            data-reveal="frame"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '3.8rem',
              fontWeight: '400',
              color: '#D4AF37',
              lineHeight: 1,
              letterSpacing: '0.04em',
              marginBottom: '0.75rem',
            }}
          >
            AP
          </div>

          <div
            data-reveal="words"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.6rem',
              letterSpacing: '0.12em',
              color: '#FFFFFF',
              textTransform: 'uppercase',
              marginBottom: '0.35rem',
            }}
          >
            <SplitWords>{CLINIC_INFO.name}</SplitWords>
          </div>

          <div
            data-reveal="fade"
            style={{
              fontSize: '0.75rem',
              letterSpacing: '0.25em',
              color: '#D4AF37',
              textTransform: 'uppercase',
              fontWeight: '500',
            }}
          >
            Knightsbridge • London
          </div>
        </div>

        {/* 4 Directory Columns (Figma Exact) */}
        <div
          data-reveal-children
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3rem',
            marginBottom: '4.5rem',
          }}
        >
          {/* Col 1: Clinic Location & Contact */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.25rem',
                color: '#FFFFFF',
                fontWeight: '500',
                marginBottom: '1.5rem',
                letterSpacing: '0.04em',
              }}
            >
              Knightsbridge Clinic
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.875rem', color: '#9E988E', lineHeight: '1.6' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <MapPin size={16} color="#D4AF37" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>
                  189 Brompton Road, Knightsbridge,<br />
                  London, SW3 1NE (Opposite Harrods)
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Phone size={16} color="#D4AF37" style={{ flexShrink: 0 }} />
                <a href={`tel:${CLINIC_INFO.phone}`} style={{ color: '#ECE8E1', textDecoration: 'none' }}>
                  {CLINIC_INFO.phone}
                </a>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Mail size={16} color="#D4AF37" style={{ flexShrink: 0 }} />
                <a href={`mailto:${CLINIC_INFO.email}`} style={{ color: '#ECE8E1', textDecoration: 'none' }}>
                  {CLINIC_INFO.email}
                </a>
              </div>

              <div style={{ marginTop: '0.5rem', color: '#7A756C', fontSize: '0.8rem' }}>
                Mon – Sat: 09:30 – 19:30<br />
                Sunday: By Appointment Only
              </div>
            </div>
          </div>

          {/* Col 2: Flagship Modalities */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.25rem',
                color: '#FFFFFF',
                fontWeight: '500',
                marginBottom: '1.5rem',
                letterSpacing: '0.04em',
              }}
            >
              Flagship Modalities
            </h4>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.875rem' }}>
              {[
                { name: 'Morpheus8™ Fractional RF', id: 'morpheus8' },
                { name: 'PicoWay® Picosecond Laser', id: 'picoway' },
                { name: 'ADVATx® Dual Wavelength Laser', id: 'advatx' },
                { name: 'Sofwave™ SUPERB™ Ultrasound', id: 'sofwave' },
                { name: 'Emsculpt Neo® HIFEM + RF', id: 'emsculpt_neo' },
                { name: 'Emerald™ Green Laser Lipo', id: 'emerald_laser' },
              ].map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleRoute('treatment-detail', item.id)}
                    className="ap-underline"
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#9E988E',
                      cursor: 'pointer',
                      padding: 0,
                      textAlign: 'left',
                      fontSize: '0.875rem',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#D4AF37';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#9E988E';
                    }}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Practice Directory */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.25rem',
                color: '#FFFFFF',
                fontWeight: '500',
                marginBottom: '1.5rem',
                letterSpacing: '0.04em',
              }}
            >
              The Practice
            </h4>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.875rem' }}>
              {[
                { name: 'Home', route: 'home' },
                { name: 'All Treatments Portfolio', route: 'treatments' },
                { name: 'About Abigail & Clinical Governance', route: 'about' },
                { name: 'Official Pricing Directory', route: 'pricing' },
                { name: 'Prescription Retinoids Portal', route: 'prescription-skincare' },
                { name: 'Direct WhatsApp Consultation', isWhatsApp: true },
              ].map((item, idx) => (
                <li key={idx}>
                  <button
                    className="ap-underline"
                    onClick={() => {
                      if (item.isWhatsApp) {
                        window.open('https://wa.me/447342052249?text=Hello%20Allure%20Passions%20UK,%20I%20would%20like%20to%20consult%20with%20your%20clinical%20team.', '_blank');
                      } else {
                        handleRoute(item.route);
                      }
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: item.isWhatsApp ? '#D4AF37' : '#9E988E',
                      cursor: 'pointer',
                      padding: 0,
                      textAlign: 'left',
                      fontSize: '0.875rem',
                      fontWeight: item.isWhatsApp ? '600' : '400',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#D4AF37';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = item.isWhatsApp ? '#D4AF37' : '#9E988E';
                    }}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Clinical Accreditations & POM Notice */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.25rem',
                color: '#FFFFFF',
                fontWeight: '500',
                marginBottom: '1.5rem',
                letterSpacing: '0.04em',
              }}
            >
              Governance & Safety
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.825rem', color: '#9E988E' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#D4AF37' }}>
                <Award size={18} />
                <span style={{ fontWeight: '600' }}>GHP 2026 Winner — London</span>
              </div>
              <p style={{ lineHeight: '1.5' }}>
                Best Advanced Skin & Body Aesthetics Clinic 2026, awarded by Global Health & Pharma.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#D4AF37', marginTop: '0.5rem' }}>
                <ShieldCheck size={18} />
                <span style={{ fontWeight: '600' }}>JCCP Registered Practice</span>
              </div>
              <p style={{ lineHeight: '1.5' }}>
                Level 6 Certified Medical Aesthetician operating in full compliance with UK cosmetic standards.
              </p>

              <div
                style={{
                  marginTop: '0.5rem',
                  padding: '0.75rem',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid rgba(168, 127, 61, 0.2)',
                  fontSize: '0.72rem',
                  color: '#7A756C',
                  lineHeight: '1.4',
                }}
              >
                UK POM Notice: Tretinoin requires medical suitability review and physical in-clinic collection at 189 Brompton Road.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back To Top */}
        <div
          data-reveal="fade"
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.785rem',
            color: '#7A756C',
          }}
        >
          <div>
            © {new Date().getFullYear()} Allure Passions UK Aesthetic Clinic. All rights reserved. 189 Brompton Road, Knightsbridge, London, SW3 1NE.
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Back to Top"
            style={{
              background: 'none',
              border: '1px solid rgba(168, 127, 61, 0.3)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#D4AF37',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(168, 127, 61, 0.15)';
              e.currentTarget.style.borderColor = '#D4AF37';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'none';
              e.currentTarget.style.borderColor = 'rgba(168, 127, 61, 0.3)';
            }}
          >
            <ArrowUp size={16} />
          </button>
        </div>

      </div>
    </footer>
  );
}
