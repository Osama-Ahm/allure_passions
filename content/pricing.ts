/**
 * The clinic's price list (plan §7.3), grouped as it is on the clinic's own
 * list. Each category names the treatments it belongs to, so a treatment page
 * can show its own rows and the pricing page can show them all.
 *
 * **Every figure needs confirming** (§11.8). Prices are copied exactly as the
 * clinic supplied them, including the ones that look like typos.
 */
type PriceItem = {
  name: string;
  single: string;
  course?: string;
  courseLabel?: string;
  /** The treatment slug this row belongs to, where a category covers several. */
  treatment?: string;
};

type PriceCategory = {
  id: string;
  title: string;
  subtitle: string;
  /** Treatment slugs whose own page shows this category; empty means price list only. */
  treatments: string[];
  items: PriceItem[];
};

export const priceCategories: PriceCategory[] = [
  {
    id: 'tightening',
    title: 'Skin tightening & lifting',
    subtitle: 'Morpheus8 radiofrequency microneedling and Sofwave ultrasound',
    treatments: ['morpheus8', 'sofwave'],
    items: [
      { name: 'Morpheus8 — eyes', single: '£349', course: '£799', courseLabel: '3 sessions', treatment: 'morpheus8' },
      { name: 'Morpheus8 — full face', single: '£439', course: '£1,159', courseLabel: '3 sessions', treatment: 'morpheus8' },
      { name: 'Morpheus8 — face & neck', single: '£549', course: '£1,555', courseLabel: '3 sessions', treatment: 'morpheus8' },
      { name: 'Morpheus8 — lower face & neck', single: '£429', course: '£1,149', courseLabel: '3 sessions', treatment: 'morpheus8' },
      { name: 'Morpheus8 — face, neck & décolleté', single: '£649', course: '£1,899', courseLabel: '3 sessions', treatment: 'morpheus8' },
      { name: 'Morpheus8 — arms', single: '£495', course: '£1,339', courseLabel: '3 sessions', treatment: 'morpheus8' },
      { name: 'Morpheus8 — back of thighs', single: '£649', course: '£1,769', courseLabel: '3 sessions', treatment: 'morpheus8' },
      { name: 'Morpheus8 — abdomen or buttocks', single: '£765', course: '£1,859', courseLabel: '3 sessions', treatment: 'morpheus8' },
      { name: 'Sofwave — full face, neck & brow lift', single: '£2,469', treatment: 'sofwave' },
      { name: 'Sofwave — lower face, submental & neck', single: '£1,789', treatment: 'sofwave' },
      { name: 'Sofwave — lower face & submental', single: '£1,569', treatment: 'sofwave' },
      { name: 'Sofwave — brow lift', single: '£795', treatment: 'sofwave' },
      { name: 'Sofwave — small body area (2 palms)', single: '£1,659', treatment: 'sofwave' },
      { name: 'Sofwave — large body area (4 palms)', single: '£3,650', treatment: 'sofwave' },
    ],
  },
  {
    id: 'skin-renewal',
    title: 'Skin renewal & pigmentation',
    subtitle: 'PicoWay picosecond laser',
    treatments: ['picoway'],
    items: [
      { name: 'Acne scarring — full face', single: '£675', course: '£999', courseLabel: '6 sessions', treatment: 'picoway' },
      { name: 'Acne scarring — full face & neck', single: '£869', course: '£1,999', courseLabel: '6 sessions', treatment: 'picoway' },
      { name: 'Hyperpigmentation — small area', single: '£599', course: '£899', courseLabel: '6 sessions', treatment: 'picoway' },
      { name: 'Hyperpigmentation — full face', single: '£329', course: '£969', courseLabel: '6 sessions', treatment: 'picoway' },
      { name: 'Hyperpigmentation — medium body area', single: '£749', course: '£1,299', courseLabel: '6 sessions', treatment: 'picoway' },
      { name: 'Hyperpigmentation — small body area', single: '£399', course: '£599', courseLabel: '6 sessions', treatment: 'picoway' },
    ],
  },
  {
    id: 'tattoo-removal',
    title: 'Tattoo removal',
    subtitle: 'PicoWay picosecond laser, priced by size',
    treatments: ['picoway'],
    items: [
      { name: '1–2 cm', single: '£63', course: '£119', courseLabel: '6 sessions', treatment: 'picoway' },
      { name: '2–4 cm', single: '£73', course: '£249', courseLabel: '6 sessions', treatment: 'picoway' },
      { name: '4–12 cm', single: '£99', course: '£529', courseLabel: '6 sessions', treatment: 'picoway' },
      { name: '12–17 cm', single: 'On consultation', course: '£759', courseLabel: '6 sessions', treatment: 'picoway' },
      { name: '17 cm and above', single: 'On consultation', course: 'On consultation', treatment: 'picoway' },
    ],
  },
  {
    id: 'vascular',
    title: 'Vascular & complexion clarity',
    subtitle: 'ADVATx dual-wavelength laser',
    treatments: ['advatx'],
    items: [
      { name: 'Facial veins (telangiectasias)', single: '£150 – £250', course: '£899', courseLabel: '6 sessions', treatment: 'advatx' },
      { name: 'Sun spots — facial', single: '£150 – £280', course: '£899', courseLabel: '6 sessions', treatment: 'advatx' },
      { name: 'Skin rejuvenation — full face', single: '£529', course: '£1,290', courseLabel: '6 sessions', treatment: 'advatx' },
      { name: 'Skin rejuvenation — full face & neck', single: '£689', course: '£1,390', courseLabel: '6 sessions', treatment: 'advatx' },
      { name: 'Skin rejuvenation — face, neck & décolleté', single: '£899', course: '£1,590', courseLabel: '6 sessions', treatment: 'advatx' },
      { name: 'Sun spots — hands', single: '£299', course: '£1,499', courseLabel: '6 sessions', treatment: 'advatx' },
      { name: 'Lip plumping & rejuvenation', single: '£249', course: '£1,299', courseLabel: '6 sessions', treatment: 'advatx' },
    ],
  },
  {
    id: 'peels',
    title: 'Peels & depigmentation',
    subtitle: 'Cosmelan protocol and BioRePeel',
    treatments: [],
    items: [
      { name: 'Cosmelan depigmentation protocol (complete)', single: '£2,099' },
      { name: 'BioRePeel 35% — face', single: '£159', course: '£999', courseLabel: '6 sessions' },
      { name: 'BioRePeel — hands', single: '£149', course: '£749', courseLabel: '6 sessions' },
      { name: 'BioRePeel — full face & neck', single: '£229', course: '£1,199', courseLabel: '6 sessions' },
    ],
  },
  {
    id: 'microneedling',
    title: 'Microneedling with exosomes',
    subtitle: 'Micro-channelling with regenerative exosomes',
    treatments: [],
    items: [
      { name: 'Face', single: '£399', course: '£999', courseLabel: '6 sessions' },
      { name: 'Full face & neck', single: '£499', course: '£1,299', courseLabel: '6 sessions' },
      { name: 'Medium areas (abdomen or arms)', single: '£599', course: '£1,599', courseLabel: '6 sessions' },
      { name: 'Large areas (buttocks or thighs)', single: '£749', course: '£1,899', courseLabel: '6 sessions' },
    ],
  },
  {
    id: 'facials',
    title: 'Facials, LED & skin analysis',
    subtitle: 'HydraFacial, OxyGeneo, LED and clinical assessment',
    treatments: [],
    items: [
      { name: 'HydraFacial Signature (30 min)', single: '£195', course: '£859', courseLabel: '6 sessions' },
      { name: 'HydraFacial Platinum (60 min)', single: '£265', course: '£1,259', courseLabel: '6 sessions' },
      { name: 'Red Carpet facial (115 min)', single: '£499', course: '£2,759', courseLabel: '6 sessions' },
      { name: 'OxyGeneo facial (90 min)', single: '£250', course: '£999', courseLabel: '6 sessions' },
      { name: 'LED light therapy (30 min)', single: '£40', course: '£233', courseLabel: '6 sessions' },
      { name: 'LED light therapy (60 min)', single: '£60', course: '£340', courseLabel: '6 sessions' },
      { name: 'Advanced clinical skin analysis (30 min)', single: '£60' },
      { name: 'Advanced clinical skin analysis (60 min)', single: '£100' },
    ],
  },
  {
    id: 'body',
    title: 'Body contouring',
    subtitle: 'Emsculpt Neo and Emerald Laser, as single sessions and programmes',
    treatments: ['emsculpt-neo', 'emerald-laser'],
    items: [
      { name: 'Allure Contour Synergy — Emsculpt Neo', single: '£449', course: '£2,499', courseLabel: '6 sessions', treatment: 'emsculpt-neo' },
      { name: 'Allure Contour Luxe — Emsculpt Neo & Emerald', single: '£639', course: '£4,489', courseLabel: '6 sessions', treatment: 'emsculpt-neo' },
      { name: 'Allure Contour Advanced — Neo, Emerald & mesotherapy', single: '£899', course: '£4,499', courseLabel: '6 sessions', treatment: 'emsculpt-neo' },
      { name: 'Emerald Laser body slim', single: '£250', course: '£2,000', courseLabel: '10 sessions', treatment: 'emerald-laser' },
    ],
  },
];

/** The price rows that belong to one treatment, grouped by their category. */
export function pricingFor(slug: string) {
  return priceCategories
    .filter((category) => category.treatments.includes(slug))
    .map((category) => ({
      ...category,
      items: category.items.filter((item) => !item.treatment || item.treatment === slug),
    }))
    .filter((category) => category.items.length > 0);
}
