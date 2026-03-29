/**
 * Mobile App - Local State Store
 * Simple state management using AsyncStorage for persistence
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

interface StoreListener {
  (state: AppStore): void;
}

/**
 * App Store - Persistent state management
 */
export class AppStore {
  private state: Record<string, any> = {};
  private listeners: Set<StoreListener> = new Set();

  constructor() {
    this.initialize();
  }

  /**
   * Initialize store from AsyncStorage
   */
  private async initialize() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const items = await AsyncStorage.multiGet(keys);
      items.forEach(([key, value]) => {
        if (value) {
          try {
            this.state[key] = JSON.parse(value);
          } catch {
            this.state[key] = value;
          }
        }
      });
    } catch (error) {
      console.error('Failed to initialize store:', error);
    }
  }

  /**
   * Get value from store
   */
  get<T = any>(key: string, defaultValue?: T): T {
    return this.state[key] ?? defaultValue;
  }

  /**
   * Set value in store
   */
  async set<T = any>(key: string, value: T): Promise<void> {
    this.state[key] = value;
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      this.notifyListeners();
    } catch (error) {
      console.error(`Failed to set store key ${key}:`, error);
    }
  }

  /**
   * Remove value from store
   */
  async remove(key: string): Promise<void> {
    delete this.state[key];
    try {
      await AsyncStorage.removeItem(key);
      this.notifyListeners();
    } catch (error) {
      console.error(`Failed to remove store key ${key}:`, error);
    }
  }

  /**
   * Clear all store data
   */
  async clear(): Promise<void> {
    this.state = {};
    try {
      await AsyncStorage.clear();
      this.notifyListeners();
    } catch (error) {
      console.error('Failed to clear store:', error);
    }
  }

  /**
   * Subscribe to store changes
   */
  subscribe(listener: StoreListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Notify all listeners of state changes
   */
  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener(this));
  }

  /**
   * Get all store data (for debugging)
   */
  getAll(): Record<string, any> {
    return { ...this.state };
  }
}

// Singleton instance
export const appStore = new AppStore();

/**
 * Store keys - centralized constants
 */
export const STORE_KEYS = {
  // Auth
  AUTH_TOKEN: 'auth_token',
  CURRENT_USER: 'current_user',
  AUTH_REFRESH_TOKEN: 'auth_refresh_token',

  // User data
  USER_PROFILE: 'user_profile',
  USER_PREFERENCES: 'user_preferences',
  USER_BOOKMARKS: 'user_bookmarks',

  // App data
  RECENT_SEARCHES: 'recent_searches',
  NOTIFICATIONS: 'notifications',
  FEED_CACHE: 'feed_cache',

  // Settings
  APP_THEME: 'app_theme',
  LANGUAGE: 'language',
  NOTIFICATIONS_ENABLED: 'notifications_enabled',

  // Cache
  CACHED_PROJECTS: 'cached_projects',
  CACHED_USERS: 'cached_users',
  CACHE_TIMESTAMP: 'cache_timestamp',
} as const;
