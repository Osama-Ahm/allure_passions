import { getLenis, scrollToTarget } from '../motion/smoothScroll';

const isModifiedClick = (event) =>
  event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;

// "Explore your concerns" links land on the homepage paths section (#concerns);
// this event tells it to switch to the by-concern tab in case by-treatment was open.
export const SHOW_CONCERNS_EVENT = 'ap:show-concerns';
export const showConcernsPath = () => window.dispatchEvent(new Event(SHOW_CONCERNS_EVENT));

const currentPath = () => window.location.pathname.replace(/\/$/, '') || '/';

// Click handler for in-app links: real hrefs keep "open in new tab" and copy-link
// working, while plain left clicks route through the App's onNavigate.
export function routeLinkHandler(onNavigate, route, treatmentId) {
  return (event) => {
    if (!onNavigate || isModifiedClick(event)) return;
    event.preventDefault();
    onNavigate(route, treatmentId);
  };
}

/**
 * Scroll to `selector` once it exists and the page curtain has lifted
 * (used after a route change, or when a page is opened with a #hash).
 */
export function scrollWhenReady(selector, { timeout = 5000 } = {}) {
  const started = performance.now();
  const settle = () => {
    const curtainDown = document.documentElement.getAttribute('data-curtain') === 'closed';
    const target = curtainDown ? null : document.querySelector(selector);
    if (target) {
      getLenis()?.resize(); // the page may just have swapped: refresh Lenis's scroll limit first
      scrollToTarget(target);
      return;
    }
    if (performance.now() - started < timeout) requestAnimationFrame(settle);
  };
  requestAnimationFrame(settle);
}

/**
 * Link to a section on another page (e.g. /about#ghp-feature): routes there first
 * when needed, then scrolls to the section once it is on screen.
 */
export function sectionLinkHandler(onNavigate, { route, path, selector }) {
  return (event) => {
    if (isModifiedClick(event)) return;
    event.preventDefault();
    event.stopPropagation(); // Lenis's anchor handler would otherwise re-target the click.
    if (currentPath() !== path) onNavigate?.(route);
    scrollWhenReady(selector);
  };
}
