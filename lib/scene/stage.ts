import * as THREE from 'three';

/**
 * State shared between the parts of the 3D stage within a frame.
 *
 * The Director runs first each frame: it smooths the story position and the
 * pointer and writes them here. Each scene then reads the same values, so every
 * object on screen moves from one smoothed number and nothing lags anything
 * else. Scenes that other scenes depend on (the bottle's pipette tip, which the
 * drop hangs from) publish their positions here too.
 */
export const stage = {
  /** Smoothed story position: chapter index + progress through it. */
  u: 0,
  /** Smoothed focus within the current chapter (-1 before its first item). */
  focus: -1,
  /** The chapter that focus belongs to. */
  focusChapter: null as string | null,
  /** Pointer tilt, radians, already damped. */
  tiltX: 0,
  tiltZ: 0,
  /** Seconds since the stage started. */
  time: 0,
  reducedMotion: false,
  mobile: false,
  /** World position of the pipette's tip, written by the bottle scene. */
  tip: new THREE.Vector3(),
};

/**
 * useFrame priorities: lower runs first. All are negative, because any
 * positive priority would stop React Three Fiber rendering automatically.
 */
export const ORDER = { director: -5, bottle: -4, droplets: -3, crystal: -2, energies: -1 } as const;

export const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
/** Ease in-out, cubic. */
export const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
/** Eased progress of `u` through the span [a, b]. */
export const span = (u: number, [a, b]: readonly [number, number]) => ease(clamp01((u - a) / (b - a)));
/** Linear (un-eased) progress of `u` through [a, b]. */
export const spanLinear = (u: number, [a, b]: readonly [number, number]) => clamp01((u - a) / (b - a));
/** Frame-rate independent exponential approach. */
export const damp = (current: number, target: number, lambda: number, dt: number) =>
  lerp(current, target, 1 - Math.exp(-lambda * dt));
