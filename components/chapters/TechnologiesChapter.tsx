import Image from 'next/image';
import type { CSSProperties } from 'react';
import { treatmentMedia } from '@/content/media';
import { technologies } from '@/content/story';
import { familyForSlug, signatureTreatments, treatmentFamilies } from '@/content/treatments';
import { techFrame } from '@/lib/story/chapters';
import { ChapterFrame } from '@/components/story/ChapterFrame';
import { ConsultationButton } from '@/components/ui/ConsultationButton';

/**
 * Chapter 4 · Technologies, on night. The six concern droplets flow back into
 * one drop, which turns to light; a photograph opens out of that light, and
 * each technology's photograph follows as its details scroll past on the left
 * (data-focus). The index at the top right jumps between them.
 *
 * Below lg the photographs sit in the copy instead, one above each technology.
 */
export function TechnologiesChapter() {
  const total = signatureTreatments.length;

  return (
    <ChapterFrame id="treatments" labelledBy="treatments-title" back={<Photographs />} backClassName="hidden lg:block">
      <div className="relative px-5 pb-[42svh] md:px-10">
        {/* The index, held under the header while the chapter scrolls. It
            fades in once the chapter reaches the top, so it never sits over
            the droplets gathering on the way in. Only on wide screens, where
            it clears the photograph. */}
        <div className="pointer-events-none absolute inset-y-0 right-10 hidden xl:block">
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

        <header className="flex min-h-[80svh] flex-col justify-end pb-20 md:max-w-[34rem] lg:max-w-[min(34rem,38vw)]">
          <p className="eyebrow">{technologies.eyebrow}</p>
          <h2 id="treatments-title" data-reveal className="mt-5 font-serif text-display-lg font-light">
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
          const photo = treatmentMedia[treatment.slug];
          return (
            <article
              key={treatment.slug}
              id={`tech-${treatment.slug}`}
              data-technology={treatment.slug}
              data-focus
              aria-labelledby={`tech-${treatment.slug}-name`}
              className="flex flex-col justify-center border-t border-line py-16 md:min-h-[64svh] md:max-w-[34rem] lg:max-w-[min(34rem,38vw)]"
            >
              {photo ? (
                <div className="relative mb-10 aspect-[4/3] overflow-hidden lg:hidden">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 768px) 34rem, 100vw"
                    className="object-cover"
                    style={{ objectPosition: photo.position }}
                  />
                </div>
              ) : null}

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

        <p className="border-t border-line py-12 font-sans text-sm leading-relaxed text-ink-muted md:max-w-[34rem] lg:max-w-[min(34rem,38vw)]">
          <span className="mr-3 font-sans text-label uppercase text-accent">{technologies.alsoLabel}</span>
          {technologies.also.join(' · ')}
        </p>
      </div>
    </ChapterFrame>
  );
}

/**
 * The photographs from lg up: one frame on the right, in the back layer behind
 * the canvas, holding all six (.tech-frame in app/globals.css). The drop turns
 * to light at its centre and the frame opens out of it (--open, written by the
 * 3D stage); each technology's photograph then fades in over the last as its
 * copy reaches the middle of the screen (--focus, from the story runtime).
 *
 * Below lg the same photographs are in the copy, carrying the alt text; this
 * frame repeats them for the eye only.
 */
function Photographs() {
  return (
    <div
      id="treatments-frame"
      aria-hidden="true"
      className="tech-frame"
      style={{ '--frame-x': `${techFrame.x * 100}%`, '--frame-y': `${techFrame.y * 100}%` } as CSSProperties}
    >
      <div className="tech-drift">
        {signatureTreatments.map((treatment, index) => {
          const photo = treatmentMedia[treatment.slug];
          return photo ? (
            <div key={treatment.slug} className="tech-photo" style={{ '--i': index } as CSSProperties}>
              <Image
                src={photo.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="object-cover"
                style={{ objectPosition: photo.position }}
              />
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
}
