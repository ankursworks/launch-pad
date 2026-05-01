import { useCallback, useState } from 'react';

export interface UseDisclosureReturn {
  open: boolean;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  setOpen: (open: boolean) => void;
}

/**
 * Common pattern for controlled open/close state (modals, popovers, drawers).
 *
 * const { open, onOpen, onClose, onToggle } = useDisclosure();
 */
export function useDisclosure(initial = false): UseDisclosureReturn {
  const [open, setOpen] = useState(initial);
  return {
    open,
    isOpen: open,
    onOpen: useCallback(() => setOpen(true), []),
    onClose: useCallback(() => setOpen(false), []),
    onToggle: useCallback(() => setOpen((o) => !o), []),
    setOpen,
  };
}
