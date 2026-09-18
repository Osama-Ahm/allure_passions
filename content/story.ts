import { clinic } from './clinic';

/**
 * Copy written for the homepage's scroll story (docs/LANDING_3D_PLAN.md):
 * chapter headings, the bridge lines, and a one-line caption for each
 * technology.
 *
 * Everything factual still comes from its own module (clinic, treatments,
 * concerns, credentials, products, faqs). What is here is new wording, and all
 * of it is a draft awaiting the clinic's sign-off (§11.7, §11.11). Voice per
 * §8.11: British English, "may help", no superlatives or guarantees.
 *
 * Captions quote only what the clinic's own content already states.
 */

export const hero = {
  eyebrow: 'Advanced aesthetic clinic · Fitzrovia, London',
  titleLead: 'Advanced care for',
  titleAccent: 'skin, body',
  titleTail: '& wellbeing.',
  lede: 'An award-winning, practitioner-led clinic offering non-invasive treatments planned around your concerns.',
  paths: [
    { label: 'Start with a concern', href: '#concerns' },
    { label: 'Start with a treatment', href: '#treatments' },
  ],
  credentials: ['Global Excellence Awards 2026', 'JCCP registered', 'Level 6 qualified'],
  video: {
    label: 'Inside the clinic',
    detail: 'A short film of the rooms and the technology',
    poster: '/assets/videos/hero-clinic-poster.webp',
    sources: [
      { src: '/assets/videos/hero-clinic.webm', type: 'video/webm' },
      { src: '/assets/videos/hero-clinic.mp4', type: 'video/mp4' },
    ],
  },
  scrollCue: 'Scroll to continue',
};

/** The bridge between the bottle and the six concern droplets (chapter 2). */
export const surface = {
  first: 'Every routine begins with a single drop.',
  second: 'Every plan begins with what you would like to change.',
};

export const concerns = {
  eyebrow: 'Explore your concern',
  title: 'Start with the concern, not the treatment.',
  lede: 'Eighteen concerns across skin, body and wellness. Open one to see which treatments may help; every plan is confirmed at consultation.',
};

export const technologies = {
  eyebrow: 'Most sought-after treatments',
  title: 'Six technologies, and where each one works.',
  lede: 'Two lasers for the skin’s surface, two devices for the deeper layers, and two for the body. Each is used by a practitioner its manufacturer has trained.',
  /** One line on how each technology works. */
  captions: {
    picoway: 'Laser pulses measured in trillionths of a second',
    advatx: 'Two wavelengths, including 589 nm yellow light',
    morpheus8: 'Radiofrequency delivered beneath the surface through fine needles',
    sofwave: 'Ultrasound energy delivered at a set depth',
    'emsculpt-neo': 'Muscle stimulation and radiofrequency in one session',
    'emerald-laser': 'Low-level green laser light',
  } as Record<string, string>,
  alsoLabel: 'Also at the clinic',
  also: ['Cosmelan', 'BioRePeel', 'Microneedling with exosomes', 'HydraFacial', 'LED light therapy', 'Clinical skin analysis'],
};

export const welcome = {
  eyebrow: `Welcome to ${clinic.name}`,
  giant: ['Fewer technologies,', 'learned properly.'],
  award: `An award-winning advanced aesthetic clinic, recognised as ${clinic.award.title} by Global Health & Pharma, as part of the Global Excellence Awards.`,
  approach:
    'We chose a small number of technologies and learned them properly, rather than buying a long menu and hoping something on it would suit you.',
};

export const consultation = {
  eyebrow: 'Begin with a consultation',
  title: 'Every plan begins with a conversation.',
  steps: [
    { id: 'contact', title: 'Get in touch', detail: 'By WhatsApp, phone or email. Tell us what you would like to change.' },
    { id: 'assessment', title: 'Consultation & skin assessment', detail: 'A medical history, and a proper look at your skin or the area concerned.' },
    { id: 'plan', title: 'Your personalised plan', detail: 'What is suitable, how many sessions it typically takes, and what it costs.' },
    { id: 'treatment', title: 'Treatment & aftercare', detail: 'Carried out by your practitioner, with written aftercare and someone to contact.' },
  ],
};

export const programmes = {
  eyebrow: 'Signature programmes',
  title: 'Courses, structured and priced up front.',
  lede: 'Where one technology is not the whole answer, a programme combines them, with everything included set out before you begin.',
};

export const trust = {
  eyebrow: 'Expert care you can trust',
  title: 'Qualified, registered and accountable.',
  lede: 'Before anyone treats your skin, you should know who they are, how they trained, and who vouches for them.',
  register: { label: 'Check the public register', href: 'https://www.jccp.org.uk' },
  reviews: {
    label: 'Read our reviews on Google',
    detail: 'Reviews open on Google, where you can read every one rather than a selection.',
    href:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent(`${clinic.legalName}, ${clinic.address.street}, London`),
  },
};

export const skincare = {
  eyebrow: 'Clinical skincare',
  title: 'Care that continues at home.',
  lede: 'Treatment in clinic is only part of the plan. What you use between sessions is agreed with you, and some of it can only be supplied after a consultation.',
  stepsLabel: 'How skincare is supplied',
};

export const faq = {
  eyebrow: 'Questions',
  title: 'What people ask before their first visit.',
  ask: 'Ask us directly',
};

export const visit = {
  eyebrow: 'Visit the clinic',
  title: `Request a consultation at ${clinic.address.street}.`,
  lede: 'Get in touch however suits you. We will answer your questions and find a time for your consultation.',
};
