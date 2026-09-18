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

  // Into Programmes (chapter 6): the stones round into discs and stack.
  toDiscs: [5.72, 6.0],
  toStack: [5.7, 6.02],
} as const;

/** How many droplets, one per concern group. */
export const DROPLETS = 6;
