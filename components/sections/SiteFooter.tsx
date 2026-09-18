import { clinic } from '@/content/clinic';

/**
 * The foot of the page, inside the night of the Visit chapter. Everything here
 * reads from content/clinic.ts; the compliance line is the clinic's standing
 * statement and appears on every page.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto pt-24">
      <div className="grid gap-8 border-t border-line py-10 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="font-serif text-xl uppercase tracking-[0.22em]">{clinic.name}</p>
          <p className="mt-2 font-sans text-label uppercase text-ink-muted">{clinic.credentialsLine}</p>
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

      <div className="border-t border-line py-8 font-sans text-xs leading-relaxed text-ink-muted">
        <p className="max-w-3xl">
          Treatments are carried out following a consultation and suitability assessment.
          Individual results vary and no outcome can be guaranteed. Prescription skincare is
          supplied only after a medical consultation and a clinical decision that it is suitable
          for you.
        </p>
        <p className="mt-3">
          &copy; {year} {clinic.legalName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
