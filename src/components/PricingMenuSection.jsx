import React from 'react';
import { ArrowRight, MessageSquare } from 'lucide-react';

const PRICING_CATEGORIES = [
  {
    title: 'Skin Tightening & Remodeling',
    subtitle: 'Morpheus8™ & Sofwave™',
    items: [
      { name: 'Morpheus8™ Face & Neck', single: '£550', course: '3 for £1,450' },
      { name: 'Morpheus8™ Prime (Eyes / Perioral)', single: '£350', course: '3 for £950' },
      { name: 'Sofwave™ Full Face Lift', single: '£1,400', course: 'Course £2,400' },
      { name: 'Sofwave™ Brow & Periorbital Lift', single: '£850', course: 'Course £1,500' },
      { name: 'Exosome Dermal Renaissance Add-on', single: '£250', course: 'Course £650' },
    ],
  },
  {
    title: 'Laser Renewal & Pigmentation',
    subtitle: 'PicoWay® & ADVATx®',
    items: [
      { name: 'PicoWay® Melasma & Pigment', single: '£329', course: '6 for £899' },
      { name: 'PicoWay® Resolve Facial Rejuvenation', single: '£250', course: '4 for £850' },
      { name: 'ADVATx® Vascular / Rosacea / Acne', single: '£295', course: '4 for £950' },
      { name: 'ADVATx® Non-Injectable Lip Plumping', single: '£150', course: '3 for £390' },
      { name: 'Cosmelan® Depigmentation Protocol', single: '£850', course: 'Includes Homecare' },
    ],
  },
  {
    title: 'Body Sculpting & Synergy Packages',
    subtitle: 'Emsculpt Neo® & Emerald™',
    items: [
      { name: 'Emsculpt Neo® (Abdomen / Glutes)', single: '£500', course: '4 for £1,800' },
      { name: 'Emerald™ Green Laser Lipo (10 Diodes)', single: '£350', course: '6 for £1,750' },
      { name: 'Allure Contour Synergy (6 Neo Sessions)', single: '—', course: 'Course £2,400' },
      { name: 'Allure Contour Luxe (6 Neo + 6 Emerald)', single: '—', course: 'Course £3,600' },
      { name: 'Doctor Consultation & Assessment', single: 'Complimentary with Treatment', course: '' },
    ],
  },
];

export default function PricingMenuSection({ onNavigate }) {
  return (
    <section
      style={{
        backgroundColor: '#121110',
        color: '#FFFFFF',
        padding: '7rem 0',
        borderBottom: '1px solid rgba(168, 127, 61, 0.22)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 2rem' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div
            style={{
              fontSize: '0.8rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#D4AF37',
              fontWeight: '600',
              marginBottom: '0.75rem',
            }}
          >
            Transparent Clinical Investment
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.3rem, 4.2vw, 3.4rem)',
              color: '#FFFFFF',
              fontWeight: '400',
              lineHeight: 1.15,
              marginBottom: '1rem',
            }}
          >
            Treatment Menu & Pricing
          </h2>
          <p
            style={{
              color: '#ECE8E1',
              fontSize: '1.05rem',
              maxWidth: '650px',
              margin: '0 auto',
              fontWeight: '300',
            }}
          >
            Clear, transparent fee schedules for individual sessions and comprehensive multi-modality courses.
          </p>
        </div>

        {/* 3-Column Translucent Pricing Panels (Figma Exact) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem',
          }}
        >
          {PRICING_CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className="card-dark-glass"
              style={{
                borderRadius: 'var(--radius-sm)',
                padding: '2.2rem 1.8rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: '0.72rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: '#D4AF37',
                    fontWeight: '600',
                    marginBottom: '0.35rem',
                  }}
                >
                  {cat.subtitle}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.5rem',
                    color: '#FFFFFF',
                    fontWeight: '600',
                    marginBottom: '1.75rem',
                    paddingBottom: '1rem',
                    borderBottom: '1px solid rgba(168, 127, 61, 0.25)',
                  }}
                >
                  {cat.title}
                </h3>

                {/* Items List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {cat.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        justifyContent: 'space-between',
                        gap: '1rem',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                        paddingBottom: '0.85rem',
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.925rem', color: '#FFFFFF', fontWeight: '500' }}>
                          {item.name}
                        </div>
                        {item.course && (
                          <div style={{ fontSize: '0.75rem', color: '#D4AF37', marginTop: '2px' }}>
                            Course: {item.course}
                          </div>
                        )}
                      </div>
                      <div style={{ fontSize: '0.925rem', fontWeight: '600', color: '#FFFFFF', whiteSpace: 'nowrap' }}>
                        {item.single}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Action */}
              <div style={{ marginTop: '2rem' }}>
                <a
                  href={`https://wa.me/447342052249?text=${encodeURIComponent(`Hello Allure Passions UK, I would like to enquire regarding pricing for ${cat.title}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '100%',
                    background: 'none',
                    border: '1px solid rgba(168, 127, 61, 0.4)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.75rem',
                    color: '#D4AF37',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(168, 127, 61, 0.15)';
                    e.currentTarget.style.borderColor = '#D4AF37';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'none';
                    e.currentTarget.style.borderColor = 'rgba(168, 127, 61, 0.4)';
                  }}
                >
                  <MessageSquare size={14} />
                  <span>Enquire Regarding {cat.title.split('&')[0].trim()}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={() => onNavigate && onNavigate('pricing')}
            className="btn-bronze"
            style={{
              padding: '0.95rem 2.6rem',
              fontSize: '0.85rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span>View Complete 8-Category Price List</span>
            <ArrowRight size={16} />
          </button>

          <a
            href="https://wa.me/447342052249?text=Hello%20Allure%20Passions%20UK,%20I%20would%20like%20to%20request%20a%20Bespoke%20Course%20Assessment."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '0.9rem 2.2rem',
              fontSize: '0.85rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#FFFFFF',
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
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
            Direct Consultation
          </a>
        </div>

      </div>
    </section>
  );
}
