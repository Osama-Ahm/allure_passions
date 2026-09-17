/**
 * The clinic's own details, defined once (plan §9). Anything that shows an
 * address, a phone number or opening hours reads them from here.
 * Client confirmation is still outstanding for the hours and stations (§11.8).
 */
export const clinic = {
  name: 'Allure Passions UK',
  legalName: 'Allure Passions UK Aesthetic Clinic',

  address: {
    street: '76 Cleveland Street',
    area: 'Fitzrovia',
    city: 'London',
    postcode: 'W1T 6NB',
    country: 'United Kingdom',
  },

  /** Nearest Underground stations, for the Visit column and the contact page. */
  stations: ['Warren Street', 'Great Portland Street'],

  directionsUrl: 'https://maps.google.com/?q=76+Cleveland+Street+Fitzrovia+London+W1T+6NB',

  /** International format for links; the display form is what people read. */
  phone: { display: '+44 7342 052249', dial: '+447342052249', whatsapp: '447342052249' },

  email: 'info@allurepassionsuk.com',

  hours: [
    { days: 'Monday – Saturday', time: '09:30 – 19:30' },
    { days: 'Sunday', time: 'By appointment' },
  ],

  social: [
    { id: 'instagram', label: 'Instagram', handle: '@allurepassionsuk', href: 'https://www.instagram.com/allurepassionsuk/' },
  ],

  /** The short credentials line used in the footer (§6, Block 12). */
  credentialsLine: 'JCCP registered · GHP Award 2026',

  award: {
    title: 'Best Advanced Skin & Body Aesthetics Clinic 2026 — London',
    body: 'Global Health & Pharma Global Excellence Awards',
  },
};

/** "76 Cleveland Street, Fitzrovia, London W1T 6NB" */
export const addressLines = [
  clinic.address.street,
  clinic.address.area,
  `${clinic.address.city} ${clinic.address.postcode}`,
];

export const addressText = addressLines.join(', ');
