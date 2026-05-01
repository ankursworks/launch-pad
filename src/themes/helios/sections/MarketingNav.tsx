'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu } from 'lucide-react';
import { Sheet } from '../components/Sheet';

interface NavLinkItem {
  label: string;
  href: string;
  hasMenu?: boolean;
}

interface MarketingNavProps {
  links?: NavLinkItem[];
  cta?: { label: string; href: string };
}

const defaultLinks: NavLinkItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Features', href: '#features' },
  { label: 'Blog', href: '#blog' },
  { label: 'Other', href: '#other', hasMenu: true },
];

export function MarketingNav({
  links = defaultLinks,
  cta = { label: 'Start Free Trial', href: '/signup' },
}: MarketingNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className="sticky top-0 z-30"
        style={{
          background: scrolled
            ? 'color-mix(in srgb, var(--bg) 78%, transparent)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(14px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(14px) saturate(180%)' : 'none',
          borderBottom: scrolled
            ? '1px solid color-mix(in srgb, var(--text) 6%, transparent)'
            : '1px solid transparent',
          transition:
            'background 220ms ease, backdrop-filter 220ms ease, border-color 220ms ease',
        }}
      >
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 h-[72px] flex items-center justify-between gap-3 md:gap-6">
          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="md:hidden -ml-1 w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-[color:color-mix(in_srgb,var(--text)_5%,transparent)]"
            style={{ color: 'var(--text)' }}
          >
            <Menu size={18} />
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0 md:flex-none flex-1 md:justify-start justify-center"
          >
            <Sparkmark />
            <span
              className="text-xl font-semibold tracking-tight"
              style={{
                color: 'var(--text)',
                letterSpacing: '-0.015em',
              }}
            >
              LaunchPad
            </span>
          </Link>

          {/* Center nav (desktop) */}
          <nav className="hidden md:flex items-center gap-7 flex-1 justify-center">
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="inline-flex items-center gap-1 text-sm font-medium transition-colors hover:opacity-70"
                style={{ color: 'var(--text)' }}
              >
                {l.label}
                {l.hasMenu && <ChevronDown size={14} />}
              </Link>
            ))}
          </nav>

          {/* Right CTA */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href={cta.href}
              className="hidden sm:inline-flex items-center px-5 py-2.5 text-sm font-semibold transition-[transform,filter] duration-150 hover:brightness-95 active:scale-[0.98]"
              style={{
                background: 'var(--accent)',
                color: '#FFFFFF',
                borderRadius: 'var(--btn-radius)',
                letterSpacing: '-0.005em',
              }}
            >
              {cta.label}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen} side="left" width={300}>
        <div className="px-6 py-6">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 mb-8"
          >
            <Sparkmark />
            <span
              className="text-xl font-semibold"
              style={{ color: 'var(--text)', letterSpacing: '-0.015em' }}
            >
              LaunchPad
            </span>
          </Link>
          <nav className="flex flex-col">
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 text-base font-medium border-b transition-opacity hover:opacity-70"
                style={{
                  color: 'var(--text)',
                  borderColor: 'color-mix(in srgb, var(--text) 8%, transparent)',
                }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-3 mt-8">
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium text-center py-3 border rounded-full transition-opacity hover:opacity-70"
              style={{
                color: 'var(--text)',
                borderColor: 'color-mix(in srgb, var(--text) 12%, transparent)',
              }}
            >
              Sign in
            </Link>
            <Link
              href={cta.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm font-semibold text-center py-3 rounded-full transition-[transform,filter] duration-150 hover:brightness-95 active:scale-[0.98]"
              style={{ background: 'var(--accent)', color: '#FFFFFF' }}
            >
              {cta.label}
            </Link>
          </div>
        </div>
      </Sheet>
    </>
  );
}

/** Orange asterisk-style brand mark — Helios's "sun" */
function Sparkmark() {
  return (
    <svg
      width="26"
      height="26"
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
