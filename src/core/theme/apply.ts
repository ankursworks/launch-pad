import { Mode, ThemeName, ThemeTokens, TOKEN_VAR_MAP } from './types';

/**
 * Writes the active theme's tokens to CSS custom properties on <html>.
 * Called by the theme store on mount and on mode/theme change.
 */
export function applyTokens(name: ThemeName, mode: Mode, tokens: ThemeTokens) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  for (const [key, value] of Object.entries(tokens)) {
    const cssVar = TOKEN_VAR_MAP[key as keyof ThemeTokens];
    if (cssVar) root.style.setProperty(cssVar, String(value));
  }
  root.dataset.theme = name;
  root.dataset.mode = mode;
}
