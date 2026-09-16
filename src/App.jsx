import React, { useState, useEffect, useRef } from 'react';
import useMotionSystem from './motion/useMotionSystem';
import PageCurtain from './motion/PageCurtain';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TreatmentAreasSection from './components/TreatmentAreasSection';
import FounderSection from './components/FounderSection';
import PillarsSection from './components/PillarsSection';
import SignatureTreatmentsSection from './components/SignatureTreatmentsSection';
import PricingMenuSection from './components/PricingMenuSection';
import BeforeAfterSection from './components/BeforeAfterSection';
import AccreditationsSection from './components/AccreditationsSection';
import PressBarSection from './components/PressBarSection';
import TestimonialsSection from './components/TestimonialsSection';
import InstagramSection from './components/InstagramSection';
import BodyContouringSection from './components/BodyContouringSection';
import SkincareShowcaseSection from './components/SkincareShowcaseSection';
import PreFooterCtaSection from './components/PreFooterCtaSection';
import Footer from './components/Footer';

// Dedicated Legitimate Inner Pages
import AboutPage from './components/pages/AboutPage';
import TreatmentDetailPage from './components/pages/TreatmentDetailPage';
import TreatmentsIndexPage from './components/pages/TreatmentsIndexPage';
import PricingPage from './components/pages/PricingPage';
import PrescriptionConsultationPage from './components/pages/PrescriptionConsultationPage';

// Route parser for HTML5 History API URL synchronisation
function getRouteFromPath(pathname) {
  const clean = (pathname || '').replace(/\/$/, '') || '/';
  if (clean === '/' || clean === '') return { route: 'home', treatmentId: 'picoway' };
  if (clean === '/about') return { route: 'about', treatmentId: 'picoway' };
  if (clean === '/treatments') return { route: 'treatments', treatmentId: 'picoway' };
  if (clean.startsWith('/treatments/')) {
    const id = clean.replace('/treatments/', '');
    return { route: 'treatment-detail', treatmentId: id || 'picoway' };
  }
  if (clean === '/pricing') return { route: 'pricing', treatmentId: 'picoway' };
  if (clean === '/prescription-skincare' || clean === '/skincare') return { route: 'prescription-skincare', treatmentId: 'picoway' };
  return { route: 'home', treatmentId: 'picoway' };
}

// Page curtain timings (keep in sync with apCurtainCover / apCurtainReveal in motion.css)
const CURTAIN_COVER_MS = 650;
const CURTAIN_REVEAL_MS = 900;

function getPathFromRoute(route, treatmentId) {
  switch (route) {
    case 'about': return '/about';
    case 'treatments': return '/treatments';
    case 'treatment-detail': return `/treatments/${treatmentId || 'picoway'}`;
    case 'pricing': return '/pricing';
    case 'prescription-skincare': return '/prescription-skincare';
    case 'home':
    default: return '/';
  }
}

