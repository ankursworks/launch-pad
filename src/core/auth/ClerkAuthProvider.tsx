'use client';
/**
 * Conditionally wraps children in ClerkProvider.
 *
 * In mock mode it's a passthrough — Clerk's runtime never loads, no env vars
 * required. In clerk mode it forwards to `<ClerkProvider>` so all Clerk hooks
 * (`useUser`, `useAuth`, `useSignIn`, `useSignUp`) work app-wide.
 */
import { ClerkProvider } from '@clerk/nextjs';
import { isClerkMode } from './mode';

export function ClerkAuthProvider({ children }: { children: React.ReactNode }) {
  if (!isClerkMode) return <>{children}</>;
  return <ClerkProvider>{children}</ClerkProvider>;
}
