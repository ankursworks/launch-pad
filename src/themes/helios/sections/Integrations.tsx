'use client';
import Link from 'next/link';
import {
  AlignCenter,
  AlignJustify,
  ArrowRight,
  Box,
  Boxes,
  Disc,
  Eye,
  Hexagon,
  Layers3,
  MessageCircle,
  Sparkle,
  Sparkles,
  StarHalf,
  Sun,
  Triangle,
  Waves,
  Zap,
  type LucideIcon,
} from 'lucide-react';

interface LogoMark {
  icon: LucideIcon;
  color: string;
}

const communicationLogos: LogoMark[] = [
  { icon: MessageCircle, color: '#8B5CF6' },
  { icon: AlignJustify, color: '#DC2626' },
  { icon: Sparkles, color: '#3B82F6' },
  { icon: Disc, color: '#F97316' },
  { icon: Hexagon, color: '#06B6D4' },
  { icon: Layers3, color: '#10B981' },
  { icon: StarHalf, color: '#6366F1' },
  { icon: AlignCenter, color: '#EF4444' },
];

const designLogos: LogoMark[] = [
  { icon: Box, color: '#6366F1' },
  { icon: Eye, color: '#A855F7' },
  { icon: Zap, color: '#EF4444' },
  { icon: Sun, color: '#F59E0B' },
  { icon: Triangle, color: '#3B82F6' },
  { icon: Waves, color: '#A855F7' },
  { icon: Boxes, color: '#64748B' },
  { icon: Sparkle, color: '#A855F7' },
];

export function Integrations() {
  return (
    <section className="px-5 md:px-8 py-16 md:py-24 text-center">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-14">
          <div className="flex justify-center mb-5">
            <div
              className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border"
              style={{
                background: 'color-mix(in srgb, var(--accent) 14%, transparent)',
                borderColor: 'color-mix(in srgb, var(--accent) 30%, transparent)',
                color: 'var(--accent)',
              }}
            >
              Integrations
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
            Connect Your Favourite Tools
          </h2>
          <p
            className="mx-auto mt-5 max-w-xl text-sm md:text-base"
            style={{ color: 'var(--muted)', lineHeight: 1.6 }}
          >
            Bring all your essential apps into one unified workflow — no
            switching tabs, no lost time. Integrate smoothly and keep
            everything in sync.
          </p>
        </div>

        {/* 2 category cards */}
        <div className="grid md:grid-cols-2 gap-5">
          <CategoryCard
            title="Communication Apps"
            description="Over 20+ ways to stay connected and collaborate in real time."
            cta="Explore integrations"
            logos={communicationLogos}
          />
          <CategoryCard
            title="Product & Design Apps"
            description="8+ tools to boost your creative process and streamline delivery."
            cta="Explore integrations"
            logos={designLogos}
          />
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 md:mt-12 flex justify-center">
          <Link
            href="#integrations"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold transition-[transform,filter] duration-150 hover:brightness-95 active:scale-[0.98]"
            style={{
              background: 'var(--accent)',
              color: '#FFFFFF',
              borderRadius: 'var(--btn-radius)',
              letterSpacing: '-0.005em',
            }}
          >
            View All (28+)
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function CategoryCard({
  title,
  description,
  cta,
  logos,
}: {
  title: string;
  description: string;
  cta: string;
  logos: LogoMark[];
}) {
  return (
    <article
      className="border text-left flex flex-col"
      style={{
        background: 'var(--panel)',
        borderColor: 'var(--border)',
        borderRadius: 'var(--card-radius)',
        padding: '1.75rem',
      }}
    >
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
        {title}
      </h3>
      <p
        className="mt-2 text-sm"
        style={{ color: 'var(--muted)', lineHeight: 1.6 }}
      >
        {description}
      </p>

      <Link
        href="#integrations"
        className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold w-max transition-[transform,filter] duration-150 hover:brightness-95 active:scale-[0.98]"
        style={{
          background: 'var(--text)',
          color: 'var(--bg)',
          borderRadius: '0.5rem',
        }}
      >
        {cta}
        <ArrowRight size={12} />
      </Link>

      {/* Logo row — clipped + masked on the right edge for "more available" feel */}
      <div
        className="relative mt-7 overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(90deg, black 0%, black 80%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(90deg, black 0%, black 80%, transparent 100%)',
        }}
      >
        <div className="flex gap-2">
          {logos.map((l, i) => (
            <LogoTile key={i} {...l} />
          ))}
        </div>
      </div>
    </article>
  );
}

function LogoTile({ icon: Icon, color }: LogoMark) {
  return (
    <div
      className="w-11 h-11 rounded-lg border flex items-center justify-center shrink-0 shadow-sm"
      style={{
        background: 'var(--surface)',
        borderColor: 'var(--border)',
      }}
    >
      <Icon size={18} style={{ color }} strokeWidth={2} />
    </div>
  );
}
