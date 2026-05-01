'use client';
import * as Radix from '@radix-ui/react-switch';
import { forwardRef } from 'react';
import { cn } from '@/core/lib/cn';

interface SwitchProps extends React.ComponentPropsWithoutRef<typeof Radix.Root> {
  label?: string;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  ({ label, className, id, ...props }, ref) => {
    const generatedId = id ?? `sw-${Math.random().toString(36).slice(2, 8)}`;
    const root = (
      <Radix.Root
        ref={ref}
        id={generatedId}
        className={cn(
          'relative w-10 h-6 rounded-full transition-colors outline-none focus:ring-2 focus:ring-offset-1',
          'data-[state=unchecked]:bg-[var(--border)]',
          'data-[state=checked]:bg-[var(--accent)]',
          className
        )}
        {...props}
      >
        <Radix.Thumb
          className={cn(
            'block w-5 h-5 bg-white rounded-full shadow transition-transform duration-200',
            'translate-x-0.5 data-[state=checked]:translate-x-[18px]'
          )}
        />
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
Switch.displayName = 'Switch';
