/**
 * Web App Type Definitions
 * Comprehensive TypeScript interfaces for type safety
 */

/**
 * API Response wrapper
 */
export interface ApiResponse<T = any> {
  data: T;
  status: number;
  message?: string;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T = any> {
  items: T[];
  total: number;
  pages: number;
  currentPage: number;
  pageSize: number;
}

/**
 * User types
 */
export interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  avatar?: string;
  bio?: string;
  role: 'user' | 'admin' | 'moderator';
  isDeveloper?: boolean;
  githubUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  followers: number;
  following: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Project types
 */
export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription?: string;
  owner?: User;
  ownerId?: string;
  technologies?: string[];
  techStack?: string[];
  lookingFor?: string[];
  rolesNeeded?: { role: string; description?: string; filled: boolean }[];
  status: string; // was strict 'active'...' building'
  links?: {
    github?: string;
    demo?: string;
    website?: string;
  };
  githubUrl?: string;
  demoUrl?: string;
  image?: string;
  bannerColor?: string;
  applicants?: number;
  views?: number;
  viewCount?: number;
  bookmarks?: number;
  upvotes?: string[];
  teamSize?: number;
  maxTeamSize?: number;
  difficulty?: string;
  createdAt: any;
  updatedAt?: string;
}

/**
 * Application types
 */
export interface Application {
  id: string;
  projectId: string;
  userId: string;
  user: User;
  message?: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

/**
 * Notification types
 */
export interface Notification {
  id: string;
  userId: string;
  type: 'info' | 'warning' | 'success' | 'error' | 'mention' | 'follow' | 'project';
  title: string;
  message: string;
  read: boolean;
  data?: Record<string, any>;
  action?: {
    label: string;
    url: string;
  };
  createdAt: string;
  readAt?: string;
}

/**
 * Message types
 */
export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  sender: User;
  content: string;
  attachments?: Attachment[];
  read: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Conversation {
  id: string;
  participants: User[];
  messages: Message[];
  lastMessage?: Message;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Attachment types
 */
export interface Attachment {
  id: string;
  url: string;
  filename: string;
  size: number;
  type: 'image' | 'document' | 'video' | 'other';
  uploadedAt: string;
}

/**
 * Auth types
 */
export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

/**
 * Form types
 */
export interface FormFieldError {
  field: string;
  message: string;
}

export interface FormSubmitResult {
  success: boolean;
  errors?: FormFieldError[];
  message?: string;
}

/**
 * Component props types
 */
export interface LoadingState {
  isLoading: boolean;
  error?: Error | null;
  retry?: () => void;
}

export interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/**
 * Request types
 */
export interface RequestOptions {
  headers?: Record<string, string>;
  timeout?: number;
  retries?: number;
  cache?: boolean;
  cacheDuration?: number;
}

/**
 * Error types
 */
export interface ErrorInfo {
  code: string;
  message: string;
  statusCode: number;
  timestamp: string;
  isDevelopment: boolean;
  details?: unknown;
}

/**
 * Dashboard types
 */
export interface DashboardStats {
  totalUsers: number;
  totalProjects: number;
  activeUsers: number;
  newProjectsThisMonth: number;
}

/**
 * Search types
 */
export interface SearchResult {
  type: 'user' | 'project' | 'tag';
  id: string;
  title: string;
  description?: string;
  image?: string;
  metadata?: Record<string, any>;
}

/**
 * Filter types
 */
export interface ProjectFilters {
  search?: string;
  technologies?: string[];
  status?: Project['status'][];
  sortBy?: 'recent' | 'popular' | 'trending';
  page?: number;
  limit?: number;
}

/**
 * Theme types
 */
export type Theme = 'light' | 'dark' | 'auto';

export interface ThemeConfig {
  theme: Theme;
  primaryColor?: string;
  accentColor?: string;
}

/**
 * Analytics types
 */
export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp: string;
}

/**
 * Toast types
 */
export interface ToastOptions {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}
