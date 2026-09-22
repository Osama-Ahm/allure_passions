import { useId } from 'react';
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import SectionHeading from './ui/SectionHeading';
import Button from './ui/Button';
import { Reveal, RevealGroup, RevealItem } from '../motion/Reveal';
import { EASE_INOUT, EASE_OUT } from '../motion/presets';
import { routeLinkHandler } from '../utils/navigation';
import './AccreditationsSection.css';

// Scalloped seal: eight lobes around a centre disc (see RosetteIcon).
const LOBES = Array.from({ length: 8 }, (_, i) => {
  const angle = (i * Math.PI) / 4 - Math.PI / 2;
  return [30 + 19 * Math.cos(angle), 28.5 + 19 * Math.sin(angle)];
});

/** Filled award rosette with a check cut through it (Figma "London Clinic Series" mark). */
function RosetteIcon() {
  const mask = `ap-rosette-${useId().replace(/[^\w-]/g, '')}`;
  return (
    <svg viewBox="0 0 60 84" width="60" height="84" aria-hidden="true" focusable="false">
      <defs>
        <mask id={mask} maskUnits="userSpaceOnUse" x="0" y="0" width="60" height="84">
          <g fill="#fff">
            <circle cx="30" cy="28.5" r="20.5" />
            {LOBES.map(([cx, cy]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="9.5" />
            ))}
          </g>
          <path d="M20.5 30 L27 36.4 L39.5 23.6" fill="none" stroke="#000" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </mask>
      </defs>
      <path d="M18.8 52 V79.6 L30 71.6 L41.2 79.6 V52" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <rect width="60" height="58" fill="currentColor" mask={`url(#${mask})`} />
    </svg>
  );
}

/** Filled shield with a check cut through it (Figma "Clinical Governance" mark). */
function ShieldIcon() {
  const mask = `ap-shield-${useId().replace(/[^\w-]/g, '')}`;
  return (
    <svg viewBox="0 0 64 78" width="64" height="78" aria-hidden="true" focusable="false">
      <defs>
        <mask id={mask} maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="78">
          <path
            d="M32 .6 62.4 13a2.6 2.6 0 0 1 1.6 2.4V38c0 18.4-12.6 33-32 39.4C12.6 71 0 56.4 0 38V15.4A2.6 2.6 0 0 1 1.6 13Z"
            fill="#fff"
          />
          <path d="M14.2 42.4 25.4 53.6 50 29" fill="none" stroke="#000" strokeWidth="7.2" strokeLinejoin="miter" />
        </mask>
      </defs>
      <rect width="64" height="78" fill="currentColor" mask={`url(#${mask})`} />
    </svg>
  );
}

const CARDS = [
  {
    id: 'honour',
    tone: 'charcoal',
    eyebrow: 'Annual Clinical Honour',
    title: 'London Clinic Series',
    Icon: RosetteIcon,
    statement: 'Best Advanced Skin & Body Aesthetics Clinic 2026 – London',
    meta: { strong: 'GHP Awards', text: 'Presented by Global Health & Pharma' },
    footer: { label: 'Program: Global Excellence Awards', status: 'Verified Entry' },
  },
  {
    id: 'governance',
    tone: 'black',
    eyebrow: 'Regulatory Status',
    title: 'Clinical Governance',
    Icon: ShieldIcon,
    statement: 'JCCP Registered Sanctuary',
    body: 'Alongside relevant professional qualifications, advanced technology training, industry memberships and continuing professional education.',
    footer: { label: 'Joint Council for Cosmetic Practitioners', status: 'Level 6 Compliant' },
  },
];

// Card contents rise in after the card itself; `custom` is the delay in seconds.
const rise = {
  hidden: { opacity: 0, y: 16 },
  show: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE_OUT, delay } }),
};
const iconSettle = {
  hidden: { opacity: 0, scale: 0.55, rotate: -18 },
  show: { opacity: 1, scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 170, damping: 14, delay: 0.42 } },
};
const drawLine = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1.25, ease: EASE_INOUT, delay: 0.5 } },
};

