import usePageMeta from '../../lib/usePageMeta';
import BlockPlaceholder from './BlockPlaceholder';

// The homepage flow from docs/REDESIGN_PLAN.md §6. Each placeholder is swapped
// for its real block as that module ships; ids double as in-page anchors.
const BLOCKS = [
  { id: 'hero', number: 1, act: 'Discover', module: 3, tone: 'night', size: 'hero', name: 'Hero', purpose: 'Who, what and where in five seconds, with two starting points: a concern or a treatment.' },
  { id: 'credentials', number: 2, act: 'Discover', module: 3, name: 'Credentials ribbon', purpose: 'GHP award, JCCP registration, Level 6 qualification and the Google rating at a glance.' },
  { id: 'concerns', number: 3, act: 'Discover', module: 4, name: 'Concern finder', purpose: 'What would you like to improve? Choose a concern and see the treatments that may help.' },
  { id: 'treatments', number: 4, act: 'Discover', module: 5, tone: 'stone', name: 'Signature treatments', purpose: 'The six flagship technologies as a numbered index, each linking to its page.' },
  { id: 'why-allure', number: 5, act: 'Trust', module: 6, name: 'Why Allure', purpose: 'Welcome to the clinic, expert credentials, awards and press, in one place.' },
  { id: 'reviews', number: 6, act: 'Trust', module: 7, tone: 'stone', name: 'Patient reviews', purpose: 'Genuine Google reviews with the live rating.' },
  { id: 'instagram', number: 7, act: 'Trust', module: 7, name: 'Instagram', purpose: 'A contained strip of recent posts from @allurepassionsuk.' },
  { id: 'programmes', number: 8, act: 'Consider', module: 8, name: 'Signature programmes', purpose: 'Structured courses with what is included and the course price.' },
  { id: 'skincare', number: 9, act: 'Consider', module: 8, tone: 'stone', name: 'Clinical skincare', purpose: 'Kojivit Ultra and the consultation-led prescription skincare journey.' },
  { id: 'faq', number: 10, act: 'Consider', module: 9, name: 'FAQ', purpose: 'The questions patients ask before getting in touch.' },
  { id: 'begin', number: 11, act: 'Begin', module: 9, tone: 'stone', name: 'Begin with a consultation', purpose: 'What happens next, in four steps, with every way to get in touch.' },
];

export default function HomePage() {
  usePageMeta();

  return (
    <>
      {BLOCKS.map((block) => (
        <BlockPlaceholder key={block.id} {...block} />
      ))}
    </>
  );
}
