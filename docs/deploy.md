# Deploying LaunchPad

LaunchPad is a standard Next.js 14 App Router project — it deploys
unchanged to Vercel, Netlify, Railway, Fly.io, Render, or anywhere that
runs Node 20+.

This guide focuses on Vercel because it's the smoothest path; the
production-readiness checklist at the end applies anywhere.

## Quick deploy: Vercel

### 1. Push your fork to GitHub / GitLab / Bitbucket

```bash
git remote add origin <your-repo-url>
git push -u origin main
```

### 2. Import to Vercel

Go to <https://vercel.com/new> → import your repo. Vercel auto-detects
Next.js — no build settings to change.

### 3. Set environment variables

Vercel project → **Settings → Environment Variables**. Add the same
variables you have in `.env.local`:

| Variable                              | Required when                  | Notes |
| ------------------------------------- | ------------------------------ | ----- |
| `NEXT_PUBLIC_API_URL`                 | always                         | Your production API origin |
| `NEXT_PUBLIC_AUTH_MODE`               | always                         | `clerk` for production, never `mock` |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`   | when `AUTH_MODE=clerk`         | `pk_live_…` for production |
| `CLERK_SECRET_KEY`                    | when `AUTH_MODE=clerk`         | `sk_live_…`, server-only |

**Don't deploy with `NEXT_PUBLIC_AUTH_MODE=mock`.** The mock has no real
authentication — anyone with a 6-character password can sign in as anyone.
It exists for local development only.

### 4. Deploy

Vercel builds and deploys automatically. Push to `main` to redeploy.

## Other hosts

| Host     | Notes |
| -------- | ----- |
| Netlify  | Use the `@netlify/plugin-nextjs` plugin (auto-installed). Same env-var setup. |
| Railway  | Add a Next.js service. Set env vars in the project dashboard. |
| Fly.io   | `fly launch`; use the Next.js Dockerfile preset. |
| Render   | Web service, Node 20, build = `npm run build`, start = `npm start`. |
| Self-host| `npm run build` then `npm start` behind any Node-capable reverse proxy. |

The middleware (`src/middleware.ts`) runs at the edge on Vercel and as a
Node middleware elsewhere. It's a pure passthrough in mock mode, so cold
starts are minimal.

## Production-readiness checklist

Before you flip your domain over to live traffic:

### Authentication
- [ ] `NEXT_PUBLIC_AUTH_MODE=clerk` (never `mock` in production)
- [ ] Use Clerk's `pk_live_…` and `sk_live_…` keys (not `pk_test_…`)
- [ ] In the Clerk dashboard, add your production domain to the allowed origins
- [ ] Configure redirect URLs in Clerk to match your production paths
- [ ] If using OAuth, configure each provider's redirect URI in their
      respective dashboards (Google Cloud Console, GitHub, etc)

### Security
- [ ] All secrets live in your host's env-var dashboard, never in the repo
- [ ] `CLERK_SECRET_KEY` is server-only (no `NEXT_PUBLIC_` prefix)
- [ ] HTTPS is enforced (Vercel does this automatically; otherwise configure your reverse proxy)
- [ ] Add a Content-Security-Policy header — see Next.js docs for [headers config](https://nextjs.org/docs/app/api-reference/next-config-js/headers)
- [ ] Rate-limit your auth endpoints (Clerk does this for hosted endpoints; rate-limit your own API routes)

### Data
- [ ] Replace seed data in `core/templates/Projects.tsx` and `core/templates/Team.tsx` with real database calls
- [ ] Wire your database via Prisma / Drizzle / Supabase
- [ ] Run migrations as part of your deploy pipeline (e.g. `prisma migrate deploy`)
- [ ] Backups configured on your DB host

### Monitoring
- [ ] Add Sentry or similar for error tracking
- [ ] Add an analytics SDK (PostHog, Plausible, Vercel Analytics)
- [ ] Set up uptime monitoring (UptimeRobot, BetterStack, Pingdom)

### Performance
- [ ] Run `npm run build` locally and check the bundle output
- [ ] Use `next/image` for non-mockup imagery (the marketing landing
      page uses Unsplash URLs as placeholders — swap with your own assets)
- [ ] Configure a CDN for static assets (Vercel does this automatically)

### Legal / compliance
- [ ] Real Privacy Policy, Terms of Service, Cookie Policy
- [ ] If targeting EU users: add a cookie consent banner
- [ ] If handling payments: PCI compliance via Stripe (don't roll your own)

## Custom domain

In Vercel: project → **Settings → Domains** → add your domain. Vercel
provisions an SSL certificate automatically (Let's Encrypt).

Update `NEXT_PUBLIC_API_URL` and any Clerk redirect URLs to match the new
domain.

## Smoke test post-deploy

After deploying:

1. Hit `/` — marketing landing page renders
2. Hit `/about` — sticky-blur nav, content renders
3. Hit `/login` — sign in with a real Clerk-registered user
4. Hit `/dashboard` — protected route loads with the user chip showing your name
5. Click logout in the header → redirects to `/`
6. Try `/dashboard` again unauthenticated → redirects to `/login`

If any of those break, the most common culprits are missing env vars or
mismatched Clerk redirect URLs.
