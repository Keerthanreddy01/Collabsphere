/**
 * App Configuration Constants
 * Production environment settings and feature flags
 */

export const APP_CONFIG = {
  // API Configuration
  API: {
    BASE_URL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api',
    TIMEOUT: 30000,
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000,
  },

  // App Settings
  APP: {
    VERSION: '1.0.0',
    ENVIRONMENT: process.env.NODE_ENV || 'development',
    DEBUG: process.env.EXPO_PUBLIC_DEBUG === 'true',
  },

  // Feature Flags
  FEATURES: {
    ENABLE_ANALYTICS: true,
    ENABLE_CRASH_REPORTING: true,
    ENABLE_PERFORMANCE_MONITORING: true,
    ENABLE_OFFLINE_MODE: true,
  },

  // Cache Configuration
  CACHE: {
    FEED_CACHE_TIME: 5 * 60 * 1000, // 5 minutes
    USER_PROFILE_CACHE_TIME: 10 * 60 * 1000, // 10 minutes
    NOTIFICATIONS_CACHE_TIME: 2 * 60 * 1000, // 2 minutes
  },

  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 100,
  },

  // Timeouts
  TIMEOUTS: {
    DEBOUNCE: 300,
    THROTTLE: 1000,
    ANIMATION: 300,
  },
} as const;

export type AppConfig = typeof APP_CONFIG;
