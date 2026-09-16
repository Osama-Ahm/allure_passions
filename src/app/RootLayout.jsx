import { useEffect, useRef } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import QuickContactBar from '../components/layout/QuickContactBar';
import cx from '../lib/cx';
import './RootLayout.css';

/** Pages whose first block runs underneath a transparent header. */
const HERO_ROUTES = new Set(['/']);

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
      <a className="ap-skip-link" href="#main">
        Skip to content
      </a>
      <Header overHero={hasHero} />
      <main id="main" ref={mainRef} tabIndex={-1} className={cx('ap-main', !hasHero && 'ap-main--offset')}>
        <Outlet />
      </main>
      <Footer />
      <QuickContactBar />
      <ScrollRestoration />
    </>
  );
}
