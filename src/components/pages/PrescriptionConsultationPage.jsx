import React, { useState } from 'react';
import { PRODUCTS } from '../../data/treatmentData';
import { ArrowLeft, Lock, ShieldAlert, ShoppingBag, MessageCircle, Phone, Mail } from 'lucide-react';

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
        <div style={{ maxWidth: '850px', marginBottom: '3rem' }}>
          <div className="badge-bronze" style={{ marginBottom: '1rem' }}>
            <Lock size={14} /> Clinical Skincare & Prescription Hub
          </div>

          <h1 className="heading-xl" style={{ color: '#1C1B18', marginBottom: '1rem' }}>
            Prescription & Medical <span className="text-bronze-gradient">Skincare</span>
          </h1>

          <p style={{ fontSize: '1.15rem', color: '#4A4740', fontWeight: '300', lineHeight: '1.75' }}>
            Consultation-led clinical skincare. In accordance with UK clinical legislation, active retinoic acid treatments require prior medical assessment by our Level 6 practitioner prior to collection.
          </p>
        </div>

        {/* Legal Regulatory Callout Banner */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid rgba(239, 68, 68, 0.35)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem 1.75rem',
          marginBottom: '3rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem',
          boxShadow: '0 4px 15px rgba(28, 27, 24, 0.03)'
        }}>
          <ShieldAlert size={28} color="#EF4444" style={{ flexShrink: 0 }} />
          <div>
            <div style={{ fontWeight: '600', color: '#1C1B18', fontSize: '0.95rem' }}>
              UK Medical Compliance Notice: Prescription Tretinoin (POM)
            </div>
            <div style={{ fontSize: '0.875rem', color: '#4A4740', marginTop: '0.2rem', fontWeight: '300', lineHeight: '1.6' }}>
              Tretinoin is a Prescription-Only Medicine (POM). In accordance with UK clinical guidelines, <strong>direct online checkout is strictly prohibited</strong>. Complete the medical consultation questionnaire below for practitioner evaluation. <strong>All payments and product collections are completed physically in-clinic at 189 Brompton Road, Knightsbridge, London SW3 1NE.</strong>
            </div>
          </div>
        </div>

        {/* Product Selection Tabs */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveTab('tretinoin')}
            style={{
              flex: '1 1 300px',
              padding: '1.35rem',
              background: activeTab === 'tretinoin' ? '#FFFFFF' : '#F4EFE6',
              border: activeTab === 'tretinoin' ? '2px solid #A87F3D' : '1px solid rgba(28,27,24,0.08)',
              borderRadius: 'var(--radius-md)',
              textAlign: 'left',
              cursor: 'pointer',
              boxShadow: activeTab === 'tretinoin' ? '0 6px 20px rgba(168, 127, 61, 0.1)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            <span className="badge-bronze" style={{ fontSize: '0.7rem', marginBottom: '0.4rem' }}>Prescription Only</span>
            <div style={{ fontWeight: '600', color: '#1C1B18', fontSize: '1.15rem', fontFamily: 'var(--font-serif)' }}>
              Tretinoin 0.025% & 0.1% Cream
            </div>
            <div style={{ fontSize: '0.825rem', color: '#7A756C', marginTop: '0.25rem' }}>
              Mandatory Clinical Consultation Protocol ({tretinoinProd.price})
            </div>
          </button>

          <button
            onClick={() => setActiveTab('kojivit')}
            style={{
              flex: '1 1 300px',
              padding: '1.35rem',
              background: activeTab === 'kojivit' ? '#FFFFFF' : '#F4EFE6',
              border: activeTab === 'kojivit' ? '2px solid #A87F3D' : '1px solid rgba(28,27,24,0.08)',
              borderRadius: 'var(--radius-md)',
              textAlign: 'left',
              cursor: 'pointer',
              boxShadow: activeTab === 'kojivit' ? '0 6px 20px rgba(168, 127, 61, 0.1)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            <span style={{ fontSize: '0.7rem', background: 'rgba(28,27,24,0.06)', color: '#1C1B18', padding: '0.2rem 0.6rem', borderRadius: '10px', display: 'inline-block', marginBottom: '0.4rem', fontWeight: '500' }}>
              Non-Prescription (OTC)
            </span>
            <div style={{ fontWeight: '600', color: '#1C1B18', fontSize: '1.15rem', fontFamily: 'var(--font-serif)' }}>
              Kojivit Ultra Brightening Cream
            </div>
            <div style={{ fontSize: '0.825rem', color: '#7A756C', marginTop: '0.25rem' }}>
              Reserve Online / In-Clinic Collection ({kojivitProd.price})
            </div>
          </button>
        </div>

        {/* Tab 1: Tretinoin Clinical Suitability & Prescription Review */}
        {activeTab === 'tretinoin' && (
          <div style={{ background: '#FFFFFF', border: '1px solid rgba(168, 127, 61, 0.3)', borderRadius: 'var(--radius-lg)', padding: '2.5rem', boxShadow: '0 8px 24px rgba(28,27,24,0.04)' }}>
            <div style={{ marginBottom: '2rem', borderBottom: '1px solid rgba(28,27,24,0.08)', paddingBottom: '1rem' }}>
              <h2 className="heading-md" style={{ color: '#1C1B18', fontSize: '1.6rem' }}>
                Tretinoin Clinical Suitability Evaluation
              </h2>
              <p style={{ color: '#7A756C', fontSize: '0.9rem', marginTop: '0.25rem', fontWeight: '300' }}>
                Step {step} of 3 — Clinical pre-screening prior to private practitioner consultation.
              </p>
            </div>

                {/* Stepper Header with Crisp Contrast */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: '#F4EFE6',
                  padding: '0.85rem 1.25rem',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: '2rem',
                  border: '1px solid rgba(28,27,24,0.06)'
                }}>
                  <div style={{ color: step >= 1 ? '#A87F3D' : '#7A756C', fontWeight: step === 1 ? '700' : '500', fontSize: '0.85rem' }}>
                    1. Strength & Focus
                  </div>
                  <span style={{ color: '#7A756C' }}>→</span>
                  <div style={{ color: step >= 2 ? '#A87F3D' : '#7A756C', fontWeight: step === 2 ? '700' : '500', fontSize: '0.85rem' }}>
                    2. Medical Safety
                  </div>
                  <span style={{ color: '#7A756C' }}>→</span>
                  <div style={{ color: step >= 3 ? '#A87F3D' : '#7A756C', fontWeight: step === 3 ? '700' : '500', fontSize: '0.85rem' }}>
                    3. Clinical Consultation
                  </div>
                </div>

                {/* Step 1 */}
                {step === 1 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                      <label style={{ display: 'block', color: '#1C1B18', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: '600' }}>
                        Required Retinoid Strength:
                      </label>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                        {['0.025%', '0.1%'].map(str => (
                          <button
                            key={str}
                            type="button"
                            onClick={() => setFormData({ ...formData, strength: str })}
                            style={{
                              background: formData.strength === str ? 'rgba(168, 127, 61, 0.12)' : '#FAF7F2',
                              border: formData.strength === str ? '2px solid #A87F3D' : '1px solid rgba(28,27,24,0.1)',
                              color: '#1C1B18',
                              padding: '1.25rem',
                              borderRadius: '6px',
                              textAlign: 'left',
                              cursor: 'pointer'
                            }}
                          >
                            <div style={{ fontWeight: '700', fontSize: '1.1rem', color: '#A87F3D' }}>Tretinoin {str}</div>
                            <div style={{ fontSize: '0.825rem', color: '#7A756C', marginTop: '0.35rem', fontWeight: '300', lineHeight: '1.5' }}>
                              {str === '0.025%' ? 'Starter Strength / Sensitive Skin / Initial Fine Lines' : 'Experienced Retinoid User / Melasma & Cellular Renewal'}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', color: '#1C1B18', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: '600' }}>
                        Primary Skin Indication:
                      </label>
                      <select
                        value={formData.primaryConcern}
                        onChange={e => setFormData({ ...formData, primaryConcern: e.target.value })}
                      >
                        <option value="Hyperpigmentation & Melasma">Hyperpigmentation & Melasma</option>
                        <option value="Severe / Persistent Acne">Severe / Persistent Acne</option>
                        <option value="Fine Lines & Photo-Ageing">Fine Lines & Photo-Ageing</option>
                        <option value="Texture & Epidermal Turnover">Texture & Epidermal Turnover</option>
                      </select>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                      <button type="button" onClick={() => setStep(2)} className="btn-bronze">
                        Next: Medical Safety Questions →
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2 */}
                {step === 2 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ background: 'rgba(239, 68, 68, 0.06)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: '6px', padding: '1rem', color: '#1C1B18', fontSize: '0.875rem' }}>
                      <strong style={{ color: '#EF4444' }}>Safety Requirement:</strong> Tretinoin is strictly contraindicated during pregnancy or breastfeeding.
                    </div>

                    <div>
                      <label style={{ display: 'block', color: '#1C1B18', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: '600' }}>
                        Are you currently pregnant, planning pregnancy, or breastfeeding?
                      </label>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        {['No', 'Yes'].map(opt => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setFormData({ ...formData, pregnantOrNursing: opt })}
                            style={{
                              background: formData.pregnantOrNursing === opt ? (opt === 'Yes' ? 'rgba(239,68,68,0.15)' : 'rgba(168,127,61,0.15)') : '#FAF7F2',
                              border: formData.pregnantOrNursing === opt ? (opt === 'Yes' ? '2px solid #EF4444' : '2px solid #A87F3D') : '1px solid rgba(28,27,24,0.1)',
                              color: '#1C1B18',
                              padding: '0.65rem 2rem',
                              borderRadius: '6px',
                              fontWeight: '600',
                              cursor: 'pointer'
                            }}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
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
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{
                      background: '#FAF7F2',
                      border: '1px solid rgba(168, 127, 61, 0.3)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1.75rem',
                    }}>
                      <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#A87F3D', fontWeight: '700', marginBottom: '0.5rem' }}>
                        Clinical Suitability Summary
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginTop: '1rem' }}>
                        <div>
                          <div style={{ fontSize: '0.8rem', color: '#7A756C' }}>Selected Medication</div>
                          <div style={{ fontWeight: '700', color: '#1C1B18', fontSize: '1.05rem', marginTop: '0.2rem' }}>Tretinoin Cream {formData.strength}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.8rem', color: '#7A756C' }}>Target Indication</div>
                          <div style={{ fontWeight: '600', color: '#1C1B18', fontSize: '1.05rem', marginTop: '0.2rem' }}>{formData.primaryConcern}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.8rem', color: '#7A756C' }}>Safety Contraindication Check</div>
                          <div style={{ fontWeight: '600', color: formData.pregnantOrNursing === 'No' ? '#16A34A' : '#DC2626', fontSize: '1.05rem', marginTop: '0.2rem' }}>
                            {formData.pregnantOrNursing === 'No' ? 'Cleared (Contraindications Absent)' : 'Contraindicated'}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div style={{
                      background: 'rgba(168, 127, 61, 0.06)',
                      border: '1px solid rgba(168, 127, 61, 0.25)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1.5rem',
                      display: 'flex',
                      gap: '1rem',
                      alignItems: 'flex-start',
                    }}>
                      <ShieldAlert size={22} color="#A87F3D" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div style={{ fontSize: '0.875rem', color: '#4A4740', lineHeight: '1.6' }}>
                        <strong>UK POM Regulatory Notice:</strong> Tretinoin is a Prescription-Only Medicine. In full compliance with UK medical regulations, we strictly operate a clinical consultation process with <strong>physical in-clinic collection and payment conducted at 189 Brompton Road, Knightsbridge, London SW3 1NE</strong> following practitioner review.
                      </div>
                    </div>

                    {/* Direct Consultation Channels */}
                    <div style={{ marginTop: '0.5rem' }}>
                      <div style={{ fontSize: '0.95rem', fontWeight: '600', color: '#1C1B18', marginBottom: '1rem' }}>
                        Contact Our Clinical Team Directly To Confirm Prescription:
                      </div>
                      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <a
                          href={`https://wa.me/447342052249?text=${encodeURIComponent(`Hello Allure Passions UK, I have completed the online suitability check for Tretinoin ${formData.strength} (Indication: ${formData.primaryConcern}) and would like to arrange a clinical prescription consultation.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-bronze"
                          style={{
                            padding: '0.9rem 2rem',
                            fontSize: '0.85rem',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                          }}
                        >
                          <MessageCircle size={16} />
                          <span>WhatsApp Clinical Team</span>
                        </a>

                        <a
                          href="tel:+447342052249"
                          style={{
                            padding: '0.9rem 1.8rem',
                            fontSize: '0.85rem',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            textDecoration: 'none',
                            color: '#1C1B18',
                            background: '#FFFFFF',
                            border: '1px solid rgba(168, 127, 61, 0.4)',
                            borderRadius: 'var(--radius-sm)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontWeight: '600',
                          }}
                        >
                          <Phone size={16} color="#A87F3D" />
                          <span>Call +44 7342 052249</span>
                        </a>

                        <a
                          href={`mailto:info@allurepassionsuk.com?subject=${encodeURIComponent(`Prescription Tretinoin ${formData.strength} Clinical Consultation`)}&body=${encodeURIComponent(`Hello Allure Passions UK,\n\nI would like to arrange a clinical consultation for Tretinoin ${formData.strength}.\nPrimary Concern: ${formData.primaryConcern}\nContraindications Cleared: ${formData.pregnantOrNursing === 'No' ? 'Yes' : 'No'}\n\nPlease advise your next available consultation appointment in Knightsbridge.`)}`}
                          style={{
                            padding: '0.9rem 1.8rem',
                            fontSize: '0.85rem',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            textDecoration: 'none',
                            color: '#4A4740',
                            background: '#FAF7F2',
                            border: '1px solid rgba(28, 27, 24, 0.15)',
                            borderRadius: 'var(--radius-sm)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontWeight: '500',
                          }}
                        >
                          <Mail size={16} color="#7A756C" />
                          <span>Email Medical Team</span>
                        </a>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '1.5rem' }}>
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
          <div style={{ background: '#FFFFFF', border: '1px solid rgba(168, 127, 61, 0.3)', borderRadius: 'var(--radius-lg)', padding: '2.5rem', boxShadow: '0 8px 24px rgba(28,27,24,0.04)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem', alignItems: 'center', marginBottom: '2.5rem' }}>
              <div style={{ textAlign: 'center', padding: '1.5rem', background: '#FAF7F2', borderRadius: 'var(--radius-md)' }}>
                <img
                  src={kojivitProd.image}
                  alt={kojivitProd.name}
                  loading="lazy"
                  decoding="async"
                  style={{ width: '220px', height: '220px', objectFit: 'contain' }}
                />
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', background: 'rgba(28,27,24,0.06)', color: '#1C1B18', padding: '0.2rem 0.6rem', borderRadius: '10px', fontWeight: '600' }}>
                  Non-Prescription Advanced Skincare
                </span>
                <h2 className="heading-lg" style={{ color: '#1C1B18', marginTop: '0.4rem', marginBottom: '0.2rem' }}>
                  {kojivitProd.name}
                </h2>
                <div style={{ fontSize: '1.25rem', color: '#A87F3D', fontWeight: '700', marginBottom: '1rem' }}>
                  {kojivitProd.price}
                </div>

                <p style={{ color: '#4A4740', fontSize: '0.95rem', lineHeight: '1.65', marginBottom: '1.25rem', fontWeight: '300' }}>
                  {kojivitProd.description}
                </p>

                <div style={{ fontSize: '0.85rem', color: '#7A756C', marginBottom: '1.5rem' }}>
                  <strong>Key Ingredients:</strong> {kojivitProd.ingredients}
                </div>

                <div style={{ background: 'rgba(168, 127, 61, 0.08)', padding: '1rem', borderRadius: '6px', border: '1px solid rgba(168, 127, 61, 0.2)', fontSize: '0.85rem', color: '#A87F3D', fontWeight: '500' }}>
                  <ShoppingBag size={14} style={{ display: 'inline', marginRight: '6px' }} />
                  Reserve online for clinic collection. Payment is made physically at 189 Brompton Road, Knightsbridge upon collection.
                </div>
              </div>
            </div>

            {/* Direct Clinic Reservation */}
            <div style={{ borderTop: '1px solid rgba(28,27,24,0.08)', paddingTop: '2rem' }}>
              <h3 className="heading-md" style={{ color: '#1C1B18', marginBottom: '0.5rem', fontSize: '1.35rem' }}>
                Reserve Kojivit Ultra for Clinic Collection
              </h3>
              <p style={{ color: '#7A756C', fontSize: '0.9rem', marginBottom: '1.5rem', fontWeight: '300' }}>
                Kojivit Ultra Cream (£45.00 / 30g) is available for direct reservation with physical collection and payment at 189 Brompton Road, Knightsbridge, London SW3 1NE.
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a
                  href="https://wa.me/447342052249?text=Hello%20Allure%20Passions%20UK,%20I%20would%20like%20to%20reserve%20a%20jar%20of%20Kojivit%20Ultra%20Cream%20for%20in-clinic%20collection%20at%20189%20Brompton%20Road."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-bronze"
                  style={{
                    padding: '0.9rem 2rem',
                    fontSize: '0.85rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <MessageCircle size={16} />
                  <span>Reserve via WhatsApp</span>
                </a>

                <a
                  href="tel:+447342052249"
                  style={{
                    padding: '0.9rem 1.8rem',
                    fontSize: '0.85rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    color: '#1C1B18',
                    background: '#FFFFFF',
                    border: '1px solid rgba(168, 127, 61, 0.4)',
                    borderRadius: 'var(--radius-sm)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontWeight: '600',
                  }}
                >
                  <Phone size={16} color="#A87F3D" />
                  <span>Call Dispensary (+44 7342 052249)</span>
                </a>

                <a
                  href="mailto:info@allurepassionsuk.com?subject=Kojivit%20Ultra%20Cream%20Reservation&body=Hello%20Allure%20Passions%20UK,%0A%0AI%20would%20like%20to%20reserve%20a%20jar%20of%20Kojivit%20Ultra%20Cream%20for%20in-clinic%20collection%20at%20189%20Brompton%20Road.%0A%0AThank%20you."
                  style={{
                    padding: '0.9rem 1.8rem',
                    fontSize: '0.85rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    color: '#4A4740',
                    background: '#FAF7F2',
                    border: '1px solid rgba(28, 27, 24, 0.15)',
                    borderRadius: 'var(--radius-sm)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontWeight: '500',
                  }}
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
