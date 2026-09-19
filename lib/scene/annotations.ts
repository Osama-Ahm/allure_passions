import * as THREE from 'three';

/**
 * The DOM elements of the hairline annotations that label parts of the 3D
 * scene. The labels are HTML (components/stage/Annotations.tsx) and register
 * themselves here; the scenes project their 3D anchor points each frame and
 * write the position straight onto the element, without a React render.
 */
export const annotations = {
  /** The six concern groups, over their droplets. */
  droplets: [] as (HTMLElement | null)[],
  /** The four consultation steps, beside their stones. */
  plan: [] as (HTMLElement | null)[],
};

/**
 * Moves a label to where a world point falls on screen, at the given opacity.
 * `point` is projected in place, so pass a scratch vector.
 */
export function placeLabel(
  label: HTMLElement | null | undefined,
  point: THREE.Vector3,
  camera: THREE.Camera,
  size: { width: number; height: number },
  opacity: number
) {
  if (!label) return;
  label.style.opacity = opacity.toFixed(3);
  if (opacity <= 0.001) return;
  point.project(camera);
  const x = ((point.x + 1) / 2) * size.width;
  const y = ((1 - point.y) / 2) * size.height;
  label.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
}
