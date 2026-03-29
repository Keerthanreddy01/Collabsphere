/**
 * Performance Optimization Utilities
 * Memoization, throttling, debouncing, and caching strategies
 */

/**
 * Memoize function results
 */
export function memoize<T extends (...args: any[]) => any>(
  fn: T,
  options: { maxSize?: number; ttl?: number } = {}
): T {
  const { maxSize = 100, ttl = Infinity } = options;
  const cache = new Map<string, { value: any; timestamp: number }>();

  return ((...args: any[]) => {
    const key = JSON.stringify(args);

    // Check cache
    if (cache.has(key)) {
      const cached = cache.get(key)!;
      if (Date.now() - cached.timestamp < ttl) {
        return cached.value;
      } else {
        cache.delete(key);
      }
    }

    // Call function
    const value = fn(...args);

    // Store in cache
    if (cache.size >= maxSize) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
    cache.set(key, { value, timestamp: Date.now() });

    return value;
  }) as T;
}

/**
 * Throttle function calls
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (!timeout) {
      fn(...args);
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
    }
  };
}

/**
 * Debounce function calls
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(...args);
    }, wait);
  };
}

/**
 * Single execution (run once)
 */
export function once<T extends (...args: any[]) => any>(fn: T): T {
  let called = false;
  let result: any;

  return ((...args: any[]) => {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  }) as T;
}

/**
 * Rate limiter
 */
export class RateLimiter {
  private timestamps: number[] = [];

  constructor(private maxRequests: number, private timeWindow: number) {}

  /**
   * Check if request should be allowed
   */
  isAllowed(): boolean {
    const now = Date.now();
    const cutoff = now - this.timeWindow;

    // Remove old timestamps
    this.timestamps = this.timestamps.filter((t) => t > cutoff);

    if (this.timestamps.length < this.maxRequests) {
      this.timestamps.push(now);
      return true;
    }

    return false;
  }

  /**
   * Get remaining requests
   */
  getRemaining(): number {
    const now = Date.now();
    const cutoff = now - this.timeWindow;
    this.timestamps = this.timestamps.filter((t) => t > cutoff);
    return Math.max(0, this.maxRequests - this.timestamps.length);
  }

  /**
   * Reset rate limiter
   */
  reset(): void {
    this.timestamps = [];
  }
}

/**
 * Request cache with TTL
 */
export class RequestCache<T = any> {
  private cache = new Map<string, { data: T; timestamp: number }>();

  constructor(private ttl: number = 5 * 60 * 1000) {}

  /**
   * Get cached value
   */
  get(key: string): T | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    if (Date.now() - cached.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  /**
   * Set cache value
   */
  set(key: string, data: T): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  /**
   * Check if key exists and is valid
   */
  has(key: string): boolean {
    return this.get(key) !== null;
  }

  /**
   * Clear specific key
   */
  remove(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Get cache size
   */
  size(): number {
    return this.cache.size;
  }
}

/**
 * LRU (Least Recently Used) Cache
 */
export class LRUCache<T = any> {
  private cache = new Map<string, T>();
  private accessOrder: string[] = [];

  constructor(private maxSize: number = 100) {}

  /**
   * Get value from cache
   */
  get(key: string): T | undefined {
    if (!this.cache.has(key)) return undefined;

    // Move to end (most recently used)
    this.accessOrder = this.accessOrder.filter((k) => k !== key);
    this.accessOrder.push(key);

    return this.cache.get(key);
  }

  /**
   * Set value in cache
   */
  set(key: string, value: T): void {
    if (this.cache.has(key)) {
      // Update existing key
      this.accessOrder = this.accessOrder.filter((k) => k !== key);
    } else if (this.cache.size >= this.maxSize) {
      // Remove least recently used
      const lruKey = this.accessOrder.shift()!;
      this.cache.delete(lruKey);
    }

    this.cache.set(key, value);
    this.accessOrder.push(key);
  }

  /**
   * Check if key exists
   */
  has(key: string): boolean {
    return this.cache.has(key);
  }

  /**
   * Remove key
   */
  remove(key: string): void {
    this.cache.delete(key);
    this.accessOrder = this.accessOrder.filter((k) => k !== key);
  }

  /**
   * Clear cache
   */
  clear(): void {
    this.cache.clear();
    this.accessOrder = [];
  }

  /**
   * Get cache size
   */
  size(): number {
    return this.cache.size;
  }
}

/**
 * Batch processor
 */
export class BatchProcessor<T, R> {
  private queue: T[] = [];
  private processing = false;

  constructor(
    private processor: (items: T[]) => Promise<R>,
    private batchSize: number = 10,
    private delayMs: number = 100
  ) {}

  /**
   * Add item to batch
   */
  add(item: T): void {
    this.queue.push(item);
    if (this.queue.length >= this.batchSize) {
      this.flush();
    }
  }

  /**
   * Process pending items
   */
  async flush(): Promise<R | null> {
    if (this.queue.length === 0 || this.processing) return null;

    this.processing = true;
    const batch = this.queue.splice(0, this.batchSize);

    try {
      return await this.processor(batch);
    } finally {
      this.processing = false;

      // Process next batch if items remain
      if (this.queue.length > 0) {
        setTimeout(() => this.flush(), this.delayMs);
      }
    }
  }

  /**
   * Get pending items count
   */
  getPendingCount(): number {
    return this.queue.length;
  }

  /**
   * Clear queue
   */
  clear(): void {
    this.queue = [];
  }
}

/**
 * Lazy initialization
 */
export function lazy<T>(initializer: () => T): () => T {
  let value: T | undefined;
  let initialized = false;

  return () => {
    if (!initialized) {
      value = initializer();
      initialized = true;
    }
    return value as T;
  };
}

/**
 * Connection pool for managing limited resources
 */
export class ConnectionPool<T> {
  private available: T[] = [];
  private inUse = new Set<T>();

  constructor(
    private factory: () => T,
    private size: number
  ) {
    this.available = Array.from({ length: size }, () => factory());
  }

  /**
   * Acquire connection
   */
  acquire(): T {
    if (this.available.length === 0) {
      throw new Error('No available connections');
    }
    const conn = this.available.pop()!;
    this.inUse.add(conn);
    return conn;
  }

  /**
   * Release connection
   */
  release(conn: T): void {
    this.inUse.delete(conn);
    this.available.push(conn);
  }

  /**
   * Get pool stats
   */
  getStats() {
    return {
      available: this.available.length,
      inUse: this.inUse.size,
      total: this.size,
    };
  }
}
