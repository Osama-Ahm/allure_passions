import { startTransition, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  LayoutGroup,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import TextReveal from '../motion/TextReveal';
import { Reveal } from '../motion/Reveal';
import { EASE_INOUT, EASE_OUT, SPRING_SNAPPY } from '../motion/presets';
import Button from './ui/Button';
import ArrowButton from './ui/ArrowButton';
import ResponsiveImg from './ui/ResponsiveImg';
import { coverWidth } from '../utils/responsiveImages';
import { POPULAR_TREATMENTS } from '../data/treatmentData';
import { SHOW_CONCERNS_EVENT, routeLinkHandler } from '../utils/navigation';
import './TreatmentAreasSection.css';

// Path A: start from the concern. Order follows the Figma (Redness, Ageing, Stubborn Fat first).
const CONCERN_CARDS = [
  {
    key: 'rosacea',
    title: 'Redness & Rosacea',
    area: 'Skin',
    via: 'ADVATx',
    image: '/assets/images/concern_rosacea.jpg',
    position: '50% 50%',
    alt: 'Close-up of facial erythema, visible broken capillaries, and redness on cheeks',
    treatmentId: 'advatx',
  },
  {
    key: 'ageing',
    title: 'Ageing Skin',
    area: 'Skin',
    via: 'Morpheus8, Sofwave',
    image: '/assets/images/concern_skin_laxity.jpg',
    position: '50% 30%',
    alt: 'Portrait of mature skin showing fine lines, crow’s feet, and natural skin laxity',
    treatmentId: 'morpheus8',
  },
  {
    key: 'stubborn-fat',
    title: 'Stubborn Fat',
    area: 'Body',
    via: 'Emsculpt Neo',
    image: '/assets/images/concern_stubborn_fat.jpg',
    position: '50% 50%',
    alt: 'Aesthetic photography of midsection highlighting localized abdominal fullness',
    treatmentId: 'emsculpt_neo',
  },
  {
    key: 'pigmentation',
    title: 'Melasma & Pigmentation',
    area: 'Skin',
    via: 'PicoWay',
    image: '/assets/images/concern_hyperpigmentation.jpg',
    position: '50% 50%',
    alt: 'Macro dermatological portrait showing sun damage spots, uneven tone, and melasma patches',
    treatmentId: 'picoway',
  },
  {
    key: 'acne-scarring',
    title: 'Acne Scarring',
    area: 'Skin',
    via: 'Morpheus8, PicoWay',
    image: '/assets/images/concern_acne_scarring.jpg',
    position: '50% 50%',
    alt: 'Close-up photography of cheek skin showing atrophic acne scars and textured surface',
    treatmentId: 'morpheus8',
  },
  {
    key: 'tattoo',
    title: 'Tattoo Removal',
    area: 'Laser',
    via: 'PicoWay',
    image: '/assets/images/concern_tattoo_removal.jpg',
    position: '50% 50%',
    alt: 'Detailed view of decorative dark ink tattoo on forearm skin for aesthetic removal',
    treatmentId: 'tattoo_removal',
  },
  {
    key: 'lips',
    title: 'Lip Enhancement',
    area: 'Skin',
    via: 'ADVATx',
    image: '/assets/images/concern_lip_plumping.jpg',
    position: '50% 50%',
    alt: 'Macro beauty close-up of natural lips with vertical fine lines and subtle volume',
    treatmentId: 'advatx',
  },
];

// Path B: start from the treatment (every treatment page, in POPULAR_TREATMENTS order).
const TREATMENT_CARD_DETAILS = {
  picoway: {
    title: 'PicoWay',
    area: 'Laser',
    via: 'Pigmentation & Tattoos',
    image: '/assets/images/site/treatment-picoway.webp',
    position: '50% 50%',
    alt: 'Patient in protective eyewear receiving a laser facial treatment',
  },
  advatx: {
    title: 'ADVATx',
    area: 'Skin',
    via: 'Redness & Rosacea',
    image: '/assets/images/site/treatment-advatx.webp',
    position: '42% 50%',
    alt: 'Gloved practitioner applying a laser handpiece to a patient’s cheek',
  },
  morpheus8: {
    title: 'Morpheus8',
    area: 'Skin',
    via: 'Tightening & Texture',
    image: '/assets/images/site/treatment-morpheus8.webp',
    position: '40% 50%',
    alt: 'Radiofrequency microneedling handpiece held to a patient’s cheek',
  },
  sofwave: {
    title: 'Sofwave',
    area: 'Skin',
    via: 'Lifting & Tightening',
    image: '/assets/images/site/treatment-sofwave.webp',
    position: '72% 50%',
    alt: 'Ultrasound handpiece placed along a reclined patient’s jawline',
  },
  emsculpt_neo: {
    title: 'Emsculpt Neo',
    area: 'Body',
    via: 'Muscle & Contouring',
    image: '/assets/images/site/emsculpt-neo.webp',
    position: '62% 45%',
    alt: 'Emsculpt NEO applicator strapped across a client’s abdomen',
  },
  emerald_laser: {
    title: 'Emerald Laser',
    area: 'Body',
    via: 'Fat Reduction',
    image: '/assets/images/site/emerald-laser.webp',
    position: '45% 55%',
    alt: 'Emerald laser arms above a client, with green laser lines across her abdomen',
  },
  cosmelan: {
    title: 'Cosmelan',
    area: 'Skin',
    via: 'Melasma & Pigment',
    image: '/assets/images/site/treatment-cosmelan.jpg',
    position: '50% 50%',
    alt: 'Clinical practitioner applying professional Cosmelan depigmentation mask to patient',
  },
  hydrafacial: {
    title: 'HydraFacial',
    area: 'Skin',
    via: 'Hydration & Radiance',
    image: '/assets/images/site/treatment-hydrafacial.jpg',
    position: '50% 50%',
    alt: 'Clinical aesthetician performing HydraFacial vortex-fusion suction treatment',
  },
  biorepeel: {
    title: 'BioRePeel',
    area: 'Skin',
    via: 'Peel & Renewal',
    image: '/assets/images/area_cheeks.jpg',
    position: '50% 45%',
    alt: 'A gloved practitioner treating a client’s cheek',
  },
  microneedling_exosomes: {
    title: 'Microneedling',
    area: 'Skin',
    via: 'Exosome Renewal',
    image: '/assets/images/prefooter_serum.jpg',
    position: '32% 50%',
    alt: 'A serum dropper held above a client’s cheek in soft light',
  },
  tattoo_removal: {
    title: 'Tattoo Removal',
    area: 'Laser',
    via: 'PicoWay Laser',
    image: '/assets/images/concern_tattoo_removal.jpg',
    position: '50% 50%',
    alt: 'Detailed view of a dark ink tattoo on forearm skin',
  },
};

const TREATMENT_CARDS = POPULAR_TREATMENTS.filter((t) => TREATMENT_CARD_DETAILS[t.id]).map((t) => ({
  key: t.id,
  treatmentId: t.id,
  ...TREATMENT_CARD_DETAILS[t.id],
}));

const PATHS = [
  { id: 'concern', label: 'Path A: By Concern', cta: 'Explore All Concerns', items: CONCERN_CARDS, noun: 'concerns' },
  { id: 'treatment', label: 'Path B: By Treatment', cta: 'Explore All Treatments', items: TREATMENT_CARDS, noun: 'treatments' },
];

const CARD_RATIO = 406 / 300; // Figma card: 300 x 406
const SLIDE = { type: 'spring', stiffness: 150, damping: 26, mass: 0.9 };

// Whole cards on screen, gaps and card size for the stage width. `screenHeight` (the small
// viewport height, so it doesn't change as mobile browser bars slide) keeps a card shorter
// than the screen on phones held sideways.
function computeLayout(width, screenHeight = Infinity) {
  let k;
  let g;
  let w;
  if (width >= 1200) {
    k = 3;
    // The Figma card (300px) up to ~1680px; wider screens grow it gently so the row keeps its presence.
    w = Math.min(380, Math.max(300, Math.round(300 + (width - 1680) * 0.1)));
    g = w > 300 ? 36 : 30;
  } else if (width >= 900) {
    k = 3;
    g = 24;
    w = Math.min(300, Math.floor((width - 2 * 112 - 2 * g) / 3));
  } else if (width >= 768) {
    k = 2;
    g = 24;
    w = Math.min(300, Math.floor((width - 2 * 100 - g) / 2));
  } else if (width >= 600) {
    // Small tablets and big phones on their side: the arrows move below the cards (CSS),
    // so the two cards can use the width the side arrows would have taken.
    k = 2;
    g = 18;
    w = Math.min(300, Math.floor((width - 2 * (40 + g) - g) / 2));
  } else {
    k = 1;
    g = 14;
    w = Math.min(320, width - 2 * (38 + g));
  }
  const maxHeight = Math.max(240, Math.round(screenHeight * 0.74));
  if (w * CARD_RATIO > maxHeight) w = Math.floor(maxHeight / CARD_RATIO);
  const step = w + g;
  const left0 = (width - (k * w + (k - 1) * g)) / 2;
  return {
    k,
    w,
    h: Math.round(w * CARD_RATIO),
    step,
    left0,
    extra: Math.ceil(left0 / step) + 1,
    frost: Math.max(0, Math.round(left0 - g / 2)),
    over: k === 1 ? 16 : 24,
  };
}

const wrap = (n, len) => ((n % len) + len) % len;

const cardVariants = {
  hidden: { opacity: 0, y: 44, scale: 0.965 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1.05, ease: EASE_OUT, delay: 0.05 + i * 0.08 },
  }),
  exit: (i = 0) => ({
    opacity: 0,
    y: -16,
    scale: 0.985,
    transition: { duration: 0.34, ease: EASE_INOUT, delay: i * 0.025 },
  }),
};

