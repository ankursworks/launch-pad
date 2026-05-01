import { ReactNode } from 'react';
import { cn } from '@/core/lib/cn';

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  /** Adds hover-lift + border tint when used as a clickable surface. */
  interactive?: boolean;
}

export function Card({ title, children, className, interactive }: CardProps) {
  return (
    <div
      className={cn(
        'p-6 border',
        interactive &&
          'transition-[transform,box-shadow,border-color] duration-200 ease-out cursor-pointer hover:-translate-y-[2px] hover:shadow-md hover:border-[color:var(--accent)]',
        className
      )}
      style={{
        background: 'var(--surface)',
        borderColor: 'var(--border)',
        borderRadius: 'var(--card-radius)',
        boxShadow: 'var(--card-shadow)',
      }}
    >
      {title && (
        <h3
          className="text-lg font-normal mb-3"
          style={{ fontFamily: 'var(--font-display-family)' }}
        >
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
