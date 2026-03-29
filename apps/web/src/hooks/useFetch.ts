'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { handlePromise } from '@/utils/error-handling';

interface UseFetchOptions {
  immediate?: boolean;
  cache?: boolean;
  cacheDuration?: number;
}

/**
 * Custom hook for fetching data
 * Handles loading, error, and caching states
 */
export const useFetch = <T,>(
  url: string | null,
  options: UseFetchOptions = {}
) => {
  const { immediate = true, cache = true, cacheDuration = 5 * 60 * 1000 } = options;
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const cacheRef = useRef<Record<string, { data: T; timestamp: number }>>({});
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async () => {
    if (!url) return;

    // Check cache
    if (cache && url in cacheRef.current) {
      const { data: cachedData, timestamp } = cacheRef.current[url];
      if (Date.now() - timestamp < cacheDuration) {
        setData(cachedData);
        return;
      }
    }

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    setIsLoading(true);
    setError(null);

    const [result, err] = await handlePromise(
      fetch(url, { signal: abortControllerRef.current.signal }).then((res) =>
        res.json()
      )
    );

    if (!abortControllerRef.current.signal.aborted) {
      if (err) {
        setError(err);
      } else if (result) {
        setData(result);
        if (cache) {
          cacheRef.current[url] = { data: result, timestamp: Date.now() };
        }
      }
      setIsLoading(false);
    }
  }, [url, cache, cacheDuration]);

  useEffect(() => {
    if (immediate) {
      fetchData();
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchData, immediate]);

  return { data, error, isLoading, refetch: fetchData };
};
