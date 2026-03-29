/**
 * HTTP Request Utilities
 * Production-ready HTTP helpers for API calls
 */

export interface RequestOptions {
  timeout?: number;
  retry?: number;
  headers?: Record<string, string>;
}

export interface HttpError extends Error {
  status: number;
  statusText: string;
  data?: any;
}

/**
 * Make HTTP GET request
 */
export const httpGet = async <T = any>(
  url: string,
  options: RequestOptions = {}
): Promise<T> => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw createHttpError(response);
  }

  return response.json();
};

/**
 * Make HTTP POST request
 */
export const httpPost = async <T = any>(
  url: string,
  data: any,
  options: RequestOptions = {}
): Promise<T> => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw createHttpError(response);
  }

  return response.json();
};

/**
 * Make HTTP PUT request
 */
export const httpPut = async <T = any>(
  url: string,
  data: any,
  options: RequestOptions = {}
): Promise<T> => {
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw createHttpError(response);
  }

  return response.json();
};

/**
 * Make HTTP DELETE request
 */
export const httpDelete = async <T = any>(
  url: string,
  options: RequestOptions = {}
): Promise<T> => {
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw createHttpError(response);
  }

  return response.json();
};

/**
 * Create HTTP error from response
 */
const createHttpError = async (response: Response): Promise<HttpError> => {
  let data;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  const error = new Error(
    data?.message || response.statusText || 'HTTP Error'
  ) as HttpError;
  error.status = response.status;
  error.statusText = response.statusText;
  error.data = data;

  return error;
};
