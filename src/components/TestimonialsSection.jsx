import React from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { REVIEWS } from '../data/treatmentData';
import SplitWords from '../motion/SplitWords';

export default function TestimonialsSection() {
  // Take first 6 reviews for a perfect 2x3 grid (Figma exact)
  const displayReviews = REVIEWS.slice(0, 6);

  return (
    <section
      style={{
        backgroundColor: '#FFFFFF',
        padding: '7rem 0',
        borderBottom: '1px solid rgba(28, 27, 24, 0.08)',
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 2rem' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div
            data-reveal
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              marginBottom: '0.75rem',
            }}
          >
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} fill="#D4AF37" color="#D4AF37" />
            ))}
          </div>

          <div
            data-reveal
            style={{
              fontSize: '0.8rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#A87F3D',
              fontWeight: '600',
              marginBottom: '0.75rem',
            }}
          >
            5.0 Verified Patient Ratings
          </div>
          <h2
            data-reveal="words"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.3rem, 4.2vw, 3.4rem)',
              color: '#1C1B18',
              fontWeight: '400',
              lineHeight: 1.15,
              marginBottom: '1rem',
            }}
          >
            <SplitWords>Client Experiences</SplitWords>
          </h2>
          <p
            data-reveal
            style={{
              color: '#4A4740',
              fontSize: '1.05rem',
              maxWidth: '620px',
              margin: '0 auto',
            }}
          >
            Genuine reflections from patients treated at our private clinic opposite Harrods in Knightsbridge.
          </p>
        </div>

        {/* 2x3 Grid of 6 Review Cards (Figma Exact) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            marginBottom: '3.5rem',
          }}
        >
          {displayReviews.map((review) => (
            <div
              key={review.id}
              className="card-white-elevation"
              style={{
                borderRadius: 'var(--radius-sm)',
                padding: '2.2rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: '#FAF7F2',
                border: '1px solid rgba(168, 127, 61, 0.2)',
              }}
            >
              <div>
                {/* 5 Stars */}
                <div style={{ display: 'flex', gap: '3px', marginBottom: '1.25rem' }}>
                  {[...Array(review.rating)].map((_, idx) => (
                    <Star key={idx} size={15} fill="#D4AF37" color="#D4AF37" />
                  ))}
                </div>

                <p
                  style={{
                    fontSize: '0.925rem',
                    color: '#1C1B18',
                    lineHeight: '1.7',
                    fontStyle: 'italic',
                    marginBottom: '1.5rem',
                  }}
                >
                  "{review.quote || review.text}"
                </p>
              </div>

              <div
                style={{
                  borderTop: '1px solid rgba(168, 127, 61, 0.15)',
                  paddingTop: '1rem',
                }}
              >
                <div style={{ fontWeight: '600', fontSize: '0.9rem', color: '#1C1B18' }}>
                  {review.author}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#A87F3D', marginTop: '2px', fontWeight: '500' }}>
                  {review.treatment} • {review.location || review.role}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Centered Direct Consultation Action */}
        <div data-reveal style={{ textAlign: 'center' }}>
          <a
            href="https://wa.me/447342052249?text=Hello%20Allure%20Passions%20UK,%20I%20would%20like%20to%20consult%20with%20your%20clinical%20team."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-bronze"
            style={{
              padding: '0.9rem 2.6rem',
              fontSize: '0.85rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              textDecoration: 'none',
            }}
          >
            <MessageSquare size={15} />
            <span>Consult With Our Clinical Team</span>
          </a>
        </div>

      </div>
    </section>
  );
}
