import { clinic } from '@/content/clinic';
import { memberships } from '@/content/home';

/**
 * Wall 5 — Awards, accreditations and recognition.
 *
 * The award is stated exactly as the awarding body states it. Membership slots
 * the clinic has not yet named are development-only placeholders and are gone
 * from a production build, so an unnamed body can never ship as a claim.
 */
export function RecognitionWall() {
  return (
    <div className="flex h-[460px] w-[900px] flex-col justify-center px-12">
      <span className="mb-4 block font-sans text-[16px] uppercase tracking-[0.32em] text-sanctuary-gold-deep">
        Awards &amp; accreditations
      </span>

      <div className="mb-7 border-y border-sanctuary-gold/40 py-6">
        <p className="font-serif text-[38px] font-light leading-[1.12] text-sanctuary-charcoal">
          {clinic.award.title}
        </p>
        <p className="mt-2 font-sans text-[14px] uppercase tracking-[0.2em] text-sanctuary-gold-deep">
          {clinic.award.body}
        </p>
      </div>

      <ul className="flex flex-wrap gap-x-10 gap-y-4">
        {memberships.map((entry) =>
          'pending' in entry && entry.pending ? (
            <li
              key={entry.id}
              className="rounded-full border border-dashed border-sanctuary-muted/40 px-4 py-2 font-sans text-[12px] uppercase tracking-[0.18em] text-sanctuary-muted/70"
            >
              Membership to confirm
            </li>
          ) : (
            <li key={entry.id}>
              <p className="font-serif text-[22px] font-light leading-tight text-sanctuary-verde">
                {entry.word}
              </p>
              <p className="mt-1 font-sans text-[12.5px] leading-snug text-sanctuary-muted">
                {entry.detail}
              </p>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
