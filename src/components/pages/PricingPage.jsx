import React, { useState, useMemo, useSyncExternalStore } from 'react';
import { FULL_PRICELIST, CLINIC_INFO } from '../../data/treatmentData';
import { ArrowLeft, Sparkles, Phone, MessageCircle, ShieldCheck, Search, X, Check } from 'lucide-react';
import './PricingPage.css';

const SIGNATURE_PACKAGES = [
  {
    name: 'Allure Contour Synergy',
    tag: 'Signature Body Course',
    badge: 'Most Popular Body Course',
    price: '£2,499',
    sessions: '6 Sessions Emsculpt Neo®',
    saving: 'Save £195 vs Single Sessions',
    image: '/assets/images/site/emsculpt-neo.webp',
    description: 'High-intensity electromagnetic muscle hypertrophy and synchronous RF fat apoptosis for dramatic core sculpting.',
    includes: ['6 × 30-Minute Emsculpt Neo® treatments', 'Pre- and post-course clinical measurements', 'Complimentary body composition monitoring'],
  },
  {
    name: 'Allure Contour Luxe',
    tag: 'Dual Technology Protocol',
    badge: 'Ultimate Dual Modality',
    price: '£4,489',
    sessions: '6 Emsculpt Neo® + 6 Emerald™ Laser Lipo',
    saving: 'Single Session £639',
    image: '/assets/images/site/emerald-laser.webp',
    description: 'Synergistic course pairing deep magnetic muscle contraction with cold laser cellular lipid emulsification and lymphatic drainage.',
    includes: ['6 × Emsculpt Neo® treatments', '6 × Emerald™ Green Laser (10 Diodes) sessions', 'Targeted circumferential inch loss & lymphatic support'],
  },
  {
    name: 'Allure Contour Advanced',
    tag: 'Triple Modality Protocol',
    badge: 'Comprehensive 360° Remodeling',
    price: '£4,499',
    sessions: '6 Neo® + 6 Emerald™ + 6 Mesotherapy',
    saving: 'Save £895 on Triple Protocol',
    image: '/assets/images/hero_clinic_ambiance.png',
    description: 'Comprehensive 360° protocol combining HIFEM+ muscle definition, 532nm cold green laser, and targeted lipolytic mesotherapy boosters.',
    includes: ['6 × Emsculpt Neo® treatments', '6 × Emerald™ Green Laser sessions', '6 × Targeted Contouring Mesotherapy boosters'],
  },
  {
    name: 'Emerald Laser Body Slim',
    tag: 'Cold Green Laser Protocol',
    badge: 'Circumference Inch Loss',
    price: '£2,000',
    sessions: '10 Sessions Emerald™ Cold Laser',
    saving: 'Save £500 vs Single Sessions (£200/session)',
    image: '/assets/images/site/emerald-laser.webp',
    description: 'FDA-cleared 532nm low-level green laser protocol for overall body circumference loss and cellular detoxification.',
    includes: ['10 × 45-Minute Emerald™ Green Laser sessions', '10 Erchonia multi-diode cold laser array', 'Pre- and post-course circumference measurements'],
  },
  {
    name: 'Cosmelan® Depigmentation Protocol',
    tag: 'Medical Depigmentation Mask',
    badge: 'Gold Standard Melasma',
    price: '£2,099',
    sessions: 'In-Clinic Mask + Full Homecare Regimen',
    saving: 'Includes In-Clinic Prep & Active Homecare',
    image: '/assets/images/site/treatment-cosmelan.jpg',
    description: 'The world’s most effective clinical depigmentation method for severe hormonal melasma and stubborn solar lentigines.',
    includes: ['In-clinic Phase 1 intensive depigmenting mask', 'Active homecare maintenance protocol (Cosmelan 2, Melan Recovery, Melan 130+)', 'Follow-up clinical reviews at 76 Cleveland Street'],
  },
];

