import type Lenis from 'lenis';

/**
 * The story's shared state. A plain mutable object, not React state: it is
 * written every frame by the story runtime and read every frame by the 3D
 * director, and neither of those should cause a render. Components that care
 * about the rare changes (which chapter the header is over, which nav item is
 * current) subscribe and are notified only when those change.
 */
export type StoryState = {
  /** The smooth-scroll instance, when there is one (desktop, motion allowed). */
  lenis: Lenis | null;
  /** Story position: the chapter index plus progress through it, 0 → chapters.length. */
  u: number;
  /** The chapter the top of the screen is in. */
  index: number;
  /** 0 → 1 through that chapter. */
  progress: number;
  /** The theme of the chapter under the header. */
  chrome: 'light' | 'dark';
  /** The header link for the chapter in the middle of the screen. */
  nav: string | null;
  /** Whether a solid, text-only chapter fills the screen (the stage can rest). */
  solid: boolean;
  /** The page colour right now, 0–255 sRGB. The glass refracts it. */
  bg: [number, number, number];
  /**
   * Which item of a chapter's list is in the middle of the screen, as a
   * continuous index (1.5 is halfway from the second item to the third), and
   * the chapter it belongs to. -1 before the first item.
   */
  focus: number;
  focusChapter: string | null;
};

export const story: StoryState = {
  lenis: null,
  u: 0,
  index: 0,
  progress: 0,
  chrome: 'light',
  nav: null,
  solid: false,
  bg: [249, 246, 240],
  focus: -1,
  focusChapter: null,
};

const listeners = new Set<() => void>();

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Tells subscribers that one of the rarely-changing fields has changed. */
export function notify() {
  for (const listener of listeners) listener();
}
