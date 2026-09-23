import React, { useState } from 'react';
import { POPULAR_TREATMENTS } from '../../data/treatmentData';
import { ArrowLeft, ArrowRight, Phone, MessageCircle } from 'lucide-react';
import ResponsiveImg from '../ui/ResponsiveImg';
import './TreatmentsIndexPage.css';

// Card width below 1280px: one column to 720px, two to 1080px, then three
const CARD_SIZES = '(max-width: 720px) calc(100vw - 2.5rem), (max-width: 1080px) 46vw, 30vw';

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
    image: '/assets/images/site/emsculpt-neo.webp',
    leadTechnology: 'Emsculpt Neo® & Emerald™ Green Laser Lipo',
    indications: ['Abdomen & core sculpting', 'Gluteal lifting & firming', 'Subcutaneous fat reduction', 'Circumferential inch loss'],
    protocol: 'High-Intensity Focused Electromagnetic (HIFEM+) energy triggers 24,000 supramaximal contractions while synchronised RF induces fat apoptosis.',
    linkedTechId: 'emsculpt_neo',
  },
];

const SIGNATURE_PACKAGES = [
  {
    name: 'Allure Contour Synergy',
    category: 'Body Sculpting Packages',
    sessions: '6 Sessions Emsculpt Neo®',
    price: 'Course: £2,499 | Single: £449',
    description: 'Targeted course delivering maximum core hypertrophy and visceral/subcutaneous adipose clearance.',
    target: 'Abdomen, Glutes, Arms or Calves',
  },
  {
    name: 'Allure Contour Luxe',
    category: 'Dual Technology Body Protocol',
    sessions: '6 Emsculpt Neo® + 6 Emerald™ Cold Laser',
    price: 'Course: £4,489 | Single: £639',
    description: 'Synergistic course pairing deep magnetic muscle contraction with cold laser cellular lipid emulsification and lymphatic detox.',
    target: 'Comprehensive Midsection & Flanks',
  },
  {
    name: 'Allure Contour Advanced',
    category: 'Triple Modality Body Protocol',
    sessions: '6 Neo® + 6 Emerald™ + 6 Mesotherapy',
    price: 'Course: £4,499 | Single: £899',
    description: 'Comprehensive 360° protocol combining HIFEM+ muscle definition, 532nm cold green laser, and targeted mesotherapy boosters.',
    target: 'Complete Abdominal & Flank Tightening',
  },
  {
    name: 'Emerald Laser Body Slim',
    category: 'Cold Green Laser Slimming',
    sessions: '10 Sessions Emerald™ Cold Laser',
    price: 'Course: £2,000 | Single: £250',
    description: 'FDA-cleared 532nm low-level green laser protocol for overall body circumference loss and cellular detoxification.',
    target: 'Full Body Circumference Reduction',
  },
  {
    name: 'Cosmelan® Depigmentation Protocol',
    category: 'Medical Pigment Clearance',
    sessions: 'In-Clinic Mask + Full Homecare System',
    price: 'Single Protocol: £2,099',
    description: 'World-leading intensive depigmentation protocol treating stubborn hormonal melasma, chloasma, and deep solar lentigines.',
    target: 'Full Face Pigment Eradication',
  },
];

