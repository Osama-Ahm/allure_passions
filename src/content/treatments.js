/**
 * The six signature technologies (plan §5.1, §6 Block 4). Slugs are the
 * `/treatments/:slug` routes. Modules 5 and 10 add summaries, concern tags and
 * the clinically checked facts each detail page needs.
 */
export const signatureTreatments = [
  { slug: 'picoway', name: 'PicoWay', type: 'Picosecond laser' },
  { slug: 'advatx', name: 'ADVATx', type: 'Dual-wavelength laser' },
  { slug: 'morpheus8', name: 'Morpheus8', type: 'Radiofrequency microneedling' },
  { slug: 'sofwave', name: 'Sofwave', type: 'Ultrasound lifting' },
  { slug: 'emsculpt-neo', name: 'Emsculpt Neo', type: 'Muscle and fat contouring' },
  { slug: 'emerald-laser', name: 'Emerald Laser', type: 'Green laser body contouring' },
];

export const treatmentPath = (slug) => `/treatments/${slug}`;

/**
 * Everything a concern can be matched to. The six signature technologies have
 * their own pages; the rest of the menu is on the price list until Module 11
 * gives each category its own anchor. Prescription skincare is named by what it
 * is, never by the medicine (P5).
 */
export const treatmentOptions = {
  ...Object.fromEntries(
    signatureTreatments.map((treatment) => [
      treatment.slug,
      { name: treatment.name, to: treatmentPath(treatment.slug) },
    ]),
  ),
  cosmelan: { name: 'Cosmelan depigmentation protocol', to: '/pricing' },
  biorepeel: { name: 'BioRePeel', to: '/pricing' },
  exosomes: { name: 'Microneedling with exosomes', to: '/pricing' },
  hydrafacial: { name: 'HydraFacial', to: '/pricing' },
  led: { name: 'LED light therapy', to: '/pricing' },
  analysis: { name: 'Advanced clinical skin analysis', to: '/pricing' },
  prescription: { name: 'Prescription skincare consultation', to: '/skincare' },
};
