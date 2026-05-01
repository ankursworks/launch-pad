import { ReactNode } from 'react';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center px-6 py-16 border border-dashed ${className ?? ''}`}
      style={{
        borderColor: 'var(--border)',
        borderRadius: 'var(--card-radius)',
        background: 'var(--surface)',
      }}
    >
      {icon && (
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
          style={{ background: 'var(--bg)', color: 'var(--muted)' }}
        >
          {icon}
        </div>
      )}
      <h3
        className="text-lg font-semibold"
        style={{ fontFamily: 'var(--font-display-family)' }}
      >
        {title}
      </h3>
      {description && (
        <p
          className="text-sm mt-1 max-w-sm"
          style={{ color: 'var(--muted)' }}
        >
          {description}
        </p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
