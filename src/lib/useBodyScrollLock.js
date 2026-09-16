import { useEffect } from 'react';

/** Stops the page behind an overlay from scrolling, without a layout jump. */
export default function useBodyScrollLock(isLocked) {
  useEffect(() => {
    if (!isLocked) return undefined;

    const { body, documentElement } = document;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;

    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
    };
  }, [isLocked]);
}
