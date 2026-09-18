import type { CSSProperties } from 'react';
import { technologies } from '@/content/story';
import { familyForSlug, signatureTreatments, treatmentFamilies } from '@/content/treatments';
import { ChapterFrame } from '@/components/story/ChapterFrame';
import { ConsultationButton } from '@/components/ui/ConsultationButton';

/**
 * Chapter 4 · Technologies, on night. The six concern droplets flow back into
 * one and freeze into a crystal; each technology is shown as its own light or
 * energy passing through it while its details scroll past on the left
 * (data-focus). The index at the top right jumps between them.
 */
export function TechnologiesChapter() {
  const total = signatureTreatments.length;

  return (
    <ChapterFrame
      id="treatments"
      labelledBy="treatments-title"
    >
      <div className="relative px-5 pb-[42svh] md:px-10">
        {/* The index, held under the header while the chapter scrolls. It
            fades in once the chapter reaches the top, so it never sits over
            the droplets gathering on the way in. */}
        <div className="pointer-events-none absolute inset-y-0 right-10 hidden md:block">
          <nav
            aria-label="Technologies"
            className="reveal-at pointer-events-auto sticky top-28"
            style={{ '--at': 0 } as CSSProperties}
          >
            <ol className="space-y-2 text-right font-sans text-label uppercase">
              {signatureTreatments.map((treatment, index) => (
                <li key={treatment.slug}>
                  <a
                    href={`#tech-${treatment.slug}`}
                    data-tech-link={treatment.slug}
                    className="text-ink-muted transition-colors hover:text-ink aria-[current=true]:text-ink"
                  >
                    {treatment.name}
                    <span className="ml-3 text-ink-muted/60">0{index + 1}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        <header className="flex min-h-[80svh] flex-col justify-end pb-20 md:max-w-[34rem]">
          <p className="eyebrow">{technologies.eyebrow}</p>
          <h2 id="treatments-title" className="mt-5 font-serif text-display-lg font-light">
            {technologies.title}
          </h2>
          <p className="mt-6 max-w-[28rem] font-sans text-[15px] leading-relaxed text-ink-muted">
            {technologies.lede}
          </p>
          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-4">
            {treatmentFamilies.map((family) => (
              <div key={family.id}>
                <dt className="font-sans text-label uppercase text-accent">{family.label}</dt>
                <dd className="mt-2 font-sans text-xs leading-relaxed text-ink-muted">
                  {family.slugs
                    .map((slug) => signatureTreatments.find((treatment) => treatment.slug === slug)?.name)
                    .join(', ')}
                </dd>
              </div>
            ))}
          </dl>
        </header>

        {signatureTreatments.map((treatment, index) => {
          const caption = technologies.captions[treatment.slug];
          return (
            <article
              key={treatment.slug}
              id={`tech-${treatment.slug}`}
              data-technology={treatment.slug}
              data-focus
              aria-labelledby={`tech-${treatment.slug}-name`}
              className="flex flex-col justify-center border-t border-line py-16 md:min-h-[64svh] md:max-w-[34rem]"
            >
              <div className="flex items-baseline justify-between gap-4 font-sans text-label uppercase">
                <span className="text-accent">{familyForSlug(treatment.slug).label}</span>
                <span className="text-ink-muted">
                  0{index + 1} / 0{total}
                </span>
              </div>

              <h3 id={`tech-${treatment.slug}-name`} className="mt-6 font-serif text-display-lg font-light">
                {treatment.name}
              </h3>
              <p className="mt-2 font-sans text-label uppercase text-ink-muted">{treatment.type}</p>

              <p className="mt-6 max-w-[30rem] font-sans text-[15px] leading-relaxed text-ink-muted">
                {treatment.summary}
              </p>
              {caption ? <p className="mt-4 font-serif text-xl font-light italic">{caption}</p> : null}

              <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-4">
                {[
                  ['Course', treatment.sessions],
                  ['Downtime', treatment.downtime],
                  ['From', treatment.fromPrice],
                ].map(([term, value]) => (
                  <div key={term}>
                    <dt className="font-sans text-label uppercase text-ink-muted">{term}</dt>
                    <dd className="mt-1.5 font-sans text-sm">{value}</dd>
                  </div>
                ))}
              </dl>

              <ConsultationButton variant="outline" treatment={treatment.name} className="mt-9 self-start">
                Enquire about {treatment.name}
              </ConsultationButton>
            </article>
          );
        })}

        <p className="border-t border-line py-12 font-sans text-sm leading-relaxed text-ink-muted md:max-w-[34rem]">
          <span className="mr-3 font-sans text-label uppercase text-accent">{technologies.alsoLabel}</span>
          {technologies.also.join(' · ')}
        </p>
      </div>
    </ChapterFrame>
  );
}
