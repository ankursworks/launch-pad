'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Component,
  CreditCard,
  FolderKanban,
  Menu,
  Palette,
  Settings as SettingsIcon,
  User as UserIcon,
  Users,
} from 'lucide-react';
import { useAuth } from '@/core/auth';
import { cn } from '@/core/lib/cn';
import { Avatar } from './Avatar';
import { Badge } from './Badge';
import { Input } from './Input';
import { Progress } from './Progress';
import { Sheet } from './Sheet';
import { ThemeSwitcher } from './ThemeSwitcher';

interface NavItem {
  label: string;
  hash?: string;
  href?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const componentSections: NavSection[] = [
  {
    title: 'Display',
    items: [
      { label: 'Avatar', hash: 'avatar' },
      { label: 'Badge', hash: 'badge' },
      { label: 'Stat', hash: 'stat' },
      { label: 'Progress', hash: 'progress' },
      { label: 'Skeleton', hash: 'skeleton' },
    ],
  },
  {
    title: 'Inputs',
    items: [
      { label: 'Button', hash: 'button' },
      { label: 'Input', hash: 'input' },
      { label: 'Select', hash: 'select' },
      { label: 'Checkbox', hash: 'checkbox' },
      { label: 'Switch', hash: 'switch' },
    ],
  },
  {
    title: 'Overlays',
    items: [
      { label: 'Modal', hash: 'modal' },
      { label: 'Dropdown', hash: 'dropdown' },
      { label: 'Tooltip', hash: 'tooltip' },
      { label: 'Toast', hash: 'toast' },
      { label: 'Tabs', hash: 'tabs' },
    ],
  },
  {
    title: 'Data',
    items: [
      { label: 'Card', hash: 'card' },
      { label: 'Table', hash: 'table' },
    ],
  },
];

interface AppLink {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number | string }>;
}

const appLinks: AppLink[] = [
  { label: 'Components', href: '/dashboard', icon: Component },
  { label: 'Projects', href: '/projects', icon: FolderKanban },
  { label: 'Team', href: '/team', icon: Users },
  { label: 'Billing', href: '/billing', icon: CreditCard },
  { label: 'Settings', href: '/settings', icon: SettingsIcon },
];

const accountLinks: AppLink[] = [
  { label: 'Profile', href: '/profile', icon: UserIcon },
  { label: 'Style Guide', href: '/style-guide', icon: Palette },
];

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close drawer when route changes
  const pathname = usePathname();
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <MobileTopBar onMenuClick={() => setMobileOpen(true)} />
      <SidebarPanel className="hidden md:flex md:w-64 md:sticky md:top-0 md:h-screen border-r" />
      <Sheet
        open={mobileOpen}
        onOpenChange={setMobileOpen}
        side="left"
        width={288}
        hideClose
      >
        <SidebarPanel
          className="flex w-full"
          onLinkClick={() => setMobileOpen(false)}
        />
      </Sheet>
    </>
  );
}

function MobileTopBar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header
      className="md:hidden sticky top-0 z-30 flex items-center gap-3 px-4 py-3 border-b"
      style={{
        background: 'var(--surface)',
        borderColor: 'var(--border)',
      }}
    >
      <button
        onClick={onMenuClick}
        className="p-2 -ml-2"
        aria-label="Open menu"
        style={{ color: 'var(--text)' }}
      >
        <Menu size={20} />
      </button>
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-sm"
        style={{
          background: 'var(--accent)',
          fontFamily: 'var(--font-display-family)',
        }}
      >
        L
      </div>
      <span
        className="font-semibold"
        style={{ fontFamily: 'var(--font-display-family)' }}
      >
        LaunchPad
      </span>
    </header>
  );
}

