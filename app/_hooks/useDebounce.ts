// hooks/useDebounce.ts
import { useRef, useEffect, useCallback } from "react";

type Callback<T extends any[]> = (...args: T) => void;

export function useDebounce<T extends any[]>(
  callback: Callback<T>,
  delay: number = 300,
  options: { leading?: boolean; trailing?: boolean } = { leading: false, trailing: true }
) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastArgsRef = useRef<T>();
  const callbackRef = useRef(callback);
  const calledLeading = useRef(false);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    calledLeading.current = false;
  }, []);

  const flush = useCallback(() => {
    if (timeoutRef.current && lastArgsRef.current) {
      callbackRef.current(...lastArgsRef.current);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      calledLeading.current = false;
    }
  }, []);

  const run = useCallback(
    (...args: T) => {
      lastArgsRef.current = args;

      const invoke = () => {
        if (lastArgsRef.current) {
          callbackRef.current(...lastArgsRef.current);
        }
      };

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      if (options.leading && !calledLeading.current) {
        invoke();
        calledLeading.current = true;
      }

      timeoutRef.current = setTimeout(() => {
        if (options.trailing && (!options.leading || calledLeading.current)) {
          invoke();
        }
        calledLeading.current = false;
        timeoutRef.current = null;
      }, delay);
    },
    [delay, options.leading, options.trailing]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancel();
    };
  }, [cancel]);

  return { run, cancel, flush };
}
