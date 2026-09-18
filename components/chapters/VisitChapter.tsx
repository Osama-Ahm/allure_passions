import { addressLines, clinic } from '@/content/clinic';
import { emailHref, telHref, whatsappHref } from '@/content/contact';
import { visit } from '@/content/story';
import { ChapterFrame } from '@/components/story/ChapterFrame';
import { SiteFooter } from '@/components/sections/SiteFooter';
import { ConsultationButton } from '@/components/ui/ConsultationButton';

/**
 * Chapter 11 · Visit, on night. The bottle back on its plinth under a single
 * warm light on the right; how to get in touch and where to find the clinic on
 * the left. The footer closes the chapter, so the page ends in the same night.
 */
export function VisitChapter() {
  return (
    <ChapterFrame id="visit" labelledBy="visit-title">
      <div className="flex min-h-[100svh] flex-col px-5 pt-[36svh] md:px-10">
        <div className="lg:max-w-[56%]">
          <p className="eyebrow">{visit.eyebrow}</p>
          <h2 id="visit-title" className="mt-5 font-serif text-display-lg font-light">
            {visit.title}
          </h2>
          <p className="mt-6 max-w-[30rem] font-sans text-[15px] leading-relaxed text-ink-muted">{visit.lede}</p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-ink px-6 py-3.5 font-sans text-label uppercase text-paper transition-colors duration-300 hover:bg-accent"
            >
              Message on WhatsApp ↗
            </a>
            <a
              href={telHref}
              className="rounded-full border border-ink/30 px-6 py-3.5 font-sans text-label uppercase transition-colors duration-300 hover:bg-ink hover:text-paper"
            >
              Call {clinic.phone.display}
            </a>
            <a
              href={emailHref()}
              className="rounded-full border border-ink/30 px-6 py-3.5 font-sans text-label uppercase transition-colors duration-300 hover:bg-ink hover:text-paper"
            >
              Email
            </a>
            <ConsultationButton variant="outline">Request a consultation</ConsultationButton>
          </div>

          <div className="mt-16 grid gap-10 border-t border-line pt-8 sm:grid-cols-2">
            <div>
              <h3 className="font-sans text-label uppercase text-accent">Find us</h3>
              <address className="mt-3 font-serif text-2xl font-light not-italic leading-snug">
                {addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <p className="mt-3 font-sans text-xs text-ink-muted">
                Nearest stations: {clinic.stations.join(' and ')}
              </p>
              <a
                href={clinic.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block font-sans text-label uppercase underline decoration-line underline-offset-4 hover:decoration-current"
              >
                Get directions ↗
              </a>
            </div>

            <div>
              <h3 className="font-sans text-label uppercase text-accent">Opening hours</h3>
              <dl className="mt-3 space-y-3">
                {clinic.hours.map((entry) => (
                  <div key={entry.days}>
                    <dt className="font-sans text-xs text-ink-muted">{entry.days}</dt>
                    <dd className="font-serif text-2xl font-light">{entry.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        <SiteFooter />
      </div>
    </ChapterFrame>
  );
}
