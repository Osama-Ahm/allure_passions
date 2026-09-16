import React, { useState, useEffect } from 'react';
import { CLINIC_INFO } from '../data/treatmentData';
import { Phone, MapPin, X, ArrowRight, ShieldCheck, MessageSquare, Clock } from 'lucide-react';

export default function Navbar({ currentRoute = 'home', onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu drawer is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Handle ESC key to close drawer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  const handleNavClick = (targetRoute) => {
    setIsMenuOpen(false);
    if (onNavigate) {
      onNavigate(targetRoute);
    }
  };

  const isHome = currentRoute === 'home';
  const isTransparent = isHome && !scrolled;

  return (
    <>
      {/* Figma Header: Fixed Overlay (Left MENU, Center AP Crest, Right ENQUIRE) */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 900,
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          background: isTransparent
            ? 'linear-gradient(180deg, rgba(14, 13, 12, 0.82) 0%, rgba(14, 13, 12, 0.35) 60%, transparent 100%)'
            : 'rgba(18, 17, 16, 0.95)',
          backdropFilter: isTransparent ? 'none' : 'blur(16px)',
          WebkitBackdropFilter: isTransparent ? 'none' : 'blur(16px)',
          borderBottom: isTransparent ? 'none' : '1px solid rgba(168, 127, 61, 0.22)',
          padding: scrolled ? '0.75rem 1.5rem' : '1.25rem 2rem',
        }}
      >
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          {/* Left: Minimal MENU Trigger (Figma exact) */}
          <button
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open Navigation Menu"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              color: '#FFFFFF',
              padding: '0.5rem 0.25rem',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#D4AF37';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#FFFFFF';
            }}
          >
            {/* Minimalist 2-line hamburger */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '22px' }}>
              <span style={{ display: 'block', height: '1.5px', background: 'currentColor', width: '100%', transition: 'background 0.2s' }} />
              <span style={{ display: 'block', height: '1.5px', background: 'currentColor', width: '70%', transition: 'background 0.2s' }} />
            </div>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.825rem',
                fontWeight: '500',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}
            >
              Menu
            </span>
          </button>

          {/* Center: Monogram AP Luxury Crest & Brand Identity (Figma exact) */}
          <button
            onClick={() => handleNavClick('home')}
            aria-label="Allure Passions UK Home"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 0,
              textDecoration: 'none',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: scrolled ? '1.4rem' : '1.75rem',
                fontWeight: '600',
                letterSpacing: '0.08em',
                color: '#FFFFFF',
                lineHeight: 1,
                transition: 'font-size 0.3s ease',
              }}
            >
              ALLURE PASSIONS
            </div>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.58rem',
                letterSpacing: '0.24em',
                color: '#D4AF37',
                textTransform: 'uppercase',
                marginTop: '3px',
                fontWeight: '500',
              }}
            >
              Knightsbridge • London
            </span>
          </button>

          {/* Right: Gold ENQUIRE Button (Figma exact - Direct WhatsApp / Telephone) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <a
              href="https://wa.me/447342052249?text=Hello%20Allure%20Passions%20UK,%20I%20would%20like%20to%20enquire%20about%20a%20clinical%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'var(--bronze-gradient)',
                color: '#FFFFFF',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                borderRadius: 'var(--radius-sm)',
                padding: scrolled ? '0.5rem 1.25rem' : '0.6rem 1.4rem',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8rem',
                fontWeight: '600',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 4px 14px rgba(168, 127, 61, 0.3)',
                whiteSpace: 'nowrap',
                textDecoration: 'none',
                display: 'inline-block',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(168, 127, 61, 0.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(168, 127, 61, 0.3)';
              }}
            >
              Enquire
            </a>
          </div>
        </div>
      </header>

      {/* Slide-Over Full Luxury Menu Drawer */}
      {isMenuOpen && (
        <div className="drawer-backdrop" onClick={() => setIsMenuOpen(false)}>
          <div
            className="drawer-panel"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '480px',
              background: '#141312',
              color: '#FFFFFF',
              borderRight: '1px solid rgba(168, 127, 61, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '2.2rem 2.2rem',
            }}
          >
            {/* Drawer Header */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.4rem',
                      letterSpacing: '0.08em',
                      color: '#FFFFFF',
                    }}
                  >
                    ALLURE PASSIONS
                  </div>
                  <div
                    style={{
                      fontSize: '0.62rem',
                      letterSpacing: '0.2em',
                      color: '#D4AF37',
                      textTransform: 'uppercase',
                    }}
                  >
                    Knightsbridge, London
                  </div>
                </div>

                <button
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close Menu"
                  style={{
                    background: 'none',
                    border: '1px solid rgba(168, 127, 61, 0.3)',
                    borderRadius: '50%',
                    width: '38px',
                    height: '38px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#D4AF37',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(168, 127, 61, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'none';
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Navigation Links (Editorial Serifs) */}
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2.5rem' }}>
                {[
                  { label: 'Home', route: 'home' },
                  { label: 'Treatments Portfolio', route: 'treatments' },
                  { label: 'About Practice & Founder', route: 'about' },
                  { label: 'Treatment Menu & Pricing', route: 'pricing' },
                  { label: 'Prescription Skincare Hub', route: 'prescription-skincare' },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleNavClick(item.route)}
                    style={{
                      background: 'none',
                      border: 'none',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                      padding: '1rem 0',
                      textAlign: 'left',
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.45rem',
                      color: currentRoute === item.route ? '#D4AF37' : '#FFFFFF',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#D4AF37';
                      e.currentTarget.style.paddingLeft = '0.5rem';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = currentRoute === item.route ? '#D4AF37' : '#FFFFFF';
                      e.currentTarget.style.paddingLeft = '0';
                    }}
                  >
                    <span>{item.label}</span>
                    <ArrowRight size={16} opacity={0.6} />
                  </button>
                ))}
              </nav>

              {/* Direct Consultation Link */}
              <a
                href="https://wa.me/447342052249?text=Hello%20Allure%20Passions%20UK,%20I%20would%20like%20to%20enquire%20about%20a%20clinical%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="btn-bronze"
                style={{
                  width: '100%',
                  padding: '0.9rem',
                  fontSize: '0.85rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  marginBottom: '2rem',
                  textDecoration: 'none',
                }}
              >
                <MessageSquare size={16} />
                <span>Direct Clinical Consultation</span>
              </a>
            </div>

            {/* Clinic Details Footer */}
            <div
              style={{
                borderTop: '1px solid rgba(168, 127, 61, 0.2)',
                paddingTop: '1.5rem',
                fontSize: '0.825rem',
                color: '#9E988E',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                <MapPin size={15} color="#D4AF37" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{CLINIC_INFO.address}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Phone size={15} color="#D4AF37" style={{ flexShrink: 0 }} />
                <a href={`tel:${CLINIC_INFO.phone}`} style={{ color: '#FFFFFF', textDecoration: 'none' }}>
                  {CLINIC_INFO.phone}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Clock size={15} color="#D4AF37" style={{ flexShrink: 0 }} />
                <span>Mon – Sat: 09:30 – 19:30 (Sun by appointment)</span>
              </div>

              <div
                style={{
                  marginTop: '0.8rem',
                  padding: '0.75rem',
                  background: 'rgba(168, 127, 61, 0.08)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid rgba(168, 127, 61, 0.18)',
                  fontSize: '0.72rem',
                  color: '#D4AF37',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <ShieldCheck size={16} style={{ flexShrink: 0 }} />
                <span>JCCP Registered & Level 6 Clinical Practice • GHP 2026 Winner</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
