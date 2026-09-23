import { useRef } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowUpRight, Mail, MapPin } from 'lucide-react';
import InstagramIcon from './ui/InstagramIcon';
import { CLINIC_INFO } from '../data/treatmentData';
import { BOOK_CONSULTATION_URL, EMAIL_URL, INSTAGRAM_URL, PHONE_URL, whatsappLink } from '../data/links';
import { EASE_OUT, SPRING_SNAPPY, VIEWPORT } from '../motion/presets';
import { getLenis, scrollToTarget } from '../motion/smoothScroll';
import { routeLinkHandler, showConcernsPath } from '../utils/navigation';
import './Footer.css';

const LOGO = { src: '/assets/images/allure_logo.png', width: 614, height: 740 };

// There is no FAQ page yet: the closest live destination is a WhatsApp question to the clinic team.
const CONSULTATION_QUESTION_URL = whatsappLink(
  'Hello Allure Passions UK, I have a question about consultations.',
);

/*
 * Link kinds: `route` (in-app page), `anchor` (a homepage section, reached from any page),
 * `external` (new tab) and plain `href` (tel:/mailto:). Items without a destination render as text.
 */
const COLUMNS = [
  {
    id: 'quick-links',
    title: 'Quick Links',
    links: [
      { label: 'Treatments', route: 'treatments', href: '/treatments' },
      { label: 'Treatment Prices', route: 'pricing', href: '/pricing' },
      { label: 'Concerns', anchor: ['#concerns', '#what-we-treat'], href: '/#concerns' },
      { label: 'About Allure Passions', route: 'about', href: '/about' },
      { label: 'Clinical Results', anchor: ['#results'], href: '/#results' },
      { label: 'Professional Skincare Shop', route: 'prescription-skincare', href: '/prescription-skincare' },
    ],
  },
  {
    id: 'consultation',
    title: 'Consultation',
    links: [
      { label: 'Book Consultation', external: true, href: BOOK_CONSULTATION_URL, hint: 'opens WhatsApp in a new tab' },
      { label: 'Contact Clinic', href: PHONE_URL, hint: `call ${CLINIC_INFO.phone}` },
      { label: 'Consultation FAQs', external: true, href: CONSULTATION_QUESTION_URL, hint: 'ask our team on WhatsApp, opens in a new tab' },
    ],
    social: true,
  },
  {
    id: 'information',
    title: 'Information',
    links: [
      // Policy pages do not exist yet; they stay as text until they are published.
      { label: 'Privacy Policy' },
      { label: 'Terms of Service' },
      { label: 'Cookie Policy' },
      { label: 'Consultation Information & Governance', route: 'about', href: '/about' },
    ],
  },
];

const SOCIAL = [
  { label: 'Allure Passions UK on Instagram', href: INSTAGRAM_URL, Icon: InstagramIcon, external: true },
  { label: `Email ${CLINIC_INFO.email}`, href: EMAIL_URL, Icon: Mail },
];

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const column = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055 } },
};
const line = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE_OUT } },
};

const isModifiedClick = (event) =>
  event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;

const onHomePage = () => (window.location.pathname.replace(/\/$/, '') || '/') === '/';

/** Scroll to a homepage section; from another page, go home first and scroll once the curtain lifts. */
function homeAnchorHandler(onNavigate, selectors) {
  const find = () => selectors.map((selector) => document.querySelector(selector)).find(Boolean);
  return (event) => {
    if (isModifiedClick(event)) return;
    event.preventDefault();
    event.stopPropagation(); // Lenis's anchor handler would otherwise re-target the click.

    if (onHomePage()) {
      const target = find();
      if (selectors.includes('#concerns')) showConcernsPath();
      if (target) scrollToTarget(target);
      return;
    }

    onNavigate?.('home');
    const started = performance.now();
    const settle = () => {
      const curtainDown = document.documentElement.getAttribute('data-curtain') === 'closed';
      const target = onHomePage() && !curtainDown ? find() : null;
      if (target) {
        getLenis()?.resize(); // the page just swapped, so refresh Lenis's scroll limit first
        scrollToTarget(target);
        return;
      }
      if (performance.now() - started < 5000) requestAnimationFrame(settle);
    };
    requestAnimationFrame(settle);
  };
}

function FooterLink({ link, onNavigate }) {
  if (!link.href) {
    return <span className="ap-footer__text">{link.label}</span>;
  }

  let behaviour = {};
  if (link.route) behaviour = { onClick: routeLinkHandler(onNavigate, link.route) };
  else if (link.anchor) behaviour = { onClick: homeAnchorHandler(onNavigate, link.anchor) };
  else if (link.external) behaviour = { target: '_blank', rel: 'noopener noreferrer' };

  return (
    <a className="ap-footer__link" href={link.href} {...behaviour}>
      <span className="ap-footer__link-text">{link.label}</span>
      {link.hint ? <span className="ap-visually-hidden"> ({link.hint})</span> : null}
      {link.external ? <ArrowUpRight className="ap-footer__link-icon" size={15} strokeWidth={1.6} aria-hidden="true" /> : null}
    </a>
  );
}

