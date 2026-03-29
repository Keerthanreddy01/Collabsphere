/**
 * Application Routes
 * Centralized route definitions for web app
 */

export const ROUTES = {
  // Public Routes
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  EXPLORE: '/explore',
  ONBOARDING: '/onboarding',

  // Dashboard Routes
  DASHBOARD: '/dashboard',
  DASHBOARD_FEED: '/dashboard/feed',
  DASHBOARD_PROJECTS: '/dashboard/projects',
  DASHBOARD_APPLICATIONS: '/dashboard/applications',

  // User Routes
  PROFILE: (uid: string) => `/profile/${uid}`,
  PROFILE_EDIT: '/profile/edit',

  // Project Routes
  PROJECT: (id: string) => `/project/${id}`,
  PROJECT_CREATE: '/project/create',
  PROJECT_EDIT: (id: string) => `/project/${id}/edit`,

  // Not Found
  NOT_FOUND: '/404',
  UNAUTHORIZED: '/401',
} as const;

/**
 * External Links
 */
export const EXTERNAL_LINKS = {
  GITHUB: 'https://github.com/keerthanreddy01/collabsphere',
  TWITTER: 'https://twitter.com',
  LINKEDIN: 'https://linkedin.com',
  DISCORD: 'https://discord.com',
} as const;

/**
 * API Endpoints
 */
export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
  },

  // Users
  USERS: {
    GET_PROFILE: (uid: string) => `/users/${uid}`,
    UPDATE_PROFILE: (uid: string) => `/users/${uid}`,
    SEARCH: '/users/search',
  },

  // Projects
  PROJECTS: {
    LIST: '/projects',
    CREATE: '/projects',
    GET: (id: string) => `/projects/${id}`,
    UPDATE: (id: string) => `/projects/${id}`,
    DELETE: (id: string) => `/projects/${id}`,
    SEARCH: '/projects/search',
  },

  // Feed/Updates
  UPDATES: {
    LIST: '/updates',
    CREATE: '/updates',
    GET: (id: string) => `/updates/${id}`,
    DELETE: (id: string) => `/updates/${id}`,
  },

  // Notifications
  NOTIFICATIONS: {
    LIST: '/notifications',
    MARK_READ: '/notifications/mark-read',
    DELETE: (id: string) => `/notifications/${id}`,
  },

  // Messages
  MESSAGES: {
    LIST_CONVERSATIONS: '/messages/conversations',
    GET_CONVERSATION: (id: string) => `/messages/conversations/${id}`,
    SEND: '/messages/send',
  },
} as const;
