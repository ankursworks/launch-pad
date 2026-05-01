'use client';
import * as Radix from '@radix-ui/react-dropdown-menu';
import { forwardRef } from 'react';
import { cn } from '@/core/lib/cn';

export const Dropdown = Radix.Root;
export const DropdownTrigger = Radix.Trigger;

export const DropdownContent = forwardRef<
  React.ElementRef<typeof Radix.Content>,
  React.ComponentPropsWithoutRef<typeof Radix.Content>
>(({ className, sideOffset = 6, ...props }, ref) => (
  <Radix.Portal>
    <Radix.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 min-w-[10rem] p-1 border shadow-md outline-none',
        className
      )}
      style={{
        background: 'var(--surface)',
        borderColor: 'var(--border)',
        borderRadius: 'var(--card-radius)',
      }}
      {...props}
    />
  </Radix.Portal>
));
DropdownContent.displayName = 'DropdownContent';

export const DropdownItem = forwardRef<
  React.ElementRef<typeof Radix.Item>,
  React.ComponentPropsWithoutRef<typeof Radix.Item>
>(({ className, ...props }, ref) => (
  <Radix.Item
    ref={ref}
    className={cn(
      'flex items-center gap-2 px-3 py-1.5 text-sm rounded outline-none cursor-pointer select-none',
      'data-[highlighted]:bg-[var(--bg)]',
      'data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed',
      className
    )}
    {...props}
  />
));
DropdownItem.displayName = 'DropdownItem';

export const DropdownLabel = forwardRef<
  React.ElementRef<typeof Radix.Label>,
  React.ComponentPropsWithoutRef<typeof Radix.Label>
>(({ className, ...props }, ref) => (
  <Radix.Label
    ref={ref}
    className={cn('px-3 py-1.5 text-xs uppercase tracking-widest font-semibold', className)}
    style={{ color: 'var(--muted)' }}
    {...props}
  />
));
DropdownLabel.displayName = 'DropdownLabel';

export const DropdownSeparator = () => (
  <Radix.Separator className="my-1 h-px" style={{ background: 'var(--border)' }} />
);
