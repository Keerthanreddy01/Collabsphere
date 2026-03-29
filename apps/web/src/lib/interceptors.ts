/**
 * API Request/Response Interceptors
 * Handles authentication, logging, and error processing
 */

import { UnauthorizedError, NetworkError } from '@/utils/error-handling';

export interface RequestInterceptor {
  (config: RequestInit): RequestInit;
}

export interface ResponseInterceptor<T = any> {
  (response: T): T | Promise<T>;
}

export interface ErrorInterceptor {
  (error: Error): Error | Promise<Error>;
}

/**
 * API Interceptor Manager
 */
class ApiInterceptorManager {
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];
  private errorInterceptors: ErrorInterceptor[] = [];

  /**
   * Add request interceptor
   */
  useRequestInterceptor(interceptor: RequestInterceptor): () => void {
    this.requestInterceptors.push(interceptor);
    return () => {
      this.requestInterceptors = this.requestInterceptors.filter((i) => i !== interceptor);
    };
  }

  /**
   * Add response interceptor
   */
  useResponseInterceptor(interceptor: ResponseInterceptor): () => void {
    this.responseInterceptors.push(interceptor);
    return () => {
      this.responseInterceptors = this.responseInterceptors.filter((i) => i !== interceptor);
    };
  }

  /**
   * Add error interceptor
   */
  useErrorInterceptor(interceptor: ErrorInterceptor): () => void {
    this.errorInterceptors.push(interceptor);
    return () => {
      this.errorInterceptors = this.errorInterceptors.filter((i) => i !== interceptor);
    };
  }

  /**
   * Execute request interceptors
   */
  executeRequestInterceptors(config: RequestInit): RequestInit {
    return this.requestInterceptors.reduce((acc, interceptor) => {
      return interceptor(acc);
    }, config);
  }

  /**
   * Execute response interceptors
   */
  async executeResponseInterceptors<T>(response: T): Promise<T> {
    let result: T | Promise<T> = response;
    for (const interceptor of this.responseInterceptors) {
      result = await interceptor(result as any);
    }
    return result as T;
  }

  /**
   * Execute error interceptors
   */
  async executeErrorInterceptors(error: Error): Promise<Error> {
    let result: Error | Promise<Error> = error;
    for (const interceptor of this.errorInterceptors) {
      result = await interceptor(result as Error);
    }
    return result as Error;
  }
}

export const apiInterceptors = new ApiInterceptorManager();

/**
 * Default Request Interceptor - Add auth token
 */
export const authenticationInterceptor: RequestInterceptor = (config) => {
  // In a real app, get token from localStorage or auth state
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

  if (token) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      },
    };
  }

  return config;
};

/**
 * Default Response Interceptor - Parse JSON
 */
export const jsonParseInterceptor: ResponseInterceptor = async (response) => {
  if (response instanceof Response) {
    return response.json();
  }
  return response;
};

/**
 * Default Error Interceptor - Handle common errors
 */
export const errorHandlingInterceptor: ErrorInterceptor = async (error) => {
  if (error instanceof TypeError && error.message === 'Failed to fetch') {
    return new NetworkError('Network request failed. Check your connection.');
  }

  // Handle specific API error responses
  if (error instanceof Error) {
    const message = error.message;
    if (message.includes('401')) {
      return new UnauthorizedError('Your session has expired. Please log in again.');
    }
  }

  return error;
};

/**
 * Logging interceptor for development
 */
export const loggingInterceptor: RequestInterceptor = (config) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('[API Request]', {
      method: config.method || 'GET',
      headers: config.headers,
      timestamp: new Date().toISOString(),
    });
  }
  return config;
};

/**
 * Register default interceptors
 */
export const registerDefaultInterceptors = () => {
  apiInterceptors.useRequestInterceptor(loggingInterceptor);
  apiInterceptors.useRequestInterceptor(authenticationInterceptor);
  apiInterceptors.useResponseInterceptor(jsonParseInterceptor);
  apiInterceptors.useErrorInterceptor(errorHandlingInterceptor);
};
