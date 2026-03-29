/**
 * Web App Configuration Constants
 * Production environment settings and feature flags
 */

export const WEB_CONFIG = {
  // API Configuration
  API: {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    TIMEOUT: 30000,
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000,
  },

  // App Settings
  APP: {
    VERSION: '1.0.0',
    ENVIRONMENT: process.env.NODE_ENV || 'development',
    DEBUG: process.env.NEXT_PUBLIC_DEBUG === 'true',
    SITE_NAME: 'Collabsphere',
  },

  // Feature Flags
  FEATURES: {
    ENABLE_ANALYTICS: true,
    ENABLE_CRASH_REPORTING: true,
    ENABLE_PERFORMANCE_MONITORING: true,
    ENABLE_DARK_MODE: true,
    ENABLE_NOTIFICATIONS: true,
  },

  // Cache Configuration
  CACHE: {
    FEED_CACHE_TIME: 5 * 60 * 1000, // 5 minutes
    USER_PROFILE_CACHE_TIME: 10 * 60 * 1000, // 10 minutes
    SEARCH_CACHE_TIME: 3 * 60 * 1000, // 3 minutes
  },

  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 100,
    PROJECTS_PER_PAGE: 12,
  },

  // UI Constants
  UI: {
    TOAST_DURATION: 3000,
    MODAL_ANIMATION_DURATION: 200,
    DEBOUNCE_DELAY: 300,
  },

  // SEO
  SEO: {
    TITLE: 'Collabsphere - Connect & Collaborate',
    DESCRIPTION: 'A platform for developers and creators to collaborate on projects',
    KEYWORDS: ['collaboration', 'projects', 'developers', 'network'],
  },
} as const;

export type WebConfig = typeof WEB_CONFIG;
