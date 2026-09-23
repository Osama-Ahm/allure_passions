import Lenis from 'lenis';

// One Lenis instance for the whole site. Wheel and trackpad input is eased so
// scroll-linked scenes (the hero video, parallax) glide instead of stepping.
// Touch keeps native momentum. Skipped entirely for reduced-motion visitors.

let lenis = null;
let frame = 0;

export function getLenis() {
  return lenis;
}

export function startSmoothScroll() {
  if (lenis || typeof window === 'undefined') return lenis;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;

  lenis = new Lenis({
    lerp: 0.085,
    wheelMultiplier: 0.9,
    smoothWheel: true,
    syncTouch: false,
    anchors: true,
  });

  // Dev only: lets the capture/QA scripts scroll through Lenis instead of fighting it.
  if (import.meta.env.DEV) window.__lenis = lenis;

  const raf = (time) => {
    lenis?.raf(time);
    frame = requestAnimationFrame(raf);
  };
  frame = requestAnimationFrame(raf);

  // The intro loader and page curtain lock the page with html[data-curtain="closed"].
  const html = document.documentElement;
  const syncLock = () => {
    if (!lenis) return;
    if (html.getAttribute('data-curtain') === 'closed') lenis.stop();
    else lenis.start();
  };
  syncLock();
  new MutationObserver(syncLock).observe(html, { attributes: true, attributeFilter: ['data-curtain'] });

  return lenis;
}

export function stopSmoothScroll() {
  cancelAnimationFrame(frame);
  lenis?.destroy();
  lenis = null;
}

/** Scroll the page, eased when Lenis is running. `immediate` jumps (route changes). */
export function scrollToY(top, { immediate = false } = {}) {
  if (lenis) {
    lenis.scrollTo(top, { immediate, force: true, duration: immediate ? 0 : 1.2 });
  } else {
    window.scrollTo({ top, behavior: immediate ? 'instant' : 'smooth' });
  }
}

// Below the desktop layout, homepage sections skip rendering until they near the screen
// (content-visibility in index.css), so a section drawn during a long glide can move the
// target after the glide has set off. Once it lands, finish the trip if it fell short.
const PARTIAL_RENDER = '(max-width: 1279.98px)';

function settleOn(el, offset, tries = 3) {
  if (!lenis || tries <= 0 || !window.matchMedia(PARTIAL_RENDER).matches) return;
  const miss = el.getBoundingClientRect().top + offset;
  const atLimit = miss > 0 && window.scrollY >= lenis.limit - 1;
  if (Math.abs(miss) < 3 || atLimit) return;
  lenis.scrollTo(el, { offset, duration: 0.6, force: true, onComplete: () => settleOn(el, offset, tries - 1) });
}

/** Scroll an element (or selector) into view under the fixed header. */
export function scrollToTarget(target, { offset = -24 } = {}) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { offset, duration: 1.3, force: true, onComplete: () => settleOn(el, offset) });
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (window.matchMedia(PARTIAL_RENDER).matches) {
      window.addEventListener('scrollend', () => el.scrollIntoView({ behavior: 'instant', block: 'start' }), {
        once: true,
      });
    }
  }
}
