'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface AsyncState<T> {
  status: 'idle' | 'pending' | 'success' | 'error';
  data: T | null;
  error: Error | null;
}

/**
 * Custom hook for handling async operations
 * Manages loading, success, and error states
 */
export const useAsync = <T,>(asyncFunction: () => Promise<T>, immediate: boolean = true) => {
  const [state, setState] = useState<AsyncState<T>>({
    status: 'idle',
    data: null,
    error: null,
  });

  const isMountedRef = useRef(true);

  const execute = useCallback(async () => {
    setState({ status: 'pending', data: null, error: null });

    try {
      const result = await asyncFunction();
      if (isMountedRef.current) {
        setState({ status: 'success', data: result, error: null });
      }
    } catch (error) {
      if (isMountedRef.current) {
        setState({
          status: 'error',
          data: null,
          error: error instanceof Error ? error : new Error(String(error)),
        });
      }
    }
  }, [asyncFunction]);

  useEffect(() => {
    isMountedRef.current = true;
    if (immediate) {
      execute();
    }

    return () => {
      isMountedRef.current = false;
    };
  }, [execute, immediate]);

  const retry = useCallback(() => {
    execute();
  }, [execute]);

  return { ...state, execute, retry };
};
