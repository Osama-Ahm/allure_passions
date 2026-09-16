import React from 'react';
import { Award, CheckCircle2, ArrowLeft, MessageSquare, MapPin } from 'lucide-react';
import { CLINIC_INFO, CREDENTIALS } from '../../data/treatmentData';

export default function AboutPage({ onNavigate }) {

  return (
    <div style={{ padding: '4rem 0 6rem 0', background: '#FAF7F2', minHeight: '85vh', color: '#1C1B18' }}>
      <div className="container">
        
        {/* Back Link */}
        <button
          onClick={() => onNavigate('home')}
          className="btn-outline-bronze"
          style={{ marginBottom: '2.5rem', padding: '0.5rem 1.25rem', fontSize: '0.8rem' }}
        >
          <ArrowLeft size={14} /> Back to Homepage
        </button>

        {/* Page Header */}
        <div style={{ maxWidth: '850px', marginBottom: '4rem' }}>
          <div className="badge-bronze" style={{ marginBottom: '1rem' }}>
            <Award size={14} /> GHP Global Excellence Awards 2026 Winner
          </div>

          <h1 className="heading-xl" style={{ color: '#1C1B18', marginBottom: '1rem' }}>
            About <span className="text-bronze-gradient">{CLINIC_INFO.fullName}</span>
          </h1>

          <p style={{ fontSize: '1.2rem', color: '#4A4740', fontWeight: '300', lineHeight: '1.75' }}>
            Recognised as <strong>Best Advanced Skin & Body Aesthetics Clinic 2026 – London</strong> by <em>Global Health & Pharma (GHP)</em> as part of the Global Excellence Awards. Located in the heart of Knightsbridge at 189 Brompton Road (opposite Harrods).
          </p>
        </div>

        {/* Main Grid Story Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '3.5rem', marginBottom: '5rem', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#A87F3D', fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
              <MapPin size={14} /> 189 Brompton Road, Knightsbridge
            </div>

            <h2 className="heading-lg" style={{ color: '#1C1B18', marginBottom: '1.25rem' }}>
              Refined Luxury Meets <span className="text-bronze-gradient">Clinical Science</span>
            </h2>

            <p style={{ color: '#4A4740', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '1.25rem', fontWeight: '300' }}>
              At <strong>Allure Passions UK</strong>, we believe aesthetic medicine should be an empowering, dignified, and patient-centred experience. We specialize in non-invasive clinical treatments that restore epidermal clarity, contour muscle and fat, and optimize cellular skin health without surgery or downtime.
            </p>

            <p style={{ color: '#7A756C', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '2rem' }}>
              Operating from our private Knightsbridge clinic suite, our practitioners hold Level 6 clinical qualifications, manufacturer masterclass certifications for PicoWay®, ADVATx®, Morpheus8™, Sofwave™, and Emsculpt Neo®, alongside official registration with the Joint Council for Cosmetic Practitioners (JCCP).
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#A87F3D', fontSize: '0.925rem', fontWeight: '500' }}>
                <CheckCircle2 size={16} color="#A87F3D" /> JCCP Registered Practice
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#A87F3D', fontSize: '0.925rem', fontWeight: '500' }}>
                <CheckCircle2 size={16} color="#A87F3D" /> Level 6 Medical Practitioners
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#A87F3D', fontSize: '0.925rem', fontWeight: '500' }}>
                <CheckCircle2 size={16} color="#A87F3D" /> FDA-Cleared Device Protocols
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#A87F3D', fontSize: '0.925rem', fontWeight: '500' }}>
                <CheckCircle2 size={16} color="#A87F3D" /> Cellular Exosome Protocols
              </div>
            </div>

            <a
              href="https://wa.me/447342052249?text=Hello%20Allure%20Passions%20UK,%20I%20would%20like%20to%20consult%20regarding%20a%20clinical%20treatment."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-bronze"
              style={{
                padding: '0.95rem 2rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <MessageSquare size={16} /> Direct Clinical Consultation
            </a>
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              border: '1px solid rgba(168, 127, 61, 0.3)',
              boxShadow: '0 12px 30px rgba(28, 27, 24, 0.08)'
            }}>
              <img
                src="/assets/images/hero_clinic_ambiance.png"
                alt="Allure Passions UK Knightsbridge Sanctuary"
                loading="lazy"
                decoding="async"
                style={{ width: '100%', height: '480px', objectFit: 'cover', display: 'block' }}
              />
            </div>

            <div style={{
              position: 'absolute',
              bottom: '-20px',
              right: '-10px',
              background: '#FFFFFF',
              border: '1px solid rgba(168, 127, 61, 0.35)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem 1.5rem',
              boxShadow: '0 12px 30px rgba(28, 27, 24, 0.12)',
              maxWidth: '280px'
            }}>
              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#A87F3D', fontWeight: '700' }}>
                Knightsbridge Sanctuary
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#1C1B18', marginTop: '0.2rem' }}>
                Discreet, bespoke consultations opposite Harrods
              </div>
            </div>
          </div>
        </div>

        {/* Credentials Grid */}
        <div style={{ borderTop: '1px solid rgba(28, 27, 24, 0.08)', paddingTop: '4rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
            <div className="badge-bronze" style={{ marginBottom: '0.75rem' }}>
              Strict Medical Standards
            </div>
            <h2 className="heading-lg" style={{ color: '#1C1B18' }}>
              Why Patients <span className="text-bronze-gradient">Trust Us</span>
            </h2>
            <p style={{ color: '#7A756C', fontSize: '1rem', marginTop: '0.5rem' }}>
              Our practice is built on uncompromised clinical excellence, regulatory transparency, and bespoke care.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {CREDENTIALS.map(cred => (
              <div
                key={cred.id}
                className="editorial-card"
                style={{
                  padding: '2rem',
                  background: '#FFFFFF',
                  border: '1px solid rgba(168, 127, 61, 0.25)'
                }}
              >
                <span className="badge-bronze" style={{ marginBottom: '1rem', fontSize: '0.7rem' }}>{cred.badge}</span>
                <h3 className="heading-md" style={{ color: '#1C1B18', fontSize: '1.3rem', marginBottom: '0.35rem' }}>{cred.title}</h3>
                <div style={{ fontSize: '0.85rem', color: '#A87F3D', fontWeight: '600', marginBottom: '1rem' }}>{cred.subtitle}</div>
                <p style={{ color: '#7A756C', fontSize: '0.9rem', lineHeight: '1.6', fontWeight: '300' }}>{cred.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
