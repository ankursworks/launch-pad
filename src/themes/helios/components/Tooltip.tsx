'use client';
import * as Radix from '@radix-ui/react-tooltip';
import { ReactNode } from 'react';

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  delayDuration?: number;
}

export function Tooltip({ content, children, side = 'top', delayDuration }: TooltipProps) {
  return (
    <Radix.Root delayDuration={delayDuration}>
      <Radix.Trigger asChild>{children}</Radix.Trigger>
      <Radix.Portal>
        <Radix.Content
          side={side}
          sideOffset={6}
          className="z-50 px-2.5 py-1.5 text-xs rounded shadow-md"
          style={{
            background: 'var(--text)',
            color: 'var(--bg)',
            borderRadius: '0.375rem',
          }}
        >
          {content}
          <Radix.Arrow style={{ fill: 'var(--text)' }} />
        </Radix.Content>
      </Radix.Portal>
    </Radix.Root>
  );
}
