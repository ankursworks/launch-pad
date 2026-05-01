'use client';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { DashboardMockup } from './DashboardMockup';

interface HeroProps {
  title?: React.ReactNode;
  description?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

const avatarUrls = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80&auto=format&fit=crop',
];

export function Hero({
  title = (
    <>
      A smarter way to ship
      <br />
      with data — built for
      <br />
      clarity and speed
    </>
  ),
  description = 'All-in-one analytics platform to track, analyze, and optimize every metric that matters. Clear insights. Zero complexity. Maximum impact.',
  primaryCta = { label: 'Start Free Trial', href: '/signup' },
  secondaryCta = { label: 'Book a Live Demo', href: '#contact' },
}: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-5 md:px-8 pt-12 md:pt-20 text-center">
        {/* Headline */}
        <h1
          className="mx-auto"
          style={{
            fontFamily: 'var(--font-display-family)',
            color: 'var(--text)',
            fontSize: 'clamp(2.25rem, 6vw, 4rem)',
            fontWeight: 400,
            letterSpacing: '-0.015em',
            lineHeight: 1.12,
          }}
        >
          {title}
        </h1>

        {/* Sub */}
        <p
          className="mx-auto mt-6 max-w-xl text-sm md:text-base"
          style={{
            color: 'var(--muted)',
            lineHeight: 1.6,
          }}
        >
          {description}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-9">
          <Link
            href={primaryCta.href}
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold transition-[transform,filter] duration-150 hover:brightness-95 active:scale-[0.98]"
            style={{
              background: 'var(--accent)',
              color: '#FFFFFF',
              borderRadius: 'var(--btn-radius)',
              letterSpacing: '-0.005em',
              minWidth: '160px',
            }}
          >
            {primaryCta.label}
          </Link>
          <Link
            href={secondaryCta.href}
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold transition-[transform,filter] duration-150 hover:brightness-95 active:scale-[0.98]"
            style={{
              background: 'var(--text)',
              color: 'var(--bg)',
              borderRadius: 'var(--btn-radius)',
              letterSpacing: '-0.005em',
              minWidth: '160px',
            }}
          >
            {secondaryCta.label}
          </Link>
        </div>

        {/* Social proof: avatars + rating */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-7">
          <div className="flex -space-x-2">
            {avatarUrls.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={src}
                alt=""
                className="w-9 h-9 rounded-full object-cover border-2"
                style={{
                  borderColor: 'var(--bg)',
                  zIndex: avatarUrls.length - i,
                }}
              />
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--text)' }}>
            <span style={{ color: 'var(--muted)' }}>Rated</span>
            <Star size={14} fill="var(--accent)" stroke="var(--accent)" />
            <span className="font-semibold">4.9</span>
            <span style={{ color: 'var(--muted)' }}>by over 12,000+ users</span>
          </div>
        </div>
      </div>

      {/* Dashboard mockup peeks below */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 mt-14 md:mt-20 pb-0">
        <DashboardMockup className="w-full h-auto block" />
      </div>
    </section>
  );
}
