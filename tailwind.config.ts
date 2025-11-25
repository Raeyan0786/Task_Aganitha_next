import type { Config } from "tailwindcss";
const colors = require('tailwindcss/colors')
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1400px',
      xs: '320px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
      },
      screens: {
        // sm: '100%',
        // md: '540px',
        // lg: '720px',
        xs: '100%',
        sm: '540px',
        md: '720px',
        lg: '960px',
        xl: '1140px',
        '2xl': '1320px',
      },
    },
    fontFamily: {
      sans: ['var(--font-opensans)'],
    },
    colors: {
      brand: {
        DEFAULT: '#FF2800',
      },
      graniteGray: '#696767',
      footerBackground: '#FFF3F0',
      scarlet: '#ff280017',
      crimson: '#E50F0F',
      caramel: '#FFD88D',
      palePink: '#F8D7DA',
      bloodOrange: '#D70014',
      lightGray: '#D6CFCF',
      cultured: '#F6F6F6',
      islamicGreen: '#029A11',
      magicMint: '#B6FFBD',
      mistyRose: '#FDE3DE',
      doctorPale: '#F9F9F9',
      broadGray: '#EBEAEA',
      brandColor: '#FFF2F0',
      successBackground: '#B6FFBD',
      successText: '#029A11',
      skeletonColor: '#00000013',
      ...colors
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        'banner-xl': "url('/images/po-banner-space1.webp')",
        'banner-mobile': "url('/images/mobile-banner.webp')",
        'banner-tab': "url('/images/banner-mobile.webp')",
        'banner-xxl': "url('/images/po-banner-space2.webp')",
        'partner-bg': "url('/images/partnerbg.svg')",
        'eligibility-bg': "url('/images/eligibility_bg.svg')",
        'eligibility-mobile': "url('/images/eligibility_mobile.svg')",
        // 'banner-xxxl': "url('/images/po-banner-space3.webp')",
      },
    },
  },
  plugins: [],
} satisfies Config;
