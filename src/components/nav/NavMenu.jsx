import { useState, useSyncExternalStore } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import Button from '../ui/Button';
import { EASE_INOUT, EASE_OUT, EASE_SOFT } from '../../motion/presets';
import { BOOK_CONSULTATION_URL, EMAIL_URL, INSTAGRAM_URL, PHONE_URL } from '../../data/links';
import { CLINIC_INFO } from '../../data/treatmentData';
import { withTrademarks } from '../../utils/trademarks';
import { MENU_LINKS, PREVIEWS, PREVIEW_CAPTIONS, previewKeyFor } from './menuData';

const WIDE_QUERY = '(min-width: 1024px)';

function useWide() {
  return useSyncExternalStore(
    (notify) => {
      const query = window.matchMedia(WIDE_QUERY);
      query.addEventListener('change', notify);
      return () => query.removeEventListener('change', notify);
    },
    () => window.matchMedia(WIDE_QUERY).matches,
    () => true,
  );
}

// The overlay drops like a curtain from the top and, on close, carries on
// downward so the header is uncovered first and can change tone straight away.
const MOTION = {
  overlay: {
    hidden: { clipPath: 'inset(0% 0% 100% 0%)' },
    show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 0.95, ease: EASE_INOUT } },
    exit: { clipPath: 'inset(100% 0% 0% 0%)', transition: { duration: 0.85, ease: EASE_INOUT, delay: 0.06 } },
  },
  inner: {
    hidden: { y: -90 },
    show: { y: 0, opacity: 1, transition: { duration: 1.25, ease: EASE_OUT } },
    exit: { y: 70, opacity: 0, transition: { duration: 0.7, ease: EASE_INOUT } },
  },
  rise: {
    hidden: { y: '112%' },
    show: (i = 0) => ({ y: '0%', transition: { duration: 1.05, ease: EASE_OUT, delay: 0.3 + i * 0.075 } }),
  },
  fade: {
    hidden: { opacity: 0, y: 14 },
    show: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE_OUT, delay } }),
  },
  line: {
    hidden: { scaleX: 0 },
    show: { scaleX: 1, transition: { duration: 1.3, ease: EASE_INOUT, delay: 0.45 } },
  },
  frame: {
    hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
    show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.2, ease: EASE_INOUT, delay: 0.38 } },
  },
  zoom: {
    hidden: { scale: 1.22 },
    show: { scale: 1, transition: { duration: 1.9, ease: EASE_OUT, delay: 0.38 } },
  },
};

const REDUCED = {
  overlay: {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.2, ease: EASE_SOFT } },
    exit: { opacity: 0, transition: { duration: 0.15 } },
  },
};

const HOURS = CLINIC_INFO.hours.split('|').map((part) => part.trim());

/**
 * Full-screen site menu: staggered serif links (with the six treatments),
 * a photo that crossfades to the hovered destination, contact details and
 * the gold consultation button. Rendered by Navbar inside <AnimatePresence>.
 */
