import { concernGroups } from '@/content/concerns';
import { enquiryMessage, whatsappHref } from '@/content/contact';
import { concerns } from '@/content/story';
import { signatureTreatments, treatmentOptions } from '@/content/treatments';
import { ChapterFrame } from '@/components/story/ChapterFrame';

const signatureSlugs = new Set(signatureTreatments.map((treatment) => treatment.slug));

/**
 * Chapter 3 · Concerns. The drop from the bottle lands and splits into six
 * droplets, one per concern group, in an arc on the right. As each group
 * scrolls through the middle of the screen (data-focus), its droplet lifts
 * and lights.
 *
 * One concern opens at a time (details name="concern"), with the treatments
 * that may help and a direct way to ask about it.
 */
export function ConcernsChapter() {
  return (
    <ChapterFrame
      id="concerns"
      labelledBy="concerns-title"
    >
      <div className="px-5 pb-[42svh] md:px-10">
        <header className="flex min-h-[70svh] flex-col justify-end pb-16 md:max-w-[34rem]">
          <p className="eyebrow">{concerns.eyebrow}</p>
          <h2 id="concerns-title" data-reveal className="mt-5 font-serif text-display-lg font-light">
            {concerns.title}
          </h2>
          <p className="mt-6 max-w-[28rem] font-sans text-[15px] leading-relaxed text-ink-muted">{concerns.lede}</p>
        </header>

        <ol className="md:max-w-[34rem]">
          {concernGroups.map((group, index) => (
            <li
              key={group.id}
              id={`concern-group-${group.id}`}
              data-concern-group={group.id}
              data-focus
              className="flex flex-col justify-center border-t border-line py-12 md:min-h-[46svh]"
            >
              <span className="font-sans text-label uppercase text-ink-muted">
                0{index + 1} / 0{concernGroups.length}
              </span>
              <h3 className="mt-4 font-serif text-display-md font-light">{group.name}</h3>

              <div className="mt-7 border-t border-line">
                {group.concerns.map((concern) => (
                  <details key={concern.id} id={`concern-${concern.id}`} name="concern" className="group border-b border-line">
                    <summary className="flex cursor-pointer items-center justify-between gap-6 py-4 font-sans text-[15px] transition-colors hover:text-accent">
                      {concern.name}
                      <span
                        aria-hidden="true"
                        className="relative h-3 w-3 shrink-0 before:absolute before:inset-x-0 before:top-1/2 before:h-px before:bg-current after:absolute after:inset-y-0 after:left-1/2 after:w-px after:bg-current after:transition-transform after:duration-300 group-open:after:scale-y-0"
                      />
                    </summary>

                    <div className="pb-7">
                      <p className="font-sans text-sm leading-relaxed text-ink-muted">{concern.description}</p>

                      <p className="mt-5 font-sans text-label uppercase text-accent">May help</p>
                      <ul className="mt-2 space-y-2.5">
                        {concern.treatments.map((match) => {
                          const option = treatmentOptions[match.id as keyof typeof treatmentOptions];
                          return (
                            <li key={match.id} className="font-sans text-sm leading-snug">
                              <span className="font-serif text-lg">{option?.name ?? match.id}</span>
                              <span className="text-ink-muted"> — {match.reason}</span>
                              {signatureSlugs.has(match.id) ? (
                                <a
                                  href={`#tech-${match.id}`}
                                  className="ml-2 whitespace-nowrap font-sans text-label uppercase text-accent underline decoration-line underline-offset-4 hover:decoration-current"
                                >
                                  How it works ↓
                                </a>
                              ) : null}
                            </li>
                          );
                        })}
                      </ul>

                      <a
                        href={whatsappHref(enquiryMessage.concern(concern.name.toLowerCase()))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex items-center gap-2 font-sans text-label uppercase text-ink underline decoration-line underline-offset-4 hover:decoration-current"
                      >
                        Ask about {concern.name.toLowerCase()} on WhatsApp ↗
                      </a>
                    </div>
                  </details>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </ChapterFrame>
  );
}
