import { ReactNode } from 'react';
import { Card } from './Card';

interface StatProps {
  label: string;
  value: string | number;
  delta?: string;
  deltaTrend?: 'up' | 'down' | 'neutral';
  icon?: ReactNode;
}

export function Stat({ label, value, delta, deltaTrend = 'neutral', icon }: StatProps) {
  const deltaColor =
    deltaTrend === 'up'
      ? '#0B996E'
      : deltaTrend === 'down'
      ? '#BE123C'
      : 'var(--muted)';

  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <span
          className="text-xs uppercase tracking-widest font-semibold"
          style={{ color: 'var(--muted)' }}
        >
          {label}
        </span>
        {icon && (
          <span className="opacity-70" style={{ color: 'var(--muted)' }}>
            {icon}
          </span>
        )}
      </div>
      <div
        className="mt-3 text-3xl"
        style={{ fontFamily: 'var(--font-display-family)' }}
      >
        {value}
      </div>
      {delta && (
        <div className="mt-1 text-xs font-semibold" style={{ color: deltaColor }}>
          {delta}
        </div>
      )}
    </Card>
  );
}
