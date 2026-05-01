'use client';
import * as Dialog from '@radix-ui/react-dialog';
import { ReactNode } from 'react';

interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side?: 'left' | 'right';
  width?: number | string;
  children: ReactNode;
  /** Hide the visually-rendered close button (still keyboard-accessible). */
  hideClose?: boolean;
  title?: string;
  description?: string;
}

/**
 * Slide-out drawer for mobile sidebars / side panels.
 * Built on Radix Dialog so focus trap + keyboard close + a11y come for free.
 */
export function Sheet({
  open,
  onOpenChange,
  side = 'left',
  width = 280,
  children,
  hideClose,
  title,
  description,
}: SheetProps) {
  const sideStyle: React.CSSProperties =
    side === 'left'
      ? { left: 0, top: 0, bottom: 0, width }
      : { right: 0, top: 0, bottom: 0, width };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/50" />
        <Dialog.Content
          className="fixed z-50 flex flex-col outline-none shadow-xl"
          style={{
            ...sideStyle,
            background: 'var(--surface)',
            borderInlineEnd: side === 'left' ? '1px solid var(--border)' : undefined,
            borderInlineStart: side === 'right' ? '1px solid var(--border)' : undefined,
          }}
        >
          {(title || description) && (
            <div
              className="px-4 py-3 border-b"
              style={{ borderColor: 'var(--border)' }}
            >
              {title && (
                <Dialog.Title
                  className="text-base font-semibold"
                  style={{ fontFamily: 'var(--font-display-family)' }}
                >
                  {title}
                </Dialog.Title>
              )}
              {description && (
                <Dialog.Description
                  className="text-xs"
                  style={{ color: 'var(--muted)' }}
                >
                  {description}
                </Dialog.Description>
              )}
            </div>
          )}
          <div className="flex-1 overflow-y-auto">{children}</div>
          {!hideClose && (
            <Dialog.Close
              aria-label="Close"
              className="absolute top-3 right-3 text-sm opacity-60 hover:opacity-100 transition-opacity p-1"
              style={{ color: 'var(--muted)' }}
            >
              ✕
            </Dialog.Close>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
