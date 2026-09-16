import React from 'react';
import { Award, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

export default function WelcomeSection({ onNavigate }) {
  const handleLearnMore = () => {
    if (onNavigate) {
      onNavigate('about');
    }
  };

  return (
    <section id="welcome" className="section-padding" style={{
      background: '#FFFFFF',
      borderBottom: '1px solid rgba(28, 27, 24, 0.06)'
    }}>
      <div className="container">
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '3.5rem',
          alignItems: 'center'
        }}>
          
          {/* Left Visual Column */}
          <div style={{ position: 'relative' }}>
            <div style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              border: '1px solid rgba(168, 127, 61, 0.25)',
              boxShadow: '0 12px 30px rgba(28, 27, 24, 0.08)',
              position: 'relative'
            }}>
              <img
                src="/assets/images/hero_clinic_ambiance.png"
                alt="Allure Passions UK Fitzrovia Suite"
                loading="lazy"
                decoding="async"
                style={{
                  width: '100%',
                  height: '440px',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>

            {/* Award Floating Badge */}
            <div style={{
              position: 'absolute',
              bottom: '-20px',
              right: '-10px',
              background: '#FAF7F2',
              border: '1px solid rgba(168, 127, 61, 0.4)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem 1.5rem',
              boxShadow: '0 15px 30px rgba(28, 27, 24, 0.12)',
              maxWidth: '280px',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'var(--bronze-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                color: '#FFFFFF'
              }}>
                <Award size={24} />
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#A87F3D', fontWeight: '700' }}>
                  GHP EXCELLENCE 2026
                </div>
                <div style={{ fontSize: '0.825rem', fontWeight: '600', color: '#1C1B18', marginTop: '0.2rem' }}>
                  Best Advanced Skin & Body Clinic – London
                </div>
              </div>
            </div>

          </div>

          {/* Right Copy Column */}
          <div>
            
            <div className="badge-bronze" style={{ marginBottom: '1rem' }}>
              <Sparkles size={13} /> The Fitzrovia Clinic Experience
            </div>

            <h2 className="heading-lg" style={{ marginBottom: '1.25rem', color: '#1C1B18' }}>
              Welcome to <span className="text-bronze-gradient">Allure Passions UK</span> Aesthetic Clinic
            </h2>

            <p style={{
              fontSize: '1.05rem',
              lineHeight: '1.75',
              color: '#4A4740',
              marginBottom: '1.25rem',
              fontWeight: '300'
            }}>
              An award-winning advanced aesthetic clinic, recognised as <strong>Best Advanced Skin & Body Aesthetics Clinic 2026 – London</strong> by <em>Global Health & Pharma (GHP)</em> as part of the Global Excellence Awards. Located at 76 Cleveland Street, Fitzrovia, moments from Oxford Street.
            </p>

            <p style={{
              fontSize: '0.95rem',
              lineHeight: '1.7',
              color: '#7A756C',
              marginBottom: '2rem',
              fontWeight: '300'
            }}>
              We pride ourselves on providing advanced, non-invasive treatments focused on skin health, body contouring, cellular health and wellbeing. Our treatment offering includes skin tightening, pigmentation and skin clarity treatments, alongside advanced solutions for patients looking to improve their skin, body and overall confidence.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '2.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#A87F3D', fontSize: '0.9rem', fontWeight: '500' }}>
                <CheckCircle2 size={16} color="#A87F3D" /> JCCP Accredited Practice
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#A87F3D', fontSize: '0.9rem', fontWeight: '500' }}>
                <CheckCircle2 size={16} color="#A87F3D" /> Level 6 Practitioners
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#A87F3D', fontSize: '0.9rem', fontWeight: '500' }}>
                <CheckCircle2 size={16} color="#A87F3D" /> Medical Grade Lasers
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#A87F3D', fontSize: '0.9rem', fontWeight: '500' }}>
                <CheckCircle2 size={16} color="#A87F3D" /> Cellular Skin Health
              </div>
            </div>

            <button onClick={handleLearnMore} className="btn-bronze">
              Discover Our Approach <ChevronRight size={16} />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}
