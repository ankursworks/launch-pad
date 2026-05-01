/**
 * Auth mode flag.
 *
 * `mock` — local-only fake auth backed by Zustand + localStorage. Default for
 * fresh forks so the project boots without any external setup.
 *
 * `clerk` — real auth via Clerk. Activate by setting both:
 *   NEXT_PUBLIC_AUTH_MODE=clerk
 *   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
 *   CLERK_SECRET_KEY=sk_test_...
 *
 * Read at build time (NEXT_PUBLIC_*), so swapping requires `npm run dev` restart.
 */
export type AuthMode = 'mock' | 'clerk';

export const AUTH_MODE: AuthMode =
  process.env.NEXT_PUBLIC_AUTH_MODE === 'clerk' ? 'clerk' : 'mock';

export const isClerkMode = AUTH_MODE === 'clerk';
