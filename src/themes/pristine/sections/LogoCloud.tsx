'use client';

interface Logo {
  name: string;
  /** Simple inline SVG mark to render alongside the wordmark. */
  mark?: React.ReactNode;
}

const defaultLogos: Logo[] = [
  { name: 'pulse', mark: <WaveMark /> },
  { name: 'cohere', mark: <CircleMark /> },
  { name: 'stratify', mark: <TriangleMark /> },
  { name: 'datawise', mark: <DiamondMark /> },
  { name: 'lensr', mark: <DropletMark /> },
  { name: 'arclight', mark: <FlowerMark /> },
  { name: 'prism', mark: <HexMark /> },
  { name: 'vault', mark: <SquareMark /> },
];

interface LogoCloudProps {
  logos?: Logo[];
}

export function LogoCloud({ logos = defaultLogos }: LogoCloudProps) {
  const dividerColor = 'color-mix(in srgb, var(--text) 8%, transparent)';
  return (
    <section
      className="border-b"
      style={{ borderColor: dividerColor }}
    >
      {/* Grid: 2 cols phone → 4 cols tablet → 8 cols desktop.
          Borders use a tinted parent bg + 1px gaps so cells reveal a
          consistent grid line on every breakpoint. */}
      <div
        className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-px"
        style={{ background: dividerColor }}
      >
        {logos.map((l, i) => (
          <div
            key={l.name + i}
            className="flex items-center justify-center gap-2 px-4 py-5 md:py-7"
            style={{ background: 'var(--surface)' }}
          >
            <span
              className="opacity-70 shrink-0"
              style={{ color: 'var(--muted)' }}
            >
              {l.mark}
            </span>
            <span
              className="text-base md:text-lg font-semibold tracking-tight"
              style={{
                color: 'var(--muted)',
                letterSpacing: '-0.02em',
              }}
            >
              {l.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---- placeholder logo marks (not real brand logos) ---- */

function CircleMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="8" fill="currentColor" opacity="0.85" />
      <circle cx="10" cy="10" r="3" fill="#FFFFFF" />
    </svg>
  );
}
function DiamondMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M10 2 L18 10 L10 18 L2 10 Z" />
    </svg>
  );
}
function FlowerMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <circle cx="10" cy="5" r="4" />
      <circle cx="5" cy="13" r="4" />
      <circle cx="15" cy="13" r="4" />
    </svg>
  );
}
function DropletMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M10 2 C10 2, 4 9, 4 13 a6 6 0 0 0 12 0 C16 9, 10 2, 10 2 Z" />
    </svg>
  );
}
function TriangleMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M10 3 L18 17 L2 17 Z" />
    </svg>
  );
}
function HexMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M10 2 L17 6 L17 14 L10 18 L3 14 L3 6 Z" />
    </svg>
  );
}
function SquareMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <rect x="3" y="3" width="14" height="14" rx="3" />
    </svg>
  );
}
function WaveMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M2 10 Q5 4, 10 10 T18 10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
