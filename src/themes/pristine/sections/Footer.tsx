'use client';
import Link from 'next/link';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const columns: FooterColumn[] = [
  {
    title: 'Product',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Features', href: '#features' },
      { label: 'Integrations', href: '#integration' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Changelog', href: '#changelog' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Docs', href: '#docs' },
      { label: 'API reference', href: '#api' },
      { label: 'Blog', href: '#blog' },
      { label: 'Status', href: '#status' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Style Guide', href: '/style-guide' },
      { label: 'Customers', href: '#customers' },
      { label: 'Careers', href: '#careers' },
      { label: 'Contact', href: '#contact' },
      { label: 'Security', href: '#security' },
    ],
  },
];

export function Footer() {
  return (
    <footer style={{ background: 'var(--surface)' }}>
      {/* Top: brand + nav columns */}
      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_2fr] gap-10 md:gap-16 px-8 md:px-12 py-12 md:py-14">
            {/* Brand block */}
            <div>
              <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold"
                  style={{
                    background: 'var(--accent)',
                    fontFamily: 'var(--font-display-family)',
                  }}
                >
                  L
                </div>
                <span
                  className="text-base font-semibold"
                  style={{
                    fontFamily: 'var(--font-display-family)',
                    color: 'var(--text)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  LaunchPad
                </span>
              </Link>
              <p
                className="text-sm max-w-xs"
                style={{ color: 'var(--muted)', lineHeight: 1.6 }}
              >
                Real-time analytics for product teams. Stream events, build
                dashboards, and ship insights — without writing a line of SQL.
              </p>
            </div>

            {/* Link columns */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
              {columns.map((col) => (
                <div key={col.title}>
                  <h3
                    className="mb-4 text-sm font-semibold"
                    style={{
                      color: 'var(--text)',
                      letterSpacing: '-0.005em',
                    }}
                  >
                    {col.title}
                  </h3>
                  <ul className="space-y-3">
                    {col.links.map((l) => (
                      <li key={l.label}>
                        <Link
                          href={l.href}
                          className="text-sm transition-colors hover:opacity-100"
                          style={{ color: 'var(--muted)' }}
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom row */}
          <div
            className="border-t px-8 md:px-12 py-5 flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-3"
            style={{
              borderColor: 'color-mix(in srgb, var(--text) 8%, transparent)',
            }}
          >
            <div className="flex flex-col gap-1">
              <span className="text-xs" style={{ color: 'var(--muted)' }}>
                © {new Date().getFullYear()} LaunchPad — Built with the Pristine
                theme.
              </span>
              <span className="text-xs" style={{ color: 'var(--muted)' }}>
                Built for the community by{' '}
                <a
                  href="https://ankurs.work"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="transition-colors hover:opacity-70"
                  style={{ color: 'var(--text)' }}
                >
                  Ankur Srivastav
                </a>
                {' · '}
                <a
                  href="https://ankurs.work"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="transition-colors hover:opacity-70"
                  style={{ color: 'var(--text)' }}
                >
                  ankurs.work
                </a>
              </span>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <Link
                href="#privacy"
                className="hover:opacity-70 transition-opacity"
                style={{ color: 'var(--muted)' }}
              >
                Privacy policy
              </Link>
              <Link
                href="/login"
                className="hover:opacity-70 transition-opacity"
                style={{ color: 'var(--muted)' }}
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="font-semibold transition-opacity hover:opacity-70"
                style={{ color: 'var(--text)' }}
              >
                Sign up
              </Link>
            </div>
      </div>
    </footer>
  );
}
