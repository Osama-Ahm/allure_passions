import Image from 'next/image';
import { clinic } from '@/content/clinic';
import { ConsultationButton } from '@/components/ui/ConsultationButton';

/**
 * The fixed bar over the walkthrough. Server-rendered; only the enquiry button
 * inside it is client code.
 *
 * The bar is dark because the monogram is: the clinic's mark is champagne gold,
 * which sits at roughly 2:1 on alabaster. On charcoal it reads the way the
 * brand's own icon presents it, and the bar then stays legible over both the
 * light walkthrough and the dark credentials section below it.
 */
export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-sanctuary-gold/20 bg-sanctuary-charcoal/90 px-5 py-3 backdrop-blur-md md:px-8 md:py-4">
      <a href="#chapter-arrival" className="flex items-center gap-3 md:gap-4">
        <Image
          src="/assets/brand/ap-monogram.png"
          alt=""
          width={195}
          height={240}
          priority
          className="h-8 w-auto md:h-10"
        />
        <span className="sr-only">{clinic.legalName} — back to the top</span>
        <span
          aria-hidden="true"
          className="whitespace-nowrap font-serif text-[15px] font-light uppercase tracking-[0.1em] text-sanctuary-alabaster sm:text-lg sm:tracking-[0.2em] md:text-xl md:tracking-widest"
        >
          {clinic.name}
        </span>
      </a>

      <div className="flex shrink-0 items-center gap-5 pl-4">
        <a
          href={'tel:' + clinic.phone.dial}
          className="hidden font-sans text-xs uppercase tracking-widest text-sanctuary-alabaster/60 transition-colors hover:text-sanctuary-gold-light sm:block"
        >
          {clinic.phone.display}
        </a>
        {/* The full label wraps to two lines at phone width and crowds the
            wordmark, so small screens get the short form. */}
        <ConsultationButton
          variant="outline"
          className="whitespace-nowrap border-sanctuary-gold px-5 py-2.5 text-sanctuary-alabaster hover:bg-sanctuary-gold hover:text-sanctuary-charcoal"
        >
          <span className="sm:hidden">Enquire</span>
          <span className="hidden sm:inline">Request consultation</span>
        </ConsultationButton>
      </div>
    </header>
  );
}
