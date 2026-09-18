'use client';

import { Html } from '@react-three/drei';
import { PANEL_Y, wallX, type Stop } from '@/lib/hallway';

/**
 * Content hung inside a wall alcove.
 *
 * The content is real DOM, transformed into the scene by drei's <Html
 * transform>. That is deliberate and it is the whole reason this approach
 * works: the text stays native HTML, so it is crisp at any distance,
 * selectable, styleable and readable by a screen reader. Text baked into a
 * texture would be blurry and invisible to everything that is not an eye.
 *
 * PANEL_CSS_W is the width the content is authored at. It is chosen so that at
 * the reading distance one CSS pixel lands on slightly more than one screen
 * pixel — type is then a little larger on screen than its nominal size, never
 * smaller.
 */

/** Authoring width of the content, in CSS pixels. */
export const PANEL_CSS_W = 900;

/** How wide the content is in the world, inside a 5.8 unit alcove opening. */
export const PANEL_WORLD_W = 5.1;

/**
 * drei's transform mode does not map one CSS pixel to one world unit — it
 * renders the element into a CSS 3D space whose scale is fixed by the camera
 * projection. Measured against a known alcove width, one world unit is 40 CSS
 * pixels, so the scale that makes the content span PANEL_WORLD_W is this.
 *
 * The ratio holds across viewport sizes because the CSS 3D perspective is
 * derived from the same projection as the WebGL camera; verified at 1440 and
 * 1024 wide.
 */
const CSS_PX_PER_WORLD_UNIT = 40;

const PANEL_SCALE = (PANEL_WORLD_W * CSS_PX_PER_WORLD_UNIT) / PANEL_CSS_W;

export function WallPanel({
  stop,
  children,
}: {
  stop: Stop;
  children: React.ReactNode;
}) {
  const x = wallX(stop.side);
  // Sit just clear of the recess back so the content reads as mounted in the
  // alcove rather than painted on it.
  const standoff = stop.side === 'left' ? 0.06 : -0.06;

  return (
    <Html
      transform
      position={[x + standoff, PANEL_Y, stop.z]}
      rotation={[0, stop.side === 'left' ? Math.PI / 2 : -Math.PI / 2, 0]}
      scale={PANEL_SCALE}
      // Panels are mounted only near the camera, so nothing is ever drawn in
      // front of one; occlusion testing would cost more than it saves.
      occlude={false}
      zIndexRange={[10, 0]}
      style={{ width: PANEL_CSS_W, pointerEvents: 'auto' }}
    >
      <div className="wall-panel-content font-sans text-sanctuary-charcoal">{children}</div>
    </Html>
  );
}
