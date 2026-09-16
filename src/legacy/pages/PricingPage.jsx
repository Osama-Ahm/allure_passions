import React, { useState, useMemo } from 'react';
import { FULL_PRICELIST, CLINIC_INFO } from '../../data/treatmentData';
import { ArrowLeft, Sparkles, Phone, MessageCircle, ShieldCheck, Search, X, Check } from 'lucide-react';

const SIGNATURE_PACKAGES = [
  {
    name: 'Allure Contour Synergy',
    tag: 'Signature Body Course',
    badge: 'Most Popular Body Course',
    price: '£2,499',
    sessions: '6 Sessions Emsculpt Neo®',
    saving: 'Save £195 vs Single Sessions',
    image: '/assets/images/emsculpt_neo.png',
    description: 'High-intensity electromagnetic muscle hypertrophy and synchronous RF fat apoptosis for dramatic core sculpting.',
    includes: ['6 × 30-Minute Emsculpt Neo® treatments', 'Pre- and post-course clinical measurements', 'Complimentary body composition monitoring'],
  },
  {
    name: 'Allure Contour Luxe',
    tag: 'Dual Technology Protocol',
    badge: 'Ultimate Dual Modality',
    price: '£4,489',
    sessions: '6 Emsculpt Neo® + 6 Emerald™ Laser Lipo',
    saving: 'Save £600 vs Individual Courses',
    image: '/assets/images/emerald_laser.png',
    description: 'Synergistic course pairing deep magnetic muscle contraction with cold laser cellular lipid emulsification and lymphatic drainage.',
    includes: ['6 × Emsculpt Neo® treatments', '6 × Emerald™ Green Laser (10 Diodes) sessions', 'Targeted circumferential inch loss & lymphatic support'],
  },
  {
    name: 'Cosmelan® Depigmentation Protocol',
    tag: 'Medical Depigmentation Mask',
    badge: 'Gold Standard Melasma',
    price: '£2,099',
    sessions: 'In-Clinic Mask + 6-Month Active Homecare',
    saving: 'Full 6-Month Protocol Included',
    image: '/assets/images/picoway_laser.png',
    description: 'The world’s most effective clinical depigmentation method for severe hormonal melasma and stubborn solar lentigines.',
    includes: ['In-clinic Phase 1 intensive depigmenting mask', '6-month Phase 2 active homecare maintenance protocol', 'Follow-up clinical reviews at 76 Cleveland Street'],
  },
];

