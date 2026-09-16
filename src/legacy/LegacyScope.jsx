import usePageMeta from '../lib/usePageMeta';
import { useLegacyNavigate } from './legacyNavigation';
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