function RecognitionCard({ card }) {
  const reduce = useReducedMotion();
  const pointerX = useMotionValue(-600);
  const pointerY = useMotionValue(-600);
  const glow = useMotionValue(0);
  const glowSpring = useSpring(glow, { stiffness: 150, damping: 24 });
  const glowOpacity = reduce ? glow : glowSpring;
  const fill = useMotionTemplate`radial-gradient(440px circle at ${pointerX}px ${pointerY}px, rgba(221, 196, 140, 0.14), rgba(221, 196, 140, 0) 62%)`;
  const edge = useMotionTemplate`radial-gradient(320px circle at ${pointerX}px ${pointerY}px, rgba(232, 208, 150, 0.75), rgba(232, 208, 150, 0) 70%)`;

  const track = (event) => {
    if (event.pointerType === 'touch') return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(event.clientX - rect.left);
    pointerY.set(event.clientY - rect.top);
  };
  const enter = (event) => {
    if (event.pointerType === 'touch') return;
    track(event);
    glow.set(1);
  };
  const leave = () => glow.set(0);

  const { Icon } = card;
  const v = (variants) => (reduce ? undefined : variants);

  return (
    <article
      className={`ap-recognition__card ap-recognition__card--${card.tone}`}
      onPointerEnter={enter}
      onPointerMove={track}
      onPointerLeave={leave}
    >
      <motion.span className="ap-recognition__spotlight" style={{ background: fill, opacity: glowOpacity }} aria-hidden="true" />
      <motion.span className="ap-recognition__edge" style={{ background: edge, opacity: glowOpacity }} aria-hidden="true" />

      <header className="ap-recognition__head">
        <div className="ap-recognition__heading">
          <motion.p className="ap-recognition__eyebrow" variants={v(rise)} custom={0.18}>
            {card.eyebrow}
          </motion.p>
          <motion.h3 className="ap-recognition__title" variants={v(rise)} custom={0.26}>
            {card.title}
          </motion.h3>
        </div>
        <motion.span className="ap-recognition__icon" variants={v(iconSettle)}>
          <span className="ap-recognition__icon-inner">
            <Icon />
          </span>
        </motion.span>
      </header>

      <div className="ap-recognition__body">
        <motion.p className="ap-recognition__statement" variants={v(rise)} custom={0.34}>
          {card.statement}
        </motion.p>
        {card.meta ? (
          <motion.p className="ap-recognition__meta" variants={v(rise)} custom={0.44}>
            <span className="ap-recognition__meta-strong">{card.meta.strong}</span>
            <span className="ap-recognition__meta-sep" aria-hidden="true" />
            <span>{card.meta.text}</span>
          </motion.p>
        ) : null}
        {card.body ? (
          <motion.p className="ap-recognition__text" variants={v(rise)} custom={0.44}>
            {card.body}
          </motion.p>
        ) : null}
      </div>

      <footer className="ap-recognition__footer">
        <motion.span className="ap-recognition__rule" variants={v(drawLine)} aria-hidden="true" />
        <motion.p className="ap-recognition__footer-row" variants={v(rise)} custom={0.62}>
          <span className="ap-recognition__footer-label">{card.footer.label}</span>
          <span className="ap-recognition__footer-status">{card.footer.status}</span>
        </motion.p>
      </footer>
    </article>
  );
}

/**
 * Section 8 — Recognised for Advanced Aesthetic Care.
 * Two credential cards (GHP award, JCCP registration) with a pointer-following gold
 * spotlight, then the "View Our Credentials" link to the About page.
 */
export default function AccreditationsSection({ onNavigate }) {
  return (
    <section className="ap-section ap-recognition" aria-labelledby="ap-recognition-title">
      <div className="ap-container">
        <SectionHeading
          id="ap-recognition-title"
          className="ap-recognition__heading-block"
          align="center"
          title="Recognised for"
          accent="Advanced Aesthetic Care"
          intro="Professional standards, continuous education and trusted recognition form an important part of the Allure Passions approach."
        />

        <RevealGroup className="ap-recognition__grid" gap={0.14} amount={0.25}>
          {CARDS.map((card) => (
            <RevealItem key={card.id} variant="card" className="ap-recognition__item">
              <RecognitionCard card={card} />
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="ap-recognition__cta" delay={0.1}>
          <Button href="/about" onClick={routeLinkHandler(onNavigate, 'about')}>
            View Our Credentials
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
