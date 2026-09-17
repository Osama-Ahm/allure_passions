'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import { SanctuaryCanvas } from '@/components/canvas/SanctuaryCanvas';
import { walkthroughChapters } from '@/content/walkthrough';
import { useIsMobile, useReducedMotion, useWebGLSupport } from '@/lib/useEnvironment';
import { useSmoothScroll } from '@/lib/useSmoothScroll';

/**
 * The scroll-scrubbed walkthrough.
 *
 * The four chapters are always in the document, so the page's copy is in the
 * served HTML whether or not the canvas ever runs. When the browser can take
 * it, they become an overlay on the pinned canvas; otherwise they stack as an
 * ordinary editorial introduction and no WebGL context is created at all.
 */
export function Walkthrough() {
  const scrollProgress = useRef(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const webgl = useWebGLSupport();

  // False during the server render and the first client render, so hydration
  // matches; it becomes true once the probes have run.
  const immersive = webgl === true && !reducedMotion;

  useSmoothScroll(immersive);

  useEffect(() => {
    if (!immersive) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: pinRef.current,
          start: 'top top',
          end: '+=400%',
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          // Pinned triggers are measured in creation order unless told
          // otherwise, and these two are created from effects that each wait on
          // their own probes. This pin is first on the page, so it refreshes
          // first; without that the credentials pin below measures its start
          // against a page that has not yet grown by this pin's 400vh spacer.
          refreshPriority: 2,
          onUpdate: (self) => {
            scrollProgress.current = self.progress;
          },
        },
      });

      // A spacer tween fixes the timeline's length at exactly 1, so a chapter's
      // `from`/`to` positions are the same numbers as the scroll progress the
      // camera reads. Without it the timeline would only be as long as its last
      // tween and every chapter would fire late.
      timeline.to({ progress: 0 }, { progress: 1, duration: 1 }, 0);

      walkthroughChapters.forEach((chapter, index) => {
        const selector = `#${chapter.id}`;

        // The first chapter is already lit when the page arrives.
        if (index > 0) {
          timeline.fromTo(
            selector,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.05 },
            chapter.from
          );
        }
        timeline.to(selector, { opacity: 0, y: -24, duration: 0.05 }, chapter.to);

        // The rail dot for this chapter follows the same windows.
        const dot = `#${chapter.id}-dot`;
        if (index > 0) {
          timeline.to(dot, { opacity: 1, scale: 1, duration: 0.05 }, chapter.from);
        }
        timeline.to(dot, { opacity: 0.3, scale: 0.6, duration: 0.05 }, chapter.to);
      });

      // The scroll cue is only useful before anyone has scrolled.
      timeline.to('#walkthrough-cue', { opacity: 0, duration: 0.04 }, 0.01);
    }, rootRef);

    // Webfonts settle after the triggers are measured, which moves the sections
    // underneath the pin.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => ctx.revert();
  }, [immersive]);

  return (
    <div ref={rootRef}>
      {immersive ? (
        <div ref={pinRef} id="canvas-container" className="relative h-screen w-full overflow-hidden">
          <SanctuaryCanvas scrollProgress={scrollProgress} isMobile={isMobile} />

          {/*
            A scrim under the narrative. The camera passes close to columns and
            the frosted partition, and serif text over that much detail stops
            being readable; this lifts it off the scene without hiding it.
          */}
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(58%_46%_at_50%_46%,rgba(249,246,240,0.94)_0%,rgba(249,246,240,0.78)_42%,rgba(249,246,240,0)_100%)]"
            aria-hidden="true"
          />

          {/* Narrative overlay */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 text-center">
            {walkthroughChapters.map((chapter, index) => (
              <div
                key={chapter.id}
                id={chapter.id}
                className="absolute max-w-3xl"
                style={{ opacity: index === 0 ? 1 : 0 }}
              >
                <span className="eyebrow mb-3">{chapter.eyebrow}</span>
                {index === 0 ? (
                  <h1 className="font-serif text-5xl font-light leading-tight text-sanctuary-charcoal md:text-7xl">
                    {chapter.heading}
                  </h1>
                ) : (
                  <h2 className="font-serif text-4xl font-light leading-tight text-sanctuary-charcoal md:text-6xl">
                    {chapter.heading}
                  </h2>
                )}
                <p className="mx-auto mt-6 max-w-xl font-sans text-sm leading-relaxed text-sanctuary-muted md:text-base">
                  {chapter.standfirst}
                </p>
              </div>
            ))}
          </div>

          {/* Chapter rail */}
          <div
            className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col gap-4 md:flex"
            aria-hidden="true"
          >
            {walkthroughChapters.map((chapter, index) => (
              <span
                key={chapter.id}
                id={`${chapter.id}-dot`}
                className="h-1.5 w-1.5 rounded-full bg-sanctuary-gold-deep"
                style={{ opacity: index === 0 ? 1 : 0.3, transform: index === 0 ? 'none' : 'scale(0.6)' }}
              />
            ))}
          </div>

          <div
            id="walkthrough-cue"
            className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 font-sans text-[11px] uppercase tracking-[0.3em] text-sanctuary-muted"
          >
            Scroll to enter
          </div>
        </div>
      ) : (
        /* Static composition: reduced motion, or no WebGL. */
        <section className="relative overflow-hidden bg-gradient-to-b from-sanctuary-pearl to-sanctuary-alabaster px-6 pb-24 pt-36 md:pt-44">
          <div className="mx-auto max-w-3xl space-y-20 text-center">
            {walkthroughChapters.map((chapter, index) => (
              <div key={chapter.id} id={chapter.id}>
                <span className="eyebrow mb-3">{chapter.eyebrow}</span>
                {index === 0 ? (
                  <h1 className="font-serif text-4xl font-light leading-tight text-sanctuary-charcoal md:text-6xl">
                    {chapter.heading}
                  </h1>
                ) : (
                  <h2 className="font-serif text-3xl font-light leading-tight text-sanctuary-charcoal md:text-5xl">
                    {chapter.heading}
                  </h2>
                )}
                <p className="mx-auto mt-5 max-w-xl font-sans text-sm leading-relaxed text-sanctuary-muted md:text-base">
                  {chapter.standfirst}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
