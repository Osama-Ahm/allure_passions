import { enquiryMessage, whatsappHref } from '@/content/contact';
import { kojivitBenefits, supplySteps } from '@/content/home';
import { kojivit, tretinoin } from '@/content/products';
import { skincare } from '@/content/story';
import { ChapterFrame } from '@/components/story/ChapterFrame';
import { ConsultationButton } from '@/components/ui/ConsultationButton';

/**
 * Chapter 9 · At home. The bottle, close and warm, with one drop hanging from
 * the pipette. Two products, deliberately unequal in how they are presented.
 *
 * Kojivit is a cosmetic and carries its price. Tretinoin is a prescription-only
 * medicine: it is named, as the clinic asked, but always with its notice and
 * never with a price, a basket or anything that reads as an offer to sell
 * (Human Medicines Regulations; decisions D5 and P5). The 3D bottle is never
 * presented as it.
 */
export function SkincareChapter() {
  return (
    <ChapterFrame id="skincare" labelledBy="skincare-title">
      <div className="px-5 py-28 md:px-10 md:py-[18svh] lg:pr-[40%]">
        <header className="max-w-[34rem]">
          <p className="eyebrow">{skincare.eyebrow}</p>
          <h2 id="skincare-title" className="mt-5 font-serif text-display-lg font-light">
            {skincare.title}
          </h2>
          <p className="mt-6 font-sans text-[15px] leading-relaxed text-ink-muted">{skincare.lede}</p>
        </header>

        <div className="mt-14 grid gap-12 border-t border-line pt-8 md:grid-cols-2 md:gap-10">
          <article aria-labelledby="kojivit-name">
            <div className="flex items-baseline justify-between gap-4">
              <h3 id="kojivit-name" className="font-serif text-display-sm font-light">
                {kojivit.name}
              </h3>
              <span className="font-sans text-sm">{kojivit.price}</span>
            </div>
            <p className="mt-1.5 font-sans text-label uppercase text-accent">{kojivit.type}</p>
            <p className="mt-4 font-sans text-sm leading-relaxed text-ink-muted">{kojivit.summary}</p>
            <ul className="mt-4 space-y-1.5 font-sans text-sm text-ink-muted">
              {kojivitBenefits.map((benefit) => (
                <li key={benefit} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[0.6rem] h-px w-3 shrink-0 bg-gild" />
                  {benefit}
                </li>
              ))}
            </ul>
            <p className="mt-4 font-sans text-xs text-ink-muted">{kojivit.collection}</p>
            <a
              href={whatsappHref(enquiryMessage.treatment(kojivit.name))}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block font-sans text-label uppercase text-ink underline decoration-line underline-offset-4 hover:decoration-current"
            >
              Reserve via WhatsApp ↗
            </a>
          </article>

          <article aria-labelledby="tretinoin-name" className="md:border-l md:border-line md:pl-10">
            <h3 id="tretinoin-name" className="font-serif text-display-sm font-light">
              {tretinoin.name}
            </h3>
            <p className="mt-1.5 font-sans text-label uppercase text-accent">{tretinoin.type}</p>
            <p className="mt-4 border-l-2 border-sanctuary-clay bg-sanctuary-clay/[0.07] px-4 py-3 font-sans text-sm leading-relaxed">
              {tretinoin.notice}
            </p>
            <ConsultationButton
              variant="outline"
              treatment="Prescription skincare (consultation required)"
              className="mt-6"
            >
              Start with a consultation
            </ConsultationButton>
          </article>
        </div>

        <div className="mt-14">
          <p className="font-sans text-label uppercase text-ink-muted">{skincare.stepsLabel}</p>
          <ol className="mt-4 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {supplySteps.map((step, index) => (
              <li key={step.id} className="border-t border-line pt-4">
                <span className="font-sans text-label uppercase text-accent">0{index + 1}</span>
                <h4 className="mt-1.5 font-serif text-xl font-light">{step.title}</h4>
                <p className="mt-1.5 font-sans text-xs leading-relaxed text-ink-muted">{step.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </ChapterFrame>
  );
}
