import { allConcerns } from './concerns';
import { signatureTreatments } from './treatments';

/**
 * Copy that belongs only to the homepage story (design/landing.html): the six
 * chapters, the credentials ticker, the approach statement and the trust
 * dossier. Everything factual (concerns, treatments, prices, FAQs, the clinic's
 * details) is still read from its own content module.
 *
 * `pending` marks a line that stands in for something the clinic has not
 * supplied yet. Those exist in development only: a production build drops them
 * at compile time, so a placeholder can never ship (§8.11).
 */

/** The six chapters the page is told in; the pill at the foot of the screen follows them. */
export const chapters = [
  { id: 'discover', name: 'Discover', label: 'Who we are', bridge: 'A clinic built around fewer technologies, used properly.' },
  { id: 'explore', name: 'Explore', label: 'What we treat & how', bridge: 'So it starts with you: what you would like to change, then the technology that may help.' },
  { id: 'evidence', name: 'Evidence', label: 'Real results', bridge: 'What a course can look like, photographed honestly under the same light.' },
  { id: 'trust', name: 'Trust', label: 'Why trust this clinic', bridge: 'Before anyone treats your skin, you should know who they are, how they trained, and who vouches for them.' },
  { id: 'plan', name: 'Plan', label: 'Courses, skincare & FAQs', bridge: 'How a course is structured, what it costs, and how care continues at home.' },
  { id: 'begin', name: 'Begin', label: 'Request a consultation', bridge: 'You know what we treat, how, and who we are. The next step is a conversation.' },
];

export const chapterIndex = Object.fromEntries(chapters.map((chapter, index) => [chapter.id, index]));

/** The credentials ticker under the hero. `accent` is set in italic bronze. */
export const tickerItems = [
  { text: 'JCCP registered' },
  { text: 'Level 6', accent: 'qualified' },
  { text: 'Global Excellence Awards', accent: '2026' },
  { text: 'Manufacturer-trained on every device' },
  { text: 'Consultation', accent: 'first,', after: 'always' },
];

/**
 * The approach statement, lit word by word as it scrolls past. A string is
 * plain text, `{ em }` is italic emphasis and `{ image }` drops a small rounded
 * photograph into the line.
 */
export const statement = [
  'We chose a small number of',
  { image: '/assets/images/site/treatment-sofwave.webp' },
  'technologies and learned them',
  { em: 'properly.' },
  'Every plan begins with a conversation',
  { image: '/assets/images/site/consultation-table.webp' },
  'and an',
  { em: 'honest' },
  'answer when a treatment will not do what you hope.',
];

export const statementFacts = [
  { value: allConcerns.length, label: 'concerns assessed' },
  { value: signatureTreatments.length, label: 'signature technologies' },
  { value: 1, label: 'plan, agreed with you' },
];

/** Which concern-group photograph heads the concern panel. */
export const concernGroupImages = {
  skin: '/assets/images/site/treatment-morpheus8.webp',
  pigmentation: '/assets/images/site/treatment-picoway.webp',
  laser: '/assets/images/site/treatment-advatx.webp',
  'skin-tightening': '/assets/images/site/treatment-sofwave.webp',
  body: '/assets/images/site/treatment-emsculpt-neo.webp',
  wellness: '/assets/images/site/why-detail-hands.webp',
};

/** The filter families above the concern list, by concern-group id. */
export const concernFamilies = {
  Skin: ['skin', 'pigmentation', 'laser', 'skin-tightening'],
  Body: ['body'],
  Wellness: ['wellness'],
};

/**
 * "Why trust this clinic?" Six things worth checking, each with its evidence.
 * Qualification wording stays exact, with no implied medical title (D6).
 * A proof chip is a link when it has `href`.
 */
export type TrustProof = {
  label: string;
  /** Where the claim can be checked, when it can be checked publicly. */
  href?: string;
  /** Development-only placeholder for something the clinic has yet to supply. */
  pending?: boolean;
};

export type TrustEntry = {
  id: string;
  /** 'logo' renders the JCCP mark; anything else is set as a lettered seal. */
  badge: string;
  title: string;
  image: string;
  body: string;
  proof: TrustProof[];
};

