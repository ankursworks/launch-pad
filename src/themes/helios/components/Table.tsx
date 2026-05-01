import { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/core/lib/cn';

export const Table = forwardRef<HTMLTableElement, HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div
      className="w-full overflow-x-auto border"
      style={{ borderColor: 'var(--border)', borderRadius: 'var(--card-radius)' }}
    >
      <table
        ref={ref}
        className={cn('w-full text-sm', className)}
        style={{ background: 'var(--surface)' }}
        {...props}
      />
    </div>
  )
);
Table.displayName = 'Table';

export const THead = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead
      ref={ref}
      className={cn('text-left', className)}
      style={{ background: 'var(--bg)' }}
      {...props}
    />
  )
);
THead.displayName = 'THead';

export const TBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <tbody ref={ref} className={className} {...props} />
);
TBody.displayName = 'TBody';

export const Tr = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        'border-t transition-colors duration-150 hover:bg-[color:var(--bg)]',
        className
      )}
      style={{ borderColor: 'var(--border)' }}
      {...props}
    />
  )
);
Tr.displayName = 'Tr';

export const Th = forwardRef<HTMLTableCellElement, ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        'px-4 py-3 text-xs font-semibold uppercase tracking-widest',
        className
      )}
      style={{ color: 'var(--muted)' }}
      {...props}
    />
  )
);
Th.displayName = 'Th';

export const Td = forwardRef<HTMLTableCellElement, TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td ref={ref} className={cn('px-4 py-3 align-middle', className)} {...props} />
  )
);
Td.displayName = 'Td';
