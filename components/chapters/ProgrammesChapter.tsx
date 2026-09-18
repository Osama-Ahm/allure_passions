import { enquiryMessage, whatsappHref } from '@/content/contact';
import { programmes } from '@/content/programmes';
import { programmes as copy } from '@/content/story';
import { ChapterFrame } from '@/components/story/ChapterFrame';

/**
 * Chapter 7 · Programmes. Four structured courses as ruled rows: what each is,
 * what it includes, and what it costs. Beside them, the stones of the plan
 * have become discs, and each programme's row (data-focus) shows its own
 * stack: the technologies it combines, layer by layer.
 */
export function ProgrammesChapter() {
  return (
    <ChapterFrame id="programmes" labelledBy="programmes-title">
      <div className="px-5 py-28 md:px-10 md:py-[18svh]">
        <header className="md:max-w-[34rem]">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 id="programmes-title" data-reveal className="mt-5 font-serif text-display-lg font-light">
            {copy.title}
          </h2>
          <p className="mt-6 font-sans text-[15px] leading-relaxed text-ink-muted">{copy.lede}</p>
        </header>

        <ol className="mt-16 border-b border-line lg:max-w-[58%]">
          {programmes.map((programme, index) => (
            <li
              key={programme.id}
              data-focus
              className="grid gap-5 border-t border-line py-8 md:grid-cols-[3rem_minmax(0,1.2fr)_minmax(0,1.4fr)_minmax(0,0.8fr)] md:gap-8"
            >
              <span className="font-sans text-label uppercase text-ink-muted">0{index + 1}</span>

              <div>
                <h3 className="font-serif text-display-sm font-light">{programme.name}</h3>
                <p className="mt-1.5 font-sans text-label uppercase text-accent">{programme.subtitle}</p>
              </div>

              <ul className="space-y-1.5 font-sans text-sm leading-relaxed text-ink-muted">
                {programme.includes.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[0.6rem] h-px w-3 shrink-0 bg-gild" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col items-start gap-1 md:items-end md:text-right">
                <span className="font-serif text-3xl font-light">{programme.price}</span>
                <span className="font-sans text-xs text-ink-muted">
                  {programme.sessions} · {programme.singlePrice}
                </span>
                <a
                  href={whatsappHref(enquiryMessage.programme(programme.name))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 font-sans text-label uppercase text-ink underline decoration-line underline-offset-4 hover:decoration-current"
                >
                  Enquire ↗
                </a>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </ChapterFrame>
  );
}
