'use client';
import {
  Circle,
  Eye,
  Hexagon,
  Layers,
  Sparkles,
  Sun,
  Zap,
  type LucideIcon,
} from 'lucide-react';

interface IntegrationLogo {
  icon: LucideIcon;
  color: string;
  size?: number;
  /** Position as percentage strings on the visual canvas. */
  position: { left: string; top: string };
}

/**
 * Positions are computed from polar coordinates so each logo sits
 * exactly on a ring boundary. Center of the rings is (400, 430) on a
 * 800×570 viewBox — i.e. (50%, 75.4%). Logos are then placed at
 * (cx + r·cos θ, cy − r·sin θ) and converted to percentage left/top.
 */
const logos: IntegrationLogo[] = [
  // Outer ring (r=320), angle 155° — upper-left green sparkle
  { icon: Sparkles, color: '#15B385', size: 40, position: { left: '13.75%', top: '51.75%' } },
  // Outer ring (r=320), angle 95° — top orange sun
  { icon: Sun, color: '#FF6B47', size: 46, position: { left: '46.5%', top: '19.5%' } },
  // Outer ring (r=320), angle 25° — upper-right green layers
  { icon: Layers, color: '#15B385', size: 44, position: { left: '86.25%', top: '51.75%' } },
  // Middle ring (r=240), angle 145° — orange layers
  { icon: Layers, color: '#FF6B47', size: 44, position: { left: '25.4%', top: '51.2%' } },
  // Middle ring (r=240), angle 35° — blue circle
  { icon: Circle, color: '#494AF6', size: 44, position: { left: '74.6%', top: '51.2%' } },
  // Outer ring (r=320), angle 200° — lower-left dark zap
  { icon: Zap, color: 'var(--text)', size: 38, position: { left: '12.4%', top: '94.6%' } },
  // Outer ring (r=320), angle 340° — lower-right blue eye
  { icon: Eye, color: '#494AF6', size: 40, position: { left: '87.6%', top: '94.6%' } },
];

export function Integration() {
  return (
    <section
      id="integration"
      className="border-b"
      style={{ borderColor: 'color-mix(in srgb, var(--text) 8%, transparent)' }}
    >
      {/* Header */}
      <div className="text-center pt-16 md:pt-20 pb-2 md:pb-4 px-6">
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
                INTEGRATION
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
              Plug Into Every Data Source
            </h2>
            <p
              className="mx-auto mt-5 max-w-md text-sm md:text-base"
              style={{
                color: 'var(--muted)',
                lineHeight: 1.6,
                letterSpacing: '-0.005em',
              }}
            >
              Stream events, sync warehouses, and pipe metrics from 100+ tools
              into one unified analytics layer — no engineering required.
            </p>
          </div>

          {/* Visual canvas */}
          <div className="relative pb-6">
            <div
              className="relative w-full max-w-3xl mx-auto"
              style={{ aspectRatio: '7 / 5' }}
            >
              <svg
                viewBox="0 0 800 570"
                preserveAspectRatio="xMidYMid meet"
                className="absolute inset-0 w-full h-full"
                aria-hidden="true"
              >
                {/* Filled concentric rings — outer to inner, progressively less
                    tinted, innermost is pure white (the brand stage). */}
                <circle
                  cx="400"
                  cy="430"
                  r="320"
                  fill="color-mix(in srgb, var(--accent) 9%, white)"
                />
                <circle
                  cx="400"
                  cy="430"
                  r="240"
                  fill="color-mix(in srgb, var(--accent) 6%, white)"
                />
                <circle
                  cx="400"
                  cy="430"
                  r="160"
                  fill="color-mix(in srgb, var(--accent) 3%, white)"
                />
                <circle cx="400" cy="430" r="80" fill="#FFFFFF" />

                {/* Dashed ring boundaries */}
                <g
                  fill="none"
                  stroke="color-mix(in srgb, var(--accent) 25%, transparent)"
                  strokeWidth="1"
                  strokeDasharray="2 5"
                >
                  <circle cx="400" cy="430" r="320" />
                  <circle cx="400" cy="430" r="240" />
                  <circle cx="400" cy="430" r="160" />
                  <circle cx="400" cy="430" r="80" />
                </g>
              </svg>

              {/* Logo bubbles */}
              {logos.map((l, i) => (
                <LogoBubble key={i} {...l} />
              ))}

              {/* Brand mark */}
              <BrandMark />
            </div>
          </div>
    </section>
  );
}

function LogoBubble({
  icon: Icon,
  color,
  size = 44,
  position,
}: IntegrationLogo) {
  return (
    <div
      className="absolute rounded-full flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
      style={{
        ...position,
        width: size,
        height: size,
        background: 'var(--surface)',
        border: '1px solid color-mix(in srgb, var(--text) 8%, transparent)',
        boxShadow: '0 6px 16px rgba(13, 13, 18, 0.08)',
      }}
    >
      <Icon size={Math.round(size * 0.48)} style={{ color }} strokeWidth={2.25} />
    </div>
  );
}

function BrandMark() {
  return (
    <div
      className="absolute left-1/2 flex items-center justify-center"
      style={{
        top: '75%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Hexagon
        size={64}
        color="var(--accent)"
        fill="var(--accent)"
        strokeWidth={2}
        style={{
          filter:
            'drop-shadow(0 18px 28px color-mix(in srgb, var(--accent) 35%, transparent)) drop-shadow(0 4px 10px rgba(0, 0, 0, 0.06))',
        }}
      />
    </div>
  );
}
