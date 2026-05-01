'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/core/auth';

interface ProtectedShellProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
}

export function ProtectedShell({
  children,
  fallback = null,
  redirectTo = '/login',
}: ProtectedShellProps) {
  const { user, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !user) router.replace(redirectTo);
  }, [isLoaded, user, router, redirectTo]);

  if (!isLoaded || !user) return <>{fallback}</>;
  return <>{children}</>;
}
