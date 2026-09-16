import { prefersReducedMotion } from './motion';

/**
 * Scrolls to an in-page section and moves focus there, so the keyboard lands
 * where the eye does. Does nothing if the section isn't on the page.
 */
export default function scrollToSection(id) {
  const target = document.getElementById(id);
  if (!target) return false;

  target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });

  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
  return true;
}
