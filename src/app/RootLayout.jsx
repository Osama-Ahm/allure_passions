import { useEffect, useRef } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router';
import { LegacyFooter, LegacyHeader } from '../legacy/LegacyScope';

/**
 * Shared page frame. The legacy header and footer are placeholders until
 * Module 2 replaces them with the new navigation.
 */
export default function RootLayout() {
  const mainRef = useRef(null);
  const { pathname } = useLocation();
  const previousPathname = useRef(pathname);

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
      <LegacyHeader />
      <main id="main" ref={mainRef} tabIndex={-1} className="ap-main">
        <Outlet />
      </main>
      <LegacyFooter />
      <ScrollRestoration />
    </>
  );
}
