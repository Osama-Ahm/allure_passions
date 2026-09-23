import React, { useState } from 'react';
import { PRODUCTS } from '../../data/treatmentData';
import { ArrowLeft, Lock, ShieldAlert, ShoppingBag, MessageCircle, Phone, Mail } from 'lucide-react';
import ResponsiveImg from '../ui/ResponsiveImg';
import './PrescriptionConsultationPage.css';

const INDICATIONS = [
  'Hyperpigmentation & Melasma',
  'Severe / Persistent Acne',
  'Fine Lines & Photo-Ageing',
  'Texture & Epidermal Turnover',
];

export default function PrescriptionConsultationPage({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('tretinoin');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    strength: '0.025%',
    skinType: 'Normal / Combination',
    primaryConcern: 'Hyperpigmentation & Melasma',
    currentRetinoid: 'No prior retinoid use',
    pregnantOrNursing: 'No',
    activeInfectionsOrEczema: 'No',
  });

  const tretinoinProd = PRODUCTS.find(p => p.id === 'tretinoin_prescription') || PRODUCTS[1];
  const kojivitProd = PRODUCTS.find(p => p.id === 'kojivit_ultra') || PRODUCTS[0];

  return (
    <div className="ap-rx">
      <div className="ap-rx__container">
        
        {/* Back Link */}
        <button
          onClick={() => onNavigate('home')}
          className="ap-rx__back"
        >
          <ArrowLeft size={14} /> Back to Homepage
        </button>

        {/* Page Header */}
        <header className="ap-rx__header">
          <div className="ap-rx__badge">
            <Lock size={13} />
            <span>Clinical Skincare &amp; Prescription Hub</span>
          </div>

          <h1 className="ap-rx__title">
            Prescription &amp; Medical <span className="text-bronze-gradient">Skincare</span>
          </h1>

          <p className="ap-rx__lead">
            Consultation-led clinical skincare. In accordance with UK clinical legislation, active retinoic acid treatments require prior medical assessment by our Level 6 practitioner prior to collection.
          </p>
        </header>

        {/* Legal Regulatory Callout Banner */}
        <div className="ap-rx__notice">
          <ShieldAlert size={28} className="ap-rx__notice-icon" />
          <div>
            <div className="ap-rx__notice-title">
              UK Medical Compliance Notice: Prescription Tretinoin (POM)
            </div>
            <div className="ap-rx__notice-text">
              Tretinoin is a Prescription-Only Medicine (POM). In accordance with UK clinical guidelines, <strong>direct online checkout is strictly prohibited</strong>. Complete the medical consultation questionnaire below for practitioner evaluation. <strong>All payments and product collections are completed physically in-clinic at 76 Cleveland Street, Fitzrovia, London W1T 6NB.</strong>
            </div>
          </div>
        </div>

        {/* Product Selection Tabs */}
        <div className="ap-rx__product-tabs">
          <button
            type="button"
            onClick={() => setActiveTab('tretinoin')}
            className={`ap-rx__product-tab ${activeTab === 'tretinoin' ? 'is-active' : ''}`}
          >
            <span className="ap-rx__product-tab-tag ap-rx__product-tab-tag--pom">Prescription Only</span>
            <h3 className="ap-rx__product-tab-name">
              Tretinoin 0.025% &amp; 0.1% Cream
            </h3>
            <p className="ap-rx__product-tab-desc">
              Mandatory Clinical Consultation Protocol ({tretinoinProd.price})
            </p>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('kojivit')}
            className={`ap-rx__product-tab ${activeTab === 'kojivit' ? 'is-active' : ''}`}
          >
            <span className="ap-rx__product-tab-tag ap-rx__product-tab-tag--otc">Non-Prescription (OTC)</span>
            <h3 className="ap-rx__product-tab-name">
              Kojivit Ultra Brightening Cream
            </h3>
            <p className="ap-rx__product-tab-desc">
              Reserve Online / In-Clinic Collection ({kojivitProd.price})
            </p>
          </button>
        </div>

        {/* Tab 1: Tretinoin Clinical Suitability & Prescription Review */}
        {activeTab === 'tretinoin' && (
          <div className="ap-rx__card">
            <div className="ap-rx__card-head">
              <h2 className="ap-rx__card-title">
                Tretinoin Clinical Suitability Evaluation
              </h2>
              <p className="ap-rx__card-sub">
                Step {step} of 3 — Clinical pre-screening prior to private practitioner consultation.
              </p>
            </div>

            {/* Stepper Header */}
            <div className="ap-rx__stepper">
              <div className={`ap-rx__stepper-step ${step === 1 ? 'is-active' : (step > 1 ? 'is-complete' : '')}`}>
                1. Strength &amp; Focus
              </div>
              <span className="ap-rx__stepper-arrow" aria-hidden="true">→</span>
              <div className={`ap-rx__stepper-step ${step === 2 ? 'is-active' : (step > 2 ? 'is-complete' : '')}`}>
                2. Medical Safety
              </div>
              <span className="ap-rx__stepper-arrow" aria-hidden="true">→</span>
              <div className={`ap-rx__stepper-step ${step === 3 ? 'is-active' : ''}`}>
                3. Clinical Consultation
              </div>
            </div>

            {/* Step 1 */}
            {step === 1 && (
              <div className="ap-rx__section-group">
                <div className="ap-rx__product-preview">
                  <div className="ap-rx__product-thumb">
                    <ResponsiveImg
                      src={formData.strength === '0.1%' ? '/assets/images/tretiheal_01.png' : '/assets/images/tretiheal-0025-pack.webp'}
                      sizes="120px"
                      alt={`Tretiheal Tretinoin Cream USP ${formData.strength} (20g)`}
                      style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }}
                    />
                  </div>
                  <div className="ap-rx__product-copy">
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#A87F3D' }}>
                      Clinical Prescription Product
                    </span>
                    <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.1rem', margin: '0.2rem 0', color: '#1C1B18' }}>
                      Tretiheal Tretinoin Cream USP {formData.strength} (20g)
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: '#6A655C', margin: 0 }}>
                      Manufactured by Healing Pharma. Clinical-grade retinoic acid therapy dispensed exclusively following patient suitability assessment.
                    </p>
                  </div>
                </div>

                <div>
                  <label className="ap-rx__field-label">
                    Required Retinoid Strength:
                  </label>
                  <div className="ap-rx__strength-grid">
                    {['0.025%', '0.1%'].map(str => (
                      <button
                        key={str}
                        type="button"
                        onClick={() => setFormData({ ...formData, strength: str })}
                        className={`ap-rx__strength-btn ${formData.strength === str ? 'is-selected' : ''}`}
                      >
                        <div className="ap-rx__strength-val">Tretinoin {str}</div>
                        <div className="ap-rx__strength-hint">
                          {str === '0.025%' ? 'Starter Strength / Sensitive Skin / Initial Fine Lines' : 'Experienced Retinoid User / Melasma & Cellular Renewal'}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div id="rx-indication-label" className="ap-rx__field-label">
                    Primary Skin Indication:
                  </div>
                  <div
                    role="group"
                    aria-labelledby="rx-indication-label"
                    className="ap-rx__indication-grid"
                  >
                    {INDICATIONS.map(indication => {
                      const selected = formData.primaryConcern === indication;
                      return (
                        <button
                          key={indication}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => setFormData({ ...formData, primaryConcern: indication })}
                          className={`ap-rx__indication-btn ${selected ? 'is-selected' : ''}`}
                        >
                          {indication}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="ap-rx__nav-actions">
                  <button type="button" onClick={() => setStep(2)} className="btn-bronze">
                    Next: Medical Safety Questions →
                  </button>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="ap-rx__section-group">
                <div className="ap-rx__contraindication-box">
                  <strong style={{ color: '#EF4444' }}>Safety Requirement:</strong> Tretinoin is strictly contraindicated during pregnancy or breastfeeding.
                </div>

                <div>
                  <label className="ap-rx__field-label">
                    Are you currently pregnant, planning pregnancy, or breastfeeding?
                  </label>
                  <div className="ap-rx__binary-group">
                    {['No', 'Yes'].map(opt => {
                      const isSelected = formData.pregnantOrNursing === opt;
                      const modifier = opt === 'Yes' ? 'is-selected-warn' : 'is-selected-safe';
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setFormData({ ...formData, pregnantOrNursing: opt })}
                          className={`ap-rx__binary-btn ${isSelected ? modifier : ''}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="ap-rx__nav-actions ap-rx__nav-actions--between">
                  <button type="button" onClick={() => setStep(1)} className="btn-outline-bronze">
                    ← Back
                  </button>
                  <button type="button" onClick={() => setStep(3)} className="btn-bronze">
                    Next: Clinical Review →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Direct Clinical Review & Consultation */}
            {step === 3 && (
              <div className="ap-rx__section-group">
                <div className="ap-rx__summary-box">
                  <div className="ap-rx__summary-eyebrow">
                    Clinical Suitability Summary
                  </div>
                  <div className="ap-rx__summary-grid">
                    <div>
                      <div className="ap-rx__summary-label">Selected Medication</div>
                      <div className="ap-rx__summary-value">Tretinoin Cream {formData.strength}</div>
                    </div>
                    <div>
                      <div className="ap-rx__summary-label">Target Indication</div>
                      <div className="ap-rx__summary-value">{formData.primaryConcern}</div>
                    </div>
                    <div>
                      <div className="ap-rx__summary-label">Safety Contraindication Check</div>
                      <div className={`ap-rx__summary-value ${formData.pregnantOrNursing === 'No' ? 'ap-rx__summary-value--cleared' : 'ap-rx__summary-value--alert'}`}>
                        {formData.pregnantOrNursing === 'No' ? 'Cleared (Contraindications Absent)' : 'Contraindicated'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ap-rx__compliance-notice">
                  <ShieldAlert size={22} color="#A87F3D" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div className="ap-rx__compliance-text">
                    <strong>UK POM Regulatory Notice:</strong> Tretinoin is a Prescription-Only Medicine. In full compliance with UK medical regulations, we strictly operate a clinical consultation process with <strong>physical in-clinic collection and payment conducted at 76 Cleveland Street, Fitzrovia, London W1T 6NB</strong> following practitioner review.
                  </div>
                </div>

                {/* Direct Consultation Channels */}
                <div>
                  <div className="ap-rx__contact-title">
                    Contact Our Clinical Team Directly To Confirm Prescription:
                  </div>
                  <div className="ap-rx__contact-channels">
                    <a
                      href={`https://wa.me/447342052249?text=${encodeURIComponent(`Hello Allure Passions UK, I have completed the online suitability check for Tretinoin ${formData.strength} (Indication: ${formData.primaryConcern}) and would like to arrange a clinical prescription consultation.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ap-rx__contact-btn ap-rx__contact-btn--whatsapp"
                    >
                      <MessageCircle size={16} />
                      <span>WhatsApp Clinical Team</span>
                    </a>

                    <a
                      href="tel:+447342052249"
                      className="ap-rx__contact-btn ap-rx__contact-btn--phone"
                    >
                      <Phone size={16} color="#A87F3D" />
                      <span>Call +44 7342 052249</span>
                    </a>

                    <a
                      href={`mailto:info@allurepassionsuk.com?subject=${encodeURIComponent(`Prescription Tretinoin ${formData.strength} Clinical Consultation`)}&body=${encodeURIComponent(`Hello Allure Passions UK,\n\nI would like to arrange a clinical consultation for Tretinoin ${formData.strength}.\nPrimary Concern: ${formData.primaryConcern}\nContraindications Cleared: ${formData.pregnantOrNursing === 'No' ? 'Yes' : 'No'}\n\nPlease advise your next available consultation appointment in Fitzrovia.`)}`}
                      className="ap-rx__contact-btn ap-rx__contact-btn--email"
                    >
                      <Mail size={16} color="#7A756C" />
                      <span>Email Medical Team</span>
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '1rem' }}>
                  <button type="button" onClick={() => setStep(2)} className="btn-outline-bronze">
                    ← Back to Safety Questions
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Kojivit Product Details & Order Request */}
        {activeTab === 'kojivit' && (
          <div className="ap-rx__card">
            <div className="ap-rx__showcase">
              <div className="ap-rx__media-box">
                <ResponsiveImg
                  src={kojivitProd.image}
                  sizes="220px"
                  alt={kojivitProd.name}
                  loading="lazy"
                  decoding="async"
                  className="ap-rx__media-img"
                />
              </div>

              <div>
                <span className="ap-rx__showcase-tag">
                  Non-Prescription Advanced Skincare
                </span>
                <h2 className="ap-rx__showcase-title">
                  {kojivitProd.name}
                </h2>
                <div className="ap-rx__showcase-price">
                  {kojivitProd.price}
                </div>

                <p className="ap-rx__showcase-desc">
                  {kojivitProd.description}
                </p>

                <div className="ap-rx__showcase-ingredients">
                  <strong>Key Ingredients:</strong> {kojivitProd.ingredients}
                </div>

                <div className="ap-rx__showcase-badge">
                  <ShoppingBag size={15} style={{ flexShrink: 0 }} />
                  <span>Reserve online for clinic collection. Payment is made physically at 76 Cleveland Street, Fitzrovia upon collection.</span>
                </div>
              </div>
            </div>

            {/* Direct Clinic Reservation */}
            <div className="ap-rx__reservation-box">
              <h3 className="ap-rx__reservation-title">
                Reserve Kojivit Ultra for Clinic Collection
              </h3>
              <p className="ap-rx__reservation-text">
                Kojivit Ultra Gel (£45.00 / 30g) is available for direct reservation with physical collection and payment at 76 Cleveland Street, Fitzrovia, London W1T 6NB.
              </p>

              <div className="ap-rx__contact-channels">
                <a
                  href="https://wa.me/447342052249?text=Hello%20Allure%20Passions%20UK,%20I%20would%20like%20to%20reserve%20a%20tube%20of%20Kojivit%20Ultra%20Gel%20(30g)%20for%20in-clinic%20collection%20at%2076%20Cleveland%20Street."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ap-rx__contact-btn ap-rx__contact-btn--whatsapp"
                >
                  <MessageCircle size={16} />
                  <span>Reserve via WhatsApp</span>
                </a>

                <a
                  href="tel:+447342052249"
                  className="ap-rx__contact-btn ap-rx__contact-btn--phone"
                >
                  <Phone size={16} color="#A87F3D" />
                  <span>Call Dispensary (+44 7342 052249)</span>
                </a>

                <a
                  href="mailto:info@allurepassionsuk.com?subject=Kojivit%20Ultra%20Cream%20Reservation&body=Hello%20Allure%20Passions%20UK,%0A%0AI%20would%20like%20to%20reserve%20a%20jar%20of%20Kojivit%20Ultra%20Cream%20for%20in-clinic%20collection%20at%2076%20Cleveland%20Street.%0A%0AThank%20you."
                  className="ap-rx__contact-btn ap-rx__contact-btn--email"
                >
                  <Mail size={16} color="#7A756C" />
                  <span>Email Dispensary</span>
                </a>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
