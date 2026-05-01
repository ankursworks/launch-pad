export type Mode = 'light' | 'dark';

/**
 * Add new theme names here when registering a new theme module.
 */
export type ThemeName = 'helios' | 'pristine';

export interface ThemeTokens {
  // Surfaces
  bg: string;
  surface: string;
  panel: string;
  // Text
  text: string;
  muted: string;
  // Brand
  primary: string;
  primaryContrast: string;
  accent: string;
  // Lines
  border: string;
  // Fonts
  fontBody: string;
  fontDisplay: string;
  // Buttons
  buttonRadius: string;
  buttonWeight: number;
  buttonPaddingX: string;
  buttonPaddingY: string;
  // Inputs
  inputRadius: string;
  inputPaddingX: string;
  inputPaddingY: string;
  // Cards
  cardRadius: string;
  cardShadow: string;
}

export interface ThemeMeta {
  name: ThemeName;
  label: string;
  light: ThemeTokens;
  dark: ThemeTokens;
}

export const TOKEN_VAR_MAP: Record<keyof ThemeTokens, string> = {
  bg: '--bg',
  surface: '--surface',
  panel: '--panel',
  text: '--text',
  muted: '--muted',
  primary: '--primary',
  primaryContrast: '--primary-contrast',
  accent: '--accent',
  border: '--border',
  fontBody: '--font-family',
  fontDisplay: '--font-display-family',
  buttonRadius: '--btn-radius',
  buttonWeight: '--btn-weight',
  buttonPaddingX: '--btn-padding-x',
  buttonPaddingY: '--btn-padding-y',
  inputRadius: '--input-radius',
  inputPaddingX: '--input-padding-x',
  inputPaddingY: '--input-padding-y',
  cardRadius: '--card-radius',
  cardShadow: '--card-shadow',
};
