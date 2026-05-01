'use client';
import * as Radix from '@radix-ui/react-checkbox';
import { forwardRef } from 'react';
import { cn } from '@/core/lib/cn';

interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof Radix.Root> {
  label?: string;
}

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ label, className, id, ...props }, ref) => {
    const generatedId = id ?? `cb-${Math.random().toString(36).slice(2, 8)}`;
    const root = (
      <Radix.Root
        ref={ref}
        id={generatedId}
        className={cn(
          'w-4 h-4 rounded border flex items-center justify-center transition-colors outline-none focus:ring-2 focus:ring-offset-1',
          'data-[state=checked]:bg-[var(--accent)] data-[state=checked]:border-[var(--accent)]',
          className
        )}
        style={{ borderColor: 'var(--border)' }}
        {...props}
      >
        <Radix.Indicator>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path
              d="M2 5 L4 7 L8 3"
              stroke="white"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Radix.Indicator>
      </Radix.Root>
    );
    if (!label) return root;
    return (
      <label htmlFor={generatedId} className="inline-flex items-center gap-2 text-sm cursor-pointer">
        {root}
        <span>{label}</span>
      </label>
    );
  }
);
Checkbox.displayName = 'Checkbox';
