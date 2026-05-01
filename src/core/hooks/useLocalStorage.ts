import { useCallback, useEffect, useState } from 'react';

/**
 * Typed localStorage hook with cross-tab sync.
 * Returns `[value, setValue, remove]`.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const read = useCallback((): T => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initialValue;
    } catch {
      return initialValue;
    }
  }, [key, initialValue]);

  const [stored, setStored] = useState<T>(read);

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStored((prev) => {
        const next = value instanceof Function ? value(prev) : value;
        try {
          window.localStorage.setItem(key, JSON.stringify(next));
        } catch {
          // ignore quota / private mode errors
        }
        return next;
      });
    },
    [key]
  );

  const remove = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // ignore
    }
    setStored(initialValue);
  }, [key, initialValue]);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStored(JSON.parse(e.newValue) as T);
        } catch {
          // ignore
        }
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [key]);

  return [stored, setValue, remove];
}
