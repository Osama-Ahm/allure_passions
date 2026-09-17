import { clinic } from '@/content/clinic';
import { consultationQuote, trustDossier } from '@/content/home';

/**
 * "Why trust this clinic?" — the spec's philosophy section, filled from the
 * trust dossier in content/home.ts.
 *
 * The quotation is the clinic's own line on consultations and is attributed to
 * the clinic, not to a named practitioner: no practitioner name or portrait has
 * been supplied, and no medical title is implied anywhere on this page.
 */
export function ClinicalPhilosophy() {
  const checks = trustDossier.filter((entry) =>
    ['jccp', 'practitioner', 'level6', 'technology'].includes(entry.id)
  );

  return (
    <section
      id="clinical-philosophy"
      className="border-t border-sanctuary-stone bg-sanctuary-pearl px-6 py-24 md:px-8 md:py-28"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <span className="eyebrow mb-3">Expert care you can trust</span>
          <h2 className="mb-6 font-serif text-4xl font-light leading-tight text-sanctuary-charcoal md:text-5xl">
            Registered, qualified, and the same hands throughout
          </h2>
          <p className="mb-8 font-sans text-base leading-relaxed text-sanctuary-muted">
            Treatment here is practitioner-led: the person who assesses your skin plans your course,
            carries it out and sees you through aftercare. Four things worth checking before anyone
            treats you, and where to check them.
          </p>

          <dl className="space-y-5">
            {checks.map((entry) => (
              <div key={entry.id} className="flex gap-4">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sanctuary-gold"
                  aria-hidden="true"
                />
                <div>
                  <dt className="font-sans text-sm font-medium text-sanctuary-charcoal">
                    {entry.title}
                  </dt>
                  <dd className="mt-1 font-sans text-sm leading-relaxed text-sanctuary-muted">
                    {entry.body}
                  </dd>
                </div>
              </div>
            ))}
          </dl>

          <a
            href="https://www.jccp.org.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block font-sans text-xs uppercase tracking-widest text-sanctuary-gold-deep underline decoration-sanctuary-gold/40 underline-offset-4 transition-colors hover:text-sanctuary-charcoal"
          >
            Check the public JCCP register
          </a>
        </div>

        <figure className="flex aspect-[4/5] flex-col justify-end rounded-2xl border border-sanctuary-stone bg-sanctuary-stone/40 p-8 md:p-10">
          <blockquote className="mb-5 font-serif text-2xl italic leading-snug text-sanctuary-charcoal md:text-3xl">
            &ldquo;{consultationQuote}&rdquo;
          </blockquote>
          <figcaption className="font-sans text-xs uppercase tracking-widest text-sanctuary-gold-deep">
            {clinic.legalName}
          </figcaption>
        </figure>
      </div>

      <div className="mx-auto mt-20 max-w-6xl border-t border-sanctuary-stone pt-10 text-center">
        <span className="eyebrow mb-3">Recognition</span>
        <p className="mx-auto max-w-2xl font-serif text-xl font-light leading-snug text-sanctuary-charcoal md:text-2xl">
          {clinic.award.title}
        </p>
        <p className="mt-2 font-sans text-xs uppercase tracking-widest text-sanctuary-muted">
          {clinic.award.body}
        </p>
      </div>
    </section>
  );
}