// The search hint is as long as the field allows, so it is never cut off on a phone.
const SEARCH_HINTS = [
  ['(min-width: 768px)', 'Search by treatment, device or concern, e.g. Rosacea, Morpheus8, Tattoo'],
  ['(min-width: 360px)', 'Search treatments or concerns'],
];
const subscribeHints = (onChange) => {
  const queries = SEARCH_HINTS.map(([query]) => window.matchMedia(query));
  queries.forEach((query) => query.addEventListener('change', onChange));
  return () => queries.forEach((query) => query.removeEventListener('change', onChange));
};
const getHint = () => SEARCH_HINTS.find(([query]) => window.matchMedia(query).matches)?.[1] || 'Search treatments';
const getServerHint = () => SEARCH_HINTS[0][1];

export default function PricingPage({ onNavigate }) {
  const searchHint = useSyncExternalStore(subscribeHints, getHint, getServerHint);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const whatsappUrl = `https://wa.me/447342052249?text=${encodeURIComponent(
    'Hello Allure Passions UK, I would like to enquire regarding treatment pricing at your Fitzrovia clinic.'
  )}`;

  // Filter categories and items based on search query
  const filteredCategories = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      if (activeTab === 'all') return FULL_PRICELIST;
      if (activeTab === 'signature') return [];
      return FULL_PRICELIST.filter(cat => cat.category.replace(/^\(\d+\)\s*/, '') === activeTab);
    }

    return FULL_PRICELIST.map(cat => {
      const cleanCatName = cat.category.replace(/^\(\d+\)\s*/, '');
      const catMatches = cleanCatName.toLowerCase().includes(q) ||
        (cat.subtitle && cat.subtitle.toLowerCase().includes(q)) ||
        (cat.description && cat.description.toLowerCase().includes(q));

      const matchingItems = cat.items.filter(item => {
        return item.name.toLowerCase().includes(q) ||
          (item.single && item.single.toLowerCase().includes(q)) ||
          (item.course6 && item.course6.toLowerCase().includes(q)) ||
          (item.sessions3 && item.sessions3.toLowerCase().includes(q)) ||
          (item.oneOff && item.oneOff.toLowerCase().includes(q));
      });

      if (catMatches) {
        return cat; // Show full category if category matches
      } else if (matchingItems.length > 0) {
        return { ...cat, items: matchingItems }; // Show only matching items
      }
      return null;
    }).filter(Boolean);
  }, [searchQuery, activeTab]);

  // Total matching items count
  const totalMatchesCount = useMemo(() => {
    return filteredCategories.reduce((acc, cat) => acc + cat.items.length, 0);
  }, [filteredCategories]);

  return (
    <div className="ap-pricing">
      <div className="ap-pricing__container">
        
        {/* Back Link */}
        <button
          onClick={() => onNavigate('home')}
          className="ap-pricing__back"
        >
          <ArrowLeft size={14} /> Back to Homepage
        </button>

        {/* Page Header with Character */}
        <header className="ap-pricing__header">
          <div className="ap-pricing__eyebrow">
            Official Clinical Schedule • 76 Cleveland Street, Fitzrovia
          </div>

          <h1 className="ap-pricing__title">
            Treatment Menu &amp; Clinical Investment
          </h1>

          <p className="ap-pricing__lead">
            Transparent pricing for all doctor-led medical aesthetic protocols. All treatment courses include a complimentary multi-spectral skin analysis and dedicated post-procedure clinical support.
          </p>

          {/* Value Highlights */}
          <div className="ap-pricing__highlights">
            <div className="ap-pricing__highlight-card">
              <ShieldCheck size={20} color="#A87F3D" style={{ flexShrink: 0 }} />
              <span>JCCP Registered Practice</span>
            </div>
            <div className="ap-pricing__highlight-card">
              <Sparkles size={20} color="#A87F3D" style={{ flexShrink: 0 }} />
              <span>No Hidden Facility Fees</span>
            </div>
            <div className="ap-pricing__highlight-card">
              <Phone size={20} color="#A87F3D" style={{ flexShrink: 0 }} />
              <span>Direct Practitioner Access</span>
            </div>
          </div>
        </header>

        {/* SEARCH BAR — Instant treatment finding */}
        <div className="ap-pricing__search-bar">
          <Search size={22} color="#A87F3D" style={{ flexShrink: 0 }} />
          <input
            type="text"
            className="ap-pricing__search-input"
            aria-label="Search treatments"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={searchHint}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              aria-label="Clear search query"
              className="ap-pricing__search-clear"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Search Feedback Note if Active */}
        {searchQuery && (
          <div className="ap-pricing__search-feedback">
            <div>
              Showing <strong>{totalMatchesCount}</strong> treatment option{totalMatchesCount === 1 ? '' : 's'} matching <em>"{searchQuery}"</em>
            </div>
            <button
              onClick={() => setSearchQuery('')}
              className="ap-pricing__search-reset"
            >
              Reset Search
            </button>
          </div>
        )}

        {/* Category Navigation Tabs (Hidden while actively searching) */}
        {!searchQuery && (
          <div className="ap-pricing__tabs-wrap">
            <div className="ap-pricing__tabs-rail ap-scroll-rail">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`ap-pricing__tab-btn ${activeTab === 'all' ? 'is-active' : ''}`}
              >
                All Categories ({FULL_PRICELIST.length})
              </button>

              {FULL_PRICELIST.map((cat, idx) => {
                const cleanTitle = cat.category.replace(/^\(\d+\)\s*/, '');
                const isActive = activeTab === cleanTitle;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveTab(cleanTitle)}
                    className={`ap-pricing__tab-btn ${isActive ? 'is-active' : ''}`}
                  >
                    {cleanTitle}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => setActiveTab('signature')}
                className={`ap-pricing__tab-btn ap-pricing__tab-btn--signature ${activeTab === 'signature' ? 'is-active' : ''}`}
              >
                ★ Signature Synergy Packages
              </button>
            </div>
          </div>
        )}

        {/* Signature Packages Spotlight Section */}
        {(!searchQuery && (activeTab === 'all' || activeTab === 'signature')) && (
          <section className="ap-pricing__packages-sec">
            <div style={{ marginBottom: '2rem' }}>
              <div className="ap-pricing__eyebrow">
                Curated Multi-Modality Courses
              </div>
              <h2 className="ap-pricing__title" style={{ fontSize: 'clamp(1.8rem, 1.4rem + 1.8vw, 2.5rem)' }}>
                Signature Packages &amp; Synergy Courses
              </h2>
            </div>

            <div className="ap-pricing__packages-grid">
              {SIGNATURE_PACKAGES.map((pkg, idx) => (
                <article
                  key={idx}
                  className="ap-pricing__pkg-card"
                >
                  <span className="ap-pricing__pkg-badge">
                    {pkg.badge}
                  </span>

                  <div>
                    <div className="ap-pricing__pkg-tag">
                      {pkg.tag}
                    </div>

                    <h3 className="ap-pricing__pkg-name">
                      {pkg.name}
                    </h3>

                    <div className="ap-pricing__pkg-sessions">
                      {pkg.sessions}
                    </div>

                    <div className="ap-pricing__pkg-price-row">
                      <span className="ap-pricing__pkg-price">
                        {pkg.price}
                      </span>
                      <span className="ap-pricing__pkg-saving">
                        {pkg.saving}
                      </span>
                    </div>

                    <p className="ap-pricing__pkg-desc">
                      {pkg.description}
                    </p>

                    <div className="ap-pricing__pkg-inc-box">
                      <div className="ap-pricing__pkg-inc-lbl">
                        Protocol Inclusions:
                      </div>
                      <ul className="ap-pricing__pkg-inc-list">
                        {pkg.includes.map((inc, incIdx) => (
                          <li key={incIdx} className="ap-pricing__pkg-inc-item">
                            <Check size={14} color="#A87F3D" style={{ flexShrink: 0 }} />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/447342052249?text=${encodeURIComponent(
                      `Hello Allure Passions UK, I would like to book the ${pkg.name} package.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ap-pricing__pkg-btn"
                  >
                    <MessageCircle size={15} />
                    <span>Inquire via WhatsApp</span>
                  </a>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* DETAILED PRICE LIST CATEGORIES */}
        {activeTab !== 'signature' && (
          <div className="ap-pricing__categories-stack">
            {filteredCategories.length === 0 ? (
              <div style={{
                background: '#FFFFFF',
                borderRadius: 'var(--radius-md, 10px)',
                padding: 'clamp(1.75rem, 5vw, 3rem)',
                textAlign: 'center',
                border: '1px solid rgba(168, 127, 61, 0.25)'
              }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#1C1B18', marginBottom: '0.75rem' }}>
                  No treatment options match "{searchQuery}"
                </h3>
                <p style={{ color: '#7A756C', fontSize: '0.95rem', marginBottom: '1.5rem', fontWeight: '300' }}>
                  Please refine your search keywords, browse through all categories, or message Abigail directly for bespoke protocol pricing.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem 1rem', justifyContent: 'center' }}>
                  <button onClick={() => setSearchQuery('')} className="btn-bronze" style={{ padding: '0.65rem 1.5rem', fontSize: '0.85rem' }}>
                    View All Treatments
                  </button>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-bronze"
                    style={{ padding: '0.65rem 1.5rem', fontSize: '0.85rem', textDecoration: 'none' }}
                  >
                    Ask on WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              filteredCategories.map((group, idx) => {
                const cleanCategoryName = group.category.replace(/^\(\d+\)\s*/, '');
                return (
                  <article
                    key={idx}
                    className="ap-pricing__category-card"
                  >
                    {/* Architectural Category Header with Relevant Image */}
                    <div className="ap-pricing__category-head">
                      <div className="ap-pricing__category-info">
                        {/* Relevant Category Image Thumbnail */}
                        {group.image && (
                          <div className="ap-pricing__category-thumb">
                            <img
                              src={group.image}
                              alt={cleanCategoryName}
                              loading="lazy"
                              decoding="async"
                            />
                          </div>
                        )}

                        <div style={{ minWidth: 0, flex: 1 }}>
                          <div className="ap-pricing__category-meta">
                            <span className="ap-pricing__category-pill-tag">
                              Clinical Category
                            </span>
                            <span className="ap-pricing__category-count">
                              {group.items.length} Options
                            </span>
                          </div>

                          <h2 className="ap-pricing__category-title">
                            {cleanCategoryName}
                          </h2>

                          {group.subtitle && (
                            <div className="ap-pricing__category-subtitle">
                              {group.subtitle}
                            </div>
                          )}

                          {group.description && (
                            <p className="ap-pricing__category-desc">
                              {group.description}
                            </p>
                          )}
                        </div>
                      </div>

                      <a
                        href={`https://wa.me/447342052249?text=${encodeURIComponent(
                          `Hello Allure Passions UK, I would like to consult regarding ${cleanCategoryName} protocols.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ap-pricing__category-enquire"
                      >
                        <MessageCircle size={14} />
                        <span>Enquire via WhatsApp</span>
                      </a>
                    </div>

                    {/* Treatment Rows with Tier Badges */}
                    <div className="ap-pricing__items-grid">
                      {group.items.map((item, itemIdx) => (
                        <div
                          key={itemIdx}
                          className="ap-pricing__item-card"
                        >
                          <div>
                            <h3 className="ap-pricing__item-title">
                              {item.name}
                            </h3>

                            {/* Price Breakdown Grid */}
                            <div className="ap-pricing__tier-chips">
                              {item.single && (
                                <div className="ap-pricing__tier-chip">
                                  <span className="ap-pricing__tier-chip-lbl">Single: </span>
                                  <strong className="ap-pricing__tier-chip-val">{item.single}</strong>
                                </div>
                              )}
                              {item.oneOff && (
                                <div className="ap-pricing__tier-chip ap-pricing__tier-chip--gold">
                                  <span className="ap-pricing__tier-chip-lbl ap-pricing__tier-chip-lbl--gold">One Off: </span>
                                  <strong className="ap-pricing__tier-chip-val ap-pricing__tier-chip-val--gold">{item.oneOff}</strong>
                                </div>
                              )}
                              {item.sessions3 && (
                                <div className="ap-pricing__tier-chip ap-pricing__tier-chip--gold">
                                  <span className="ap-pricing__tier-chip-lbl ap-pricing__tier-chip-lbl--gold">3 Sessions: </span>
                                  <strong className="ap-pricing__tier-chip-val ap-pricing__tier-chip-val--gold">{item.sessions3}</strong>
                                </div>
                              )}
                              {item.course6 && (
                                <div className="ap-pricing__tier-chip ap-pricing__tier-chip--gold">
                                  <span className="ap-pricing__tier-chip-lbl ap-pricing__tier-chip-lbl--gold">6 Sessions: </span>
                                  <strong className="ap-pricing__tier-chip-val ap-pricing__tier-chip-val--gold">{item.course6}</strong>
                                </div>
                              )}
                              {item.course8 && (
                                <div className="ap-pricing__tier-chip ap-pricing__tier-chip--gold">
                                  <span className="ap-pricing__tier-chip-lbl ap-pricing__tier-chip-lbl--gold">8 Sessions: </span>
                                  <strong className="ap-pricing__tier-chip-val ap-pricing__tier-chip-val--gold">{item.course8}</strong>
                                </div>
                              )}
                              {item.course10 && (
                                <div className="ap-pricing__tier-chip ap-pricing__tier-chip--gold">
                                  <span className="ap-pricing__tier-chip-lbl ap-pricing__tier-chip-lbl--gold">10 Sessions: </span>
                                  <strong className="ap-pricing__tier-chip-val ap-pricing__tier-chip-val--gold">{item.course10}</strong>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="ap-pricing__item-foot">
                            <span className="ap-pricing__item-clinic">76 Cleveland Street</span>
                            <a
                              href={`https://wa.me/447342052249?text=${encodeURIComponent(
                                `Hello Allure Passions UK, I would like to book ${item.name} (${cleanCategoryName}).`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ap-pricing__item-book"
                            >
                              Book Protocol →
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </article>
                );
              })
            )}
          </div>
        )}

        {/* Practice Consultation Banner */}
        <div className="ap-pricing__banner">
          <div className="ap-pricing__banner-copy">
            <div className="ap-pricing__banner-tag">
              Fitzrovia Private Clinic
            </div>
            <h3 className="ap-pricing__banner-title">
              Bespoke Multi-Modality Treatment Planning
            </h3>
            <p className="ap-pricing__banner-desc">
              Connect directly with Abigail and our clinical team to plan a customized program tailored to your unique anatomical profile.
            </p>
          </div>

          <div className="ap-pricing__banner-actions">
            <a
              href={`https://wa.me/447342052249?text=${encodeURIComponent(
                'Hello Allure Passions UK, I would like to consult regarding a bespoke treatment package.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ap-pricing__banner-btn ap-pricing__banner-btn--gold"
            >
              <MessageCircle size={16} />
              <span>WhatsApp Consultation</span>
            </a>
            <a
              href={`tel:${CLINIC_INFO.phone.replace(/\s+/g, '')}`}
              className="ap-pricing__banner-btn ap-pricing__banner-btn--outline"
            >
              <Phone size={16} />
              <span>Call Clinic</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
