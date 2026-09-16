import usePageMeta from '../../lib/usePageMeta';
import ConcernFinder from './blocks/ConcernFinder';
import CredentialsRibbon from './blocks/CredentialsRibbon';
import Hero from './blocks/Hero';
import InstagramStrip from './blocks/InstagramStrip';
import PatientReviews from './blocks/PatientReviews';
import SignatureTreatments from './blocks/SignatureTreatments';
import WhyAllure from './blocks/WhyAllure';
import BlockPlaceholder from './BlockPlaceholder';

// The homepage flow from docs/REDESIGN_PLAN.md §6. Blocks 1–7 are built;
// each remaining placeholder is swapped for its real block as that module
// ships. Ids double as in-page anchors.
const BLOCKS = [
  { id: 'programmes', number: 8, act: 'Consider', module: 8, name: 'Signature programmes', purpose: 'Structured courses with what is included and the course price.' },
  { id: 'skincare', number: 9, act: 'Consider', module: 8, tone: 'stone', name: 'Clinical skincare', purpose: 'Kojivit Ultra and the consultation-led prescription skincare journey.' },
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
      {BLOCKS.map((block) => (
        <BlockPlaceholder key={block.id} {...block} />
      ))}
    </>
  );
}
