'use client';
import { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface QA {
  q: string;
  a: string;
}

const items: QA[] = [
  {
    q: 'Can I try the product before upgrading?',
    a: 'Yes! Our Starter plan is free to use — no credit card required.',
  },
  {
    q: 'What happens if I reach my usage limit?',
    a: 'You’ll get a friendly heads-up when you’re close. Nothing breaks — you can upgrade in one click or wait for your next cycle.',
  },
  {
    q: 'Can I cancel my subscription anytime?',
    a: 'Absolutely. Cancel from your billing settings — your plan stays active until the end of the current period, no questions asked.',
  },
  {
    q: 'Is my data secure with your platform?',
    a: 'Your data is encrypted in transit and at rest. We’re SOC 2 Type II compliant and never share your data with third parties.',
  },
  {
    q: 'Do you offer discounts for teams or nonprofits?',
    a: 'Yes — we offer dedicated team pricing and a 30% discount for verified nonprofits and educational organizations.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="px-5 md:px-8 py-16 md:py-24">
      <div className="max-w-[1000px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
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
              FAQ
            </div>
          </div>
          <h2
            className="mx-auto"
            style={{
              fontFamily: 'var(--font-display-family)',
              color: 'var(--text)',
              fontSize: 'clamp(2.25rem, 6vw, 4rem)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
            }}
          >
            Need help?
          </h2>
          <p
            className="mx-auto mt-5 max-w-xl text-sm md:text-base"
            style={{ color: 'var(--muted)', lineHeight: 1.6 }}
          >
            Whether you&apos;re a small startup, a growing mid-sized business,
            or a large enterprise, we&apos;re here to make things simple and
            support you at every step.
          </p>
        </div>

        {/* List */}
        <div
          className="border-t"
          style={{ borderColor: 'var(--border)' }}
        >
          {items.map((item, i) => (
            <FaqRow
              key={item.q}
              item={item}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqRow({
  item,
  open,
  onToggle,
}: {
  item: QA;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="border-b"
      style={{ borderColor: 'var(--border)' }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-6 py-6 md:py-7 text-left transition-colors"
      >
        <span
          style={{
            fontFamily: 'var(--font-display-family)',
            color: 'var(--text)',
            fontSize: 'clamp(1.125rem, 2vw, 1.4rem)',
            fontWeight: 400,
            letterSpacing: '-0.005em',
            lineHeight: 1.3,
          }}
        >
          {item.q}
        </span>
        <span
          className="w-9 h-9 rounded-full border flex items-center justify-center shrink-0 transition-colors"
          style={{
            background: 'var(--surface)',
            borderColor: open
              ? 'color-mix(in srgb, var(--accent) 35%, transparent)'
              : 'var(--border)',
            color: 'var(--accent)',
          }}
        >
          {open ? <X size={16} strokeWidth={2.25} /> : <Plus size={16} strokeWidth={2.25} />}
        </span>
      </button>

      {open && (
        <div
          className="pb-6 md:pb-7 pr-14 text-sm md:text-base"
          style={{ color: 'var(--muted)', lineHeight: 1.65 }}
        >
          {item.a}
        </div>
      )}
    </div>
  );
}
