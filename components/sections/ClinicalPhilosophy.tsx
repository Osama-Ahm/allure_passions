import { clinic } from '@/content/clinic';
import { consultationQuote, trustDossier } from '@/content/home';

/**
 * "Why trust this clinic?" — the spec's philosophy section, filled from the
 * trust dossier in content/home.ts.
 *
 * This is the page's one dark ground. Everything above and below it is
 * alabaster, so the deep verde gives the scroll a break and marks the section
 * the clinic most wants read as the one that looks different.
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
    <section id="clinical-philosophy" className="bg-sanctuary-verde-deep text-sanctuary-alabaster">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-28">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <span className="mb-3 block font-sans text-xs uppercase tracking-[0.3em] text-sanctuary-gold-light">
              Expert care you can trust
            </span>
            <h2 className="mb-6 font-serif text-4xl font-light leading-tight md:text-5xl">
              Registered, qualified, and the same hands throughout
            </h2>
            <p className="mb-8 font-sans text-base leading-relaxed text-sanctuary-verde-light">
              Treatment here is practitioner-led: the person who assesses your skin plans your
              course, carries it out and sees you through aftercare. Four things worth checking
              before anyone treats you, and where to check them.
            </p>

            <dl className="space-y-5">
              {checks.map((entry) => (
                <div key={entry.id} className="flex gap-4">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sanctuary-gold"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="font-sans text-sm font-medium text-sanctuary-alabaster">
                      {entry.title}
                    </dt>
                    <dd className="mt-1 font-sans text-sm leading-relaxed text-sanctuary-verde-light">
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
              className="mt-8 inline-block font-sans text-xs uppercase tracking-widest text-sanctuary-gold-light underline decoration-sanctuary-gold/50 underline-offset-4 transition-colors hover:text-white"
            >
              Check the public JCCP register
            </a>
          </div>

          {/* The quotation, then the credentials it rests on. The card was a
              tall empty green panel with one line at the foot of it. */}
          <figure className="flex flex-col justify-center rounded-2xl border border-sanctuary-gold/25 bg-sanctuary-verde/30 p-8 md:p-10">
            <span className="font-serif text-6xl leading-none text-sanctuary-gold/50" aria-hidden="true">
              &ldquo;
            </span>
            <blockquote className="-mt-4 mb-6 font-serif text-2xl italic leading-snug text-sanctuary-alabaster md:text-3xl">
              {consultationQuote}
            </blockquote>
            <figcaption className="font-sans text-xs uppercase tracking-widest text-sanctuary-gold-light">
              {clinic.legalName}
            </figcaption>

            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-sanctuary-gold/25 pt-8">
              {[
                { value: '6', label: 'technologies' },
                { value: 'L6', label: 'qualified practice' },
                { value: '2026', label: 'award winner' },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt className="font-serif text-3xl font-light text-sanctuary-gold-light md:text-4xl">
                    {stat.value}
                  </dt>
                  <dd className="mt-1 font-sans text-[11px] uppercase leading-tight tracking-widest text-sanctuary-verde-light">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </figure>
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