export const trustDossier: TrustEntry[] = [
  {
    id: 'jccp',
    badge: 'logo',
    title: 'JCCP registered',
    image: '/assets/images/site/consultation-table.webp',
    body: 'Registered with the Joint Council for Cosmetic Practitioners, the UK register for practitioners who meet its standards for training, insurance and patient safety.',
    proof: [{ label: 'Check the public register', href: 'https://www.jccp.org.uk' }],
  },
  {
    id: 'practitioner',
    badge: 'AP',
    title: 'Advanced Aesthetic Practitioner',
    image: '/assets/images/site/treatment-sofwave.webp',
    body: 'Treatment here is practitioner-led: the person who assesses your skin plans your course and carries it out, through to aftercare.',
    proof: [{ label: 'Practitioner-led' }, ...(process.env.NODE_ENV !== 'production' ? [{ label: 'Name & portrait: client to supply', pending: true }] : [])],
  },
  {
    id: 'level6',
    badge: 'L6',
    title: 'Level 6 & current qualifications',
    image: '/assets/images/site/why-detail-hands.webp',
    body: 'Level 6 is the advanced qualification for aesthetic practice, covering skin science, laser physics and dermal therapy, and it is kept current.',
    proof: [{ label: 'Level 6 aesthetic practice' }, ...(process.env.NODE_ENV !== 'production' ? [{ label: 'Awarding body: to confirm', pending: true }] : [])],
  },
  {
    id: 'technology',
    badge: '◎',
    title: 'Advanced technology training',
    image: '/assets/images/site/treatment-emsculpt-neo.webp',
    body: 'Every device is used by a practitioner trained on it by its manufacturer, rather than on a general course.',
    proof: signatureTreatments.map((treatment) => ({ label: treatment.name })),
  },
  {
    id: 'cpd',
    badge: 'CPD',
    title: 'Continuing professional education',
    image: '/assets/images/site/treatment-morpheus8.webp',
    body: 'Aesthetic practice moves quickly. We keep pace through ongoing training in skin health, regenerative treatment and body contouring.',
    proof: [{ label: 'Skin health' }, { label: 'Regenerative' }, { label: 'Body contouring' }],
  },
  {
    id: 'standards',
    badge: '✓',
    title: 'Memberships & professional standards',
    image: '/assets/images/site/why-clinic-room.webp',
    body: 'Consultation before any treatment, sterile technique, written aftercare and someone to contact afterwards, backed by membership of professional bodies.',
    proof: [{ label: 'Consultation first' }, { label: 'Written aftercare' }, ...(process.env.NODE_ENV !== 'production' ? [{ label: 'Membership names: to confirm', pending: true }] : [])],
  },
];

/** Professional bodies shown under the award. Empty slots wait for the clinic's logo pack (§11.4). */
export const memberships = [
  { id: 'level6', word: 'Level 6', detail: 'Aesthetic practice qualification' },
  { id: 'manufacturer', word: 'Manufacturer certified', detail: `On all ${signatureTreatments.length} technologies` },
  ...(process.env.NODE_ENV !== 'production' ? [{ id: 'membership-1', pending: true }, { id: 'membership-2', pending: true }] : []),
];

/** The FAQs the homepage asks, in order, by id from content/faqs.js. */
export const homeFaqIds = ['consultation-fee', 'what-happens', 'who-treats', 'how-many-sessions', 'prescription', 'location'];

export const kojivitBenefits = ['Uneven tone & dark patches', 'Brightening', 'Gentle exfoliation', 'Smoother-looking skin'];

/** Supply steps shared by both skincare routes; none can be skipped. */
export const supplySteps = [
  { id: 'questionnaire', title: 'Suitability questionnaire', detail: 'Your skin, medical history and anything you already use.' },
  { id: 'review', title: 'Clinical review', detail: 'A practitioner or prescriber reviews your answers, and may ask to see you.' },
  { id: 'confirmation', title: 'Written confirmation', detail: 'What has been agreed, how to use it and what to watch for.' },
  { id: 'collection', title: 'Payment & collection', detail: 'In clinic, at 76 Cleveland Street, with aftercare advice.' },
];

export const consultationQuote = 'Consultations are given the time they need, rather than a slot.';
