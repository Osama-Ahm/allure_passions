import { ClinicalPhilosophy } from '@/components/sections/ClinicalPhilosophy';
import { SiteFooter } from '@/components/sections/SiteFooter';
import { SiteHeader } from '@/components/sections/SiteHeader';
import { TreatmentCollection } from '@/components/sections/TreatmentCollection';
import { Walkthrough } from '@/components/sections/Walkthrough';
import { ConsultationProvider } from '@/components/ui/ConsultationProvider';

/**
 * The homepage: a scroll-scrubbed walkthrough of the clinic, then the editorial
 * sections that carry the detail.
 *
 * This stays a server component. Only the walkthrough and the enquiry are
 * client code, so the treatment copy, the credentials and the clinic's details
 * are all in the served HTML.
 */
export default function HomePage() {
  return (
    <ConsultationProvider>
      <main className="relative bg-sanctuary-alabaster">
        <SiteHeader />

        <Walkthrough />

        {/* The editorial sections rise over the pinned canvas. */}
        <div className="relative z-20 border-t border-sanctuary-stone bg-sanctuary-alabaster shadow-[0_-20px_50px_rgba(0,0,0,0.03)]">
          <TreatmentCollection />
          <ClinicalPhilosophy />
          <SiteFooter />
        </div>
      </main>
    </ConsultationProvider>
  );
}
