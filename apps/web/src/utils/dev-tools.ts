/**
 * Development & Testing Utilities
 * Helper functions for development, debugging, and testing
 */

/**
 * Mock delay for simulating network requests
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Generate random ID
 */
export const generateRandomId = (prefix: string = ''): string => {
  return `${prefix}${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Mock API response
 */
export const createMockResponse = <T = any>(data: T, delay: number = 500) => {
  return new Promise<T>((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};

/**
 * Mock API error
 */
export const createMockError = (message: string, delay: number = 500) => {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(message)), delay);
  });
};

/**
 * Generate mock users
 */
export const generateMockUsers = (count: number = 10) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `user-${i + 1}`,
    email: `user${i + 1}@example.com`,
    name: `User ${i + 1}`,
    username: `user${i + 1}`,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
    role: Math.random() > 0.9 ? ('admin' as const) : ('user' as const),
    followers: Math.floor(Math.random() * 1000),
    following: Math.floor(Math.random() * 500),
    createdAt: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 365).toISOString(),
    updatedAt: new Date().toISOString(),
  }));
};

/**
 * Generate mock projects
 */
export const generateMockProjects = (count: number = 10) => {
  const technologies = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Vue.js'];
  return Array.from({ length: count }).map((_, i) => ({
    id: `project-${i + 1}`,
    title: `Project ${i + 1}`,
    description: `This is a description for project ${i + 1}. It has all the details about what the project does.`,
    shortDescription: `Project ${i + 1} description`,
    status: (['active', 'completed', 'archived'] as const)[Math.floor(Math.random() * 3)],
    technologies: technologies.slice(0, Math.floor(Math.random() * 4) + 1),
    applicants: Math.floor(Math.random() * 50),
    views: Math.floor(Math.random() * 1000),
    bookmarks: Math.floor(Math.random() * 200),
    createdAt: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 365).toISOString(),
    updatedAt: new Date().toISOString(),
  }));
};

/**
 * Generate mock notifications
 */
export const generateMockNotifications = (count: number = 10) => {
  const types = ['info', 'warning', 'success', 'error', 'mention', 'follow', 'project'] as const;
  return Array.from({ length: count }).map((_, i) => ({
    id: `notification-${i + 1}`,
    type: types[Math.floor(Math.random() * types.length)],
    title: `Notification ${i + 1}`,
    message: `This is a message for notification ${i + 1}`,
    read: Math.random() > 0.5,
    createdAt: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24).toISOString(),
  }));
};

/**
 * Performance measurement
 */
export class PerformanceMeasure {
  private marks: Map<string, number> = new Map();

  /**
   * Start measurement
   */
  start(name: string): void {
    this.marks.set(name, performance.now());
  }

  /**
   * End measurement and return duration
   */
  end(name: string): number {
    const startTime = this.marks.get(name);
    if (!startTime) {
      console.warn(`No start mark for ${name}`);
      return 0;
    }
    const duration = performance.now() - startTime;
    this.marks.delete(name);
    return duration;
  }

  /**
   * Log measurement
   */
  log(name: string): void {
    const duration = this.end(name);
    console.log(`⏱️  ${name}: ${duration.toFixed(2)}ms`);
  }
}

export const perfMeasure = new PerformanceMeasure();

/**
 * Logger utility
 */
export const logger = {
  debug: (message: string, data?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`🐛 [DEBUG] ${message}`, data);
    }
  },

  info: (message: string, data?: any) => {
    console.log(`ℹ️  [INFO] ${message}`, data);
  },

  warn: (message: string, data?: any) => {
    console.warn(`⚠️  [WARN] ${message}`, data);
  },

  error: (message: string, error?: Error | any) => {
    console.error(`❌ [ERROR] ${message}`, error);
  },

  success: (message: string, data?: any) => {
    console.log(`✅ [SUCCESS] ${message}`, data);
  },
};

/**
 * Local storage debugging
 */
export const debugStorage = {
  /**
   * Get all items in localStorage
   */
  getAll: (): Record<string, any> => {
    const items: Record<string, any> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const value = localStorage.getItem(key);
        try {
          items[key] = JSON.parse(value || '');
        } catch {
          items[key] = value;
        }
      }
    }
    return items;
  },

  /**
   * Clear localStorage
   */
  clear: (): void => {
    localStorage.clear();
    console.log('localStorage cleared');
  },

  /**
   * Log all items
   */
  log: (): void => {
    console.table(debugStorage.getAll());
  },
};

/**
 * Network debugging
 */
export const debugNetwork = {
  /**
   * Simulate network failure
   */
  simulateNetworkError: (): void => {
    throw new Error('Simulated network error');
  },

  /**
   * Simulate slow network
   */
  simulateSlowNetwork: async (delayMs: number = 3000) => {
    await delay(delayMs);
  },

  /**
   * Monitor all fetch requests
   */
  monitorFetch: (): void => {
    // Disabled to avoid circular reference in strict types
    console.log('Network monitoring disabled');
  },
};

/**
 * Component debugging
 */
export const debugComponent = {
  /**
   * Log component renders
   */
  trackRenders: (componentName: string) => {
    console.log(`🔄 [RENDER] ${componentName}`);
  },

  /**
   * Log prop changes
   */
  trackPropChanges: (componentName: string, prevProps: any, nextProps: any) => {
    const changes: Record<string, any> = {};
    for (const key in nextProps) {
      if (prevProps[key] !== nextProps[key]) {
        changes[key] = { prev: prevProps[key], next: nextProps[key] };
      }
    }
    if (Object.keys(changes).length > 0) {
      console.log(`🔀 [PROP CHANGES] ${componentName}`, changes);
    }
  },
};