/**
 * Section 15 — Footer (every route). Gold AP monogram, three link columns and the
 * clinic address bar. The monogram rises out of its frame and drifts slowly with the
 * last stretch of scroll; the columns stagger in line by line.
 */
export default function Footer({ onNavigate }) {
  const footerRef = useRef(null);
  const reduce = useReducedMotion();
  // The monogram starts below its clipping frame, so watch the frame (an element hidden by an
  // ancestor's overflow never registers with IntersectionObserver).
  const monoFrameRef = useRef(null);
  const monoInView = useInView(monoFrameRef, VIEWPORT);

  const { scrollYProgress } = useScroll({ target: footerRef, offset: ['start end', 'end end'] });
  const drift = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.6 });
  const monoY = useTransform(drift, [0, 1], [56, 0]);

  const reveal = reduce ? {} : { initial: 'hidden', whileInView: 'show', viewport: VIEWPORT };
  const year = new Date().getFullYear();

  return (
    <footer ref={footerRef} className="ap-footer">
      <div className="ap-container ap-footer__top">
        <div className="ap-footer__brand">
          <motion.div className="ap-footer__drift" style={reduce ? undefined : { y: monoY }}>
            <a
              className="ap-footer__mono-link"
              href="/"
              onClick={routeLinkHandler(onNavigate, 'home')}
              aria-label={`${CLINIC_INFO.name} home`}
            >
              <span ref={monoFrameRef} className="ap-footer__mono-frame">
                <motion.span
                  className="ap-footer__mono"
                  initial={reduce ? false : { y: '104%' }}
                  animate={reduce || !monoInView ? undefined : { y: '0%' }}
                  transition={{ duration: 1.35, ease: EASE_OUT }}
                >
                  <img src={LOGO.src} alt="" width={LOGO.width} height={LOGO.height} loading="lazy" decoding="async" />
                  <span className="ap-footer__sheen" aria-hidden="true">
                    {reduce ? null : (
                      <motion.span
                        className="ap-footer__glint"
                        initial={{ x: '-110%' }}
                        animate={monoInView ? { x: '110%' } : undefined}
                        transition={{ duration: 1.7, ease: [0.45, 0, 0.2, 1], delay: 1.05 }}
                      />
                    )}
                  </span>
                </motion.span>
              </span>
            </a>
          </motion.div>
        </div>

        <motion.div className="ap-footer__nav" variants={grid} {...reveal}>
          {COLUMNS.map((col) => (
            <motion.nav key={col.id} className="ap-footer__col" aria-labelledby={`ap-footer-${col.id}`} variants={column}>
              <motion.h2 id={`ap-footer-${col.id}`} className="ap-footer__heading" variants={line}>
                {col.title}
              </motion.h2>
              <ul className="ap-footer__list">
                {col.links.map((link) => (
                  <motion.li key={link.label} className="ap-footer__item" variants={line}>
                    <FooterLink link={link} onNavigate={onNavigate} />
                  </motion.li>
                ))}
              </ul>
              {col.social ? (
                <motion.ul className="ap-footer__social" variants={line} aria-label="Follow and contact">
                  {SOCIAL.map(({ label, href, Icon, external }) => (
                    <li key={href}>
                      <motion.a
                        className="ap-footer__icon"
                        href={href}
                        aria-label={label}
                        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        whileHover={reduce ? undefined : { y: -3 }}
                        whileTap={reduce ? undefined : { scale: 0.92 }}
                        transition={SPRING_SNAPPY}
                      >
                        <Icon size={16} strokeWidth={1.6} aria-hidden="true" />
                      </motion.a>
                    </li>
                  ))}
                </motion.ul>
              ) : null}
            </motion.nav>
          ))}
        </motion.div>
      </div>

      <div className="ap-footer__bar">
        <motion.span
          className="ap-footer__rule"
          aria-hidden="true"
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={reduce ? undefined : { scaleX: 1 }}
          viewport={{ once: true, amount: 1 }}
          transition={{ duration: 1.6, ease: EASE_OUT, delay: 0.2 }}
        />
        <motion.div
          className="ap-container ap-footer__bar-inner"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.35 }}
        >
          <a className="ap-footer__address" href={CLINIC_INFO.mapsUrl} target="_blank" rel="noopener noreferrer">
            <MapPin className="ap-footer__pin" size={18} strokeWidth={1.6} aria-hidden="true" />
            <span className="ap-footer__link-text">{CLINIC_INFO.address}</span>
            <span className="ap-visually-hidden"> (open in Google Maps, new tab)</span>
          </a>
          <p className="ap-footer__legal">© {year} Allure Passions UK. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}
