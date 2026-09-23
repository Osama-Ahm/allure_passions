import { MOBILE_COPIES } from '../data/responsiveImages';

// Below the 1280px desktop layout, heavy photos come as right-sized AVIF/WebP copies
// (see scripts/responsive-images.py). From 1280px up the <img> loads the original file as before.
export const MOBILE_MEDIA = '(max-width: 1279.98px)';

// /assets/images/site/x.webp -> /assets/images/responsive/site/x-800.avif
// (keep in step with out_path() in scripts/responsive-images.py)
const copyPath = (src, width, ext) => {
  const rel = src.replace(/^\/assets\/(images\/)?/, '').replace(/\.\w+$/, '');
  return `/assets/images/responsive/${rel}-${width}.${ext}`;
};

const cache = new Map();

/** The mobile copies of an image as { ratio, avif, webp } srcsets, or undefined if it has none. */
export function mobileSources(src) {
  if (!cache.has(src)) {
    const entry = MOBILE_COPIES[src];
    const srcset = (widths, ext) => widths.map((w) => `${copyPath(src, w, ext)} ${w}w`).join(', ');
    cache.set(src, entry && { ratio: entry[0], avif: srcset(entry[1], 'avif'), webp: srcset(entry[1], 'webp') });
  }
  return cache.get(src);
}

/**
 * Width at which an `object-fit: cover` picture renders in a box (a landscape photo in a
 * portrait card is drawn wider than the card), for building `sizes`.
 */
export function coverWidth(src, boxWidth, boxHeight) {
  const ratio = MOBILE_COPIES[src]?.[0];
  return Math.round(ratio ? Math.max(boxWidth, boxHeight * ratio) : boxWidth);
}

let avifCheck = null;
const supportsAvif = () => {
  if (!avifCheck) {
    avifCheck = new Promise((resolve) => {
      const probe = new Image();
      probe.onload = () => resolve(probe.width > 0);
      probe.onerror = () => resolve(false);
      // 1x1 AVIF: decodes only where the browser would also pick the AVIF <source>
      probe.src =
        'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADrbWV0YQAAAAAAAAAhaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAAAAAAAOcGl0bQAAAAAAAQAAAB5pbG9jAAAAAEQAAAEAAQAAAAEAAAETAAAAIQAAAChpaW5mAAAAAAABAAAAGmluZmUCAAAAAAEAAGF2MDFDb2xvcgAAAABqaXBycAAAAEtpcGNvAAAAFGlzcGUAAAAAAAAAAQAAAAEAAAAQcGl4aQAAAAADCAgIAAAADGF2MUOBAAwAAAAAE2NvbHJuY2x4AAEADQAGgAAAABdpcG1hAAAAAAAAAAEAAQQBAoMEAAAAKW1kYXQSAAoIGAAGiAhoNCAyExlHh4Yhh5555oAAAJBAyRxgimo=';
    });
  }
  return avifCheck;
};

/**
 * Warm the cache with the copy a <ResponsiveImg> with the same `src`/`sizes` will pick,
 * so a carousel can reveal the next picture already decoded.
 */
export function preloadResponsive(src, sizes = '100vw') {
  if (typeof window === 'undefined') return;
  const sources = mobileSources(src);
  const load = (srcset) => {
    const img = new Image();
    img.decoding = 'async';
    if (srcset) {
      img.sizes = sizes;
      img.srcset = srcset;
    }
    img.src = src;
  };
  if (!sources || !window.matchMedia(MOBILE_MEDIA).matches) {
    load(null);
    return;
  }
  supportsAvif().then((avif) => load(avif ? sources.avif : sources.webp));
}
