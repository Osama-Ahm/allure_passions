'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { useEffect } from 'react';

/**
 * Lenis drives the scroll position; ScrollTrigger reads it. Without this bridge
 * the two keep separate ideas of where the page is and the pinned canvas
 * stutters, so Lenis is stepped from GSAP's own ticker and ScrollTrigger is
 * updated from Lenis's scroll event.
 */
export function useSmoothScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      // Touch devices keep their native momentum; overriding it feels wrong.
      syncTouch: false,
    });

    const update = () => ScrollTrigger.update();
    lenis.on('scroll', update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    // Lag smoothing lets GSAP skip time after a stall, which desynchronises a
    // scrubbed timeline from the scrollbar.
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off('scroll', update);
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    };
  }, [enabled]);
}
