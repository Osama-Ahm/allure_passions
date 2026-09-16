import React from 'react';
import { POPULAR_TREATMENTS, FULL_PRICELIST, CLINIC_INFO } from '../../data/treatmentData';
import { ArrowLeft, Clock, ShieldCheck, CheckCircle2, MessageSquare, Check, Phone } from 'lucide-react';

const TREATMENT_PRICING_MAP = {
  advatx: [
    {
      groupTitle: 'ADVATx® Laser — Vascular & Complexion Clarity',
      badge: 'FDA-Cleared 589nm / 1319nm Dual Laser',
      description: 'Clinically targeted protocols for vascular lesions, rosacea, redness, and non-injectable lip plumping at our Knightsbridge clinic.',
      items: [
        { name: 'Telangiectasias (Facial Veins & Capillaries)', single: '£150 – £250', course6: '£899', saving: 'Save up to £600 on 6 sessions', note: 'Targeted photocoagulation of visible broken vessels' },
        { name: 'Sun Spots & Solar Lentigines (Facial)', single: '£150 – £280', course6: '£899', saving: 'Save up to £780 on 6 sessions', note: 'Epidermal pigment breakdown with zero crusting' },
        { name: 'ADVATx Laser Lip Plumping & Perioral Rejuvenation', single: '£249', course6: '£1,299', saving: 'Save £195 on 6 sessions', note: 'Non-injectable thermal collagen stimulation' },
        { name: 'Skin Rejuvenation & Vascular Glow — Full Face', single: '£529', course6: '£1,290', saving: 'Save £1,884 on 6 sessions', note: 'Full dermal rejuvenation & redness eradication' },
        { name: 'Skin Rejuvenation — Full Face & Neck', single: '£689', course6: '£1,390', saving: 'Save £2,744 on 6 sessions', note: 'Comprehensive facial & cervical tone unifying' },
        { name: 'Skin Rejuvenation — Face, Neck & Décolleté', single: '£899', course6: '£1,590', saving: 'Save £3,804 on 6 sessions', note: 'Complete red-carpet décolleté protocol' },
        { name: 'Ageing Sun Spots — Hands (Bilateral)', single: '£299', course6: '£1,499', saving: 'Save £295 on 6 sessions', note: 'Targets dorsal hand photo-ageing and lentigines' },
      ],
    },
    {
      groupTitle: 'Clinical Synergies & Pre/Post Laser Enhancers',
      badge: 'Recommended Protocol Enhancers',
      description: 'Combine ADVATx with cellular peel or phototherapy for accelerated cellular turnover and optimal longevity.',
      items: [
        { name: 'BioRePeel 35% Biphasic Post-Laser Synergy', single: '£159', course6: '£999', saving: 'Save £155 on 6 sessions', note: 'Zero-frosting exfoliation for porcelain smoothness' },
        { name: 'LED Light Therapy Photo-Biomodulation (30 min)', single: '£40', course6: '£233', saving: 'Save £47 on 6 sessions', note: 'Cellular ATP stimulation to eliminate erythema' },
        { name: 'Advanced Multi-Spectral Digital Skin Analysis (30 min)', single: '£60', course6: 'Complimentary', saving: 'Included free with all Courses of 6', note: 'UV & cross-polarized subsurface skin diagnostic' },
      ],
    },
  ],
  picoway: [
    {
      groupTitle: 'PicoWay® Laser — Pigment & Skin Revitalisation',
      badge: 'Picosecond Photo-Acoustic Technology',
      description: 'Shatters pigment into microscopic dust without thermal damage to surrounding tissue.',
      items: [
        { name: 'Hyperpigmentation & Melasma — Full Face', single: '£329', course6: '£969', saving: 'Save £1,005 on 6 sessions', note: 'Targets hormonal melasma and deep dermal pigment' },
        { name: 'Hyperpigmentation — Small Localized Area', single: '£599', course6: '£899', saving: 'Multi-session clinical course saving', note: 'For isolated dark patches and solar spots' },
        { name: 'Hyperpigmentation — Medium Body Area', single: '£749', course6: '£1,299', saving: 'Save £3,195 on 6 sessions', note: 'Shoulders, décolletage, or upper back pigment' },
        { name: 'Acne Scarring & Skin Texture — Full Face', single: '£675', course6: '£999', saving: 'Save £3,051 on 6 sessions', note: 'PicoWay Resolve fractional diffractive array' },
        { name: 'Acne Scarring — Full Face & Neck', single: '£869', course6: '£1,999', saving: 'Save £3,215 on 6 sessions', note: 'Deep fractional collagen stimulation' },
      ],
    },
    {
      groupTitle: 'PicoWay® Laser Tattoo Removal',
      badge: 'Multi-Wavelength Picosecond Ink Shattering',
      description: 'Clears black, dark blue, red, and stubborn coloured inks in fewer total visits.',
      items: [
        { name: 'Small Tattoo (1–2 cm)', single: '£63', course6: '£119', course8: '£349', note: 'Ideal for small wrist, ankle, or finger tattoos' },
        { name: 'Small / Medium Tattoo (2–4 cm)', single: '£73', course6: '£249', course8: '£369', note: 'Forearm, collarbone, or shoulder designs' },
        { name: 'Medium Tattoo (4–12 cm)', single: '£99', course6: '£529', course8: '£639', note: 'Bespoke multi-pass ink shattering' },
        { name: 'Large Tattoo (12–17 cm)', single: 'Consultation', course6: '£759', course8: '£939', note: 'Sectional laser clearance for larger pieces' },
        { name: 'Extra Large Tattoo (17 cm+)', single: 'Consultation', course6: 'Consultation', note: 'Assessed on ink density and total surface area' },
      ],
    },
  ],
  morpheus8: [
    {
      groupTitle: 'Morpheus8™ Fractional RF — Facial Remodeling',
      badge: 'Subdermal Adipose Remodeling up to 4mm',
      description: 'Fractional radiofrequency microneedling stimulates profound collagen synthesis and structural contouring.',
      items: [
        { name: 'Morpheus8 — Eyes & Periorbital (Prime Tip)', single: '£349', sessions3: '£799', saving: 'Save £248 on 3 sessions', note: 'Tightens lax lower lids and crow’s feet' },
        { name: 'Morpheus8 — Full Face', single: '£439', sessions3: '£1,159', saving: 'Save £158 on 3 sessions', note: 'Lifting for cheeks, nasolabial lines, and forehead' },
        { name: 'Morpheus8 — Lower Face & Neck', single: '£429', sessions3: '£1,149', saving: 'Save £138 on 3 sessions', note: 'Mandibular contouring & submental contraction' },
        { name: 'Morpheus8 — Face & Neck', single: '£549', sessions3: '£1,555', saving: 'Save £92 on 3 sessions', note: 'Comprehensive upper, mid, and cervical treatment' },
        { name: 'Morpheus8 — Face, Neck & Décolleté', single: '£649', sessions3: '£1,899', saving: 'Save £148 on 3 sessions', note: 'Complete 360° upper body structural lift' },
      ],
    },
    {
      groupTitle: 'Morpheus8™ Body Contouring & Cellulite Tightening',
      badge: 'Deep 8mm Subdermal Body Tip',
      description: 'Thermal adipose coagulation and tissue contraction for stubborn body laxity.',
      items: [
        { name: 'Morpheus8 — Arms (Triceps / Flaccidity)', single: '£495', sessions3: '£1,339', saving: 'Save £146 on 3 sessions', note: 'Tightens loose batwing tissue' },
        { name: 'Morpheus8 — Back of Thighs (Cellulite & Laxity)', single: '£649', sessions3: '£1,769', saving: 'Save £178 on 3 sessions', note: 'Smooths dimpling and firms posterior thighs' },
        { name: 'Morpheus8 — Abdomen or Buttocks', single: '£765', sessions3: '£1,859', saving: 'Save £436 on 3 sessions', note: 'Post-pregnancy skin tightening or gluteal lifting' },
        { name: 'Exosome Regenerative Growth Factor Add-On', single: '£399', sessions3: '£999', note: 'Billions of pure active exosome vesicles' },
      ],
    },
  ],
  sofwave: [
    {
      groupTitle: 'Sofwave™ SUPERB™ — Synchronous Ultrasound Lift',
      badge: 'FDA-Cleared for Eyebrow, Neck & Submental Lift',
      description: 'Next-generation parallel beam ultrasound delivered at 1.5mm mid-dermis with SofCool™ contact cooling.',
      items: [
        { name: 'Sofwave — Full Face, Neck & Eyebrow Lift', oneOff: '£2,469', note: 'Comprehensive single-session full facial & cervical elevation' },
        { name: 'Sofwave — Lower Face, Submental & Neck', oneOff: '£1,789', note: 'Sharpens jawline and tightens loose platysmal neck tissue' },
        { name: 'Sofwave — Lower Face & Submental (Double Chin)', oneOff: '£1,569', note: 'Focuses strictly on jowls, chin contour, and jaw definition' },
        { name: 'Sofwave — Non-Surgical Eyebrow Lift', oneOff: '£795', note: 'Lifts hooded upper eyelids and opens the eye contour' },
        { name: 'Sofwave — Small Body Area (2 Palms)', oneOff: '£1,659', note: 'Above knees, lax inner arms, or periumbilical laxity' },
        { name: 'Sofwave — Large Body Area (4 Palms)', oneOff: '£3,650', note: 'Full abdomen or extensive thigh laxity contraction' },
      ],
    },
  ],
  emsculpt_neo: [
    {
      groupTitle: 'Emsculpt Neo® — HIFEM+ & Synchronised RF',
      badge: 'Dual Energy Muscle Hypertrophy + Fat Apoptosis',
      description: 'Simultaneous 25% muscle growth and 30% localized fat reduction in 30 minutes.',
      items: [
        { name: 'Emsculpt Neo® Single Session (30 min)', single: '£449', note: 'Single treatment for trial or maintenance' },
        { name: 'Allure Contour Synergy (6 Sessions Emsculpt Neo®)', course6: '£2,499', saving: 'Save £195 vs single sessions', note: 'Complete 6-week protocol for abdomen, glutes, or arms' },
        { name: 'Allure Contour Luxe (6 Neo + 6 Emerald™ Green Laser)', course6: '£4,489', saving: 'Save £600 on dual modality', note: 'Synergy of magnetic muscle building + cold laser fat lipo' },
        { name: 'Allure Contour Advanced (Neo + Emerald + Contouring Meso)', course6: '£4,499', saving: 'Maximum 360° body transformation', note: '6 Neo + 6 Emerald + 6 Lipolytic Mesotherapy boosters' },
      ],
    },
  ],
  emerald_laser: [
    {
      groupTitle: 'Emerald™ Green Laser Lipo — Cold Laser Slimming',
      badge: 'FDA-Cleared for Overall Circumference Loss up to 40 BMI',
      description: '10 532nm cold laser diodes emulsify intracellular fat without cell death or downtime.',
      items: [
        { name: 'Emerald™ Green Laser Single Session (45 min)', single: '£250', note: 'Non-thermal fat emulsification & cellular reset' },
        { name: 'Emerald™ Body Slimming Intensive (Course of 10 Sessions)', course10: '£2,000', saving: 'Save £500 on 10 sessions (£200/session)', note: 'Recommended 5-week protocol for measurable inch loss' },
        { name: 'Allure Contour Luxe (6 Emerald Laser + 6 Emsculpt Neo)', course6: '£4,489', saving: 'Dual action inch reduction & muscle tone', note: 'Ultimate non-surgical body sculpting package' },
      ],
    },
  ],
};

