import { useCallback } from 'react';
import { useNavigate } from 'react-router';

// Maps the pre-redesign route names (used by the legacy components' onNavigate
// callbacks) to real URLs. Remove with src/legacy.
const ROUTE_PATHS = {
  home: '/',
  about: '/about',
  treatments: '/treatments',
  pricing: '/pricing',
  'prescription-skincare': '/skincare/tretinoin',
};

export const toSlug = (treatmentId = 'picoway') => treatmentId.replace(/_/g, '-');
export const toTreatmentId = (slug = 'picoway') => slug.replace(/-/g, '_');

export function legacyPath(route, treatmentId) {
  if (route === 'treatment-detail') return `/treatments/${toSlug(treatmentId || 'picoway')}`;
  return ROUTE_PATHS[route] ?? '/';
}

export function useLegacyNavigate() {
  const navigate = useNavigate();
  return useCallback(
    (route, treatmentId) => navigate(legacyPath(route, treatmentId), { viewTransition: true }),
    [navigate],
  );
}
