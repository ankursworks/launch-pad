'use client';
import * as Radix from '@radix-ui/react-select';
import { forwardRef, ReactNode } from 'react';
import { cn } from '@/core/lib/cn';

export const SelectRoot = Radix.Root;
export const SelectGroup = Radix.Group;
export const SelectLabel = Radix.Label;
export const SelectValue = Radix.Value;

export const SelectTrigger = forwardRef<
  React.ElementRef<typeof Radix.Trigger>,
  React.ComponentPropsWithoutRef<typeof Radix.Trigger>
>(({ className, children, ...props }, ref) => (
  <Radix.Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center justify-between gap-2 w-full text-sm border outline-none transition-colors duration-150',
      'border-[color:var(--border)]',
      'hover:border-[color:var(--muted)]',
      'data-[state=open]:border-[color:var(--accent)]',
      'focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent)]/20',
      className
    )}
    style={{
      background: 'var(--surface)',
      color: 'var(--text)',
      borderRadius: 'var(--input-radius)',
      paddingInline: 'var(--input-padding-x)',
      paddingBlock: 'var(--input-padding-y)',
    }}
    {...props}
  >
    {children}
    <Radix.Icon asChild>
      <ChevronDown />
    </Radix.Icon>
  </Radix.Trigger>
));
SelectTrigger.displayName = 'SelectTrigger';

export const SelectContent = forwardRef<
  React.ElementRef<typeof Radix.Content>,
  React.ComponentPropsWithoutRef<typeof Radix.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <Radix.Portal>
    <Radix.Content
      ref={ref}
      position={position}
      sideOffset={4}
      className={cn(
        'relative z-50 min-w-[8rem] overflow-hidden border shadow-md',
        className
      )}
      style={{
        background: 'var(--surface)',
        borderColor: 'var(--border)',
        borderRadius: 'var(--card-radius)',
      }}
      {...props}
    >
      <Radix.Viewport className="p-1">{children}</Radix.Viewport>
    </Radix.Content>
  </Radix.Portal>
));
SelectContent.displayName = 'SelectContent';

export const SelectItem = forwardRef<
  React.ElementRef<typeof Radix.Item>,
  React.ComponentPropsWithoutRef<typeof Radix.Item>
>(({ className, children, ...props }, ref) => (
  <Radix.Item
    ref={ref}
    className={cn(
      'relative flex items-center px-3 py-1.5 text-sm rounded outline-none cursor-pointer select-none',
      'data-[highlighted]:bg-[var(--bg)] data-[state=checked]:font-semibold',
      className
    )}
    {...props}
  >
    <Radix.ItemText>{children}</Radix.ItemText>
  </Radix.Item>
));
SelectItem.displayName = 'SelectItem';

export const SelectSeparator = () => (
  <Radix.Separator
    className="my-1 h-px"
    style={{ background: 'var(--border)' }}
  />
);

/** Simple convenience wrapper for the common case. */
interface SimpleSelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  options: { value: string; label: string }[];
  label?: string;
}

export function Select({
  value,
  onValueChange,
  placeholder = 'Select…',
  options,
  label,
}: SimpleSelectProps) {
  const trigger = (
    <SelectRoot value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o.value} value={o.value}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
  if (!label) return trigger;
  return (
    <label className="flex flex-col gap-2 w-full">
      <span className="text-sm font-semibold">{label}</span>
      {trigger}
    </label>
  );
}

function ChevronDown(props: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
