import { silhouettePath } from '@/lib/bottle/outline';
import {
  BODY_R,
  NECK_R,
  NECK_Y,
  SERUM_LEVEL,
  SHOULDER_Y,
  bulbProfile,
  collarProfile,
  glassProfile,
} from '@/lib/bottle/profile';
import { cx } from '@/lib/cx';

const SCALE = 440;
const CX = 130;
const BASE_Y = 440;

const y = (value: number) => BASE_Y - value * SCALE;

/**
 * The serum bottle drawn in gold hairlines, from the same profile the 3D model
 * is turned from. It is the static hero where there is no WebGL, and the shape
 * the canvas fades in over where there is. It draws itself in under a second
 * as the page opens (the intro, decision D3: no curtain, never waiting for
 * the canvas); every drawn path has pathLength 1 for that.
 */
export function BottleOutline({ className }: { className?: string }) {
  const serumHalf = BODY_R - 0.025;

  return (
    <svg
      viewBox="0 0 260 470"
      fill="none"
      aria-hidden="true"
      className={cx('outline-draw stroke-gild', className)}
    >
      {/* The ground and the centre axis, as on a technical drawing. */}
      <line className="draw" x1="10" x2="250" y1={BASE_Y} y2={BASE_Y} strokeWidth="1" vectorEffect="non-scaling-stroke" pathLength={1} />
      <line
        x1={CX}
        x2={CX}
        y1={BASE_Y + 18}
        y2={y(1) - 8}
        strokeWidth="1"
        strokeDasharray="2 5"
        vectorEffect="non-scaling-stroke"
        opacity="0.6"
      />

      <path className="draw" d={silhouettePath(glassProfile, SCALE, CX, BASE_Y)} strokeWidth="1.25" vectorEffect="non-scaling-stroke" pathLength={1} />
      <path className="draw" d={silhouettePath(collarProfile, SCALE, CX, BASE_Y)} strokeWidth="1.25" vectorEffect="non-scaling-stroke" pathLength={1} />
      <path className="draw" d={silhouettePath(bulbProfile, SCALE, CX, BASE_Y)} strokeWidth="1.25" vectorEffect="non-scaling-stroke" pathLength={1} />

      {/* The serum's surface. */}
      <line
        x1={CX - serumHalf * SCALE}
        x2={CX + serumHalf * SCALE}
        y1={y(SERUM_LEVEL)}
        y2={y(SERUM_LEVEL)}
        strokeWidth="1"
        strokeDasharray="3 4"
        vectorEffect="non-scaling-stroke"
      />

      {/* Handles where the curves change, the way a drawing marks its nodes. */}
      {[
        [CX + BODY_R * SCALE, y(SHOULDER_Y)],
        [CX - BODY_R * SCALE, y(SHOULDER_Y)],
        [CX + NECK_R * SCALE, y(NECK_Y)],
        [CX - NECK_R * SCALE, y(NECK_Y)],
      ].map(([nx, ny]) => (
        <circle key={`${nx}-${ny}`} cx={nx} cy={ny} r="2.5" className="node fill-gild" stroke="none" />
      ))}
    </svg>
  );
}
