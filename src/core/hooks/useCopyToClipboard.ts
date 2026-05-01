import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Copies text to clipboard and exposes a transient `copied` flag.
 *
 * const { copied, copy } = useCopyToClipboard();
 * <Button onClick={() => copy('hello')}>Copy</Button>
 */
export function useCopyToClipboard(resetMs = 2000) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = useCallback(
    async (value: string) => {
      try {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setCopied(false), resetMs);
        return true;
      } catch {
        setCopied(false);
        return false;
      }
    },
    [resetMs]
  );

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  return { copied, copy };
}
