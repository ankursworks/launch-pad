import { PristineHero } from './PristineHero';

/**
 * Pristine right-hand panel for auth pages. Cool gradient washes
 * (electric-blue + teal mint), no warm illustration.
 */
export function HeroPanel({ children }: { children?: React.ReactNode }) {
  return (
    <div
      className="relative hidden md:flex items-center justify-center min-h-[600px] p-6 overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 20% 25%, rgba(55, 88, 249, 0.16), transparent 50%),
          radial-gradient(circle at 80% 70%, rgba(14, 147, 132, 0.14), transparent 50%),
          radial-gradient(circle at 75% 20%, rgba(150, 170, 251, 0.20), transparent 48%),
          var(--panel)
        `,
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(17, 25, 40, 0.06) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="relative w-full">
        {children ?? <PristineHero className="w-full h-auto max-h-[560px]" />}
      </div>
    </div>
  );
}
