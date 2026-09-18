'use client';

import Image from 'next/image';
import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { hero } from '@/content/story';
import { story } from '@/lib/story/store';
import { cx } from '@/lib/cx';

/**
 * The clinic film, as a small card in the hero that opens a full-screen player.
 * This is where the brief's "walkthrough or video showing the clinic
 * experience" now lives: real footage of the rooms rather than a rendered
 * interior. Nothing is downloaded until the card is opened.
 */
export function VideoCard({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const { video } = hero;

  useEffect(() => {
    if (!open) return;

    const trigger = triggerRef.current;
    story.lenis?.stop();
    const restoreOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
      // The only control besides the player is the close button, so focus is
      // kept between the two.
      if (event.key === 'Tab') {
        const focusable = Array.from(
          document.querySelectorAll<HTMLElement>('#clinic-film button, #clinic-film video')
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = restoreOverflow;
      story.lenis?.start();
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className={cx('group flex items-center gap-4 text-left', className)}
      >
        <span className="relative block h-[4.5rem] w-32 shrink-0 overflow-hidden rounded-sm bg-sanctuary-stone">
          <Image
            src={video.poster}
            alt=""
            fill
            sizes="128px"
            className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
          />
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-sanctuary-alabaster/90 text-sanctuary-charcoal">
              <svg viewBox="0 0 12 12" aria-hidden="true" className="ml-0.5 h-2.5 w-2.5 fill-current">
                <path d="M2 1l9 5-9 5z" />
              </svg>
            </span>
          </span>
        </span>
        <span>
          <span className="block font-sans text-label uppercase text-ink">{video.label}</span>
          <span className="mt-1 block max-w-[13rem] font-sans text-xs leading-snug text-ink-muted">
            {video.detail}
          </span>
        </span>
      </button>

      {/* Portalled to <body>: inside the hero it would be trapped in the front
          layer's stacking context, under the header. */}
      {open ? createPortal(
        <div
          id="clinic-film"
          role="dialog"
          aria-modal="true"
          aria-label={video.label}
          data-lenis-prevent
          className="fixed inset-0 z-[60] flex animate-fade-in items-center justify-center bg-sanctuary-charcoal/95 p-4 md:p-12"
          onClick={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close the film"
            className="absolute right-5 top-5 rounded-full p-2 text-sanctuary-alabaster transition-colors hover:bg-sanctuary-alabaster/10"
          >
            <X className="h-5 w-5" />
          </button>
          <video
            controls
            autoPlay
            playsInline
            poster={video.poster}
            className="max-h-full w-full max-w-6xl bg-black"
          >
            {video.sources.map((source) => (
              <source key={source.src} src={source.src} type={source.type} />
            ))}
          </video>
        </div>,
        document.body
      ) : null}
    </>
  );
}
