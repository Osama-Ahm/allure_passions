import React, { useId, useRef, useState } from 'react';
import { ArrowRight, Check, MessageCircle } from 'lucide-react';
import { CLINIC_INFO, FULL_PRICELIST } from '../data/treatmentData';
import SplitWords from '../motion/SplitWords';
import { routeLinkHandler } from '../utils/navigation';
import { withTrademarks } from '../utils/trademarks';
import './PricingMenuSection.css';

const COURSE_FIELDS = [
  ['sessions3', '3 sessions'],
  ['course6', '6 sessions'],
  ['course8', '8 sessions'],
  ['course10', '10 sessions'],
];

// Homepage highlights only. Fees are looked up in FULL_PRICELIST so they always
// match the official schedule on /pricing.
const MENU_TABS = [
  {
    id: 'tightening',
    label: 'Skin Tightening',
    shortLabel: 'Tightening',
    platforms: 'Morpheus8™ & Sofwave™',
    rows: [
      { category: 'Ultra Tightening Treatments', item: 'Morpheus8 - Full Face', device: 'Morpheus8™', name: 'Full Face' },
      { category: 'Ultra Tightening Treatments', item: 'Morpheus8 - Face & Neck', device: 'Morpheus8™', name: 'Face & Neck' },
      { category: 'Ultra Tightening Treatments', item: 'Morpheus8 - Eyes', device: 'Morpheus8™', name: 'Eyes' },
      { category: 'Ultra Tightening Treatments', item: 'Sofwave - Brow Lift', device: 'Sofwave™', name: 'Brow Lift' },
      { category: 'Ultra Tightening Treatments', item: 'Sofwave - Full Face, Neck & Brow', device: 'Sofwave™', name: 'Full Face, Neck & Brow Lift' },
    ],
  },
  {
    id: 'laser',
    label: 'Laser & Pigmentation',
    shortLabel: 'Laser',
    platforms: 'PicoWay® & ADVATx®',
    rows: [
      { category: 'Skin Renewal & Resurfacing', item: 'Hyperpigmentation - Full Face & Neck', device: 'PicoWay®', name: 'Hyperpigmentation, Full Face & Neck' },
      { category: 'Skin Renewal & Resurfacing', item: 'Acne Scarring - Full Face', device: 'PicoWay®', name: 'Acne Scarring, Full Face' },
      { category: 'Vascular & Complexion Clarity', item: 'Telangiectasias (Facial Veins)', device: 'ADVATx®', name: 'Facial Veins' },
      { category: 'Vascular & Complexion Clarity', item: 'Skin Rejuvenation – Full Face', device: 'ADVATx®', name: 'Skin Rejuvenation, Full Face' },
      { category: 'Vascular & Complexion Clarity', item: 'Lip Plumping (Rejuvenation)', device: 'ADVATx®', name: 'Laser Lip Plumping' },
    ],
  },
  {
    id: 'peels_facials',
    label: 'Peels & Facials',
    shortLabel: 'Peels & Facials',
    platforms: 'Cosmelan®, HydraFacial & BioRePeel',
    rows: [
      { category: 'Skin Peel Rejuvenation', item: 'Cosmelan Depigmentation Peel (Full Face with Prep)', device: 'Cosmelan®', name: 'Cosmelan Depigmentation Peel' },
      { category: 'Skin Peel Rejuvenation', item: 'BioRePeel 35% Peel', device: 'BioRePeelCl₃®', name: 'BioRePeel 35% Face' },
      { category: 'Immersive Hydration Skin Renewal', item: 'HydraFacial Signature (30 min)', device: 'HydraFacial®', name: 'HydraFacial Signature' },
      { category: 'Immersive Hydration Skin Renewal', item: 'HydraFacial Platinum (60 min)', device: 'HydraFacial®', name: 'HydraFacial Platinum' },
      { category: 'Dermal Renaissance', item: 'Microneedling with Exosomes | Face', device: 'Exosomes', name: 'Microneedling with Exosomes' },
    ],
  },
  {
    id: 'body',
    label: 'Body Sculpting',
    shortLabel: 'Body',
    platforms: 'Emsculpt Neo® & Emerald™',
    rows: [
      { category: 'Body Sculpting Packages', item: 'Allure Contour Synergy (Emsculpt Neo – 6 Sessions)', device: 'Emsculpt Neo®', name: 'Allure Contour Synergy' },
      { category: 'Body Sculpting Packages', item: 'Allure Contour Luxe (Neo + Emerald – 6 Sessions)', device: 'Emsculpt Neo® + Emerald™', name: 'Allure Contour Luxe' },
      { category: 'Body Sculpting Packages', item: 'Allure Contour Advanced (Neo + Emerald + Meso – 6 Sessions)', device: 'Neo® + Emerald™ + Meso', name: 'Allure Contour Advanced' },
      { category: 'Body Sculpting Packages', item: 'Emerald Laser Body Slim (10 Sessions)', device: 'Emerald™ Green Laser', name: 'Body Slim Programme' },
    ],
  },
].map((tab) => {
  const categories = [...new Set(tab.rows.map((row) => row.category))];
  const rows = tab.rows
    .map((row) => {
      const fee = FULL_PRICELIST.find((entry) => entry.category === row.category)?.items.find((item) => item.name === row.item);
      if (!fee) return null;
      const course = COURSE_FIELDS.find(([field]) => fee[field]);
      return {
        ...row,
        session: fee.single || fee.oneOff,
        course: course ? { label: course[1], price: fee[course[0]] } : null,
      };
    })
    .filter(Boolean);
  const total = categories.reduce(
    (sum, name) => sum + (FULL_PRICELIST.find((entry) => entry.category === name)?.items.length || 0),
    0
  );
  return { ...tab, rows, total };
});

