import type { ProfilePoint } from './profile';

/**
 * Turns a lathe profile into the SVG path of its silhouette: up the right-hand
 * side, then back down the mirrored left-hand side. `scale` is SVG units per
 * bottle unit; the base of the bottle sits at `baseY`, centred on `cx`.
 */
export function silhouettePath(profile: ProfilePoint[], scale: number, cx: number, baseY: number) {
  // Points on the axis are where the two sides meet; they are not drawn twice.
  const side = profile.filter(([r]) => r > 0);
  const toSvg = (r: number, y: number) =>
    `${(cx + r * scale).toFixed(2)} ${(baseY - y * scale).toFixed(2)}`;

  const right = side.map(([r, y]) => toSvg(r, y));
  const left = [...side].reverse().map(([r, y]) => toSvg(-r, y));

  return `M ${right[0]} L ${right.slice(1).join(' L ')} L ${left.join(' L ')} Z`;
}
