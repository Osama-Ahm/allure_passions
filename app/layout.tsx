import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import { clinic, addressText } from '@/content/clinic';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600'],
  // Italic carries the emphasis in the display type ("skin, body", "learned properly.").
  style: ['normal', 'italic'],
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${clinic.legalName} — Advanced Skin, Body & Wellness, London`,
    template: `%s — ${clinic.name}`,
  },
  description:
    'JCCP-registered advanced aesthetic clinic in Fitzrovia, London. PicoWay, ADVATx, Morpheus8, Sofwave, Emsculpt Neo and Emerald laser, with every plan agreed at consultation.',
  applicationName: clinic.name,
  authors: [{ name: clinic.legalName }],
  keywords: [
    'aesthetic clinic London',
    'JCCP registered practitioner',
    'PicoWay London',
    'Morpheus8 London',
    'Sofwave skin tightening',
    'Emsculpt Neo body contouring',
    'pigmentation treatment London',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: clinic.legalName,
    title: `${clinic.legalName} — Advanced Skin, Body & Wellness`,
    description: `Advanced, non-invasive skin and body treatments in Fitzrovia, London. ${addressText}.`,
  },
  icons: {
    icon: [
      { url: '/assets/brand/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/assets/brand/favicon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/assets/brand/favicon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/assets/brand/apple-touch-icon.png',
  },
  // The production domain is not confirmed yet, so no metadataBase or sitemap
  // is declared; both land in the launch pass once the domain is known.
};

export const viewport: Viewport = {
  themeColor: '#F9F6F0',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${cormorant.variable} ${jakarta.variable}`}>
      <body className="bg-sanctuary-alabaster text-sanctuary-charcoal antialiased selection:bg-sanctuary-gold selection:text-white">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100] focus:rounded-full focus:bg-sanctuary-charcoal focus:px-5 focus:py-3 focus:font-sans focus:text-xs focus:uppercase focus:tracking-widest focus:text-sanctuary-alabaster"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
