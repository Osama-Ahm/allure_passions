import { signatureTreatments, treatmentFamilies } from '@/content/treatments';

const FAMILY_TONE: Record<string, string> = {
  skin: 'text-sanctuary-verde',
  lift: 'text-sanctuary-gold-deep',
  body: 'text-sanctuary-clay-deep',
};

const FAMILY_RULE: Record<string, string> = {
  skin: 'bg-sanctuary-verde',
  lift: 'bg-sanctuary-gold-deep',
  body: 'bg-sanctuary-clay',
};

/**
 * Wall 3 — the six signature technologies, in their three families.
 *
 * From-prices are starting points confirmed after consultation, worded as
 * content/treatments.ts words them. Nothing here reads as an offer to sell.
 */
export function TreatmentsWall() {
  return (
    <div className="flex h-[460px] w-[900px] flex-col justify-center px-12">
      <span className="mb-3 block font-sans text-[16px] uppercase tracking-[0.32em] text-sanctuary-gold-deep">
        Advanced treatments, personalised to you
      </span>

      <h2 className="mb-5 font-serif text-[42px] font-light leading-[1.08] text-sanctuary-charcoal">
        The signature technologies
      </h2>

      <div className="grid grid-cols-3 gap-7 border-t border-sanctuary-stone pt-5">
        {treatmentFamilies.map((family) => (
          <div key={family.id}>
            <div className="mb-3 flex items-center gap-2">
              <span className={'h-px w-6 ' + FAMILY_RULE[family.id]} aria-hidden="true" />
              <h3
                className={
                  'font-sans text-[12px] uppercase tracking-[0.18em] ' + FAMILY_TONE[family.id]
                }
              >
                {family.label}
              </h3>
            </div>

            <ul className="space-y-3">
              {family.slugs.map((slug) => {
                const treatment = signatureTreatments.find((item) => item.slug === slug);
                if (!treatment) return null;
                return (
                  <li key={slug}>
                    <div className="flex items-baseline justify-between gap-3">
                      <h4 className="font-serif text-[22px] font-normal leading-tight text-sanctuary-charcoal">
                        {treatment.name}
                      </h4>
                      <span className="shrink-0 font-sans text-[14px] text-sanctuary-charcoal">
                        {treatment.fromPrice}
                      </span>
                    </div>
                    <p className="mt-0.5 font-sans text-[12.5px] leading-[1.4] text-sanctuary-muted">
                      {treatment.type} &middot; {treatment.sessions}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-5 font-sans text-[12.5px] leading-snug text-sanctuary-muted">
        From-prices are a starting point, confirmed in writing after your consultation.
      </p>
    </div>
  );
}
