import { consultationQuote } from '@/content/home';
import { consultation } from '@/content/story';
import { ChapterFrame } from '@/components/story/ChapterFrame';
import { ConsultationButton } from '@/components/ui/ConsultationButton';

/**
 * Chapter 6 · Consultation. The archway lies down and four of its stones
 * become the plan: soft stones on a gold circle, seen from above, each lighting
 * as its step is read. The four steps here are the readable version of that
 * drawing, on a hairline timeline along the foot of the screen.
 */
export function ConsultationChapter() {
  return (
    <ChapterFrame id="consultation" labelledBy="consultation-title" frontMode="sticky-md">
      <div className="flex h-full flex-col justify-between px-5 pb-12 pt-28 md:px-10 md:pb-14 md:pt-[18svh]">
        <div className="md:max-w-[30rem]">
          <p className="eyebrow">{consultation.eyebrow}</p>
          <h2 id="consultation-title" data-reveal className="mt-5 font-serif text-display-lg font-light">
            {consultation.title}
          </h2>
          <blockquote className="mt-8 border-l border-gild pl-5 font-serif text-display-sm font-light italic text-ink-muted">
            {consultationQuote}
          </blockquote>
          <ConsultationButton className="mt-9">Request a consultation</ConsultationButton>
        </div>

        <ol className="mt-16 grid gap-8 md:grid-cols-4 md:gap-10">
          {consultation.steps.map((step, index) => (
            <li key={step.id} className="relative border-t border-line pt-6">
              <span aria-hidden="true" className="absolute -top-[5px] left-0 h-[9px] w-[9px] rounded-full border border-gild bg-paper" />
              <span className="font-sans text-label uppercase text-accent">0{index + 1}</span>
              <h3 className="mt-2 font-serif text-2xl font-light">{step.title}</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-ink-muted">{step.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </ChapterFrame>
  );
}
