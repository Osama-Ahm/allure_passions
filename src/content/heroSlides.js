import { consultationCta } from './navigation';

/**
 * The four slides of the homepage opening sequence. The hero pins to the
 * screen and the photographs cross-fade as the page scrolls; each slide pairs
 * one photograph with one card, and the card changes side each time so the eye
 * travels across the screen rather than sitting still.
 *
 * `side` places the card. `position` is the photograph's object-position; a
 * portrait screen crops the sides off a landscape photograph hard enough to
 * lose the subject, so `positionNarrow` re-aims it below 768px.
 */

const base = '/assets/images/site/hero_section';

/** The widths each hero photograph is published at (see docs/REDESIGN_PLAN.md §8.11). */
const widths = [1280, 1920, 2560];

/** `srcset` for a hero photograph, as `slide_01-1280.webp 1280w, …`. */
export const heroSrcSet = (name) => widths.map((width) => `${base}/${name}-${width}.webp ${width}w`).join(', ');

/** The photograph always covers the viewport, so the browser needs its full width. */
export const heroSizes = '100vw';

/** The smallest published width, used as the `src` fallback. */
export const heroSrc = (name) => `${base}/${name}-${widths[0]}.webp`;

export const heroSlides = [
  {
    id: 'welcome',
    image: 'slide_01',
    position: '50% 50%',
    positionNarrow: '6% 50%',
    side: 'left',
    tagline: 'Bespoke Clinical Aesthetics',
    title: 'Your Skin, Perfected',
    text: 'Evidence-led medical skincare and rejuvenation tailored to your skin’s unique architecture.',
    cta: { label: 'Explore Treatments', to: '/treatments' },
  },
  {
    id: 'assessment',
    image: 'slide_02',
    position: '45% 50%',
    positionNarrow: '40% 50%',
    side: 'right',
    tagline: 'In-Depth Diagnosis',
    title: 'Precision Consultations',
    text: 'Advanced digital skin health mapping to design your customized restorative protocol.',
    cta: { label: 'Meet Your Specialist', to: '/about' },
  },
  {
    id: 'treatment',
    image: 'slide_03',
    position: '55% 50%',
    positionNarrow: '58% 50%',
    side: 'left',
    tagline: 'Targeted Therapy',
    title: 'Advanced Clinical Care',
    text: 'Medical-grade hydro-infusions, laser resurfacing, and dermal renewal therapies.',
    cta: { label: 'View Treatment Menu', to: '/pricing' },
  },
  {
    id: 'rejuvenation',
    image: 'slide_04',
    position: '40% 50%',
    positionNarrow: '26% 50%',
    side: 'right',
    tagline: 'Restorative Glow',
    title: 'The Allure Sanctuary',
    text: 'Relax in tranquil, private suites engineered for deep cellular repair and lasting glow.',
    cta: { label: 'Book Consultation', to: consultationCta.to },
  },
];
