import { useEffect, useState } from 'react';

const isOpen = () =>
  typeof document === 'undefined' || document.documentElement.getAttribute('data-curtain') !== 'closed';

/**
 * True once the intro loader / page curtain has started to lift
 * (html[data-curtain] is no longer "closed"). Hero entrances wait for this.
 */
export default function useCurtainOpen() {
  const [open, setOpen] = useState(isOpen);
  useEffect(() => {
    if (open) return undefined;
    const html = document.documentElement;
    const observer = new MutationObserver(() => {
      if (isOpen()) {
        setOpen(true);
        observer.disconnect();
      }
    });
    observer.observe(html, { attributes: true, attributeFilter: ['data-curtain'] });
    // Failsafe in case the attribute never changes.
    const timer = window.setTimeout(() => setOpen(true), 4500);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [open]);
  return open;
}
