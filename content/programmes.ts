/**
 * Signature programmes (plan §6, Block 8): the structured courses the clinic
 * offers, with what each one includes and its course price.
 *
 * Prices come from the clinic's own list and all four need confirming (§11.8) —
 * Contour Luxe at £4,489 and Contour Advanced at £4,499 are ten pounds apart,
 * which looks like a typo in the source list. Copy follows §8.11: what is
 * included, no superlatives.
 */
export const programmes = [
  {
    id: 'contour-synergy',
    name: 'Allure Contour Synergy',
    subtitle: 'Emsculpt Neo',
    sessions: '6 sessions',
    price: '£2,499',
    singlePrice: '£449 a session',
    includes: [
      'Six 30-minute Emsculpt Neo sessions',
      'Muscle stimulation and radiofrequency together',
      'One area treated through the course',
      'Body composition measured as you go',
    ],
  },
  {
    id: 'contour-luxe',
    name: 'Allure Contour Luxe',
    subtitle: 'Emsculpt Neo & Emerald Laser',
    sessions: '12 sessions',
    price: '£4,489',
    singlePrice: '£639 a session',
    includes: [
      'Six Emsculpt Neo sessions',
      'Six Emerald Laser sessions',
      'Muscle and fat addressed by two technologies',
      'Waist and thighs targeted to your plan',
    ],
  },
  {
    id: 'contour-advanced',
    name: 'Allure Contour Advanced',
    subtitle: 'Emsculpt Neo, Emerald Laser & mesotherapy',
    sessions: '18 sessions',
    price: '£4,499',
    singlePrice: '£899 a session',
    includes: [
      'Six Emsculpt Neo sessions',
      'Six Emerald Laser sessions',
      'Six contouring mesotherapy sessions',
      'Guidance on lymphatic drainage at home',
    ],
  },
  {
    id: 'cosmelan',
    name: 'Cosmelan protocol',
    subtitle: 'Depigmentation, in clinic and at home',
    sessions: 'Two phases over six months',
    price: '£2,099',
    singlePrice: 'Complete protocol',
    includes: [
      'Skin preparation before the mask',
      'Cosmelan 1 mask applied in clinic',
      'Cosmelan 2, Melan Recovery and SPF for home',
      'Clinical check-ups through the protocol',
    ],
  },
];
