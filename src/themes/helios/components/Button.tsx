import { Slot } from '@radix-ui/react-slot';
import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import { cn } from '@/core/lib/cn';

export type ButtonVariant = 'primary' | 'ghost' | 'accent' | 'social';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  /** Render as the child element (Radix Slot) for composition with `<Link>` etc. */
  asChild?: boolean;
}

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: { paddingInline: '0.875rem', paddingBlock: '0.5rem', fontSize: '0.8125rem' },
  md: {
    paddingInline: 'var(--btn-padding-x)',
    paddingBlock: 'var(--btn-padding-y)',
    fontSize: '0.875rem',
  },
  lg: { paddingInline: '1.75rem', paddingBlock: '0.875rem', fontSize: '1rem' },
};

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background: 'var(--primary)',
    color: 'var(--primary-contrast)',
    border: '1px solid transparent',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text)',
    border: '1px solid var(--border)',
  },
  accent: {
    background: 'var(--accent)',
    color: '#FFFFFF',
    border: '1px solid transparent',
  },
  social: {
    background: 'var(--surface)',
    color: 'var(--text)',
    border: '1px solid var(--border)',
  },
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth,
      leftIcon,
      rightIcon,
      asChild,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    const sharedClass = cn(
      'inline-flex items-center justify-center gap-2 cursor-pointer select-none',
      'transition-[transform,filter,opacity] duration-150 ease-out',
      'hover:brightness-95 hover:-translate-y-[1px]',
      'active:translate-y-0 active:brightness-90 active:scale-[0.99]',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:brightness-100 disabled:hover:translate-y-0',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      fullWidth && 'w-full',
      className
    );
    const sharedStyle: React.CSSProperties = {
      ...variantStyles[variant],
      ...sizeStyles[size],
      borderRadius: 'var(--btn-radius)',
      fontWeight: 'var(--btn-weight)' as React.CSSProperties['fontWeight'],
      fontFamily: 'var(--font-family)',
      ...style,
    };

    // Slot requires exactly one child — pass through the consumer's element as-is.
    if (asChild) {
      return (
        <Comp ref={ref as never} className={sharedClass} style={sharedStyle} {...props}>
          {children}
        </Comp>
      );
    }

    return (
      <Comp ref={ref as never} className={sharedClass} style={sharedStyle} {...props}>
        {leftIcon && <span className="inline-flex items-center">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="inline-flex items-center">{rightIcon}</span>}
      </Comp>
    );
  }
);
Button.displayName = 'Button';
