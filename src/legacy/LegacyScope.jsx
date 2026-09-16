import { useParams, Navigate } from 'react-router';
import { POPULAR_TREATMENTS } from '../data/treatmentData';
import usePageMeta from '../lib/usePageMeta';
import NotFoundPage from '../pages/NotFoundPage';
import { toSlug, toTreatmentId, useLegacyNavigate } from './legacyNavigation';
import TreatmentDetailPage from './pages/TreatmentDetailPage';
import './legacy.css';

/** Wraps pre-redesign markup so its scoped styles apply. */
export function LegacyScope({ className, children }) {
  return <div className={className ? `legacy ${className}` : 'legacy'}>{children}</div>;
}

/** Renders a pre-redesign inner page until its module replaces it. */
export function LegacyPage({ title, page: Page, ...pageProps }) {
  usePageMeta({ title });
  const onNavigate = useLegacyNavigate();

  return (
    <LegacyScope className="legacy-page">
      <Page onNavigate={onNavigate} {...pageProps} />
    </LegacyScope>
  );
}

export function LegacyTreatmentPage() {
  const { slug = '' } = useParams();

  if (slug.includes('_')) return <Navigate to={`/treatments/${toSlug(slug)}`} replace />;

  const treatment = POPULAR_TREATMENTS.find((item) => item.id === toTreatmentId(slug));
  if (!treatment) return <NotFoundPage />;

  return <LegacyPage title={treatment.name} page={TreatmentDetailPage} treatmentId={treatment.id} />;
}
