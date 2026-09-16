import { Navigate } from 'react-router';
import { LegacyPage, LegacyTreatmentPage } from './LegacyScope';
import AboutPage from './pages/AboutPage';
import PrescriptionConsultationPage from './pages/PrescriptionConsultationPage';
import PricingPage from './pages/PricingPage';
import TreatmentsIndexPage from './pages/TreatmentsIndexPage';

// Pre-redesign inner pages, each removed when its module ships (plan §10).
export const legacyRoutes = [
  { path: 'about', element: <LegacyPage title="About the clinic" page={AboutPage} /> },
  { path: 'treatments', element: <LegacyPage title="Treatments" page={TreatmentsIndexPage} /> },
  { path: 'treatments/:slug', element: <LegacyTreatmentPage /> },
  { path: 'pricing', element: <LegacyPage title="Pricing" page={PricingPage} /> },
  { path: 'skincare/tretinoin', element: <LegacyPage title="Prescription skincare" page={PrescriptionConsultationPage} /> },
  { path: 'skincare', element: <Navigate to="/skincare/tretinoin" replace /> },
  { path: 'prescription-skincare', element: <Navigate to="/skincare/tretinoin" replace /> },
];
