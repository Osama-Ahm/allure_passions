import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react';
import { CalendarClock, ShoppingBag } from 'lucide-react';
import useCurtainOpen from '../motion/useCurtainOpen';
import { getLenis } from '../motion/smoothScroll';
import { EASE_OUT } from '../motion/presets';
import { BOOK_CONSULTATION_URL } from '../data/links';
import { CLINIC_INFO } from '../data/treatmentData';
import NavMenu from './nav/NavMenu';
import { preloadPreview, previewKeyFor } from './nav/menuData';
import './Navbar.css';

const LOGO_SRC = '/assets/images/allure_logo.png';
const HIDE_AFTER = 140; // px scrolled before the header may tuck away
const HIDE_TRAVEL = 18; // continuous downward travel that hides it
const SHOW_TRAVEL = 10; // upward travel that brings it back
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const treatmentIdFromPath = () => {
  if (typeof window === 'undefined') return null;
  const match = window.location.pathname.match(/^\/treatments\/([^/]+)/);
  return match ? match[1] : null;
};

const isPlainClick = (event) =>
  !event.defaultPrevented && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;

/**
 * Fixed site header (Figma: frosted hamburger button, AP monogram, skincare and
 * booking shortcuts). Transparent with white glyphs over the hero; once the
 * hero has gone it compacts onto a frosted light bar, tucks away on scroll down
 * and slides back on scroll up. The hamburger opens the full-screen NavMenu.
 */
