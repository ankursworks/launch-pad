'use client';
import Link from 'next/link';
import { Header, Card, Button, Input } from '@/themes/helios';
import { useThemeStore } from '@/core/theme';
import { theme } from '../tokens';

const headingSpecs = [
  { tag: 'H1', size: '3.625rem', weight: 600, tracking: '-0.348px', sample: 'Heading 01' },
  { tag: 'H2', size: '2.9375rem', weight: 600, tracking: '-0.282px', sample: 'Heading 02' },
  { tag: 'H3', size: '2.375rem', weight: 500, tracking: '0', sample: 'Heading 03' },
  { tag: 'H4', size: '1.9375rem', weight: 600, tracking: '-0.124px', sample: 'Heading 04' },
  { tag: 'H5', size: '1.5625rem', weight: 600, tracking: '-0.1px', sample: 'Heading 05' },
  { tag: 'H6', size: '1.25rem', weight: 600, tracking: '-0.04px', sample: 'Heading 06' },
];

const bodySpecs = [
  { tag: 'Body B1', size: '1.25rem', weight: 400, tracking: '-0.04px' },
  { tag: 'Body B2', size: '1rem', weight: 400, tracking: '-0.016px' },
  { tag: 'Body B3', size: '0.875rem', weight: 400, tracking: '0' },
  { tag: 'Caption', size: '0.75rem', weight: 400, tracking: '0' },
];

export default function StyleGuide() {
  const mode = useThemeStore((s) => s.mode);
  const palette = mode === 'dark' ? theme.dark : theme.light;

  const colorRows = [
    { name: 'Background', token: '--bg', hex: palette.bg },
    { name: 'Surface', token: '--surface', hex: palette.surface },
    { name: 'Panel', token: '--panel', hex: palette.panel },
    { name: 'Text', token: '--text', hex: palette.text },
    { name: 'Primary', token: '--primary', hex: palette.primary },
    { name: 'Accent', token: '--accent', hex: palette.accent },
    { name: 'Muted', token: '--muted', hex: palette.muted },
    { name: 'Border', token: '--border', hex: palette.border },
  ];

  const accentSwatches = [
    { name: 'Sky', hex: '#E3EBFF' },
    { name: 'Mint', hex: '#CCFBEF' },
    { name: 'Buttercup', hex: '#FDE272' },
    { name: 'Lilac', hex: '#E7E5FE' },
    { name: 'Cream', hex: '#FEF7C3' },
  ];

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-6 md:px-8 py-12 md:py-16">
        <section className="mb-16">
          <p
            className="text-xs uppercase tracking-[0.3em] font-semibold mb-4"
            style={{ color: 'var(--accent)' }}
          >
            Style Guide · {mode === 'dark' ? 'Dark mode' : 'Light mode'}
          </p>
          <h1
            className="text-5xl md:text-7xl mb-4"
            style={{
              fontFamily: 'var(--font-display-family)',
              fontWeight: 600,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
            }}
          >
            Pristine design system
          </h1>
          <p className="text-base md:text-lg max-w-2xl" style={{ color: 'var(--muted)' }}>
            Cloned from the Markova style guide. Inter Tight throughout, electric
            blue accent, hairline borders, no shadows.
          </p>
        </section>

        <SectionHeader label="Colors" title="Palette" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-10">
          {colorRows.map((c) => (
            <Swatch key={c.token} name={c.name} token={c.token} hex={c.hex} />
          ))}
        </div>
        <h3 className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--muted)' }}>
          Accents
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-20">
          {accentSwatches.map((c) => (
            <Swatch key={c.hex} name={c.name} hex={c.hex} />
          ))}
        </div>

        <SectionHeader label="Typography" title="Inter Tight" />
        <div className="space-y-6 mb-20">
          {headingSpecs.map((h) => (
            <TypeRow
              key={h.tag}
              label={`${h.tag} · ${h.size} · ${h.weight}`}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display-family)',
                  fontSize: h.size,
                  fontWeight: h.weight,
                  letterSpacing: h.tracking,
                  lineHeight: 1.14,
                }}
              >
                {h.sample}
              </div>
            </TypeRow>
          ))}
          {bodySpecs.map((b) => (
            <TypeRow key={b.tag} label={`${b.tag} · ${b.size} · ${b.weight}`}>
              <p
                style={{
                  fontSize: b.size,
                  fontWeight: b.weight,
                  letterSpacing: b.tracking,
                  lineHeight: 1.52,
                }}
              >
                The quick brown fox jumps over the lazy dog. Type carries
                hierarchy and rhythm through every screen.
              </p>
            </TypeRow>
          ))}
        </div>

        <SectionHeader label="UI Elements" title="Buttons" />
        <Card className="mb-6">
          <div
            className="text-xs uppercase tracking-widest mb-3"
            style={{ color: 'var(--muted)' }}
          >
            Variants
          </div>
          <div className="flex flex-wrap gap-3">
            <Button>Primary</Button>
            <Button variant="ghost">Secondary</Button>
            <Button variant="accent">Get your first insight</Button>
            <Button variant="social">Social</Button>
            <Button disabled>Disabled</Button>
          </div>
        </Card>
        <Card className="mb-20">
          <div
            className="text-xs uppercase tracking-widest mb-3"
            style={{ color: 'var(--muted)' }}
          >
            Sizes
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </Card>

        <SectionHeader label="Forms" title="Form elements" />
        <Card className="mb-20">
          <div className="grid md:grid-cols-2 gap-5 max-w-2xl">
            <Input label="Full name" placeholder="Jane Doe" />
            <Input label="Email" type="email" placeholder="you@company.com" />
            <Input label="Password" type="password" placeholder="••••••••" />
            <Input label="With error" placeholder="invalid" error="Required field" />
          </div>
        </Card>

        <SectionHeader label="Tokens" title="Component tokens" />
        <Card className="mb-20">
          <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
            <TokenRow name="--btn-radius" value={palette.buttonRadius} />
            <TokenRow name="--btn-padding-x" value={palette.buttonPaddingX} />
            <TokenRow name="--btn-padding-y" value={palette.buttonPaddingY} />
            <TokenRow name="--input-radius" value={palette.inputRadius} />
            <TokenRow name="--card-radius" value={palette.cardRadius} />
            <TokenRow name="--card-shadow" value={palette.cardShadow} />
          </dl>
        </Card>

        <footer
          className="text-xs pt-8 border-t"
          style={{ color: 'var(--muted)', borderColor: 'var(--border)' }}
        >
          Pristine theme · LaunchPad ·{' '}
          <Link href="/" className="font-semibold" style={{ color: 'var(--accent)' }}>
            back to home
          </Link>
        </footer>
      </main>
    </>
  );
}

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div
      className="flex items-baseline justify-between mb-6 pb-3 border-b"
      style={{ borderColor: 'var(--border)' }}
    >
      <span
        className="text-xs uppercase tracking-[0.3em] font-semibold"
        style={{ color: 'var(--accent)' }}
      >
        {label}
      </span>
      <h2
        className="text-2xl md:text-3xl"
        style={{
          fontFamily: 'var(--font-display-family)',
          fontWeight: 600,
          letterSpacing: '-0.02em',
        }}
      >
        {title}
      </h2>
    </div>
  );
}

function TypeRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      className="grid md:grid-cols-[220px_1fr] gap-4 md:gap-8 items-baseline border-b pb-5"
      style={{ borderColor: 'var(--border)' }}
    >
      <span
        className="text-xs uppercase tracking-widest font-semibold"
        style={{ color: 'var(--muted)' }}
      >
        {label}
      </span>
      <div>{children}</div>
    </div>
  );
}

function Swatch({ name, token, hex }: { name: string; token?: string; hex: string }) {
  return (
    <div
      className="overflow-hidden border"
      style={{
        borderColor: 'var(--border)',
        background: 'var(--surface)',
        borderRadius: 'var(--card-radius)',
      }}
    >
      <div
        className="aspect-[4/3] border-b"
        style={{ background: hex, borderColor: 'var(--border)' }}
      />
      <div className="p-4">
        <div className="text-sm font-semibold">{name}</div>
        {token && (
          <div className="text-xs mt-1 font-mono" style={{ color: 'var(--muted)' }}>
            {token}
          </div>
        )}
        <div
          className="text-xs mt-0.5 font-mono uppercase"
          style={{ color: 'var(--muted)' }}
        >
          {hex}
        </div>
      </div>
    </div>
  );
}

function TokenRow({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 py-1">
      <code className="font-mono text-xs">{name}</code>
      <code className="font-mono text-xs" style={{ color: 'var(--muted)' }}>
        {value}
      </code>
    </div>
  );
}
