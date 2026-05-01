'use client';
import Link from 'next/link';

interface FooterColumn {
  heading: string;
  links: { label: string; href: string }[];
}

const columns: FooterColumn[] = [
  {
    heading: 'Pages',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Features', href: '#features' },
      { label: 'Blog', href: '#blog' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    heading: 'Social',
    links: [
      { label: 'Twitter', href: '#' },
      { label: 'LinkedIn', href: '#' },
      { label: 'GitHub', href: '#' },
      { label: 'YouTube', href: '#' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Style Guide', href: '/style-guide' },
      { label: 'Changelog', href: '#changelog' },
      { label: 'Documentation', href: '#docs' },
      { label: 'Status', href: '#status' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="px-5 md:px-8 pb-10">
      <div className="max-w-[1200px] mx-auto">
        {/* CTA panel */}
        <div
          className="text-center px-6 md:px-10 py-12 md:py-20"
          style={{
            background: 'var(--surface)',
            borderRadius: 'var(--card-radius)',
          }}
        >
          <div className="flex justify-center mb-5">
            <div
              className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border"
              style={{
                background:
                  'color-mix(in srgb, var(--accent) 14%, transparent)',
                borderColor:
                  'color-mix(in srgb, var(--accent) 30%, transparent)',
                color: 'var(--accent)',
              }}
            >
              What&apos;s next?
            </div>
          </div>
          <h2
            className="mx-auto"
            style={{
              fontFamily: 'var(--font-display-family)',
              color: 'var(--text)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 400,
              letterSpacing: '-0.015em',
              lineHeight: 1.1,
            }}
          >
            Ready when you are.
            <br />
            Start your free trial.
          </h2>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold transition-[transform,filter] duration-150 hover:brightness-95 active:scale-[0.98]"
              style={{
                background: 'var(--accent)',
                color: '#FFFFFF',
                borderRadius: 'var(--btn-radius)',
                letterSpacing: '-0.005em',
              }}
            >
              Start Free Trial
            </Link>
            <Link
              href="#demo"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold transition-[transform,filter] duration-150 hover:brightness-95 active:scale-[0.98]"
              style={{
                background: 'var(--text)',
                color: 'var(--bg)',
                borderRadius: 'var(--btn-radius)',
                letterSpacing: '-0.005em',
              }}
            >
              Book a Live Demo
            </Link>
          </div>
        </div>

        {/* Footer columns */}
        <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-10">
          {/* Brand column */}
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-2">
              <Sparkmark />
              <span
                className="text-lg"
                style={{
                  fontFamily: 'var(--font-display-family)',
                  color: 'var(--text)',
                  letterSpacing: '-0.01em',
                  fontWeight: 400,
                }}
              >
                LaunchPad
              </span>
            </Link>
            <p
              className="mt-4 text-sm max-w-xs"
              style={{ color: 'var(--muted)', lineHeight: 1.6 }}
            >
              LaunchPad helps teams turn raw data into clarity — flexible
              analytics for startups, scale-ups, and enterprises in one
              platform.
            </p>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.heading}>
              <h4
                className="text-sm font-semibold mb-4"
                style={{ color: 'var(--text)' }}
              >
                {col.heading}
              </h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:opacity-70"
                      style={{ color: 'var(--muted)' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t"
          style={{ borderColor: 'var(--border)' }}
        >
          <div className="flex flex-col items-center sm:items-start gap-1">
            <p className="text-xs" style={{ color: 'var(--muted)' }}>
              © {new Date().getFullYear()} LaunchPad. All rights reserved.
            </p>
            <p className="text-xs" style={{ color: 'var(--muted)' }}>
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
            </p>
          </div>
          <Link
            href="#privacy"
            className="text-xs transition-colors hover:opacity-70"
            style={{ color: 'var(--muted)' }}
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}

function Sparkmark() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 26 26"
      fill="none"
      aria-hidden="true"
    >
      <g fill="var(--accent)">
        {[0, 45, 90, 135].map((angle, i) => (
          <rect
            key={i}
            x="11.5"
            y="2"
            width="3"
            height="22"
            rx="1.5"
            transform={`rotate(${angle} 13 13)`}
          />
        ))}
      </g>
      <circle cx="13" cy="13" r="3" fill="var(--bg)" />
    </svg>
  );
}
