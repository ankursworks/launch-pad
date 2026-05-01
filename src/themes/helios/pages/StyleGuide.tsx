'use client';
import Link from 'next/link';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { theme } from '../tokens';
import { useThemeStore } from '@/core/theme';

const headingSpecs = [
  { tag: 'Display', size: '4.25rem', weight: 400, sample: 'The quick brown fox' },
  { tag: 'H1', size: '3rem', weight: 400, sample: 'Heading 1' },
  { tag: 'H2', size: '2.25rem', weight: 400, sample: 'Heading 2' },
  { tag: 'H3', size: '1.75rem', weight: 400, sample: 'Heading 3' },
  { tag: 'H4', size: '1.5rem', weight: 400, sample: 'Heading 4' },
  { tag: 'H5', size: '1.25rem', weight: 400, sample: 'Heading 5' },
  { tag: 'H6', size: '1rem', weight: 400, sample: 'Heading 6' },
];

const weights = [
  { name: 'Light', value: 300 },
  { name: 'Regular', value: 400 },
  { name: 'Medium', value: 500 },
  { name: 'Semibold', value: 600 },
  { name: 'Bold', value: 700 },
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

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-6 md:px-8 py-12 md:py-16">
        <section className="mb-16 md:mb-24">
          <p
            className="text-xs uppercase tracking-[0.3em] mb-4 font-semibold"
            style={{ color: 'var(--accent)' }}
          >
            Style Guide · {mode === 'dark' ? 'Dark mode' : 'Light mode'}
          </p>
          <h1
            className="text-5xl md:text-7xl font-normal leading-[1.05]"
            style={{ fontFamily: 'var(--font-display-family)' }}
          >
            Helios design system
          </h1>
          <p
            className="mt-6 max-w-2xl text-base md:text-lg"
            style={{ color: 'var(--muted)' }}
          >
            Tokens and components from{' '}
            <code
              className="text-xs px-1.5 py-0.5 rounded"
              style={{ background: 'var(--panel)' }}
            >
              src/themes/helios
            </code>
            . Toggle theme in the header to see the dark palette.
          </p>
        </section>

        <SectionHeader label="Colors" title="Palette" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-20">
          {colorRows.map((c) => (
            <div
              key={c.token}
              className="overflow-hidden border"
              style={{
                borderColor: 'var(--border)',
                background: 'var(--surface)',
                borderRadius: 'var(--card-radius)',
              }}
            >
              <div
                className="aspect-[4/3] border-b"
                style={{ background: c.hex, borderColor: 'var(--border)' }}
              />
              <div className="p-4">
                <div className="text-sm font-semibold">{c.name}</div>
                <div className="text-xs mt-1 font-mono" style={{ color: 'var(--muted)' }}>
                  {c.token}
                </div>
                <div
                  className="text-xs mt-0.5 font-mono uppercase"
                  style={{ color: 'var(--muted)' }}
                >
                  {c.hex}
                </div>
              </div>
            </div>
          ))}
        </div>

        <SectionHeader label="Typography" title="Type system" />
        <div className="space-y-8 mb-20">
          {headingSpecs.map((h) => (
            <TypeRow key={h.tag} label={`${h.tag} — ${h.size} · ${h.weight}`}>
              <div
                style={{
                  fontFamily: 'var(--font-display-family)',
                  fontSize: h.size,
                  fontWeight: h.weight,
                  lineHeight: 1.1,
                }}
              >
                {h.sample}
              </div>
            </TypeRow>
          ))}
          <TypeRow label="Body — 1rem · 400">
            <p className="text-base leading-relaxed">
              Body text is set in Inter at the body weight defined by the theme.
            </p>
          </TypeRow>
          <TypeRow label="Caption — 0.875rem · 400">
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              Smaller body and caption text for metadata and helper copy.
            </p>
          </TypeRow>
        </div>

        <SectionHeader label="Weights" title="Font weights" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-20">
          {weights.map((w) => (
            <Card key={w.value}>
              <div
                className="text-xs uppercase tracking-widest"
                style={{ color: 'var(--muted)' }}
              >
                {w.name} · {w.value}
              </div>
              <div className="mt-2 text-3xl" style={{ fontWeight: w.value }}>
                Aa Bb
              </div>
            </Card>
          ))}
        </div>

        <SectionHeader label="Buttons" title="Buttons" />
        <Card className="mb-6">
          <div
            className="text-xs uppercase tracking-widest mb-3"
            style={{ color: 'var(--muted)' }}
          >
            Variants
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="accent">Accent</Button>
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
            <Input
              uppercaseLabel
              label="Uppercase label"
              placeholder="Uppercase variant"
            />
          </div>
        </Card>

        <SectionHeader label="Surfaces" title="Cards" />
        <div className="grid md:grid-cols-3 gap-4 mb-20">
          <Card title="Cream canvas">
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              Warm off-white background with white surfaces and soft borders.
            </p>
          </Card>
          <Card title="Vermilion accent">
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              <span style={{ color: 'var(--accent)' }}>{palette.accent}</span> for
              highlights and call-outs.
            </p>
          </Card>
          <Card title="Editorial type">
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              DM Serif Display for headings, Inter sans for body.
            </p>
          </Card>
        </div>

        <SectionHeader label="Tokens" title="Component tokens" />
        <Card className="mb-20">
          <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
            <TokenRow name="--btn-radius" value={palette.buttonRadius} />
            <TokenRow name="--btn-weight" value={String(palette.buttonWeight)} />
            <TokenRow name="--btn-padding-x" value={palette.buttonPaddingX} />
            <TokenRow name="--btn-padding-y" value={palette.buttonPaddingY} />
            <TokenRow name="--input-radius" value={palette.inputRadius} />
            <TokenRow name="--input-padding-x" value={palette.inputPaddingX} />
            <TokenRow name="--input-padding-y" value={palette.inputPaddingY} />
            <TokenRow name="--card-radius" value={palette.cardRadius} />
          </dl>
        </Card>

        <footer
          className="text-xs pt-8 border-t"
          style={{ color: 'var(--muted)', borderColor: 'var(--border)' }}
        >
          Helios theme · LaunchPad ·{' '}
          <Link href="/" className="underline">
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
      className="flex items-baseline justify-between mb-8 pb-4 border-b"
      style={{ borderColor: 'var(--border)' }}
    >
      <span
        className="text-xs uppercase tracking-[0.3em] font-semibold"
        style={{ color: 'var(--accent)' }}
      >
        {label}
      </span>
      <h2
        className="text-2xl md:text-3xl font-normal"
        style={{ fontFamily: 'var(--font-display-family)' }}
      >
        {title}
      </h2>
    </div>
  );
}

function TypeRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      className="grid md:grid-cols-[200px_1fr] gap-4 md:gap-8 items-baseline border-b pb-6"
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
