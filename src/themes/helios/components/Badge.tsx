import { cn } from '@/core/lib/cn';

export type BadgeVariant = 'default' | 'accent' | 'success' | 'warning' | 'danger' | 'outline';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
  default: { background: 'var(--panel)', color: 'var(--text)' },
  accent: {
    background: 'color-mix(in srgb, var(--accent) 12%, transparent)',
    color: 'var(--accent)',
  },
  success: { background: 'rgba(11, 153, 110, 0.12)', color: '#0B996E' },
  warning: { background: 'rgba(245, 158, 11, 0.14)', color: '#B45309' },
  danger: { background: 'rgba(225, 29, 72, 0.12)', color: '#BE123C' },
  outline: {
    background: 'transparent',
    color: 'var(--text)',
    border: '1px solid var(--border)',
  },
};

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-full',
        className
      )}
      style={variantStyles[variant]}
    >
      {children}
    </span>
  );
}
