import React from 'react';
import { PRODUCTS } from '../data/treatmentData';
import { ShoppingBag, FileText, ShieldAlert, ArrowRight, Lock } from 'lucide-react';

export default function PrescriptionSkincareSection({ onNavigate }) {
  const handlePortal = () => {
    if (onNavigate) {
      onNavigate('prescription-skincare');
    }
  };

  return (
    <section id="prescription" className="section-padding" style={{
      background: '#FFFFFF',
      borderBottom: '1px solid rgba(28, 27, 24, 0.06)'
    }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-bronze" style={{ marginBottom: '1rem' }}>
            <FileText size={13} /> Medical & Prescription Skincare
          </div>
          <h2 className="heading-lg" style={{ color: '#1C1B18' }}>
            Prescription & Medical <span className="text-bronze-gradient">Skincare</span>
          </h2>
          <p>
            Consultation-led clinical skincare. In compliance with UK clinical regulations, active prescription treatments require prior practitioner medical assessment.
          </p>
        </div>

        {/* Regulatory Banner Callout */}
        <div style={{
          background: 'rgba(239, 68, 68, 0.05)',
          border: '1px solid rgba(239, 68, 68, 0.25)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem 1.75rem',
          marginBottom: '3rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem'
        }}>
          <ShieldAlert size={26} color="#EF4444" style={{ flexShrink: 0 }} />
          <div>
            <div style={{ fontWeight: '600', color: '#1C1B18', fontSize: '0.95rem' }}>
              Important Medical Regulations Notice: Prescription Tretinoin
            </div>
            <div style={{ fontSize: '0.85rem', color: '#4A4740', marginTop: '0.2rem', fontWeight: '300' }}>
              Tretinoin is a prescription-only active medicine. It <strong>cannot be purchased direct online</strong> without practitioner clinical consultation and assessment. <strong>All payments are made physically at 76 Cleveland Street upon collection.</strong>
            </div>
          </div>
        </div>

        {/* Products Showcase Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '2.5rem'
        }}>
          {PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              className="editorial-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: prod.isPrescription ? '1px solid #A87F3D' : '1px solid rgba(28, 27, 24, 0.08)',
                background: '#FAF7F2'
              }}
            >
              <div>
                {/* Product Image */}
                <div style={{ position: 'relative', height: '260px', overflow: 'hidden', background: '#FFFFFF', padding: '1.5rem', borderBottom: '1px solid rgba(28,27,24,0.06)' }}>
                  <img
                    src={prod.image}
                    alt={prod.name}
                    loading="lazy"
                    decoding="async"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                  <span style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: prod.isPrescription ? 'rgba(168, 127, 61, 0.12)' : 'rgba(28, 27, 24, 0.05)',
                    border: prod.isPrescription ? '1px solid #A87F3D' : '1px solid rgba(28, 27, 24, 0.1)',
                    color: prod.isPrescription ? '#A87F3D' : '#1C1B18',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '20px'
                  }}>
                    {prod.type}
                  </span>
                </div>

                <div style={{ padding: '1.75rem' }}>
                  <h3 className="heading-md" style={{ color: '#1C1B18', fontSize: '1.4rem', marginBottom: '0.2rem' }}>
                    {prod.name}
                  </h3>
                  <div style={{ fontSize: '0.85rem', color: '#A87F3D', fontWeight: '600', marginBottom: '1rem' }}>
                    {prod.subtitle}
                  </div>

                  <p style={{ color: '#7A756C', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem', fontWeight: '300' }}>
                    {prod.description}
                  </p>

                  {prod.isPrescription ? (
                    <div style={{
                      background: 'rgba(168, 127, 61, 0.08)',
                      border: '1px dashed rgba(168, 127, 61, 0.3)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '1rem',
                      fontSize: '0.825rem',
                      color: '#A87F3D',
                      marginBottom: '1rem'
                    }}>
                      <div style={{ fontWeight: '600', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Lock size={14} /> Medical Consultation Journey:
                      </div>
                      1. Product Selection → 2. Medical History & Suitability Questions → 3. Clinical Review → 4. Email Approval & Physical Collection at Clinic.
                    </div>
                  ) : (
                    <div style={{ fontSize: '0.85rem', color: '#4A4740', marginBottom: '1rem' }}>
                      <strong>Active Formulation:</strong> {prod.ingredients}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Bar */}
              <div style={{
                padding: '1.25rem 1.75rem',
                borderTop: '1px solid rgba(28, 27, 24, 0.08)',
                background: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#7A756C' }}>Price / Status</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#A87F3D' }}>{prod.price}</div>
                </div>

                {prod.isPrescription ? (
                  <button
                    onClick={handlePortal}
                    className="btn-bronze"
                    style={{ padding: '0.65rem 1.25rem', fontSize: '0.825rem' }}
                  >
                    Clinical Portal <ArrowRight size={14} />
                  </button>
                ) : (
                  <button
                    onClick={handlePortal}
                    className="btn-outline-bronze"
                    style={{ padding: '0.65rem 1.25rem', fontSize: '0.825rem' }}
                  >
                    Reserve for Pickup <ShoppingBag size={14} />
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
