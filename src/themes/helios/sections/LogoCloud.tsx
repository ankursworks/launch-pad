'use client';
import {
  Layers,
  LoaderCircle,
  Library,
  Zap,
  CircleDot,
} from 'lucide-react';

interface Logo {
  name: string;
  mark: React.ReactNode;
  opacity?: number;
}

const defaultLogos: Logo[] = [
  { name: 'Layers', mark: <Layers size={20} strokeWidth={1.75} />, opacity: 0.45 },
  { name: 'Sisyphus', mark: <Zap size={20} strokeWidth={2} fill="currentColor" />, opacity: 0.95 },
  { name: 'Quotient', mark: <CircleDot size={20} strokeWidth={1.75} />, opacity: 0.95 },
  { name: 'Catalog', mark: <Library size={20} strokeWidth={1.75} />, opacity: 0.55 },
  { name: 'Circooles', mark: <LoaderCircle size={20} strokeWidth={1.75} />, opacity: 0.35 },
];

interface LogoCloudProps {
  heading?: string;
  logos?: Logo[];
}

export function LogoCloud({
  heading = 'Trusted by the world leaders',
  logos = defaultLogos,
}: LogoCloudProps) {
  return (
    <section className="px-5 md:px-8 py-16 md:py-20 text-center">
      {/* Heading */}
      <h2
        style={{
          fontFamily: 'var(--font-display-family)',
          color: 'var(--text)',
          fontSize: 'clamp(1.25rem, 2.4vw, 1.625rem)',
          fontWeight: 400,
          letterSpacing: '-0.005em',
          lineHeight: 1.3,
        }}
      >
        {heading}
      </h2>

      {/* Marquee track — overflow clipped, edges faded via mask gradient.
          Inner track is duplicated so the CSS keyframe (scroll-x) can
          translate -50% for a seamless loop. */}
      <div
        className="relative overflow-hidden mt-9 md:mt-10"
        style={{
          maskImage:
            'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage:
            'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
        }}
      >
        <div className="flex items-center w-max animate-scroll-x">
          {[...logos, ...logos].map((l, i) => (
            <div
              key={l.name + i}
              className="flex items-center gap-2 shrink-0 px-6 md:px-9 transition-opacity duration-200"
              style={{
                color: 'var(--text)',
                opacity: l.opacity ?? 0.6,
              }}
              aria-hidden={i >= logos.length}
            >
              <span className="shrink-0">{l.mark}</span>
              <span
                className="text-lg md:text-xl font-semibold tracking-tight whitespace-nowrap"
                style={{ letterSpacing: '-0.02em' }}
              >
                {l.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
