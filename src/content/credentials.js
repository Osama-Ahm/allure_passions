import { clinic } from './clinic';

/**
 * "Expert care you can trust" (plan §6, Block 5 Part B).
 *
 * Only artwork the clinic is entitled to show appears here. The JCCP logo is
 * the council's own; there is **no GHP winner artwork in the repository** — the
 * seals it holds are either generic medallions or another company's award — so
 * the award cell is set in type until the client supplies the real logo pack
 * (§11.4). Qualification wording stays exact and avoids implied medical titles (D6).
 */
export const credentials = [
  {
    id: 'jccp',
    title: 'JCCP registered',
    body: 'The Joint Council for Cosmetic Practitioners keeps a public register of practitioners who meet its standards for training, insurance and patient safety.',
    logo: { src: '/assets/images/jccp_official_logo.png', alt: 'Joint Council for Cosmetic Practitioners', width: 320, height: 118 },
  },
  {
    id: 'level6',
    title: 'Level 6 qualified practitioner',
    body: 'Level 6 is the advanced practitioner qualification for aesthetic treatment, covering skin science, laser physics and dermal therapy.',
  },
  {
    id: 'technology',
    title: 'Advanced technology training',
    body: 'Every device in the clinic is used by a practitioner trained on that device by its manufacturer, rather than on a general course.',
  },
  {
    id: 'cpd',
    title: 'Continuing professional education',
    body: 'Aesthetic practice moves quickly. We keep pace through continuing professional development in skin health, regenerative treatment and body contouring.',
  },
  {
    id: 'standards',
    title: 'Professional standards',
    body: 'Every treatment starts with a consultation and a written plan. Sterile technique, documented aftercare, and someone to contact if anything concerns you afterwards.',
  },
  {
    id: 'award',
    title: 'Global Excellence Awards 2026',
    body: `Named ${clinic.award.title} in the ${clinic.award.body}.`,
  },
];
