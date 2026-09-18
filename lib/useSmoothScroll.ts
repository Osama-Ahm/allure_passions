'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { useEffect } from 'react';
import { story } from '@/lib/story/store';

/**
 * One loop owns the page. GSAP's ticker steps Lenis, which moves the scroll
 * position and updates ScrollTrigger from its scroll event; then every frame
 * callback runs against that same, already-moved position (the story runtime,
 * and later the 3D stage). With a single owner the canvas can never be a frame
 * behind the copy.
 *
 * Lenis smooths the mouse wheel only. Touch keeps the device's own momentum,
 * and anyone who has asked for reduced motion gets ordinary scrolling.
 */

export type FrameCallback = (time: number, delta: number) => void;

const frameCallbacks = new Set<FrameCallback>();

/** Runs `callback` every frame, after the scroll position has been updated. */
export function onFrame(callback: FrameCallback) {
  frameCallbacks.add(callback);
  return () => {
    frameCallbacks.delete(callback);
  };
}

export function useSmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

    const lenis =
      reducedMotion || coarsePointer
        ? null
        : new Lenis({
            lerp: 0.1,
            smoothWheel: true,
            syncTouch: false,
            // In-page links (#concerns, #visit…) scroll through Lenis too.
            anchors: true,
            autoRaf: false,
          });

    story.lenis = lenis;

    const onScroll = () => ScrollTrigger.update();
    lenis?.on('scroll', onScroll);

    const tick = (time: number, deltaMs: number) => {
      lenis?.raf(time * 1000);
      const delta = deltaMs / 1000;
      for (const callback of frameCallbacks) callback(time, delta);
    };

    gsap.ticker.add(tick);
    // Lag smoothing lets GSAP skip time after a stall, which desynchronises
    // anything scroll-linked from the scrollbar.
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis?.off('scroll', onScroll);
      lenis?.destroy();
      story.lenis = null;
    };
  }, []);
}