export default function NavMenu({ menuRef, currentRoute, treatmentId, linkProps, reduce }) {
  const wide = useWide();
  const homeKey = previewKeyFor(currentRoute, treatmentId);
  const [preview, setPreview] = useState(homeKey);
  const v = reduce ? REDUCED : MOTION;

  const isCurrent = (route, id) =>
    id ? currentRoute === 'treatment-detail' && treatmentId === id : currentRoute === route;

  const hoverProps = (key) => ({
    onPointerEnter: () => setPreview(key),
    onFocus: () => setPreview(key),
  });

  return (
    <motion.div
      ref={menuRef}
      id="ap-nav-menu"
      className="ap-nav__menu"
      data-lenis-prevent
      variants={v.overlay}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <motion.div className="ap-nav__menu-inner" variants={v.inner}>
        <div className="ap-nav__menu-main">
          <nav className="ap-nav__primary" aria-label="Main menu">
            <ol className="ap-nav__list" onPointerLeave={() => setPreview(homeKey)}>
              {MENU_LINKS.map((link, index) => {
                const current = isCurrent(link.route);
                const section = link.route === 'treatments' && currentRoute === 'treatment-detail';
                return (
                  <li key={link.route} className="ap-nav__item">
                    <motion.span className="ap-nav__index" aria-hidden="true" variants={v.fade} custom={0.4 + index * 0.075}>
                      {String(index + 1).padStart(2, '0')}
                    </motion.span>
                    <a
                      className={`ap-nav__link${section ? ' is-section' : ''}`}
                      href={link.href}
                      aria-current={current ? 'page' : undefined}
                      {...linkProps(link.route)}
                      {...hoverProps(link.route)}
                    >
                      <span className="ap-nav__mask">
                        <motion.span className="ap-nav__word" variants={v.rise} custom={index}>
                          {link.label}
                          <ArrowUpRight className="ap-nav__arrow" size={26} strokeWidth={1.2} aria-hidden="true" />
                        </motion.span>
                      </span>
                    </a>

                    {link.children ? (
                      <ul className="ap-nav__sub" aria-label="Treatments">
                        {link.children.map((child, childIndex) => (
                          <motion.li key={child.id} variants={v.fade} custom={0.62 + childIndex * 0.04}>
                            <a
                              className="ap-nav__sub-link"
                              href={child.href}
                              aria-current={isCurrent('treatment-detail', child.id) ? 'page' : undefined}
                              {...linkProps('treatment-detail', child.id)}
                              {...hoverProps(child.id)}
                            >
                              {withTrademarks(child.label)}
                            </a>
                          </motion.li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                );
              })}
            </ol>
          </nav>

          {wide ? <MenuVisual active={preview} v={v} /> : null}
        </div>

        <div className="ap-nav__foot">
          <motion.span className="ap-nav__rule" aria-hidden="true" variants={v.line} />
          <address className="ap-nav__contacts">
            <motion.div className="ap-nav__contact" variants={v.fade} custom={0.62}>
              <span className="ap-nav__label">Visit</span>
              <a href={CLINIC_INFO.mapsUrl} target="_blank" rel="noopener noreferrer">
                {CLINIC_INFO.address}
              </a>
            </motion.div>
            <motion.div className="ap-nav__contact" variants={v.fade} custom={0.68}>
              <span className="ap-nav__label">Call</span>
              <a href={PHONE_URL}>{CLINIC_INFO.phone}</a>
            </motion.div>
            <motion.div className="ap-nav__contact" variants={v.fade} custom={0.74}>
              <span className="ap-nav__label">Email</span>
              <a href={EMAIL_URL}>{CLINIC_INFO.email}</a>
              <a className="ap-nav__social" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                {CLINIC_INFO.instagram}
              </a>
            </motion.div>
            <motion.div className="ap-nav__contact" variants={v.fade} custom={0.8}>
              <span className="ap-nav__label">Hours</span>
              {HOURS.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </motion.div>
          </address>
          <motion.div className="ap-nav__cta" variants={v.fade} custom={0.86}>
            <Button href={BOOK_CONSULTATION_URL} target="_blank" rel="noopener noreferrer">
              Book a Consultation
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/**
 * Stacked previews: each picture mounts the first time its link is hovered and
 * crossfades in once decoded, so the previous one holds until then (no flash).
 */
function MenuVisual({ active, v }) {
  const [mounted, setMounted] = useState([active]);
  const [loaded, setLoaded] = useState({});
  const [shown, setShown] = useState(active);

  // Adjust state while rendering (no effect round-trip): mount newly hovered
  // previews, and switch to the active one as soon as it has decoded.
  if (!mounted.includes(active)) setMounted([...mounted, active]);
  if (shown !== active && loaded[active]) setShown(active);

  const markLoaded = (key) => setLoaded((state) => (state[key] ? state : { ...state, [key]: true }));

  return (
    <div className="ap-nav__visual" aria-hidden="true">
      <motion.div className="ap-nav__frame" variants={v.frame}>
        <motion.div className="ap-nav__frame-zoom" variants={v.zoom}>
          {mounted.map((key) => (
            <img
              key={key}
              ref={(img) => {
                if (img?.complete && img.naturalWidth) markLoaded(key);
              }}
              className={key === shown ? 'is-shown' : undefined}
              src={PREVIEWS[key].src}
              style={{ objectPosition: PREVIEWS[key].position }}
              alt=""
              decoding="async"
              onLoad={() => markLoaded(key)}
            />
          ))}
        </motion.div>
      </motion.div>
      <motion.div className="ap-nav__caption" variants={v.fade} custom={0.7}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
          >
            {PREVIEW_CAPTIONS[active]}
          </motion.span>
        </AnimatePresence>
        <span className="ap-nav__caption-mark">Allure Passions UK</span>
      </motion.div>
    </div>
  );
}
