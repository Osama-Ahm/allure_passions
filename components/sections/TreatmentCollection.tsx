import { ConsultationButton } from '@/components/ui/ConsultationButton';
import { signatureTreatments, treatmentFamilies } from '@/content/treatments';

/**
 * The six signature technologies, grouped into their three families and given
 * that family's accent. The names, courses, downtime and from-prices are the
 * clinic's own, from content/treatments.ts. Downtime is described rather than
 * promised away, and a price is a starting point for a plan agreed at
 * consultation, not a checkout.
 */

const FAMILY_STYLES = {
  skin: {
    rule: 'bg-sanctuary-verde',
    label: 'text-sanctuary-verde',
    card: 'border-t-sanctuary-verde bg-sanctuary-verde/[0.07] border-sanctuary-verde/25 hover:bg-sanctuary-verde/[0.12]',
    chip: 'bg-sanctuary-verde text-sanctuary-alabaster',
    button: 'bg-sanctuary-verde hover:bg-sanctuary-verde-deep',
  },
  lift: {
    rule: 'bg-sanctuary-gold-deep',
    label: 'text-sanctuary-gold-deep',
    card: 'border-t-sanctuary-gold-deep bg-sanctuary-gold/[0.12] border-sanctuary-gold/35 hover:bg-sanctuary-gold/[0.2]',
    chip: 'bg-sanctuary-gold-deep text-sanctuary-alabaster',
    button: 'bg-sanctuary-gold-deep hover:bg-sanctuary-charcoal',
  },
  body: {
    rule: 'bg-sanctuary-clay',
    label: 'text-sanctuary-clay-deep',
    card: 'border-t-sanctuary-clay bg-sanctuary-clay/[0.09] border-sanctuary-clay/30 hover:bg-sanctuary-clay/[0.16]',
    chip: 'bg-sanctuary-clay-deep text-sanctuary-alabaster',
    button: 'bg-sanctuary-clay-deep hover:bg-sanctuary-charcoal',
  },
} as const;

export function TreatmentCollection() {
  return (
    <section id="treatment-collection" className="mx-auto max-w-7xl px-6 py-24 md:px-8 md:py-28">
      <div className="mb-14 text-center">
        <span className="eyebrow mb-3">Advanced treatments, personalised to you</span>
        <h2 className="font-serif text-4xl font-light text-sanctuary-charcoal md:text-5xl">
          The signature technologies
        </h2>
        <p className="mx-auto mt-5 max-w-2xl font-sans text-sm leading-relaxed text-sanctuary-muted md:text-base">
          A deliberately small collection of devices, grouped by what they are for. Which of them
          suits you — if any of them do — is decided at consultation.
        </p>
      </div>

      <div className="space-y-14">
        {treatmentFamilies.map((family) => {
          const styles = FAMILY_STYLES[family.id];
          const treatments = family.slugs
            .map((slug) => signatureTreatments.find((t) => t.slug === slug))
            .filter((t): t is (typeof signatureTreatments)[number] => Boolean(t));

          return (
            <div key={family.id}>
              <div className="mb-6 flex items-center gap-4">
                <span className={`h-px w-10 shrink-0 ${styles.rule}`} aria-hidden="true" />
                <h3
                  className={`font-sans text-xs uppercase tracking-[0.25em] ${styles.label} shrink-0`}
                >
                  {family.label}
                </h3>
                <span className="h-px w-full bg-sanctuary-stone" aria-hidden="true" />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
                {treatments.map((treatment) => (
                  <article
                    key={treatment.slug}
                    className={`flex flex-col justify-between rounded-2xl border border-t-4 p-8 transition-colors duration-500 md:p-10 ${styles.card}`}
                  >
                    <div>
                      <span
                        className={`mb-4 inline-block rounded-full px-3 py-1 font-sans text-[11px] uppercase tracking-widest ${styles.chip}`}
                      >
                        {treatment.type}
                      </span>
                      <h4 className="mb-4 font-serif text-3xl font-normal text-sanctuary-charcoal">
                        {treatment.name}
                      </h4>
                      <p className="mb-6 font-sans text-sm leading-relaxed text-sanctuary-muted">
                        {treatment.summary}
                      </p>
                    </div>

                    <div>
                      <dl className="mb-6 space-y-2 border-t border-sanctuary-stone/70 pt-4 font-sans text-sm">
                        <div className="flex items-baseline justify-between gap-4">
                          <dt className="text-sanctuary-muted">Typical course</dt>
                          <dd className="text-sanctuary-charcoal">{treatment.sessions}</dd>
                        </div>
                        <div className="flex items-baseline justify-between gap-4">
                          <dt className="text-sanctuary-muted">Downtime</dt>
                          <dd className="text-right text-sanctuary-charcoal">
                            {treatment.downtime}
                          </dd>
                        </div>
                        <div className="flex items-baseline justify-between gap-4">
                          <dt className="text-sanctuary-muted">From</dt>
                          <dd className="font-medium text-sanctuary-charcoal">
                            {treatment.fromPrice}
                          </dd>
                        </div>
                      </dl>

                      <ConsultationButton
                        treatment={treatment.name}
                        className={`w-full text-white ${styles.button}`}
                      >
                        Enquire about {treatment.name}
                      </ConsultationButton>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-12 text-center font-sans text-xs leading-relaxed text-sanctuary-muted">
        From-prices are a starting point and are confirmed in writing after your consultation.
        Suitability, the number of sessions and the result that is realistic for you are all
        assessed first.
      </p>
    </section>
  );
}
