import { ThemeMeta, ThemeTokens } from '@/core/theme/types';

/**
 * Helios — editorial / magazine aesthetic. Cloned from the Syntro SaaS
 * style guide.
 *   • Warm beige canvas + sand panel
 *   • Editorial Mincho serif (BIZ UDPMincho) for display
 *   • Inter for body
 *   • Orange accent #FF592C
 *   • Heading weights stay at 400 — the serif carries the visual weight.
 */

const FONT_BODY = 'var(--font-sans), "Inter Display", system-ui, sans-serif';
const FONT_DISPLAY =
  'var(--font-biz-mincho), "BIZ UDPMincho", Georgia, "Times New Roman", serif';

const light: ThemeTokens = {
  bg: '#F5F4F1',           // brown-50: warm beige page canvas
  surface: '#FFFFFF',
  panel: '#EEECE7',         // brown-100: warm sand
  text: '#151515',          // neutral-950: near-black
  muted: '#5D5D5D',         // neutral-600: warm gray
  primary: '#151515',       // dark CTAs
  primaryContrast: '#FFFFFF',
  accent: '#FF592C',        // accent-400: Syntro orange
  border: '#E7E7E7',        // neutral-100
  fontBody: FONT_BODY,
  fontDisplay: FONT_DISPLAY,
  buttonRadius: '0.5rem',
  buttonWeight: 600,
  buttonPaddingX: '1.25rem',
  buttonPaddingY: '0.75rem',
  inputRadius: '0.5rem',
  inputPaddingX: '0.875rem',
  inputPaddingY: '0.75rem',
  cardRadius: '1rem',
  cardShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
};

const dark: ThemeTokens = {
  bg: '#151515',           // neutral-950
  surface: '#1F1F1F',
  panel: '#2A2A28',
  text: '#F5F4F1',
  muted: '#B0B0B0',
  primary: '#FF592C',
  primaryContrast: '#FFFFFF',
  accent: '#FF592C',
  border: '#333333',
  fontBody: FONT_BODY,
  fontDisplay: FONT_DISPLAY,
  buttonRadius: '0.5rem',
  buttonWeight: 600,
  buttonPaddingX: '1.25rem',
  buttonPaddingY: '0.75rem',
  inputRadius: '0.5rem',
  inputPaddingX: '0.875rem',
  inputPaddingY: '0.75rem',
  cardRadius: '1rem',
  cardShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
};

export const theme: ThemeMeta = {
  name: 'helios',
  label: 'Helios',
  light,
  dark,
};

export const tokens = { light, dark };
