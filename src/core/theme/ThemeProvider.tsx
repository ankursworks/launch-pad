'use client';
import { useEffect } from 'react';
import { useThemeStore } from './store';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const sync = useThemeStore((s) => s.sync);
  useEffect(() => {
    sync();
  }, [sync]);
  return <>{children}</>;
}
