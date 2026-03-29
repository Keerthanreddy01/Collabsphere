/**
 * Mobile App - API Middleware
 * Request/response interceptors and error handling
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { appStore, STORE_KEYS } from '@/store/app-store';
import { getErrorMessage } from '@/utils/error-handling';

/**
 * Initialize API client with interceptors
 */
export function createApiClient(): AxiosInstance {
  const client = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
    timeout: 30000,
  });

  /**
   * Request Interceptor - Add auth token
   */
  client.interceptors.request.use(
    (config) => {
      const token = appStore.get<string>(STORE_KEYS.AUTH_TOKEN);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      console.error('Request interceptor error:', error);
      return Promise.reject(error);
    }
  );

  /**
   * Response Interceptor - Handle errors and token refresh
   */
  client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as any;

      // Handle 401 Unauthorized
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshToken = appStore.get<string>(STORE_KEYS.AUTH_REFRESH_TOKEN);
          if (refreshToken) {
            // TODO: Call refresh token endpoint
            // For now, just clear auth
            await appStore.remove(STORE_KEYS.AUTH_TOKEN);
            await appStore.remove(STORE_KEYS.CURRENT_USER);
          }
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
        }
      }

      // Handle 429 Too Many Requests
      if (error.response?.status === 429) {
        console.warn('Rate limited - please wait before retrying');
      }

      return Promise.reject(error);
    }
  );

  return client;
}

// Export singleton instance
export const apiClient = createApiClient();

/**
 * API request wrapper with error handling
 */
export async function apiRequest<T = any>(
  config: AxiosRequestConfig
): Promise<T> {
  try {
    const response = await apiClient(config);
    return response.data as T;
  } catch (error) {
    const message = getErrorMessage(error);
    console.error(`API Error (${config.method} ${config.url}):`, message);
    throw error;
  }
}

/**
 * Common API methods
 */
export const api = {
  get: <T = any>(url: string, config?: AxiosRequestConfig) =>
    apiRequest<T>({ ...config, method: 'GET', url }),

  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    apiRequest<T>({ ...config, method: 'POST', url, data }),

  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    apiRequest<T>({ ...config, method: 'PUT', url, data }),

  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    apiRequest<T>({ ...config, method: 'PATCH', url, data }),

  delete: <T = any>(url: string, config?: AxiosRequestConfig) =>
    apiRequest<T>({ ...config, method: 'DELETE', url }),
};
