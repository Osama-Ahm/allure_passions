import { clinic } from '@/content/clinic';
import { ConsultationButton } from '@/components/ui/ConsultationButton';

/**
 * The fixed bar over the walkthrough. Server-rendered; only the enquiry button
 * inside it is client code.
 */
export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-sanctuary-stone/50 bg-sanctuary-alabaster/85 px-5 py-4 backdrop-blur-md md:px-8 md:py-6">
      <a
        href="#chapter-arrival"
        className="whitespace-nowrap font-serif text-[15px] font-medium uppercase tracking-[0.1em] text-sanctuary-charcoal sm:text-lg sm:tracking-[0.2em] md:text-2xl md:tracking-widest"
      >
        {clinic.name}
      </a>

      <div className="flex shrink-0 items-center gap-5 pl-4">
        <a
          href={'tel:' + clinic.phone.dial}
          className="hidden font-sans text-xs uppercase tracking-widest text-sanctuary-muted transition-colors hover:text-sanctuary-charcoal sm:block"
        >
          {clinic.phone.display}
        </a>
        {/* The full label wraps to two lines at phone width and crowds the
            wordmark, so small screens get the short form. */}
        <ConsultationButton variant="outline" className="whitespace-nowrap px-5 py-2.5">
          <span className="sm:hidden">Enquire</span>
          <span className="hidden sm:inline">Request consultation</span>
        </ConsultationButton>
      </div>
    </header>
  );
}
