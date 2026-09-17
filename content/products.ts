/**
 * Clinical skincare (plan §6, Block 9; §7.6 and §7.7).
 *
 * Kojivit is a cosmetic product, so its claims stay cosmetic (§8.11). The
 * prescription route is described by what happens, never by the medicine's
 * name, anywhere on the homepage (D5, P5).
 * Revised 17 Sep 2026: at the client's request the homepage skincare card now
 * names Tretinoin, always with `tretinoin.notice` beside it and no price.
 */
export const kojivit = {
  slug: 'kojivit-ultra',
  name: 'Kojivit Ultra',
  type: 'Cosmetic cream',
  summary: 'A brightening cream with kojic acid dipalmitate, arbutin and niacinamide, to help even the look of skin tone.',
  description:
    'A cosmetic cream for the appearance of uneven tone, dark patches and dullness. It is used in the evening, alongside daily sun protection — without which the look of pigmentation returns.',
  // The clinic lists £85 and £45/30 g in different places; £85 needs confirming (§11.8).
  price: '£85',
  image: '/assets/images/kojivit-ultra.webp',
  ingredients: [
    'Kojic acid dipalmitate',
    'Arbutin',
    'Niacinamide',
    'Glycolic acid',
    'Mulberry extract',
    'Vitamin E',
  ],
  howToUse: [
    'Cleanse and dry the skin in the evening.',
    'Apply a pea-sized amount, avoiding the immediate eye contour.',
    'Follow with a moisturiser if your skin needs one.',
    'Use a high-factor sunscreen every morning while you are using it.',
  ],
  collection: 'Reserved in advance, then paid for and collected in clinic.',
};

/**
 * Prescription-only medicine (D5, R1). Everything here is factual: what it is,
 * the strengths dispensed, who it is not for and what it commonly does. No
 * price-led promotion, no basket, and nothing that reads as an offer to sell.
 * Clinical content awaits the clinic's confirmation (§11.7).
 */
export const tretinoin = {
  slug: 'tretinoin',
  name: 'Tretinoin',
  type: 'Prescription-only medicine',
  notice:
    'Prescription-only medicine. It cannot be bought online. It can only be supplied after you complete a medical questionnaire and our prescriber confirms it is suitable for you. Payment and collection take place in clinic.',
  what: 'Tretinoin is a topical retinoid, a form of vitamin A, prescribed for acne and for changes in the skin caused by sun exposure. It is a medicine, not a cosmetic, and in the UK it is available only on prescription.',
  strengths: ['0.025% — usually where a retinoid is new to you', '0.1% — where a lower strength is already tolerated'],
  notSuitable: [
    'If you are pregnant, breastfeeding or planning a pregnancy',
    'If you have had an allergic reaction to a retinoid',
    'Alongside some acne medicines and some antibiotics',
    'On broken, eczematous or sunburnt skin',
  ],
  sideEffects: [
    'Dryness, peeling and tightness, particularly in the first weeks',
    'Redness and stinging after application',
    'Increased sensitivity to sunlight',
    'A temporary worsening of acne before it settles',
  ],
  steps: [
    { id: 'questionnaire', title: 'Medical questionnaire', detail: 'You complete the questions below. It takes a few minutes.' },
    { id: 'review', title: 'Clinical review', detail: 'Our prescriber reviews your answers and decides whether it is suitable for you.' },
    { id: 'confirmation', title: 'Confirmation by email', detail: 'If it is suitable, we confirm in writing what has been agreed. If it is not, we tell you why.' },
    { id: 'collection', title: 'Collect and pay in clinic', detail: 'Payment and collection happen in person. Nothing is dispensed by post.' },
  ],
};

export const prescriptionRoute = {
  notice: 'Available only after a medical consultation.',
  steps: [
    { id: 'questionnaire', title: 'Medical questionnaire', detail: 'You tell us your history, medicines and skin goals.' },
    { id: 'review', title: 'Clinical review', detail: 'A practitioner assesses whether treatment is suitable for you.' },
    { id: 'confirmation', title: 'Written confirmation', detail: 'We confirm by email what has been agreed, and what to expect.' },
    { id: 'collection', title: 'Collection in clinic', detail: 'Payment and collection happen in person, never online.' },
  ],
};
