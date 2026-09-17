/**
 * The concern taxonomy: 18 concerns in 6 groups (plan §6, Block 3).
 *
 * Ids are the `?concern=` values used by the navigation and the treatments
 * finder, and the `#concern-<id>` hash on the homepage. Each concern carries a
 * plain-English description and the treatments that may help, with a line on
 * why each one suits that concern.
 *
 * Copy follows §8.11: British English, no superlatives or guarantees, and every
 * plan confirmed at consultation. Descriptions and matches are drafts awaiting
 * the client's clinical sign-off (§11.11).
 */
export const concernGroups = [
  {
    id: 'skin',
    name: 'Skin',
    concerns: [
      {
        id: 'acne',
        name: 'Acne',
        description:
          'Blocked pores, inflammation and bacteria leave spots that come and go. Treatment aims to calm what is active now and reduce how often it returns.',
        treatments: [
          { id: 'advatx', reason: 'Yellow light is absorbed by the inflammation behind active spots.' },
          { id: 'biorepeel', reason: 'A biphasic peel that clears the pore lining and refines texture.' },
          { id: 'prescription', reason: 'A practitioner reviews whether a prescription topical is suitable for you.' },
        ],
      },
      {
        id: 'acne-scarring',
        name: 'Acne scarring',
        description:
          'Once spots settle they can leave pitting, uneven texture and marks that stay. This work happens in the collagen underneath, so results build over a course.',
        treatments: [
          { id: 'morpheus8', reason: 'Radiofrequency needling remodels the collagen under a depressed scar.' },
          { id: 'picoway', reason: 'Picosecond pulses break up the marks left behind, without heating the skin.' },
          { id: 'exosomes', reason: 'Micro-channelling with exosomes supports repair between sessions.' },
        ],
      },
      {
        id: 'rosacea',
        name: 'Rosacea & redness',
        description:
          'Flushing, visible vessels and skin that reacts to heat, alcohol or stress, usually across the cheeks, nose and chin. Rosacea is managed rather than cured.',
        treatments: [
          { id: 'advatx', reason: 'The 589 nm wavelength targets the vessels that carry the redness.' },
          { id: 'led', reason: 'A calm, non-abrasive session often used alongside laser on reactive skin.' },
        ],
      },
      {
        id: 'skin-clarity',
        name: 'Skin clarity',
        description:
          'Dullness, congestion and uneven texture: nothing is wrong exactly, but the skin has lost its brightness.',
        treatments: [
          { id: 'hydrafacial', reason: 'Cleansing, extraction and hydration in one session, with no downtime.' },
          { id: 'biorepeel', reason: 'Lifts dead surface cells and evens out texture over a course.' },
        ],
      },
    ],
  },
  {
    id: 'pigmentation',
    name: 'Pigmentation',
    concerns: [
      {
        id: 'hyperpigmentation',
        name: 'Hyperpigmentation',
        description:
          'Patches of darker skin left by sun exposure, inflammation or hormones. Plans pair in-clinic treatment with daily protection, because pigment returns without it.',
        treatments: [
          { id: 'picoway', reason: 'Picosecond pulses break pigment into particles the body can clear.' },
          { id: 'cosmelan', reason: 'An in-clinic depigmentation protocol with a months-long home regimen.' },
          { id: 'prescription', reason: 'A practitioner reviews whether a prescription topical is suitable for you.' },
        ],
      },
      {
        id: 'melasma',
        name: 'Melasma',
        description:
          'Symmetrical brown patches, often across the cheeks, forehead and upper lip, which hormones and sunlight can drive. Melasma is managed rather than cured, so the plan is a long one.',
        treatments: [
          { id: 'cosmelan', reason: 'The depigmentation protocol most often used where melasma is stubborn.' },
          { id: 'picoway', reason: 'Low-energy picosecond settings target pigment without heating the skin.' },
          { id: 'prescription', reason: 'A practitioner reviews whether a prescription topical is suitable for you.' },
        ],
      },
      {
        id: 'lentigines',
        name: 'Lentigines',
        description:
          'Flat brown marks from years of sun, usually on the face, hands and décolleté. Often called sun spots or age spots.',
        treatments: [
          { id: 'picoway', reason: 'Clears defined marks in a small number of sessions for most people.' },
          { id: 'advatx', reason: 'Suits sun spots on the face and the backs of the hands.' },
        ],
      },
    ],
  },
  {
    id: 'laser',
    name: 'Laser',
    concerns: [
      {
        id: 'tattoo-removal',
        name: 'Tattoo removal',
        description:
          'Full removal, or fading before a cover-up. How many sessions it takes depends on the ink, its depth and its colours, so we assess the tattoo before quoting.',
        treatments: [
          { id: 'picoway', reason: 'Picosecond pulses fragment black, red, green and blue inks.' },
        ],
      },
      {
        id: 'vascular-lesions',
        name: 'Vascular lesions',
        description:
          'Thread veins, spider veins and small broken vessels on the face and body.',
        treatments: [
          { id: 'advatx', reason: 'Absorbed by the blood in the vessel rather than the skin around it.' },
        ],
      },
      {
        id: 'lip-enhancement',
        name: 'Lip enhancement & plumping',
        description:
          'Fuller, better-defined lips without injections or filler. The effect is gradual and builds over a course.',
        treatments: [
          { id: 'advatx', reason: 'Laser lip plumping and hydration, with no needles and nothing injected.' },
        ],
      },
    ],
  },
  {
    id: 'skin-tightening',
    name: 'Skin tightening',
    concerns: [
      {
        id: 'skin-laxity',
        name: 'Skin laxity',
        description:
          'Skin that has lost its firmness along the jawline, under the chin, on the neck or on the body. Non-surgical lifting works on collagen, so it takes months to show.',
        treatments: [
          { id: 'sofwave', reason: 'Ultrasound energy lifts at a set depth in a single session.' },
          { id: 'morpheus8', reason: 'Radiofrequency needling tightens and remodels over a course.' },
        ],
      },
      {
        id: 'signs-of-ageing',
        name: 'Signs of ageing',
        description:
          'Texture, tone and firmness changing together, rather than one concern on its own. Plans usually combine a tightening treatment with something for the surface.',
        treatments: [
          { id: 'sofwave', reason: 'Lifts the brow, lower face and neck without surgery or downtime.' },
          { id: 'morpheus8', reason: 'Remodels deeper layers where laxity and texture appear together.' },
          { id: 'advatx', reason: 'Evens tone and sun damage on the surface alongside the lifting work.' },
        ],
      },
      {
        id: 'fine-lines',
        name: 'Fine lines & wrinkles',
        description:
          'Lines around the eyes, mouth and forehead as collagen thins. We treat the skin itself; nothing here is injected.',
        treatments: [
          { id: 'morpheus8', reason: 'Fractional radiofrequency stimulates new collagen where lines set in.' },
          { id: 'sofwave', reason: 'Suits the brow and eye area where the skin is thin.' },
          { id: 'exosomes', reason: 'Micro-channelling with exosomes supports the skin between sessions.' },
        ],
      },
    ],
  },
  {
    id: 'body',
    name: 'Body',
    concerns: [
      {
        id: 'stubborn-fat',
        name: 'Stubborn fat',
        description:
          'Pockets of fat that stay put despite diet and training, typically the abdomen, flanks, thighs or under the chin. These are contouring treatments, not weight-loss ones.',
        treatments: [
          { id: 'emsculpt-neo', reason: 'Radiofrequency and muscle stimulation in one 30-minute session.' },
          { id: 'emerald-laser', reason: 'Green laser used across larger areas, with nothing invasive.' },
        ],
      },
      {
        id: 'body-contouring',
        name: 'Body contouring',
        description:
          'Reshaping an area rather than changing the number on the scales. Results depend on where you start and on keeping the habits that got you there.',
        treatments: [
          { id: 'emsculpt-neo', reason: 'Builds muscle and reduces fat in the same session.' },
          { id: 'emerald-laser', reason: 'Pairs with Emsculpt Neo in the clinic’s contour programmes.' },
        ],
      },
      {
        id: 'muscle-tone',
        name: 'Muscle tone & definition',
        description:
          'Definition in the abdomen, buttocks, arms or legs, alongside training rather than instead of it.',
        treatments: [
          { id: 'emsculpt-neo', reason: 'Supramaximal contractions work the muscle beyond voluntary effort.' },
        ],
      },
      {
        id: 'striae',
        name: 'Striae',
        description:
          'Stretch marks left after growth, pregnancy or a change in weight. Older, silver marks respond more slowly than new ones.',
        treatments: [
          { id: 'morpheus8', reason: 'Remodels the banded tissue under a stretch mark.' },
          { id: 'exosomes', reason: 'Micro-channelling with exosomes supports repair over a course.' },
        ],
      },
    ],
  },
  {
    id: 'wellness',
    name: 'Wellness',
    concerns: [
      {
        id: 'wellness',
        name: 'Wellness & cellular health',
        description:
          'Care aimed at how the skin behaves over time rather than one visible concern, usually starting with an assessment of what your skin actually needs.',
        treatments: [
          { id: 'analysis', reason: 'A measured look at your skin before anything is planned.' },
          { id: 'exosomes', reason: 'Regenerative treatment for skin quality rather than a single concern.' },
          { id: 'hydrafacial', reason: 'Regular maintenance between longer courses.' },
        ],
      },
    ],
  },
];

export const allConcerns = concernGroups.flatMap((group) =>
  group.concerns.map((concern) => ({ ...concern, group: group.id })),
);

export const findConcern = (id: string) => allConcerns.find((concern) => concern.id === id);

/** Where a concern link points: the treatments finder, with that concern chosen. */
export const concernPath = (id: string) => `/treatments?concern=${id}`;
