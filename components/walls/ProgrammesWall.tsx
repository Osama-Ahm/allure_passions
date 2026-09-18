import { programmes } from '@/content/programmes';

/**
 * Wall 8 — Signature programmes.
 *
 * Course prices as the clinic lists them. Every figure still needs the
 * clinic's confirmation, which is noted in content/programmes.ts rather than
 * smoothed over here.
 */
export function ProgrammesWall() {
  return (
    <div className="flex h-[460px] w-[900px] flex-col justify-center px-12">
      <span className="mb-3 block font-sans text-[16px] uppercase tracking-[0.32em] text-sanctuary-gold-deep">
        Signature programmes
      </span>

      <h2 className="mb-5 font-serif text-[40px] font-light leading-[1.1] text-sanctuary-charcoal">
        Courses, structured and priced up front
      </h2>

      <ul className="grid grid-cols-2 gap-x-8 gap-y-4 border-t border-sanctuary-stone pt-5">
        {programmes.map((programme) => (
          <li key={programme.id} className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-serif text-[21px] font-normal leading-tight text-sanctuary-charcoal">
                {programme.name}
              </h3>
              <p className="mt-1 font-sans text-[12.5px] leading-snug text-sanctuary-muted">
                {programme.subtitle} &middot; {programme.sessions}
              </p>
            </div>
            <p className="shrink-0 pt-0.5 font-sans text-[17px] text-sanctuary-verde">
              {programme.price}
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-5 font-sans text-[12.5px] leading-snug text-sanctuary-muted">
        A programme is agreed at consultation, after your suitability has been assessed.
      </p>
    </div>
  );
}
