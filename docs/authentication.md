# Authentication

LaunchPad ships with two interchangeable auth backends. UI never imports
either directly — every page goes through one hook in `src/core/auth/use-auth.ts`,
and a single env flag decides which backend is loaded.

| Mode    | Default? | What it does                                                               | What you provide |
| ------- | -------- | -------------------------------------------------------------------------- | ---------------- |
| `mock`  | ✅       | In-memory fake. Any email + 6+ char password works. Persists to localStorage. | Nothing — works out of the box |
| `clerk` |          | Real auth via [Clerk](https://clerk.com) — sessions, OAuth, email, password reset. | Your own free Clerk account |

> **Heads-up: this repo ships zero credentials.** When you're ready to use
> Clerk, you'll create your own Clerk account and use your own keys. Keys
> live in your local `.env.local` (git-ignored) and never get committed.

## Setting up Clerk (3 steps)

### 1. Create a Clerk account & application

Go to <https://dashboard.clerk.com> and sign up — the free tier covers
roughly 10,000 monthly active users. Create a new application; choose
whichever auth strategies you want enabled (email + password, Google,
GitHub, magic link, etc).

### 2. Copy your keys

In the Clerk dashboard sidebar → **API Keys**. You'll see two keys:

- `Publishable key` (starts with `pk_test_…` or `pk_live_…`) — safe to expose to the browser
- `Secret key` (starts with `sk_test_…` or `sk_live_…`) — server-only, never commit

### 3. Drop them into `.env.local`

```bash
cp .env.example .env.local
```

Then edit `.env.local`:

```bash
NEXT_PUBLIC_AUTH_MODE=clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_key_here
```

Optionally override Clerk's redirect URLs (defaults are sensible):

```bash
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

Restart the dev server. The existing branded Login / Signup forms now hit
Clerk's APIs — UI doesn't change.

To go back to mock mode, set `NEXT_PUBLIC_AUTH_MODE=mock` and restart.

## How the swap works under the hood

`src/core/auth/mode.ts` reads `NEXT_PUBLIC_AUTH_MODE` once at build time:

```ts
export const AUTH_MODE: AuthMode =
  process.env.NEXT_PUBLIC_AUTH_MODE === 'clerk' ? 'clerk' : 'mock';
```

Three things branch on it:

1. **`<ClerkAuthProvider>`** wraps the app in `<ClerkProvider>` only in Clerk
   mode (passthrough otherwise). No env vars are needed in mock mode.
2. **`useAuth()`** in `src/core/auth/use-auth.ts` exports the same `{ user,
   isLoaded, login, signup, signOut }` shape, internally delegating to either
   the Zustand store or Clerk's hooks.
3. **`src/middleware.ts`** runs Clerk's middleware only in Clerk mode.

Every consumer (`<ProtectedShell>`, Login/Signup pages, Header, Sidebar,
Profile, Settings) calls `useAuth()` — so swapping is a one-env-var change
plus a restart.

## Email verification flow

If your Clerk instance requires email verification (the Clerk default), the
sign-up call will throw `"Check your email to verify your account, then sign
in."`. The user verifies via Clerk's email and then signs in normally.

If you want a smoother in-app verification flow (code entry without leaving
the app), extend `useClerkBridge()` in `use-auth.ts` to track a
`pendingVerification` state and call `signUp.attemptEmailAddressVerification(...)`.
Or disable email verification in your Clerk dashboard (Sessions → Email
verification → Off).

## OAuth (Google / GitHub / Apple)

Wire OAuth in three steps:

1. In Clerk dashboard → **User & Authentication** → **Social Connections**,
   enable the provider.
2. In `src/themes/helios/pages/Login.tsx`, the existing "Continue with
   Google" / "Continue with Apple" buttons are decorative. Wire them by
   calling `signIn.authenticateWithRedirect({ strategy: 'oauth_google',
   redirectUrl: '/dashboard', redirectUrlComplete: '/dashboard' })`.
3. Clerk handles the redirect roundtrip automatically.

## Server-side auth

In Clerk mode, server components / route handlers can use Clerk's helpers
directly:

```ts
import { auth, currentUser } from '@clerk/nextjs/server';

export async function GET() {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  const user = await currentUser();
  return Response.json({ user });
}
```

In mock mode there is no real session on the server — `mock-backend.ts` lives
on the client only. Avoid relying on server-side auth in mock mode; protect
data at the API layer once you've moved to Clerk (or another real provider).

## Adding a different provider

The hook is small (~80 lines). To swap Clerk for NextAuth, Auth0, or
Supabase Auth:

1. Add a new mode value to `AuthMode` in `src/core/auth/mode.ts`.
2. Add a `useXBridge()` function in `use-auth.ts` returning `UseAuthShape`.
3. Update `useAuth()` to dispatch to it.
4. Replace `<ClerkAuthProvider>` with the new provider's wrapper in
   `src/core/Providers.tsx`.

UI files don't change — they all call `useAuth()`.

## Security notes

- Mock mode stores its token in `localStorage`. That's fine for local
  development; do not deploy mock mode to production.
- Clerk uses HttpOnly cookies for sessions and handles CSRF, refresh, and
  device management for you.
- The `CLERK_SECRET_KEY` must never be exposed to the browser. Keep it in
  `.env.local` and only reference it in server code (route handlers, server
  components, middleware).
