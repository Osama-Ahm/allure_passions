import { ExpertCare } from '@/components/sections/ExpertCare';
import { LandingExperience } from '@/components/sections/LandingExperience';
import { SiteFooter } from '@/components/sections/SiteFooter';
import { SiteHeader } from '@/components/sections/SiteHeader';
import { TreatmentCollection } from '@/components/sections/TreatmentCollection';
import { Walkthrough } from '@/components/sections/Walkthrough';
import { ConsultationProvider } from '@/components/ui/ConsultationProvider';

/**
 * The homepage.
 *
 * On a capable browser this is a walk down a gallery hallway, with each
 * section of the site hung in a lit alcove on alternating walls. Everywhere
 * else — no WebGL, reduced motion, and every search engine — it is the flat
 * page below, which carries exactly the same content in ordinary HTML.
 */
export default function HomePage() {
  return (
    <ConsultationProvider>
      <main className="relative bg-sanctuary-alabaster">
        <SiteHeader />

        <LandingExperience>
          <Walkthrough />
          <div className="relative z-20 border-t border-sanctuary-stone bg-sanctuary-alabaster shadow-[0_-20px_50px_rgba(0,0,0,0.03)]">
            <TreatmentCollection />
            <ExpertCare />
            <SiteFooter />
          </div>
        </LandingExperience>
      </main>
    </ConsultationProvider>
  );
}
