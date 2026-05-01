import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { applyTokens } from './apply';
import { Mode, ThemeName } from './types';
import { theme as activeTheme } from '@/themes/active';

interface ThemeState {
  mode: Mode;
  toggleMode: () => void;
  sync: () => void;
}

const apply = (mode: Mode) => {
  const tokens = mode === 'dark' ? activeTheme.dark : activeTheme.light;
  applyTokens(activeTheme.name as ThemeName, mode, tokens);
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: 'light',
      toggleMode: () => {
        const mode = get().mode === 'light' ? 'dark' : 'light';
        apply(mode);
        set({ mode });
      },
      sync: () => apply(get().mode),
    }),
    { name: 'launchpad-theme' }
  )
);

export { activeTheme };
