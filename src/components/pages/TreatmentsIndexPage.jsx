import React, { useState } from 'react';
import { POPULAR_TREATMENTS } from '../../data/treatmentData';
import { ArrowLeft, ArrowRight, Phone, MessageCircle } from 'lucide-react';

const TREATMENT_AREAS_DIRECTORY = [
  {
    id: 'lips',
    name: 'Lips & Perioral',
    category: 'Face',
    image: '/assets/images/area_lips.jpg',
    leadTechnology: 'ADVATx® 589nm Laser & Clinical Hydration',
    indications: ['Natural lip volume & hydration', 'Perioral smoker lines', 'Lip border definition', 'Zero filler migration risk'],
    protocol: 'Non-injectable laser photothermal stimulation targeting dermal microvasculature to boost natural collagen plumping.',
    linkedTechId: 'advatx',
  },
  {
    id: 'cheeks',
    name: 'Cheeks & Mid-Face',
    category: 'Face',
    image: '/assets/images/area_cheeks.jpg',
    leadTechnology: 'Morpheus8™ RF & Sofwave™ SUPERB™',
    indications: ['Mid-face volume loss', 'Nasolabial fold smoothing', 'Malar cheek lifting', 'Collagen architecture restoration'],
    protocol: 'Subdermal fractional radiofrequency paired with parallel beam ultrasound to contract fibroseptal networks and stimulate neocollagenesis.',
    linkedTechId: 'morpheus8',
  },
  {
    id: 'eyes',
    name: 'Eyes & Upper Face',
    category: 'Face',
    image: '/assets/images/area_eyes.jpg',
    leadTechnology: 'Sofwave™ Brow Lift & PicoWay® Smooth',
    indications: ['Hooded eyelids & brow ptosis', 'Periorbital crow’s feet', 'Dark eye circles & melasma', 'Forehead textural laxity'],
    protocol: 'Precise 1.5mm ultrasound fractional heating lifts the brow arch by up to 5mm while picosecond photoacoustic energy clears pigment.',
    linkedTechId: 'sofwave',
  },
  {
    id: 'jawline',
    name: 'Jawline & Neck',
    category: 'Face',
    image: '/assets/images/area_jawline.jpg',
    leadTechnology: 'Morpheus8™ Deep Remodeling (Up to 8mm)',
    indications: ['Submental fullness (double chin)', 'Jowl laxity & blunt jawline', 'Platysma neck banding', 'Crepey neck skin'],
    protocol: 'Deep RF microneedling coagulation remodels adipose tissue while stimulating deep SMAS layer tightening.',
    linkedTechId: 'morpheus8',
  },
  {
    id: 'body',
    name: 'Body Contouring',
    category: 'Body',
    image: '/assets/images/area_body.jpg',
    leadTechnology: 'Emsculpt Neo® & Emerald™ Green Laser Lipo',
    indications: ['Abdomen & core sculpting', 'Gluteal lifting & firming', 'Subcutaneous fat reduction', 'Circumferential inch loss'],
    protocol: 'High-Intensity Focused Electromagnetic (HIFEM+) energy triggers 24,000 supramaximal contractions while synchronised RF induces fat apoptosis.',
    linkedTechId: 'emsculpt_neo',
  },
];

const SIGNATURE_PACKAGES = [
  {
    name: 'Allure Contour Synergy',
    category: 'Body Sculpting',
    sessions: '6 Sessions Emsculpt Neo®',
    price: '£2,400',
    description: 'Targeted course delivering maximum core hypertrophy and visceral/subcutaneous adipose clearance.',
    target: 'Abdomen, Glutes, Arms or Calves',
  },
  {
    name: 'Allure Contour Luxe',
    category: 'Dual Technology Body Protocol',
    sessions: '6 Emsculpt Neo® + 6 Emerald™ Cold Laser',
    price: '£3,600',
    description: 'Synergistic course pairing deep magnetic muscle contraction with cold laser cellular lipid emulsification and lymphatic detox.',
    target: 'Comprehensive Midsection & Flanks',
  },
  {
    name: 'Cosmelan® Depigmentation Protocol',
    category: 'Medical Pigment Clearance',
    sessions: 'In-Clinic Mask + 6-Month Active Homecare',
    price: '£850',
    description: 'World-leading intensive depigmentation protocol treating stubborn hormonal melasma, chloasma, and deep solar lentigines.',
    target: 'Full Face Pigment Eradication',
  },
];

