/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sanctuary: {
          alabaster: '#F9F6F0',   // Primary canvas background
          pearl: '#F2EDE4',       // Card surfaces & overlays
          stone: '#E8E1D5',       // Architectural dividers & borders
          gold: {
            light: '#E5C992',     // Accent highlight
            DEFAULT: '#C5A880',   // Champagne gold primary
            deep: '#9E7E56',      // Shaded bronze
          },
          charcoal: '#1A1817',    // Primary high-contrast text
          muted: '#6B665F',       // Secondary editorial body copy
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-jakarta)', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
