'use client';
import {
  BarChart3,
  Lightbulb,
  RotateCcw,
  Sparkles,
  SquareStack,
  Users,
} from 'lucide-react';

interface Benefit {
  icon: React.ComponentType<{ size?: number | string }>;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    icon: Lightbulb,
    title: 'Real-time event visibility',
    description:
      'Watch every event flow into dashboards as it happens — no batch delays, no stale numbers.',
  },
  {
    icon: SquareStack,
    title: 'Pipeline forecasting',
    description:
      'Project revenue, retention, and churn weeks ahead with built-in models. No data team required.',
  },
  {
    icon: BarChart3,
    title: 'Funnel & cohort analysis',
    description:
      'Pinpoint where users drop off and which experiments lift conversion — across every cohort.',
  },
  {
    icon: Users,
    title: 'Self-serve for everyone',
    description:
      'Operators get answers without pinging engineering. Built-in workspaces for every team.',
  },
  {
    icon: RotateCcw,
    title: 'Insights, anywhere',
    description:
      'Slack alerts, email digests, mobile drilldowns. Your KPIs find you wherever you work.',
  },
  {
    icon: Sparkles,
    title: 'Smart anomaly alerts',
    description:
      'Get notified the moment metrics drift — before incidents reach customers or revenue.',
  },
];

export function Benefits() {
  return (
    <section
      id="benefits"
      className="border-b"
      style={{ borderColor: 'color-mix(in srgb, var(--text) 8%, transparent)' }}
    >
      {/* Header */}
      <div className="text-center pt-16 pb-12 md:pt-20 md:pb-14 px-6">
            <div className="flex justify-center mb-5">
              <div
                className="inline-flex items-center px-3.5 py-1 text-[11px] font-semibold border tracking-[0.18em]"
                style={{
                  background: 'var(--surface)',
                  borderColor: 'color-mix(in srgb, var(--text) 10%, transparent)',
                  color: 'var(--text)',
                  borderRadius: '9999px',
                }}
              >
                BENEFITS
              </div>
            </div>
            <h2
              className="mx-auto max-w-3xl"
              style={{
                fontFamily: 'var(--font-display-family)',
                color: 'var(--text)',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 500,
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
              }}
            >
              The Unfair Edge
              <br />
              Your Team Gets
            </h2>
            <p
              className="mx-auto mt-5 max-w-md text-sm md:text-base"
              style={{
                color: 'var(--muted)',
                lineHeight: 1.6,
                letterSpacing: '-0.005em',
              }}
            >
              Insights that surface themselves. Decisions in minutes, not days.
              The analytics layer your stack was missing.
            </p>
          </div>

      {/* Row 1 — top hairline divider */}
      <BenefitsRow items={benefits.slice(0, 3)} divideTop />
      {/* Row 2 — top hairline divider between the two rows */}
      <BenefitsRow items={benefits.slice(3, 6)} divideTop />
    </section>
  );
}

function BenefitsRow({
  items,
  divideTop,
}: {
  items: Benefit[];
  divideTop?: boolean;
}) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-3"
      style={{
        borderTop: divideTop
          ? '1px solid color-mix(in srgb, var(--text) 8%, transparent)'
          : undefined,
      }}
    >
      {items.map((b, i) => (
        <BenefitItem
          key={b.title}
          benefit={b}
          showDivider={i < items.length - 1}
        />
      ))}
    </div>
  );
}

function BenefitItem({
  benefit,
  showDivider,
}: {
  benefit: Benefit;
  showDivider: boolean;
}) {
  const Icon = benefit.icon;
  return (
    <div
      className="text-center px-6 md:px-8 py-10 md:py-12 relative"
      style={{
        borderRight: showDivider
          ? '1px solid color-mix(in srgb, var(--text) 8%, transparent)'
          : undefined,
      }}
    >
      <div
        className="mx-auto mb-5 inline-flex items-center justify-center"
        style={{ color: 'var(--accent)' }}
      >
        <Icon size={26} />
      </div>
      <h3
        className="mb-2"
        style={{
          fontFamily: 'var(--font-display-family)',
          color: 'var(--text)',
          fontSize: '1.125rem',
          fontWeight: 600,
          letterSpacing: '-0.015em',
          lineHeight: 1.3,
        }}
      >
        {benefit.title}
      </h3>
      <p
        className="mx-auto max-w-xs text-sm"
        style={{
          color: 'var(--muted)',
          lineHeight: 1.55,
          letterSpacing: '-0.005em',
        }}
      >
        {benefit.description}
      </p>
    </div>
  );
}
