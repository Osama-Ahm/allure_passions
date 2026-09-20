import { useEffect, useRef } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router';
import BusinessStructuredData from '../components/patterns/BusinessStructuredData';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import QuickContactBar from '../components/layout/QuickContactBar';
import ScrollProgress from '../components/motion/ScrollProgress';
import cx from '../lib/cx';
import './RootLayout.css';

/** Pages whose first block runs underneath the floating header, with no top offset. */
const HERO_ROUTES = new Set(['/']);

/** …and of those, the ones whose hero is dark enough for the header to start glassy. */
const DARK_HERO_ROUTES = new Set();

export default function RootLayout() {
  const mainRef = useRef(null);
  const { pathname } = useLocation();
  const previousPathname = useRef(pathname);
  const hasHero = HERO_ROUTES.has(pathname);

  // Move focus to the new page's content so keyboard and screen-reader users start there.
  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <>
      <BusinessStructuredData />
      <a className="ap-skip-link" href="#main">
        Skip to content
      </a>
      <ScrollProgress />
      <Header overHero={DARK_HERO_ROUTES.has(pathname)} />
      <main id="main" ref={mainRef} tabIndex={-1} className={cx('ap-main', !hasHero && 'ap-main--offset')}>
        <Outlet />
      </main>
      <Footer />
      {/* The homepage has its own chapter pill at the foot of the screen. */}
      {!hasHero && <QuickContactBar />}
      <ScrollRestoration />
    </>
  );
}
