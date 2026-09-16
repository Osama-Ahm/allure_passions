import React from 'react';
import { FEATURED_PACKAGES } from '../data/treatmentData';
import { Sparkles, Check, ArrowRight, MessageSquare } from 'lucide-react';

export default function FeaturedTreatmentsSection({ onNavigate }) {

  const handlePriceDirectory = () => {
    if (onNavigate) {
      onNavigate('pricing');
    }
  };

  return (
    <section id="packages" className="section-padding" style={{
      background: '#FAF7F2',
      borderBottom: '1px solid rgba(28, 27, 24, 0.06)'
    }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-bronze" style={{ marginBottom: '1rem' }}>
            <Sparkles size={13} /> Curated Multi-Technology Programs
          </div>
          <h2 className="heading-lg" style={{ color: '#1C1B18' }}>
            Featured Treatments & <span className="text-bronze-gradient">Packages</span>
          </h2>
          <p>
            Bespoke multi-technology treatment journeys engineered to deliver synergistic body sculpting, deep dermal resurfacing, and total skin transformations.
          </p>
        </div>

        {/* Packages Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {FEATURED_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className="editorial-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid rgba(168, 127, 61, 0.25)',
                background: '#FFFFFF'
              }}
            >
              <div>
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                  <img
                    src={pkg.image}
                    alt={pkg.title}
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
                    bottom: '1rem',
                    left: '1rem',
                    background: 'rgba(255, 255, 255, 0.94)',
                    border: '1px solid #A87F3D',
                    color: '#A87F3D',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '20px'
                  }}>
                    {pkg.savings}
                  </span>
                </div>

                <div style={{ padding: '1.75rem' }}>
                  <h3 className="heading-md" style={{ color: '#1C1B18', fontSize: '1.45rem', marginBottom: '0.2rem' }}>
                    {pkg.title}
                  </h3>
                  <div style={{ fontSize: '0.85rem', color: '#A87F3D', fontWeight: '600', marginBottom: '1rem' }}>
                    {pkg.subtitle}
                  </div>

                  <p style={{ color: '#7A756C', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem', fontWeight: '300' }}>
                    {pkg.description}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
                    {pkg.highlights.map((hl, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', color: '#4A4740' }}>
                        <Check size={15} color="#A87F3D" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & Consultation Enquiry CTA */}
              <div style={{
                padding: '1.35rem 1.75rem',
                borderTop: '1px solid rgba(28, 27, 24, 0.08)',
                background: '#FAF7F2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#7A756C', textTransform: 'uppercase' }}>Full 6-Session Course</div>
                  <div style={{ fontSize: '1.35rem', fontFamily: 'var(--font-serif)', fontWeight: '600', color: '#A87F3D' }}>
                    {pkg.coursePrice}
                  </div>
                </div>

                <button
                  onClick={() => handleEnquiry(pkg.title)}
                  className="btn-bronze"
                  style={{ padding: '0.65rem 1.25rem', fontSize: '0.825rem' }}
                >
                  <MessageSquare size={13} /> Enquire Course
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Full Directory Prompt */}
        <div style={{ textAlign: 'center' }}>
          <button onClick={handlePriceDirectory} className="btn-outline-bronze" style={{ padding: '0.9rem 2.2rem' }}>
            View Complete Treatment & Package Price Directory <ArrowRight size={15} />
          </button>
        </div>

      </div>
    </section>
  );
}
