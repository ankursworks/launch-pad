import { ReactNode } from 'react';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}

export function PageHeader({ eyebrow, title, description, actions }: PageHeaderProps) {
  return (
    <header
      className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-10 border-b"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="min-w-0">
        {eyebrow && (
          <p
            className="text-xs uppercase tracking-[0.3em] font-semibold mb-2"
            style={{ color: 'var(--accent)' }}
          >
            {eyebrow}
          </p>
        )}
        <h1
          className="text-3xl md:text-4xl font-normal leading-tight"
          style={{ fontFamily: 'var(--font-display-family)' }}
        >
          {title}
        </h1>
        {description && (
          <p className="text-sm mt-2 max-w-2xl" style={{ color: 'var(--muted)' }}>
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </header>
  );
}
