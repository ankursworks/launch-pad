'use client';
import * as Radix from '@radix-ui/react-progress';
import { cn } from '@/core/lib/cn';

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  /** Optional accent override */
  accent?: string;
}

export function Progress({ value, max = 100, className, accent }: ProgressProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <Radix.Root
      value={value}
      max={max}
      className={cn('relative w-full h-2 overflow-hidden rounded-full', className)}
      style={{ background: 'var(--border)' }}
    >
      <Radix.Indicator
        className="h-full transition-transform duration-500 ease-out"
        style={{
          width: '100%',
          background: accent ?? 'var(--accent)',
          transform: `translateX(-${100 - pct}%)`,
        }}
      />
    </Radix.Root>
  );
}