function PathCard({ item, n, order, pos, layout, interactive, reduce, onPeek, onNavigate, suppressClick }) {
  const x = useTransform(pos, (p) => layout.left0 + (n - p) * layout.step);

  const handleClick = (event) => {
    if (suppressClick.current) {
      event.preventDefault();
      return;
    }
    if (!interactive) {
      event.preventDefault();
      onPeek(n);
      return;
    }
    routeLinkHandler(onNavigate, 'treatment-detail', item.treatmentId)(event);
  };

  return (
    <motion.a
      className={`ap-paths__card${interactive ? '' : ' is-peek'}`}
      href={`/treatments/${item.treatmentId}`}
      data-n={n}
      draggable={false}
      tabIndex={interactive ? 0 : -1}
      aria-hidden={interactive ? undefined : true}
      style={{ x, width: layout.w, height: layout.h, top: layout.over }}
      variants={reduce ? undefined : cardVariants}
      custom={order}
      onClick={handleClick}
    >
      <span className="ap-paths__media">
        <ResponsiveImg
          src={item.image}
          sizes={`${coverWidth(item.image, layout.w, layout.h)}px`}
          alt={item.alt}
          loading="lazy"
          decoding="async"
          draggable={false}
          style={{ objectPosition: item.position }}
        />
      </span>
      <span className="ap-paths__shade" aria-hidden="true" />
      <span className="ap-paths__caption">
        <h3 className="ap-paths__card-title">{item.title}</h3>
        <span className="ap-paths__card-meta">
          <span className="ap-paths__card-area">{item.area}</span> · {item.via}
        </span>
      </span>
      <span className="ap-paths__chip" aria-hidden="true">
        <ArrowUpRight size={18} strokeWidth={1.6} />
      </span>
    </motion.a>
  );
}

