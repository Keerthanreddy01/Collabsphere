/**
 * Mobile App Type Definitions
 * Shared types for mobile application
 */

/**
 * API Response wrapper
 */
export interface ApiResponse<D = any> {
  success: boolean;
  data: D;
  message?: string;
  error?: string;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  pages: number;
}

/**
 * Navigation parameters
 */
export interface NavigationProps {
  navigation: any;
  route: any;
}

/**
 * Theme context type
 */
export interface Theme {
  dark: boolean;
  colors: ColorScheme;
}

export interface ColorScheme {
  primary: string;
  background: string;
  surface: string;
  text: string;
  border: string;
  success: string;
  error: string;
  warning: string;
}

/**
 * Loading state
 */
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

/**
 * Request status
 */
export type RequestStatus = 'idle' | 'pending' | 'success' | 'error';

/**
 * Authentication state
 */
export interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  token: string | null;
  status: RequestStatus;
}

/**
 * Cache entry
 */
export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}
