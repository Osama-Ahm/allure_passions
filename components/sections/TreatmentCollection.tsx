import { ConsultationButton } from '@/components/ui/ConsultationButton';
import { signatureTreatments } from '@/content/treatments';

/**
 * The six signature technologies, taken straight from content/treatments.ts so
 * the names, courses, downtime and from-prices are the clinic's own. Downtime
 * is described rather than promised away, and a price is a starting point for a
 * plan agreed at consultation, not a checkout.
 */
export function TreatmentCollection() {
  return (
    <section id="treatment-collection" className="mx-auto max-w-7xl px-6 py-24 md:px-8 md:py-28">
      <div className="mb-16 text-center md:mb-20">
        <span className="eyebrow mb-3">Advanced treatments, personalised to you</span>
        <h2 className="font-serif text-4xl font-light text-sanctuary-charcoal md:text-5xl">
          The signature technologies
        </h2>
        <p className="mx-auto mt-5 max-w-2xl font-sans text-sm leading-relaxed text-sanctuary-muted md:text-base">
          A deliberately small collection of devices, each used by a practitioner trained on it by
          its manufacturer. Which of them suits you — if any of them do — is decided at
          consultation.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {signatureTreatments.map((treatment) => (
          <article
            key={treatment.slug}
            className="flex flex-col justify-between rounded-2xl border border-sanctuary-stone bg-sanctuary-pearl p-8 shadow-sm transition-colors duration-500 hover:border-sanctuary-gold md:p-10"
          >
            <div>
              <span className="mb-2 block font-sans text-[11px] uppercase tracking-widest text-sanctuary-gold-deep">
                {treatment.type}
              </span>
              <h3 className="mb-4 font-serif text-2xl font-normal text-sanctuary-charcoal">
                {treatment.name}
              </h3>
              <p className="mb-6 font-sans text-sm leading-relaxed text-sanctuary-muted">
                {treatment.summary}
              </p>
            </div>

            <div>
              <dl className="mb-6 space-y-2 border-t border-sanctuary-stone/60 pt-4 font-sans text-sm">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sanctuary-muted">Typical course</dt>
                  <dd className="text-sanctuary-charcoal">{treatment.sessions}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sanctuary-muted">Downtime</dt>
                  <dd className="text-right text-sanctuary-charcoal">{treatment.downtime}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sanctuary-muted">From</dt>
                  <dd className="font-medium text-sanctuary-charcoal">{treatment.fromPrice}</dd>
                </div>
              </dl>

              <ConsultationButton treatment={treatment.name} className="w-full">
                Enquire about {treatment.name}
              </ConsultationButton>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-10 text-center font-sans text-xs leading-relaxed text-sanctuary-muted">
        From-prices are a starting point and are confirmed in writing after your consultation.
        Suitability, the number of sessions and the result that is realistic for you are all
        assessed first.
      </p>
    </section>
  );
}
