# LaunchPad

> A frontend SaaS starter for Next.js. Polished design system, 25+ themed
> components, full marketing landing page, swappable themes, and a pluggable
> auth layer that ships with a working mock so you can run it instantly.

Fork it. Replace the mock auth with your own Clerk account when you're
ready. Wire your database. Ship.

## Stack

- **Next.js 14** (App Router) + **TypeScript** strict
- **Tailwind CSS** with CSS-variable theming
- **Radix UI** primitives (Dialog, Tooltip, Toast, Tabs, Dropdown, Select, Checkbox, Switch, Avatar, Progress)
- **Zustand** for theme + toast state
- **Clerk** (optional, opt-in) for real authentication — mock backend by default
- **React Hook Form + Zod** for validated forms
- **lucide-react** for icons
- **Inter + BIZ UDPMincho** via `next/font/google`

## Quick start

No accounts, no keys, no env setup required to boot — the project ships with
a mock auth backend.

**One-liner (recommended)** — pulls a clean copy via `degit` (no `.git`
history), installs deps, runs interactive setup:

```bash
npx degit ankursworks/launch-pad my-app && cd my-app && npm install && npm run setup
```

Then `npm run dev` and open <http://localhost:3000>.

**Want a specific theme without prompts?** Pass flags through to setup:

```bash
npx degit ankursworks/launch-pad my-app && cd my-app && npm install && \
  npm run setup -- --name my-app --theme helios --prune --yes
```

**Manual clone** (keeps git history if you plan to rebase against upstream):

```bash
git clone https://github.com/ankursworks/launch-pad.git my-app
cd my-app
npm install
npm run setup    # interactive: rename project, pick theme, optional reset
npm run dev
```

Sign up with any email + a 6+ character password to land in the dashboard.

| Command              | Description                              |
| -------------------- | ---------------------------------------- |
| `npm run dev`        | Start dev server                         |
| `npm run build`      | Production build                         |
| `npm start`          | Run production build                     |
| `npm run lint`       | Lint codebase                            |
| `npm run type-check` | TypeScript check (no emit)               |
| `npm run setup`      | Fork setup (theme + rename) — see `--help` for flags |

## The path from fork to ship

LaunchPad is intentionally frontend-first — you own your backend choices.
Here's the realistic journey:

1. **Clone & brand** (1 day) — `npm run setup`, swap copy in marketing
   sections, recolor tokens in `src/themes/active/tokens.ts`.
