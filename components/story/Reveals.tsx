'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useEffect } from 'react';

/**
 * Headings marked data-reveal rise into place line by line, each line behind
 * its own mask, once, as they come into view (data-reveal="load" runs on first
 * paint instead: the hero headline). Renders nothing.
 *
 * The split is rebuilt when fonts arrive or the width changes (autoSplit), and
 * reverted on unmount, so the server-rendered heading is always what is left.
 * With reduced motion nothing is split and every heading is simply there.
 */
export function Reveals() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const splits: SplitText[] = [];
    const context = gsap.context(() => {
      document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element) => {
        const onLoad = element.dataset.reveal === 'load';
        splits.push(
          SplitText.create(element, {
            type: 'lines',
            mask: 'lines',
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 105,
                duration: 1.15,
                ease: 'expo.out',
                stagger: 0.09,
                delay: onLoad ? 0.25 : 0,
                scrollTrigger: onLoad ? undefined : { trigger: element, start: 'top 88%', once: true },
              }),
          })
        );
      });
    });

    return () => {
      context.revert();
      splits.forEach((split) => split.revert());
    };
  }, []);

  return null;
}
