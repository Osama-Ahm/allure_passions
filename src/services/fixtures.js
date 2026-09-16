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

export const instagramFixture = {
  configured: true,
  handle: '@allurepassionsuk',
  url: 'https://www.instagram.com/allurepassionsuk/',
  posts: [
    { id: 'fixture-1', image: '/assets/images/morpheus8_rf.png', caption: 'Morpheus8 radiofrequency microneedling', isReel: true, href: 'https://www.instagram.com/allurepassionsuk/' },
    { id: 'fixture-2', image: '/assets/images/hero_clinic_ambiance.png', caption: 'Inside the clinic', isReel: false, href: 'https://www.instagram.com/allurepassionsuk/' },
    { id: 'fixture-3', image: '/assets/images/picoway_laser.png', caption: 'PicoWay picosecond laser', isReel: true, href: 'https://www.instagram.com/allurepassionsuk/' },
    { id: 'fixture-4', image: '/assets/images/sofwave_lift.png', caption: 'Sofwave ultrasound lifting', isReel: false, href: 'https://www.instagram.com/allurepassionsuk/' },
    { id: 'fixture-5', image: '/assets/images/emsculpt_neo.png', caption: 'Emsculpt Neo body contouring', isReel: false, href: 'https://www.instagram.com/allurepassionsuk/' },
    { id: 'fixture-6', image: '/assets/images/kojivit_ultra_cream.png', caption: 'Kojivit Ultra', isReel: false, href: 'https://www.instagram.com/allurepassionsuk/' },
  ],
};
