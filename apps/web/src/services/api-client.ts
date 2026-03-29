/*
 * API Service Layer - Backend Abstraction
 * Centralized API client for all backend communication
 */

import { httpGet, httpPost, httpPut, httpDelete } from '@/lib/http';
import { WEB_CONFIG } from '@/constants/config';

const apiBaseUrl = WEB_CONFIG.API.BASE_URL;

/**
 * API Client for backend communication
 * Handles all HTTP requests with proper error handling
 */
export const apiClient = {
  /**
   * Generic request method
   */
  request: async <T = any>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    endpoint: string,
    data?: any
  ): Promise<T> => {
    const url = `${apiBaseUrl}${endpoint}`;

    try {
      switch (method) {
        case 'GET':
          return await httpGet<T>(url);
        case 'POST':
          return await httpPost<T>(url, data);
        case 'PUT':
          return await httpPut<T>(url, data);
        case 'DELETE':
          return await httpDelete<T>(url);
      }
    } catch (error) {
      console.error(`API ${method} ${endpoint}:`, error);
      throw error;
    }
  },

  /**
   * GET request
   */
  get: <T = any>(endpoint: string) => {
    return apiClient.request<T>('GET', endpoint);
  },

  /**
   * POST request
   */
  post: <T = any>(endpoint: string, data: any) => {
    return apiClient.request<T>('POST', endpoint, data);
  },

  /**
   * PUT request
   */
  put: <T = any>(endpoint: string, data: any) => {
    return apiClient.request<T>('PUT', endpoint, data);
  },

  /**
   * DELETE request
   */
  delete: <T = any>(endpoint: string) => {
    return apiClient.request<T>('DELETE', endpoint);
  },
};
