'use client';
import { useThemeStore } from '@/core/theme';

export function ThemeSwitcher() {
  const { mode, toggleMode } = useThemeStore();
  return (
    <button
      onClick={toggleMode}
      className="px-3 py-1 text-sm border transition-opacity hover:opacity-80"
      style={{
        borderColor: 'var(--border)',
        background: 'var(--surface)',
        color: 'var(--text)',
        borderRadius: 'var(--input-radius)',
      }}
      aria-label="Toggle dark mode"
    >
      {mode === 'light' ? 'Dark' : 'Light'}
    </button>
  );
}
