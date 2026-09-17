/**
 * Legal pages (plan §7.9). Each page is a list of sections, so the clinic's own
 * wording drops straight in: replace `sections` and delete `pending`.
 *
 * `pending` is the holding notice shown while the document is being prepared
 * (§11.10). The headings below are the sections a UK clinic's privacy notice
 * and terms would normally carry, left for the clinic's own copy to fill.
 */
const PRIVACY_OUTLINE = [
  'Who we are and how to contact us',
  'What information we collect',
  'Health information sent by WhatsApp or email',
  'What we use it for, and our lawful basis',
  'Who we share it with',
  'How long we keep it',
  'Your rights, and how to exercise them',
  'Cookies and analytics',
  'How to complain',
];

const TERMS_OUTLINE = [
  'Who these terms are between',
  'Consultations and suitability',
  'Treatment courses and programmes',
  'Prices and payment',
  'Appointments, cancellations and missed appointments',
  'Aftercare and results',
  'Prescription medicines',
  'Complaints procedure',
  'Liability and governing law',
];

export const legalPages = {
  privacy: {
    title: 'Privacy notice',
    description: 'How Allure Passions UK handles the personal and health information you share with the clinic.',
    pending:
      'Our full privacy notice is being prepared and will be published before the site goes live. It will explain what we collect, how we use it, how long we keep it and your rights — including information you send us by WhatsApp or email.',
    outline: PRIVACY_OUTLINE,
    sections: [],
  },
  terms: {
    title: 'Terms',
    description: 'The terms that apply to treatments, programmes and purchases at Allure Passions UK.',
    pending:
      'Our terms are being prepared and will be published before the site goes live. They will cover consultations, treatment courses and programmes, payment, cancellations and our complaints procedure.',
    outline: TERMS_OUTLINE,
    sections: [],
  },
};
