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
          charcoal: '#1A1817',    // Primary high-contrast text, and the night chapters
          muted: '#6B665F',       // Secondary editorial body copy

          // The accent family. Deep botanical green carries the treatment
          // sections and gives the page one dark ground to break up the cream;
          // 'deep' is dark enough to sit type on at AAA, 'light' reads as a
          // muted sage against it.
          verde: {
            light: '#9CB6A7',
            DEFAULT: '#3A5A4C',
            deep: '#1C3229',
          },

          // A third tone, used only to tell the three treatment families apart.
          clay: {
            light: '#CBA595',
            DEFAULT: '#A8766B',
            deep: '#7B5348',
          },
        },

        // Theme-aware roles. Each chapter sets data-theme="light" or "dark" and
        // globals.css points these at the right values, so one set of classes
        // reads correctly on cream and on night.
        ink: {
          DEFAULT: 'rgb(var(--ink) / <alpha-value>)',
          muted: 'rgb(var(--ink-muted) / <alpha-value>)',
        },
        // The page behind the ink: text on a solid ink button, whichever the theme.
        paper: 'rgb(var(--paper) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        // Small tracked caps and other text accents: clay on cream, gold on night,
        // both above 4.5:1.
        accent: 'rgb(var(--accent) / <alpha-value>)',
        // Decorative gold for hairlines, nodes and outlines. Never body text.
        gild: 'rgb(var(--gild) / <alpha-value>)',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-jakarta)', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        // Display sizes scale with the viewport. The giant words sit behind the
        // bottle, so they are set to fill a line, not to be read quickly.
        'display-giant': ['clamp(3.25rem, 9.2vw, 10.5rem)', { lineHeight: '0.9', letterSpacing: '-0.025em' }],
        'display-xl': ['clamp(3.1rem, 6.6vw, 7.5rem)', { lineHeight: '0.96', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.4rem, 4.4vw, 4.6rem)', { lineHeight: '1.02', letterSpacing: '-0.015em' }],
        'display-md': ['clamp(1.85rem, 2.8vw, 2.9rem)', { lineHeight: '1.08', letterSpacing: '-0.01em' }],
        'display-sm': ['clamp(1.4rem, 1.9vw, 1.9rem)', { lineHeight: '1.15' }],
        // The small tracked caps that label everything: eyebrows, nav, specs.
        label: ['0.6875rem', { lineHeight: '1.45', letterSpacing: '0.22em' }],
      },
      keyframes: {
        // The line under "Scroll to continue", drawn downwards on a loop.
        cue: {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
          '45%': { transform: 'scaleY(1)', transformOrigin: 'top' },
          '55%': { transform: 'scaleY(1)', transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'rise-in': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        cue: 'cue 2.4s cubic-bezier(0.65, 0, 0.35, 1) infinite',
        'fade-in': 'fade-in 0.4s ease-out both',
        'rise-in': 'rise-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
