import usePageMeta from '../../lib/usePageMeta';
import BeginConsultation from '../../components/patterns/BeginConsultation';
import ClinicalSkincare from './blocks/ClinicalSkincare';
import ConcernFinder from './blocks/ConcernFinder';
import CredentialsRibbon from './blocks/CredentialsRibbon';
import Faq from './blocks/Faq';
import Hero from './blocks/Hero';
import InstagramStrip from './blocks/InstagramStrip';
import PatientReviews from './blocks/PatientReviews';
import Programmes from './blocks/Programmes';
import SignatureTreatments from './blocks/SignatureTreatments';
import WhyAllure from './blocks/WhyAllure';

/**
 * The homepage flow from docs/REDESIGN_PLAN.md §6: four acts, twelve blocks,
 * with the footer as Block 12. Block ids double as in-page anchors. The reviews
 * and Instagram blocks render only when their provider is connected.
 */
export default function HomePage() {
  usePageMeta();

  return (
    <>
      <Hero />
      <CredentialsRibbon />
      <ConcernFinder />
      <SignatureTreatments />
      <WhyAllure />
      <PatientReviews />
      <InstagramStrip />
      <Programmes />
      <ClinicalSkincare />
      <Faq />
      <BeginConsultation />
    </>
  );
}
