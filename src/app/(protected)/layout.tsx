'use client';
import { ProtectedShell } from '@/core/routing/ProtectedShell';
import { AppLayout } from '@/themes/active';

export default function ProtectedRouteLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppLayout>
      <ProtectedShell
        fallback={
          <p className="p-8" style={{ color: 'var(--muted)' }}>
            Loading…
          </p>
        }
      >
        {children}
      </ProtectedShell>
    </AppLayout>
  );
}
