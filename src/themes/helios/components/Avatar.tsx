'use client';
import * as Radix from '@radix-ui/react-avatar';
import { cn } from '@/core/lib/cn';

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  /** Background color when rendering fallback letters. */
  color?: string;
  size?: number;
  className?: string;
}

export function Avatar({
  src,
  alt,
  fallback,
  color = 'var(--primary)',
  size = 40,
  className,
}: AvatarProps) {
  return (
    <Radix.Root
      className={cn(
        'inline-flex items-center justify-center align-middle overflow-hidden rounded-xl shrink-0 select-none text-white font-semibold',
        className
      )}
      style={{ width: size, height: size, background: color, fontSize: size * 0.4 }}
    >
      {src && (
        <Radix.Image
          src={src}
          alt={alt ?? ''}
          className="w-full h-full object-cover"
        />
      )}
      <Radix.Fallback className="flex items-center justify-center w-full h-full">
        {(fallback ?? (alt ? alt.charAt(0) : '?')).toUpperCase()}
      </Radix.Fallback>
    </Radix.Root>
  );
}
