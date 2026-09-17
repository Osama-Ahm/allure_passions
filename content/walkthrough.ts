import { clinic } from './clinic';
import { signatureTreatments } from './treatments';

/**
 * The four chapters of the 3D walkthrough, one per camera waypoint. `from` and
 * `to` are positions on the scrubbed scroll timeline (0–1), so a chapter is
 * lit while the camera is in the zone it describes.
 *
 * Every claim here is drawn from content/clinic.ts, content/treatments.ts or
 * the trust dossier in content/home.ts. Nothing is written for effect: no
 * medical title is implied, no outcome is promised, and no treatment is named
 * as doing more than its own entry says it does.
 */
export type Chapter = {
  id: string;
  eyebrow: string;
  heading: string;
  standfirst: string;
  from: number;
  to: number;
};

export const walkthroughChapters: Chapter[] = [
  {
    id: 'chapter-arrival',
    eyebrow: 'Chapter I — Arrival',
    heading: 'Where skin, body and wellness are treated as one',
    standfirst: `An advanced aesthetic clinic in ${clinic.address.area}, London, for patients who arrive with a concern rather than a treatment already in mind.`,
    from: 0,
    to: 0.2,
  },
  {
    id: 'chapter-technology',
    eyebrow: 'Chapter II — Technology',
    heading: 'Six technologies, learned properly',
    standfirst:
      'PicoWay, ADVATx, Morpheus8, Sofwave, Emsculpt Neo and Emerald. A small number of devices, each used by a practitioner trained on it by its manufacturer.',
    from: 0.22,
    to: 0.42,
  },
  {
    id: 'chapter-consultation',
    eyebrow: 'Chapter III — Assessment',
    heading: 'Every plan begins with a consultation',
    standfirst:
      'Your skin is assessed, the options are explained, and you are told honestly when a treatment will not do what you hope it will.',
    from: 0.44,
    to: 0.62,
  },
  {
    id: 'chapter-recognition',
    eyebrow: 'Chapter IV — Recognition',
    heading: 'Registered, qualified and accountable to you',
    standfirst: `JCCP registered and Level 6 qualified, and named ${clinic.award.title} at the ${clinic.award.body}.`,
    from: 0.64,
    to: 0.8,
  },
];

/** Shown to anyone who has asked for reduced motion, or has no WebGL. */
export const staticIntro = {
  eyebrow: 'Allure Passions UK',
  heading: walkthroughChapters[0].heading,
  standfirst: walkthroughChapters[0].standfirst,
};
