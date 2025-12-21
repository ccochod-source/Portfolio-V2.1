export const COLORS = {
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
} as const;

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const SPACING = {
  xs: '0.5rem',
  sm: '1rem',
  md: '1.5rem',
  lg: '2rem',
  xl: '3rem',
  '2xl': '4rem',
} as const;

export const ANIMATION_DURATION = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  slower: 0.8,
} as const;