export default function PricingPage({ onNavigate }) {
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
    <div style={{ padding: 'clamp(2rem, 4vw, 3.5rem) 0 6rem 0', background: '#FAF7F2', minHeight: '85vh', color: '#1C1B18' }}>
      <div className="site-container">
        
        {/* Back Link */}
        <button
          onClick={() => onNavigate('home')}
          className="btn-outline-bronze"
          style={{ marginBottom: '2.5rem', padding: '0.5rem 1.25rem', fontSize: '0.8rem' }}
        >
          <ArrowLeft size={14} /> Back to Homepage
        </button>

        {/* Page Header with Character */}
        <div style={{ maxWidth: '960px', marginBottom: '3rem' }}>
          <div
            data-reveal
            style={{
              fontSize: '0.8rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#A87F3D',
              fontWeight: '600',
              marginBottom: '0.75rem',
            }}
          >
            Official Clinical Schedule • 76 Cleveland Street, Fitzrovia
          </div>

          <h1
            data-reveal
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.5rem, 4.5vw, 3.8rem)',
              color: '#1C1B18',
              fontWeight: '400',
              lineHeight: 1.15,
              marginBottom: '1.25rem',
            }}
          >
            Treatment Menu & Clinical Investment
          </h1>

          <p data-reveal style={{ fontSize: '1.15rem', color: '#4A4740', fontWeight: '300', lineHeight: '1.75', marginBottom: '2rem' }}>
            Transparent pricing for all doctor-led medical aesthetic protocols. All treatment courses include a complimentary multi-spectral skin analysis and dedicated post-procedure clinical support.
          </p>

          {/* Value Highlights */}
          <div
            data-reveal-children
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1rem',
            }}
          >
            <div style={{ background: '#FFFFFF', padding: '1rem 1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(168, 127, 61, 0.25)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <ShieldCheck size={20} color="#A87F3D" />
              <div style={{ fontSize: '0.85rem', color: '#1C1B18', fontWeight: '600' }}>
                JCCP Registered Practice
              </div>
            </div>
            <div style={{ background: '#FFFFFF', padding: '1rem 1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(168, 127, 61, 0.25)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Sparkles size={20} color="#A87F3D" />
              <div style={{ fontSize: '0.85rem', color: '#1C1B18', fontWeight: '600' }}>
                No Hidden Facility Fees
              </div>
            </div>
            <div style={{ background: '#FFFFFF', padding: '1rem 1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(168, 127, 61, 0.25)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Phone size={20} color="#A87F3D" />
              <div style={{ fontSize: '0.85rem', color: '#1C1B18', fontWeight: '600' }}>
                Direct Practitioner Access
              </div>
            </div>
          </div>
        </div>

        {/* SEARCH BAR — Instant treatment finding */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid rgba(168, 127, 61, 0.35)',
          borderRadius: 'var(--radius-md)',
          padding: '0.85rem 1.25rem',
          marginBottom: '2.5rem',
          boxShadow: '0 8px 24px rgba(28, 27, 24, 0.05)',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          position: 'relative'
        }}>
          <Search size={22} color="#A87F3D" style={{ flexShrink: 0 }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by treatment, laser system, or concern (e.g. 'Rosacea', 'ADVATx', 'Full Face', 'Tattoo', 'Morpheus8')..."
            style={{
              flex: 1,
              border: 'none',
              background: 'transparent',
              outline: 'none',
              fontSize: '1rem',
              color: '#1C1B18',
              fontFamily: 'var(--font-sans)',
              padding: '0.4rem 0',
              boxShadow: 'none',
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              aria-label="Clear search query"
              style={{
                background: 'rgba(28, 27, 24, 0.06)',
                border: 'none',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#7A756C'
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Search Feedback Note if Active */}
        {searchQuery && (
          <div style={{
            marginBottom: '2rem',
            padding: '0.75rem 1.25rem',
            background: 'rgba(168, 127, 61, 0.08)',
            border: '1px solid rgba(168, 127, 61, 0.25)',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.9rem',
            color: '#1C1B18'
          }}>
            <div>
              Showing <strong>{totalMatchesCount}</strong> treatment option{totalMatchesCount === 1 ? '' : 's'} matching <em>"{searchQuery}"</em>
            </div>
            <button
              onClick={() => setSearchQuery('')}
              style={{ background: 'none', border: 'none', color: '#A87F3D', fontWeight: '600', cursor: 'pointer', fontSize: '0.85rem' }}
            >
              Reset Search
            </button>
          </div>
        )}

        {/* Category Navigation Tabs (Hidden while actively searching) */}
        {!searchQuery && (
          <div
            style={{
              display: 'flex',
              gap: '0.65rem',
              flexWrap: 'wrap',
              marginBottom: '3.5rem',
              borderBottom: '1px solid rgba(168, 127, 61, 0.2)',
              paddingBottom: '1.25rem',
            }}
          >
            <button
              onClick={() => setActiveTab('all')}
              style={{
                padding: '0.55rem 1.4rem',
                borderRadius: 'var(--radius-full)',
                border: activeTab === 'all' ? '1px solid #A87F3D' : '1px solid rgba(28, 27, 24, 0.12)',
                background: activeTab === 'all' ? '#A87F3D' : '#FFFFFF',
                color: activeTab === 'all' ? '#FFFFFF' : '#1C1B18',
                fontSize: '0.825rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              All Categories ({FULL_PRICELIST.length})
            </button>

            {FULL_PRICELIST.map((cat, idx) => {
              const cleanTitle = cat.category.replace(/^\(\d+\)\s*/, '');
              const isActive = activeTab === cleanTitle;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveTab(cleanTitle)}
                  style={{
                    padding: '0.55rem 1.4rem',
                    borderRadius: 'var(--radius-full)',
                    border: isActive ? '1px solid #A87F3D' : '1px solid rgba(28, 27, 24, 0.12)',
                    background: isActive ? '#A87F3D' : '#FFFFFF',
                    color: isActive ? '#FFFFFF' : '#1C1B18',
                    fontSize: '0.825rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {cleanTitle}
                </button>
              );
            })}

            <button
              onClick={() => setActiveTab('signature')}
              style={{
                padding: '0.55rem 1.4rem',
                borderRadius: 'var(--radius-full)',
                border: activeTab === 'signature' ? '1px solid #D4AF37' : '1px solid rgba(212, 175, 55, 0.4)',
                background: activeTab === 'signature' ? 'var(--bronze-gradient)' : 'rgba(212, 175, 55, 0.1)',
                color: activeTab === 'signature' ? '#FFFFFF' : '#A87F3D',
                fontSize: '0.825rem',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              ★ Signature Synergy Packages
            </button>
          </div>
        )}

        {/* Signature Packages Spotlight Section */}
        {(!searchQuery && (activeTab === 'all' || activeTab === 'signature')) && (
          <div style={{ marginBottom: '4.5rem' }}>
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#A87F3D', fontWeight: '600' }}>
                Curated Multi-Modality Courses
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#1C1B18', fontWeight: '500' }}>
                Signature Packages & Synergy Courses
              </h2>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
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
                    border: '1px solid rgba(168, 127, 61, 0.35)',
                    padding: '2.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      background: 'rgba(168, 127, 61, 0.12)',
                      color: '#A87F3D',
                      fontSize: '0.68rem',
                      fontWeight: '700',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      padding: '0.3rem 0.75rem',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid rgba(168, 127, 61, 0.3)',
                    }}
                  >
                    {pkg.badge}
                  </div>

                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#7A756C', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                      {pkg.tag}
                    </div>

                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: '#1C1B18', fontWeight: '600', marginBottom: '0.5rem' }}>
                      {pkg.name}
                    </h3>

                    <div style={{ fontSize: '0.9rem', color: '#D4AF37', fontWeight: '600', marginBottom: '1.25rem' }}>
                      {pkg.sessions}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1.25rem' }}>
                      <div style={{ fontSize: '2.2rem', fontFamily: 'var(--font-serif)', color: '#A87F3D', fontWeight: '700' }}>
                        {pkg.price}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#0F5132', fontWeight: '600', background: 'rgba(15, 81, 50, 0.1)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)' }}>
                        {pkg.saving}
                      </div>
                    </div>

                    <p style={{ fontSize: '0.925rem', color: '#4A4740', lineHeight: '1.65', marginBottom: '1.5rem', fontWeight: '300' }}>
                      {pkg.description}
                    </p>

                    <div style={{ borderTop: '1px solid rgba(168, 127, 61, 0.15)', paddingTop: '1.25rem', marginBottom: '1.75rem' }}>
                      <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#7A756C', fontWeight: '600', marginBottom: '0.75rem' }}>
                        Protocol Inclusions:
                      </div>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {pkg.includes.map((inc, incIdx) => (
                          <li key={incIdx} style={{ fontSize: '0.85rem', color: '#1C1B18', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Check size={14} color="#A87F3D" />
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
                    className="btn-bronze"
                    style={{
                      padding: '0.85rem',
                      fontSize: '0.825rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <MessageCircle size={15} />
                    <span>Inquire via WhatsApp</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DETAILED PRICE LIST CATEGORIES (With Relevant Images & No Numbers) */}
        {activeTab !== 'signature' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem', marginBottom: '5rem' }}>
            {filteredCategories.length === 0 ? (
              <div style={{
                background: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                padding: '3rem',
                textAlign: 'center',
                border: '1px solid rgba(168, 127, 61, 0.25)'
              }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#1C1B18', marginBottom: '0.75rem' }}>
                  No treatment options match "{searchQuery}"
                </h3>
                <p style={{ color: '#7A756C', fontSize: '0.95rem', marginBottom: '1.5rem', fontWeight: '300' }}>
                  Please refine your search keywords, browse through all categories, or message Abigail directly for bespoke protocol pricing.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
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
                  <div
                    key={idx}
                    className="card-white-elevation"
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid rgba(168, 127, 61, 0.28)',
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      boxShadow: '0 8px 25px rgba(28, 27, 24, 0.04)'
                    }}
                  >
                    {/* Architectural Category Header with Relevant Image */}
                    <div className="pricing-category-header">
                      <div className="category-info-group">
                        {/* Relevant Category Image Thumbnail */}
                        {group.image && (
                          <div style={{
                            width: 'clamp(80px, 15vw, 110px)',
                            height: 'clamp(80px, 15vw, 110px)',
                            borderRadius: 'var(--radius-sm)',
                            overflow: 'hidden',
                            border: '1px solid rgba(212, 175, 55, 0.4)',
                            flexShrink: 0,
                            background: '#121110',
                            boxShadow: '0 4px 14px rgba(0,0,0,0.3)'
                          }}>
                            <img
                              src={group.image}
                              alt={cleanCategoryName}
                              loading="lazy"
                              decoding="async"
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          </div>
                        )}

                        <div style={{ minWidth: 0, flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D4AF37', fontWeight: '600' }}>
                              Clinical Category
                            </span>
                            <span style={{ fontSize: '0.68rem', color: '#FFFFFF', background: 'rgba(212, 175, 55, 0.2)', padding: '0.15rem 0.5rem', borderRadius: '4px', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
                              {group.items.length} Options
                            </span>
                          </div>

                          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.35rem, 2.5vw, 1.9rem)', color: '#FFFFFF', fontWeight: '500', lineHeight: '1.2' }}>
                            {cleanCategoryName}
                          </h2>

                          {group.subtitle && (
                            <div style={{ fontSize: '0.85rem', color: '#E5D5AA', marginTop: '0.35rem', fontWeight: '400' }}>
                              {group.subtitle}
                            </div>
                          )}

                          {group.description && (
                            <p style={{ fontSize: '0.825rem', color: '#BBB6AC', marginTop: '0.35rem', fontWeight: '300', maxWidth: '640px', lineHeight: '1.5' }}>
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
                        className="btn-bronze category-cta-btn"
                        style={{
                          padding: '0.6rem 1.25rem',
                          fontSize: '0.78rem',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.45rem',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        <MessageCircle size={14} /> Enquire via WhatsApp
                      </a>
                    </div>

                    {/* Treatment Rows with Tier Badges */}
                    <div style={{ padding: 'clamp(1.25rem, 3vw, 2rem) clamp(1rem, 3vw, 2.5rem)' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.5rem' }}>
                        {group.items.map((item, itemIdx) => (
                          <div
                            key={itemIdx}
                            style={{
                              background: '#FAF7F2',
                              border: '1px solid rgba(168, 127, 61, 0.2)',
                              borderRadius: 'var(--radius-sm)',
                              padding: '1.5rem',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'space-between',
                              transition: 'transform 0.2s, box-shadow 0.2s',
                            }}
                          >
                            <div>
                              <h3 style={{ fontSize: '1.05rem', fontWeight: '600', color: '#1C1B18', marginBottom: '1rem', lineHeight: '1.35' }}>
                                {item.name}
                              </h3>

                              {/* Price Breakdown Grid */}
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
                                {item.single && (
                                  <div style={{ background: '#FFFFFF', padding: '0.4rem 0.75rem', borderRadius: '4px', border: '1px solid rgba(28, 27, 24, 0.1)', fontSize: '0.825rem' }}>
                                    <span style={{ color: '#7A756C' }}>Single: </span>
                                    <strong style={{ color: '#1C1B18' }}>{item.single}</strong>
                                  </div>
                                )}
                                {item.oneOff && (
                                  <div style={{ background: '#FFFFFF', padding: '0.4rem 0.75rem', borderRadius: '4px', border: '1px solid rgba(168, 127, 61, 0.35)', fontSize: '0.825rem' }}>
                                    <span style={{ color: '#A87F3D' }}>One Off: </span>
                                    <strong style={{ color: '#A87F3D' }}>{item.oneOff}</strong>
                                  </div>
                                )}
                                {item.sessions3 && (
                                  <div style={{ background: '#FFFFFF', padding: '0.4rem 0.75rem', borderRadius: '4px', border: '1px solid rgba(168, 127, 61, 0.35)', fontSize: '0.825rem' }}>
                                    <span style={{ color: '#A87F3D' }}>3 Sessions: </span>
                                    <strong style={{ color: '#A87F3D' }}>{item.sessions3}</strong>
                                  </div>
                                )}
                                {item.course6 && (
                                  <div style={{ background: '#FFFFFF', padding: '0.4rem 0.75rem', borderRadius: '4px', border: '1px solid rgba(168, 127, 61, 0.35)', fontSize: '0.825rem' }}>
                                    <span style={{ color: '#A87F3D' }}>6 Sessions: </span>
                                    <strong style={{ color: '#A87F3D' }}>{item.course6}</strong>
                                  </div>
                                )}
                                {item.course8 && (
                                  <div style={{ background: '#FFFFFF', padding: '0.4rem 0.75rem', borderRadius: '4px', border: '1px solid rgba(168, 127, 61, 0.35)', fontSize: '0.825rem' }}>
                                    <span style={{ color: '#A87F3D' }}>8 Sessions: </span>
                                    <strong style={{ color: '#A87F3D' }}>{item.course8}</strong>
                                  </div>
                                )}
                                {item.course10 && (
                                  <div style={{ background: '#FFFFFF', padding: '0.4rem 0.75rem', borderRadius: '4px', border: '1px solid rgba(168, 127, 61, 0.35)', fontSize: '0.825rem' }}>
                                    <span style={{ color: '#A87F3D' }}>10 Sessions: </span>
                                    <strong style={{ color: '#A87F3D' }}>{item.course10}</strong>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div style={{ borderTop: '1px solid rgba(28, 27, 24, 0.08)', paddingTop: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ fontSize: '0.72rem', color: '#7A756C' }}>76 Cleveland Street</span>
                              <a
                                href={`https://wa.me/447342052249?text=${encodeURIComponent(
                                  `Hello Allure Passions UK, I would like to book ${item.name} (${cleanCategoryName}).`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ fontSize: '0.785rem', color: '#A87F3D', fontWeight: '600', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                              >
                                Book Protocol →
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Practice Consultation Banner */}
        <div
          style={{
            background: '#141312',
            color: '#FFFFFF',
            border: '1px solid rgba(168, 127, 61, 0.35)',
            borderRadius: 'var(--radius-sm)',
            padding: 'clamp(2rem, 4vw, 3rem) clamp(1.25rem, 4vw, 2.5rem)',
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
              Fitzrovia Private Clinic
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#FFFFFF' }}>
              Bespoke Multi-Modality Treatment Planning
            </h3>
            <p style={{ color: '#ECE8E1', fontSize: '0.95rem', marginTop: '0.4rem', fontWeight: '300', maxWidth: '600px' }}>
              Connect directly with Abigail and our clinical team to plan a customized program tailored to your unique anatomical profile.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href={`https://wa.me/447342052249?text=${encodeURIComponent(
                'Hello Allure Passions UK, I would like to consult regarding a bespoke treatment package.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-bronze"
              style={{
                padding: '0.85rem 1.8rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <MessageCircle size={16} /> WhatsApp Consultation
            </a>
            <a
              href={`tel:${CLINIC_INFO.phone.replace(/\s+/g, '')}`}
              className="btn-outline-bronze"
              style={{
                padding: '0.85rem 1.8rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#FFFFFF',
                borderColor: 'rgba(212, 175, 55, 0.5)',
              }}
            >
              <Phone size={16} /> Call Clinic
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
