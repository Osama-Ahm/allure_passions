import { whatsappHref } from '@/content/contact';
import { faqs } from '@/content/faqs';
import { homeFaqIds } from '@/content/home';
import { faq } from '@/content/story';
import { ChapterFrame } from '@/components/story/ChapterFrame';

const homeFaqs = homeFaqIds
  .map((id) => faqs.find((entry) => entry.id === id))
  .filter((entry): entry is (typeof faqs)[number] => Boolean(entry));

/**
 * Chapter 10 · FAQ. The jar and the bottle rest together in the margin below
 * the heading. One answer open at a time, and the FAQPage structured data is
 * built from the same list, so the markup and the copy can never drift apart.
 */
export function FaqChapter() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homeFaqs.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: { '@type': 'Answer', text: entry.answer },
    })),
  };

  return (
    <ChapterFrame id="faq" labelledBy="faq-title">
      <div className="grid gap-12 px-5 pb-[42svh] pt-28 md:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] md:gap-20 md:px-10 md:pt-[18svh]">
        <div>
          <div className="md:sticky md:top-32">
            <p className="eyebrow">{faq.eyebrow}</p>
            <h2 id="faq-title" data-reveal className="mt-5 font-serif text-display-lg font-light">
              {faq.title}
            </h2>
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-full border border-ink/30 px-6 py-3.5 font-sans text-label uppercase transition-colors duration-300 hover:bg-ink hover:text-paper"
            >
              {faq.ask} ↗
            </a>
          </div>
        </div>

        <div className="border-t border-line">
          {homeFaqs.map((entry) => (
            <details key={entry.id} name="faq" className="group border-b border-line">
              <summary className="flex cursor-pointer items-center justify-between gap-8 py-6 font-serif text-2xl font-light transition-colors hover:text-accent">
                {entry.question}
                <span
                  aria-hidden="true"
                  className="relative h-3 w-3 shrink-0 before:absolute before:inset-x-0 before:top-1/2 before:h-px before:bg-current after:absolute after:inset-y-0 after:left-1/2 after:w-px after:bg-current after:transition-transform after:duration-300 group-open:after:scale-y-0"
                />
              </summary>
              <p className="max-w-[40rem] pb-7 font-sans text-[15px] leading-relaxed text-ink-muted">{entry.answer}</p>
            </details>
          ))}
        </div>
      </div>

      <script
        type="application/ld+json"
        // The data is built from our own content module above, not user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />
    </ChapterFrame>
  );
}
