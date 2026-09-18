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
} as const;

/** How many droplets, one per concern group. */
export const DROPLETS = 6;
