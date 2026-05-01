'use client';
import * as Dialog from '@radix-ui/react-dialog';
import { ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
}

export function Modal({ open, onOpenChange, title, description, children }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 z-40 bg-black/50 data-[state=open]:animate-in data-[state=open]:fade-in-0"
        />
        <Dialog.Content
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4 p-6 border shadow-lg focus:outline-none"
          style={{
            background: 'var(--bg)',
            borderColor: 'var(--border)',
            borderRadius: 'var(--card-radius)',
          }}
        >
          <div className="flex justify-between items-start mb-4 gap-4">
            <div className="flex flex-col gap-1">
              <Dialog.Title
                className="text-xl font-normal"
                style={{ fontFamily: 'var(--font-display-family)' }}
              >
                {title}
              </Dialog.Title>
              {description && (
                <Dialog.Description className="text-sm" style={{ color: 'var(--muted)' }}>
                  {description}
                </Dialog.Description>
              )}
            </div>
            <Dialog.Close
              aria-label="Close"
              className="text-sm p-1 rounded hover:opacity-70 leading-none"
              style={{ color: 'var(--muted)' }}
            >
              ✕
            </Dialog.Close>
          </div>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
