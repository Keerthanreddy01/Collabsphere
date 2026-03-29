'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { apiClient } from '@/services/api-client';

/**
 * User interface
 */
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin' | 'moderator';
  createdAt: string;
}

/**
 * Auth state interface
 */
export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

/**
 * Auth context interface
 */
interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  clearError: () => void;
}

/**
 * Create Auth Context
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Auth Provider Component
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken, removeToken, isTokenLoaded] = useLocalStorage<string | null>(
    'auth_token',
    null
  );
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Check if user is authenticated on mount
   */
  useEffect(() => {
    if (isTokenLoaded && token) {
      // Optionally verify token with backend
      setUser({ id: '1', email: 'user@example.com', name: 'User', role: 'user', createdAt: new Date().toISOString() });
    }
  }, [isTokenLoaded, token]);

  /**
   * Login function
   */
  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual backend API call
      const response = await apiClient.post<{ token: string; user: User }>('/auth/login', {
        email,
        password,
      });

      setToken(response.token);
      setUser(response.user);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [setToken]);

  /**
   * Register function
   */
  const register = useCallback(async (email: string, password: string, name: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual backend API call
      const response = await apiClient.post<{ token: string; user: User }>('/auth/register', {
        email,
        password,
        name,
      });

      setToken(response.token);
      setUser(response.user);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [setToken]);

  /**
   * Logout function
   */
  const logout = useCallback(() => {
    removeToken();
    setUser(null);
    setError(null);
  }, [removeToken]);

  /**
   * Update user profile
   */
  const updateProfile = useCallback(async (data: Partial<User>) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual backend API call
      const response = await apiClient.put<User>('/auth/profile', data);
      setUser(response);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update profile';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Clear error
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated: !!user && !!token,
    error,
    login,
    register,
    logout,
    updateProfile,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * useAuth Hook
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * Protected Route Wrapper
 */
export const useProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  return { isAuthenticated, isLoading };
};
