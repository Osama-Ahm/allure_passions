import React, { useState } from 'react';
import { CONCERNS_LIST, POPULAR_TREATMENTS } from '../data/treatmentData';
import { Search, Sparkles, ArrowRight, MessageSquare } from 'lucide-react';

export default function WhatWeTreatSection({ onNavigate }) {
  const categories = ['All', 'Skin', 'Skin Tightening', 'Body', 'Laser', 'Wellness'];
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeConcernId, setActiveConcernId] = useState('hyperpigmentation');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConcerns = CONCERNS_LIST.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeConcern = CONCERNS_LIST.find((c) => c.id === activeConcernId) || CONCERNS_LIST[0];

  const matchedTreatments = POPULAR_TREATMENTS.filter((t) =>
    activeConcern.treatments.includes(t.id)
  );

  const handleTreatmentClick = (id) => {
    if (onNavigate) {
      onNavigate('treatment-detail', id);
    }
  };

  return (
    <section id="what-we-treat" className="section-padding" style={{
      background: '#FAF7F2',
      borderBottom: '1px solid rgba(28, 27, 24, 0.06)'
    }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-bronze" style={{ marginBottom: '1rem' }}>
            <Sparkles size={13} /> Personalised Treatment Pathways
          </div>
          <h2 className="heading-lg" style={{ color: '#1C1B18' }}>
            What We <span className="text-bronze-gradient">Treat</span>
          </h2>
          <p>
            Skin, Body & Cellular Concerns. Select your specific concern below to explore our targeted clinical protocols and device technologies.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2.5rem',
          background: '#FFFFFF',
          padding: '1rem 1.5rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid rgba(168, 127, 61, 0.2)',
          boxShadow: '0 4px 15px rgba(28, 27, 24, 0.03)'
        }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  background: selectedCategory === cat ? 'var(--bronze-gradient)' : '#FAF7F2',
                  color: selectedCategory === cat ? '#FFFFFF' : '#4A4740',
                  border: selectedCategory === cat ? 'none' : '1px solid rgba(28, 27, 24, 0.08)',
                  padding: '0.45rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  fontWeight: selectedCategory === cat ? '600' : '500',
                  fontSize: '0.825rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', minWidth: '220px' }}>
            <Search size={15} color="#7A756C" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search your concern..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                background: '#FAF7F2',
                border: '1px solid rgba(168, 127, 61, 0.3)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.45rem 0.85rem 0.45rem 2.25rem',
                color: '#1C1B18',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Dual Panel Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 1fr) minmax(340px, 1.4fr)',
          gap: '2rem'
        }}>
          
          {/* Left: Concern Pills */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            maxHeight: '520px',
            overflowY: 'auto',
            paddingRight: '0.5rem'
          }}>
            {filteredConcerns.map((concern) => {
              const isActive = concern.id === activeConcernId;
              return (
                <button
                  key={concern.id}
                  onClick={() => setActiveConcernId(concern.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.9rem 1.15rem',
                    borderRadius: 'var(--radius-sm)',
                    background: isActive ? '#FFFFFF' : '#FAF7F2',
                    border: isActive ? '1.5px solid #A87F3D' : '1px solid rgba(28, 27, 24, 0.06)',
                    color: isActive ? '#1C1B18' : '#7A756C',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                    boxShadow: isActive ? '0 4px 12px rgba(168, 127, 61, 0.1)' : 'none'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: isActive ? '600' : '400', fontSize: '0.9rem' }}>{concern.name}</div>
                    <div style={{ fontSize: '0.75rem', color: isActive ? '#A87F3D' : '#9E988E' }}>{concern.category}</div>
                  </div>
                  <ArrowRight size={15} color={isActive ? '#A87F3D' : '#9E988E'} />
                </button>
              );
            })}
          </div>

          {/* Right: Matched Clinical Options */}
          <div className="editorial-card" style={{ padding: '2rem', border: '1px solid rgba(168, 127, 61, 0.3)', background: '#FFFFFF' }}>
            
            <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(28, 27, 24, 0.08)', paddingBottom: '1rem' }}>
              <span className="badge-bronze" style={{ fontSize: '0.725rem', marginBottom: '0.4rem' }}>
                SELECTED CONCERN
              </span>
              <h3 className="heading-md" style={{ color: '#1C1B18', marginTop: '0.2rem' }}>
                {activeConcern.name}
              </h3>
              <p style={{ color: '#7A756C', fontSize: '0.875rem', marginTop: '0.25rem', fontWeight: '300' }}>
                Recommended medical aesthetic technologies for <strong>{activeConcern.name}</strong>:
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              {matchedTreatments.length > 0 ? (
                matchedTreatments.map((tr) => (
                  <div
                    key={tr.id}
                    style={{
                      background: '#FAF7F2',
                      border: '1px solid rgba(168, 127, 61, 0.22)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '1.15rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      flexWrap: 'wrap'
                    }}
                  >
                    <div style={{ flex: 1, minWidth: '180px' }}>
                      <div style={{ fontWeight: '600', color: '#1C1B18', fontSize: '1rem' }}>{tr.name}</div>
                      <p style={{ fontSize: '0.825rem', color: '#7A756C', margin: 0, fontWeight: '300' }}>
                        {tr.tagline} — {tr.pricing.split('|')[0]}
                      </p>
                    </div>

                    <button
                      onClick={() => handleTreatmentClick(tr.id)}
                      className="btn-outline-bronze"
                      style={{ padding: '0.45rem 0.95rem', fontSize: '0.775rem' }}
                    >
                      View Details
                    </button>
                  </div>
                ))
              ) : (
                <div style={{ color: '#7A756C', padding: '1rem 0', fontSize: '0.9rem' }}>
                  Please consult our clinical practitioner for bespoke combination options.
                </div>
              )}
            </div>

            {/* Consultation Enquiry Block (Strictly No Booking Engine) */}
            <div style={{
              background: 'rgba(168, 127, 61, 0.08)',
              padding: '1.25rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px dashed rgba(168, 127, 61, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div>
                <div style={{ fontWeight: '600', color: '#A87F3D', fontSize: '0.9rem' }}>
                  Unsure which treatment fits your concern?
                </div>
                <div style={{ fontSize: '0.8rem', color: '#7A756C' }}>
                  Discuss targeted treatment pathways with our Level 6 clinical team.
                </div>
              </div>

              <a
                href={`https://wa.me/447342052249?text=${encodeURIComponent(`Hello Allure Passions UK, I would like to consult regarding ${activeConcern.name}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-bronze"
                style={{ padding: '0.65rem 1.25rem', fontSize: '0.8rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <MessageSquare size={14} /> Enquire Regarding Concern
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
