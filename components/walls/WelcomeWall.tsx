import { clinic } from '@/content/clinic';
import { signatureTreatments } from '@/content/treatments';
import { allConcerns } from '@/content/concerns';

/**
 * Wall 1 — Welcome to the clinic.
 *
 * Authored to 900 x 460 CSS pixels, which is the alcove opening at the scale
 * WallPanel mounts it. At the reading distance that box renders about 820
 * screen pixels wide, so type here lands at roughly 0.91 of its nominal size:
 * 20px body copy reads as 18px on screen. Nothing smaller than 16px belongs on
 * a wall.
 *
 * Content is written to fit the box. There is nowhere to scroll to on a wall.
 */
export function WelcomeWall() {
  return (
    <div className="flex h-[460px] w-[900px] flex-col justify-center px-12">
      <span className="mb-3 block font-sans text-[16px] uppercase tracking-[0.32em] text-sanctuary-gold-deep">
        Welcome
      </span>

      <h2 className="mb-5 font-serif text-[48px] font-light leading-[1.06] text-sanctuary-charcoal">
        An award-winning clinic for skin, body and wellness
      </h2>

      <p className="mb-6 max-w-[740px] font-sans text-[20px] leading-[1.55] text-sanctuary-muted">
        {clinic.legalName} is an advanced aesthetic clinic in {clinic.address.area}, London,
        working with non-invasive technology across skin health, body contouring and cellular
        wellbeing. Every plan starts with a consultation, not a treatment.
      </p>

      <dl className="flex items-end gap-10 border-t border-sanctuary-stone pt-5">
        <div>
          <dt className="font-serif text-[36px] font-light leading-none text-sanctuary-verde">
            {signatureTreatments.length}
          </dt>
          <dd className="mt-1.5 font-sans text-[12px] uppercase tracking-[0.2em] text-sanctuary-muted">
            Signature
            <br />
            technologies
          </dd>
        </div>
        <div>
          <dt className="font-serif text-[36px] font-light leading-none text-sanctuary-verde">
            {allConcerns.length}
          </dt>
          <dd className="mt-1.5 font-sans text-[12px] uppercase tracking-[0.2em] text-sanctuary-muted">
            Concerns
            <br />
            assessed
          </dd>
        </div>
        <div className="border-l border-sanctuary-stone pl-10">
          <dt className="font-sans text-[12px] uppercase tracking-[0.2em] text-sanctuary-gold-deep">
            {clinic.award.body}
          </dt>
          <dd className="mt-1.5 max-w-[330px] font-serif text-[19px] font-light leading-snug text-sanctuary-charcoal">
            {clinic.award.title}
          </dd>
        </div>
      </dl>
    </div>
  );
}
