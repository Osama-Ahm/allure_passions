import { concernGroups } from '@/content/concerns';

/**
 * Wall 4 — what we treat.
 *
 * The breadth of concerns, grouped the way the clinic groups them. Someone who
 * knows the concern but not the treatment should find themselves here.
 */
export function ConcernsWall() {
  return (
    <div className="flex h-[460px] w-[900px] flex-col justify-center px-12">
      <span className="mb-3 block font-sans text-[16px] uppercase tracking-[0.32em] text-sanctuary-gold-deep">
        Skin, body &amp; wellness concerns
      </span>

      <h2 className="mb-5 font-serif text-[42px] font-light leading-[1.08] text-sanctuary-charcoal">
        Start with the concern, not the treatment
      </h2>

      <div className="grid grid-cols-3 gap-x-7 gap-y-4 border-t border-sanctuary-stone pt-5">
        {concernGroups.map((group) => (
          <div key={group.id}>
            <h3 className="mb-2 font-sans text-[12px] uppercase tracking-[0.18em] text-sanctuary-verde">
              {group.name}
            </h3>
            <ul className="flex flex-wrap gap-1.5">
              {group.concerns.map((concern) => (
                <li
                  key={concern.id}
                  className="rounded-full bg-sanctuary-verde/[0.08] px-2.5 py-1 font-sans text-[12.5px] leading-snug text-sanctuary-charcoal"
                >
                  {concern.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-5 font-sans text-[12.5px] leading-snug text-sanctuary-muted">
        Which treatment suits a concern &mdash; if any does &mdash; is decided at consultation.
      </p>
    </div>
  );
}
