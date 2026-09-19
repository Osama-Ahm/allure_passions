import { clinic } from '@/content/clinic';

/**
 * The foot of the page, inside the night of the Visit chapter. Everything here
 * reads from content/clinic.ts; the compliance line is the clinic's standing
 * statement and appears on every page.
 *
 * Kept low: two hairline rows, the name and social links, then the
 * compliance line with the copyright beside it on wide screens.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto pt-16">
      <div className="flex flex-col gap-5 border-t border-line py-7 md:flex-row md:items-end md:justify-between md:gap-8">
        <div>
          <p className="font-serif text-xl uppercase tracking-[0.22em]">{clinic.name}</p>
          <p className="mt-1.5 font-sans text-label uppercase text-ink-muted">{clinic.credentialsLine}</p>
        </div>
        <ul className="flex gap-6 font-sans text-label uppercase">
          {clinic.social.map((channel) => (
            <li key={channel.id}>
              <a
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-line underline-offset-4 hover:decoration-current"
              >
                {channel.label} {channel.handle} ↗
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-3 border-t border-line py-6 font-sans text-xs leading-relaxed text-ink-muted lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <p className="max-w-3xl">
          Treatments are carried out following a consultation and suitability assessment.
          Individual results vary and no outcome can be guaranteed. Prescription skincare is
          supplied only after a medical consultation and a clinical decision that it is suitable
          for you.
        </p>
        <p className="shrink-0">
          &copy; {year} {clinic.legalName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
