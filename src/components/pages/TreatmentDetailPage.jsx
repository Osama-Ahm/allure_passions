import React from 'react';
import { POPULAR_TREATMENTS, FULL_PRICELIST, CLINIC_INFO } from '../../data/treatmentData';
import { ArrowLeft, Clock, ShieldCheck, CheckCircle2, MessageSquare, Check, Phone } from 'lucide-react';
import EmsculptNeoPage from './EmsculptNeoPage';
import './TreatmentDetailPage.css';

const TREATMENT_PRICING_MAP = {
  advatx: [
    {
      groupTitle: 'ADVATx® Laser — Vascular & Complexion Clarity',
      badge: 'FDA-Cleared 589nm / 1319nm Dual Laser',
      description: 'Clinically targeted protocols for vascular lesions, rosacea, redness, and non-injectable lip plumping at our Fitzrovia clinic.',
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
        { name: 'BioRePeel 35% Biphasic Post-Laser Synergy', single: '£159', course6: '£999', note: 'Zero-frosting exfoliation for porcelain smoothness' },
        { name: 'LED Light Therapy Photo-Biomodulation (30 min)', single: '£40', course6: '£233', note: 'Cellular ATP stimulation to eliminate erythema' },
        { name: 'Clinical Skin Analysis (30 min)', single: '£60', note: 'UV & cross-polarised subsurface skin diagnostic' },
      ],
    },
  ],
  picoway: [
    {
      groupTitle: 'PicoWay® Laser — Pigment & Skin Revitalisation',
      badge: 'Picosecond Photo-Acoustic Technology',
      description: 'Shatters pigment into microscopic dust without thermal damage to surrounding tissue.',
      items: [
        { name: 'Acne Scarring — Full Face', single: '£869', course6: '£1,999', note: 'PicoWay Resolve fractional diffractive array' },
        { name: 'Acne Scarring — Small Area', single: '£329', course6: '£969', note: 'Targeted fractional laser remodeling' },
        { name: 'Hyperpigmentation — Full Face & Neck', single: '£675', course6: '£999', note: 'Targets hormonal melasma and deep dermal pigment' },
        { name: 'Hyperpigmentation — Small Body Area', single: '£399', course6: '£599', note: 'For isolated dark patches and solar spots' },
        { name: 'Hyperpigmentation — Medium Body Area', single: '£599', course6: '£899', note: 'Shoulders, décolletage, or upper back pigment' },
        { name: 'Hyperpigmentation — Large Body Area', single: '£749', course6: '£1,299', note: 'Extensive body area pigment clearance' },
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
  tattoo_removal: [
    {
      groupTitle: 'PicoWay® Laser Tattoo Removal (By Size)',
      badge: 'Picosecond Photo-Acoustic Clearance',
      description: 'Pico laser removes tattoos faster, safer, and with less pain.',
      items: [
        { name: '1–2 cm (Small Tattoo)', single: '£63', course6: '£119', course8: '£349', note: 'Ideal for small wrist, ankle, or finger tattoos' },
        { name: '2–4 cm (Small Tattoo)', single: '£73', course6: '£249', course8: '£369', note: 'Forearm, collarbone, or shoulder designs' },
        { name: '4–12 cm (Medium Tattoo)', single: '£99', course6: '£529', course8: '£639', note: 'Bespoke multi-pass ink shattering' },
        { name: 'Large Tattoo (12–17 cm)', single: 'Consultation', course6: '£759', course8: '£939', note: 'Sectional laser clearance for larger pieces' },
        { name: 'Extra Large Tattoo (17 cm+)', single: 'Consultation', course6: 'Consultation', note: 'Requires individual clinical consultation' },
      ],
    },
  ],
  morpheus8: [
    {
      groupTitle: 'Morpheus8™ Fractional RF — Facial Remodeling',
      badge: 'Subdermal Adipose Remodeling up to 4mm',
      description: 'Fractional radiofrequency microneedling stimulates profound collagen synthesis and structural contouring.',
      items: [
        { name: 'Morpheus8 — Eyes (3/6 Sessions)', single: '£349', sessions3: '£799', saving: 'Save £248 on 3 sessions', note: 'Tightens lax lower lids and crow’s feet' },
        { name: 'Morpheus8 — Full Face (3/6 Sessions)', single: '£439', sessions3: '£1,159', saving: 'Save £158 on 3 sessions', note: 'Lifting for cheeks, nasolabial lines, and forehead' },
        { name: 'Morpheus8 — Lower Face & Neck (3/6 Sessions)', single: '£429', sessions3: '£1,149', saving: 'Save £138 on 3 sessions', note: 'Mandibular contouring & submental contraction' },
        { name: 'Morpheus8 — Face & Neck (3/6 Sessions)', single: '£549', sessions3: '£1,555', saving: 'Save £92 on 3 sessions', note: 'Comprehensive upper, mid, and cervical treatment' },
        { name: 'Morpheus8 — Face, Neck & Décolleté (3/6 Sessions)', single: '£649', sessions3: '£1,769', saving: 'Save £178 on 3 sessions', note: 'Complete 360° upper body structural lift' },
      ],
    },
    {
      groupTitle: 'Morpheus8™ Body Contouring & Tightening',
      badge: 'Deep 8mm Subdermal Body Tip',
      description: 'Thermal adipose coagulation and tissue contraction for stubborn body laxity.',
      items: [
        { name: 'Morpheus8 — Arms (3/6 Sessions)', single: '£495', sessions3: '£1,339', saving: 'Save £146 on 3 sessions', note: 'Tightens loose batwing tissue' },
        { name: 'Morpheus8 — Back of Thighs (3/6 Sessions)', single: '£429', sessions3: '£1,899', note: 'Smooths dimpling and firms posterior thighs' },
        { name: 'Morpheus8 — Abdomen (3/6 Sessions)', single: '£649', sessions3: '£1,699', note: 'Post-pregnancy skin tightening & abdominal firming' },
        { name: 'Morpheus8 — Buttocks (3/6 Sessions)', single: '£765', sessions3: '£1,859', note: 'Gluteal lifting and textural smoothing' },
      ],
    },
  ],
  sofwave: [
    {
      groupTitle: 'Sofwave™ SUPERB™ — Synchronous Ultrasound Lift',
      badge: 'FDA-Cleared for Eyebrow, Neck & Submental Lift',
      description: 'Next-generation parallel beam ultrasound delivered at 1.5mm mid-dermis with SofCool™ contact cooling.',
      items: [
        { name: 'Sofwave — Full Face, Neck & Brow Lift', oneOff: '£2,469', single: '£2,469', note: 'Comprehensive single-session full facial & cervical elevation' },
        { name: 'Sofwave — Lower Face, Submental & Neck', oneOff: '£1,789', single: '£1,789', note: 'Sharpens jawline and tightens loose platysmal neck tissue' },
        { name: 'Sofwave — Lower Face & Submental (Double Chin)', oneOff: '£1,569', single: '£1,569', note: 'Focuses strictly on jowls, chin contour, and jaw definition' },
        { name: 'Sofwave — Non-Surgical Eyebrow Lift', oneOff: '£795', single: '£795', note: 'Lifts hooded upper eyelids and opens the eye contour' },
        { name: 'Sofwave — Small Body Area (2 Palms)', oneOff: '£1,659', single: '£1,659', note: 'Above knees, lax inner arms, or periumbilical laxity' },
        { name: 'Sofwave — Large Body Area (4 Palms)', oneOff: '£3,650', single: '£3,650', note: 'Full abdomen or extensive thigh laxity contraction' },
      ],
    },
  ],
  cosmelan: [
    {
      groupTitle: 'Cosmelan® Depigmentation Protocol',
      badge: 'World #1 Medical Melasma & Pigmentation Treatment',
      description: 'Intensive 2-phase depigmentation mask application in clinic plus comprehensive active homecare regimen.',
      items: [
        { name: 'Cosmelan Depigmentation Peel (Full Face with Prep)', single: '£2,099', note: 'Includes in-clinic skin prep, Phase 1 mask & complete active homecare system' },
      ],
    },
  ],
  hydrafacial: [
    {
      groupTitle: 'Immersive Hydration Skin Renewal — Facials',
      badge: 'HydraFacial Vortex-Fusion® & OxyGeneo®',
      description: 'Hydrafacials combine cleansing, exfoliation, extraction, and hydration for immediate red-carpet radiance.',
      items: [
        { name: 'HydraFacial Signature (30 min)', single: '£195', course6: '£859', saving: 'Save £311 on 6 sessions', note: 'Deep cleanse, exfoliate, extract & hydrate' },
        { name: 'HydraFacial Platinum (60 min)', single: '£265', course6: '£1,259', saving: 'Save £331 on 6 sessions', note: 'Includes lymphatic drainage, custom booster & LED' },
        { name: 'Red Carpet Facial Experience (115 min)', single: '£499', course6: '£2,759', saving: 'Save £235 on 6 sessions', note: 'The ultimate luxury clinical prep with multi-modality infusion' },
        { name: 'OxyGeneo Facial (90 min)', single: '£250', course6: '£999', saving: 'Save £501 on 6 sessions', note: '3-in-1 oxygenation, exfoliation & serum infusion' },
      ],
    },
    {
      groupTitle: 'Add-Ons — LED Light Therapy & Skin Analysis',
      badge: 'Add to Any Facial',
      description: 'Pair a facial with LED light therapy, or start with a skin analysis to plan your treatments.',
      items: [
        { name: 'LED Light Therapy (30 min)', single: '£40', course6: '£233', note: 'Photobiomodulation cellular ATP stimulation' },
        { name: 'LED Light Therapy (60 min)', single: '£60', course6: '£340', note: 'Deep cellular rejuvenation and collagen booster' },
        { name: 'Clinical Skin Analysis (30 min)', single: '£60', note: 'Digital multi-spectral skin diagnostic' },
        { name: 'Clinical Skin Analysis (60 min)', single: '£100', note: 'In-depth multi-spectral diagnostic & skin consultation' },
      ],
    },
  ],
  biorepeel: [
    {
      groupTitle: 'BioRePeelCl₃® 35% Biphasic Peel Rejuvenation',
      badge: 'Patented 2-Phase TCA Peel Without Peeling',
      description: 'Peels designed for pigmentation, acne, and rapid epidermal skin renewal with zero social downtime.',
      items: [
        { name: 'BioRePeel 35% Peel (Face)', single: '£159', course6: '£999', note: 'Biphasic TCA peel with zero frosting or downtime' },
        { name: 'BioRePeel – Hands', single: '£149', course6: '£749', note: 'Rejuvenates dorsal hand tone, sun damage & texture' },
        { name: 'BioRePeel – Full Face & Neck', single: '£229', course6: '£1,199', note: 'Comprehensive face and cervical epidermal renewal' },
      ],
    },
  ],
  microneedling_exosomes: [
    {
      groupTitle: 'Dermal Renaissance — Microneedling with Exosomes',
      badge: 'Regenerative Cellular Growth Factors',
      description: 'Microneedling with regenerative boosters for deep cellular rejuvenation and scar repair.',
      items: [
        { name: 'Microneedling with Exosomes | Face', single: '£399', course6: '£999', saving: 'Save £1,395 on 6 sessions', note: 'Medical micro-channeling with pure bioactive exosome vesicles' },
        { name: 'Microneedling – Full Face & Neck', single: '£499', course6: '£1,299', saving: 'Save £1,695 on 6 sessions', note: 'Intensive cellular remodeling for face & cervical skin' },
        { name: 'Microneedling – Medium Areas (e.g. Abdomen, Arms)', single: '£599', course6: '£1,599', saving: 'Save £1,995 on 6 sessions', note: 'Targets stretch marks, surgical scars & textural laxity' },
        { name: 'Microneedling – Large Areas (e.g. Buttocks, Thighs)', single: '£749', course6: '£1,899', saving: 'Save £2,595 on 6 sessions', note: 'Extensive remodeling for cellulite, dimpling & laxity' },
      ],
    },
  ],
  // emsculpt_neo has its own page (EmsculptNeoPage), priced from FULL_PRICELIST.
  emerald_laser: [
    {
      groupTitle: 'Emerald™ Green Laser Lipo — Cold Laser Slimming',
      badge: 'FDA-Cleared for Overall Circumference Loss up to 40 BMI',
      description: '10 532nm cold laser diodes emulsify intracellular fat without cell death or downtime.',
      items: [
        { name: 'Emerald™ Green Laser Single Session (45 min)', single: '£250', note: 'Non-thermal fat emulsification & cellular reset' },
        { name: 'Emerald™ Laser Body Slim (10 Sessions Course)', course10: '£2,000', saving: 'Save £500 on 10 sessions (£200/session)', note: 'Recommended 5-week protocol for measurable inch loss' },
        { name: 'Allure Contour Luxe (Emsculpt Neo + Emerald – 6 Sessions)', single: '£639', course6: '£4,489', note: 'Emerald laser slimming paired with Emsculpt Neo muscle toning' },
        { name: 'Allure Contour Advanced (Emsculpt Neo + Emerald + Meso – 6 Sessions)', single: '£899', course6: '£4,499', saving: 'Save £895 vs 6 single sessions', note: 'Emerald and Emsculpt Neo with contouring mesotherapy' },
      ],
    },
  ],
};

export default function TreatmentDetailPage({ treatmentId, onNavigate }) {
  // Emsculpt NEO has its own long-form layout (modelled on the client's reference page)
  if (treatmentId === 'emsculpt_neo') return <EmsculptNeoPage onNavigate={onNavigate} />;

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
    `Hello Allure Passions UK, I would like to consult regarding ${treatment.name} at your Fitzrovia clinic.`
  )}`;

  return (
    <div className="ap-detail">
      <div className="ap-detail__container">
        
        {/* Back Link */}
        <button
          onClick={() => onNavigate('treatments')}
          className="ap-detail__back"
          type="button"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          <span>Back to Treatments Portfolio</span>
        </button>

        {/* Hero Section of Treatment */}
        <section className="ap-detail__hero" aria-label="Treatment overview">
          <div className="ap-detail__hero-copy">
            <div className="ap-detail__meta-row">
              <span className="ap-detail__badge-cat">
                {treatment.category} • Fitzrovia Clinic
              </span>
              <span className="ap-detail__meta-tag">
                JCCP & Level 6 Practice
              </span>
            </div>

            <h1 className="ap-detail__title">
              {treatment.name}
            </h1>
            <div className="ap-detail__tagline">
              {treatment.tagline}
            </div>

            <p className="ap-detail__desc">
              {treatment.fullDesc}
            </p>

            {/* Quick Specs Grid */}
            <div className="ap-detail__specs">
              <div className="ap-detail__spec-col">
                <span className="ap-detail__spec-label">Duration</span>
                <span className="ap-detail__spec-val">
                  <Clock size={14} color="#A87F3D" aria-hidden="true" />
                  <span>{treatment.duration}</span>
                </span>
              </div>

              <div className="ap-detail__spec-col">
                <span className="ap-detail__spec-label">Downtime</span>
                <span className="ap-detail__spec-val">
                  <ShieldCheck size={14} color="#A87F3D" aria-hidden="true" />
                  <span>{treatment.downtime}</span>
                </span>
              </div>

              <div className="ap-detail__spec-col">
                <span className="ap-detail__spec-label">Starting From</span>
                <span className="ap-detail__spec-val ap-detail__spec-val--price">
                  {treatment.pricing.split('|')[0]}
                </span>
              </div>
            </div>

            <div className="ap-detail__actions">
              <a
                href={whatsappBaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ap-detail__cta-primary"
              >
                <MessageSquare size={16} aria-hidden="true" />
                <span>Direct Clinical Consultation</span>
              </a>
              <button
                onClick={() => onNavigate('pricing')}
                className="ap-detail__cta-outline"
                type="button"
              >
                Full Pricing Directory
              </button>
            </div>
          </div>

          <div className="ap-detail__visual">
            <img
              src={treatment.image}
              alt={treatment.name}
              loading="lazy"
              decoding="async"
              className="ap-detail__photo"
            />
            <div className="ap-detail__visual-badge">
              <span>76 Cleveland Street, Fitzrovia</span>
              <span className="ap-detail__badge-gold">Tier-1 Medical Grade Platform</span>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="ap-detail__benefits" aria-label="Key clinical benefits">
          <span className="ap-detail__section-tag">Clinical Efficacy</span>
          <h2 className="ap-detail__section-title">
            Key Clinical <span className="text-bronze-gradient">Benefits & Science</span>
          </h2>

          <div className="ap-detail__benefits-grid">
            {treatment.keyBenefits.map((b, idx) => (
              <div key={idx} className="ap-detail__benefit-card">
                <CheckCircle2 size={20} color="#A87F3D" style={{ marginTop: '2px', flexShrink: 0 }} aria-hidden="true" />
                <span className="ap-detail__benefit-text">{b}</span>
              </div>
            ))}
          </div>
        </section>

        {/* COMPREHENSIVE TREATMENT PRICING DIRECTORY */}
        <section className="ap-detail__pricing-sec" aria-label="Pricing schedule">
          <div className="ap-detail__section-tag">
            Transparent Clinical Investment
          </div>
          <h2 className="ap-detail__section-title">
            {treatment.name} — <span className="text-bronze-gradient">Complete Pricing Schedule</span>
          </h2>
          <p className="ap-detail__pricing-lead">
            All treatment courses include an advanced multi-spectral clinical skin consultation, medical progress tracking, and dedicated aftercare guidance at 76 Cleveland Street, Fitzrovia.
          </p>

          <div className="ap-detail__pricing-stack">
            {pricingGroups.map((group, groupIdx) => (
              <article key={groupIdx} className="ap-detail__pricing-group">
                {/* Group Header */}
                <div className="ap-detail__group-head">
                  <div>
                    <span className="ap-detail__group-badge">
                      {group.badge}
                    </span>
                    <h3 className="ap-detail__group-title">
                      {group.groupTitle}
                    </h3>
                    {group.description && (
                      <p className="ap-detail__group-desc">
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
                    className="ap-detail__group-enquire"
                  >
                    <MessageSquare size={14} aria-hidden="true" />
                    <span>Enquire via WhatsApp</span>
                  </a>
                </div>

                {/* Pricing Rows Table / Cards */}
                <div className="ap-detail__items-list">
                  {group.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="ap-detail__price-row">
                      <div className="ap-detail__price-info">
                        <div className="ap-detail__item-name">
                          {item.name}
                        </div>
                        {item.note && (
                          <div className="ap-detail__item-note">
                            {item.note}
                          </div>
                        )}
                        {item.saving && (
                          <div className="ap-detail__saving-pill">
                            <Check size={12} color="#0F5132" aria-hidden="true" />
                            <span>{item.saving}</span>
                          </div>
                        )}
                      </div>

                      {/* Pricing Tier Values & Action Button */}
                      <div className="ap-detail__tier-cluster">
                        {item.single && (
                          <div className="ap-detail__tier-box">
                            <span className="ap-detail__tier-lbl">Single Session</span>
                            <span className="ap-detail__tier-val">{item.single}</span>
                          </div>
                        )}

                        {item.sessions3 && (
                          <div className="ap-detail__tier-box ap-detail__tier-box--highlight">
                            <span className="ap-detail__tier-lbl">Course of 3</span>
                            <span className="ap-detail__tier-val">{item.sessions3}</span>
                          </div>
                        )}

                        {item.course6 && (
                          <div className="ap-detail__tier-box ap-detail__tier-box--highlight">
                            <span className="ap-detail__tier-lbl">Course of 6</span>
                            <span className="ap-detail__tier-val">{item.course6}</span>
                          </div>
                        )}

                        {item.course8 && (
                          <div className="ap-detail__tier-box ap-detail__tier-box--highlight">
                            <span className="ap-detail__tier-lbl">Course of 8</span>
                            <span className="ap-detail__tier-val">{item.course8}</span>
                          </div>
                        )}

                        {item.course10 && (
                          <div className="ap-detail__tier-box ap-detail__tier-box--highlight">
                            <span className="ap-detail__tier-lbl">Course of 10</span>
                            <span className="ap-detail__tier-val">{item.course10}</span>
                          </div>
                        )}

                        {item.oneOff && (
                          <div className="ap-detail__tier-box ap-detail__tier-box--highlight">
                            <span className="ap-detail__tier-lbl">Protocol Price</span>
                            <span className="ap-detail__tier-val">{item.oneOff}</span>
                          </div>
                        )}

                        <a
                          href={`https://wa.me/447342052249?text=${encodeURIComponent(
                            `Hello Allure Passions UK, I would like to book ${item.name} (${treatment.name}) at your Fitzrovia clinic.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ap-detail__book-btn"
                        >
                          Book Protocol
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>

          {/* Clinical Assurance & Consultation Card */}
          <aside className="ap-detail__guarantee" aria-label="Clinical guarantee">
            <div>
              <span className="ap-detail__guar-tag">
                Fitzrovia Clinical Guarantee
              </span>
              <h3 className="ap-detail__guar-title">
                Bespoke Clinical Assessment
              </h3>
              <p className="ap-detail__guar-desc">
                Every course is customized to your tissue depth, Fitzpatrick phototype, and unique aesthetic goals. All consultations are performed under JCCP registered Level 6 clinical supervision at 76 Cleveland Street.
              </p>
            </div>

            <div className="ap-detail__guar-list">
              <div className="ap-detail__guar-item">
                <Check size={18} color="#D4AF37" aria-hidden="true" />
                <span>Complimentary multi-spectral imaging analysis with course</span>
              </div>
              <div className="ap-detail__guar-item">
                <Check size={18} color="#D4AF37" aria-hidden="true" />
                <span>Zero downtime & sterile clinical suite environment</span>
              </div>
              <div className="ap-detail__guar-item">
                <Check size={18} color="#D4AF37" aria-hidden="true" />
                <span>Direct practitioner WhatsApp access throughout your treatment</span>
              </div>

              <div>
                <a
                  href={`tel:${CLINIC_INFO.phone.replace(/\s+/g, '')}`}
                  className="ap-detail__guar-call"
                >
                  <Phone size={14} aria-hidden="true" />
                  <span>Direct Call: {CLINIC_INFO.phone}</span>
                </a>
              </div>
            </div>
          </aside>
        </section>

        {/* Explore Other Flagship Treatments */}
        <section className="ap-detail__other-sec" aria-label="Other flagship treatments">
          <div className="ap-detail__other-head">
            <div>
              <span className="ap-detail__section-tag">Flagship Directory</span>
              <h2 className="heading-md" style={{ color: '#1C1B18', margin: 0 }}>
                Explore Other Advanced Treatments
              </h2>
            </div>
            <button
              onClick={() => onNavigate('treatments')}
              className="ap-detail__back"
              style={{ margin: 0 }}
              type="button"
            >
              View All Treatments
            </button>
          </div>

          <div className="ap-detail__other-grid">
            {POPULAR_TREATMENTS.filter(t => t.id !== treatment.id).slice(0, 4).map(other => (
              <article
                key={other.id}
                onClick={() => onNavigate('treatment-detail', other.id)}
                className="ap-detail__other-card"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onNavigate('treatment-detail', other.id);
                  }
                }}
              >
                <div className="ap-detail__other-media">
                  <img
                    src={other.image}
                    alt={other.name}
                    loading="lazy"
                    decoding="async"
                    className="ap-detail__other-img"
                  />
                </div>
                <div className="ap-detail__other-body">
                  <div className="ap-detail__other-cat">
                    {other.category}
                  </div>
                  <h4 className="ap-detail__other-title">
                    {other.name}
                  </h4>
                  <div className="ap-detail__other-price">
                    {other.pricing.split('|')[0]}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
