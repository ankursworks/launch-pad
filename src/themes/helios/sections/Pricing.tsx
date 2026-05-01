'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Check, Sparkles } from 'lucide-react';

type Billing = 'monthly' | 'yearly';

interface Plan {
  name: string;
  description: string;
  monthly: number;
  yearly: number;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

const plans: Plan[] = [
  {
    name: 'Starter',
    description: 'Great for freelancers or side projects just getting started.',
    monthly: 0,
    yearly: 0,
    features: [
      '1 workspace',
      'Up to 3 users',
      'Basic dashboards & charts',
      '2 active projects',
      '500 MB file storage',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Pro',
    description:
      'Built for growing teams that need power, flexibility, and speed.',
    monthly: 9,
    yearly: 86,
    features: [
      '1 workspace',
      'Up to 10 users',
      'Advanced analytics',
      'Unlimited projects & tasks',
      '100 GB file storage',
    ],
    highlighted: true,
    cta: 'Get Started',
  },
  {
    name: 'Enterprise',
    description: 'Everything your organization needs — plus hands-on support.',
    monthly: 19,
    yearly: 182,
    features: [
      '1 workspace',
      'Up to 3 users',
      'Basic dashboards & charts',
      '2 active projects',
      '500 MB file storage',
    ],
    cta: 'Get Started',
  },
];

export function Pricing() {
  const [billing, setBilling] = useState<Billing>('monthly');

  return (
    <section
      id="pricing"
      className="px-5 md:px-8 py-16 md:py-24 text-center"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-10 md:mb-12">
          <div className="flex justify-center mb-5">
            <div
              className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border"
              style={{
                background:
                  'color-mix(in srgb, var(--accent) 14%, transparent)',
                borderColor:
                  'color-mix(in srgb, var(--accent) 30%, transparent)',
                color: 'var(--accent)',
              }}
            >
              Plans
            </div>
          </div>
          <h2
            className="mx-auto"
            style={{
              fontFamily: 'var(--font-display-family)',
              color: 'var(--text)',
              fontSize: 'clamp(1.875rem, 4.5vw, 3.25rem)',
              fontWeight: 400,
              letterSpacing: '-0.015em',
              lineHeight: 1.15,
            }}
          >
            Supercharge your growth
          </h2>
          <p
            className="mx-auto mt-5 max-w-md text-sm md:text-base"
            style={{ color: 'var(--muted)', lineHeight: 1.6 }}
          >
            Whether you&apos;re just getting started or scaling fast — choose a
            plan that fits your pace. Simple pricing. No surprises. Cancel
            anytime.
          </p>
        </div>

        {/* Billing toggle */}
        <BillingToggle billing={billing} onChange={setBilling} />

        {/* 3 plan cards */}
        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {plans.map((p) => (
            <PlanCard key={p.name} plan={p} billing={billing} />
          ))}
        </div>

        {/* Compare plans pill */}
        <div className="mt-10 flex justify-center">
          <Link
            href="#compare"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold transition-[transform,filter] duration-150 hover:brightness-95 active:scale-[0.98]"
            style={{
              background: 'var(--accent)',
              color: '#FFFFFF',
              borderRadius: 'var(--btn-radius)',
              letterSpacing: '-0.005em',
            }}
          >
            Compare plans
          </Link>
        </div>
      </div>
    </section>
  );
}

function BillingToggle({
  billing,
  onChange,
}: {
  billing: Billing;
  onChange: (b: Billing) => void;
}) {
  return (
    <div
      className="inline-flex items-center p-1 border"
      style={{
        background: 'var(--surface)',
        borderColor: 'var(--border)',
        borderRadius: '9999px',
      }}
    >
      <ToggleButton
        active={billing === 'monthly'}
        onClick={() => onChange('monthly')}
      >
        Monthly
      </ToggleButton>
      <ToggleButton
        active={billing === 'yearly'}
        onClick={() => onChange('yearly')}
      >
        <span className="inline-flex items-center gap-2">
          Yearly
          <span
            className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-semibold rounded-full"
            style={{
              background:
                'color-mix(in srgb, var(--accent) 14%, transparent)',
              color: 'var(--accent)',
            }}
          >
            Save 20%
          </span>
        </span>
      </ToggleButton>
    </div>
  );
}

function ToggleButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-4 py-2 text-xs font-semibold transition-colors"
      style={{
        background: active ? 'var(--text)' : 'transparent',
        color: active ? 'var(--bg)' : 'var(--muted)',
        borderRadius: '9999px',
      }}
    >
      {children}
    </button>
  );
}

function PlanCard({ plan, billing }: { plan: Plan; billing: Billing }) {
  const price = billing === 'monthly' ? plan.monthly : plan.yearly;
  const suffix = billing === 'monthly' ? '/month' : '/year';
  const highlighted = !!plan.highlighted;

  return (
    <article
      className="border text-left flex flex-col relative"
      style={{
        background: highlighted
          ? 'color-mix(in srgb, var(--accent) 10%, var(--surface))'
          : 'var(--surface)',
        borderColor: highlighted
          ? 'color-mix(in srgb, var(--accent) 50%, transparent)'
          : 'var(--border)',
        borderRadius: 'var(--card-radius)',
        padding: '1.75rem',
      }}
    >
      {highlighted && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 text-[11px] font-semibold rounded-full shadow-sm"
          style={{
            background: 'var(--accent)',
            color: '#FFFFFF',
          }}
        >
          <Sparkles size={11} />
          Popular
        </div>
      )}

      <h3
        style={{
          fontFamily: 'var(--font-display-family)',
          color: 'var(--text)',
          fontSize: '1.5rem',
          fontWeight: 400,
          letterSpacing: '-0.01em',
          lineHeight: 1.3,
        }}
      >
        {plan.name}
      </h3>
      <p
        className="mt-2 text-sm"
        style={{ color: 'var(--muted)', lineHeight: 1.6 }}
      >
        {plan.description}
      </p>

      {/* Price */}
      <div className="mt-6 flex items-end gap-1.5">
        <span
          style={{
            fontFamily: 'var(--font-display-family)',
            fontSize: '2.75rem',
            fontWeight: 400,
            color: 'var(--text)',
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          ${price}
        </span>
        <span
          className="text-xs pb-1"
          style={{ color: 'var(--muted)' }}
        >
          {suffix}
        </span>
      </div>

      {/* Divider */}
      <div
        className="my-6 h-px"
        style={{
          background: highlighted
            ? 'color-mix(in srgb, var(--accent) 25%, transparent)'
            : 'var(--border)',
        }}
      />

      {/* Features */}
      <ul className="flex flex-col gap-3 mb-7">
        {plan.features.map((f) => (
          <li
            key={f}
            className="flex items-center gap-2.5 text-sm"
            style={{ color: 'var(--text)' }}
          >
            <span
              className="inline-flex items-center justify-center w-4 h-4 rounded-full shrink-0"
              style={{
                background:
                  'color-mix(in srgb, var(--accent) 16%, transparent)',
                color: 'var(--accent)',
              }}
            >
              <Check size={11} strokeWidth={3} />
            </span>
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href="#signup"
        className="mt-auto inline-flex items-center justify-center px-5 py-3 text-sm font-semibold transition-[transform,filter] duration-150 hover:brightness-95 active:scale-[0.98]"
        style={{
          background: highlighted ? 'var(--accent)' : 'var(--text)',
          color: highlighted ? '#FFFFFF' : 'var(--bg)',
          borderRadius: 'var(--btn-radius)',
          letterSpacing: '-0.005em',
        }}
      >
        {plan.cta}
      </Link>
    </article>
  );
}
