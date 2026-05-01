'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/core/auth';
import { Button } from './Button';
import { ThemeSwitcher } from './ThemeSwitcher';

export function Header() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const onLogout = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <header
      className="flex items-center justify-between px-6 py-4 border-b"
      style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
    >
      <Link
        href="/"
        className="text-xl font-normal"
        style={{ fontFamily: 'var(--font-display-family)' }}
      >
        LaunchPad
      </Link>
      <nav className="flex items-center gap-4 text-sm">
        <Link href="/dashboard" className="hover:opacity-80">
          Dashboard
        </Link>
        <Link href="/profile" className="hover:opacity-80">
          Profile
        </Link>
        <Link href="/style-guide" className="hover:opacity-80">
          Style&nbsp;Guide
        </Link>
        <ThemeSwitcher />
        {user ? (
          <Button variant="ghost" size="sm" onClick={onLogout}>
            Logout
          </Button>
        ) : (
          <Button asChild size="sm">
            <Link href="/login">Login</Link>
          </Button>
        )}
      </nav>
    </header>
  );
}
