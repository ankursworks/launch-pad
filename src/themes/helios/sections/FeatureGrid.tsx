'use client';
import Link from 'next/link';
import {
  Activity,
  BarChart3,
  Clock,
  FileText,
  Lightbulb,
  PenLine,
  Search,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

interface FeatureTile {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: FeatureTile[] = [
  {
    icon: Clock,
    title: 'Intelligent Analysis',
    description:
      'Get instant visibility into patterns, trends, and key data points in your workspace.',
  },
  {
    icon: PenLine,
    title: 'Change Tracking',
    description:
      'Easily track time, manage tasks, and measure productivity.',
  },
  {
    icon: Sparkles,
    title: 'Smart Suggestions',
    description:
      'Get adaptive tips that match your habits and boost daily efficiency.',
  },
  {
    icon: FileText,
    title: 'Fast Content Finder',
    description:
      'Find the information you need in seconds — using keywords, filters, or tags.',
  },
  {
    icon: BarChart3,
    title: 'Smart Insights',
    description:
      'Automatically detect data, risks, or anomalies in your workflows.',
  },
  {
    icon: Search,
    title: 'Rapid Search',
    description:
      'Find files, notes, or actions fast with intuitive filters and keyword lookup.',
  },
  {
    icon: Activity,
    title: 'Activity Logging',
    description:
      'See who did what, when — across all projects, tasks, and shared documents.',
  },
  {
    icon: Lightbulb,
    title: 'Contextual Tips',
    description:
      'Helpful, timely suggestions to keep your work flowing smoothly and efficiently.',
  },
];

export function FeatureGrid() {
  return (
    <section className="px-5 md:px-8 py-16 md:py-24 text-center">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-14">
          <div className="flex justify-center mb-5">
            <div
              className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full"
              style={{
                background: 'color-mix(in srgb, var(--accent) 14%, transparent)',
                color: 'var(--accent)',
              }}
            >
              Features
            </div>
          </div>
          <h2
            className="mx-auto"
            style={{
              fontFamily: 'var(--font-display-family)',
              color: 'var(--text)',
              fontSize: 'clamp(1.875rem, 4.5vw, 3rem)',
              fontWeight: 400,
              letterSpacing: '-0.015em',
              lineHeight: 1.15,
            }}
          >
            Over 100 Features in One App
          </h2>
          <p
            className="mx-auto mt-5 max-w-lg text-sm md:text-base"
            style={{ color: 'var(--muted)', lineHeight: 1.6 }}
          >
            Modern tools that simplify daily operations, save time, and help
            you focus on what truly matters. No complex setups. No unnecessary
            costs.
          </p>
        </div>

        {/* 4×2 grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((f) => (
            <Tile key={f.title} feature={f} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 md:mt-14 flex justify-center">
          <Link
            href="#features"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold transition-[transform,filter] duration-150 hover:brightness-95 active:scale-[0.98]"
            style={{
              background: 'var(--accent)',
              color: '#FFFFFF',
              borderRadius: 'var(--btn-radius)',
              letterSpacing: '-0.005em',
            }}
          >
            Explore All Features
          </Link>
        </div>
      </div>
    </section>
  );
}

function Tile({ feature }: { feature: FeatureTile }) {
  const Icon = feature.icon;
  return (
    <article
      className="border text-left flex flex-col h-full"
      style={{
        background: 'var(--panel)',
        borderColor: 'var(--border)',
        borderRadius: 'var(--card-radius)',
        padding: '1.25rem',
      }}
    >
      <span
        className="inline-flex items-center justify-center w-9 h-9 rounded-lg mb-5"
        style={{
          background: 'color-mix(in srgb, var(--accent) 14%, transparent)',
          color: 'var(--accent)',
        }}
      >
        <Icon size={16} strokeWidth={2} />
      </span>
      <h3
        className="mb-2"
        style={{
          fontFamily: 'var(--font-display-family)',
          color: 'var(--text)',
          fontSize: '1.125rem',
          fontWeight: 400,
          letterSpacing: '-0.005em',
          lineHeight: 1.3,
        }}
      >
        {feature.title}
      </h3>
      <p
        className="text-sm"
        style={{ color: 'var(--muted)', lineHeight: 1.55 }}
      >
        {feature.description}
      </p>
    </article>
  );
}
