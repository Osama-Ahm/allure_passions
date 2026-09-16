/**
 * The concern taxonomy: 18 concerns in 6 groups (plan §6, Block 3).
 * Ids are the `?concern=` values used by the navigation and the treatments
 * finder. Module 4 adds each concern's description and matched treatments here.
 */
export const concernGroups = [
  {
    id: 'skin',
    name: 'Skin',
    concerns: [
      { id: 'acne', name: 'Acne' },
      { id: 'acne-scarring', name: 'Acne scarring' },
      { id: 'rosacea', name: 'Rosacea & redness' },
      { id: 'skin-clarity', name: 'Skin clarity' },
    ],
  },
  {
    id: 'pigmentation',
    name: 'Pigmentation',
    concerns: [
      { id: 'hyperpigmentation', name: 'Hyperpigmentation' },
      { id: 'melasma', name: 'Melasma' },
      { id: 'lentigines', name: 'Lentigines' },
    ],
  },
  {
    id: 'laser',
    name: 'Laser',
    concerns: [
      { id: 'tattoo-removal', name: 'Tattoo removal' },
      { id: 'vascular-lesions', name: 'Vascular lesions' },
      { id: 'lip-enhancement', name: 'Lip enhancement & plumping' },
    ],
  },
  {
    id: 'skin-tightening',
    name: 'Skin tightening',
    concerns: [
      { id: 'skin-laxity', name: 'Skin laxity' },
      { id: 'signs-of-ageing', name: 'Signs of ageing' },
      { id: 'fine-lines', name: 'Fine lines & wrinkles' },
    ],
  },
  {
    id: 'body',
    name: 'Body',
    concerns: [
      { id: 'stubborn-fat', name: 'Stubborn fat' },
      { id: 'body-contouring', name: 'Body contouring' },
      { id: 'muscle-tone', name: 'Muscle tone & definition' },
      { id: 'striae', name: 'Striae' },
    ],
  },
  {
    id: 'wellness',
    name: 'Wellness',
    concerns: [{ id: 'wellness', name: 'Wellness & cellular health' }],
  },
];

export const allConcerns = concernGroups.flatMap((group) =>
  group.concerns.map((concern) => ({ ...concern, group: group.id })),
);

/** Where a concern link points: the treatments finder, with that concern chosen. */
export const concernPath = (id) => `/treatments?concern=${id}`;
