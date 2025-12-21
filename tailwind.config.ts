import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FDFCF0',
          50: '#FDFCF0',
          100: '#FBF9E0',
          200: '#F7F5C0',
        },
        text: {
          DEFAULT: '#3A3A3A',
          light: '#6B6B6B',
          dark: '#2A2A2A',
        },
        accent: {
          DEFAULT: '#D4A574',
          light: '#E8C9A0',
          dark: '#B8905A',
        },
        sand: {
          DEFAULT: '#E8DCC6',
          light: '#F2E8D8',
          dark: '#D4C4A8',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

