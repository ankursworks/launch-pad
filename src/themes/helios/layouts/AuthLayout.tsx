export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main
      className="min-h-screen flex items-center justify-center p-4 md:p-8"
      style={{ background: 'var(--bg)' }}
    >
      <div className="w-full max-w-5xl">{children}</div>
    </main>
  );
}
