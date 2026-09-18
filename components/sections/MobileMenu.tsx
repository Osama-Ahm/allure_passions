'use client';

import { useEffect, useRef, useState } from 'react';
import { clinic } from '@/content/clinic';
import { whatsappHref } from '@/content/contact';
import { navItems } from '@/lib/story/chapters';
import { story } from '@/lib/story/store';
import { useConsultation } from '@/components/ui/ConsultationProvider';

/**
 * The section links below desktop width: a full-screen night panel with the
 * five chapters, the phone number and the enquiry. Escape or any link closes it.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const { open: openEnquiry } = useConsultation();

  useEffect(() => {
    if (!open) return;

    const toggle = toggleRef.current;
    story.lenis?.stop();
    const restoreOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.querySelector<HTMLElement>('a, button')?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = restoreOverflow;
      story.lenis?.start();
      toggle?.focus();
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
        className="py-2 font-sans text-label uppercase text-ink"
      >
        Menu
      </button>

      {open ? (
        <div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Sections"
          data-theme="dark"
          className="fixed inset-0 z-[55] flex animate-fade-in flex-col bg-sanctuary-charcoal px-5 pb-8 pt-5"
        >
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="py-2 font-sans text-label uppercase text-ink"
            >
              Close
            </button>
          </div>

          <nav aria-label="Sections" className="mt-10 flex-1">
            <ol className="border-t border-line">
              {navItems.map((item, index) => (
                <li key={item.id} className="border-b border-line">
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between py-5"
                  >
                    <span className="font-serif text-4xl font-light">{item.label}</span>
                    <span className="font-sans text-label text-ink-muted">0{index + 1}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="space-y-3">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openEnquiry();
              }}
              className="w-full rounded-full bg-ink py-4 font-sans text-label uppercase text-paper"
            >
              Request a consultation
            </button>
            <div className="flex gap-3">
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-full border border-ink/30 py-3.5 text-center font-sans text-label uppercase"
              >
                WhatsApp
              </a>
              <a
                href={'tel:' + clinic.phone.dial}
                className="flex-1 rounded-full border border-ink/30 py-3.5 text-center font-sans text-label uppercase"
              >
                Call
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
