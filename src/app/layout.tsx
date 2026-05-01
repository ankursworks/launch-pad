import type { Metadata } from 'next';
import { Inter, Inter_Tight, BIZ_UDPMincho } from 'next/font/google';
import './globals.css';
import { Providers } from '@/core/Providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
  display: 'swap',
});

// BIZ UDPMincho — editorial Mincho serif used by Helios for display.
// (Subset: 'latin' — the font is Japanese-primary but ships Latin glyphs.)
const bizMincho = BIZ_UDPMincho({
  subsets: ['latin'],
  variable: '--font-biz-mincho',
  display: 'swap',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'LaunchPad',
  description:
    'Kickstart your app development with prebuilt components, themes, and auth-ready templates.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} ${bizMincho.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
