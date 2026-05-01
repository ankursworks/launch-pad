import { Sidebar } from '../components/Sidebar';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen md:flex">
      <Sidebar />
      <main className="flex-1 min-w-0 p-6 md:p-10">{children}</main>
    </div>
  );
}
