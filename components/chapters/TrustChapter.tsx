import Image from 'next/image';
import type { CSSProperties } from 'react';
import { credentials } from '@/content/credentials';
import { media } from '@/content/media';
import { trust } from '@/content/story';
import { ChapterFrame } from '@/components/story/ChapterFrame';

/**
 * Chapter 8 · Trust, on stone. The programme stack presses into one gold
 * medallion, engraved in black with the monogram, which rises to face you in the left
 * third and turns slowly in the light; the six credentials hold the right, in
 * a hairline grid, under a single photograph of a treatment being prepared.
 */
export function TrustChapter() {
  return (
    <ChapterFrame id="trust" labelledBy="trust-title">
      <div className="px-5 py-28 md:py-[18svh] md:pl-[38%] md:pr-16">
        <div className="lg:grid lg:grid-cols-[minmax(0,34rem)_auto] lg:items-end lg:justify-between lg:gap-10">
          <header>
            <p className="eyebrow">{trust.eyebrow}</p>
            <h2 id="trust-title" data-reveal className="mt-5 font-serif text-display-lg font-light">
              {trust.title}
            </h2>
            <p className="mt-6 font-sans text-[15px] leading-relaxed text-ink-muted">{trust.lede}</p>
          </header>

          {/* It fades in once the chapter has reached the top, by which time
              the medallion has crossed behind this column to the left; an
              opaque photograph must never cut across it on the way. */}
          <div
            className="reveal-at relative mt-10 aspect-[4/3] w-full overflow-hidden bg-sanctuary-pearl md:ml-auto md:aspect-square md:max-w-[18rem] lg:mt-0 lg:w-[clamp(11rem,15vw,16rem)]"
            style={{ '--at': 0 } as CSSProperties}
          >
            <Image
              src={media.whyDetail.src}
              alt={media.whyDetail.alt}
              fill
              sizes="(min-width: 1024px) 16rem, (min-width: 768px) 18rem, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <ul className="mt-14 grid gap-x-12 sm:grid-cols-2">
          {credentials.map((credential, index) => (
            <li key={credential.id} className="border-t border-line py-7">
              <span className="font-sans text-label uppercase text-ink-muted">0{index + 1}</span>
              <h3 className="mt-2 font-serif text-2xl font-light">{credential.title}</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-ink-muted">{credential.body}</p>
              {credential.logo ? (
                <div className="mt-5 flex flex-wrap items-center gap-5">
                  <Image
                    src={credential.logo.src}
                    alt={credential.logo.alt}
                    width={credential.logo.width}
                    height={credential.logo.height}
                    className="h-9 w-auto"
                  />
                  <a
                    href={trust.register.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-label uppercase text-ink underline decoration-line underline-offset-4 hover:decoration-current"
                  >
                    {trust.register.label} ↗
                  </a>
                </div>
              ) : null}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:gap-10">
          <a
            href={trust.reviews.href}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start rounded-full border border-ink/30 px-6 py-3.5 font-sans text-label uppercase transition-colors duration-300 hover:bg-ink hover:text-paper"
          >
            {trust.reviews.label} ↗
          </a>
          <p className="max-w-[22rem] font-sans text-xs leading-relaxed text-ink-muted">{trust.reviews.detail}</p>
        </div>
      </div>
    </ChapterFrame>
  );
}
