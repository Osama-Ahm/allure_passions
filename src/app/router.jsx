import { createBrowserRouter } from 'react-router';
import { legacyRoutes } from '../legacy/legacyRoutes';
import ContactPage from '../pages/contact/ContactPage';
import HomePage from '../pages/home/HomePage';
import LegalNoticePage from '../pages/legal/LegalNoticePage';
import { legalPages } from '../pages/legal/legalPages';
import NotFoundPage from '../pages/NotFoundPage';
import RootLayout from './RootLayout';
import RouteError from './RouteError';

const routes = [
  {
    element: <RootLayout />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'privacy', element: <LegalNoticePage {...legalPages.privacy} /> },
      { path: 'terms', element: <LegalNoticePage {...legalPages.terms} /> },
      ...legacyRoutes,
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
