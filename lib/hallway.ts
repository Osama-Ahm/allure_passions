import * as THREE from 'three';

/**
 * The plan of the hallway, and the camera's walk through it.
 *
 * The corridor runs along -z. Content hangs in lit alcoves on alternating
 * walls, and the camera zig-zags: it walks up to a wall, turns square-on to it
 * and holds still while you read, then turns and crosses to the opposite wall
 * further down.
 *
 * Square-on is not a stylistic choice. Text viewed at an angle foreshortens
 * into something nobody can read, so every reading position in here is
 * perpendicular to its panel and at a fixed distance from it.
 */

/** Half the corridor's width: the inner face of each wall. */
export const WALL_X = 8;

/**
 * How far the camera stands off a wall to read it.
 *
 * Close enough that the panel is comfortably readable, far enough that the
 * floor, ceiling and opposite wall stay in frame — at 3.6 the alcove filled
 * the viewport and the walk stopped reading as a room at all. The corridor is
 * wide enough that this still leaves a real crossing between opposite walls.
 */
export const READ_DISTANCE = 6.0;

/** Eye height, and the centre height of a panel. */
export const EYE_Y = 1.65;
export const PANEL_Y = 1.95;

export const FIRST_STOP_Z = -8;
export const STOP_SPACING = 9;

export type WallSide = 'left' | 'right';

export type Stop = {
  id: string;
  /** Small caps label on the wall above the alcove, and in the jump nav. */
  label: string;
  side: WallSide;
  z: number;
};

/**
 * The ten walls, in the order the clinic's brief tells the story:
 * clinic experience, who we are, why to trust us, what we do, what we treat,
 * recognition, proof from patients, then the invitation.
 */
const WALL_PLAN: Array<Pick<Stop, 'id' | 'label'>> = [
  { id: 'welcome', label: 'Welcome' },
  { id: 'credentials', label: 'Expert care' },
  { id: 'treatments', label: 'Treatments' },
  { id: 'concerns', label: 'What we treat' },
  { id: 'recognition', label: 'Recognition' },
  { id: 'reviews', label: 'Patient reviews' },
  { id: 'social', label: 'Inside the clinic' },
  { id: 'programmes', label: 'Programmes' },
  { id: 'skincare', label: 'Skincare' },
  { id: 'begin', label: 'Begin' },
];

export const stops: Stop[] = WALL_PLAN.map((wall, index) => ({
  ...wall,
  side: index % 2 === 0 ? 'left' : 'right',
  z: FIRST_STOP_Z - index * STOP_SPACING,
}));

/** The x of a wall's inner face. */
export const wallX = (side: WallSide) => (side === 'left' ? -WALL_X : WALL_X);

/** Where the camera stands to read a given stop. */
export const readPosition = (stop: Stop): [number, number, number] => [
  wallX(stop.side) + (stop.side === 'left' ? READ_DISTANCE : -READ_DISTANCE),
  EYE_Y,
  stop.z,
];

/** The centre of a stop's panel, which is what the camera looks at. */
export const panelPosition = (stop: Stop): [number, number, number] => [
  wallX(stop.side),
  PANEL_Y,
  stop.z,
];

/** The corridor has to run past the last stop and behind the first. */
export const CORRIDOR_START_Z = 8;
export const CORRIDOR_END_Z = stops[stops.length - 1].z - 10;
export const CORRIDOR_LENGTH = CORRIDOR_START_Z - CORRIDOR_END_Z;
export const CORRIDOR_MID_Z = (CORRIDOR_START_Z + CORRIDOR_END_Z) / 2;

/**
 * The scroll timeline.
 *
 * Time is measured in abstract units rather than pixels: an approach is one
 * unit, a reading hold is `HOLD_UNITS`. The page's scroll length is derived
 * from the total so the pacing stays the same whatever the viewport.
 */
const APPROACH_UNITS = 1;
const HOLD_UNITS = 1.15;
const ENTRY_UNITS = 1.2;

export type Phase =
  | { kind: 'entry'; to: number }
  | { kind: 'approach'; from: number; to: number }
  | { kind: 'hold'; at: number };

