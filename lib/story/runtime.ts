import { notify, story } from './store';

/**
 * Reads the scroll position once per frame and turns it into the story:
 * which chapter is on screen and how far through it, the page colour, the
 * header's theme and the progress rail.
 *
 * Chapters are contiguous in scroll space. A chapter runs from the moment its
 * top reaches the top of the screen until the next one's does, so progress
 * through it is (scrollY − top) / height and the story position `u` is the
 * chapter's index plus that progress.
 *
 * Every write to the DOM is skipped when the value has not changed, so a page
 * at rest costs a few comparisons a frame.
 */

type Rgb = [number, number, number];

type Measured = {
  el: HTMLElement;
  top: number;
  height: number;
  theme: 'light' | 'dark';
  bg: Rgb;
  via: Rgb | null;
  nav: string | null;
  solid: boolean;
  /** Centres (page y) of the chapter's [data-focus] items, in order. */
  focusCentres: number[];
};

let chapters: Measured[] = [];
let backdrop: HTMLElement | null = null;
let veil: HTMLElement | null = null;
let railThumb: HTMLElement | null = null;
let navLinks: HTMLElement[] = [];
let rxBlock: { top: number; bottom: number } | null = null;

let lastIndex = -1;
let lastP = -1;
let lastColour = '';
let lastRail = -1;

