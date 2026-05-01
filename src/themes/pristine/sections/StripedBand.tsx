/**
 * Decorative diagonal-hatch band used between sections.
 * Token-driven so it adapts to whatever theme is active.
 */
export function StripedBand({ height = 32 }: { height?: number }) {
  return (
    <div
      style={{
        height,
        backgroundImage: `repeating-linear-gradient(
          -55deg,
          color-mix(in srgb, var(--text) 5%, transparent),
          color-mix(in srgb, var(--text) 5%, transparent) 1px,
          transparent 1px,
          transparent 12px
        )`,
        borderTop: '1px solid color-mix(in srgb, var(--text) 8%, transparent)',
        borderBottom: '1px solid color-mix(in srgb, var(--text) 8%, transparent)',
      }}
    />
  );
}
