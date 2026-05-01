'use client';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  Command,
  Crown,
  Gem,
  type LucideIcon,
} from 'lucide-react';

interface Plan {
  name: string;
  tagline: string;
  price: string;
  period?: string;
  cta: { label: string; href: string };
  badge: string;
  icon: LucideIcon;
  features: string[];
  featured?: boolean;
}

const plans: Plan[] = [
  {
    name: 'Starter',
    tagline: 'For solo founders & side projects',
    price: '$0',
    period: '/month',
    cta: { label: 'Get started', href: '/signup' },
    badge: 'Free plan',
    icon: Gem,
    features: [
      'Up to 50K events / month',
      '3 dashboards',
      '7-day data retention',
      '1 team member',
      'Email support',
    ],
  },
  {
    name: 'Growth',
    tagline: 'For growing product teams',
    price: '$29',
    period: '/month',
    cta: { label: 'Start 14-day trial', href: '/signup' },
    badge: 'Most popular',
    icon: Command,
    featured: true,
    features: [
      'Up to 1M events / month',
      'Unlimited dashboards',
      '90-day data retention',
      'SQL workbench & alerts',
      '10 team members',
    ],
  },
  {
    name: 'Enterprise',
    tagline: 'For data-led organizations',
    price: 'Custom',
    cta: { label: 'Contact sales', href: '#contact' },
    badge: 'Enterprise',
    icon: Crown,
    features: [
      'Unlimited events & retention',
      'SSO + audit log',
      'Dedicated CSM',
      'Custom data residency',
      'Unlimited team members',
    ],
  },
];

export function Pricing() {
  return (
    <section
      id="pricing"
      className="border-b"
      style={{ borderColor: 'color-mix(in srgb, var(--text) 8%, transparent)' }}
    >
      {/* Header */}
      <div className="text-center pt-16 md:pt-20 pb-12 md:pb-14 px-6">
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
                PRICING
              </div>
            </div>
            <h2
              className="mx-auto"
              style={{
                fontFamily: 'var(--font-display-family)',
                color: 'var(--text)',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 500,
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
              }}
            >
              Flexible Pricing Plans
            </h2>
            <p
              className="mx-auto mt-5 max-w-md text-sm md:text-base"
              style={{
                color: 'var(--muted)',
                lineHeight: 1.6,
                letterSpacing: '-0.005em',
              }}
            >
              Choose a plan that fits your needs with flexible pricing and
              options for every stage of growth.
            </p>
          </div>

      {/* Plan grid */}
      <div className="grid md:grid-cols-3 gap-3 md:gap-4 px-6 md:px-10 pb-16 md:pb-20">
        {plans.map((plan) => (
          <PlanCard key={plan.name} plan={plan} />
        ))}
      </div>
    </section>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  const Icon = plan.icon;
  return (
    <article
      className="border p-6 md:p-7 flex flex-col h-full transition-shadow"
      style={{
        borderRadius: '1.25rem',
        borderColor: plan.featured
          ? 'color-mix(in srgb, var(--accent) 30%, transparent)'
          : 'color-mix(in srgb, var(--text) 8%, transparent)',
        background: 'var(--surface)',
        boxShadow: plan.featured
          ? '0 12px 28px -10px color-mix(in srgb, var(--accent) 25%, transparent)'
          : 'none',
      }}
    >
      {/* Top row: icon + badge */}
      <div className="flex items-start justify-between mb-6">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{
            background: plan.featured ? 'var(--accent)' : 'var(--text)',
            color: '#FFFFFF',
            boxShadow: plan.featured
              ? '0 6px 14px -4px color-mix(in srgb, var(--accent) 40%, transparent)'
              : 'none',
          }}
        >
          <Icon size={20} />
        </div>
        <span
          className="text-[11px] font-semibold px-3 py-1 border"
          style={{
            background: plan.featured
              ? 'color-mix(in srgb, var(--accent) 12%, transparent)'
              : 'var(--surface)',
            borderColor: plan.featured
              ? 'color-mix(in srgb, var(--accent) 30%, transparent)'
              : 'color-mix(in srgb, var(--text) 10%, transparent)',
            color: plan.featured ? 'var(--accent)' : 'var(--muted)',
            borderRadius: '9999px',
          }}
        >
          {plan.badge}
        </span>
      </div>

      {/* Plan name + tagline */}
      <h3
        className="mb-1"
        style={{
          fontFamily: 'var(--font-display-family)',
          color: 'var(--text)',
          fontSize: '1.5rem',
          fontWeight: 500,
          letterSpacing: '-0.02em',
          lineHeight: 1.2,
        }}
      >
        {plan.name}
      </h3>
      <p className="text-sm" style={{ color: 'var(--muted)' }}>
        {plan.tagline}
      </p>

      {/* Price */}
      <div className="mt-7 flex items-baseline gap-1.5">
        <span
          style={{
            fontFamily: 'var(--font-display-family)',
            color: 'var(--text)',
            fontSize: '3rem',
            fontWeight: 500,
            letterSpacing: '-0.03em',
            lineHeight: 1,
          }}
        >
          {plan.price}
        </span>
        {plan.period && (
          <span className="text-sm" style={{ color: 'var(--muted)' }}>
            {plan.period}
          </span>
        )}
      </div>

      {/* CTA */}
      <Link
        href={plan.cta.href}
        className="mt-6 inline-flex items-center justify-center gap-2 py-3 text-sm font-semibold border transition-[transform,filter] duration-150 hover:brightness-95 active:scale-[0.99]"
        style={{
          background: plan.featured ? 'var(--accent)' : 'var(--surface)',
          color: plan.featured ? '#FFFFFF' : 'var(--text)',
          borderColor: plan.featured
            ? 'transparent'
            : 'color-mix(in srgb, var(--text) 12%, transparent)',
          borderRadius: '9999px',
        }}
      >
        {plan.cta.label}
        {plan.featured && <ArrowRight size={14} />}
      </Link>

      {/* Features */}
      <ul className="mt-7 space-y-3.5 flex-1">
        {plan.features.map((f) => (
          <li
            key={f}
            className="flex items-center gap-2.5 text-sm"
            style={{ color: 'var(--text)' }}
          >
            <Check
              size={14}
              strokeWidth={2.5}
              style={{ color: 'var(--muted)', flexShrink: 0 }}
            />
            {f}
          </li>
        ))}
      </ul>
    </article>
  );
}
