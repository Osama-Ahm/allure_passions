import React, { useState, useEffect, useRef } from 'react';
import useMotionSystem from './motion/useMotionSystem';
import { startSmoothScroll, scrollToY } from './motion/smoothScroll';
import PageCurtain from './motion/PageCurtain';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TreatmentAreasSection from './components/TreatmentAreasSection';
import FounderSection from './components/FounderSection';
import FounderFeatureSection from './components/FounderFeatureSection';
import PillarsSection from './components/PillarsSection';
import SignatureTreatmentsSection from './components/SignatureTreatmentsSection';
import WhatWeTreatSection from './components/WhatWeTreatSection';
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

  // Eased wheel scrolling site-wide (skipped for reduced motion); keeps the hero video glide smooth.
  useEffect(() => {
    startSmoothScroll();
  }, []);

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
    scrollToY(0, { immediate: true });
  };

  // Navigation handler: HTML5 pushState behind a branded curtain sweep
  const handleNavigate = (route, treatmentId = null) => {
    const isSamePage = route === currentRoute && (!treatmentId || treatmentId === selectedTreatmentId);
    if (isSamePage) {
      scrollToY(0);
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

      {/* Fixed header over the hero: Menu, AP monogram, shortcuts */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <div style={{ flex: 1 }}>
        {currentRoute === 'home' && (
          <main>
            {/* Homepage order follows the Figma frame "ALLURE PASSION mock 1" (node 2:12) */}
            {/* 1. Hero: clinic tour video that plays with the scroll */}
            <HeroSection onNavigate={handleNavigate} />

            {/* 2. Start With What Matters to You: concern / treatment paths */}
            <TreatmentAreasSection onNavigate={handleNavigate} />

            {/* 3. Welcome to Allure Passions, UK Aesthetic Clinic */}
            <FounderSection onNavigate={handleNavigate} />

            {/* 3b. Founder spotlight: excerpt of the GHP Q3 2026 feature (full article on /about) */}
            <FounderFeatureSection onNavigate={handleNavigate} />

            {/* 4. Expertise Behind Every Treatment + Personalised Treatment Guidance */}
            <PillarsSection onNavigate={handleNavigate} />

            {/* 5. Advanced Treatments. Personalised to You. */}
            <SignatureTreatmentsSection onNavigate={handleNavigate} />

            {/* 6. Skin, Body & Wellness Concerns + Not sure where to begin? */}
            <WhatWeTreatSection onNavigate={handleNavigate} />

            {/* 7. Real Treatments. Real Patient Journeys. */}
            <BeforeAfterSection onNavigate={handleNavigate} />

            {/* 8. Recognized for Advanced Aesthetic Care */}
            <AccreditationsSection onNavigate={handleNavigate} />

            {/* 9. As Featured In */}
            <PressBarSection />

            {/* 10. What Our Patients Say */}
            <TestimonialsSection />

            {/* 11. Shared Transformations @ALLUREPASSIONSUK */}
            <InstagramSection />

            {/* 12. Discover Our Signature Technologies */}
            <BodyContouringSection onNavigate={handleNavigate} />

            {/* 13. Professional Skincare Beyond the Clinic */}
            <SkincareShowcaseSection onNavigate={handleNavigate} />

            {/* 14. Not Sure Which Treatment Is Right for You? */}
            <PreFooterCtaSection onNavigate={handleNavigate} />
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

      {/* 15. Footer */}
      <Footer
        onNavigate={handleNavigate}
      />

    </div>
  );
}