/**
 * Section 2 — "Start With What Matters to You". Two ways in (by concern / by treatment)
 * over a looping card carousel whose outer cards sit under frosted glass, as in the Figma.
 * The section rises over the end of the pinned hero video like a sheet.
 */
export default function TreatmentAreasSection({ onNavigate }) {
  const reduce = useReducedMotion();
  const stageRef = useRef(null);
  const inView = useInView(stageRef, { once: true, amount: 0.3 });

  const [pathId, setPathId] = useState('concern');
  const path = PATHS.find((p) => p.id === pathId);
  const items = path.items;

  const [layout, setLayout] = useState(() =>
    typeof document === 'undefined'
      ? computeLayout(1440)
      : computeLayout(document.documentElement.clientWidth, window.innerHeight),
  );

  // One position (in cards) per path, so switching back keeps your place.
  const posConcern = useMotionValue(0);
  const posTreatment = useMotionValue(0);
  const positions = { concern: posConcern, treatment: posTreatment };
  const pos = positions[pathId];
  const [indices, setIndices] = useState({ concern: 0, treatment: 0 });
  const index = indices[pathId];
  const targets = useRef({ concern: 0, treatment: 0 });

  const suppressClick = useRef(false);
  const panOrigin = useRef(0);
  const wheel = useRef({ acc: 0, lock: 0 });
  const pendingFocus = useRef(null);
  const tabRefs = useRef({});

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;
    // A 100svh probe reads the small viewport height, which holds still while mobile browser bars slide.
    const probe = document.createElement('div');
    probe.setAttribute('aria-hidden', 'true');
    probe.style.cssText = 'position:fixed;top:0;left:0;width:0;height:100svh;visibility:hidden;pointer-events:none';
    document.body.appendChild(probe);
    const measure = () => setLayout(computeLayout(stage.clientWidth, probe.offsetHeight || window.innerHeight));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    observer.observe(probe);
    return () => {
      observer.disconnect();
      probe.remove();
    };
  }, []);

  const setIndex = useCallback(
    (value) => setIndices((prev) => (prev[pathId] === value ? prev : { ...prev, [pathId]: value })),
    [pathId],
  );

  const glideTo = useCallback(
    (target, velocity = 0) => {
      targets.current[pathId] = target;
      setIndex(target);
      if (reduce) {
        pos.set(target);
        return;
      }
      animate(pos, target, { ...SLIDE, velocity });
    },
    [pathId, pos, reduce, setIndex],
  );

  const go = useCallback((delta) => glideTo(targets.current[pathId] + delta), [glideTo, pathId]);

  // Clicking a softened outer card brings it fully into view instead of navigating.
  const bringIntoView = useCallback(
    (n) => {
      const first = targets.current[pathId];
      if (n < first) go(n - first);
      else go(n - (first + layout.k - 1));
    },
    [go, layout.k, pathId],
  );

  // Keyboard focus follows its slot after arrow-key navigation.
  useEffect(() => {
    if (pendingFocus.current == null || !stageRef.current) return;
    const el = stageRef.current.querySelector(`[data-n="${index + pendingFocus.current}"]`);
    pendingFocus.current = null;
    el?.focus({ preventScroll: true });
  }, [index]);

  const onStageKeyDown = (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const n = Number(document.activeElement?.dataset?.n);
    if (Number.isFinite(n)) pendingFocus.current = n - index;
    go(event.key === 'ArrowLeft' ? -1 : 1);
  };

  const onPanStart = () => {
    pos.stop();
    panOrigin.current = pos.get();
    suppressClick.current = true;
  };
  const onPan = (_, info) => {
    const p = panOrigin.current - info.offset.x / layout.step;
    pos.set(p);
    setIndex(Math.round(p));
  };
  const onPanEnd = (_, info) => {
    const velocity = -info.velocity.x / layout.step;
    const projected = pos.get() + velocity * 0.22;
    const origin = Math.round(panOrigin.current);
    const target = Math.max(origin - layout.k, Math.min(origin + layout.k, Math.round(projected)));
    glideTo(target, velocity);
    window.setTimeout(() => {
      suppressClick.current = false;
    }, 60);
  };

  // Two-finger horizontal trackpad swipes page the carousel.
  const onWheel = (event) => {
    if (Math.abs(event.deltaX) <= Math.abs(event.deltaY) * 1.2) return;
    const now = performance.now();
    if (now < wheel.current.lock) return;
    wheel.current.acc += event.deltaX;
    if (Math.abs(wheel.current.acc) > 48) {
      go(Math.sign(wheel.current.acc));
      wheel.current = { acc: 0, lock: now + 520 };
    }
  };

  const choosePath = (id) => {
    if (id === pathId) return;
    // Swapping in the other deck is heavy on a phone; as a transition the tap paints first (INP)
    startTransition(() => setPathId(id));
  };

  // "Explore your concerns" links elsewhere on the page bring back the by-concern tab.
  useEffect(() => {
    const showConcerns = () => setPathId('concern');
    window.addEventListener(SHOW_CONCERNS_EVENT, showConcerns);
    return () => window.removeEventListener(SHOW_CONCERNS_EVENT, showConcerns);
  }, []);

  const onTabKeyDown = (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const i = PATHS.findIndex((p) => p.id === pathId);
    let next = i;
    if (event.key === 'ArrowLeft') next = (i - 1 + PATHS.length) % PATHS.length;
    if (event.key === 'ArrowRight') next = (i + 1) % PATHS.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = PATHS.length - 1;
    const id = PATHS[next].id;
    choosePath(id);
    tabRefs.current[id]?.focus();
  };

  const slots = [];
  for (let n = index - layout.extra; n <= index + layout.k - 1 + layout.extra; n += 1) slots.push(n);

  const visible = Array.from({ length: Math.min(layout.k, items.length) }, (_, i) => items[wrap(index + i, items.length)]);
  const firstShown = wrap(index, items.length) + 1;
  const live = `${visible.map((v) => v.title).join(', ')}. Showing ${firstShown} of ${items.length} ${path.noun}.`;
  const counter = String(firstShown).padStart(2, '0');
  const total = String(items.length).padStart(2, '0');

  const stageHeight = layout.h + layout.over * 2;
  const trackState = reduce || inView ? 'show' : 'hidden';

  return (
    <section id="concerns" className="ap-paths" aria-labelledby="ap-paths-title">
      <div className="ap-container ap-paths__head">
        <div className="ap-paths__intro">
          <TextReveal as="h2" id="ap-paths-title" className="ap-h2 ap-paths__title">
            Start With What <em className="ap-accent">Matters to You</em>
          </TextReveal>
          <Reveal as="p" delay={0.14} className="ap-paths__lead">
            Some patients already know which treatment they are looking for. Others simply know what they would like
            to improve.
          </Reveal>
          <Reveal as="p" delay={0.22} className="ap-paths__lead ap-paths__lead--strong">
            Explore Allure Passions in the way that feels right for you.
          </Reveal>
        </div>

        <Reveal delay={0.3} className="ap-paths__switch-wrap">
          <LayoutGroup id="ap-paths-switch">
            <div className="ap-paths__switch" role="tablist" aria-label="Explore by" onKeyDown={onTabKeyDown}>
              {PATHS.map((p) => {
                const active = p.id === pathId;
                return (
                  <button
                    key={p.id}
                    ref={(el) => {
                      tabRefs.current[p.id] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`ap-paths-tab-${p.id}`}
                    aria-selected={active}
                    aria-controls="ap-paths-panel"
                    tabIndex={active ? 0 : -1}
                    className={`ap-paths__tab${active ? ' is-active' : ''}`}
                    onClick={() => choosePath(p.id)}
                  >
                    {active ? (
                      <motion.span
                        layoutId="ap-paths-pill"
                        className="ap-paths__pill"
                        transition={reduce ? { duration: 0 } : SPRING_SNAPPY}
                        aria-hidden="true"
                      />
                    ) : null}
                    <span className="ap-paths__tab-label">{p.label}</span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </Reveal>
      </div>

      <div
        id="ap-paths-panel"
        role="tabpanel"
        aria-labelledby={`ap-paths-tab-${pathId}`}
        className="ap-paths__panel"
      >
        <motion.div
          ref={stageRef}
          className="ap-paths__stage"
          data-overflow-ok
          role="region"
          aria-roledescription="carousel"
          aria-label={path.id === 'concern' ? 'Concerns' : 'Treatments'}
          style={{ height: stageHeight, '--ap-paths-frost': `${layout.frost}px` }}
          onPanStart={onPanStart}
          onPan={onPan}
          onPanEnd={onPanEnd}
          onWheel={onWheel}
          onKeyDown={onStageKeyDown}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={pathId}
              className="ap-paths__track"
              initial={reduce ? false : 'hidden'}
              animate={trackState}
              exit={reduce ? undefined : 'exit'}
            >
              {slots.map((n) => {
                const item = items[wrap(n, items.length)];
                return (
                  <PathCard
                    key={n}
                    n={n}
                    order={Math.max(0, n - index + layout.extra - 1)}
                    item={item}
                    pos={pos}
                    layout={layout}
                    interactive={n >= index && n < index + layout.k}
                    reduce={reduce}
                    onPeek={bringIntoView}
                    onNavigate={onNavigate}
                    suppressClick={suppressClick}
                  />
                );
              })}
            </motion.div>
          </AnimatePresence>

          <span className="ap-paths__frost ap-paths__frost--start" aria-hidden="true" />
          <span className="ap-paths__frost ap-paths__frost--end" aria-hidden="true" />

          <div className="ap-paths__side-arrows">
            <ArrowButton
              glass
              dir="prev"
              className="ap-paths__arrow ap-paths__arrow--prev"
              label={`Previous ${path.noun}`}
              aria-controls="ap-paths-panel"
              onClick={() => go(-1)}
            />
            <ArrowButton
              glass
              dir="next"
              className="ap-paths__arrow ap-paths__arrow--next"
              label={`Next ${path.noun}`}
              aria-controls="ap-paths-panel"
              onClick={() => go(1)}
            />
          </div>

          <p className="ap-visually-hidden" aria-live="polite" aria-atomic="true">
            {live}
          </p>
        </motion.div>

        <div className="ap-container ap-paths__controls">
          <ArrowButton dir="prev" className="ap-paths__ctrl" label={`Previous ${path.noun}`} onClick={() => go(-1)} />
          <p className="ap-paths__count" aria-hidden="true">
            <span className="ap-paths__count-now">{counter}</span>
            <span className="ap-paths__count-bar">
              <motion.span
                className="ap-paths__count-fill"
                animate={{ scaleX: firstShown / items.length }}
                transition={reduce ? { duration: 0 } : { duration: 0.6, ease: EASE_OUT }}
              />
            </span>
            <span className="ap-paths__count-total">{total}</span>
          </p>
          <ArrowButton dir="next" className="ap-paths__ctrl" label={`Next ${path.noun}`} onClick={() => go(1)} />
        </div>

        <Reveal delay={0.2} className="ap-paths__cta">
          <Button
            href="/treatments"
            onClick={routeLinkHandler(onNavigate, 'treatments')}
            className="ap-paths__cta-btn"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={path.cta}
                className="ap-paths__cta-label"
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: EASE_OUT }}
              >
                {path.cta}
              </motion.span>
            </AnimatePresence>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
