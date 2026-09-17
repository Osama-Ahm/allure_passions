/**
 * DEVELOPMENT FIXTURES — never rendered in a production build (plan §9, R3).
 *
 * The review text says outright what it is, so nothing here could be mistaken
 * for a patient's words in a screenshot. Genuine reviews only ever arrive live
 * from a connected provider (§8.11, DMCC Act).
 */
export const reviewsFixture = {
  configured: true,
  rating: 5.0,
  count: 68,
  url: 'https://www.google.com/maps',
  reviews: [
    {
      id: 'fixture-1',
      author: 'Sample review',
      date: 'Development fixture',
      treatment: 'Morpheus8',
      text: 'Sample text, shown only in development so the carousel can be reviewed. Genuine Google reviews replace this once a provider is connected.',
    },
    {
      id: 'fixture-2',
      author: 'Sample review',
      date: 'Development fixture',
      treatment: 'PicoWay',
      text: 'A second sample of a different length, so the cards can be checked where one review runs longer than the rest and the track has to cope.',
    },
    {
      id: 'fixture-3',
      author: 'Sample review',
      date: 'Development fixture',
      treatment: null,
      text: 'A third sample with no treatment named, to check the card without that line.',
    },
    {
      id: 'fixture-4',
      author: 'Sample review',
      date: 'Development fixture',
      treatment: 'Emsculpt Neo',
      text: 'A fourth sample, so the previous and next controls have somewhere to go.',
    },
  ],
};

/** Tiles drawn in place rather than pulled from the asset library, so the
 *  fixture needs no images and cannot be mistaken for the real feed. */
const tile = (label) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="#EAE3D6"/><text x="200" y="196" text-anchor="middle" font-family="sans-serif" font-size="22" fill="#6F6A62">${label}</text><text x="200" y="228" text-anchor="middle" font-family="sans-serif" font-size="16" fill="#6F6A62">fixture</text></svg>`,
  )}`;

/* Built on call, not at module scope: a computed value here would survive
   tree-shaking and ship the fixture strings in the production bundle. */
export const instagramFixture = () => ({
  configured: true,
  handle: '@allurepassionsuk',
  url: 'https://www.instagram.com/allurepassionsuk/',
  posts: [1, 2, 3, 4, 5, 6].map((index) => ({
    id: `fixture-${index}`,
    image: tile(`Tile ${index}`),
    caption: `Development fixture ${index}`,
    isReel: index % 3 === 1,
    href: 'https://www.instagram.com/allurepassionsuk/',
  })),
});
