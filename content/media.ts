/**
 * Every photograph slot on the site, defined once.
 *
 * Each slot points at a fixed file under `public/assets/images/site/`. Until
 * that file exists the slot renders a labelled placeholder, so dropping a
 * correctly named image into the folder is all it takes to fill it — no code
 * change. The brief for each slot (subject, framing, size, prompt) lives in
 * docs/IMAGE_BRIEF.md, keyed by the same `id`.
 *
 * `kind` says where an image may come from:
 *   'generated' — atmospheric or abstract imagery; AI generation is fine.
 *   'real'      — must be a genuine, unretouched clinic photograph used with the
 *                 patient's written consent. Never generate these (§8.11,
 *                 CAP Code 3.1, 12.1): a fabricated result is a misleading claim.
 */
const base = '/assets/images/site';

type MediaSlot = {
  ratio: string;
  alt: string;
  subject: string;
  kind?: 'generated' | 'real';
  position?: string;
};

const slot = (
  id: string,
  { ratio, alt, subject, kind = 'generated', position = 'center' }: MediaSlot,
) => ({
  id,
  src: `${base}/${id}.webp`,
  ratio,
  alt,
  subject,
  kind,
  position,
});

export const media = {
  whyClinic: slot('why-clinic-room', {
    ratio: '4 / 5',
    alt: 'A calm, softly lit treatment room with a made treatment bed',
    subject: 'Treatment room, morning light',
  }),
  whyDetail: slot('why-detail-hands', {
    ratio: '1 / 1',
    alt: 'A practitioner’s gloved hands preparing a treatment tray',
    subject: 'Gloved hands, treatment tray',
  }),
  consultation: slot('consultation-table', {
    ratio: '4 / 3',
    alt: 'A consultation table with a notebook, a glass of water and a skin analysis print-out',
    subject: 'Consultation table still life',
  }),
  aboutClinic: slot('about-clinic-wide', {
    ratio: '21 / 9',
    // A generated image (see `kind`), so it is described, not claimed as the
    // clinic's own reception. Say so once real photographs replace it.
    alt: 'A calm reception with a curved armchair and an oak desk in warm, natural light',
    subject: 'Clinic interior, wide',
  }),
};

/** One image per signature treatment: the index hover preview and the treatment page band. */
export const treatmentMedia = {
  picoway: slot('treatment-picoway', {
    ratio: '3 / 2',
    alt: 'Abstract close-up of pale skin catching a fine beam of light',
    subject: 'PicoWay — light on skin, abstract',
  }),
  advatx: slot('treatment-advatx', {
    ratio: '3 / 2',
    alt: 'Soft amber and green light diffusing across a smooth surface',
    subject: 'ADVATx — two wavelengths of light, abstract',
  }),
  morpheus8: slot('treatment-morpheus8', {
    ratio: '3 / 2',
    alt: 'Macro texture of healthy skin in raking light',
    subject: 'Morpheus8 — skin texture macro',
  }),
  sofwave: slot('treatment-sofwave', {
    ratio: '3 / 2',
    alt: 'Concentric ripples spreading across still, milky water',
    subject: 'Sofwave — ultrasound as ripples, abstract',
  }),
  'emsculpt-neo': slot('treatment-emsculpt-neo', {
    ratio: '3 / 2',
    alt: 'Sculptural study of a shoulder and back in soft side light',
    subject: 'Emsculpt Neo — body form study',
    position: 'center 40%',
  }),
  'emerald-laser': slot('treatment-emerald-laser', {
    ratio: '3 / 2',
    alt: 'A soft green glow falling across draped linen',
    subject: 'Emerald Laser — green light on linen, abstract',
  }),
};

/**
 * Real Results. These slots take genuine clinic photographs only (see `kind`).
 * Pairs must match: same patient, angle, lighting, distance and expression.
 * The course, interval and timing lines are placeholders: replace them with the
 * real case's details when the clinic supplies the photographs (§11.7).
 */
export const resultCases = [
  {
    id: 'pigmentation',
    tab: 'Pigmentation',
    concern: 'hyperpigmentation',
    treatment: 'PicoWay',
    treatmentSlug: 'picoway',
    course: 'Course of 3 sessions',
    interval: '4 weeks apart',
    note: 'Photographed 6 weeks after the final session.',
    before: slot('results-pigmentation-before', {
      kind: 'real',
      ratio: '4 / 3',
      alt: 'Before treatment: uneven pigmentation across the cheek',
      subject: 'Before — pigmentation, cheek',
    }),
    after: slot('results-pigmentation-after', {
      kind: 'real',
      ratio: '4 / 3',
      alt: 'After a course of PicoWay: a more even skin tone across the cheek',
      subject: 'After — pigmentation, cheek',
    }),
  },
  {
    id: 'scarring',
    tab: 'Acne scarring',
    concern: 'acne-scarring',
    treatment: 'Morpheus8',
    treatmentSlug: 'morpheus8',
    course: 'Course of 3 sessions',
    interval: '6 weeks apart',
    note: 'Photographed 3 months after the final session.',
    before: slot('results-scarring-before', {
      kind: 'real',
      ratio: '4 / 3',
      alt: 'Before treatment: textured acne scarring on the cheek',
      subject: 'Before — acne scarring, cheek',
    }),
    after: slot('results-scarring-after', {
      kind: 'real',
      ratio: '4 / 3',
      alt: 'After a course of Morpheus8: smoother texture on the cheek',
      subject: 'After — acne scarring, cheek',
    }),
  },
  {
    id: 'laxity',
    tab: 'Skin laxity',
    concern: 'skin-laxity',
    treatment: 'Sofwave',
    treatmentSlug: 'sofwave',
    course: 'Single session',
    interval: 'One treatment',
    note: 'Photographed 12 weeks after treatment.',
    before: slot('results-laxity-before', {
      kind: 'real',
      ratio: '4 / 3',
      alt: 'Before treatment: softening along the jawline',
      subject: 'Before — jawline, profile',
    }),
    after: slot('results-laxity-after', {
      kind: 'real',
      ratio: '4 / 3',
      alt: 'After Sofwave: a firmer-looking jawline',
      subject: 'After — jawline, profile',
    }),
  },
];
