'use client';
import * as Radix from '@radix-ui/react-tabs';
import { forwardRef } from 'react';
import { cn } from '@/core/lib/cn';

export const Tabs = Radix.Root;

export const TabsList = forwardRef<
  React.ElementRef<typeof Radix.List>,
  React.ComponentPropsWithoutRef<typeof Radix.List>
>(({ className, ...props }, ref) => (
  <Radix.List
    ref={ref}
    className={cn('flex gap-1 border-b', className)}
    style={{ borderColor: 'var(--border)' }}
    {...props}
  />
));
TabsList.displayName = 'TabsList';

export const TabsTrigger = forwardRef<
  React.ElementRef<typeof Radix.Trigger>,
  React.ComponentPropsWithoutRef<typeof Radix.Trigger>
>(({ className, ...props }, ref) => (
  <Radix.Trigger
    ref={ref}
    className={cn(
      'px-4 py-2 text-sm font-medium border-b-2 -mb-px outline-none transition-colors',
      'border-transparent text-[color:var(--muted)]',
      'data-[state=active]:text-[color:var(--text)] data-[state=active]:border-[color:var(--accent)] data-[state=active]:font-semibold',
      'hover:text-[color:var(--text)]',
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = 'TabsTrigger';

export const TabsContent = forwardRef<
  React.ElementRef<typeof Radix.Content>,
  React.ComponentPropsWithoutRef<typeof Radix.Content>
>(({ className, ...props }, ref) => (
  <Radix.Content
    ref={ref}
    className={cn('mt-4 outline-none', className)}
    {...props}
  />
));
TabsContent.displayName = 'TabsContent';
