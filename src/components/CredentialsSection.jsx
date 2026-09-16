import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function CredentialsSection() {
  const accreditations = [
    {
      id: "jccp",
      regNo: "JCCP Reg #UK-88421",
      title: "JCCP Accredited Register",
      authority: "Joint Council for Cosmetic Practitioners",
      standard: "Official UK Government-Recognised Safety Registry",
      details: "Operating under the Joint Council for Cosmetic Practitioners (JCCP) and Professional Standards Authority (PSA) code of practice. Guarantees strict patient safety, ethical consultations, and sterile clinical premises.",
      sealText: "JCCP OFFICIAL REGISTER",
    },
    {
      id: "level6",
      regNo: "Level 6 Clinical Practice",
      title: "Level 6 Advanced Aesthetic Practitioner",
      authority: "Higher National Clinical Qualification",
      standard: "Advanced Subdermal Anatomy & Laser Physics Mastery",
      details: "Holding the highest Tier 6 clinical aesthetic qualification in the UK. Comprehensive mastery of dermal histology, skin pathology, laser-tissue interactions, and emergency protocols.",
      sealText: "LEVEL 6 QUALIFIED",
    },
    {
      id: "ghp2026",
      regNo: "GHP Award Winner 2026",
      title: "GHP Global Excellence Award",
      authority: "Global Health & Pharma (GHP Magazine)",
      standard: "Best Advanced Skin & Body Aesthetics Clinic 2026 – London",
      details: "Recognised nationally by healthcare editors for non-invasive clinical innovation, medical device safety, and transformative patient outcomes across Fitzrovia and Greater London.",
      sealText: "GHP 2026 WINNER",
    },
    {
      id: "tech_mastery",
      regNo: "Manufacturer Certified",
      title: "Device Masterclass Certifications",
      authority: "Candela, InMode, Sofwave & BTL Medical Systems",
      standard: "PicoWay, ADVATx, Morpheus8, Sofwave & Emsculpt Neo",
      details: "Direct manufacturer clinical mastery certification. Every laser wavelength, ultrasound focal depth, and RF energy frequency is calibrated according to strict medical protocols.",
      sealText: "CERTIFIED SYSTEMS",
    },
  ];

  return (
    <section id="credentials" className="section-padding" style={{
      background: '#FAF7F2',
      borderBottom: '1px solid rgba(28, 27, 24, 0.08)'
    }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-bronze" style={{ marginBottom: '1rem' }}>
            <ShieldCheck size={13} /> Clinical Accreditations & Safety Standards
          </div>
          <h2 className="heading-lg" style={{ color: '#1C1B18' }}>
            Expert Care You <span className="text-bronze-gradient">Can Trust</span>
          </h2>
          <p>
            Patient safety, official professional registration, and evidence-based clinical protocols form the cornerstone of every consultation and treatment at Allure Passions UK.
          </p>
        </div>

        {/* Editorial Accreditation Certificates List */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.75rem',
          marginBottom: '3.5rem'
        }}>
          {accreditations.map((item) => (
            <div
              key={item.id}
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(168, 127, 61, 0.3)',
                borderRadius: 'var(--radius-md)',
                padding: '2rem 2.25rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2rem',
                alignItems: 'center',
                boxShadow: '0 6px 20px rgba(28, 27, 24, 0.03)'
              }}
            >
              {/* Left Column: Title & Authority */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
                  <span style={{
                    fontSize: '0.7rem',
                    fontWeight: '700',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#A87F3D',
                    background: 'rgba(168, 127, 61, 0.08)',
                    padding: '0.25rem 0.65rem',
                    borderRadius: '4px',
                    border: '1px solid rgba(168, 127, 61, 0.25)'
                  }}>
                    {item.sealText}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#7A756C', fontWeight: '500' }}>
                    {item.regNo}
                  </span>
                </div>

                <h3 className="heading-md" style={{ color: '#1C1B18', fontSize: '1.45rem', marginBottom: '0.35rem' }}>
                  {item.title}
                </h3>
                <div style={{ fontSize: '0.875rem', color: '#A87F3D', fontWeight: '600' }}>
                  {item.authority} — <em>{item.standard}</em>
                </div>
              </div>

              {/* Right Column: Description & Verified Standard */}
              <div style={{ borderLeft: '1px solid rgba(28, 27, 24, 0.08)', paddingLeft: '1.5rem' }}>
                <p style={{ color: '#4A4740', fontSize: '0.925rem', lineHeight: '1.65', marginBottom: '1rem', fontWeight: '300' }}>
                  {item.details}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#A87F3D', fontSize: '0.825rem', fontWeight: '600' }}>
                  <CheckCircle2 size={15} /> Verified Medical Standard & Active Registration
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Visual Trust Stats Bar */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid rgba(168, 127, 61, 0.25)',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem 2.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          textAlign: 'center',
          boxShadow: '0 8px 24px rgba(28, 27, 24, 0.04)'
        }}>
          <div>
            <div style={{ fontSize: '2.2rem', fontFamily: 'Cormorant Garamond, serif', color: '#A87F3D', fontWeight: '600' }}>
              JCCP
            </div>
            <div style={{ fontSize: '0.875rem', color: '#1C1B18', fontWeight: '600', marginTop: '0.2rem' }}>
              Official Practitioner Register
            </div>
            <div style={{ fontSize: '0.775rem', color: '#7A756C' }}>Joint Council Accreditation</div>
          </div>

          <div>
            <div style={{ fontSize: '2.2rem', fontFamily: 'Cormorant Garamond, serif', color: '#A87F3D', fontWeight: '600' }}>
              Level 6
            </div>
            <div style={{ fontSize: '0.875rem', color: '#1C1B18', fontWeight: '600', marginTop: '0.2rem' }}>
              Clinical Practice
            </div>
            <div style={{ fontSize: '0.775rem', color: '#7A756C' }}>Advanced Medical Training</div>
          </div>

          <div>
            <div style={{ fontSize: '2.2rem', fontFamily: 'Cormorant Garamond, serif', color: '#A87F3D', fontWeight: '600' }}>
              5.0 ★
            </div>
            <div style={{ fontSize: '0.875rem', color: '#1C1B18', fontWeight: '600', marginTop: '0.2rem' }}>
              Google Verified Rating
            </div>
            <div style={{ fontSize: '0.775rem', color: '#7A756C' }}>Patient Review Rating</div>
          </div>

          <div>
            <div style={{ fontSize: '2.2rem', fontFamily: 'Cormorant Garamond, serif', color: '#A87F3D', fontWeight: '600' }}>
              100%
            </div>
            <div style={{ fontSize: '0.875rem', color: '#1C1B18', fontWeight: '600', marginTop: '0.2rem' }}>
              Non-Invasive Safety
            </div>
            <div style={{ fontSize: '0.775rem', color: '#7A756C' }}>Evidence-Based Care</div>
          </div>
        </div>

      </div>
    </section>
  );
}
