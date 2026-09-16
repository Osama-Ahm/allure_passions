/**
 * Clinical skincare (plan §6, Block 9; §7.6 and §7.7).
 *
 * Kojivit is a cosmetic product, so its claims stay cosmetic (§8.11). The
 * prescription route is described by what happens, never by the medicine's
 * name, anywhere on the homepage (D5, P5).
 */
export const kojivit = {
  name: 'Kojivit Ultra',
  summary: 'A brightening cream with kojic acid dipalmitate, arbutin and niacinamide, to help even the look of skin tone.',
  price: '£85',
  image: '/assets/images/kojivit_ultra_cream.png',
};

export const prescriptionRoute = {
  notice: 'Available only after a medical consultation.',
  steps: [
    { id: 'questionnaire', title: 'Medical questionnaire', detail: 'You tell us your history, medicines and skin goals.' },
    { id: 'review', title: 'Clinical review', detail: 'A practitioner assesses whether treatment is suitable for you.' },
    { id: 'confirmation', title: 'Written confirmation', detail: 'We confirm by email what has been agreed, and what to expect.' },
    { id: 'collection', title: 'Collection in clinic', detail: 'Payment and collection happen in person, never online.' },
  ],
};