const whatsappLink = (message) =>
  `https://wa.me/${CLINIC_INFO.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;

export default function PricingMenuSection({ onNavigate }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef([]);
  const idBase = useId();
  const activeTab = MENU_TABS[activeIndex];

  const handleTabKeyDown = (event, index) => {
    const last = MENU_TABS.length - 1;
    const nextIndex = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    }[event.key];
    if (nextIndex === undefined) return;
    event.preventDefault();
    setActiveIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <section id="treatment-pricing" className="menu" aria-labelledby="menu-title">
      <div className="ap-container menu__layout">
        <div className="menu__intro">
          <div className="ap-head__title">
            <span className="ap-eyebrow" data-reveal>Transparent Clinical Investment</span>
            <h2 id="menu-title" className="ap-display" data-reveal="words">
              <SplitWords>
                Treatment Menu <em>&amp; Pricing</em>
              </SplitWords>
            </h2>
          </div>

          <div className="menu__intro-body" data-reveal>
            <p className="ap-lede">
              Clear fees for single sessions and complete courses, so you can plan your treatment journey with
              confidence before you visit.
            </p>

            <ul className="menu__points">
              <li>
                <Check size={15} strokeWidth={2} aria-hidden="true" />
                Session and course fees, side by side
              </li>
              <li>
                <Check size={15} strokeWidth={2} aria-hidden="true" />
                Your personalised plan is confirmed at consultation
              </li>
              <li>
                <Check size={15} strokeWidth={2} aria-hidden="true" />
                Full schedule across eight treatment categories
              </li>
            </ul>

            <a href="/pricing" className="ap-btn ap-btn--solid" onClick={routeLinkHandler(onNavigate, 'pricing')}>
              <span>View Full Price List</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

        <div className="menu__card" data-reveal="frame">
          <div
            className="menu__tabs"
            role="tablist"
            aria-label="Treatment categories"
            style={{ '--tab-count': MENU_TABS.length, '--tab-index': activeIndex }}
          >
            <span className="menu__tab-indicator" aria-hidden="true" />
            {MENU_TABS.map((tab, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={tab.id}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  type="button"
                  role="tab"
                  id={`${idBase}-tab-${tab.id}`}
                  aria-selected={isActive}
                  aria-controls={`${idBase}-panel`}
                  tabIndex={isActive ? 0 : -1}
                  aria-label={tab.label}
                  className={`menu__tab${isActive ? ' is-active' : ''}`}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                >
                  <span className="menu__tab-label">{tab.label}</span>
                  <span className="menu__tab-label menu__tab-label--short">{tab.shortLabel}</span>
                </button>
              );
            })}
          </div>

          <div
            id={`${idBase}-panel`}
            role="tabpanel"
            aria-labelledby={`${idBase}-tab-${activeTab.id}`}
            className="menu__panel"
          >
            <div className="menu__panel-head">
              <p className="menu__platforms">{withTrademarks(activeTab.platforms)}</p>
              <span className="menu__column-label" aria-hidden="true">Per session</span>
              <span className="menu__column-label" aria-hidden="true">Course</span>
            </div>

            <ul key={activeTab.id} className="menu__rows">
              {activeTab.rows.map((row, index) => (
                <li key={row.item} className="menu__row" style={{ '--i': index }}>
                  <div className="menu__treatment">
                    <span className="menu__device">{row.device}</span>
                    <span className="menu__name">{row.name}</span>
                  </div>
                  <div className="menu__fee">
                    <span className="menu__fee-label">Per session</span>
                    <span className="menu__amount">{row.session}</span>
                  </div>
                  <div className="menu__fee">
                    {row.course ? (
                      <>
                        <span className="menu__fee-label menu__fee-label--course">{row.course.label}</span>
                        <span className="menu__amount">{row.course.price}</span>
                      </>
                    ) : (
                      <span className="menu__one-off">One-off treatment</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="menu__panel-foot">
              <span className="menu__count">
                Showing {activeTab.rows.length} of {activeTab.total} treatments
              </span>
              <a
                className="ap-link menu__enquire"
                href={whatsappLink(
                  `Hello ${CLINIC_INFO.name}, I would like to enquire about ${activeTab.label.toLowerCase()} treatments and pricing.`
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={15} aria-hidden="true" />
                <span>Enquire about {activeTab.label}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
