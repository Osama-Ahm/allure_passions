/**
 * The serum bottle's shape, as numbers only (no three.js import), so the same
 * profile builds the 3D lathe and draws the SVG outline. The outline is the
 * intro, the static hero without WebGL, and the shape the canvas fades in
 * over, so the two have to agree exactly.
 *
 * A profile is a list of [radius, height] points swept around the vertical
 * axis, from the bottom upwards. Units: the whole bottle is just under 1 tall.
 */

export type ProfilePoint = readonly [r: number, y: number];

/** Points on an elliptical arc centred at (cr, cy), angles in degrees from +r. */
function arc(cr: number, cy: number, rr: number, ry: number, from: number, to: number, steps: number) {
  const points: ProfilePoint[] = [];
  for (let i = 0; i <= steps; i++) {
    const angle = ((from + ((to - from) * i) / steps) * Math.PI) / 180;
    points.push([cr + rr * Math.cos(angle), cy + ry * Math.sin(angle)]);
  }
  return points;
}

export const BODY_R = 0.215;
export const NECK_R = 0.068;
export const SHOULDER_Y = 0.49;
export const NECK_Y = 0.595;
const GLASS_TOP = 0.665;

/** The outer glass: a solid, closed from the base centre to the lip centre. */
export const glassProfile: ProfilePoint[] = [
  [0, 0],
  [BODY_R - 0.035, 0],
  // The rounded foot.
  ...arc(BODY_R - 0.035, 0.035, 0.035, 0.035, -90, 0, 8).slice(1),
  // The wall, tapering very slightly towards the shoulder.
  [BODY_R - 0.003, SHOULDER_Y],
  // The shoulder, a quarter ellipse into the neck.
  ...arc(NECK_R, SHOULDER_Y, BODY_R - 0.003 - NECK_R, NECK_Y - SHOULDER_Y, 0, 90, 16).slice(1),
  [NECK_R, GLASS_TOP - 0.006],
  [NECK_R - 0.006, GLASS_TOP],
  [0, GLASS_TOP],
];

/** The serum inside, filled to just below the shoulder. */
export const SERUM_LEVEL = 0.4;
export const serumProfile: ProfilePoint[] = [
  [0, 0.03],
  [BODY_R - 0.045, 0.03],
  ...arc(BODY_R - 0.045, 0.05, 0.02, 0.02, -90, 0, 6).slice(1),
  [BODY_R - 0.025, SERUM_LEVEL],
  // A slight meniscus: the serum climbs the glass a little at the edge.
  [BODY_R - 0.03, SERUM_LEVEL + 0.004],
  [0, SERUM_LEVEL - 0.003],
];

/** The champagne-gold collar that screws over the neck. */
export const collarProfile: ProfilePoint[] = [
  [NECK_R - 0.006, 0.615],
  [0.078, 0.615],
  [0.088, 0.626],
  [0.088, 0.704],
  [0.078, 0.715],
  [0.05, 0.715],
];

/** The alabaster silicone bulb on top of the collar. */
export const bulbProfile: ProfilePoint[] = [
  [0.052, 0.713],
  [0.054, 0.74],
  [0.058, 0.77],
  [0.064, 0.8],
  [0.067, 0.83],
  [0.066, 0.86],
  [0.06, 0.888],
  [0.047, 0.911],
  [0.028, 0.925],
  [0, 0.93],
];

/** The glass pipette inside, seen when it is lifted out. */
export const pipette = { radius: 0.012, tipRadius: 0.004, bottom: 0.06, top: 0.72 };

export const BOTTLE_HEIGHT = 0.93;
export const BOTTLE_WIDTH = BODY_R * 2;
