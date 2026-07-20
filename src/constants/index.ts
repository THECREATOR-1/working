export const SITE = {
  name: 'Axiom Studio',
  url: 'https://axiom.studio',
  developer: 'Augustine Amos A',
  title: 'Full Stack Web Developer & Digital Experience Designer',
  email: 'hello@axiom.studio',
} as const;

export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
] as const;

export const ROTATING_SUBTITLES = [
  'Crafting Premium Digital Experiences',
  'Building Modern Interactive Websites',
  'Transforming Ideas into Beautiful Products',
  'High Performance Web Solutions',
];

export const LOADING_MESSAGES = [
  'Calibrating pixels',
  'Tuning motion curves',
  'Composing layers',
  'Optimizing frames',
  'Preparing the experience',
];

export const COLORS = {
  bgPrimary: '#050505',
  bgSecondary: '#101010',
  cardBg: 'rgba(255,255,255,0.05)',
  glassBorder: 'rgba(255,255,255,0.08)',
  textPrimary: '#FFFFFF',
  textSecondary: '#BEBEBE',
  accent: '#6D5DFB',
  accentCyan: '#00D4FF',
  accentOrange: '#FF6600',
} as const;
