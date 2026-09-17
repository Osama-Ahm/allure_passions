/**
 * The six signature technologies (plan §5.1, §6 Block 4). Slugs are the
 * `/treatments/:slug` routes.
 *
 * Sessions, downtime and from-prices are drawn from the clinic's own price list
 * and await clinical confirmation (§11.7). Downtime is described rather than
 * promised: no "zero downtime" (§8.11). Module 10 adds what each detail page
 * needs beyond this.
 */
export const signatureTreatments = [
  {
    slug: 'picoway',
    name: 'PicoWay',
    type: 'Picosecond laser',
    summary: 'Advanced picosecond laser for pigmentation, skin revitalisation and tattoo removal.',
    concerns: ['hyperpigmentation', 'acne-scarring', 'tattoo-removal', 'lentigines'],
    sessions: 'Course of 6',
    downtime: 'Minimal',
    fromPrice: '£329',
  },
  {
    slug: 'advatx',
    name: 'ADVATx',
    type: 'Dual-wavelength laser',
    summary: 'Laser treatment for acne, redness, pigmentation and overall skin rejuvenation.',
    concerns: ['rosacea', 'acne', 'vascular-lesions', 'lip-enhancement'],
    sessions: 'Course of 6',
    downtime: 'Minimal',
    fromPrice: '£150',
  },
  {
    slug: 'morpheus8',
    name: 'Morpheus8',
    type: 'Radiofrequency microneedling',
    summary: 'Fractional radiofrequency microneedling for deep skin remodelling and tightening.',
    concerns: ['acne-scarring', 'skin-laxity', 'fine-lines', 'striae'],
    sessions: 'Course of 3',
    downtime: '24–48 hours of redness',
    fromPrice: '£349',
  },
  {
    slug: 'sofwave',
    name: 'Sofwave',
    type: 'Ultrasound lifting',
    summary: 'Non-invasive ultrasound that stimulates collagen to lift and tighten the skin.',
    concerns: ['skin-laxity', 'signs-of-ageing', 'fine-lines'],
    sessions: 'Single session',
    downtime: 'Minimal',
    fromPrice: '£795',
  },
  {
    slug: 'emsculpt-neo',
    name: 'Emsculpt Neo',
    type: 'Muscle and fat contouring',
    summary: 'Body contouring that combines muscle stimulation with radiofrequency in one session.',
    concerns: ['stubborn-fat', 'muscle-tone', 'body-contouring'],
    sessions: 'Course of 6',
    downtime: 'Minimal, some muscle soreness',
    fromPrice: '£449',
  },
  {
    slug: 'emerald-laser',
    name: 'Emerald Laser',
    type: 'Green laser body contouring',
    summary: 'Low-level green laser supporting body contouring and circumference reduction.',
    concerns: ['stubborn-fat', 'body-contouring'],
    sessions: 'Course of 10',
    downtime: 'Minimal',
    fromPrice: '£250',
  },
];

export const treatmentPath = (slug: string) => `/treatments/${slug}`;

/**
 * Everything a concern can be matched to. The six signature technologies have
 * their own pages; the rest of the menu is on the price list until Module 11
 * gives each category its own anchor. Prescription skincare is named by what it
 * is, never by the medicine (P5).
 */
export const treatmentOptions = {
  ...Object.fromEntries(
    signatureTreatments.map((treatment) => [
      treatment.slug,
      { name: treatment.name, to: treatmentPath(treatment.slug) },
    ]),
  ),
  cosmelan: { name: 'Cosmelan depigmentation protocol', to: '/pricing' },
  biorepeel: { name: 'BioRePeel', to: '/pricing' },
  exosomes: { name: 'Microneedling with exosomes', to: '/pricing' },
  hydrafacial: { name: 'HydraFacial', to: '/pricing' },
  led: { name: 'LED light therapy', to: '/pricing' },
  analysis: { name: 'Advanced clinical skin analysis', to: '/pricing' },
  prescription: { name: 'Prescription skincare consultation', to: '/skincare' },
};

/**
 * The three families the six technologies group into, and the accent each one
 * carries through the interface. The grouping is what the clinic already says
 * about them — two lasers for the skin's surface, two devices that work in the
 * deeper layers, two for the body — so the colour is carrying real information
 * rather than decorating the cards.
 */
export type TreatmentFamily = {
  id: 'skin' | 'lift' | 'body';
  label: string;
  slugs: string[];
};

export const treatmentFamilies: TreatmentFamily[] = [
  { id: 'skin', label: 'Skin & pigmentation', slugs: ['picoway', 'advatx'] },
  { id: 'lift', label: 'Lifting & tightening', slugs: ['morpheus8', 'sofwave'] },
  { id: 'body', label: 'Body contouring', slugs: ['emsculpt-neo', 'emerald-laser'] },
];

export const familyForSlug = (slug: string) =>
  treatmentFamilies.find((family) => family.slugs.includes(slug)) ?? treatmentFamilies[0];