/** The phases, in order, each with its start and end position on [0, 1]. */
export const timeline = (() => {
  const phases: Array<{ phase: Phase; units: number }> = [];

  phases.push({ phase: { kind: 'entry', to: 0 }, units: ENTRY_UNITS });
  phases.push({ phase: { kind: 'hold', at: 0 }, units: HOLD_UNITS });

  for (let i = 1; i < stops.length; i += 1) {
    phases.push({ phase: { kind: 'approach', from: i - 1, to: i }, units: APPROACH_UNITS });
    phases.push({ phase: { kind: 'hold', at: i }, units: HOLD_UNITS });
  }

  const total = phases.reduce((sum, entry) => sum + entry.units, 0);

  let cursor = 0;
  return phases.map(({ phase, units }) => {
    const start = cursor / total;
    cursor += units;
    return { phase, start, end: cursor / total };
  });
})();

/** Total timeline length in units: one entry, then an approach and a hold per stop. */
const TOTAL_UNITS = ENTRY_UNITS + HOLD_UNITS + (stops.length - 1) * (APPROACH_UNITS + HOLD_UNITS);

/**
 * Total scroll length, as a multiple of the viewport height. Roughly 90vh per
 * unit keeps a reading hold about one comfortable screen of scrolling.
 */
export const SCROLL_VH = Math.round(TOTAL_UNITS * 90);

/** Where the camera enters from, before it reaches the first wall. */
const ENTRANCE_POSITION: [number, number, number] = [0, EYE_Y, CORRIDOR_START_Z - 1];
const ENTRANCE_LOOK: [number, number, number] = [0, EYE_Y + 0.15, FIRST_STOP_Z - 4];

/** Smoothstep, so the camera eases out of a wall and settles into the next. */
const ease = (t: number) => t * t * (3 - 2 * t);

const v = (a: [number, number, number]) => new THREE.Vector3(a[0], a[1], a[2]);

/**
 * Resolves scroll progress (0–1) to a camera position and focal point.
 *
 * Returns the active stop index too, so the page can mount only the panels
 * near the camera and light the right entry in the jump nav.
 */
export function cameraAt(progress: number) {
  const p = THREE.MathUtils.clamp(progress, 0, 1);

  const segment =
    timeline.find((entry) => p >= entry.start && p <= entry.end) ?? timeline[timeline.length - 1];

  const span = segment.end - segment.start;
  const local = span > 0 ? (p - segment.start) / span : 1;
  const t = ease(THREE.MathUtils.clamp(local, 0, 1));

  const { phase } = segment;

  if (phase.kind === 'hold') {
    const stop = stops[phase.at];
    return {
      position: v(readPosition(stop)),
      lookAt: v(panelPosition(stop)),
      activeIndex: phase.at,
      reading: true,
    };
  }

  if (phase.kind === 'entry') {
    const stop = stops[phase.to];
    return {
      position: v(ENTRANCE_POSITION).lerp(v(readPosition(stop)), t),
      lookAt: v(ENTRANCE_LOOK).lerp(v(panelPosition(stop)), t),
      activeIndex: phase.to,
      reading: false,
    };
  }

  const from = stops[phase.from];
  const to = stops[phase.to];

  const position = v(readPosition(from)).lerp(v(readPosition(to)), t);

  // The focal point follows a curve that bulges down the corridor, not a
  // straight line between the two panels.
  //
  // A straight lerp puts the focal point exactly where the camera is at the
  // halfway mark — both ends are symmetric, so the two interpolations meet —
  // and a camera told to look at its own position has no orientation at all.
  // Bending the path forward keeps the target ahead of the camera the whole
  // way, and has the side effect of making the crossing read as walking on
  // down the hallway before turning to the next wall.
  const lead = new THREE.Vector3(0, PANEL_Y, Math.min(from.z, to.z) - 3.5);
  const a = v(panelPosition(from));
  const b = v(panelPosition(to));
  const inv = 1 - t;
  const lookAt = new THREE.Vector3(
    inv * inv * a.x + 2 * inv * t * lead.x + t * t * b.x,
    inv * inv * a.y + 2 * inv * t * lead.y + t * t * b.y,
    inv * inv * a.z + 2 * inv * t * lead.z + t * t * b.z
  );

  return {
    position,
    lookAt,
    activeIndex: t < 0.5 ? phase.from : phase.to,
    reading: false,
  };
}

/** The scroll progress at which a given stop is being read, for the jump nav. */
export function progressForStop(index: number) {
  const hold = timeline.find(
    (entry) => entry.phase.kind === 'hold' && entry.phase.at === index
  );
  if (!hold) return 0;
  // Slightly into the hold, so the camera has settled square-on.
  return hold.start + (hold.end - hold.start) * 0.35;
}
