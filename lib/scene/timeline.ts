/**
 * When each transformation happens, in story position `u` (chapter index +
 * progress through it; see lib/story/runtime.ts). Chapter 1 is the bridge
 * after the hero, chapter 2 Concerns, chapter 3 Technologies.
 *
 * The bridge holds on screen for roughly its first 30% (1.00–1.29 on a
 * desktop screen), then scrolls away while Concerns comes up from below; the
 * drop falls through that hand-over.
 */
export const T = {
  // Bridge (chapter 1).
  toCentre: [1.0, 1.2],
  turn: [1.0, 1.26],
  sink: [1.0, 1.22],
  lift: [1.06, 1.24],
  aside: [1.18, 1.32],
  swell: [1.28, 1.42],
  fall: [1.42, 1.78],
  bottleOut: [1.4, 1.62],

  // Into Concerns (chapter 2): the drop lands and splits into six.
  land: [1.78, 1.86],
  split: [1.84, 2.1],
  arrive: [1.72, 2.08],

  // Out of Concerns: the six rise and flow back into one.
  merge: [2.9, 3.06],

  // Technologies (chapter 3): the drop freezes into the crystal. The six
  // energies then follow the technology being read, not fixed positions.
  freeze: [3.05, 3.17],

  // Into the Clinic (chapter 4), at dawn: the crystal breaks, and its pieces
  // fly out and build the archway, foundations first, keystone last.
  fracture: [3.9, 3.99],
  assemble: [3.94, 4.24],
  toArch: [3.9, 4.12],

  // Into Consultation (chapter 5): the arch lies down, the stones that are not
  // part of the plan dissolve, and four become the plan's stones on a circle.
  lieDown: [4.5, 4.8],
  toPlan: [4.5, 4.92],
  clearArch: [4.7, 4.86],
  planStones: [4.78, 4.98],
  circle: [4.9, 5.08],
  steps: [5.02, 5.5],

  // Into Programmes (chapter 6): the stones round into discs and stack. The
  // stack is one model for the whole chapter, moving with the scroll between
  // forming and pressing into the medallion.
  toDiscs: [5.72, 6.0],
  toStack: [5.7, 6.02],
  programmes: [6.02, 6.8],

  // Into Trust (chapter 7): the stack presses into one gold medallion, which
  // rises and turns to face you.
  toMedallion: [6.8, 7.0],
  medallionRise: [6.86, 7.08],
  toTrust: [6.84, 7.12],

  // Into At home (chapter 8): the medallion lies back and becomes a jar's
  // lid, the jar grows beneath it, and the bottle returns beside it.
  // The camera is already on the right before the jar grows, so the jar is
  // never seen beside the prescription-only copy.
  toLid: [7.84, 8.04],
  jarGrow: [7.96, 8.14],
  bottleBack: [7.96, 8.2],
  toHome: [7.8, 8.02],

  // FAQ (chapter 9): the pair rests in the margin beside the questions.
  toRest: [8.86, 9.1],

  // Into Visit (chapter 10), at dusk: the pair dissolves into light while it
  // is still in the FAQ's margin, and the light draws the archway again, at
  // night, with its doorway lit.
  pairOut: [9.42, 9.6],
  nightArch: [9.82, 10.15],
  toNight: [9.55, 9.95],
} as const;

/** How many droplets, one per concern group. */
export const DROPLETS = 6;
