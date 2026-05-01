'use client';
import * as Radix from '@radix-ui/react-toast';
import { create } from 'zustand';
import { ReactNode } from 'react';

export type ToastVariant = 'default' | 'success' | 'error';

interface ToastItem {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
}

interface ToastState {
  items: ToastItem[];
  toast: (item: Omit<ToastItem, 'id'>) => void;
  dismiss: (id: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  items: [],
  toast: (item) =>
    set((s) => ({
      items: [...s.items, { ...item, id: Math.random().toString(36).slice(2) }],
    })),
  dismiss: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
}));

export const useToast = () => useToastStore((s) => s.toast);

const variantBorder: Record<ToastVariant, string> = {
  default: 'var(--border)',
  success: '#0B996E',
  error: '#BE123C',
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const items = useToastStore((s) => s.items);
  const dismiss = useToastStore((s) => s.dismiss);

  return (
    <Radix.Provider swipeDirection="right" duration={4500}>
      {children}
      {items.map((item) => (
        <Radix.Root
          key={item.id}
          open
          onOpenChange={(open) => {
            if (!open) dismiss(item.id);
          }}
          className="border shadow-md p-4 grid grid-cols-[auto_1fr_auto] gap-3 items-start data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:animate-in data-[state=open]:slide-in-from-right-4"
          style={{
            background: 'var(--surface)',
            color: 'var(--text)',
            borderColor: variantBorder[item.variant ?? 'default'],
            borderRadius: 'var(--card-radius)',
          }}
        >
          <span
            className="w-2 h-2 mt-2 rounded-full"
            style={{ background: variantBorder[item.variant ?? 'default'] }}
          />
          <div>
            <Radix.Title className="text-sm font-semibold">{item.title}</Radix.Title>
            {item.description && (
              <Radix.Description
                className="text-sm mt-0.5"
                style={{ color: 'var(--muted)' }}
              >
                {item.description}
              </Radix.Description>
            )}
          </div>
          <Radix.Close
            aria-label="Dismiss"
            className="text-sm opacity-60 hover:opacity-100 transition-opacity"
          >
            ✕
          </Radix.Close>
        </Radix.Root>
      ))}
      <Radix.Viewport className="fixed top-4 right-4 flex flex-col gap-2 w-96 max-w-[calc(100vw-2rem)] z-[100] outline-none" />
    </Radix.Provider>
  );
}
