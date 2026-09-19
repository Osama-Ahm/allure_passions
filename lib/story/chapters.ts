/**
 * The homepage as a sequence of chapters (docs/LANDING_3D_PLAN.md).
 *
 * This is the one place that says what order the story runs in, how far each
 * chapter scrolls, what colour the page is while it is on screen, and which
 * header link it belongs to. The chapter components read their frame from
 * here; the story runtime reads the same values back off the DOM.
 *
 * Lengths are in large-viewport heights (lvh). A `flow` chapter grows with its
 * content, so its length is a minimum rather than a fixed height.
 */

export const palette = {
  alabaster: '#F9F6F0',
  pearl: '#F2EDE4',
  stone: '#E8E1D5',
  night: '#1A1817',
  // What the page passes through between cream and night, so neither change
  // goes by way of grey: bronze going down into night, gold coming back up.
  dusk: '#76624C',
  dawn: '#C5A880',
} as const;

export type NavId = 'concerns' | 'treatments' | 'clinic' | 'trust' | 'visit';

export const navItems: { id: NavId; label: string; href: string }[] = [
  { id: 'concerns', label: 'Concerns', href: '#concerns' },
  { id: 'treatments', label: 'Treatments', href: '#treatments' },
  { id: 'clinic', label: 'Clinic', href: '#clinic' },
  { id: 'trust', label: 'Trust', href: '#trust' },
  { id: 'visit', label: 'Visit', href: '#visit' },
];

export type ChapterId =
  | 'hero'
  | 'surface'
  | 'concerns'
  | 'treatments'
  | 'clinic'
  | 'consultation'
  | 'programmes'
  | 'trust'
  | 'skincare'
  | 'faq'
  | 'visit';

export type Chapter = {
  id: ChapterId;
  theme: 'light' | 'dark';
  /** The page colour while this chapter fills the screen. */
  bg: string;
  /** A colour the page passes through on its way in from the previous chapter. */
  via?: string;
  nav?: NavId;
  /** lvh on desktop, and on phones where it differs. */
  length: number;
  lengthMobile?: number;
  /** Grows with its content; `length` is then a minimum. */
  flow?: boolean;
  /** The 3D stage is hidden here and stops rendering (a solid, text-only chapter). */
  solid?: boolean;
};

export const chapters: Chapter[] = [
  { id: 'hero', theme: 'light', bg: palette.alabaster, length: 100, flow: true },
  { id: 'surface', theme: 'light', bg: palette.alabaster, length: 140, lengthMobile: 120 },
  { id: 'concerns', theme: 'light', bg: palette.pearl, nav: 'concerns', length: 200, flow: true },
  { id: 'treatments', theme: 'dark', bg: palette.night, via: palette.dusk, nav: 'treatments', length: 360, flow: true },
  { id: 'clinic', theme: 'light', bg: palette.alabaster, via: palette.dawn, nav: 'clinic', length: 160, lengthMobile: 120 },
  { id: 'consultation', theme: 'light', bg: palette.alabaster, nav: 'clinic', length: 130, lengthMobile: 100 },
  { id: 'programmes', theme: 'light', bg: palette.pearl, nav: 'clinic', length: 110, flow: true },
  { id: 'trust', theme: 'light', bg: palette.stone, nav: 'trust', length: 140, flow: true },
  { id: 'skincare', theme: 'light', bg: palette.alabaster, length: 120, flow: true },
  { id: 'faq', theme: 'light', bg: palette.alabaster, length: 100, flow: true },
  { id: 'visit', theme: 'dark', bg: palette.night, via: palette.dusk, nav: 'visit', length: 100, flow: true },
];

export const chapter = Object.fromEntries(chapters.map((entry) => [entry.id, entry])) as Record<
  ChapterId,
  Chapter
>;

/**
 * Where the technology chapter's photograph is centred, as fractions of the
 * screen, from lg up (.tech-frame in app/globals.css). The 3D stage turns the
 * concern drop into light at exactly this point, so the photograph can open
 * out of it.
 */
export const techFrame = { x: 0.65, y: 0.54 } as const;
