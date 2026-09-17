import { signatureTreatments, treatmentPath } from './treatments';

/**
 * The site's navigation model (plan §5.2 and §6, Block 12). Header and footer
 * both read from here, so a route only has to change in one place.
 */

/** Links beside the Treatments menu in the header. */
export const primaryLinks = [
  { label: 'Skincare', to: '/skincare' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'About', to: '/about' },
];

/** The header's main call to action (§5.3). */
export const consultationCta = { label: 'Request a consultation', shortLabel: 'Enquire', to: '/contact' };

export const footerColumns = [
  {
    id: 'treatments',
    title: 'Treatments',
    links: signatureTreatments.map(({ slug, name }) => ({ label: name, to: treatmentPath(slug) })),
  },
  {
    id: 'clinic',
    title: 'Clinic',
    links: [
      { label: 'About the clinic', to: '/about' },
      { label: 'All treatments', to: '/treatments' },
      { label: 'Pricing', to: '/pricing' },
      { label: 'Request a consultation', to: '/contact' },
    ],
  },
  {
    id: 'skincare',
    title: 'Skincare',
    links: [
      { label: 'Clinical skincare', to: '/skincare' },
      { label: 'Kojivit Ultra', to: '/skincare/kojivit-ultra' },
      { label: 'Prescription skincare', to: '/skincare/tretinoin' },
    ],
  },
];

export const legalLinks = [
  { label: 'Privacy notice', to: '/privacy' },
  { label: 'Terms', to: '/terms' },
];
