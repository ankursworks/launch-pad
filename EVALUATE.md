# Is LaunchPad useful for you?

A 30-45 minute self-evaluation. Read this top-to-bottom, run the test
drive, build the small challenge at the end, and you'll know.

This isn't a pitch — it's an honest eval doc, including what doesn't work
and what you'll have to build yourself.

---

## 30-second filter — is this even the right tool?

You'll likely fork LaunchPad if you nod yes to most of these:

- [ ] You're shipping a Next.js SaaS and don't want to design from scratch
- [ ] You want a polished, themeable design system out of the box
- [ ] You're comfortable wiring your own backend (DB / API / payments)
- [ ] You want auth that works locally today and swaps to a real provider in
      one env var when you're ready
- [ ] You'd rather own your stack than depend on a vendor SDK that hides Next.js

You'll likely **skip it** if any of these apply:

- [ ] You want a full-stack template with backend + DB + payments wired up
      (look at RedwoodJS, T3, or Supabase starters instead)
- [ ] You want server-side rendering for SEO-heavy content (LaunchPad is
      client-rendered for most of `/dashboard`-class routes)
- [ ] You don't want to use Tailwind / Radix / Zustand — those are baked in
- [ ] You need a CMS-driven marketing site (this is hand-coded sections)

If you're still here, run the test drive.

---

## What's in the box vs. what you bring

### In the box (works today)
- **Marketing landing page** — 13 sections (Hero → Pricing → Testimonials → Footer)
- **About page** with sticky-blur nav
- **Auth flow** — branded Login / Signup, two-column with illustration
- **App shell** — sidebar (collapsible on mobile), header, theme switcher
- **Dashboard** — long-scroll component showcase (every primitive demoed)
- **6 domain templates** — Profile, Settings, Team, Billing, Onboarding, Projects (real UX, seed data, no real persistence)
- **Style guide** — `/style-guide` with live tokens
- **25+ themed primitives** — Button, Input, Modal, Sheet, Toast, Table, Dropdown, Select, Checkbox, Switch, Avatar, Badge, Card, Progress, Tabs, Tooltip…
- **Two themes** — Helios (warm, editorial Mincho serif) and Pristine (clean, technical Inter Tight)
- **One-line theme swap** at `src/themes/active/index.ts`
- **Auth abstraction** — `useAuth()` hook backed by mock by default, swap to Clerk via env var

### Not in the box (you wire it)
- **Database / ORM** — pick Prisma / Drizzle / Supabase
- **Real API endpoints** — the `api()` helper is ready; routes aren't
- **Payments** — Stripe Checkout. Billing UI is built; webhook handler isn't
- **Email** — Resend / SendGrid / Postmark
- **Tests** — bring Vitest / Playwright
- **Analytics & monitoring** — Sentry / PostHog / etc.
- **Internationalization** — copy is English

### Honest sharp edges
- **Pristine theme is partial** — it re-exports primitives from Helios. If
  you want it fully self-contained, you'll copy ~25 component files
  (~1 hour of mechanical work). Helios is the production-ready theme.
- **Mock auth is local-only** — accepts any 6+ char password. Don't deploy
  with `AUTH_MODE=mock`.
- **No tests** — type-check + lint pass cleanly, but there's no Vitest /
  Playwright suite. You'll add your own.
- **Marketing images are Unsplash placeholders** — swap them for your own
  before launching.

---

## The 30-minute test drive

### Step 1 — Boot it (5 min)

```bash
npx degit ankursworks/launch-pad my-app && cd my-app && npm install && npm run setup
```

When the interactive setup prompts: pick a project name, choose `helios`,
say no to pruning, no to reset, yes to README rewrite.

```bash
npm run dev
```

Open <http://localhost:3000>. Click around:

- `/` — marketing landing
- `/about`
- `/login` → sign up with `you@test.com` / `password` → land on `/dashboard`
- `/projects`, `/team`, `/billing`, `/settings`, `/profile`
- `/style-guide` — toggle light / dark in the top right

**Pause here.** Did anything break? Did the design feel coherent? Did the
themes feel real or like a starter scaffold? Note your gut reaction.

### Step 2 — Swap the theme (2 min)

Open `src/themes/active/index.ts`. Change `'../helios'` to `'../pristine'`.
Save.