function hexToRgb(hex: string | undefined): Rgb | null {
  if (!hex) return null;
  const value = parseInt(hex.replace('#', ''), 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const smoothstep = (t: number) => t * t * (3 - 2 * t);

function mix(a: Rgb, b: Rgb, t: number): Rgb {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}

/** Re-reads every chapter's position. Run on load, resize and content changes. */
export function measure() {
  const scrollY = window.scrollY;

  chapters = Array.from(document.querySelectorAll<HTMLElement>('[data-chapter]')).map((el) => {
    const rect = el.getBoundingClientRect();
    return {
      el,
      top: rect.top + scrollY,
      height: Math.max(1, rect.height),
      theme: el.dataset.theme === 'dark' ? 'dark' : 'light',
      bg: hexToRgb(el.dataset.bg) ?? [249, 246, 240],
      via: hexToRgb(el.dataset.bgVia),
      nav: el.dataset.nav ?? null,
      solid: el.dataset.solid === 'true',
      focusCentres: Array.from(el.querySelectorAll<HTMLElement>('[data-focus]')).map((item) => {
        const box = item.getBoundingClientRect();
        return box.top + scrollY + box.height / 2;
      }),
    };
  });

  backdrop = document.getElementById('backdrop');
  veil = document.getElementById('chrome-veil');
  railThumb = document.getElementById('rail-thumb');
  navLinks = Array.from(document.querySelectorAll<HTMLElement>('[data-nav-link]'));
  const rx = document.querySelector<HTMLElement>('[data-rx]')?.getBoundingClientRect();
  rxBlock = rx ? { top: rx.top + scrollY, bottom: rx.bottom + scrollY } : null;

  // Force every chapter's --p to be rewritten against the new layout.
  lastIndex = -1;
  lastP = -1;
  lastRail = -1;
}

function chapterIndexAt(y: number) {
  let index = 0;
  while (index < chapters.length - 1 && chapters[index + 1].top <= y) index++;
  return index;
}

/** Runs once per frame, after Lenis has moved the page. */
export function update() {
  if (chapters.length === 0) return;

  const y = window.scrollY;
  const viewport = window.innerHeight;

  // Where the story is.
  const index = chapterIndexAt(y);
  const current = chapters[index];
  const progress = clamp01((y - current.top) / current.height);

  story.index = index;
  story.progress = progress;
  story.u = index + progress;

  // --p on the current chapter; chapters above are finished, chapters below
  // have not started. Neighbours are only rewritten when the chapter changes.
  if (index !== lastIndex) {
    chapters.forEach((entry, i) => {
      if (i !== index) entry.el.style.setProperty('--p', i < index ? '1' : '0');
    });
    lastIndex = index;
    lastP = -1;
  }
  if (Math.abs(progress - lastP) > 0.0005) {
    current.el.style.setProperty('--p', progress.toFixed(4));
    lastP = progress;
  }

  // The page colour blends into the next chapter's as that chapter's top edge
  // rises from 80% to 30% of the way down the screen. Chapters either side of
  // a light/dark change keep ~40svh clear at that edge, so no copy is ever
  // on screen while the colour is changing under it.
  const next = chapters[index + 1];
  let colour = current.bg;
  let t = 0;
  if (next) {
    t = smoothstep(clamp01((viewport * 0.8 - (next.top - y)) / (viewport * 0.5)));
    if (t > 0) {
      colour = next.via
        ? t < 0.5
          ? mix(current.bg, next.via, t * 2)
          : mix(next.via, next.bg, (t - 0.5) * 2)
        : mix(current.bg, next.bg, t);
    }
  }
  story.bg = colour;
  const css = `rgb(${Math.round(colour[0])} ${Math.round(colour[1])} ${Math.round(colour[2])})`;
  if (css !== lastColour && backdrop) {
    backdrop.style.backgroundColor = css;
    // The veil behind the header is the same colour, so copy scrolling up
    // under the header fades into the page instead of running into it.
    veil?.style.setProperty('--veil', css);
    lastColour = css;
  }

  // The header takes the theme of the colour the page is turning into, so it
  // flips light or dark exactly when the page does; the nav follows the
  // chapter in the middle of the screen.
  const chrome = next && t > 0.5 ? next.theme : current.theme;
  const middle = chapters[chapterIndexAt(y + viewport * 0.45)];
  const nav = middle.nav;
  const solid = current.solid && progress < 1 - viewport / current.height;

  let changed = false;
  if (chrome !== story.chrome) {
    story.chrome = chrome;
    document.documentElement.dataset.chrome = chrome;
    changed = true;
  }
  if (nav !== story.nav) {
    story.nav = nav;
    for (const link of navLinks) {
      if (link.dataset.navLink === nav) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    }
    changed = true;
  }
  if (solid !== story.solid) {
    story.solid = solid;
    changed = true;
  }
  if (changed) notify();

  // The prescription-only block: from just before it enters at the foot of
  // the screen until just after it leaves at the top.
  story.rx = rxBlock
    ? Math.min(
        clamp01((viewport * 1.05 - (rxBlock.top - y)) / (viewport * 0.25)),
        clamp01((rxBlock.bottom - y + viewport * 0.05) / (viewport * 0.25))
      )
    : 0;

  // Focus: which list item (concern group, technology) sits at the middle of
  // the screen, interpolated between neighbours so the 3D can glide.
  const middleY = y + viewport * 0.5;
  const focusChapter = chapters[chapterIndexAt(middleY)];
  const centres = focusChapter.focusCentres;
  if (centres.length > 0) {
    let focus: number;
    if (middleY < centres[0]) focus = -1 + clamp01(1 - (centres[0] - middleY) / (viewport * 0.5));
    else if (middleY >= centres[centres.length - 1]) focus = centres.length - 1;
    else {
      let i = 0;
      while (centres[i + 1] <= middleY) i++;
      focus = i + (middleY - centres[i]) / (centres[i + 1] - centres[i]);
    }
    story.focus = focus;
    story.focusChapter = focusChapter.el.dataset.chapter ?? null;
  } else {
    story.focus = -1;
    story.focusChapter = null;
  }

  // The progress rail's thumb.
  if (railThumb) {
    const scrollable = Math.max(1, document.documentElement.scrollHeight - viewport);
    const rail = clamp01(y / scrollable);
    if (Math.abs(rail - lastRail) > 0.0005) {
      railThumb.style.setProperty('--rail', rail.toFixed(4));
      lastRail = rail;
    }
  }
}
