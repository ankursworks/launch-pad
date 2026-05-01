import { MarketingNav } from '../sections/MarketingNav';
import { Footer } from '../sections/Footer';

interface Section {
  title: string;
  body: React.ReactNode;
}

const sections: Section[] = [
  {
    title: '1. Our Mission',
    body: (
      <>
        <p>
          We started LaunchPad with one belief: every team — no matter the
          size — deserves clarity over their data. Most analytics tools were
          built for analysts; we&apos;re building one for the people who
          actually have to make decisions.
        </p>
      </>
    ),
  },
  {
    title: '2. The Story',
    body: (
      <>
        <p>
          LaunchPad began in 2024 as a side project between two founders who
          spent more time wrangling spreadsheets than reading them. After
          shipping it to a handful of friends, the request was unanimous —
          this should be a product.
        </p>
        <p className="mt-3">
          A year later we&apos;re a small, distributed team supporting
          thousands of operators, founders, and finance leads who care more
          about answers than dashboards.
        </p>
      </>
    ),
  },
  {
    title: '3. What We Build',
    body: (
      <>
        <p>Our platform brings together what most teams stitch by hand:</p>
        <ul className="mt-3 ml-5 list-disc flex flex-col gap-2">
          <li>Live revenue, retention, and growth metrics in one place.</li>
          <li>Time-tracking and project visibility for billable teams.</li>
          <li>Automations that turn repetitive workflows into one-click rituals.</li>
          <li>Integrations with the tools you already use — no migrations required.</li>
        </ul>
      </>
    ),
  },
  {
    title: '4. How We Work',
    body: (
      <>
        <p>
          We ship small, ship often, and obsess over the smallest details.
          Every feature has a single owner, every release is reviewed by the
          whole team, and every customer email gets a real reply.
        </p>
        <p className="mt-3">
          We&apos;re remote-first, async-by-default, and bias toward writing
          things down — so anyone can catch up at any time, in any timezone.
        </p>
      </>
    ),
  },
  {
    title: '5. Our Values',
    body: (
      <>
        <ul className="ml-5 list-disc flex flex-col gap-2">
          <li>
            <strong>Clarity over volume.</strong> One useful chart beats ten
            cluttered ones.
          </li>
          <li>
            <strong>Trust the user.</strong> Defaults should be sensible;
            controls should be there when needed.
          </li>
          <li>
            <strong>Speed is a feature.</strong> If it takes more than a
            second, it&apos;s a bug.
          </li>
          <li>
            <strong>Quietly opinionated.</strong> Strong defaults, no nags.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: '6. The Team',
    body: (
      <>
        <p>
          We&apos;re a team of nine — engineers, designers, and a writer —
          spread across five countries. We&apos;ve previously built tools for
          teams at Stripe, Linear, Notion, and Figma, and we bring that
          taste-and-craft mindset to everything we ship.
        </p>
      </>
    ),
  },
  {
    title: '7. Where We’re Headed',
    body: (
      <>
        <p>
          We&apos;re still very early. The roadmap for the next year focuses
          on three things: deeper integrations, smarter forecasting, and
          collaborative reporting that actually feels collaborative. If any of
          that excites you, we&apos;d love to hear from you.
        </p>
      </>
    ),
  },
  {
    title: '8. Get in Touch',
    body: (
      <>
        <p>
          Questions, feedback, partnerships, or just want to say hello? Reach
          us at{' '}
          <a
            href="mailto:hello@launchpad.app"
            style={{ color: 'var(--accent)' }}
            className="underline-offset-2 hover:underline"
          >
            hello@launchpad.app
          </a>
          . We read every message.
        </p>
      </>
    ),
  },
];

export default function About() {
  return (
    <main
      className="overflow-x-hidden"
      style={{ background: 'var(--bg)', minHeight: '100vh' }}
    >
      <MarketingNav />

      {/* Hero */}
      <section
        className="px-5 md:px-8 pt-12 md:pt-16 pb-16 md:pb-20 text-center"
      >
        <div className="max-w-[1200px] mx-auto">
          <h1
            style={{
              fontFamily: 'var(--font-display-family)',
              color: 'var(--text)',
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
            }}
          >
            About LaunchPad
          </h1>
          <p
            className="mx-auto mt-4 text-sm"
            style={{ color: 'var(--muted)' }}
          >
            Last updated: April 29, 2026
          </p>
        </div>
      </section>

      {/* Body */}
      <section
        className="px-5 md:px-8 py-16 md:py-24"
        style={{ background: 'var(--surface)' }}
      >
        <div className="max-w-[720px] mx-auto flex flex-col gap-10 md:gap-12">
          {sections.map((s) => (
            <article key={s.title}>
              <h2
                className="mb-4"
                style={{
                  fontFamily: 'var(--font-display-family)',
                  color: 'var(--text)',
                  fontSize: 'clamp(1.375rem, 2.5vw, 1.75rem)',
                  fontWeight: 400,
                  letterSpacing: '-0.01em',
                  lineHeight: 1.25,
                }}
              >
                {s.title}
              </h2>
              <div
                className="text-sm md:text-[0.95rem]"
                style={{ color: 'var(--muted)', lineHeight: 1.7 }}
              >
                {s.body}
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