Hot-reload should swap the entire app to the Pristine theme. Marketing,
auth, dashboard — everything recolors and refonts.

Caveat: Pristine's marketing landing is less complete than Helios's. The
auth + dashboard pages are full quality.

Switch back to Helios when you're done.

### Step 3 — Try real auth via Clerk (10 min)

Sign up at <https://dashboard.clerk.com> (free, no card). Create a new
application. Copy the publishable + secret keys.

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```bash
NEXT_PUBLIC_AUTH_MODE=clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key
CLERK_SECRET_KEY=sk_test_your_key
```

Restart `npm run dev`. Sign up at `/signup` with a real email — you should
get a real session, persist across reload, and Clerk's dashboard should
show your test user.

Set `NEXT_PUBLIC_AUTH_MODE=mock` to switch back. No code changes either way.

**Pause here.** Did the auth swap feel like one config flip, or did
something fight you?

### Step 4 — Read the code (5 min)

Skim these five files. They're the core of the architecture:

1. `src/themes/active/index.ts` — the theme barrel (one line)
2. `src/themes/helios/tokens.ts` — color/font/radius tokens
3. `src/themes/helios/components/Button.tsx` — see how a primitive reads tokens
4. `src/core/auth/use-auth.ts` — the unified auth hook
5. `src/core/templates/Projects.tsx` — a full CRUD example with seed data

**Pause here.** Is this code you'd be comfortable maintaining? Anything
feel over-abstracted or under-abstracted?

### Step 5 — Build something small (15 min)

This is the real test. Don't skip it.

> **Challenge:** Add an `/analytics` route that renders inside the protected
> app shell, shows three KPI cards (e.g. "Active users 1,247", "MRR $4.2k",
> "Conversion 3.8%") and a small bar chart placeholder. Use existing
> primitives. No backend — hardcode the values.

Hints (use only if stuck):
- Routes live under `src/app/`. Look at how `src/app/(protected)/projects/page.tsx` is structured.
- The KPI card pattern already exists in `src/themes/helios/sections/SplitFeatures.tsx`
  (search for `KpiCard`).
- `<PageHeader>` from `src/core/templates/PageHeader.tsx` gives you the
  page title styling for free.

Time yourself. **From clone to working page, how long did it take?**

---

## Decide

Score yourself on each. Be honest.

| | Yes | No |
| --- | :---: | :---: |
| Marketing pages looked production-quality |  |  |
| Dashboard / app shell felt like a real product |  |  |
| Theme swap was a one-line change |  |  |
| Mock auth → Clerk was a one-env-var change |  |  |
| Code structure felt sensible (not over-engineered) |  |  |
| README + docs answered my questions |  |  |
| `/analytics` build took under 30 min |  |  |
| I'd fork this for a real side project this weekend |  |  |

**6+ yes** → fork it. You'll save 2-4 weeks of design + auth + scaffolding.
**4-5 yes** → fork it but expect some friction; tell us what you'd change.
**< 4 yes** → it's not the right tool for you. Honest answer.

---

## Where to go from here

If it fits:
- Read [`docs/authentication.md`](docs/authentication.md) for the Clerk
  swap details
- Read [`docs/deploy.md`](docs/deploy.md) for the Vercel checklist
- Replace seed data in `core/templates/Projects.tsx` with your real API

If it doesn't fit, the most useful thing you can do is reply with:

1. Where you got stuck (a specific file or step)
2. What you wished was different
3. What other tool you'd reach for instead and why

That's worth more than three "looks nice" replies.

---

## Realistic timeline from fork to MVP

If you decided to ship something on top of this:

| Week | Work |
| --- | --- |
| 1 | Brand: rewrite copy in marketing sections, recolor tokens, swap fonts if you want |
| 1 | Real auth: Clerk keys (1 hour) — covered in `docs/authentication.md` |
| 2 | DB + API: pick Prisma or Drizzle, replace seed data in Projects + Team templates |
| 3 | Payments: Stripe Checkout from Billing UI |
| 4 | Polish + launch: Vercel deploy, custom domain, smoke tests |

That's 4 weeks for a solo developer who knows the stack. Realistic, not
inflated.

The two weeks LaunchPad saves you are the design system + auth UX + theme
infra + landing page. If those aren't your strengths, fork it.
