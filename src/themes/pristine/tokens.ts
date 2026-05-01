import { ThemeMeta, ThemeTokens } from '@/core/theme/types';

/**
 * Pristine — clean technical aesthetic. Cloned from the Markova
 * style guide: white canvas, electric-blue accent, Inter Tight, tight
 * radii, hairline borders, no warm illustration.
 */

const FONT_BODY =
  'var(--font-inter-tight), var(--font-sans), system-ui, sans-serif';
const FONT_DISPLAY =
  'var(--font-inter-tight), var(--font-sans), system-ui, sans-serif';

const light: ThemeTokens = {
  bg: '#FFFFFF',
  surface: '#FFFFFF',
  panel: '#F4F6FA',
  text: '#111928',
  muted: '#747B87',
  primary: '#111928',
  primaryContrast: '#FFFFFF',
  accent: '#3758F9',
  border: '#E8EBF0',
  fontBody: FONT_BODY,
  fontDisplay: FONT_DISPLAY,
  buttonRadius: '1.8rem',
  buttonWeight: 600,
  buttonPaddingX: '1.375rem',
  buttonPaddingY: '0.75rem',
  inputRadius: '0.75rem',
  inputPaddingX: '1rem',
  inputPaddingY: '0.75rem',
  cardRadius: '1.25rem',
  cardShadow: 'none',
};

const dark: ThemeTokens = {
  bg: '#0A0E1A',
  surface: '#111928',
  panel: '#1A2238',
  text: '#FFFFFF',
  muted: '#94A3B8',
  primary: '#3758F9',
  primaryContrast: '#FFFFFF',
  accent: '#5A75FF',
  border: '#2A3550',
  fontBody: FONT_BODY,
  fontDisplay: FONT_DISPLAY,
  buttonRadius: '1.8rem',
  buttonWeight: 600,
  buttonPaddingX: '1.375rem',
  buttonPaddingY: '0.75rem',
  inputRadius: '0.75rem',
  inputPaddingX: '1rem',
  inputPaddingY: '0.75rem',
  cardRadius: '1.25rem',
  cardShadow: 'none',
};

export const theme: ThemeMeta = {
  name: 'pristine',
  label: 'Pristine',
  light,
  dark,
};

export const tokens = { light, dark };