export default function Navbar({ currentRoute = 'home', onNavigate }) {
  const isHome = currentRoute === 'home';
  const reduce = useReducedMotion();
  const ready = useCurtainOpen();
  const { scrollY } = useScroll();

  const rootRef = useRef(null);
  const barRef = useRef(null);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  const [solid, setSolid] = useState(!isHome);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [presenceKey, setPresenceKey] = useState(0);

  const view = useRef({ solid: !isHome, hidden: false, last: 0, down: 0, up: 0, heroEnd: Infinity });
  const treatmentId = treatmentIdFromPath();

  // Header state from the scroll position: React state changes only when a threshold
  // or the direction flips, never per frame.
  const sync = useCallback(
    (y) => {
      const s = view.current;
      const delta = y - s.last;
      s.last = y;
      if (delta > 0) {
        s.down += delta;
        s.up = 0;
      } else if (delta < 0) {
        s.up -= delta;
        s.down = 0;
      }

      const nextSolid = !isHome || y > s.heroEnd;
      let nextHidden = s.hidden;
      if (reduce || y < HIDE_AFTER) nextHidden = false;
      else if (s.down > HIDE_TRAVEL) nextHidden = true;
      else if (s.up > SHOW_TRAVEL) nextHidden = false;

      if (nextSolid !== s.solid) {
        s.solid = nextSolid;
        setSolid(nextSolid);
      }
      if (nextHidden !== s.hidden) {
        s.hidden = nextHidden;
        setHidden(nextHidden);
      }
    },
    [isHome, reduce],
  );

  useMotionValueEvent(scrollY, 'change', sync);

  // Where the hero ends: the header turns solid as the next section slides under it.
  useLayoutEffect(() => {
    const s = view.current;
    if (!isHome) {
      s.heroEnd = -1;
      sync(scrollY.get());
      return undefined;
    }
    const hero = document.querySelector('.ap-hero');
    const measure = () => {
      const barHeight = barRef.current?.offsetHeight || 76;
      s.heroEnd = hero
        ? hero.getBoundingClientRect().bottom + window.scrollY - barHeight
        : window.innerHeight * 0.85;
      sync(scrollY.get());
    };
    measure();
    const observer = hero ? new ResizeObserver(measure) : null;
    observer?.observe(hero);
    window.addEventListener('resize', measure);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [isHome, scrollY, sync]);

  const openMenu = () => {
    preloadPreview(previewKeyFor(currentRoute, treatmentId));
    setMenuOpen(true);
  };

  const closeMenu = useCallback(({ instant = false } = {}) => {
    setMenuOpen(false);
    // Remounting the presence drops the exit animation (used under the page curtain).
    if (instant) setPresenceKey((key) => key + 1);
  }, []);

  // While open: lock the page (Lenis + native), make the rest of the app inert,
  // trap focus between the header and the menu, and close on Escape.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const html = document.documentElement;
    const lenis = getLenis();
    const previousOverflow = html.style.overflow;
    lenis?.stop();
    html.style.overflow = 'hidden';

    const root = rootRef.current;
    const siblings = root?.parentElement
      ? [...root.parentElement.children].filter((el) => el !== root && !el.hasAttribute('inert'))
      : [];
    siblings.forEach((el) => el.setAttribute('inert', ''));

    const trigger = triggerRef.current;
    const focusFirst = requestAnimationFrame(() => {
      menuRef.current?.querySelector('.ap-nav__link')?.focus({ preventScroll: true });
    });

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu();
        return;
      }
      if (event.key !== 'Tab' || !root) return;
      const nodes = [...root.querySelectorAll(FOCUSABLE)].filter((el) => el.getClientRects().length);
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;
      if (!nodes.includes(active)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);

    // A route change from the menu: once the page curtain covers the screen,
    // drop the menu instantly so the new page is revealed without it.
    const curtainWatch = new MutationObserver(() => {
      if (html.getAttribute('data-curtain') === 'closed') closeMenu({ instant: true });
    });
    curtainWatch.observe(html, { attributes: true, attributeFilter: ['data-curtain'] });

    return () => {
      cancelAnimationFrame(focusFirst);
      document.removeEventListener('keydown', onKeyDown);
      curtainWatch.disconnect();
      siblings.forEach((el) => el.removeAttribute('inert'));
      html.style.overflow = previousOverflow;
      // The page curtain keeps Lenis stopped until it lifts (smoothScroll syncs it).
      if (html.getAttribute('data-curtain') !== 'closed') lenis?.start();
      trigger?.focus({ preventScroll: true });
    };
  }, [menuOpen, closeMenu]);

  // Internal links keep real hrefs (open in new tab works); plain clicks route in-app.
  const linkProps = (route, id) => ({
    onClick: (event) => {
      if (!isPlainClick(event)) return;
      event.preventDefault();
      const samePage = route === currentRoute && (!id || id === treatmentId);
      if (menuOpen && (samePage || reduce)) closeMenu();
      onNavigate?.(route, id);
    },
  });

  // A keyboard user tabbing into a tucked-away header brings it back.
  const revealOnFocus = () => {
    const s = view.current;
    s.down = 0;
    if (s.hidden) {
      s.hidden = false;
      setHidden(false);
    }
  };

  const tone = menuOpen ? 'open' : solid ? 'solid' : 'top';
  const classes = [
    'ap-nav',
    `ap-nav--${tone}`,
    hidden && !menuOpen ? 'ap-nav--hidden' : '',
    reduce ? 'ap-nav--static' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const enter = (delay, from) =>
    reduce
      ? { initial: false }
      : {
          initial: { opacity: 0, ...from },
          animate: ready ? { opacity: 1, x: 0, y: 0, scale: 1 } : undefined,
          transition: { duration: 1.15, ease: EASE_OUT, delay },
        };

  return (
    <div ref={rootRef} className={classes}>
      <header ref={barRef} className="ap-nav__bar" onFocusCapture={revealOnFocus}>
        <div className="ap-nav__bg" aria-hidden="true" />
        <div className="ap-nav__inner">
          <div className="ap-nav__slot ap-nav__slot--start">
            <motion.div className="ap-nav__enter" {...enter(0.5, { x: -18 })}>
              <button
                ref={triggerRef}
                type="button"
                className="ap-nav__trigger"
                aria-expanded={menuOpen}
                aria-controls="ap-nav-menu"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                onClick={() => (menuOpen ? closeMenu() : openMenu())}
                onPointerEnter={() => preloadPreview(previewKeyFor(currentRoute, treatmentId))}
              >
                <span className="ap-nav__glass ap-nav__glass--square" aria-hidden="true">
                  <span className="ap-nav__burger">
                    <span className="ap-nav__burger-line" />
                    <span className="ap-nav__burger-line" />
                    <span className="ap-nav__burger-line" />
                  </span>
                </span>
              </button>
            </motion.div>
          </div>

          <div className="ap-nav__slot ap-nav__slot--logo">
            <motion.div className="ap-nav__enter" {...enter(0.3, { y: -12, scale: 0.94 })}>
              <a
                className="ap-nav__logo"
                href="/"
                aria-label={`${CLINIC_INFO.name}, home`}
                aria-current={isHome ? 'page' : undefined}
                {...linkProps('home')}
              >
                <img className="ap-nav__logo-img ap-nav__logo-img--light" src={LOGO_SRC} alt="" />
                <img className="ap-nav__logo-img ap-nav__logo-img--gold" src={LOGO_SRC} alt="" />
              </a>
            </motion.div>
          </div>

          <div className="ap-nav__slot ap-nav__slot--end">
            <motion.div className="ap-nav__enter ap-nav__actions" {...enter(0.62, { x: 18 })}>
              <a
                className="ap-nav__glass ap-nav__glass--square ap-nav__icon"
                href="/prescription-skincare"
                aria-label="Professional skincare"
                aria-current={currentRoute === 'prescription-skincare' ? 'page' : undefined}
                {...linkProps('prescription-skincare')}
              >
                <ShoppingBag size={18} strokeWidth={1.5} aria-hidden="true" />
                <span className="ap-nav__tip" aria-hidden="true">
                  Skincare
                </span>
              </a>
              <a
                className="ap-nav__glass ap-nav__glass--square ap-nav__icon"
                href={BOOK_CONSULTATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Book a consultation"
              >
                <CalendarClock size={19} strokeWidth={1.5} aria-hidden="true" />
                <span className="ap-nav__tip" aria-hidden="true">
                  Book
                </span>
              </a>
            </motion.div>
          </div>
        </div>
      </header>

      <AnimatePresence key={presenceKey}>
        {menuOpen ? (
          <NavMenu
            key="menu"
            menuRef={menuRef}
            currentRoute={currentRoute}
            treatmentId={treatmentId}
            linkProps={linkProps}
            reduce={reduce}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}
