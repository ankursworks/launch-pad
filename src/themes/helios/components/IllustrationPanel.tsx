import { AgenticIllustration } from './AgenticIllustration';

/**
 * Right-hand panel used on auth pages. Carries the atmospheric brand-color
 * mesh-gradient background; the illustration is fully transparent and floats
 * on top so its glass cards pick up the panel's colored haze.
 */
export function IllustrationPanel({ children }: { children?: React.ReactNode }) {
  return (
    <div
      className="relative hidden md:flex items-center justify-center min-h-[600px] p-6 overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 18% 22%, rgba(255, 83, 31, 0.32), transparent 52%),
          radial-gradient(circle at 82% 72%, rgba(28, 34, 48, 0.24), transparent 52%),
          radial-gradient(circle at 76% 18%, rgba(255, 138, 92, 0.22), transparent 48%),
          radial-gradient(circle at 28% 82%, rgba(28, 34, 48, 0.18), transparent 52%),
          var(--panel)
        `,
      }}
    >
      {/* Subtle dot-grid texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(28, 34, 48, 0.07) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />

      <div className="relative w-full">
        {children ?? <AgenticIllustration className="w-full h-auto max-h-[560px]" />}
      </div>
    </div>
  );
}
