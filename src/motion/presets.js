// Shared motion vocabulary for the homepage (motion/react).
// Keep durations and curves here so every section moves with the same rhythm.

export const EASE_OUT = [0.22, 1, 0.36, 1]; // long, silky settle
export const EASE_INOUT = [0.76, 0, 0.24, 1]; // curtains, wipes
export const EASE_SOFT = [0.33, 1, 0.68, 1];

export const DURATION = {
  fast: 0.35,
  base: 0.8,
  slow: 1.15,
};

// Default viewport trigger for whileInView: play once, when a fifth is visible.
export const VIEWPORT = { once: true, amount: 0.2, margin: '0px 0px -8% 0px' };

export const SPRING_SOFT = { type: 'spring', stiffness: 120, damping: 22, mass: 0.9 };
export const SPRING_SNAPPY = { type: 'spring', stiffness: 380, damping: 32 };

/** Rise-and-fade for blocks of copy, buttons and cards. */
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_OUT, delay },
  }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: (delay = 0) => ({ opacity: 1, transition: { duration: DURATION.base, ease: EASE_SOFT, delay } }),
};

/** Parent that staggers its children (children use `item`). */
export const stagger = (gap = 0.09, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren } },
});

export const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE_OUT } },
};

/** Cards that settle from a slight scale as well as rise. */
export const cardItem = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: DURATION.slow, ease: EASE_OUT } },
};

/** Image frame wipe: the frame opens upward while the picture settles from a zoom. */
export const imageFrame = {
  hidden: { clipPath: 'inset(100% 0% 0% 0% round 16px)' },
  show: (delay = 0) => ({
    clipPath: 'inset(0% 0% 0% 0% round 16px)',
    transition: { duration: DURATION.slow, ease: EASE_INOUT, delay },
  }),
};

export const imageZoom = {
  hidden: { scale: 1.18 },
  show: (delay = 0) => ({ scale: 1, transition: { duration: 1.6, ease: EASE_OUT, delay } }),
};