function SidebarPanel({
  className,
  onLinkClick,
}: {
  className?: string;
  onLinkClick?: () => void;
}) {
  const pathname = usePathname();
  const [filter, setFilter] = useState('');
  const [activeHash, setActiveHash] = useState<string>('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onHashChange = () => setActiveHash(window.location.hash.replace('#', ''));
    onHashChange();
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const showcaseRoute = pathname === '/dashboard';

  const filtered = componentSections
    .map((s) => ({
      ...s,
      items: s.items.filter((i) =>
        i.label.toLowerCase().includes(filter.toLowerCase())
      ),
    }))
    .filter((s) => s.items.length > 0);

  return (
    <aside
      className={cn('flex-col overflow-y-auto', className)}
      style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
    >
      {/* Workspace header */}
      <div
        className="flex items-center gap-2.5 px-4 py-4 border-b"
        style={{ borderColor: 'var(--border)' }}
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
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold truncate">LaunchPad</div>
          <div className="text-xs truncate" style={{ color: 'var(--muted)' }}>
            workspace
          </div>
        </div>
      </div>

      {/* App-level nav */}
      <nav
        className="px-3 py-3 space-y-0.5 border-b"
        style={{ borderColor: 'var(--border)' }}
      >
        {appLinks.map((l) => (
          <NavLink
            key={l.href}
            href={l.href}
            label={l.label}
            icon={<l.icon size={15} />}
            active={pathname === l.href}
            onClick={onLinkClick}
          />
        ))}
      </nav>

      {/* Component showcase nav (only on /dashboard) */}
      {showcaseRoute && (
        <>
          <div className="px-3 pt-3">
            <Input
              placeholder="Search components"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              aria-label="Search components"
            />
          </div>
          <nav className="flex-1 px-3 py-3 space-y-5">
            {filtered.map((section) => (
              <div key={section.title}>
                <div
                  className="px-2 mb-1.5 text-[10px] font-semibold uppercase tracking-widest"
                  style={{ color: 'var(--muted)' }}
                >
                  {section.title}
                </div>
                <ul className="space-y-0.5">
                  {section.items.map((item) => (
                    <li key={item.label}>
                      <a
                        href={`#${item.hash}`}
                        onClick={onLinkClick}
                        className={cn(
                          'block px-2.5 py-1.5 text-sm rounded-md transition-colors duration-150',
                          activeHash === item.hash
                            ? 'font-semibold'
                            : 'opacity-75 hover:opacity-100 hover:bg-[color:var(--bg)]'
                        )}
                        style={
                          activeHash === item.hash
                            ? { background: 'var(--bg)', color: 'var(--text)' }
                            : undefined
                        }
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </>
      )}

      {!showcaseRoute && <div className="flex-1" />}

      {/* Account links */}
      <div
        className="px-3 py-3 border-t space-y-0.5"
        style={{ borderColor: 'var(--border)' }}
      >
        <div
          className="px-2 mb-1.5 text-[10px] font-semibold uppercase tracking-widest"
          style={{ color: 'var(--muted)' }}
        >
          Account
        </div>
        {accountLinks.map((l) => (
          <NavLink
            key={l.href}
            href={l.href}
            label={l.label}
            icon={<l.icon size={15} />}
            active={pathname === l.href}
            onClick={onLinkClick}
          />
        ))}
      </div>

      {/* Plan footer */}
      <div
        className="px-3 py-3 border-t"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-semibold">12 / 50 projects</span>
          <div className="flex items-center gap-1.5">
            <Badge variant="accent">Pro</Badge>
            <ThemeSwitcher />
          </div>
        </div>
        <Progress value={12} max={50} />
      </div>

      <UserChip />
    </aside>
  );
}

function NavLink({
  href,
  label,
  icon,
  active,
  onClick,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'flex items-center gap-2.5 px-2.5 py-1.5 text-sm rounded-md transition-colors duration-150',
        !active && 'opacity-75 hover:opacity-100 hover:bg-[color:var(--bg)]'
      )}
      style={
        active
          ? { background: 'var(--bg)', color: 'var(--text)', fontWeight: 600 }
          : undefined
      }
    >
      <span style={{ color: active ? 'var(--accent)' : 'var(--muted)' }}>{icon}</span>
      {label}
    </Link>
  );
}

function UserChip() {
  const { user } = useAuth();
  if (!user) return null;
  return (
    <div
      className="flex items-center gap-2.5 px-3 py-3 border-t"
      style={{ borderColor: 'var(--border)' }}
    >
      <Avatar fallback={user.name.charAt(0)} color="var(--accent)" size={32} />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold truncate">{user.name}</div>
        <div className="text-xs truncate" style={{ color: 'var(--muted)' }}>
          {user.email}
        </div>
      </div>
    </div>
  );
}
