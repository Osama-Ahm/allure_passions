import { useEffect, useState } from 'react';

const SOLID_AFTER = 40; // §5.2: the header turns solid after 40px
const HIDE_AFTER = 160; // near the top it always stays put
const DELTA = 6; // ignore scroll jitter and trackpad noise

/**
 * Header scroll state: solid once the page has moved, tucked away while
 * scrolling down and back on the way up.
 */
export default function useHeaderScroll() {
  const [state, setState] = useState({ isScrolled: false, isHidden: false });

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const isScrolled = y > SOLID_AFTER;

      let hidden = null; // null keeps whatever the header is already doing
      if (y < HIDE_AFTER) hidden = false;
      else if (y - lastY > DELTA) hidden = true;
      else if (lastY - y > DELTA) hidden = false;
      lastY = y;

      setState((current) => {
        const isHidden = hidden ?? current.isHidden;
        if (current.isScrolled === isScrolled && current.isHidden === isHidden) return current;
        return { isScrolled, isHidden };
      });
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return state;
}
