// Destinations and preview imagery for the full-screen menu (Navbar / NavMenu).
import { POPULAR_TREATMENTS } from '../../data/treatmentData';

const TREATMENT_IMAGES = {
  picoway: '/assets/images/site/treatment-picoway.webp',
  advatx: '/assets/images/site/treatment-advatx.webp',
  morpheus8: '/assets/images/site/treatment-morpheus8.webp',
  sofwave: '/assets/images/site/treatment-sofwave.webp',
  emsculpt_neo: '/assets/images/site/treatment-emsculpt-neo.webp',
  emerald_laser: '/assets/images/site/treatment-emerald-laser.webp',
};

export const TREATMENT_LINKS = POPULAR_TREATMENTS.map((treatment) => ({
  id: treatment.id,
  label: treatment.name,
  href: `/treatments/${treatment.id}`,
}));

// Every destination the previous drawer offered; `caption` keeps its longer names.
export const MENU_LINKS = [
  { route: 'home', href: '/', label: 'Home', caption: 'The clinic, Fitzrovia' },
  { route: 'treatments', href: '/treatments', label: 'Treatments', caption: 'Treatments Portfolio', children: TREATMENT_LINKS },
  { route: 'about', href: '/about', label: 'About', caption: 'About Practice & Founder' },
  { route: 'pricing', href: '/pricing', label: 'Pricing', caption: 'Treatment Menu & Pricing' },
  {
    route: 'prescription-skincare',
    href: '/prescription-skincare',
    label: 'Prescription Skincare',
    caption: 'Prescription Skincare Hub',
  },
];

// Key → image shown in the menu's preview panel (decorative; the links carry the meaning).
export const PREVIEWS = {
  home: { src: '/assets/images/site/about-clinic-wide.webp', position: '38% 50%' },
  treatments: { src: '/assets/images/site/why-detail-hands.webp', position: '50% 50%' },
  about: { src: '/assets/images/site/why-clinic-room.webp', position: '50% 60%' },
  pricing: { src: '/assets/images/site/consultation-table.webp', position: '40% 50%' },
  'prescription-skincare': { src: '/assets/images/kojivit-ultra.webp', position: '50% 55%' },
  ...Object.fromEntries(
    Object.entries(TREATMENT_IMAGES).map(([id, src]) => [id, { src, position: '42% 50%' }]),
  ),
};

export const PREVIEW_CAPTIONS = {
  ...Object.fromEntries(MENU_LINKS.map((link) => [link.route, link.caption])),
  ...Object.fromEntries(POPULAR_TREATMENTS.map((treatment) => [treatment.id, treatment.category])),
};

/** The preview that represents the page the visitor is on. */
export function previewKeyFor(route, treatmentId) {
  if (route === 'treatment-detail' && PREVIEWS[treatmentId]) return treatmentId;
  return PREVIEWS[route] ? route : 'home';
}

/** Warm the browser cache so the menu opens on a decoded picture. */
export function preloadPreview(key) {
  const preview = PREVIEWS[key];
  if (!preview || typeof Image === 'undefined') return;
  const image = new Image();
  image.decoding = 'async';
  image.src = preview.src;
}