export default function App() {
  const initial = getRouteFromPath(typeof window !== 'undefined' ? window.location.pathname : '/');
  const [currentRoute, setCurrentRoute] = useState(initial.route);
  const [selectedTreatmentId, setSelectedTreatmentId] = useState(initial.treatmentId);
  const [curtainPhase, setCurtainPhase] = useState('idle');
  const isTransitioning = useRef(false);

  useMotionSystem();

  // Sync state with native browser Back and Forward button navigation
  useEffect(() => {
    const handlePopState = () => {
      const { route, treatmentId } = getRouteFromPath(window.location.pathname);
      setCurrentRoute(route);
      if (treatmentId) {
        setSelectedTreatmentId(treatmentId);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const showRoute = (route, treatmentId) => {
    const path = getPathFromRoute(route, treatmentId);
    if (window.location.pathname !== path) {
      window.history.pushState({ route, treatmentId }, '', path);
    }
    setCurrentRoute(route);
    if (treatmentId) {
      setSelectedTreatmentId(treatmentId);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Navigation handler: HTML5 pushState behind a branded curtain sweep
  const handleNavigate = (route, treatmentId = null) => {
    const isSamePage = route === currentRoute && (!treatmentId || treatmentId === selectedTreatmentId);
    if (isSamePage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      showRoute(route, treatmentId);
      return;
    }
    if (isTransitioning.current) return;

    const html = document.documentElement;
    isTransitioning.current = true;
    setCurtainPhase('cover');

    window.setTimeout(() => {
      // Swap pages while fully covered; the new page's entrances wait for the lift.
      html.setAttribute('data-curtain', 'closed');
      showRoute(route, treatmentId);

      window.setTimeout(() => {
        setCurtainPhase('reveal');
        html.setAttribute('data-curtain', 'opening');

        window.setTimeout(() => {
          setCurtainPhase('idle');
          html.removeAttribute('data-curtain');
          isTransitioning.current = false;
        }, CURTAIN_REVEAL_MS);
      }, 80);
    }, CURTAIN_COVER_MS);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#FAF7F2', color: '#1C1B18', display: 'flex', flexDirection: 'column' }}>
      <PageCurtain phase={curtainPhase} />

      {/* Figma Exact Header: Fixed Overlay (Left MENU, Center AP Crest, Right ENQUIRE) */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <div style={{ flex: 1 }}>
        {currentRoute === 'home' && (
          <main>
            {/* Section 1: Clean Cinematic Hero Banner (Figma Exact) */}
            <HeroSection
              onNavigate={handleNavigate}
            />

            {/* Section 2: Treatment Areas & Concern Carousel (Figma Exact) */}
            <TreatmentAreasSection
              onNavigate={handleNavigate}
            />

            {/* Section 3: Verified Clinical Outcomes / Real Results & Patient Transformations (Motion Slider Graphic) */}
            <BeforeAfterSection />

            {/* Section 4: Meet the Practitioner / Founder (Figma Exact: Bio + Studio Portrait) */}
            <FounderSection
              onNavigate={handleNavigate}
            />

            {/* Section 5: The Allure Standard (Editorial principles list with image that follows the active pillar) */}
            <PillarsSection />

            {/* Section 6: Signature Treatments (Staggered image gallery on night ground; swipe rail on phones) */}
            <SignatureTreatmentsSection
              onNavigate={handleNavigate}
            />

            {/* Section 7: Treatment Menu & Pricing (Tabbed highlights sourced from the official price list) */}
            <PricingMenuSection
              onNavigate={handleNavigate}
            />

            {/* Section 8: Accreditations & Industry Honours (Figma Exact: GHP 2026 & JCCP Cards) */}
            <AccreditationsSection
              onNavigate={handleNavigate}
            />

            {/* Section 9: Luxury Editorial Press & Media Bar (Figma Exact: Vogue, Tatler, Harper's Bazaar) */}
            <PressBarSection />

            {/* Section 10: Client Testimonials (Figma Exact: 2x3 Grid of 5-Star Reviews) */}
            <TestimonialsSection />

            {/* Section 11: Live Instagram Behind-the-Scenes Feed (Figma Exact: 4 Photos) */}
            <InstagramSection />

            {/* Section 12: Revolutionary Body Contouring (Figma Exact: Emsculpt Neo Spotlight Card) */}
            <BodyContouringSection
              onNavigate={handleNavigate}
            />

            {/* Section 13: Medical-Grade Skincare & Prescription Hub (Figma Exact: Kojivit & Tretinoin) */}
            <SkincareShowcaseSection
              onNavigate={handleNavigate}
            />

            {/* Section 14: Pre-Footer Consultation CTA (Figma Exact: Split Banner with Aesthetic Visual) */}
            <PreFooterCtaSection />
          </main>
        )}

        {/* Dedicated Legitimate Inner Page: /about */}
        {currentRoute === 'about' && (
          <div style={{ paddingTop: '5.5rem' }}>
            <AboutPage
              onNavigate={handleNavigate}
            />
          </div>
        )}

        {/* Dedicated Legitimate Inner Page: /treatments */}
        {currentRoute === 'treatments' && (
          <div style={{ paddingTop: '5.5rem' }}>
            <TreatmentsIndexPage
              onNavigate={handleNavigate}
            />
          </div>
        )}

        {/* Dedicated Legitimate Inner Page: /treatments/:id */}
        {currentRoute === 'treatment-detail' && (
          <div style={{ paddingTop: '5.5rem' }}>
            <TreatmentDetailPage
              treatmentId={selectedTreatmentId}
              onNavigate={handleNavigate}
            />
          </div>
        )}

        {/* Dedicated Legitimate Inner Page: /pricing */}
        {currentRoute === 'pricing' && (
          <div style={{ paddingTop: '5.5rem' }}>
            <PricingPage
              onNavigate={handleNavigate}
            />
          </div>
        )}

        {/* Dedicated Legitimate Inner Page: /prescription-skincare */}
        {currentRoute === 'prescription-skincare' && (
          <div style={{ paddingTop: '5.5rem' }}>
            <PrescriptionConsultationPage
              onNavigate={handleNavigate}
            />
          </div>
        )}
      </div>

      {/* Section 15: Deep Obsidian Luxury Footer (Figma Exact: Gold AP Crest & Fitzrovia Directory) */}
      <Footer
        onNavigate={handleNavigate}
      />

    </div>
  );
}
