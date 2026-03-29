'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for debouncing values
 * Useful for search inputs and API calls
 */
export const useDebounce = <T,>(value: T, delay: number = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

interface UseDebounceCallbackOptions {
  delay?: number;
  leading?: boolean;
}

/**
 * Debounce a callback function
 * @param callback - Function to debounce
 * @param options - Debounce options
 * @returns Debounced function
 */
export const useDebouncedCallback = <T extends (...args: any[]) => any>(
  callback: T,
  options: UseDebounceCallbackOptions = {}
): ((...args: Parameters<T>) => void) => {
  const { delay = 500, leading = false } = options;
  const [isLeading, setIsLeading] = useState(leading);
  let timeoutId: NodeJS.Timeout | null = null;

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (isLeading && !timeoutId) {
        callback(...args);
        setIsLeading(false);
      }

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        if (!isLeading) {
          callback(...args);
        }
        setIsLeading(true);
        timeoutId = null;
      }, delay);
    },
    [callback, delay, isLeading]
  );

  return debouncedCallback;
};
