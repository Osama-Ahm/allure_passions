import { useEffect } from 'react';

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

const visibleFocusable = (container) =>
  [...container.querySelectorAll(FOCUSABLE)].filter((element) => element.offsetParent !== null);

/**
 * Keeps Tab inside an open overlay, moves focus into it on open and returns
 * focus to whatever opened it on close (WCAG 2.2, plan §8.10).
 */
export default function useFocusTrap(ref, isActive) {
  useEffect(() => {
    const container = ref.current;
    if (!isActive || !container) return undefined;

    const previouslyFocused = document.activeElement;
    visibleFocusable(container)[0]?.focus();

    const onKeyDown = (event) => {
      if (event.key !== 'Tab') return;
      const items = visibleFocusable(container);
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    container.addEventListener('keydown', onKeyDown);
    return () => {
      container.removeEventListener('keydown', onKeyDown);
      if (previouslyFocused instanceof HTMLElement && document.contains(previouslyFocused)) {
        previouslyFocused.focus();
      }
    };
  }, [ref, isActive]);
}
