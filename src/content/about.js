/**
 * About the clinic (plan §7.4).
 *
 * Two things are deliberately absent. There is **no practitioner name or
 * portrait**: none has been supplied (§11.3), and the `practitioner_portrait.jpg`
 * in this repository shows someone in another clinic's branded uniform, so it
 * cannot be published here. Qualifications are stated exactly and never as an
 * implied medical title (D6, §8.11).
 */
export const story = [
  {
    id: 'clinic',
    title: 'The clinic',
    body: 'Allure Passions UK is a practitioner-led aesthetic clinic working across skin health, body contouring and wellbeing. We chose a small number of technologies and learned them properly, rather than buying a long menu and hoping something on it would suit you.',
  },
  {
    id: 'place',
    title: 'Fitzrovia',
    body: 'We are on Cleveland Street, a few minutes from Warren Street and Great Portland Street. The clinic is quiet and private, and consultations are given the time they need rather than a slot.',
  },
  {
    id: 'approach',
    title: 'Our approach',
    body: 'Every plan begins with an assessment and a conversation. We will tell you when a treatment will not do what you are hoping for, when a course is the honest answer rather than a single session, and when something outside what we offer would suit you better.',
  },
];

export const practitioner = {
  title: 'Your practitioner',
  body: 'Treatment here is practitioner-led. Your practitioner holds a Level 6 qualification in aesthetic practice — the advanced level, covering skin science, laser physics and dermal therapy — and is registered with the Joint Council for Cosmetic Practitioners, the UK register for cosmetic practitioners who meet its standards for training, insurance and patient safety. Each device in the clinic is used by a practitioner the manufacturer has trained on it.',
};

export const standards = [
  {
    id: 'consultation',
    title: 'Consultation first',
    body: 'No treatment without an assessment and a plan you have agreed, including what it costs and how many sessions it is likely to take.',
  },
  {
    id: 'hygiene',
    title: 'Hygiene & safety',
    body: 'Single-use consumables where single use is right, sterile technique, and equipment serviced and calibrated on schedule.',
  },
  {
    id: 'aftercare',
    title: 'Aftercare',
    body: 'Written aftercare for every treatment, and a point of contact if anything concerns you once you have left.',
  },
  {
    id: 'complaints',
    title: 'If something goes wrong',
    body: 'Tell us. We will look into it, respond in writing and put right what we can.',
  },
];
