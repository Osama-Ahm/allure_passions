import { statementFacts } from '@/content/home';
import { welcome } from '@/content/story';
import { ChapterFrame } from '@/components/story/ChapterFrame';

/**
 * Chapter 5 · Clinic. Dawn after the technology chapter: the crystal breaks,
 * and its pieces fly out and build the clinic's archway, which stands between
 * two giant lines of type.
 *
 * On a desktop screen the giant words sit in the back layer so the arch can
 * stand in front of them. On a phone there is no room to layer them, so the
 * same heading is set in the copy instead (only one version is ever displayed).
 */
export function ClinicChapter() {
  const [first, second] = welcome.giant;

  return (
    <ChapterFrame
      id="clinic"
      labelledBy="clinic-title"
      backMode="sticky-md"
      back={
        <div className="relative hidden h-full md:block">
          <h2 id="clinic-title" className="font-serif text-display-giant font-light">
            <span className="absolute left-[4vw] top-[15svh] whitespace-nowrap">{first}</span>
            <span className="absolute right-[4vw] top-[33svh] whitespace-nowrap italic">{second}</span>
          </h2>
        </div>
      }
      frontMode="sticky-md"
    >
      <div className="flex h-full flex-col justify-end px-5 pb-12 pt-28 md:px-10 md:pb-14">
        <h2 className="mb-14 font-serif text-display-giant font-light md:hidden">
          {first}
          <br />
          <em>{second}</em>
        </h2>

        <div className="grid gap-12 border-t border-line pt-8 md:grid-cols-[minmax(0,30rem)_1fr] md:gap-20">
          <div>
            <p className="eyebrow">{welcome.eyebrow}</p>
            <p className="mt-5 font-serif text-display-sm font-light">{welcome.award}</p>
            <p className="mt-5 font-sans text-[15px] leading-relaxed text-ink-muted">{welcome.approach}</p>
          </div>

          <dl className="grid grid-cols-3 gap-6 self-end md:justify-self-end md:gap-12">
            {statementFacts.map((fact) => (
              <div key={fact.label}>
                <dt className="sr-only">{fact.label}</dt>
                <dd>
                  <span className="block font-serif text-display-lg font-light">{fact.value}</span>
                  <span aria-hidden="true" className="mt-2 block max-w-[9rem] font-sans text-label uppercase text-ink-muted">
                    {fact.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </ChapterFrame>
  );
}
