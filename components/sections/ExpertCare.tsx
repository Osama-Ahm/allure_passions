'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { clinic } from '@/content/clinic';
import { consultationQuote, trustDossier } from '@/content/home';
import { useIsMobile, useReducedMotion } from '@/lib/useEnvironment';

/**
 * "Expert care you can trust" — the credentials dossier.
 *
 * The section pins and the six credentials travel sideways as you scroll, each
 * with its own photograph drifting at a different rate behind it. The rail and
 * the counter at the edges tell you how far through the dossier you are, so
 * the horizontal movement never feels like a hijack.
 *
 * All six credentials are here. The earlier version showed four of them in a
 * bulleted list, which is exactly the "block of text" the brief asked us not
 * to produce for this section.
 *
 * Phones and anyone who has asked for reduced motion get the same six panels
 * stacked vertically, with no pin and no horizontal movement.
 */
export function ExpertCare() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  // False on the server and the first client render, so hydration matches.
  const animate = !reducedMotion && !isMobile;
  const count = trustDossier.length;

  useEffect(() => {
    if (!animate) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const viewport = track?.parentElement;
      if (!track || !viewport) return;

      // Measured in a function so ScrollTrigger recomputes it on resize rather
      // than baking in the width the page happened to load at.
      const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: pinRef.current,
          start: 'top top',
          // A little tail past the last panel so it can be read before release.
          end: () => '+=' + (distance() + window.innerHeight * 0.6),
          pin: true,
          scrub: 0.9,
          invalidateOnRefresh: true,
          // Refreshed after the walkthrough pin above it; see the note there.
          refreshPriority: 1,
        },
      });

      timeline.to(track, { x: () => -distance() }, 0);

      // Each photograph drifts against the panel's own travel, which is what
      // gives the row its depth rather than sliding as one flat strip.
      gsap.utils.toArray<HTMLElement>('.dossier-media-inner').forEach((media) => {
        timeline.fromTo(media, { xPercent: -7 }, { xPercent: 7 }, 0);
      });

      timeline.fromTo('.dossier-progress-fill', { scaleX: 0 }, { scaleX: 1 }, 0);

      // The counter steps rather than tweens: it is reading out a position in a
      // list, not a continuous value.
      timeline.to(
        '.dossier-counter-strip',
        { yPercent: -(100 * (count - 1)) / count, ease: `steps(${count - 1})` },
        0
      );
    }, rootRef);

    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => ctx.revert();
  }, [animate, count]);

  const panels = trustDossier.map((entry, index) => (
    <article
      key={entry.id}
      className={
        animate
          ? 'flex w-[clamp(300px,27vw,410px)] shrink-0 flex-col'
          : 'flex w-full flex-col'
      }
    >
      <div className="relative mb-6 overflow-hidden rounded-2xl border border-sanctuary-gold/25">
        <div className="dossier-media-inner relative aspect-[4/5] w-[116%] -translate-x-[7%]">
          <Image
            src={entry.image}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 420px"
            className="object-cover"
          />
        </div>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-2 font-serif text-6xl font-light leading-none text-sanctuary-alabaster/70 mix-blend-overlay md:text-7xl"
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="mb-4 flex items-center gap-4">
        {entry.badge === 'logo' ? (
          <span className="flex h-11 items-center rounded-lg bg-sanctuary-alabaster px-3">
            <Image
              src="/assets/images/jccp_official_logo.png"
              alt="Joint Council for Cosmetic Practitioners"
              width={167}
              height={85}
              className="h-6 w-auto"
            />
          </span>
        ) : (
          <span
            aria-hidden="true"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-sanctuary-gold/50 font-sans text-xs uppercase tracking-widest text-sanctuary-gold-light"
          >
            {entry.badge}
          </span>
        )}
        <h3 className="font-serif text-2xl font-light leading-tight text-sanctuary-alabaster">
          {entry.title}
        </h3>
      </div>

      <p className="mb-5 font-sans text-sm leading-relaxed text-sanctuary-verde-light">
        {entry.body}
      </p>

      <ul className="mt-auto flex flex-wrap gap-2">
        {entry.proof.map((proof) =>
          proof.href ? (
            <li key={proof.label}>
              <a
                href={proof.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full border border-sanctuary-gold/50 px-3 py-1 font-sans text-[11px] uppercase tracking-widest text-sanctuary-gold-light transition-colors hover:bg-sanctuary-gold hover:text-sanctuary-charcoal"
              >
                {proof.label}
              </a>
            </li>
          ) : (
            <li
              key={proof.label}
              className={
                proof.pending
                  ? 'rounded-full border border-dashed border-sanctuary-verde-light/50 px-3 py-1 font-sans text-[11px] uppercase tracking-widest text-sanctuary-verde-light/70'
                  : 'rounded-full bg-sanctuary-verde/50 px-3 py-1 font-sans text-[11px] uppercase tracking-widest text-sanctuary-verde-light'
              }
            >
              {proof.label}
            </li>
          )
        )}
      </ul>
    </article>
  ));

  return (
    <section
      id="clinical-philosophy"
      className="bg-sanctuary-verde-deep text-sanctuary-alabaster"
    >
      <div ref={rootRef}>
        {/* Intro, in normal flow above the pin. */}
        <div className="mx-auto max-w-4xl px-6 pb-14 pt-24 text-center md:px-8 md:pt-28">
          <span className="mb-3 block font-sans text-xs uppercase tracking-[0.3em] text-sanctuary-gold-light">
            Expert care you can trust
          </span>
          <h2 className="mb-6 font-serif text-4xl font-light leading-tight md:text-5xl">
            Six things worth checking before anyone treats you
          </h2>
          <p className="mx-auto max-w-2xl font-sans text-base leading-relaxed text-sanctuary-verde-light">
            Treatment here is practitioner-led: the person who assesses your skin plans your course,
            carries it out and sees you through aftercare. Here is the training and registration
            behind that, and where you can check it.
          </p>
        </div>

        {animate ? (
          <div ref={pinRef} className="relative h-screen overflow-hidden">
            {/* Top padding clears the fixed header, which would otherwise sit
                over the counter row once this section pins to the viewport. */}
            <div className="mx-auto flex h-full max-w-[1700px] flex-col px-6 pb-10 pt-24 md:px-10 md:pt-28">
              {/* Counter */}
              <div className="mb-8 flex items-baseline justify-between border-b border-sanctuary-gold/20 pb-4">
                <span className="font-sans text-xs uppercase tracking-[0.3em] text-sanctuary-gold-light">
                  The dossier
                </span>
                <span className="flex items-baseline font-serif text-2xl font-light text-sanctuary-alabaster">
                  <span className="block h-[1em] overflow-hidden leading-none">
                    <span className="dossier-counter-strip block">
                      {trustDossier.map((entry, index) => (
                        <span key={entry.id} className="block h-[1em] leading-none">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      ))}
                    </span>
                  </span>
                  <span className="text-sanctuary-verde-light">
                    &nbsp;/&nbsp;{String(count).padStart(2, '0')}
                  </span>
                </span>
              </div>

              {/* Horizontal track */}
              <div className="relative min-h-0 flex-1 overflow-hidden">
                <div
                  ref={trackRef}
                  className="flex h-full items-stretch gap-8 will-change-transform"
                >
                  {panels}
                </div>
              </div>

              {/* Progress rail */}
              <div className="mt-8 h-px w-full bg-sanctuary-gold/20">
                <div className="dossier-progress-fill h-px w-full origin-left scale-x-0 bg-sanctuary-gold" />
              </div>
            </div>
          </div>
        ) : (
          /* A grid, not a single column: stacked full width on a desktop that
             has asked for reduced motion, each panel became a 768px image one
             per screen. Phones still get the single column. */
          <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-8 md:grid-cols-2 md:px-8 lg:grid-cols-3">
            {panels}
          </div>
        )}

        {/* The clinic's own line on consultations, then the award. */}
        <div className="mx-auto max-w-4xl px-6 py-20 text-center md:px-8">
          <span
            className="font-serif text-6xl leading-none text-sanctuary-gold/50"
            aria-hidden="true"
          >
            &ldquo;
          </span>
          <blockquote className="-mt-4 font-serif text-2xl italic leading-snug text-sanctuary-alabaster md:text-3xl">
            {consultationQuote}
          </blockquote>
          <p className="mt-5 font-sans text-xs uppercase tracking-widest text-sanctuary-gold-light">
            {clinic.legalName}
          </p>
        </div>
      </div>

      {/* Recognition: a champagne band closing the dark section. */}
      <div className="border-t border-sanctuary-gold/25 bg-sanctuary-gold/10">
        <div className="mx-auto max-w-4xl px-6 py-14 text-center md:px-8">
          <span className="mb-3 block font-sans text-xs uppercase tracking-[0.3em] text-sanctuary-gold-light">
            Recognition
          </span>
          <p className="mx-auto max-w-2xl font-serif text-xl font-light leading-snug text-sanctuary-alabaster md:text-2xl">
            {clinic.award.title}
          </p>
          <p className="mt-3 font-sans text-xs uppercase tracking-widest text-sanctuary-verde-light">
            {clinic.award.body}
          </p>
        </div>
      </div>
    </section>
  );
}
