import { kojivit, tretinoin } from '@/content/products';

/**
 * Wall 9 — Clinical skincare.
 *
 * Two products, deliberately unequal in how they are presented.
 *
 * Kojivit is a cosmetic and carries its price. Tretinoin is a prescription-only
 * medicine: it is named, as the clinic asked, but it always appears with its
 * notice and never with a price, a basket or anything that reads as an offer to
 * sell. Under the UK Human Medicines Regulations a prescription-only medicine
 * may not be advertised to the public, so what is described here is the
 * consultation route, not the medicine as a product.
 */
export function SkincareWall() {
  return (
    <div className="flex h-[460px] w-[900px] flex-col justify-center px-12">
      <span className="mb-3 block font-sans text-[16px] uppercase tracking-[0.32em] text-sanctuary-gold-deep">
        Clinical skincare
      </span>

      <h2 className="mb-5 font-serif text-[40px] font-light leading-[1.1] text-sanctuary-charcoal">
        Care that continues at home
      </h2>

      <div className="grid grid-cols-2 gap-8 border-t border-sanctuary-stone pt-5">
        <div>
          <div className="mb-1.5 flex items-baseline justify-between gap-3">
            <h3 className="font-serif text-[24px] font-normal leading-tight text-sanctuary-charcoal">
              {kojivit.name}
            </h3>
            <span className="shrink-0 font-sans text-[15px] text-sanctuary-charcoal">
              {kojivit.price}
            </span>
          </div>
          <p className="mb-2 font-sans text-[12px] uppercase tracking-[0.16em] text-sanctuary-verde">
            {kojivit.type}
          </p>
          <p className="font-sans text-[13.5px] leading-[1.5] text-sanctuary-muted">
            {kojivit.summary}
          </p>
        </div>

        <div className="border-l border-sanctuary-stone pl-8">
          <h3 className="mb-1.5 font-serif text-[24px] font-normal leading-tight text-sanctuary-charcoal">
            {tretinoin.name}
          </h3>
          <p className="mb-2 font-sans text-[12px] uppercase tracking-[0.16em] text-sanctuary-clay-deep">
            {tretinoin.type}
          </p>
          <p className="rounded border-l-2 border-sanctuary-clay bg-sanctuary-clay/[0.07] px-3 py-2 font-sans text-[13px] leading-[1.5] text-sanctuary-charcoal">
            {tretinoin.notice}
          </p>
        </div>
      </div>

      <ol className="mt-5 flex gap-6 border-t border-sanctuary-stone pt-4">
        {tretinoin.steps.map((step, index) => (
          <li key={step.id} className="flex gap-2">
            <span
              aria-hidden="true"
              className="font-serif text-[15px] leading-none text-sanctuary-gold-deep"
            >
              {index + 1}
            </span>
            <span className="font-sans text-[12.5px] leading-snug text-sanctuary-muted">
              {step.title}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
