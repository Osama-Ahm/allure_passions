import React from 'react';
import { POPULAR_TREATMENTS } from '../data/treatmentData';
import { Sparkles, ArrowRight, Zap } from 'lucide-react';

export default function PopularTreatmentsSection({ onNavigate }) {
  const handleSelect = (id) => {
    if (onNavigate) {
      onNavigate('treatment-detail', id);
    }
  };

  return (
    <section id="popular-treatments" className="section-padding" style={{
      background: '#FFFFFF',
      borderBottom: '1px solid rgba(28, 27, 24, 0.06)'
    }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-bronze" style={{ marginBottom: '1rem' }}>
            <Sparkles size={13} /> Signature Medical Technologies
          </div>
          <h2 className="heading-lg" style={{ color: '#1C1B18' }}>
            Our Most Popular <span className="text-bronze-gradient">Treatments</span>
          </h2>
          <p>
            Advanced Clinical Solutions. Personalised to You. Exploring what makes each medical-grade technology unique and the precise aesthetic concerns it resolves.
          </p>
        </div>

        {/* Treatments Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem'
        }}>
          {POPULAR_TREATMENTS.map((tr) => (
            <div
              key={tr.id}
              className="editorial-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid rgba(168, 127, 61, 0.22)',
                background: '#FAF7F2'
              }}
            >
              <div>
                <div style={{ position: 'relative', height: '230px', overflow: 'hidden' }}>
                  <img
                    src={tr.image}
                    alt={tr.name}
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  <span style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    background: 'rgba(255, 255, 255, 0.94)',
                    border: '1px solid rgba(168, 127, 61, 0.3)',
                    color: '#A87F3D',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    padding: '0.3rem 0.75rem',
                    borderRadius: '20px'
                  }}>
                    {tr.category}
                  </span>
                </div>

                <div style={{ padding: '1.75rem' }}>
                  <h3 className="heading-md" style={{ color: '#1C1B18', marginBottom: '0.2rem', fontSize: '1.5rem' }}>
                    {tr.name}
                  </h3>
                  <div style={{ fontSize: '0.85rem', color: '#A87F3D', fontWeight: '600', marginBottom: '1rem' }}>
                    {tr.tagline}
                  </div>

                  <p style={{ color: '#7A756C', fontSize: '0.9rem', lineHeight: '1.65', marginBottom: '1.5rem', fontWeight: '300' }}>
                    {tr.shortDesc}
                  </p>

                  <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                    {tr.keyBenefits.slice(0, 3).map((benefit, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', fontSize: '0.825rem', color: '#4A4740' }}>
                        <Zap size={14} color="#A87F3D" style={{ marginTop: '2px', flexShrink: 0 }} />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div style={{
                padding: '1.25rem 1.75rem',
                borderTop: '1px solid rgba(28, 27, 24, 0.08)',
                background: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '0.725rem', color: '#7A756C', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pricing From</div>
                  <div style={{ fontSize: '0.975rem', fontWeight: '600', color: '#A87F3D' }}>{tr.pricing.split('|')[0]}</div>
                </div>

                <button
                  onClick={() => handleSelect(tr.id)}
                  className="btn-outline-bronze"
                  style={{ padding: '0.55rem 1.15rem', fontSize: '0.8rem' }}
                >
                  Protocols & Details <ArrowRight size={14} />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
