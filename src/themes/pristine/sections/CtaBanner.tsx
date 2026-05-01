'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface CtaBannerProps {
  eyebrow?: string;
  title?: React.ReactNode;
  description?: string;
  cta?: { label: string; href: string };
}

export function CtaBanner({
  eyebrow = 'CTA',
  title = (
    <>
      Stop Guessing.
      <br />
      Start Knowing.
    </>
  ),
  description = 'Spin up your first dashboard in 60 seconds. No credit card. Built for product teams that ship on data.',
  cta = { label: 'Start free today', href: '/signup' },
}: CtaBannerProps) {
  return (
    <section
      className="relative overflow-hidden text-center border-b"
      style={{
        background: '#0D0D12',
        color: '#FFFFFF',
        borderColor: 'rgba(255, 255, 255, 0.08)',
      }}
    >
      {/* Decorative geometric shapes — scale down on mobile */}
          <svg
            className="absolute top-0 right-0 pointer-events-none w-[160px] sm:w-[220px] md:w-[320px] h-auto"
            viewBox="0 0 320 220"
            preserveAspectRatio="xMaxYMin meet"
            fill="none"
            aria-hidden="true"
          >
            <path d="M 320 0 L 320 220 L 100 0 Z" fill="rgba(255,255,255,0.05)" />
            <path d="M 320 0 L 320 130 L 190 0 Z" fill="rgba(255,255,255,0.04)" />
          </svg>
          <svg
            className="absolute bottom-0 left-0 pointer-events-none w-[160px] sm:w-[220px] md:w-[320px] h-auto"
            viewBox="0 0 320 220"
            preserveAspectRatio="xMinYMax meet"
            fill="none"
            aria-hidden="true"
          >
            <path d="M 0 220 L 0 0 L 220 220 Z" fill="rgba(255,255,255,0.05)" />
            <path d="M 0 220 L 0 90 L 130 220 Z" fill="rgba(255,255,255,0.04)" />
          </svg>

          {/* Subtle accent halo */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 50% 60% at 50% 0%, color-mix(in srgb, var(--accent) 18%, transparent), transparent 60%)
              `,
            }}
          />

          {/* Content */}
          <div className="relative px-6 py-16 md:py-20">
            {/* Eyebrow pill */}
            <div className="flex justify-center mb-6">
              <div
                className="inline-flex items-center px-3.5 py-1 text-[11px] font-semibold tracking-[0.18em]"
                style={{
                  background: '#FFFFFF',
                  color: '#0D0D12',
                  borderRadius: '9999px',
                }}
              >
                {eyebrow}
              </div>
            </div>

            {/* Title */}
            <h2
              className="mx-auto"
              style={{
                fontFamily: 'var(--font-display-family)',
                color: '#FFFFFF',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 500,
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
              }}
            >
              {title}
            </h2>

            {/* Description */}
            <p
              className="mx-auto mt-5 max-w-md text-sm md:text-base"
              style={{
                color: 'rgba(255, 255, 255, 0.65)',
                lineHeight: 1.6,
                letterSpacing: '-0.005em',
              }}
            >
              {description}
            </p>

            {/* CTA button — white pill with arrow */}
            <div className="mt-9 flex justify-center">
              <Link
                href={cta.href}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-[transform,filter] duration-150 hover:brightness-95 active:scale-[0.98]"
                style={{
                  background: '#FFFFFF',
                  color: '#0D0D12',
                  borderRadius: '9999px',
                  letterSpacing: '-0.005em',
                }}
              >
                {cta.label}
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
    </section>
  );
}
