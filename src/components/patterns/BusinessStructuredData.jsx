import { addressLines, clinic } from '../../content/clinic';

/**
 * Business structured data (plan §9). Emitted once from the layout, so search
 * engines get the clinic's real details on every page. Only facts we hold:
 * no rating, because no review provider is connected (§8.11).
 */
export default function BusinessStructuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: clinic.legalName,
    alternateName: clinic.name,
    url: typeof window === 'undefined' ? undefined : window.location.origin,
    telephone: clinic.phone.dial,
    email: clinic.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: clinic.address.street,
      addressLocality: clinic.address.city,
      addressRegion: clinic.address.area,
      postalCode: clinic.address.postcode,
      addressCountry: 'GB',
    },
    hasMap: clinic.directionsUrl,
    sameAs: clinic.social.map((channel) => channel.href),
    description: `Practitioner-led aesthetic clinic at ${addressLines.join(', ')}, offering non-invasive treatment for skin, body and wellbeing.`,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:30',
        closes: '19:30',
      },
    ],
  };

  // eslint-disable-next-line react/no-danger
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
