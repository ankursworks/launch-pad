'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, ShoppingCart } from 'lucide-react';
import { Sheet } from '@/themes/helios';

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
  { label: 'Features', href: '#features' },
  { label: 'Pages', href: '#pages', hasMenu: true },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Blog', href: '#blog' },
];

export function MarketingNav({
  links = defaultLinks,
  cta = { label: 'Book a demo', href: '/signup' },
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

  // Close drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className="sticky top-0 z-30"
        style={{
          background: scrolled
            ? 'color-mix(in srgb, var(--bg) 72%, transparent)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(14px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(14px) saturate(180%)' : 'none',
          borderBottom: scrolled
            ? '1px solid color-mix(in srgb, var(--text) 6%, transparent)'
            : '1px solid transparent',
          boxShadow: scrolled ? '0 1px 2px rgba(0, 0, 0, 0.02)' : 'none',
          transition:
            'background 220ms ease, backdrop-filter 220ms ease, border-color 220ms ease, box-shadow 220ms ease',
        }}
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-3 md:gap-6">
          {/* Mobile hamburger (left) */}
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
            className="flex items-center gap-2 shrink-0 md:flex-none flex-1 md:justify-start justify-center md:translate-x-0 -translate-x-2"
          >
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
              className="text-base font-semibold tracking-tight"
              style={{
                fontFamily: 'var(--font-display-family)',
                letterSpacing: '-0.01em',
              }}
            >
              LaunchPad
            </span>
          </Link>

          {/* Center nav (desktop only) */}
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

          {/* Right cluster */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              aria-label="Cart"
              className="relative w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-[color:color-mix(in_srgb,var(--text)_5%,transparent)]"
              style={{ color: 'var(--text)' }}
            >
              <ShoppingCart size={16} />
              <span
                className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white"
                style={{ background: 'var(--accent)' }}
              >
                0
              </span>
            </button>
            <Link
              href={cta.href}
              className="hidden sm:inline-flex items-center px-5 py-2.5 text-sm font-semibold transition-[transform,filter] duration-150 hover:brightness-95 active:scale-[0.98]"
              style={{
                background: 'var(--text)',
                color: 'var(--surface)',
                borderRadius: '9999px',
                letterSpacing: '-0.01em',
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
            className="flex items-center gap-2.5 mb-8"
          >
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

          <nav className="flex flex-col">
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 text-base font-medium border-b transition-opacity hover:opacity-70"
                style={{
                  color: 'var(--text)',
                  borderColor:
                    'color-mix(in srgb, var(--text) 8%, transparent)',
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
                borderColor:
                  'color-mix(in srgb, var(--text) 12%, transparent)',
              }}
            >
              Sign in
            </Link>
            <Link
              href={cta.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm font-semibold text-center py-3 rounded-full transition-[transform,filter] duration-150 hover:brightness-95 active:scale-[0.98]"
              style={{
                background: 'var(--text)',
                color: 'var(--surface)',
              }}
            >
              {cta.label}
            </Link>
          </div>
        </div>
      </Sheet>
    </>
  );
}
