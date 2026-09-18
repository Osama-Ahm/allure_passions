/**
 * The DOM elements of the hairline annotations that label parts of the 3D
 * scene. The labels are HTML (components/stage/Annotations.tsx) and register
 * themselves here; the scenes project their 3D anchor points each frame and
 * write the position straight onto the element, without a React render.
 */
export const annotations = {
  droplets: [] as (HTMLElement | null)[],
};