export default function TreatmentDetailPage({ treatmentId, onNavigate }) {
  const treatment = POPULAR_TREATMENTS.find(t => t.id === treatmentId) || POPULAR_TREATMENTS[0];

  // Look up dedicated pricing groups for this treatment
  const pricingGroups = TREATMENT_PRICING_MAP[treatment.id] || (
    FULL_PRICELIST.filter(cat =>
      cat.category.toLowerCase().includes(treatment.name.split(' ')[0].toLowerCase()) ||
      cat.category.toLowerCase().includes(treatment.category.split(' ')[0].toLowerCase())
    ).map(cat => ({
      groupTitle: cat.category,
      badge: 'Official Clinic Schedule',
      description: cat.description || 'Transparent pricing for doctor-led clinical protocols.',
      items: cat.items,
    }))
  );

  const whatsappBaseUrl = `https://wa.me/447342052249?text=${encodeURIComponent(
    `Hello Allure Passions UK, I would like to consult regarding ${treatment.name} at your Knightsbridge clinic.`
  )}`;

  return (
    <div style={{ padding: '3.5rem 0 6rem 0', background: '#FAF7F2', minHeight: '85vh', color: '#1C1B18' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 2rem' }}>
        
        {/* Back Link */}
        <button
          onClick={() => onNavigate('treatments')}
          className="btn-outline-bronze"
          style={{ marginBottom: '2.5rem', padding: '0.5rem 1.25rem', fontSize: '0.8rem' }}
        >
          <ArrowLeft size={14} /> Back to Treatments Portfolio
        </button>

        {/* Hero Section of Treatment */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '3.5rem',
          marginBottom: '4.5rem',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <span className="badge-bronze">
                {treatment.category} • Knightsbridge Clinic
              </span>
              <span style={{ fontSize: '0.72rem', color: '#A87F3D', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                JCCP & Level 6 Practice
              </span>
            </div>

            <h1 className="heading-xl" style={{ color: '#1C1B18', marginBottom: '0.5rem' }}>
              {treatment.name}
            </h1>
            <div style={{ fontSize: '1.15rem', color: '#A87F3D', fontWeight: '600', marginBottom: '1.5rem' }}>
              {treatment.tagline}
            </div>

            <p style={{ color: '#4A4740', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '2rem', fontWeight: '300' }}>
              {treatment.fullDesc}
            </p>

            {/* Quick Specs Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '1rem',
              background: '#FFFFFF',
              border: '1px solid rgba(168, 127, 61, 0.25)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              marginBottom: '2.25rem',
              boxShadow: '0 4px 15px rgba(28, 27, 24, 0.03)'
            }}>
              <div>
                <div style={{ fontSize: '0.725rem', color: '#7A756C', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Duration</div>
                <div style={{ fontWeight: '600', color: '#1C1B18', fontSize: '0.925rem', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Clock size={14} color="#A87F3D" /> {treatment.duration}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.725rem', color: '#7A756C', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Downtime</div>
                <div style={{ fontWeight: '600', color: '#1C1B18', fontSize: '0.925rem', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <ShieldCheck size={14} color="#A87F3D" /> {treatment.downtime}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.725rem', color: '#7A756C', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Starting From</div>
                <div style={{ fontWeight: '600', color: '#A87F3D', fontSize: '0.95rem', marginTop: '0.2rem' }}>
                  {treatment.pricing.split('|')[0]}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href={whatsappBaseUrl}
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
              <button onClick={() => onNavigate('pricing')} className="btn-outline-bronze" style={{ padding: '0.95rem 1.8rem' }}>
                Full Pricing Directory
              </button>
            </div>
          </div>

          <div style={{
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            border: '1px solid rgba(168, 127, 61, 0.3)',
            height: '440px',
            boxShadow: '0 12px 30px rgba(28, 27, 24, 0.08)',
            background: '#1C1B18',
            position: 'relative'
          }}>
            <img
              src={treatment.image}
              alt={treatment.name}
              loading="lazy"
              decoding="async"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              right: '16px',
              background: 'rgba(20, 19, 17, 0.85)',
              backdropFilter: 'blur(10px)',
              padding: '0.75rem 1.25rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: '#FFFFFF',
              fontSize: '0.75rem'
            }}>
              <span>189 Brompton Road, Knightsbridge</span>
              <span style={{ color: '#D4AF37', fontWeight: '600' }}>Tier-1 Medical Grade Platform</span>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div style={{ marginBottom: '4.5rem', borderTop: '1px solid rgba(28, 27, 24, 0.08)', paddingTop: '3.5rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <span className="badge-bronze" style={{ marginBottom: '0.5rem' }}>Clinical Efficacy</span>
            <h2 className="heading-lg" style={{ color: '#1C1B18' }}>
              Key Clinical <span className="text-bronze-gradient">Benefits & Science</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {treatment.keyBenefits.map((b, idx) => (
              <div
                key={idx}
                className="editorial-card"
                style={{
                  padding: '1.75rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  background: '#FFFFFF',
                  border: '1px solid rgba(168, 127, 61, 0.2)'
                }}
              >
                <CheckCircle2 size={20} color="#A87F3D" style={{ marginTop: '2px', flexShrink: 0 }} />
                <span style={{ fontSize: '0.95rem', color: '#4A4740', lineHeight: '1.6', fontWeight: '300' }}>{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* COMPREHENSIVE TREATMENT PRICING DIRECTORY */}
        <div style={{ marginBottom: '4.5rem' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A87F3D', fontWeight: '600', marginBottom: '0.5rem' }}>
              Transparent Clinical Investment
            </div>
            <h2 className="heading-lg" style={{ color: '#1C1B18' }}>
              {treatment.name} — <span className="text-bronze-gradient">Complete Pricing Schedule</span>
            </h2>
            <p style={{ color: '#5A554E', fontSize: '1rem', marginTop: '0.5rem', maxWidth: '750px', fontWeight: '300' }}>
              All treatment courses include an advanced multi-spectral clinical skin consultation, medical progress tracking, and dedicated aftercare guidance at 189 Brompton Road, Knightsbridge.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {pricingGroups.map((group, groupIdx) => (
              <div
                key={groupIdx}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid rgba(168, 127, 61, 0.25)',
                  borderRadius: 'var(--radius-md)',
                  padding: '2rem 2rem',
                  boxShadow: '0 6px 20px rgba(28, 27, 24, 0.04)',
                }}
              >
                {/* Group Header */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  borderBottom: '1px solid rgba(168, 127, 61, 0.2)',
                  paddingBottom: '1.25rem',
                  marginBottom: '1.5rem',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}>
                  <div>
                    <span style={{
                      background: 'rgba(168, 127, 61, 0.12)',
                      color: '#A87F3D',
                      fontSize: '0.72rem',
                      fontWeight: '700',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      padding: '0.25rem 0.75rem',
                      borderRadius: 'var(--radius-full)',
                      display: 'inline-block',
                      marginBottom: '0.5rem'
                    }}>
                      {group.badge}
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#1C1B18', fontWeight: '600' }}>
                      {group.groupTitle}
                    </h3>
                    {group.description && (
                      <p style={{ fontSize: '0.9rem', color: '#6A655C', marginTop: '0.25rem', fontWeight: '300' }}>
                        {group.description}
                      </p>
                    )}
                  </div>

                  <a
                    href={`https://wa.me/447342052249?text=${encodeURIComponent(
                      `Hello Allure Passions UK, I would like to book a consultation for ${group.groupTitle}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-bronze"
                    style={{
                      padding: '0.55rem 1.25rem',
                      fontSize: '0.8rem',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <MessageSquare size={14} /> Enquire via WhatsApp
                  </a>
                </div>

                {/* Pricing Rows Table / Cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {group.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      style={{
                        padding: '1.25rem 1.5rem',
                        background: itemIdx % 2 === 0 ? '#FAF7F2' : '#FFFFFF',
                        border: '1px solid rgba(168, 127, 61, 0.16)',
                        borderRadius: 'var(--radius-sm)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '1.25rem',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div style={{ flex: '1 1 300px' }}>
                        <div style={{ color: '#1C1B18', fontWeight: '600', fontSize: '1rem', marginBottom: '0.25rem' }}>
                          {item.name}
                        </div>
                        {item.note && (
                          <div style={{ fontSize: '0.825rem', color: '#7A756C', fontWeight: '300' }}>
                            {item.note}
                          </div>
                        )}
                        {item.saving && (
                          <div style={{ fontSize: '0.78rem', color: '#0F5132', fontWeight: '600', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <Check size={12} color="#0F5132" /> {item.saving}
                          </div>
                        )}
                      </div>

                      {/* Pricing Tier Values */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
                        {item.single && (
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '0.7rem', color: '#7A756C', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Single Session</div>
                            <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1C1B18' }}>{item.single}</div>
                          </div>
                        )}

                        {item.sessions3 && (
                          <div style={{ textAlign: 'right', background: 'rgba(168, 127, 61, 0.08)', padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(168, 127, 61, 0.25)' }}>
                            <div style={{ fontSize: '0.7rem', color: '#A87F3D', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>Course of 3</div>
                            <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#A87F3D' }}>{item.sessions3}</div>
                          </div>
                        )}

                        {item.course6 && (
                          <div style={{ textAlign: 'right', background: 'rgba(168, 127, 61, 0.08)', padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(168, 127, 61, 0.25)' }}>
                            <div style={{ fontSize: '0.7rem', color: '#A87F3D', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>Course of 6</div>
                            <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#A87F3D' }}>{item.course6}</div>
                          </div>
                        )}

                        {item.course8 && (
                          <div style={{ textAlign: 'right', background: 'rgba(168, 127, 61, 0.08)', padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(168, 127, 61, 0.25)' }}>
                            <div style={{ fontSize: '0.7rem', color: '#A87F3D', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>Course of 8</div>
                            <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#A87F3D' }}>{item.course8}</div>
                          </div>
                        )}

                        {item.course10 && (
                          <div style={{ textAlign: 'right', background: 'rgba(168, 127, 61, 0.08)', padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(168, 127, 61, 0.25)' }}>
                            <div style={{ fontSize: '0.7rem', color: '#A87F3D', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>Course of 10</div>
                            <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#A87F3D' }}>{item.course10}</div>
                          </div>
                        )}

                        {item.oneOff && (
                          <div style={{ textAlign: 'right', background: 'rgba(168, 127, 61, 0.08)', padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(168, 127, 61, 0.25)' }}>
                            <div style={{ fontSize: '0.7rem', color: '#A87F3D', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>Protocol Price</div>
                            <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#A87F3D' }}>{item.oneOff}</div>
                          </div>
                        )}

                        <a
                          href={`https://wa.me/447342052249?text=${encodeURIComponent(
                            `Hello Allure Passions UK, I would like to book ${item.name} (${treatment.name}) at your Knightsbridge clinic.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            background: '#1C1B18',
                            color: '#FFFFFF',
                            padding: '0.5rem 0.95rem',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.78rem',
                            fontWeight: '600',
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            transition: 'all 0.2s',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          Book Protocol
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Clinical Assurance & Consultation Card */}
          <div style={{
            marginTop: '2.5rem',
            background: '#141312',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            padding: '2.5rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            alignItems: 'center'
          }}>
            <div>
              <span style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#D4AF37', fontWeight: '600' }}>
                Knightsbridge Clinical Guarantee
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#FFFFFF', marginTop: '0.35rem', marginBottom: '0.75rem' }}>
                Bespoke Clinical Assessment
              </h3>
              <p style={{ color: '#D6D2CA', fontSize: '0.95rem', lineHeight: '1.7', fontWeight: '300' }}>
                Every course is customized to your tissue depth, Fitzpatrick phototype, and unique aesthetic goals. All consultations are performed under JCCP registered Level 6 clinical supervision at 189 Brompton Road.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#FAF7F2', fontSize: '0.9rem' }}>
                <Check size={18} color="#D4AF37" /> Complimentary multi-spectral imaging analysis with course
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#FAF7F2', fontSize: '0.9rem' }}>
                <Check size={18} color="#D4AF37" /> Zero downtime & sterile clinical suite environment
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#FAF7F2', fontSize: '0.9rem' }}>
                <Check size={18} color="#D4AF37" /> Direct practitioner WhatsApp access throughout your treatment
              </div>

              <div style={{ marginTop: '0.75rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a
                  href={`tel:${CLINIC_INFO.phone.replace(/\s+/g, '')}`}
                  style={{
                    color: '#D4AF37',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <Phone size={14} /> Direct Call: {CLINIC_INFO.phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Explore Other Flagship Treatments */}
        <div style={{ borderTop: '1px solid rgba(28, 27, 24, 0.1)', paddingTop: '3.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="badge-bronze" style={{ marginBottom: '0.4rem' }}>Flagship Directory</span>
              <h2 className="heading-md" style={{ color: '#1C1B18' }}>Explore Other Advanced Treatments</h2>
            </div>
            <button onClick={() => onNavigate('treatments')} className="btn-outline-bronze" style={{ padding: '0.5rem 1.25rem', fontSize: '0.8rem' }}>
              View All Treatments
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {POPULAR_TREATMENTS.filter(t => t.id !== treatment.id).slice(0, 4).map(other => (
              <div
                key={other.id}
                onClick={() => onNavigate('treatment-detail', other.id)}
                className="card-white-elevation"
                style={{
                  background: '#FFFFFF',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid rgba(168, 127, 61, 0.22)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
              >
                <div style={{ height: '160px', overflow: 'hidden' }}>
                  <img
                    src={other.image}
                    alt={other.name}
                    loading="lazy"
                    decoding="async"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <span style={{ fontSize: '0.7rem', color: '#A87F3D', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '600' }}>
                    {other.category}
                  </span>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#1C1B18', margin: '0.35rem 0' }}>
                    {other.name}
                  </h4>
                  <div style={{ fontSize: '0.85rem', color: '#A87F3D', fontWeight: '600' }}>
                    {other.pricing.split('|')[0]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
