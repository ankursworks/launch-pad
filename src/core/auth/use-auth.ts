'use client';
/**
 * Unified auth hook.
 *
 * Returns the same shape regardless of `AUTH_MODE`:
 *   - mock  → reads/writes `useAuthStore` (Zustand + localStorage)
 *   - clerk → reads `useUser`/`useAuth` and wraps `useSignIn`/`useSignUp`
 *
 * UI components import this hook only — they never see Clerk or the mock
 * directly, so swapping modes is a single env-var change.
 */
import { useCallback } from 'react';
import {
  useAuth as useClerkAuth,
  useUser as useClerkUser,
  useSignIn,
  useSignUp,
  useClerk,
} from '@clerk/nextjs';
import { isClerkMode } from './mode';
import { useAuthStore } from './store';
import type { AuthUser, SignupInput } from './mock-backend';

export interface UseAuthShape {
  user: AuthUser | null;
  isLoaded: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (input: SignupInput) => Promise<void>;
  signOut: () => Promise<void>;
}

// `isClerkMode` is a build-time constant (NEXT_PUBLIC_*), so the branch
// resolves once per build — hook order remains stable. We disable the rule
// here because the lint can't see that the condition never changes.
export function useAuth(): UseAuthShape {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return isClerkMode ? useClerkBridge() : useMockBridge();
}

/* ───────────────────────── mock bridge ───────────────────────── */

function useMockBridge(): UseAuthShape {
  const { user, hydrated, login, signup, logout } = useAuthStore();
  const signOut = useCallback(async () => {
    logout();
  }, [logout]);
  return { user, isLoaded: hydrated, login, signup, signOut };
}

/* ───────────────────────── clerk bridge ───────────────────────── */

function useClerkBridge(): UseAuthShape {
  const { isLoaded: userLoaded, user: clerkUser } = useClerkUser();
  const { isLoaded: authLoaded, signOut: clerkSignOut } = useClerkAuth();
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const { setActive } = useClerk();

  const login = useCallback(
    async (email: string, password: string) => {
      if (!signIn) throw new Error('Auth not ready');
      const result = await signIn.create({ identifier: email, password });
      if (result.status === 'complete' && result.createdSessionId) {
        await setActive({ session: result.createdSessionId });
        return;
      }
      throw new Error('Additional verification required.');
    },
    [signIn, setActive]
  );

  const signup = useCallback(
    async (input: SignupInput) => {
      if (!signUp) throw new Error('Auth not ready');
      const [firstName, ...rest] = input.name.split(' ');
      const lastName = rest.join(' ') || undefined;
      const result = await signUp.create({
        emailAddress: input.email,
        password: input.password,
        firstName,
        lastName,
        username: input.username,
      });
      if (result.status === 'complete' && result.createdSessionId) {
        await setActive({ session: result.createdSessionId });
        return;
      }
      throw new Error(
        'Check your email to verify your account, then sign in.'
      );
    },
    [signUp, setActive]
  );

  const signOut = useCallback(async () => {
    await clerkSignOut();
  }, [clerkSignOut]);

  const user: AuthUser | null = clerkUser
    ? {
        id: clerkUser.id,
        email: clerkUser.primaryEmailAddress?.emailAddress ?? '',
        name:
          clerkUser.fullName ||
          [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(' ') ||
          clerkUser.username ||
          'User',
        username: clerkUser.username ?? undefined,
      }
    : null;

  return {
    user,
    isLoaded: userLoaded && authLoaded,
    login,
    signup,
    signOut,
  };
}
