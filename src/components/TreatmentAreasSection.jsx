import React, { useState } from 'react';
import { ArrowRight, Sparkles, MessageCircle } from 'lucide-react';

const TREATMENT_AREAS = [
  {
    id: 'lips',
    name: 'Lips & Perioral',
    category: 'Face',
    image: '/assets/images/area_lips.jpg',
    imagePosition: 'center',
    headline: 'Natural Volume & Perioral Smoothing',
    treatments: 'ADVATx® Laser Lip Plump • Dermal Hydration',
    description: 'Subtle perioral definition, fine line softening, and non-injectable laser lip plumping without migration.',
    treatmentId: 'advatx',
  },
  {
    id: 'cheeks',
    name: 'Cheeks & Mid-Face',
    category: 'Face',
    image: '/assets/images/area_cheeks.jpg',
    imagePosition: 'center',
    headline: 'Malar Lifting & Structural Support',
    treatments: 'Sofwave™ Ultrasound • Morpheus8™ RF',
    description: 'Restores natural mid-face architecture, tightens nasolabial laxity, and stimulates deep collagen synthesis.',
    treatmentId: 'morpheus8',
  },
  {
    id: 'eyes',
    name: 'Eyes & Upper Face',
    category: 'Face',
    image: '/assets/images/area_eyes.jpg',
    imagePosition: 'center',
    headline: 'Non-Surgical Brow & Eye Rejuvenation',
    treatments: 'Sofwave™ Brow Lift • PicoWay® Smooth',
    description: 'Lifts hooded brows, softens crow’s feet, and clears dark periorbital hyperpigmentation safely.',
    treatmentId: 'sofwave',
  },
  {
    id: 'jawline',
    name: 'Jawline & Neck',
    category: 'Face',
    image: '/assets/images/area_jawline.jpg',
    imagePosition: 'center',
    headline: 'Subdermal Definition & Platysma Tightening',
    treatments: 'Morpheus8™ Deep Remodeling • Sofwave™',
    description: 'Sculpts the lower third, contracts loose submental tissue, and sharpens mandibular angle definition.',
    treatmentId: 'morpheus8',
  },
  {
    id: 'body',
    name: 'Body Contouring',
    category: 'Body',
    image: '/assets/images/area_body.jpg',
    imagePosition: 'center',
    headline: 'Dual Fat Elimination & Core Strengthening',
    treatments: 'Emsculpt Neo® • Emerald™ Laser Lipo',
    description: 'Non-invasive HIFEM magnetic muscle toning combined with radiofrequency fat apoptosis and cold laser detox.',
    treatmentId: 'emsculpt_neo',
  },
];

