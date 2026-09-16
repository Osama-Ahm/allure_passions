import React, { useState } from 'react';
import { REVIEWS } from '../data/treatmentData';
import { Star, CheckCircle } from 'lucide-react';

export default function ReviewsSection() {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Morpheus8', 'PicoWay', 'Emsculpt Neo', 'ADVATx'];

  const filteredReviews = REVIEWS.filter(r => {
    if (filter === 'All') return true;
    return r.treatment.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <section id="reviews" className="section-padding" style={{
      background: '#FAF7F2',
      borderBottom: '1px solid rgba(28, 27, 24, 0.06)'
    }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-bronze" style={{ marginBottom: '1rem' }}>
            <Star size={13} fill="#A87F3D" /> Verified Patient Experiences
          </div>
          <h2 className="heading-lg" style={{ color: '#1C1B18' }}>
            Live Patient <span className="text-bronze-gradient">Reviews</span>
          </h2>
          <p>
            Real patient experiences, clinical journeys, and verified Google feedback from our Fitzrovia & London patients.
          </p>
        </div>

        {/* Live Rating Overview Card */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid rgba(168, 127, 61, 0.25)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem 1.75rem',
          marginBottom: '2.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.25rem',
          boxShadow: '0 4px 15px rgba(28, 27, 24, 0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '58px',
              height: '58px',
              borderRadius: '50%',
              background: 'var(--bronze-gradient)',
              color: '#FFFFFF',
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.7rem',
              fontWeight: '700'
            }}>
              5.0
            </div>

            <div>
              <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '0.2rem' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#A87F3D" color="#A87F3D" />
                ))}
              </div>
              <div style={{ fontWeight: '600', color: '#1C1B18', fontSize: '1rem' }}>
                Google Verified Patient Rating
              </div>
              <div style={{ fontSize: '0.8rem', color: '#7A756C' }}>
                Based on 68+ verified clinical patient reviews
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  background: filter === cat ? 'var(--bronze-gradient)' : '#FAF7F2',
                  color: filter === cat ? '#FFFFFF' : '#4A4740',
                  border: filter === cat ? 'none' : '1px solid rgba(28, 27, 24, 0.08)',
                  padding: '0.4rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8rem',
                  fontWeight: filter === cat ? '600' : '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="editorial-card"
              style={{
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: '#FFFFFF',
                border: '1px solid rgba(168, 127, 61, 0.2)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.15rem' }}>
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="#A87F3D" color="#A87F3D" />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#7A756C' }}>{rev.date}</span>
                </div>

                <p style={{ color: '#4A4740', fontSize: '0.9rem', lineHeight: '1.65', marginBottom: '1.5rem', fontWeight: '300' }}>
                  "{rev.text}"
                </p>
              </div>

              <div style={{ paddingTop: '1rem', borderTop: '1px solid rgba(28, 27, 24, 0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: '600', color: '#1C1B18', fontSize: '0.9rem' }}>{rev.author}</div>
                    <div style={{ fontSize: '0.75rem', color: '#A87F3D', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: '500' }}>
                      <CheckCircle size={12} /> {rev.role}
                    </div>
                  </div>
                  <span style={{
                    fontSize: '0.7rem',
                    background: 'rgba(168, 127, 61, 0.08)',
                    color: '#A87F3D',
                    padding: '0.2rem 0.55rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid rgba(168, 127, 61, 0.2)',
                    fontWeight: '600'
                  }}>
                    {rev.treatment}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
