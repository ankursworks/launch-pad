import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/core/lib/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  /** Render label uppercase + letter-spaced (Helios spec). */
  uppercaseLabel?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, uppercaseLabel, className, style, ...props }, ref) => (
    <label className="flex flex-col gap-2 w-full">
      {label && (
        <span
          className={cn(
            'font-semibold',
            uppercaseLabel ? 'text-xs uppercase tracking-widest' : 'text-sm'
          )}
          style={uppercaseLabel ? { color: 'var(--muted)' } : undefined}
        >
          {label}
        </span>
      )}
      <input
        ref={ref}
        className={cn(
          'w-full border outline-none transition-colors duration-150',
          'border-[color:var(--border)]',
          'hover:border-[color:var(--muted)]',
          'focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent)]/20',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'placeholder:text-[color:var(--muted)]/70',
          className
        )}
        style={{
          background: 'var(--surface)',
          color: 'var(--text)',
          borderRadius: 'var(--input-radius)',
          paddingInline: 'var(--input-padding-x)',
          paddingBlock: 'var(--input-padding-y)',
          fontFamily: 'var(--font-family)',
          fontSize: '0.875rem',
          ...style,
        }}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </label>
  )
);
Input.displayName = 'Input';
