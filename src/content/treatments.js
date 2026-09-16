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
