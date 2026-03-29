/**
 * Testing Utilities and Helpers
 * Utilities for unit testing and component testing
 */

/**
 * Create mock fetch response
 */
export const createMockFetchResponse = <T = any>(data: T, options?: { status?: number }) => {
  return Promise.resolve({
    ok: (options?.status || 200) < 400,
    status: options?.status || 200,
    json: () => Promise.resolve(data),
    text: () => Promise.resolve(JSON.stringify(data)),
    blob: () => Promise.resolve(new Blob([JSON.stringify(data)])),
    clone: () => createMockFetchResponse(data, options),
    headers: new Headers(),
  } as unknown as Response);
};

/**
 * Mock fetch with request tracking
 */
export const createMockFetch = () => {
  const calls: any[] = [];

  return {
    fn: ((input: RequestInfo, init?: RequestInit) => {
      calls.push({ input, init });
      return createMockFetchResponse({ success: true });
    }) as typeof fetch,
    getCalls: () => calls,
    getLastCall: () => calls[calls.length - 1],
    clear: () => calls.splice(0),
  };
};

/**
 * Create mock localStorage
 */
export const createMockStorage = () => {
  const store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      Object.keys(store).forEach((key) => delete store[key]);
    },
    key: (index: number) => Object.keys(store)[index] || null,
    get length() {
      return Object.keys(store).length;
    },
  };
};

/**
 * Mock timer utilities
 */
export const createMockTimers = () => {
  const timers: Map<number, NodeJS.Timeout> = new Map();
  let nextId = 1;

  return {
    setTimeout: (callback: () => void, ms: number) => {
      const id = nextId++;
      timers.set(id, setTimeout(callback, ms));
      return id;
    },
    clearTimeout: (id: number) => {
      const timer = timers.get(id);
      if (timer) clearTimeout(timer);
      timers.delete(id);
    },
    setInterval: (callback: () => void, ms: number) => {
      const id = nextId++;
      timers.set(id, setInterval(callback, ms));
      return id;
    },
    clearInterval: (id: number) => {
      const timer = timers.get(id);
      if (timer) clearInterval(timer);
      timers.delete(id);
    },
    clearAll: () => {
      timers.forEach((timer) => {
        clearTimeout(timer);
        clearInterval(timer);
      });
      timers.clear();
    },
  };
};

/**
 * Test data builder
 */
export class TestDataBuilder {
  static user(overrides = {}) {
    return {
      id: 'test-user-1',
      email: 'test@example.com',
      name: 'Test User',
      username: 'testuser',
      role: 'user' as const,
      followers: 0,
      following: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...overrides,
    };
  }

  static project(overrides = {}) {
    return {
      id: 'test-project-1',
      title: 'Test Project',
      description: 'A test project',
      shortDescription: 'Test',
      status: 'active' as const,
      technologies: ['React', 'TypeScript'],
      applicants: 0,
      views: 0,
      bookmarks: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...overrides,
    };
  }

  static notification(overrides = {}) {
    return {
      id: 'test-notification-1',
      type: 'info' as const,
      title: 'Test Notification',
      message: 'This is a test notification',
      read: false,
      createdAt: new Date().toISOString(),
      ...overrides,
    };
  }

  static error(message = 'Test error') {
    return new Error(message);
  }
}

/**
 * Assertion helpers
 */
export const assert = {
  /**
   * Assert value is truthy
   */
  truthy: (value: any, message?: string) => {
    if (!value) throw new Error(message || 'Expected value to be truthy');
  },

  /**
   * Assert value is falsy
   */
  falsy: (value: any, message?: string) => {
    if (value) throw new Error(message || 'Expected value to be falsy');
  },

  /**
   * Assert values are equal
   */
  equal: (actual: any, expected: any, message?: string) => {
    if (actual !== expected) {
      throw new Error(
        message || `Expected ${actual} to equal ${expected}`
      );
    }
  },

  /**
   * Assert values are deeply equal
   */
  deepEqual: (actual: any, expected: any, message?: string) => {
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      throw new Error(
        message || `Expected ${JSON.stringify(actual)} to deep equal ${JSON.stringify(expected)}`
      );
    }
  },

  /**
   * Assert value is instance of type
   */
  instanceOf: (value: any, type: Function, message?: string) => {
    if (!(value instanceof type)) {
      throw new Error(
        message || `Expected value to be instance of ${type.name}`
      );
    }
  },

  /**
   * Assert function throws
   */
  throws: (fn: () => void, message?: string) => {
    let threw = false;
    try {
      fn();
    } catch {
      threw = true;
    }
    if (!threw) throw new Error(message || 'Expected function to throw');
  },

  /**
   * Assert function does not throw
   */
  noThrow: (fn: () => void, message?: string) => {
    try {
      fn();
    } catch (error) {
      throw new Error(message || `Expected function not to throw: ${error}`);
    }
  },
};

/**
 * Spy utility - track function calls
 */
export class Spy {
  private calls: any[] = [];

  constructor(public fn: (...args: any[]) => any = () => {}) {}

  /**
   * Execute tracked function
   */
  call(...args: any[]) {
    this.calls.push(args);
    return this.fn(...args);
  }

  /**
   * Get all calls
   */
  getCalls() {
    return this.calls;
  }

  /**
   * Get call count
   */
  getCallCount() {
    return this.calls.length;
  }

  /**
   * Get first call
   */
  getFirstCall() {
    return this.calls[0];
  }

  /**
   * Get last call
   */
  getLastCall() {
    return this.calls[this.calls.length - 1];
  }

  /**
   * Was called with arguments
   */
  wasCalledWith(...args: any[]) {
    return this.calls.some((callArgs) => JSON.stringify(callArgs) === JSON.stringify(args));
  }

  /**
   * Clear call history
   */
  reset() {
    this.calls = [];
  }
}

/**
 * Wait utilities for async testing
 */
export const wait = {
  /**
   * Wait for condition to be true
   */
  for: async (
    condition: () => boolean,
    timeout: number = 5000,
    interval: number = 50
  ): Promise<void> => {
    const start = Date.now();
    while (!condition()) {
      if (Date.now() - start > timeout) {
        throw new Error('Timeout waiting for condition');
      }
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
  },

  /**
   * Wait for specific time
   */
  ms: (ms: number) => new Promise((resolve) => setTimeout(resolve, ms)),

  /**
   * Wait for next tick
   */
  nextTick: () => new Promise((resolve) => process.nextTick(resolve)),

  /**
   * Wait for microtask
   */
  microtask: () => Promise.resolve(),
};

/**
 * Retry utility for flaky tests
 */
export const retry = async <T,>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  delayMs: number = 100
): Promise<T> => {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      if (attempt < maxAttempts) {
        await wait.ms(delayMs * attempt);
      }
    }
  }

  throw lastError;
};
