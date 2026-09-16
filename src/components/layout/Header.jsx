import { ChevronDown, Menu } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { clinic } from '../../content/clinic';
import { consultationCta, primaryLinks } from '../../content/navigation';
import cx from '../../lib/cx';
import useHeaderScroll from '../../lib/useHeaderScroll';
import useMediaQuery from '../../lib/useMediaQuery';
import BrandLockup from '../brand/BrandLockup';
import { Button, Container, Icon } from '../ui';
import MegaMenu from './MegaMenu';
import MobileMenu from './MobileMenu';
import './Header.css';

const DESKTOP_QUERY = '(min-width: 75rem)'; // 1200px: below this the links collapse into the menu (§5.2)
const HOVER_QUERY = '(hover: hover) and (pointer: fine)';
const MEGA_MENU_ID = 'ap-treatments-menu';
const MOBILE_MENU_ID = 'ap-mobile-menu';
const HOVER_OPEN_DELAY = 80;
const HOVER_CLOSE_DELAY = 180;

/**
 * Site header (plan §5.2). Transparent over the hero and solid once the page
 * scrolls; tucks away going down and returns going up. The Treatments panel is
 * a disclosure, so it works by pointer, keyboard and touch alike.
 * `overHero` lets a page with a dark hero start the header transparent.
 */
export default function Header({ overHero = false }) {
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const canHover = useMediaQuery(HOVER_QUERY);
  const { pathname } = useLocation();
  const { isScrolled, isHidden } = useHeaderScroll();

  const [isMegaOpen, setMegaOpen] = useState(false);
  const [isMobileOpen, setMobileOpen] = useState(false);

  const headerRef = useRef(null);
  const megaButtonRef = useRef(null);
  const hoverTimer = useRef(0);

  const closeMega = useCallback(() => {
    window.clearTimeout(hoverTimer.current);
    setMegaOpen(false);
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);

  // A new page, or crossing the breakpoint, closes whatever is open.
  const menuKey = `${pathname}|${isDesktop}`;
  const [openedFor, setOpenedFor] = useState(menuKey);
  if (openedFor !== menuKey) {
    setOpenedFor(menuKey);
    setMegaOpen(false);
    setMobileOpen(false);
  }

  // Drop any hover that was mid-flight when the page changed.
  useEffect(() => {
    window.clearTimeout(hoverTimer.current);
  }, [menuKey]);

  // While the panel is open: Escape closes it, and so does anything outside the header.
  useEffect(() => {
    if (!isMegaOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      closeMega();
      megaButtonRef.current?.focus();
    };
    const onOutside = (event) => {
      if (!headerRef.current?.contains(event.target)) closeMega();
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onOutside);
    document.addEventListener('focusin', onOutside);
    window.addEventListener('scroll', closeMega, { passive: true });
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onOutside);
      document.removeEventListener('focusin', onOutside);
      window.removeEventListener('scroll', closeMega);
    };
  }, [isMegaOpen, closeMega]);

  const usesHover = isDesktop && canHover;

  const openOnHover = () => {
    if (!usesHover) return;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setMegaOpen(true), HOVER_OPEN_DELAY);
  };

  const closeOnHover = () => {
    if (!usesHover) return;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setMegaOpen(false), HOVER_CLOSE_DELAY);
  };

  const isMenuOpen = isMegaOpen || isMobileOpen;
  const isTransparent = overHero && !isScrolled && !isMenuOpen;

  return (
    <header
      ref={headerRef}
      className={cx('ap-header', isTransparent && 'is-transparent', isHidden && !isMenuOpen && 'is-hidden')}
      data-tone={isTransparent ? 'night' : 'canvas'}
      onMouseLeave={closeOnHover}
    >
      <div className="ap-header__bar" inert={isMobileOpen || undefined}>
        <Container className="ap-header__inner">
          <Link className="ap-header__brand" to="/" aria-label={`${clinic.name} — home`} viewTransition>
            <BrandLockup size="sm" showPlace={false} />
          </Link>

          {isDesktop && (
            <nav className="ap-header__nav" aria-label="Primary">
              <button
                ref={megaButtonRef}
                type="button"
                className={cx('ap-header__link', 'ap-header__trigger', pathname.startsWith('/treatments') && 'is-current')}
                aria-expanded={isMegaOpen}
                aria-controls={MEGA_MENU_ID}
                onClick={() => (isMegaOpen ? closeMega() : setMegaOpen(true))}
                onMouseEnter={openOnHover}
              >
                Treatments
                <Icon className="ap-header__chevron" icon={ChevronDown} size={16} />
              </button>

              {/* Directly after its trigger, so Tab moves straight into the panel. */}
              <MegaMenu id={MEGA_MENU_ID} isOpen={isMegaOpen} onNavigate={closeMega} />

              {primaryLinks.map((link) => (
                <NavLink key={link.to} className="ap-header__link" to={link.to} onMouseEnter={closeMega} viewTransition>
                  {link.label}
                </NavLink>
              ))}
            </nav>
          )}

          <div className="ap-header__actions">
            <Button className="ap-header__cta" to={consultationCta.to} size="sm" onMouseEnter={closeMega}>
              {isDesktop ? consultationCta.label : consultationCta.shortLabel}
            </Button>

            {!isDesktop && (
              <button
                type="button"
                className="ap-header__menu-button"
                aria-expanded={isMobileOpen}
                aria-controls={MOBILE_MENU_ID}
                onClick={() => setMobileOpen(true)}
              >
                <Icon icon={Menu} size={22} />
                <span className="ap-visually-hidden">Menu</span>
              </button>
            )}
          </div>
        </Container>
      </div>

      {!isDesktop && <MobileMenu id={MOBILE_MENU_ID} isOpen={isMobileOpen} onClose={closeMobile} />}
    </header>
  );
}
