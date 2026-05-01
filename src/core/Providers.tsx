'use client';
import * as Tooltip from '@radix-ui/react-tooltip';
import { ThemeProvider } from './theme/ThemeProvider';
import { ClerkAuthProvider } from './auth';
import { ToastProvider } from '@/themes/active';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkAuthProvider>
      <ThemeProvider>
        <Tooltip.Provider delayDuration={200} skipDelayDuration={500}>
          <ToastProvider>{children}</ToastProvider>
        </Tooltip.Provider>
      </ThemeProvider>
    </ClerkAuthProvider>
  );
}
