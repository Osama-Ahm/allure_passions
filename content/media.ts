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
 *   'licensed'  — a stock photograph used under its licence (see `credit`).
 *                 Atmospheric only, like 'generated': no faces, no devices, no
 *                 results.
 *   'real'      — must be a genuine, unretouched clinic photograph used with the
 *                 patient's written consent. Never generate these (§8.11,
 *                 CAP Code 3.1, 12.1): a fabricated result is a misleading claim.
 *
 * `position` is the photograph's focal point, as CSS object-position, so every
 * crop of it (a tall frame on a desktop, a wide one on a phone) keeps its subject.
 */
const base = '/assets/images/site';

type Credit = { photographer: string; source: string };

type MediaSlot = {
  ratio: string;
  alt: string;
  subject: string;
  kind?: 'generated' | 'licensed' | 'real';
  position?: string;
  credit?: Credit;
};

const slot = (
  id: string,
  { ratio, alt, subject, kind = 'generated', position = 'center', credit }: MediaSlot,
) => ({
  id,
  src: `${base}/${id}.webp`,
  ratio,
  alt,
  subject,
  kind,
  position,
  credit,
});

export type Media = ReturnType<typeof slot>;

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

/**
 * One photograph per signature treatment, shown with it in the homepage's
 * technology chapter. They follow the brief for these slots
 * (docs/IMAGE_BRIEF.md): abstract and sensory, suggesting what each
 * technology does, with no device, no face and no result.
 *
 * All six are from Pexels, under the Pexels licence (free for commercial use,
 * no attribution required); each photographer is credited here all the same.
 * The files are the photographs resized, not cropped: every use crops them
 * about `position`.
 */
export const treatmentMedia: Record<string, Media> = {
  picoway: slot('treatment-picoway', {
    ratio: '1587 / 2000',
    alt: 'Warm window light falling across the skin at the collarbone',
    subject: 'PicoWay — light on skin',
    kind: 'licensed',
    position: '50% 62%',
    credit: {
      photographer: 'Cesar Lalangui Eras',
      source: 'https://www.pexels.com/photo/a-close-up-of-a-man-s-chest-in-a-mirror-27247318/',
    },
  }),
  advatx: slot('treatment-advatx', {
    ratio: '1333 / 2000',
    alt: 'Two bands of warm yellow light across soft, dark surfaces',
    subject: 'ADVATx — two wavelengths of light',
    kind: 'licensed',
    position: '55% 55%',
    credit: {
      photographer: 'Sueda Dilli',
      source: 'https://www.pexels.com/photo/sunlight-and-shadows-on-a-suede-surface-18104900/',
    },
  }),
  morpheus8: slot('treatment-morpheus8', {
    ratio: '1333 / 2000',
    alt: 'Close-up of smooth skin catching low, raking light',
    subject: 'Morpheus8 — skin texture in raking light',
    kind: 'licensed',
    position: '50% 45%',
    credit: {
      photographer: 'Angela Roma',
      source: 'https://www.pexels.com/photo/close-up-shot-of-a-person-s-skin-7479517/',
    },
  }),
  sofwave: slot('treatment-sofwave', {
    ratio: '2000 / 1964',
    alt: 'Concentric ripples spreading from a single drop on still water',
    subject: 'Sofwave — ultrasound as ripples',
    kind: 'licensed',
    position: '52% 60%',
    credit: {
      photographer: 'Viktoria Emilia',
      source: 'https://www.pexels.com/photo/water-drop-on-body-of-water-9456245/',
    },
  }),
  'emsculpt-neo': slot('treatment-emsculpt-neo', {
    ratio: '2000 / 1333',
    alt: 'The muscles of a back and shoulder in low, warm side light',
    subject: 'Emsculpt Neo — body form study',
    kind: 'licensed',
    position: '36% 50%',
    credit: {
      photographer: 'Clayton de Araujo',
      source: 'https://www.pexels.com/photo/woman-back-in-darkness-15115980/',
    },
  }),
  'emerald-laser': slot('treatment-emerald-laser', {
    ratio: '1333 / 2000',
    alt: 'A line of light across folds of emerald-green satin',
    subject: 'Emerald Laser — green light on satin',
    kind: 'licensed',
    credit: {
      photographer: 'Eva Bronzini',
      source: 'https://www.pexels.com/photo/green-textile-in-close-up-photography-7641221/',
    },
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
