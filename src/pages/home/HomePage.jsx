import usePageMeta from '../../lib/usePageMeta';
import ClinicalSkincare from './blocks/ClinicalSkincare';
import ConcernFinder from './blocks/ConcernFinder';
import CredentialsRibbon from './blocks/CredentialsRibbon';
import Hero from './blocks/Hero';
import InstagramStrip from './blocks/InstagramStrip';
import PatientReviews from './blocks/PatientReviews';
import Programmes from './blocks/Programmes';
import SignatureTreatments from './blocks/SignatureTreatments';
import WhyAllure from './blocks/WhyAllure';
import BlockPlaceholder from './BlockPlaceholder';

// The homepage flow from docs/REDESIGN_PLAN.md §6. Blocks 1–9 are built;
// each remaining placeholder is swapped for its real block as that module
// ships. Ids double as in-page anchors.
const BLOCKS = [
  { id: 'faq', number: 10, act: 'Consider', module: 9, name: 'FAQ', purpose: 'The questions patients ask before getting in touch.' },
  { id: 'begin', number: 11, act: 'Begin', module: 9, tone: 'stone', name: 'Begin with a consultation', purpose: 'What happens next, in four steps, with every way to get in touch.' },
];

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
      {BLOCKS.map((block) => (
        <BlockPlaceholder key={block.id} {...block} />
      ))}
    </>
  );
}
