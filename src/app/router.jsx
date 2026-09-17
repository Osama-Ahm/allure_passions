import { createBrowserRouter, Navigate } from 'react-router';
import AboutPage from '../pages/about/AboutPage';
import ContactPage from '../pages/contact/ContactPage';
import HomePage from '../pages/home/HomePage';
import LegalNoticePage from '../pages/legal/LegalNoticePage';
import { legalPages } from '../pages/legal/legalPages';
import NotFoundPage from '../pages/NotFoundPage';
import PricingPage from '../pages/pricing/PricingPage';
import KojivitPage from '../pages/skincare/KojivitPage';
import SkincarePage from '../pages/skincare/SkincarePage';
import TretinoinPage from '../pages/skincare/TretinoinPage';
import TreatmentDetailPage from '../pages/treatments/TreatmentDetailPage';
import TreatmentsPage from '../pages/treatments/TreatmentsPage';
import RootLayout from './RootLayout';
import RouteError from './RouteError';

const routes = [
  {
    element: <RootLayout />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'treatments', element: <TreatmentsPage /> },
      { path: 'pricing', element: <PricingPage /> },
      { path: 'skincare', element: <SkincarePage /> },
      { path: 'skincare/kojivit-ultra', element: <KojivitPage /> },
      { path: 'skincare/tretinoin', element: <TretinoinPage /> },
      { path: 'treatments/:slug', element: <TreatmentDetailPage /> },
      { path: 'privacy', element: <LegalNoticePage {...legalPages.privacy} /> },
      { path: 'terms', element: <LegalNoticePage {...legalPages.terms} /> },
      // The previous site's prescription URL.
      { path: 'prescription-skincare', element: <Navigate to="/skincare/tretinoin" replace /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];

// The design system reference is a development tool; it is not part of production builds.
if (import.meta.env.DEV) {
  routes.unshift({
    path: '/styleguide',
    HydrateFallback: () => null,
    lazy: async () => {
      const { default: StyleGuidePage } = await import('../pages/styleguide/StyleGuidePage');
      return { Component: StyleGuidePage };
    },
  });
}

const router = createBrowserRouter(routes);

export default router;