export default function TreatmentsIndexPage({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('all');

  const whatsappUrl = `https://wa.me/447342052249?text=${encodeURIComponent(
    'Hello Allure Passions UK, I would like to consult regarding treatments at your Knightsbridge clinic.'
  )}`;

  return (
    <div style={{ padding: '3.5rem 0 6rem 0', background: '#FAF7F2', minHeight: '85vh', color: '#1C1B18' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 2rem' }}>
        
        {/* Back Link */}
        <button
          onClick={() => onNavigate('home')}
          className="btn-outline-bronze"
          style={{ marginBottom: '2.5rem', padding: '0.5rem 1.25rem', fontSize: '0.8rem' }}
        >
          <ArrowLeft size={14} /> Back to Homepage
        </button>

        {/* Page Header */}
        <div style={{ maxWidth: '900px', marginBottom: '3.5rem' }}>
          <div
            style={{
              fontSize: '0.8rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#A87F3D',
              fontWeight: '600',
              marginBottom: '0.75rem',
            }}
          >
            Clinical Portfolio • 189 Brompton Road, Knightsbridge
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.5rem, 4.5vw, 3.8rem)',
              color: '#1C1B18',
              fontWeight: '400',
              lineHeight: 1.15,
              marginBottom: '1rem',
            }}
          >
            Comprehensive Treatment Directory
          </h1>

          <p style={{ fontSize: '1.15rem', color: '#4A4740', fontWeight: '300', lineHeight: '1.75' }}>
            Explore every clinical service delivered at Allure Passions UK. Filter by anatomical treatment area, explore our flagship medical platforms, or discover curated multi-modality synergy programs.
          </p>
        </div>

        {/* Navigation Filter Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            flexWrap: 'wrap',
            marginBottom: '3.5rem',
            borderBottom: '1px solid rgba(168, 127, 61, 0.2)',
            paddingBottom: '1.25rem',
          }}
        >
          {[
            { id: 'all', label: 'All Services & Portfolio' },
            { id: 'areas', label: 'Explore By Treatment Area' },
            { id: 'technologies', label: 'Flagship Medical Technologies' },
            { id: 'packages', label: 'Signature Synergy Courses' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.6rem 1.6rem',
                borderRadius: 'var(--radius-full)',
                border: activeTab === tab.id ? '1px solid #A87F3D' : '1px solid rgba(28, 27, 24, 0.12)',
                background: activeTab === tab.id ? '#A87F3D' : '#FFFFFF',
                color: activeTab === tab.id ? '#FFFFFF' : '#1C1B18',
                fontSize: '0.85rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Section A: Treatment Areas from Homepage */}
        {(activeTab === 'all' || activeTab === 'areas') && (
          <div style={{ marginBottom: '5rem' }}>
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#A87F3D', fontWeight: '600' }}>
                Anatomical Protocols
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#1C1B18', fontWeight: '500' }}>
                Browse by Treatment Area
              </h2>
              <p style={{ color: '#7A756C', fontSize: '0.95rem', marginTop: '0.25rem' }}>
                Specific non-invasive clinical solutions tailored to each facial zone and body region.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                gap: '2rem',
              }}
            >
              {TREATMENT_AREAS_DIRECTORY.map((area) => (
                <div
                  key={area.id}
                  className="card-white-elevation"
                  style={{
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    background: '#FFFFFF',
                  }}
                >
                  <div>
                    {/* Area Image */}
                    <div style={{ height: '240px', width: '100%', position: 'relative', overflow: 'hidden', backgroundColor: '#EDE7DE' }}>
                      <img
                        src={area.image}
                        alt={area.name}
                        loading="lazy"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.5s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.04)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1.0)';
                        }}
                      />
                      <span
                        style={{
                          position: 'absolute',
                          top: '12px',
                          left: '12px',
                          background: 'rgba(20, 19, 17, 0.8)',
                          backdropFilter: 'blur(6px)',
                          color: '#FFFFFF',
                          fontSize: '0.68rem',
                          fontWeight: '600',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          padding: '0.25rem 0.65rem',
                          borderRadius: '2px',
                          border: '1px solid rgba(212, 175, 55, 0.3)',
                        }}
                      >
                        {area.category} Focus
                      </span>
                    </div>

                    <div style={{ padding: '1.75rem' }}>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#1C1B18', fontWeight: '600', marginBottom: '0.35rem' }}>
                        {area.name}
                      </h3>

                      <div style={{ fontSize: '0.8rem', color: '#A87F3D', fontWeight: '600', marginBottom: '1rem' }}>
                        Lead System: {area.leadTechnology}
                      </div>

                      <p style={{ fontSize: '0.875rem', color: '#4A4740', lineHeight: '1.6', marginBottom: '1.25rem' }}>
                        {area.protocol}
                      </p>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1.25rem' }}>
                        {area.indications.map((ind, idx) => (
                          <div key={idx} style={{ fontSize: '0.8rem', color: '#7A756C', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#A87F3D' }} />
                            <span>{ind}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      padding: '1.25rem 1.75rem',
                      borderTop: '1px solid rgba(28, 27, 24, 0.08)',
                      background: '#FAF7F2',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <button
                      onClick={() => onNavigate('treatment-detail', area.linkedTechId)}
                      className="btn-outline-bronze"
                      style={{ padding: '0.55rem 1.15rem', fontSize: '0.785rem' }}
                    >
                      View Protocol Details <ArrowRight size={13} />
                    </button>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#A87F3D',
                        fontSize: '0.785rem',
                        fontWeight: '600',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                      }}
                    >
                      <MessageCircle size={14} /> Consult
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section B: 6 Flagship Technologies */}
        {(activeTab === 'all' || activeTab === 'technologies') && (
          <div style={{ marginBottom: '5rem' }}>
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#A87F3D', fontWeight: '600' }}>
                Energy-Based Platforms
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#1C1B18', fontWeight: '500' }}>
                Flagship Medical Technologies
              </h2>
              <p style={{ color: '#7A756C', fontSize: '0.95rem', marginTop: '0.25rem' }}>
                Tier-one FDA-cleared aesthetic systems operated by certified Level 6 practitioners.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                gap: '2rem',
              }}
            >
              {POPULAR_TREATMENTS.map((tr) => (
                <div
                  key={tr.id}
                  className="card-white-elevation"
                  style={{
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    background: '#FFFFFF',
                  }}
                >
                  <div>
                    <div style={{ height: '230px', position: 'relative', overflow: 'hidden', backgroundColor: '#EAE5DC' }}>
                      <img
                        src={tr.image}
                        alt={tr.name}
                        loading="lazy"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.5s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.04)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1.0)';
                        }}
                      />
                      <span
                        style={{
                          position: 'absolute',
                          top: '1rem',
                          left: '1rem',
                          background: 'rgba(255, 255, 255, 0.95)',
                          border: '1px solid rgba(168, 127, 61, 0.3)',
                          color: '#A87F3D',
                          fontSize: '0.72rem',
                          fontWeight: '600',
                          padding: '0.3rem 0.75rem',
                          borderRadius: '20px',
                        }}
                      >
                        {tr.category}
                      </span>
                    </div>

                    <div style={{ padding: '1.75rem' }}>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.55rem', color: '#1C1B18', fontWeight: '600', marginBottom: '0.25rem' }}>
                        {tr.name}
                      </h3>
                      <div style={{ fontSize: '0.825rem', color: '#A87F3D', fontWeight: '600', marginBottom: '0.85rem' }}>
                        {tr.tagline}
                      </div>
                      <p style={{ color: '#4A4740', fontSize: '0.875rem', lineHeight: '1.65', marginBottom: '1.25rem' }}>
                        {tr.shortDesc}
                      </p>
                    </div>
                  </div>

                  <div
                    style={{
                      padding: '1.25rem 1.75rem',
                      borderTop: '1px solid rgba(28, 27, 24, 0.08)',
                      background: '#FAF7F2',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.72rem', color: '#7A756C', textTransform: 'uppercase' }}>Session From</div>
                      <div style={{ fontSize: '1rem', fontWeight: '700', color: '#1C1B18' }}>{tr.pricing.split('|')[0]}</div>
                    </div>

                    <button
                      onClick={() => onNavigate('treatment-detail', tr.id)}
                      className="btn-outline-bronze"
                      style={{ padding: '0.55rem 1.15rem', fontSize: '0.8rem' }}
                    >
                      Protocol Sheet <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section C: Curated Synergy Packages */}
        {(activeTab === 'all' || activeTab === 'packages') && (
          <div style={{ marginBottom: '5rem' }}>
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#A87F3D', fontWeight: '600' }}>
                Multi-Modality Protocols
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#1C1B18', fontWeight: '500' }}>
                Signature Packages & Synergy Courses
              </h2>
              <p style={{ color: '#7A756C', fontSize: '0.95rem', marginTop: '0.25rem' }}>
                Scientifically sequenced treatment courses combining multiple complementary technologies.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                gap: '2rem',
              }}
            >
              {SIGNATURE_PACKAGES.map((pkg, idx) => (
                <div
                  key={idx}
                  className="card-white-elevation"
                  style={{
                    background: '#FFFFFF',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid rgba(168, 127, 61, 0.28)',
                    padding: '2.2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <span style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A87F3D', fontWeight: '600' }}>
                        {pkg.category}
                      </span>
                      <span style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1C1B18', fontFamily: 'var(--font-serif)' }}>
                        {pkg.price}
                      </span>
                    </div>

                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.55rem', color: '#1C1B18', fontWeight: '600', marginBottom: '0.5rem' }}>
                      {pkg.name}
                    </h3>

                    <div style={{ fontSize: '0.85rem', color: '#D4AF37', fontWeight: '600', marginBottom: '0.75rem' }}>
                      {pkg.sessions}
                    </div>

                    <p style={{ fontSize: '0.875rem', color: '#4A4740', lineHeight: '1.65', marginBottom: '1.25rem' }}>
                      {pkg.description}
                    </p>

                    <div style={{ fontSize: '0.785rem', color: '#7A756C', borderTop: '1px solid rgba(28, 27, 24, 0.08)', paddingTop: '0.75rem' }}>
                      Focus: <strong>{pkg.target}</strong>
                    </div>
                  </div>

                  <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem' }}>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-bronze"
                      style={{
                        flex: 1,
                        padding: '0.75rem',
                        fontSize: '0.8rem',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.4rem',
                      }}
                    >
                      <MessageCircle size={14} /> WhatsApp Clinic
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Practice Communication Banner (Strictly Direct Channels) */}
        <div
          style={{
            background: '#141312',
            color: '#FFFFFF',
            border: '1px solid rgba(168, 127, 61, 0.35)',
            borderRadius: 'var(--radius-sm)',
            padding: '3rem 2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '2rem',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.3)',
          }}
        >
          <div>
            <div style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#D4AF37', fontWeight: '600', marginBottom: '0.4rem' }}>
              189 Brompton Road • Knightsbridge Practice
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#FFFFFF' }}>
              Require Direct Advice on Your Treatment Pathway?
            </h3>
            <p style={{ color: '#ECE8E1', fontSize: '0.95rem', marginTop: '0.4rem', fontWeight: '300', maxWidth: '600px' }}>
              Speak directly with our clinical practitioners via WhatsApp or direct telephone consultation.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-bronze"
              style={{
                padding: '0.9rem 1.8rem',
                fontSize: '0.825rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <MessageCircle size={16} />
              <span>WhatsApp Consultation</span>
            </a>

            <a
              href="tel:+447342052249"
              style={{
                padding: '0.9rem 1.8rem',
                fontSize: '0.825rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                borderRadius: 'var(--radius-sm)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
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
              <Phone size={15} />
              <span>Call +44 7342 052249</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
