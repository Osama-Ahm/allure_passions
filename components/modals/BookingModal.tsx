'use client';

import { X } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import { clinic } from '@/content/clinic';
import { emailHref, whatsappHref } from '@/content/contact';
import { signatureTreatments } from '@/content/treatments';
import { story } from '@/lib/story/store';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])';

const ENQUIRY_OPTIONS = [
  ...signatureTreatments.map((treatment) => treatment.name),
  'Comprehensive skin & body assessment',
  'Prescription skincare (consultation required)',
];

/**
 * The consultation request.
 *
 * There is no enquiry endpoint on this site yet, so rather than a form that
 * silently discards what someone types, submitting composes the enquiry and
 * hands it to the clinic's own email or WhatsApp. Nothing is stored here and
 * nothing leaves the browser without the visitor's own click.
 */
export function BookingModal({
  isOpen,
  onClose,
  preselected,
}: {
  isOpen: boolean;
  onClose: () => void;
  preselected?: string | null;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const titleId = useId();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState(ENQUIRY_OPTIONS[0]);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (isOpen && preselected && ENQUIRY_OPTIONS.includes(preselected)) {
      setInterest(preselected);
    }
  }, [isOpen, preselected]);

  // Focus management, Escape to close, and a scroll lock that also stops Lenis.
  useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;

    // The close button comes first in the DOM, so focus is placed on the first
    // field instead: opening the enquiry should put the cursor where you type.
    const firstField = dialogRef.current?.querySelector<HTMLElement>('input, select, textarea');
    (firstField ?? dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE))?.focus();

    // Lenis has to be stopped itself: hiding the body's overflow does not stop
    // it moving the page under the dialog.
    story.lenis?.stop();
    const restoreOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = restoreOverflow;
      story.lenis?.start();
      previouslyFocused.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const enquiryBody = [
    'Name: ' + name,
    'Email: ' + email,
    'Telephone: ' + phone,
    'Interested in: ' + interest,
    notes ? 'Notes: ' + notes : '',
  ]
    .filter(Boolean)
    .join('\n');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = 'Consultation enquiry — ' + interest;
    window.location.href =
      emailHref(subject) + '&body=' + encodeURIComponent(enquiryBody);
    onClose();
  };

  const fieldClass =
    'w-full rounded-xl border border-sanctuary-stone bg-white px-4 py-3 font-sans text-sm text-sanctuary-charcoal focus:border-sanctuary-gold focus:outline-none';
  const labelClass = 'mb-2 block font-sans text-xs uppercase tracking-widest text-sanctuary-muted';

  return (
    <div
      data-lenis-prevent
      data-theme="light"
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-sanctuary-charcoal/60 p-4 backdrop-blur-sm"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative my-auto w-full max-w-xl rounded-3xl border border-sanctuary-stone bg-sanctuary-alabaster p-8 shadow-2xl md:p-10"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close the consultation request"
          className="absolute right-6 top-6 rounded-full p-2 text-sanctuary-charcoal transition-colors hover:bg-sanctuary-stone/50"
        >
          <X className="h-5 w-5" />
        </button>

        <span className="eyebrow mb-2">Consultation request</span>
        <h2 id={titleId} className="mb-6 font-serif text-3xl font-light text-sanctuary-charcoal">
          Request a private consultation
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className={labelClass} htmlFor="enquiry-name">
              Full name
            </label>
            <input
              id="enquiry-name"
              required
              type="text"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={fieldClass}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="enquiry-email">
                Email
              </label>
              <input
                id="enquiry-email"
                required
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={fieldClass}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="enquiry-phone">
                Telephone
              </label>
              <input
                id="enquiry-phone"
                required
                type="tel"
                autoComplete="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className={fieldClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="enquiry-interest">
              What would you like to discuss?
            </label>
            <select
              id="enquiry-interest"
              value={interest}
              onChange={(event) => setInterest(event.target.value)}
              className={fieldClass}
            >
              {ENQUIRY_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass} htmlFor="enquiry-notes">
              Anything we should know{' '}
              <span className="normal-case tracking-normal">(optional)</span>
            </label>
            <textarea
              id="enquiry-notes"
              rows={3}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              className={fieldClass + ' resize-none'}
            />
          </div>

          <p className="font-sans text-[11px] leading-relaxed text-sanctuary-muted">
            Please do not include medical details here. Your enquiry opens in your own email
            application, so nothing is stored on this website. Every treatment is assessed at
            consultation first, and prescription skincare cannot be supplied without one.
          </p>

          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-sanctuary-charcoal py-4 font-sans text-xs uppercase tracking-widest text-sanctuary-alabaster transition-colors duration-300 hover:bg-sanctuary-gold"
          >
            Send enquiry by email
          </button>

          <a
            href={whatsappHref(
              'Hello ' + clinic.name + ', I would like to enquire about ' + interest + '.'
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-full border border-sanctuary-gold py-3.5 text-center font-sans text-xs uppercase tracking-widest text-sanctuary-charcoal transition-colors duration-300 hover:bg-sanctuary-gold hover:text-white"
          >
            Or message on WhatsApp
          </a>
        </form>
      </div>
    </div>
  );
}
