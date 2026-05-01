'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { DashboardMockup } from './DashboardMockup';

interface HeroProps {
  eyebrow?: string;
  title?: React.ReactNode;
  description?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export function Hero({
  eyebrow = 'Real-Time Analytics For Product Teams',
  title = (
    <>
      See The Metrics That
      <br />
      Move Your Business.
    </>
  ),
  description = 'Stream events, build dashboards, and ship insights without writing a line of SQL. Built for teams that move fast on data.',
  primaryCta = { label: 'Start free', href: '/signup' },
  secondaryCta = { label: 'See it in action', href: '#features' },
}: HeroProps) {
  return (
    <section
      className="relative overflow-hidden border-b"
      style={{
        borderColor: 'color-mix(in srgb, var(--text) 8%, transparent)',
        background: `
          radial-gradient(ellipse 60% 70% at 18% 35%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 60%),
          radial-gradient(ellipse 55% 65% at 82% 60%, rgba(248, 180, 131, 0.42), transparent 60%),
          radial-gradient(ellipse 70% 50% at 60% 100%, rgba(248, 180, 131, 0.22), transparent 60%),
          radial-gradient(ellipse 40% 40% at 30% 0%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 60%),
          var(--surface)
        `,
      }}
    >
      {/* Text content */}
      <div className="px-6 md:px-12 pt-16 md:pt-24 text-center">
            {/* Eyebrow pill */}
            <div className="flex justify-center mb-7">
              <div
                className="inline-flex items-center px-4 py-1.5 text-xs font-medium border"
                style={{
                  background: 'var(--surface)',
                  borderColor: 'color-mix(in srgb, var(--text) 10%, transparent)',
                  color: 'var(--text)',
                  borderRadius: '9999px',
                  letterSpacing: '0.01em',
                }}
              >
                {eyebrow}
              </div>
            </div>

            {/* Headline */}
            <h1
              className="mx-auto"
              style={{
                fontFamily: 'var(--font-display-family)',
                color: 'var(--text)',
                fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
                fontWeight: 500,
                letterSpacing: '-0.04em',
                lineHeight: 1.02,
              }}
            >
              {title}
            </h1>

            {/* Sub-headline */}
            <p
              className="mx-auto mt-6 max-w-xl text-sm md:text-base"
              style={{
                color: 'var(--muted)',
                lineHeight: 1.6,
                letterSpacing: '-0.005em',
              }}
            >
              {description}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-9">
              <Link
                href={primaryCta.href}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-[transform,filter] duration-150 hover:brightness-95 active:scale-[0.98]"
                style={{
                  background: 'var(--text)',
                  color: 'var(--surface)',
                  borderRadius: '9999px',
                  letterSpacing: '-0.005em',
                }}
              >
                {primaryCta.label}
                <span
                  className="inline-flex items-center justify-center w-5 h-5 rounded-full"
                  style={{ background: 'var(--surface)', color: 'var(--text)' }}
                >
                  <ArrowRight size={11} />
                </span>
              </Link>

              <Link
                href={secondaryCta.href}
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold transition-opacity hover:opacity-70"
                style={{ color: 'var(--text)' }}
              >
                {secondaryCta.label}
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

      {/* Dashboard mockup — full-bleed inside the hero band, the unified
          shell's rounded corners clip its edges cleanly. */}
      <div className="mt-10 md:mt-14">
        <DashboardMockup className="w-full h-auto block" />
      </div>
    </section>
  );
}
