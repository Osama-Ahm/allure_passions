'use client';

import { addressLines, clinic } from '@/content/clinic';

/**
 * Wall 10 — Begin.
 *
 * The end of the walk and the only wall that asks for anything.
 *
 * The enquiry handler arrives as a prop rather than from context. Everything
 * inside <Canvas> is rendered by react-three-fiber's own reconciler, and React
 * context does not cross from the DOM renderer into it — calling
 * useConsultation() here threw, and an uncaught throw inside the canvas
 * subtree unmounts every panel in the hallway, not just this one.
 */
export function BeginWall({ onEnquire }: { onEnquire?: () => void }) {
  return (
    <div className="flex h-[460px] w-[900px] flex-col justify-center px-12">
      <span className="mb-3 block font-sans text-[16px] uppercase tracking-[0.32em] text-sanctuary-gold-deep">
        The next step is a conversation
      </span>

      <h2 className="mb-6 font-serif text-[44px] font-light leading-[1.08] text-sanctuary-charcoal">
        Request a consultation at {clinic.address.street}
      </h2>

      <div className="mb-6 flex items-start gap-10 border-t border-sanctuary-stone pt-5">
        <div>
          <h3 className="mb-1.5 font-sans text-[12px] uppercase tracking-[0.2em] text-sanctuary-verde">
            Visit
          </h3>
          <address className="font-sans text-[14px] not-italic leading-[1.5] text-sanctuary-charcoal">
            {addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
        </div>

        <div>
          <h3 className="mb-1.5 font-sans text-[12px] uppercase tracking-[0.2em] text-sanctuary-verde">
            Contact
          </h3>
          <p className="font-sans text-[14px] leading-[1.5] text-sanctuary-charcoal">
            <a href={'tel:' + clinic.phone.dial} className="block">
              {clinic.phone.display}
            </a>
            <a href={'mailto:' + clinic.email} className="block">
              {clinic.email}
            </a>
          </p>
        </div>

        <div>
          <h3 className="mb-1.5 font-sans text-[12px] uppercase tracking-[0.2em] text-sanctuary-verde">
            Hours
          </h3>
          <dl className="font-sans text-[14px] leading-[1.5] text-sanctuary-charcoal">
            {clinic.hours.map((entry) => (
              <div key={entry.days}>
                <dt className="inline text-sanctuary-muted">{entry.days}: </dt>
                <dd className="inline">{entry.time}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button
          type="button"
          onClick={onEnquire}
          className="rounded-full bg-sanctuary-verde px-8 py-4 font-sans text-[13px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-sanctuary-verde-deep"
        >
          Request a consultation
        </button>
        <p className="max-w-[420px] font-sans text-[12.5px] leading-snug text-sanctuary-muted">
          Consultations are given the time they need. Every treatment is assessed for suitability
          before anything is agreed.
        </p>
      </div>
    </div>
  );
}
