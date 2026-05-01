'use client';
import { ChevronDown, Plus } from 'lucide-react';

export function Features() {
  return (
    <section
      id="features"
      className="border-b"
      style={{ borderColor: 'color-mix(in srgb, var(--text) 8%, transparent)' }}
    >
      {/* Section header */}
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
                FEATURES
              </div>
            </div>
            <h2
              className="mx-auto max-w-3xl"
              style={{
                fontFamily: 'var(--font-display-family)',
                color: 'var(--text)',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 500,
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
              }}
            >
              Everything You Need
              <br />
              To Ship With Data
            </h2>
            <p
              className="mx-auto mt-5 max-w-lg text-sm md:text-base"
              style={{
                color: 'var(--muted)',
                lineHeight: 1.6,
                letterSpacing: '-0.005em',
              }}
            >
              From event streams to executive dashboards — the analytics layer
              your stack was missing, in one polished workspace.
            </p>
          </div>

      {/* 2×2 feature grid */}
      <div className="grid md:grid-cols-2 gap-5 md:gap-6 px-6 md:px-10 pb-16 md:pb-20">
        <FeatureCard
          title="Live User 360"
          description="Stream every signup, click, and churn into a unified profile in real time."
        >
          <CrmMockup />
        </FeatureCard>

        <FeatureCard
          title="Revenue Analytics Dashboard"
          description="Visualize MRR, retention, and pipeline health at one glance — no SQL required."
        >
          <ChartMockup />
        </FeatureCard>

        <FeatureCard
          title="Auto-Insights Engine"
          description="Anomalies, cohorts, and risks surfaced automatically the moment your data shifts."
        >
          <DataMockup />
        </FeatureCard>

        <FeatureCard
          title="Channel Attribution"
          description="Track every dollar back to its source — paid, organic, referral — fully attributed."
        >
          <ChannelMockup />
        </FeatureCard>
      </div>
    </section>
  );
}

/* ---- card frame ---- */

function FeatureCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <article
      className="p-6 md:p-7 border flex flex-col"
      style={{
        background: 'var(--panel)',
        borderColor: 'color-mix(in srgb, var(--text) 8%, transparent)',
        borderRadius: '1.5rem',
      }}
    >
      {/* Inner mockup — FIXED height so all 4 mockups are visually identical
          regardless of how dense their content is. Content vertically
          centered inside. */}
      <div
        className="rounded-2xl border overflow-hidden flex flex-col justify-center"
        style={{
          background: 'var(--surface)',
          borderColor: 'color-mix(in srgb, var(--text) 8%, transparent)',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
          height: '420px',
        }}
      >
        {children}
      </div>

      {/* Caption — fixed min-height so descriptions of different lengths
          don't make the cards different totals. */}
      <div
        className="text-center pt-7 pb-2 flex flex-col items-center justify-start"
        style={{ minHeight: '128px' }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-display-family)',
            color: 'var(--text)',
            fontSize: '1.5rem',
            fontWeight: 500,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
          }}
        >
          {title}
        </h3>
        <p
          className="mx-auto mt-2 max-w-sm text-sm"
          style={{
            color: 'var(--muted)',
            lineHeight: 1.55,
            letterSpacing: '-0.005em',
          }}
        >
          {description}
        </p>
      </div>
    </article>
  );
}

/* ---- mockups ---- */

