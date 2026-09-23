import React from 'react';
import { Award, CheckCircle2, ArrowLeft, MessageSquare, MapPin } from 'lucide-react';
import { CLINIC_INFO, CREDENTIALS } from '../../data/treatmentData';
import GhpFeatureArticle from './about/GhpFeatureArticle';
import './AboutPage.css';

export default function AboutPage({ onNavigate }) {
  return (
    <div className="ap-about">
      <div className="ap-about__container">
        
        {/* Back Link */}
        <button
          onClick={() => onNavigate('home')}
          className="ap-about__back"
          type="button"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          <span>Back to Homepage</span>
        </button>

        {/* Page Header */}
        <header className="ap-about__header">
          <div className="ap-about__badge-award">
            <Award size={14} aria-hidden="true" />
            <span>GHP Global Excellence Awards 2026 Winner</span>
          </div>

          <h1 className="ap-about__title">
            About <span className="text-bronze-gradient">{CLINIC_INFO.fullName}</span>
          </h1>

          <p className="ap-about__lead">
            Recognised as <strong>Best Advanced Skin & Body Aesthetics Clinic 2026 – London</strong> by <em>Global Health & Pharma (GHP)</em> as part of the Global Excellence Awards. Located in the heart of Fitzrovia at 76 Cleveland Street.
          </p>
        </header>

        {/* Main Grid Story Section */}
        <section className="ap-about__story" aria-label="Clinical approach and sanctuary">
          <div className="ap-about__story-copy">
            <div className="ap-about__location">
              <MapPin size={14} aria-hidden="true" />
              <span>76 Cleveland Street, Fitzrovia</span>
            </div>

            <h2 className="ap-about__subtitle">
              Refined Luxury Meets <span className="text-bronze-gradient">Clinical Science</span>
            </h2>

            <p className="ap-about__prose">
              At <strong>Allure Passions UK</strong>, we believe aesthetic medicine should be an empowering, dignified, and patient-centred experience. We specialize in non-invasive clinical treatments that restore epidermal clarity, contour muscle and fat, and optimize cellular skin health without surgery or downtime.
            </p>

            <p className="ap-about__prose-secondary">
              Operating from our private Fitzrovia clinic suite, our practitioners hold Level 6 clinical qualifications, manufacturer masterclass certifications for PicoWay®, ADVATx®, Morpheus8™, Sofwave™, and Emsculpt Neo®, alongside official registration with the Joint Council for Cosmetic Practitioners (JCCP).
            </p>

            <div className="ap-about__check-grid">
              <div className="ap-about__check-item">
                <CheckCircle2 size={16} color="#A87F3D" aria-hidden="true" />
                <span>JCCP Registered Practice</span>
              </div>
              <div className="ap-about__check-item">
                <CheckCircle2 size={16} color="#A87F3D" aria-hidden="true" />
                <span>Level 6 Medical Practitioners</span>
              </div>
              <div className="ap-about__check-item">
                <CheckCircle2 size={16} color="#A87F3D" aria-hidden="true" />
                <span>FDA-Cleared Device Protocols</span>
              </div>
              <div className="ap-about__check-item">
                <CheckCircle2 size={16} color="#A87F3D" aria-hidden="true" />
                <span>Cellular Exosome Protocols</span>
              </div>
            </div>

            <div className="ap-about__cta-row">
              <a
                href="https://wa.me/447342052249?text=Hello%20Allure%20Passions%20UK,%20I%20would%20like%20to%20consult%20regarding%20a%20clinical%20treatment."
                target="_blank"
                rel="noopener noreferrer"
                className="ap-about__cta-btn"
              >
                <MessageSquare size={16} aria-hidden="true" />
                <span>Direct Clinical Consultation</span>
              </a>
            </div>
          </div>

          <div className="ap-about__visual">
            <div className="ap-about__frame">
              <img
                src="/assets/images/hero_clinic_ambiance.png"
                alt="Allure Passions UK Fitzrovia Sanctuary"
                loading="lazy"
                decoding="async"
                className="ap-about__photo"
              />
            </div>

            <div className="ap-about__card-badge">
              <div className="ap-about__badge-tag">
                Fitzrovia Sanctuary
              </div>
              <div className="ap-about__badge-text">
                Discreet, bespoke consultations in Fitzrovia
              </div>
            </div>
          </div>
        </section>

        {/* Founder feature: Global Health & Pharma, Q3 2026 */}
        <GhpFeatureArticle />

        {/* Credentials Grid */}
        <section className="ap-about__trust" aria-label="Professional credentials">
          <div className="ap-about__trust-head">
            <span className="badge-bronze">Strict Medical Standards</span>
            <h2 className="ap-about__trust-title">
              Why Patients <span className="text-bronze-gradient">Trust Us</span>
            </h2>
            <p className="ap-about__trust-lead">
              Our practice is built on uncompromised clinical excellence, regulatory transparency, and bespoke care.
            </p>
          </div>

          <div className="ap-about__trust-grid">
            {CREDENTIALS.map((cred) => (
              <article key={cred.id} className="ap-about__cred-card">
                <span className="ap-about__cred-badge">{cred.badge}</span>
                <h3 className="ap-about__cred-title">{cred.title}</h3>
                <div className="ap-about__cred-subtitle">{cred.subtitle}</div>
                <p className="ap-about__cred-desc">{cred.description}</p>
              </article>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
