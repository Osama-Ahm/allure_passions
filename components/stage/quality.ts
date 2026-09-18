/**
 * How hard the stage works, decided once when it mounts. The stage only ever
 * mounts in the browser, so matchMedia can be read straight away rather than
 * after a first render (which would flip settings, and shaders, mid-flight).
 */
export type Quality = {
  tier: 'high' | 'medium';
  dpr: [number, number];
  glassSamples: number;
  glassResolution: number;
  shadowResolution: number;
  mobile: boolean;
  reducedMotion: boolean;
};

export function readQuality(): Quality {
  const narrow = window.matchMedia('(max-width: 767px)').matches;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const medium = narrow || coarse;

  return medium
    ? { tier: 'medium', dpr: [1, 1.5], glassSamples: 4, glassResolution: 256, shadowResolution: 256, mobile: narrow, reducedMotion }
    : { tier: 'high', dpr: [1, 1.75], glassSamples: 6, glassResolution: 512, shadowResolution: 512, mobile: narrow, reducedMotion };
}
