'use client';
import { Bell, BellRing, Mail, Plus, Sparkles, Zap } from 'lucide-react';

interface MiniFeature {
  icon: React.ReactNode;
  text: string;
}

interface SplitFeatureProps {
  /** Side where the visual mockup sits on desktop (mobile always stacks: mockup on top). */
  mockupSide: 'left' | 'right';
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  miniFeatures: MiniFeature[];
  mockup: React.ReactNode;
}

function SplitFeature({
  mockupSide,
  eyebrow,
  title,
  description,
  miniFeatures,
  mockup,
}: SplitFeatureProps) {
  const textBlock = (
    <div>
      <div
        className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full mb-5"
        style={{
          background: 'color-mix(in srgb, var(--accent) 14%, transparent)',
          color: 'var(--accent)',
        }}
      >
        {eyebrow}
      </div>
      <h2
        style={{
          fontFamily: 'var(--font-display-family)',
          color: 'var(--text)',
          fontSize: 'clamp(1.875rem, 4.5vw, 3rem)',
          fontWeight: 400,
          letterSpacing: '-0.015em',
          lineHeight: 1.15,
        }}
      >
        {title}
      </h2>
      <p
        className="mt-5 text-sm md:text-base max-w-md"
        style={{ color: 'var(--muted)', lineHeight: 1.6 }}
      >
        {description}
      </p>

      {/* Mini features row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
        {miniFeatures.map((m, i) => (
          <div key={i} className="flex flex-col gap-2 max-w-[260px]">
            <span
              className="inline-flex items-center justify-center w-9 h-9 rounded-xl"
              style={{
                background: 'color-mix(in srgb, var(--accent) 14%, transparent)',
                color: 'var(--accent)',
              }}
            >
              {m.icon}
            </span>
            <p
              className="text-sm"
              style={{ color: 'var(--muted)', lineHeight: 1.6 }}
            >
              {m.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const mockupBlock = (
    <div
      className="flex items-center justify-center p-6 md:p-8"
      style={{
        background: 'var(--panel)',
        borderRadius: 'var(--card-radius)',
        minHeight: '380px',
      }}
    >
      {mockup}
    </div>
  );

  return (
    <section className="px-5 md:px-8 py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {mockupSide === 'left' ? (
            <>
              {mockupBlock}
              {textBlock}
            </>
          ) : (
            <>
              {textBlock}
              {mockupBlock}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

/* ============== Section instance #1: Productivity partner ============== */

export function ProductivityPartner() {
  return (
    <SplitFeature
      mockupSide="left"
      eyebrow="Features"
      title={
        <>
          Your reliable
          <br />
          productivity partner
        </>
      }
      description="Everything you need to stay on track, work efficiently, and make informed decisions — in one place. No complex setup. Just clear tools for daily impact."
      miniFeatures={[
        {
          icon: <Zap size={16} fill="currentColor" />,
          text: 'Surface key insights instantly and act with confidence.',
        },
        {
          icon: <BellRing size={16} />,
          text: 'Keep communication, tasks, and updates in perfect sync.',
        },
      ]}
      mockup={<KpiStackMockup />}
    />
  );
}

function KpiStackMockup() {
  return (
    <div className="w-full max-w-[260px] flex flex-col gap-3">
      <KpiCard label="Rate" value="$80" delta="+8%" up />
      <KpiCard label="Completed" value="12" delta="-19%" up={false} />
    </div>
  );
}

function KpiCard({
  label,
  value,
  delta,
  up,
}: {
  label: string;
  value: string;
  delta: string;
  up: boolean;
}) {
  // Sparkline
  const linePath = up
    ? 'M 0 28 L 12 22 L 24 24 L 36 14 L 48 18 L 60 8 L 72 12 L 84 4'
    : 'M 0 8 L 12 14 L 24 10 L 36 18 L 48 14 L 60 22 L 72 18 L 84 28';
  const areaPath = up
    ? 'M 0 28 L 12 22 L 24 24 L 36 14 L 48 18 L 60 8 L 72 12 L 84 4 L 84 32 L 0 32 Z'
    : 'M 0 8 L 12 14 L 24 10 L 36 18 L 48 14 L 60 22 L 72 18 L 84 28 L 84 32 L 0 32 Z';
  const lineColor = up ? '#0E9384' : 'var(--accent)';
  const areaFill = up
    ? 'color-mix(in srgb, #0E9384 22%, transparent)'
    : 'color-mix(in srgb, var(--accent) 22%, transparent)';

  return (
    <div
      className="border shadow-sm"
      style={{
        background: 'var(--surface)',
        borderColor: 'var(--border)',
        borderRadius: '0.75rem',
        padding: '0.875rem 1rem',
      }}
    >
      <div
        className="text-xs font-semibold mb-2"
        style={{ color: 'var(--text)' }}
      >
        {label}
      </div>
      <div className="flex items-end justify-between gap-3">
        <div>
          <div
            style={{
              fontFamily: 'var(--font-display-family)',
              fontSize: '1.875rem',
              fontWeight: 400,
              color: 'var(--text)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            {value}
          </div>
          <div
            className="mt-2 inline-flex items-center px-2 py-0.5 text-[10px] font-semibold rounded-full"
            style={{
              background: up
                ? 'color-mix(in srgb, #0E9384 14%, transparent)'
                : 'color-mix(in srgb, var(--accent) 14%, transparent)',
              color: up ? '#0E9384' : 'var(--accent)',
            }}
          >
            {delta} from last week
          </div>
        </div>
        <svg
          viewBox="0 0 84 32"
          className="w-24 h-8 shrink-0"
          aria-hidden="true"
        >
          <path d={areaPath} fill={areaFill} />
          <path
            d={linePath}
            stroke={lineColor}
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

/* ============== Section instance #2: Automation assistant ============== */

export function AutomationAssistant() {
  return (
    <SplitFeature
      mockupSide="right"
      eyebrow="Features"
      title={
        <>
          Your automation
          <br />
          assistant — always on
        </>
      }
      description="Let workflows run themselves while you focus on what matters. Build, trigger, and manage tasks in just a few clicks — no coding required."
      miniFeatures={[
        {
          icon: <Sparkles size={16} />,
          text: 'Reduce manual work and eliminate repetitive steps across your team.',
        },
        {
          icon: <Bell size={16} />,
          text: 'From onboarding to reporting — set it once and let it flow.',
        },
      ]}
      mockup={<AutomationMockup />}
    />
  );
}

function AutomationMockup() {
  return (
    <div
      className="w-full max-w-[280px] border shadow-sm"
      style={{
        background: 'var(--surface)',
        borderColor: 'var(--border)',
        borderRadius: '0.875rem',
        padding: '1rem',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div
          className="text-xs font-semibold"
          style={{ color: 'var(--text)' }}
        >
          Automation
        </div>
        <Plus
          size={14}
          style={{ color: 'var(--muted)' }}
          className="rotate-45"
        />
      </div>

      {/* Step 1: Airtable trigger */}
      <StepCard
        logoBg="#FBBF24"
        logoLetter="A"
        title="Airtable"
        sub="Entering new user data"
      />

      {/* Connector + label */}
      <div className="relative flex justify-center my-1">
        <div
          className="w-px"
          style={{
            height: 24,
            background:
              'linear-gradient(180deg, color-mix(in srgb, var(--text) 18%, transparent), transparent)',
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 py-0.5 text-[9px] font-semibold border whitespace-nowrap"
          style={{
            background: 'var(--surface)',
            borderColor: 'var(--border)',
            color: 'var(--muted)',
            borderRadius: '9999px',
          }}
        >
          Immediately
        </div>
      </div>

      {/* Step 2: Email action */}
      <StepCard
        logoBg="#EF4444"
        logoIcon={<Mail size={14} color="#FFFFFF" />}
        title="Email"
        sub="Send welcome Email"
      />

      {/* Create button */}
      <button
        className="mt-3 w-full py-2.5 text-xs font-semibold transition-[transform,filter] duration-150 hover:brightness-95 active:scale-[0.99]"
        style={{
          background: 'var(--text)',
          color: 'var(--bg)',
          borderRadius: '0.5rem',
        }}
      >
        Create
      </button>
    </div>
  );
}

function StepCard({
  logoBg,
  logoLetter,
  logoIcon,
  title,
  sub,
}: {
  logoBg: string;
  logoLetter?: string;
  logoIcon?: React.ReactNode;
  title: string;
  sub: string;
}) {
  return (
    <div
      className="flex items-center gap-2.5 p-2.5 border"
      style={{
        background: 'var(--bg)',
        borderColor: 'var(--border)',
        borderRadius: '0.625rem',
      }}
    >
      <span
        className="w-7 h-7 rounded-md flex items-center justify-center text-white text-xs font-bold shrink-0"
        style={{ background: logoBg }}
      >
        {logoIcon ?? logoLetter}
      </span>
      <div className="min-w-0 flex-1">
        <div
          className="text-[11px] font-semibold truncate"
          style={{ color: 'var(--text)' }}
        >
          {title}
        </div>
        <div
          className="text-[10px] truncate"
          style={{ color: 'var(--muted)' }}
        >
          {sub}
        </div>
      </div>
    </div>
  );
}
