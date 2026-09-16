import { Navigate } from 'react-router';
import { LegacyPage } from './LegacyScope';
import AboutPage from './pages/AboutPage';
import PrescriptionConsultationPage from './pages/PrescriptionConsultationPage';

// Pre-redesign inner pages, each removed when its module ships (plan §10).
export const legacyRoutes = [
  { path: 'about', element: <LegacyPage title="About the clinic" page={AboutPage} /> },
  { path: 'skincare/tretinoin', element: <LegacyPage title="Prescription skincare" page={PrescriptionConsultationPage} /> },
  { path: 'skincare', element: <Navigate to="/skincare/tretinoin" replace /> },
  { path: 'prescription-skincare', element: <Navigate to="/skincare/tretinoin" replace /> },
];
