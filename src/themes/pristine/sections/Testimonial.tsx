'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote as QuoteIcon } from 'lucide-react';

interface Testimonial {
  name: string;
  handle: string;
  role: string;
  quote: string;
  /** Optional photo URL — falls back to gradient + initial portrait. */
  image?: string;
  /** Used when no `image` is provided (gradient bg). */
  portraitColor?: string;
  initial: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Jones',
    handle: '@sarahjones',
    role: 'VP of Product',
    quote:
      'This is the first analytics tool the entire org actually uses. Our weekly stand-ups now open with data instead of opinions, and we\'ve shipped twice as many bets in the last quarter as we did all of last year.',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=80&auto=format&fit=crop',
    initial: 'S',
  },
  {
    name: 'Towhidix',
    handle: '@towhidix',
    role: 'Co-Founder',
    quote:
      'It completely changed how our team makes decisions. We moved from gut-feel debates to data-led calls in under a week. The dashboards are fast, the SQL workbench is a dream, and our entire org now opens metrics on Slack first thing every morning.',
    portraitColor: '#1F2937',
    initial: 'T',
  },
  {
    name: 'Liam Cole',
    handle: '@liam.cole',
    role: 'Lead Designer',
    quote:
      'I was skeptical analytics could be designed well — but the UI is genuinely a joy. We replaced two paid tools and the data team finally has time to ship features instead of fielding ad-hoc queries.',
    portraitColor: '#494AF6',
    initial: 'L',
  },
  {
    name: 'Ahmar Saeed',
    handle: '@ahmar.s',
    role: 'Head of Data',
    quote:
      'We migrated from a legacy product analytics tool and didn\'t lose a beat. The migration tooling, warehouse sync, and funnel builder all just worked. Our PMs are unblocked — best decision we made this year.',
    portraitColor: '#0E9384',
    initial: 'A',
  },
  {
    name: 'Abdullah K.',
    handle: '@abdullah.k',
    role: 'Head of Growth',
    quote:
      'The auto-insights surfaced a 14% leak in our onboarding funnel that we\'d been chasing for months. It paid for itself in week one — and the team finally has a single source of truth.',
    portraitColor: '#F8B483',
    initial: 'A',
  },
];

export function Testimonial() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = testimonials[activeIdx];
  const total = testimonials.length;

  const prev = () => setActiveIdx((i) => (i - 1 + total) % total);
  const next = () => setActiveIdx((i) => (i + 1) % total);

  return (
    <section
      id="testimonial"
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
                TESTIMONIAL
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
              Trusted By Teams Worldwide
            </h2>
            <p
              className="mx-auto mt-5 max-w-md text-sm md:text-base"
              style={{
                color: 'var(--muted)',
                lineHeight: 1.6,
                letterSpacing: '-0.005em',
              }}
            >
              Hear from product, data, and growth leaders running their
              workspaces on the platform.
            </p>
      </div>

      {/* Active testimonial */}
      <div className="grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-6 md:gap-10 px-6 md:px-10 pb-16 md:pb-20">
            {/* Left: portrait */}
            <Portrait key={`portrait-${activeIdx}`} testimonial={active} />

            {/* Right: quote + author + nav */}
            <div className="flex flex-col">
              <QuoteIcon
                size={28}
                style={{
                  color: 'color-mix(in srgb, var(--accent) 60%, transparent)',
                }}
                strokeWidth={2}
              />
              <p
                className="mt-4 text-base md:text-xl"
                style={{
                  color: 'var(--text)',
                  lineHeight: 1.55,
                  letterSpacing: '-0.01em',
                }}
              >
                {active.quote}
              </p>

              {/* Author + nav row */}
              <div
                className="mt-auto pt-6 border-t flex items-end justify-between gap-4"
                style={{
                  borderColor: 'color-mix(in srgb, var(--text) 8%, transparent)',
                }}
              >
                <div>
                  <div
                    className="font-semibold"
                    style={{ color: 'var(--text)', letterSpacing: '-0.01em' }}
                  >
                    {active.name}
                  </div>
                  <div className="text-sm" style={{ color: 'var(--muted)' }}>
                    {active.role} · {active.handle}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <NavButton
                    onClick={prev}
                    label="Previous testimonial"
                    icon={<ChevronLeft size={18} strokeWidth={2.25} />}
                  />
                  <NavButton
                    onClick={next}
                    label="Next testimonial"
                    icon={<ChevronRight size={18} strokeWidth={2.25} />}
                  />
                </div>
              </div>
            </div>
          </div>
    </section>
  );
}

function Portrait({ testimonial }: { testimonial: Testimonial }) {
  const fallbackColor = testimonial.portraitColor ?? '#1F2937';
  return (
    <div
      className="relative overflow-hidden"
      style={{
        aspectRatio: '4 / 5',
        borderRadius: '1.25rem',
        background: testimonial.image
          ? '#1F2937'
          : `radial-gradient(circle at 30% 25%, color-mix(in srgb, ${fallbackColor} 60%, white), ${fallbackColor}), ${fallbackColor}`,
      }}
    >
      {testimonial.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <>
          {/* Subtle dotted texture */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(255, 255, 255, 0.07) 1px, transparent 1px)',
              backgroundSize: '14px 14px',
            }}
          />
          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 70% 80%, transparent 30%, rgba(0, 0, 0, 0.4) 100%)',
            }}
          />
          {/* Initial */}
          <span
            className="absolute inset-0 flex items-center justify-center text-white select-none"
            style={{
              fontFamily: 'var(--font-display-family)',
              fontSize: 'clamp(8rem, 18vw, 14rem)',
              fontWeight: 500,
              letterSpacing: '-0.05em',
              lineHeight: 1,
              opacity: 0.95,
            }}
          >
            {testimonial.initial}
          </span>
        </>
      )}
    </div>
  );
}

function NavButton({
  onClick,
  label,
  icon,
}: {
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="w-10 h-10 rounded-full border flex items-center justify-center transition-[background,border-color,transform] duration-150 hover:-translate-y-[1px] active:translate-y-0 hover:bg-[color:color-mix(in_srgb,var(--accent)_8%,var(--surface))]"
      style={{
        background: 'var(--surface)',
        borderColor: 'color-mix(in srgb, var(--text) 12%, transparent)',
        color: 'var(--text)',
      }}
    >
      {icon}
    </button>
  );
}