2. **Real auth** (1-2 hours) — sign up at [clerk.com](https://clerk.com),
   drop your keys into `.env.local`, flip `NEXT_PUBLIC_AUTH_MODE=clerk`.
   See [Authentication](#authentication).
3. **Database & API** (a few days) — pick Prisma/Drizzle/Supabase, replace
   the in-memory seed data in `core/templates/Projects.tsx` and
   `core/templates/Team.tsx` with real queries via `api()` in `src/core/lib/api.ts`.
4. **Payments** (1 day) — wire Stripe Checkout from the existing Billing UI
   in `core/templates/Billing.tsx`.
5. **Deploy** (1 hour) — push to Vercel. See [`docs/deploy.md`](docs/deploy.md).

## What you get out of the box

**Routes (all working):**
- `/` — full marketing landing page (13 sections — nav, hero, logos, features, integrations, pricing, testimonials, blog, FAQ, footer-with-CTA)
- `/about` — text-only about page with sticky-blur nav
- `/login`, `/signup` — branded two-column auth (mock or Clerk)
- `/dashboard` — long-scroll component showcase
- `/projects` — CRUD example (list / search / create / edit / delete)
- `/team` — searchable member table with invite flow
- `/billing` — plan + usage stats + comparison + invoices
- `/settings` — tabbed: General / Notifications / Security / Locale
- `/profile` — account info + edit modal
- `/onboarding` — 4-step wizard
- `/style-guide` — live design tokens + typography reference

**Components (in `src/themes/active`):**

| Display | Inputs | Overlays | Data | Layout |
| --- | --- | --- | --- | --- |
| `Avatar` | `Button` | `Modal` | `Card` | `Header` |
| `Badge` | `Input` | `Dropdown` | `Table` | `Sidebar` |
| `Stat` | `Select` | `Tooltip` | `Progress` | `Sheet` |
| `Skeleton` | `Checkbox` | `Toast` |  | `EmptyState` |
| `SunRays` | `Switch` | `Tabs` |  | `IllustrationPanel` |
| `AgenticIllustration` |  | `Sheet` |  | `AppLayout` / `AuthLayout` |

**Hooks (in `src/core/hooks`):**
- `useDisclosure` — controlled open/close (modals, drawers)
- `useDebounce` — debounced value
- `useMediaQuery` — reactive media query
- `useLocalStorage` — typed localStorage with cross-tab sync
- `useCopyToClipboard` — copy + transient `copied` flag
- `useToast` (from active theme) — queue-driven toast notifications

## Architecture

```
src/
├── app/                        # Routes (thin re-exports from active theme)
│   ├── (auth)/                 # /login, /signup
│   ├── (protected)/            # /dashboard, /projects, /team, /billing, /settings, /profile
│   ├── about/                  # /about
│   ├── onboarding/             # /onboarding
│   └── style-guide/            # /style-guide
├── core/                       # SHARED — never theme-specific
│   ├── auth/                   # mode flag, mock backend, useAuth() hook, ClerkProvider
│   ├── theme/                  # store, ThemeProvider, applyTokens, types
│   ├── routing/                # ProtectedShell (auth gate)
│   ├── hooks/                  # useDisclosure, useDebounce, …
│   ├── lib/                    # api.ts (fetch wrapper), cn.ts
│   ├── templates/              # Profile, Settings, Team, Billing, Onboarding, Projects
│   └── Providers.tsx           # ClerkAuthProvider + ThemeProvider + Tooltip + Toast
├── middleware.ts               # Clerk middleware (active only when AUTH_MODE=clerk)
└── themes/
    ├── active/                 # one-line barrel — change to swap theme
    │   └── index.ts            # `export * from '../helios'`
    └── helios/
        ├── tokens.ts           # color/font/spacing tokens (light + dark)
        ├── components/         # Button, Card, Input, Modal, Sidebar, …
        ├── layouts/            # AuthLayout, AppLayout
        ├── sections/           # Marketing sections (Hero, Pricing, Footer, …)
        └── pages/              # Home, About, Login, Signup, Dashboard, StyleGuide
```

### Theme owns vs. core owns

| Layer | Owner | Why |
| --- | --- | --- |
| Tokens | theme | This *is* the theme |
| Primitives | theme | Component shape/feel differs per theme |
| Brand pages (Home, Login, Signup, Dashboard, StyleGuide) | theme | First-impression layouts diverge |
| Domain templates (Profile, Settings, Team, Billing, Onboarding, Projects) | core | Standard SaaS patterns; visual difference comes through theme primitives |

Themes can override any core template by exporting their own version from
`themes/<name>/index.ts`. The route resolves the override if present.

## Authentication

LaunchPad ships with two interchangeable auth backends behind a single
`useAuth()` hook. **You don't need any keys to run the project** — the mock
just works.

| Mode    | Default? | What it does                                                                  | Setup |
| ------- | :------: | ----------------------------------------------------------------------------- | ----- |
| `mock`  |    ✅    | In-memory fake. Any email + 6+ char password. Persists to localStorage.       | None — works out of the box |
| `clerk` |          | Real auth via [Clerk](https://clerk.com). Sessions, OAuth, email verification. | You bring your own Clerk account |

### Going from mock to Clerk (3 steps)

The repo never ships any keys. You'll create your own Clerk account and use
your own credentials.

**1. Create a Clerk account.**
Sign up at <https://dashboard.clerk.com> (free tier covers ~10k MAU).
Create a new application — pick whichever auth strategies you want
(email/password, Google, GitHub, magic link, etc).

**2. Copy your keys.**
In the Clerk dashboard sidebar → **API Keys**. Copy the publishable key and
the secret key.

**3. Drop them into `.env.local`.**

```bash
cp .env.example .env.local
```

Then edit `.env.local`:

```bash
NEXT_PUBLIC_AUTH_MODE=clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_key_here
```

Restart the dev server. The same branded Login / Signup forms now hit Clerk's
APIs — no UI changes. To go back to the mock, set `NEXT_PUBLIC_AUTH_MODE=mock`
and restart.

`.env.local` is git-ignored — your keys never get committed.

See [`docs/authentication.md`](docs/authentication.md) for server-side auth
patterns, email verification flows, and how to swap Clerk for any other
provider (NextAuth, Auth0, Supabase Auth, etc).

### Calling your API

For non-auth requests, the shared `api()` helper in `src/core/lib/api.ts`
attaches the bearer token automatically:

```ts
import { api } from '@/core/lib/api';

const me = await api<User>('/users/me');
const project = await api<Project>('/projects', {
  method: 'POST',
  body: { name: 'New project' },
});
```

## Themes

### Switching dark / light mode

```tsx
import { useThemeStore } from '@/core/theme';

const { mode, toggleMode } = useThemeStore();
```

Or click the **Dark/Light** button in the sidebar footer (or the Header on
unprotected routes).

### Adding a new theme

1. Create `src/themes/<name>/` with the same shape as `helios/` (tokens +
   components + layouts + pages + `index.ts`).
2. Add `'<name>'` to the `ThemeName` union in `src/core/theme/types.ts`.
3. To activate it, change one line in `src/themes/active/index.ts`:
   ```ts
   export * from '../<name>';
   ```
4. Or run `npm run setup` to swap interactively.

### Removing themes (forking)

`npm run setup` lets you delete unused theme folders interactively. Manual
equivalent:

```bash
rm -rf src/themes/<unwanted-theme>
```

Then point `themes/active/index.ts` at the kept theme.

### Token surface

| Group | Tokens |
| --- | --- |
| Surfaces | `bg` `surface` `panel` |
| Text | `text` `muted` |
| Brand | `primary` `primaryContrast` `accent` |
| Lines | `border` |
| Fonts | `fontBody` `fontDisplay` |
| Buttons | `buttonRadius` `buttonWeight` `buttonPaddingX` `buttonPaddingY` |
| Inputs | `inputRadius` `inputPaddingX` `inputPaddingY` |
| Cards | `cardRadius` |

Tokens are written to CSS custom properties at runtime via `applyTokens` in
`src/core/theme/apply.ts`. Components always read `var(--accent)`,
`var(--btn-radius)`, etc.

## Design language: Helios

- Warm beige canvas, white surfaces, near-black text, vermilion accent (`#FF592C`)
- BIZ UDPMincho serif for editorial display, Inter for body
- Generous whitespace, soft borders, token-driven radii
- Custom agentic illustration on auth pages (gradient + glassmorphism)

Visit `/style-guide` for the live reference (toggles between light and dark
palettes).

## Going to production

When you're ready to deploy, the [`docs/deploy.md`](docs/deploy.md) guide
walks through Vercel deployment, env-var management, and the
production-readiness checklist.

## What's *not* shipped (yet)

You bring your own:

- **Database / ORM** — Prisma, Drizzle, Supabase, etc. The `api()` helper is
  ready; just point it at your endpoints.
- **Payments** — Stripe Checkout is a recommended next add; the Billing UI
  in `core/templates/Billing.tsx` is already built.
- **Email** — Resend, SendGrid, Postmark, etc. (Clerk handles auth email if
  you go that route.)
- **Tests + CI** — Vitest / Playwright / GitHub Actions.
- **Analytics / monitoring** — Sentry, PostHog, Plausible, etc.
- **Internationalization** — `next-intl` plays nicely with the App Router.

## Further reading

- [`docs/authentication.md`](docs/authentication.md) — mock vs Clerk, server-side patterns, swapping providers
- [`docs/deploy.md`](docs/deploy.md) — Vercel deployment + production-readiness checklist

## License

MIT