export default function TreatmentsIndexPage({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('all');

  const whatsappUrl = `https://wa.me/447342052249?text=${encodeURIComponent(
    'Hello Allure Passions UK, I would like to consult regarding treatments at your Fitzrovia clinic.'
  )}`;

  return (
    <div className="ap-dir">
      <div className="ap-dir__container">
        
        {/* Back Link */}
        <button
          onClick={() => onNavigate('home')}
          className="ap-dir__back"
          type="button"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          <span>Back to Homepage</span>
        </button>

        {/* Page Header */}
        <header className="ap-dir__header">
          <div className="ap-dir__eyebrow">
            Clinical Portfolio • 76 Cleveland Street, Fitzrovia
          </div>

          <h1 className="ap-dir__title">
            Comprehensive Treatment Directory
          </h1>

          <p className="ap-dir__lead">
            Explore every clinical service delivered at Allure Passions UK. Filter by anatomical treatment area, explore our flagship medical platforms, or discover curated multi-modality synergy programs.
          </p>
        </header>

        {/* Navigation Filter Tabs Rail */}
        <nav className="ap-dir__tabs-wrap" aria-label="Treatment categories filter">
          <div className="ap-dir__tabs-rail">
            {[
              { id: 'all', label: 'All Services & Portfolio' },
              { id: 'areas', label: 'Explore By Treatment Area' },
              { id: 'technologies', label: 'Flagship Medical Technologies' },
              { id: 'packages', label: 'Signature Synergy Courses' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                type="button"
                className={`ap-dir__tab-btn${activeTab === tab.id ? ' is-active' : ''}`}
                aria-pressed={activeTab === tab.id}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Section A: Treatment Areas */}
        {(activeTab === 'all' || activeTab === 'areas') && (
          <section className="ap-dir__section" aria-label="Treatment areas">
            <div className="ap-dir__section-head">
              <div className="ap-dir__section-tag">
                Anatomical Protocols
              </div>
              <h2 className="ap-dir__section-title">
                Browse by Treatment Area
              </h2>
              <p className="ap-dir__section-desc">
                Specific non-invasive clinical solutions tailored to each facial zone and body region.
              </p>
            </div>

            <div className="ap-dir__grid">
              {TREATMENT_AREAS_DIRECTORY.map((area) => (
                <article key={area.id} className="ap-dir__card">
                  <div>
                    {/* Area Image */}
                    <div className="ap-dir__card-media">
                      <ResponsiveImg
                        src={area.image}
                        sizes={CARD_SIZES}
                        alt={area.name}
                        loading="lazy"
                        decoding="async"
                        className="ap-dir__card-img"
                      />
                      <span className="ap-dir__card-badge">
                        {area.category} Focus
                      </span>
                    </div>

                    <div className="ap-dir__card-body">
                      <h3 className="ap-dir__card-title">
                        {area.name}
                      </h3>

                      <div className="ap-dir__card-sub">
                        Lead System: {area.leadTechnology}
                      </div>

                      <p className="ap-dir__card-text">
                        {area.protocol}
                      </p>

                      <div className="ap-dir__indications">
                        {area.indications.map((ind, idx) => (
                          <div key={idx} className="ap-dir__indication-item">
                            <span className="ap-dir__dot" aria-hidden="true" />
                            <span>{ind}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="ap-dir__card-foot">
                    <button
                      onClick={() => onNavigate('treatment-detail', area.linkedTechId)}
                      className="ap-dir__btn-link"
                      type="button"
                    >
                      <span>View Protocol Details</span>
                      <ArrowRight size={13} aria-hidden="true" />
                    </button>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ap-dir__consult-link"
                    >
                      <MessageCircle size={14} aria-hidden="true" />
                      <span>Consult</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Section B: 6 Flagship Technologies */}
        {(activeTab === 'all' || activeTab === 'technologies') && (
          <section className="ap-dir__section" aria-label="Flagship medical technologies">
            <div className="ap-dir__section-head">
              <div className="ap-dir__section-tag">
                Energy-Based Platforms
              </div>
              <h2 className="ap-dir__section-title">
                Flagship Medical Technologies
              </h2>
              <p className="ap-dir__section-desc">
                Tier-one FDA-cleared aesthetic systems operated by certified Level 6 practitioners.
              </p>
            </div>

            <div className="ap-dir__grid">
              {POPULAR_TREATMENTS.map((tr) => (
                <article key={tr.id} className="ap-dir__card">
                  <div>
                    <div className="ap-dir__card-media">
                      <ResponsiveImg
                        src={tr.image}
                        sizes={CARD_SIZES}
                        alt={tr.name}
                        loading="lazy"
                        decoding="async"
                        className="ap-dir__card-img"
                      />
                      <span className="ap-dir__card-badge">
                        {tr.category}
                      </span>
                    </div>

                    <div className="ap-dir__card-body">
                      <h3 className="ap-dir__card-title">
                        {tr.name}
                      </h3>
                      <div className="ap-dir__card-sub">
                        {tr.tagline}
                      </div>
                      <p className="ap-dir__card-text">
                        {tr.shortDesc}
                      </p>
                    </div>
                  </div>

                  <div className="ap-dir__card-foot">
                    <div className="ap-dir__price-block">
                      <span className="ap-dir__price-label">Session From</span>
                      <span className="ap-dir__price-val">{tr.pricing.split('|')[0]}</span>
                    </div>

                    <button
                      onClick={() => onNavigate('treatment-detail', tr.id)}
                      className="ap-dir__btn-link"
                      type="button"
                    >
                      <span>Protocol Sheet</span>
                      <ArrowRight size={13} aria-hidden="true" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Section C: Curated Synergy Packages */}
        {(activeTab === 'all' || activeTab === 'packages') && (
          <section className="ap-dir__section" aria-label="Signature synergy courses">
            <div className="ap-dir__section-head">
              <div className="ap-dir__section-tag">
                Multi-Modality Protocols
              </div>
              <h2 className="ap-dir__section-title">
                Signature Packages & Synergy Courses
              </h2>
              <p className="ap-dir__section-desc">
                Scientifically sequenced treatment courses combining multiple complementary technologies.
              </p>
            </div>

            <div className="ap-dir__grid">
              {SIGNATURE_PACKAGES.map((pkg, idx) => (
                <article key={idx} className="ap-dir__pkg-card">
                  <div>
                    <div className="ap-dir__pkg-head">
                      <span className="ap-dir__pkg-cat">
                        {pkg.category}
                      </span>
                      <span className="ap-dir__pkg-price">
                        {pkg.price}
                      </span>
                    </div>

                    <h3 className="ap-dir__pkg-title">
                      {pkg.name}
                    </h3>

                    <div className="ap-dir__pkg-sessions">
                      {pkg.sessions}
                    </div>

                    <p className="ap-dir__pkg-desc">
                      {pkg.description}
                    </p>

                    <div className="ap-dir__pkg-target">
                      Focus: <strong>{pkg.target}</strong>
                    </div>
                  </div>

                  <div className="ap-dir__pkg-action">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ap-dir__pkg-btn"
                    >
                      <MessageCircle size={14} aria-hidden="true" />
                      <span>WhatsApp Clinic</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Bottom Practice Communication Banner */}
        <aside className="ap-dir__banner" aria-label="Direct clinic communication">
          <div className="ap-dir__banner-copy">
            <div className="ap-dir__banner-tag">
              76 Cleveland Street • Fitzrovia Practice
            </div>
            <h3 className="ap-dir__banner-title">
              Require Direct Advice on Your Treatment Pathway?
            </h3>
            <p className="ap-dir__banner-desc">
              Speak directly with our clinical practitioners via WhatsApp or direct telephone consultation.
            </p>
          </div>

          <div className="ap-dir__banner-actions">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ap-dir__banner-btn ap-dir__banner-btn--gold"
            >
              <MessageCircle size={16} aria-hidden="true" />
              <span>WhatsApp Consultation</span>
            </a>

            <a
              href="tel:+447342052249"
              className="ap-dir__banner-btn ap-dir__banner-btn--outline"
            >
              <Phone size={15} aria-hidden="true" />
              <span>Call +44 7342 052249</span>
            </a>
          </div>
        </aside>

      </div>
    </div>
  );
}