function CrmMockup() {
  return (
    <div className="p-5 md:p-6">
      <div className="flex items-center justify-between mb-5">
        <div
          className="text-sm font-semibold"
          style={{ color: 'var(--text)', letterSpacing: '-0.005em' }}
        >
          Intelligent CRM Framework
        </div>
        <span
          className="px-2.5 py-1 text-[10px] font-semibold rounded-full text-white"
          style={{ background: 'var(--accent)' }}
        >
          Medium
        </span>
      </div>

      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-semibold"
          style={{ background: '#F8B483' }}
        >
          R
        </div>
        <div>
          <div
            className="text-base font-semibold"
            style={{ color: 'var(--text)', letterSpacing: '-0.01em' }}
          >
            Robert Fox
          </div>
          <div className="text-[11px] uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
            Customer · Alex Tashvi
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs mb-5">
        <Field label="Phone Number" value="+1 (893) 19 2200 3300" />
        <Field label="Email Address" value="fox@domain.com" />
        <Field label="Customer ID" value="100000274" />
        <Field label="Status" value="Active" />
      </div>

      <div
        className="pt-4 border-t flex items-center gap-2"
        style={{ borderColor: 'color-mix(in srgb, var(--text) 8%, transparent)' }}
      >
        {[
          { letter: 'S', name: 'Sarah J.', color: '#F8B483' },
          { letter: 'A', name: 'Aria K.', color: '#494AF6' },
          { letter: 'M', name: 'Mike R.', color: '#0E9384' },
        ].map((m) => (
          <div
            key={m.letter}
            className="flex items-center gap-1.5 px-2 py-1 rounded-full border text-[11px]"
            style={{
              borderColor: 'color-mix(in srgb, var(--text) 10%, transparent)',
              background: 'var(--surface)',
              color: 'var(--muted)',
            }}
          >
            <span
              className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold text-white"
              style={{ background: m.color }}
            >
              {m.letter}
            </span>
            {m.name}
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div
        className="text-[10px] uppercase tracking-widest font-semibold mb-1"
        style={{ color: 'var(--muted)' }}
      >
        {label}
      </div>
      <div className="font-medium" style={{ color: 'var(--text)' }}>
        {value}
      </div>
    </div>
  );
}

function ChartMockup() {
  return (
    <div className="p-5 md:p-6">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
        <div
          className="text-sm font-semibold"
          style={{ color: 'var(--text)', letterSpacing: '-0.005em' }}
        >
          Sales Analytics
        </div>
        <div className="flex items-center gap-1.5 text-[11px]">
          <Pill>Time Interval</Pill>
          <Pill chevron>Monthly</Pill>
          <Pill icon={<Plus size={10} />}>Add</Pill>
        </div>
      </div>

      <svg viewBox="0 0 320 160" className="w-full h-auto" aria-hidden="true">
        <defs>
          <linearGradient id="ft-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Y-axis grid lines */}
        <g stroke="color-mix(in srgb, var(--text) 8%, transparent)" strokeWidth="0.75">
          <line x1="32" y1="20" x2="316" y2="20" />
          <line x1="32" y1="55" x2="316" y2="55" />
          <line x1="32" y1="90" x2="316" y2="90" />
          <line x1="32" y1="125" x2="316" y2="125" />
        </g>

        {/* Y labels */}
        <g
          fontFamily="ui-monospace, monospace"
          fontSize="8"
          fill="var(--muted)"
          fontWeight="500"
        >
          <text x="28" y="22" textAnchor="end">$50K</text>
          <text x="28" y="57" textAnchor="end">$30K</text>
          <text x="28" y="92" textAnchor="end">$20K</text>
          <text x="28" y="127" textAnchor="end">$10K</text>
        </g>

        {/* Area */}
        <path
          d="M 32 110 L 64 95 L 96 105 L 128 70 L 160 80 L 192 50 L 224 35 L 256 60 L 288 40 L 316 55 L 316 130 L 32 130 Z"
          fill="url(#ft-area)"
        />
        {/* Line */}
        <path
          d="M 32 110 L 64 95 L 96 105 L 128 70 L 160 80 L 192 50 L 224 35 L 256 60 L 288 40 L 316 55"
          stroke="var(--accent)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Highlight dot */}
        <circle cx="224" cy="35" r="4" fill="var(--accent)" stroke="#FFFFFF" strokeWidth="2" />

        {/* X labels */}
        <g
          fontFamily="ui-monospace, monospace"
          fontSize="8"
          fill="var(--muted)"
          fontWeight="500"
        >
          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'].map((m, i) => (
            <text key={m} x={32 + i * 32} y="148">
              {m}
            </text>
          ))}
        </g>
      </svg>
    </div>
  );
}

