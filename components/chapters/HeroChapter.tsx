import { hero } from '@/content/story';
import { BottleOutline } from '@/components/story/BottleOutline';
import { ChapterFrame } from '@/components/story/ChapterFrame';
import { ConsultationButton } from '@/components/ui/ConsultationButton';
import { VideoCard } from '@/components/ui/VideoCard';

/**
 * Chapter 1 · Hero. The bottle stands in the right third on its plinth (the
 * 3D stage draws it; the outline here is what shows without WebGL, and what the
 * canvas fades in over). The copy holds the left two thirds.
 */
export function HeroChapter() {
  return (
    <ChapterFrame
      id="hero"
      anchor="top"
      labelledBy="hero-title"
      backMode="flow"
      back={
        <div className="absolute inset-x-0 top-0 flex h-[42svh] items-end justify-center md:inset-y-0 md:left-auto md:right-[7%] md:h-auto md:w-[32%] md:items-center">
          <BottleOutline className="stage-fallback h-[30svh] w-auto md:h-[62svh]" />
        </div>
      }
    >
      <div className="flex min-h-[100svh] flex-col px-5 pb-6 pt-[44svh] md:px-10 md:pb-9 md:pt-[24svh]">
        <div className="max-w-[60rem]">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 id="hero-title" data-reveal="load" className="mt-6 font-serif text-display-xl font-light">
            {hero.titleLead}
            <br />
            <em className="font-light">{hero.titleAccent}</em> {hero.titleTail}
          </h1>
          <p className="mt-7 max-w-[30rem] font-sans text-[15px] leading-relaxed text-ink-muted md:text-base">
            {hero.lede}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5">
            <ConsultationButton>Request a consultation</ConsultationButton>
            {hero.paths.map((path) => (
              <a
                key={path.href}
                href={path.href}
                className="group inline-flex items-center gap-2 font-sans text-label uppercase text-ink"
              >
                {path.label}
                <span aria-hidden="true" className="transition-transform duration-500 ease-out-expo group-hover:translate-y-0.5">
                  ↓
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-auto grid gap-8 pt-14 md:grid-cols-[1fr_auto_1fr] md:items-end">
          <ul className="flex max-w-[26rem] flex-wrap gap-x-3 gap-y-1 border-t border-line pt-3 font-sans text-label uppercase text-ink-muted">
            {hero.credentials.map((item, index) => (
              <li key={item} className="flex items-center gap-3">
                {index > 0 ? <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gild" /> : null}
                {item}
              </li>
            ))}
          </ul>

          <div aria-hidden="true" className="hidden flex-col items-center gap-3 md:flex">
            <span className="font-sans text-label uppercase text-ink-muted">{hero.scrollCue}</span>
            <span className="relative block h-10 w-px bg-line">
              <span className="absolute inset-0 animate-cue bg-ink" />
            </span>
          </div>

          <VideoCard className="md:justify-self-end" />
        </div>
      </div>
    </ChapterFrame>
  );
}