const CLINICAL_CONCERNS = [
  {
    id: 'hyperpigmentation',
    name: 'Hyperpigmentation & Melasma',
    category: 'Pigmentation & Tone',
    image: '/assets/images/concern_hyperpigmentation.jpg',
    headline: 'Picosecond Photo-Acoustic Pigment Shattering',
    leadPlatform: 'PicoWay® Laser & Cosmelan® Depigmentation',
    description: 'Shatters deep hormonal melasma, post-acne dark spots, and solar lentigines into microscopic dust without heat damage.',
    targetId: 'picoway',
    pricing: 'From £329',
  },
  {
    id: 'rosacea_vascular',
    name: 'Rosacea & Facial Veins',
    category: 'Vascular & Redness',
    image: '/assets/images/concern_rosacea.jpg',
    headline: 'Dual 589nm / 1319nm Vascular Photocoagulation',
    leadPlatform: 'ADVATx® Solid-State Vascular Laser',
    description: 'Eliminates broken capillaries, chronic flushing, and red inflammatory acne lesions with zero crusting or social downtime.',
    targetId: 'advatx',
    pricing: 'From £150',
  },
  {
    id: 'skin_laxity',
    name: 'Skin Laxity & Jowl Sagging',
    category: 'Skin Tightening',
    image: '/assets/images/concern_skin_laxity.jpg',
    headline: 'Ultrasound SMAS Elevation & RF Collagen Contracture',
    leadPlatform: 'Sofwave™ SUPERB™ & Morpheus8™ RF',
    description: 'Contracts sagging cheek tissues, tightens submental double chins, and lifts the mandibular line non-surgically.',
    targetId: 'sofwave',
    pricing: 'From £795',
  },
  {
    id: 'acne_scarring',
    name: 'Acne Scarring & Texture',
    category: 'Acne & Texture',
    image: '/assets/images/concern_acne_scarring.jpg',
    headline: 'Subdermal Fractional Coagulation & Remodeling',
    leadPlatform: 'Morpheus8™ Fractional RF Microneedling',
    description: 'Restructures fibrotic scar tissue, smooths rolling and boxcar scars, and refines enlarged pores up to 4mm deep.',
    targetId: 'morpheus8',
    pricing: 'From £349',
  },
  {
    id: 'stubborn_fat',
    name: 'Stubborn Fat & Muscle Tone',
    category: 'Body Sculpting',
    image: '/assets/images/concern_stubborn_fat.jpg',
    headline: 'HIFEM+ Hypertrophy & Synchronous RF Apoptosis',
    leadPlatform: 'Emsculpt Neo® & Emerald™ Green Laser Lipo',
    description: 'Builds 25% more muscle while permanently eliminating 30% localized subcutaneous fat in 30-minute clinical sessions.',
    targetId: 'emsculpt_neo',
    pricing: 'From £449',
  },
  {
    id: 'tattoo_removal',
    name: 'Tattoo Ink Removal',
    category: 'Pigmentation & Tone',
    image: '/assets/images/concern_tattoo_removal.jpg',
    headline: 'Multi-Wavelength Picosecond Ink Clearance',
    leadPlatform: 'PicoWay® Laser (1064nm, 532nm, 730nm)',
    description: 'Clears black, red, green, and blue tattoo inks safely across all skin phototypes in fewer treatment appointments.',
    targetId: 'picoway',
    pricing: 'From £63',
  },
  {
    id: 'hooded_brows',
    name: 'Hooded Brows & Crow’s Feet',
    category: 'Skin Tightening',
    image: '/assets/images/concern_hooded_brows.jpg',
    headline: '1.5mm Acoustic Parallel Beam Brow Lifting',
    leadPlatform: 'Sofwave™ SUPERB™ Ultrasound',
    description: 'FDA-cleared to elevate hooded brow arches by up to 5mm and smooth delicate periorbital fine lines with SofCool™ protection.',
    targetId: 'sofwave',
    pricing: 'From £795',
  },
  {
    id: 'lip_plumping',
    name: 'Perioral Lines & Thin Lips',
    category: 'Vascular & Redness',
    image: '/assets/images/concern_lip_plumping.jpg',
    headline: 'Non-Injectable Thermal Collagen Stimulation',
    leadPlatform: 'ADVATx® Laser Lip Plumping',
    description: 'Stimulates autologous vermilion border collagen and hydrates dermal layers naturally without filler migration.',
    targetId: 'advatx',
    pricing: 'From £249',
  },
];

const AREA_CATEGORIES = ['All', 'Face', 'Body', 'Skin', 'Laser'];
const CONCERN_CATEGORIES = ['All', 'Pigmentation & Tone', 'Vascular & Redness', 'Skin Tightening', 'Acne & Texture', 'Body Sculpting'];