function DataMockup() {
  return (
    <div className="p-5 md:p-6">
      <div className="flex items-center justify-between mb-5">
        <div
          className="text-sm font-semibold"
          style={{ color: 'var(--text)', letterSpacing: '-0.005em' }}
        >
          Insights Pipeline
        </div>
        <Pill>Live</Pill>
      </div>

      <div
        className="p-4 rounded-xl mb-3 border"
        style={{
          background: 'color-mix(in srgb, var(--accent) 6%, #FFFFFF)',
          borderColor: 'color-mix(in srgb, var(--accent) 18%, transparent)',
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span
            className="px-1.5 py-0.5 text-[9px] font-bold rounded text-white"
            style={{ background: 'var(--accent)' }}
          >
            AI
          </span>
          <span className="text-xs font-semibold" style={{ color: 'var(--text)' }}>
            Pattern detected
          </span>
        </div>
        <div className="text-xs" style={{ color: 'var(--muted)', lineHeight: 1.5 }}>
          Mid-tier customers churning 2.4× faster on weekday signups. Suggested:
          adjust onboarding cadence.
        </div>
      </div>

      <div className="space-y-2">
        {[
          { label: 'Conversion lift opportunity', value: '+12%', up: true },
          { label: 'At-risk accounts identified', value: '24', up: false },
          { label: 'Active experiments', value: '8', up: true },
        ].map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between p-3 rounded-lg border text-xs"
            style={{
              borderColor: 'color-mix(in srgb, var(--text) 8%, transparent)',
              background: 'var(--surface)',
            }}
          >
            <span style={{ color: 'var(--muted)' }}>{row.label}</span>
            <span
              className="font-bold px-2 py-0.5 rounded-full text-[10px]"
              style={{
                background: row.up
                  ? 'color-mix(in srgb, #0E9384 14%, transparent)'
                  : 'color-mix(in srgb, #BE123C 14%, transparent)',
                color: row.up ? '#0E9384' : '#BE123C',
              }}
            >
              {row.up ? '▲' : '▼'} {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChannelMockup() {
  const channels = [
    { label: 'Direct', value: 42, color: 'var(--accent)' },
    { label: 'Search', value: 28, color: '#494AF6' },
    { label: 'Social', value: 16, color: '#F8B483' },
    { label: 'Email', value: 9, color: '#0E9384' },
    { label: 'Referral', value: 5, color: '#7C3AED' },
  ];

  return (
    <div className="p-5 md:p-6">
      <div className="flex items-center justify-between mb-5">
        <div
          className="text-sm font-semibold"
          style={{ color: 'var(--text)', letterSpacing: '-0.005em' }}
        >
          Channel Mix · This quarter
        </div>
        <span className="text-xs" style={{ color: 'var(--muted)' }}>
          $124,830 total
        </span>
      </div>

      {/* Stacked bar */}
      <div
        className="h-3 w-full rounded-full overflow-hidden flex mb-5"
        style={{ background: 'color-mix(in srgb, var(--text) 6%, transparent)' }}
      >
        {channels.map((c) => (
          <div
            key={c.label}
            style={{ background: c.color, width: `${c.value}%` }}
            className="h-full"
          />
        ))}
      </div>

      <div className="space-y-2.5">
        {channels.map((c) => (
          <div key={c.label} className="flex items-center gap-3 text-xs">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ background: c.color }}
            />
            <span className="flex-1 font-medium" style={{ color: 'var(--text)' }}>
              {c.label}
            </span>
            <span className="font-mono tabular-nums" style={{ color: 'var(--muted)' }}>
              {c.value}%
            </span>
            <span
              className="font-bold w-16 text-right"
              style={{ color: 'var(--text)' }}
            >
              ${(124830 * (c.value / 100)).toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Pill({
  children,
  chevron,
  icon,
}: {
  children: React.ReactNode;
  chevron?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-1 border font-medium"
      style={{
        background: 'var(--surface)',
        borderColor: 'color-mix(in srgb, var(--text) 10%, transparent)',
        color: 'var(--muted)',
        borderRadius: '9999px',
      }}
    >
      {icon}
      {children}
      {chevron && <ChevronDown size={10} />}
    </span>
  );
}
