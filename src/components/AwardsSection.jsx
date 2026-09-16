import React from 'react';
import { Award, ShieldCheck, Star, BookOpen } from 'lucide-react';

export default function AwardsSection() {
  const mediaFeatures = [
    { name: "VOGUE AESTHETICS", quote: "London's leading destination for non-invasive laser resurfacing and radiofrequency tightening." },
    { name: "GHP MAGAZINE", quote: "Winner: Best Advanced Skin & Body Aesthetics Clinic 2026 - London. Outstanding clinical safety and results." },
    { name: "TATLER BEAUTY INDEX", quote: "PicoWay & Morpheus8 treatments delivered with meticulous practitioner perfection." },
    { name: "HARPER'S BAZAAR", quote: "The ultimate discreet sanctuary for cellular wellness and body sculpting." },
  ];

  return (
    <section id="awards" className="section-padding" style={{
      background: '#FFFFFF',
      borderBottom: '1px solid rgba(28, 27, 24, 0.06)'
    }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-bronze" style={{ marginBottom: '1rem' }}>
            <Award size={13} /> Industry Honors & Recognition
          </div>
          <h2 className="heading-lg" style={{ color: '#1C1B18' }}>
            Awards, Accreditations & <span className="text-bronze-gradient">Recognition</span>
          </h2>
          <p>
            Recognised by leading healthcare publications and national regulatory registries for clinical safety, technological mastery, and transformative patient outcomes.
          </p>
        </div>

        {/* Award Showcase Banner */}
        <div style={{
          background: '#FAF7F2',
          border: '1px solid rgba(168, 127, 61, 0.3)',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem 2rem',
          marginBottom: '3.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          alignItems: 'center',
          boxShadow: '0 8px 24px rgba(28, 27, 24, 0.03)'
        }}>
          <div>
            <div className="badge-bronze" style={{ marginBottom: '0.75rem' }}>
              <Star size={13} fill="#A87F3D" color="#A87F3D" /> Global Excellence Awards 2026
            </div>

            <h3 className="heading-md" style={{ fontSize: '2rem', color: '#1C1B18', marginBottom: '0.75rem' }}>
              Best Advanced Skin & Body Aesthetics Clinic 2026 – London
            </h3>

            <p style={{ color: '#4A4740', fontSize: '1rem', lineHeight: '1.7', marginBottom: '1.25rem', fontWeight: '300' }}>
              Awarded by <strong>Global Health & Pharma (GHP)</strong> in recognition of our commitment to non-invasive clinical innovation, Level 6 practitioner standards, and patient-first medical aesthetics.
            </p>

            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#A87F3D', fontSize: '0.875rem', fontWeight: '500' }}>
                <ShieldCheck size={16} color="#A87F3D" /> Official GHP Winner
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#A87F3D', fontSize: '0.875rem', fontWeight: '500' }}>
                <ShieldCheck size={16} color="#A87F3D" /> JCCP Registered Clinic
              </div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#FFFFFF',
            padding: '2rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(168, 127, 61, 0.2)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'var(--bronze-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              marginBottom: '0.85rem'
            }}>
              <Award size={40} />
            </div>

            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', color: '#1C1B18', fontWeight: '600' }}>
              Global Health & Pharma
            </div>
            <div style={{ fontSize: '0.8rem', color: '#7A756C', marginTop: '0.2rem' }}>
              GHP Excellence in Aesthetics 2026
            </div>
          </div>
        </div>

        {/* Media & Press Quotes */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem'
        }}>
          {mediaFeatures.map((media, idx) => (
            <div
              key={idx}
              className="editorial-card"
              style={{
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: '#FAF7F2',
                border: '1px solid rgba(28, 27, 24, 0.08)'
              }}
            >
              <div>
                <div style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '1.15rem',
                  fontWeight: '600',
                  color: '#A87F3D',
                  letterSpacing: '0.08em',
                  marginBottom: '0.85rem'
                }}>
                  {media.name}
                </div>
                <p style={{ color: '#4A4740', fontSize: '0.9rem', fontStyle: 'italic', lineHeight: '1.6', fontWeight: '300' }}>
                  "{media.quote}"
                </p>
              </div>

              <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#7A756C', fontSize: '0.75rem' }}>
                <BookOpen size={13} color="#A87F3D" /> Press Feature Highlight
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
