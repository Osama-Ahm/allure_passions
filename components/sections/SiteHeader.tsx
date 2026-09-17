import { clinic } from '@/content/clinic';
import { ConsultationButton } from '@/components/ui/ConsultationButton';

/**
 * The fixed bar over the walkthrough. Server-rendered; only the enquiry button
 * inside it is client code.
 */
export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-sanctuary-stone/50 bg-sanctuary-alabaster/40 px-5 py-4 backdrop-blur-md md:px-8 md:py-6">
      <a
        href="#chapter-arrival"
        className="font-serif text-lg font-medium uppercase tracking-[0.2em] text-sanctuary-charcoal md:text-2xl md:tracking-widest"
      >
        {clinic.name}
      </a>

      <div className="flex items-center gap-5">
        <a
          href={'tel:' + clinic.phone.dial}
          className="hidden font-sans text-xs uppercase tracking-widest text-sanctuary-muted transition-colors hover:text-sanctuary-charcoal sm:block"
        >
          {clinic.phone.display}
        </a>
        <ConsultationButton variant="outline" className="px-5 py-2.5">
          Request consultation
        </ConsultationButton>
      </div>
    </header>
  );
}