export default function TreatmentAreasSection({ onNavigate }) {
  const [browseMode, setBrowseMode] = useState('area'); // 'area' | 'concern'
  const [activeAreaCat, setActiveAreaCat] = useState('All');
  const [activeConcernCat, setActiveConcernCat] = useState('All');

  const filteredAreas = activeAreaCat === 'All'
    ? TREATMENT_AREAS
    : TREATMENT_AREAS.filter(area => area.category === activeAreaCat || (activeAreaCat === 'Laser' && area.treatments.includes('Laser')));

  const filteredConcerns = activeConcernCat === 'All'
    ? CLINICAL_CONCERNS
    : CLINICAL_CONCERNS.filter(c => c.category === activeConcernCat);

  return (
    <section
      style={{
        backgroundColor: '#FAF7F2',
        padding: '6.5rem 0',
        borderBottom: '1px solid rgba(28, 27, 24, 0.08)',
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 2rem' }}>
        
        {/* Section Header with Dual Toggle */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
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
            Tailored Clinical Pathways
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
              color: '#1C1B18',
              fontWeight: '400',
              lineHeight: 1.15,
              marginBottom: '1rem',
            }}
          >
            {browseMode === 'area' ? 'Explore By Treatment Area' : 'Explore By Aesthetic Concern'}
          </h2>

          <p
            style={{
              color: '#4A4740',
              fontSize: '1.05rem',
              maxWidth: '640px',
              margin: '0 auto 2rem auto',
              fontWeight: '300',
            }}
          >
            {browseMode === 'area'
              ? 'Targeted clinical protocols designed around your individual facial anatomy and aesthetic goals.'
              : 'Identify your specific aesthetic indication and discover our physician-calibrated medical protocols.'}
          </p>

          {/* Master Browsing Segment Toggle (Figma Exact) */}
          <div
            style={{
              display: 'inline-flex',
              background: '#FFFFFF',
              padding: '0.35rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid rgba(168, 127, 61, 0.3)',
              boxShadow: '0 4px 15px rgba(28, 27, 24, 0.05)',
              marginBottom: '2.25rem',
            }}
          >
            <button
              onClick={() => setBrowseMode('area')}
              style={{
                padding: '0.6rem 1.6rem',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                background: browseMode === 'area' ? '#A87F3D' : 'transparent',
                color: browseMode === 'area' ? '#FFFFFF' : '#1C1B18',
                fontWeight: '600',
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            >
              Browse By Treatment Area
            </button>
            <button
              onClick={() => setBrowseMode('concern')}
              style={{
                padding: '0.6rem 1.6rem',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                background: browseMode === 'concern' ? '#A87F3D' : 'transparent',
                color: browseMode === 'concern' ? '#FFFFFF' : '#1C1B18',
                fontWeight: '600',
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            >
              Browse By Concern
            </button>
          </div>

          {/* Sub-Category Filter Pills */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.65rem',
              flexWrap: 'wrap',
            }}
          >
            {browseMode === 'area' ? (
              AREA_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveAreaCat(cat)}
                  style={{
                    padding: '0.45rem 1.35rem',
                    borderRadius: 'var(--radius-full)',
                    border: activeAreaCat === cat ? '1px solid #A87F3D' : '1px solid rgba(28, 27, 24, 0.14)',
                    background: activeAreaCat === cat ? '#A87F3D' : '#FFFFFF',
                    color: activeAreaCat === cat ? '#FFFFFF' : '#4A4740',
                    fontSize: '0.825rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {cat}
                </button>
              ))
            ) : (
              CONCERN_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveConcernCat(cat)}
                  style={{
                    padding: '0.45rem 1.35rem',
                    borderRadius: 'var(--radius-full)',
                    border: activeConcernCat === cat ? '1px solid #A87F3D' : '1px solid rgba(28, 27, 24, 0.14)',
                    background: activeConcernCat === cat ? '#A87F3D' : '#FFFFFF',
                    color: activeConcernCat === cat ? '#FFFFFF' : '#4A4740',
                    fontSize: '0.825rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {cat}
                </button>
              ))
            )}
          </div>
        </div>

        {/* CONTENT VIEW 1: BROWSE BY TREATMENT AREA */}
        {browseMode === 'area' && (
          <div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
                gap: '1.5rem',
                marginBottom: '3.5rem',
              }}
            >
              {filteredAreas.map((area) => (
                <div
                  key={area.id}
                  onClick={() => onNavigate('treatment-detail', area.treatmentId || 'morpheus8')}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    border: '1px solid rgba(168, 127, 61, 0.22)',
                    boxShadow: '0 4px 15px rgba(28, 27, 24, 0.04)',
                    transition: 'transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = '0 16px 36px rgba(168, 127, 61, 0.16)';
                    e.currentTarget.style.borderColor = 'rgba(168, 127, 61, 0.45)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(28, 27, 24, 0.04)';
                    e.currentTarget.style.borderColor = 'rgba(168, 127, 61, 0.22)';
                  }}
                >
                  <div>
                    {/* Area Image Container */}
                    <div
                      style={{
                        position: 'relative',
                        height: '240px',
                        overflow: 'hidden',
                        background: '#EAE6DF',
                      }}
                    >
                      <img
                        src={area.image}
                        alt={area.name}
                        loading="lazy"
                        decoding="async"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: area.imagePosition || 'center',
                          transition: 'transform 0.5s ease',
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '12px',
                          left: '12px',
                          background: 'rgba(20, 19, 17, 0.75)',
                          backdropFilter: 'blur(8px)',
                          color: '#FAF7F2',
                          fontSize: '0.65rem',
                          fontWeight: '600',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          padding: '0.25rem 0.65rem',
                          borderRadius: 'var(--radius-full)',
                          border: '1px solid rgba(212, 175, 55, 0.3)',
                        }}
                      >
                        {area.category}
                      </div>
                    </div>

                    {/* Area Card Content */}
                    <div style={{ padding: '1.5rem 1.5rem 1rem 1.5rem' }}>
                      <h3
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '1.4rem',
                          color: '#1C1B18',
                          fontWeight: '600',
                          marginBottom: '0.4rem',
                          lineHeight: 1.25,
                        }}
                      >
                        {area.name}
                      </h3>

                      <div
                        style={{
                          fontSize: '0.78rem',
                          color: '#A87F3D',
                          fontWeight: '600',
                          letterSpacing: '0.04em',
                          marginBottom: '0.75rem',
                          lineHeight: 1.4,
                        }}
                      >
                        {area.treatments}
                      </div>

                      <p
                        style={{
                          fontSize: '0.85rem',
                          color: '#5A554E',
                          lineHeight: '1.6',
                          fontWeight: '300',
                        }}
                      >
                        {area.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer Link */}
                  <div
                    style={{
                      padding: '0.9rem 1.5rem 1.25rem 1.5rem',
                      borderTop: '1px solid rgba(28, 27, 24, 0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      color: '#A87F3D',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                    }}
                  >
                    <span>View Clinical Protocol</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Button */}
            <div style={{ textAlign: 'center' }}>
              <button
                onClick={() => onNavigate('treatments')}
                className="btn-outline-bronze"
                style={{ padding: '0.85rem 2.2rem', fontSize: '0.85rem' }}
              >
                Explore All Treatments
              </button>
            </div>
          </div>
        )}

        {/* CONTENT VIEW 2: BROWSE BY AESTHETIC CONCERN */}
        {browseMode === 'concern' && (
          <div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                gap: '1.75rem',
                marginBottom: '3.5rem',
              }}
            >
              {filteredConcerns.map((concern) => (
                <div
                  key={concern.id}
                  onClick={() => onNavigate('treatment-detail', concern.targetId)}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    border: '1px solid rgba(168, 127, 61, 0.22)',
                    boxShadow: '0 4px 15px rgba(28, 27, 24, 0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.35s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.borderColor = 'rgba(168, 127, 61, 0.5)';
                    e.currentTarget.style.boxShadow = '0 16px 36px rgba(168, 127, 61, 0.15)';
                    const img = e.currentTarget.querySelector('.concern-card-img');
                    if (img) img.style.transform = 'scale(1.06)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(168, 127, 61, 0.22)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(28, 27, 24, 0.04)';
                    const img = e.currentTarget.querySelector('.concern-card-img');
                    if (img) img.style.transform = 'scale(1)';
                  }}
                >
                  <div>
                    {/* Concern Image Container */}
                    <div
                      style={{
                        position: 'relative',
                        height: '210px',
                        overflow: 'hidden',
                        background: '#141312',
                      }}
                    >
                      <img
                        src={concern.image}
                        alt={concern.name}
                        className="concern-card-img"
                        loading="lazy"
                        decoding="async"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center',
                          transition: 'transform 0.5s ease',
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(20,19,18,0.7) 100%)',
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '12px',
                          left: '12px',
                          background: 'rgba(20, 19, 18, 0.85)',
                          backdropFilter: 'blur(8px)',
                          color: '#D4AF37',
                          fontSize: '0.68rem',
                          fontWeight: '600',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          padding: '0.25rem 0.65rem',
                          borderRadius: 'var(--radius-full)',
                          border: '1px solid rgba(212, 175, 55, 0.35)',
                        }}
                      >
                        {concern.category}
                      </div>
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '12px',
                          right: '12px',
                          background: '#FFFFFF',
                          color: '#1C1B18',
                          fontSize: '0.78rem',
                          fontWeight: '700',
                          padding: '0.25rem 0.65rem',
                          borderRadius: 'var(--radius-sm)',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                        }}
                      >
                        {concern.pricing}
                      </div>
                    </div>

                    {/* Concern Body Content */}
                    <div style={{ padding: '1.75rem 1.5rem 1rem 1.5rem' }}>
                      <h3
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '1.35rem',
                          color: '#1C1B18',
                          fontWeight: '600',
                          marginBottom: '0.4rem',
                          lineHeight: 1.25,
                        }}
                      >
                        {concern.name}
                      </h3>

                      <div
                        style={{
                          fontSize: '0.78rem',
                          color: '#A87F3D',
                          fontWeight: '600',
                          marginBottom: '0.75rem',
                        }}
                      >
                        {concern.leadPlatform}
                      </div>

                      <p
                        style={{
                          fontSize: '0.85rem',
                          color: '#5A554E',
                          lineHeight: '1.65',
                          fontWeight: '300',
                        }}
                      >
                        {concern.description}
                      </p>
                    </div>
                  </div>

                  <div
                    style={{
                      borderTop: '1px solid rgba(28, 27, 24, 0.08)',
                      padding: '0.85rem 1.5rem 1.25rem 1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      color: '#A87F3D',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                    }}
                  >
                    <span>Explore Protocol & Pricing</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Button */}
            <div style={{ textAlign: 'center' }}>
              <button
                onClick={() => onNavigate('treatments')}
                className="btn-outline-bronze"
                style={{ padding: '0.85rem 2.2rem', fontSize: '0.85rem' }}
              >
                View Full Treatment Directory
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
