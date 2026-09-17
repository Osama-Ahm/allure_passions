import { addressLines, clinic } from '@/content/clinic';
import { ConsultationButton } from '@/components/ui/ConsultationButton';

/**
 * The closing invitation and the clinic's own details. One clinic, one address:
 * everything here reads from content/clinic.ts.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="visit"
      className="bg-sanctuary-pearl px-6 py-20 md:px-8 md:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <span className="mb-3 block font-sans text-xs uppercase tracking-[0.3em] text-sanctuary-verde">
            The next step is a conversation
          </span>
          <h2 className="mx-auto mb-6 max-w-2xl font-serif text-3xl font-light leading-tight text-sanctuary-charcoal md:text-4xl">
            Request a consultation at {clinic.address.street}
          </h2>
          <ConsultationButton className="bg-sanctuary-verde px-8 py-4 text-white hover:bg-sanctuary-verde-deep">
            Request a consultation
          </ConsultationButton>
        </div>

        <div className="grid grid-cols-1 gap-10 border-t border-sanctuary-stone pt-12 font-sans text-sm sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 font-serif text-lg uppercase tracking-widest text-sanctuary-charcoal">
              {clinic.name}
            </h3>
            <p className="text-xs uppercase tracking-widest text-sanctuary-verde">
              {clinic.credentialsLine}
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-xs uppercase tracking-widest text-sanctuary-verde">Visit</h4>
            <address className="not-italic leading-relaxed text-sanctuary-charcoal">
              {addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <p className="mt-2 text-xs text-sanctuary-muted">
              Nearest stations: {clinic.stations.join(' and ')}
            </p>
            <a
              href={clinic.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-xs uppercase tracking-widest text-sanctuary-verde underline decoration-sanctuary-verde/40 underline-offset-4"
            >
              Directions
            </a>
          </div>

          <div>
            <h4 className="mb-3 text-xs uppercase tracking-widest text-sanctuary-verde">Contact</h4>
            <ul className="space-y-2 text-sanctuary-charcoal">
              <li>
                <a className="hover:text-sanctuary-verde" href={'tel:' + clinic.phone.dial}>
                  {clinic.phone.display}
                </a>
              </li>
              <li>
                <a className="hover:text-sanctuary-verde" href={'mailto:' + clinic.email}>
                  {clinic.email}
                </a>
              </li>
              {clinic.social.map((channel) => (
                <li key={channel.id}>
                  <a
                    className="hover:text-sanctuary-verde"
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {channel.handle}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-xs uppercase tracking-widest text-sanctuary-verde">Hours</h4>
            <dl className="space-y-2 text-sanctuary-charcoal">
              {clinic.hours.map((entry) => (
                <div key={entry.days}>
                  <dt className="text-sanctuary-muted">{entry.days}</dt>
                  <dd>{entry.time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-12 border-t border-sanctuary-stone pt-8 font-sans text-xs leading-relaxed text-sanctuary-muted">
          <p className="mb-3 max-w-3xl">
            Treatments are carried out following a consultation and suitability assessment.
            Individual results vary and no outcome can be guaranteed. Prescription skincare is
            supplied only after a medical consultation and a clinical decision that it is suitable
            for you.
          </p>
          <p>
            &copy; {year} {clinic.legalName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
