import { cn } from '@/core/lib/cn';

interface SkeletonProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  rounded?: 'sm' | 'md' | 'lg' | 'full';
}

const radiusMap = {
  sm: '0.375rem',
  md: '0.5rem',
  lg: '1rem',
  full: '9999px',
};

export function Skeleton({
  className,
  width,
  height = 16,
  rounded = 'md',
}: SkeletonProps) {
  return (
    <span
      className={cn('block animate-pulse', className)}
      style={{
        width: width ?? '100%',
        height,
        background: 'var(--border)',
        borderRadius: radiusMap[rounded],
        opacity: 0.7,
      }}
    />
  );
}
