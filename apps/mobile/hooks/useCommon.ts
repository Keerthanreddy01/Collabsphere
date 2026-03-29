/**
 * Mobile App - Custom React Native Hooks
 * Collection of reusable hooks for common mobile patterns
 */

import { useEffect, useRef, useState } from 'react';
import { appStore, STORE_KEYS } from '@/store/app-store';

/**
 * useAuth Hook - Authentication state management
 */
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAuth = async () => {
      const storedToken = appStore.get<string>(STORE_KEYS.AUTH_TOKEN);
      const storedUser = appStore.get(STORE_KEYS.CURRENT_USER);
      setToken(storedToken || null);
      setUser(storedUser || null);
      setIsLoading(false);
    };

    loadAuth();

    const unsubscribe = appStore.subscribe(() => {
      const currentUser = appStore.get(STORE_KEYS.CURRENT_USER);
      setUser(currentUser);
    });

    return unsubscribe;
  }, []);

  return { user, token, isLoading, isAuthenticated: !!token };
};

/**
 * useAppStorage Hook - Persistent storage helper
 */
export const useAppStorage = <T,>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadValue = async () => {
      const stored = appStore.get<T>(key, initialValue);
      setValue(stored);
      setIsLoaded(true);
    };

    loadValue();
  }, [key, initialValue]);

  const setStoredValue = async (newValue: T | ((val: T | null) => T)) => {
    try {
      const valueToStore = typeof newValue === 'function' ? newValue(value) : newValue;
      await appStore.set(key, valueToStore);
      setValue(valueToStore);
    } catch (error) {
      console.error(`Failed to set storage key ${key}:`, error);
    }
  };

  const removeStoredValue = async () => {
    try {
      await appStore.remove(key);
      setValue(null);
    } catch (error) {
      console.error(`Failed to remove storage key ${key}:`, error);
    }
  };

  return [value, setStoredValue, removeStoredValue, isLoaded] as const;
};

/**
 * useDebounce Hook - Debounce values for search inputs
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

/**
 * usePrevious Hook - Track previous value
 */
export const usePrevious = <T,>(value: T): T | undefined => {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

/**
 * useAsync Hook - Handle async operations
 */
export const useAsync = <T,>(
  asyncFunction: () => Promise<T>,
  immediate: boolean = true
) => {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const execute = async () => {
    setStatus('pending');
    setData(null);
    setError(null);

    try {
      const response = await asyncFunction();
      setData(response);
      setStatus('success');
      return response;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      setStatus('error');
      throw error;
    }
  };

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate]);

  return { status, data, error, execute };
};

/**
 * useTimeout Hook - Manage setTimeout lifecycle
 */
export const useTimeout = (callback: () => void, delay: number | null) => {
  useEffect(() => {
    if (delay === null) return;

    const handler = setTimeout(callback, delay);
    return () => clearTimeout(handler);
  }, [callback, delay]);
};

/**
 * useInterval Hook - Manage setInterval lifecycle
 */
export const useInterval = (callback: () => void, delay: number | null) => {
  useEffect(() => {
    if (delay === null) return;

    const handler = setInterval(callback, delay);
    return () => clearInterval(handler);
  }, [callback, delay]);
};

/**
 * useMount Hook - Run effect on component mount
 */
export const useMount = (callback: () => void) => {
  useEffect(callback, []);
};

/**
 * useUnmount Hook - Run effect on component unmount
 */
export const useUnmount = (callback: () => void) => {
  useEffect(() => {
    return callback;
  }, []);
};
