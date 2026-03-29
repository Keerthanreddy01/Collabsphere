/**
 * Error Handling Utilities
 * Centralized error handling and custom error classes
 */

/**
 * Base application error class
 */
export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number = 500,
    public details?: unknown
  ) {
    super(message);
    this.name = 'AppError';
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

/**
 * Validation error - for form and data validation failures
 */
export class ValidationError extends AppError {
  constructor(message: string, public fieldName?: string, details?: unknown) {
    super('VALIDATION_ERROR', message, 400, details);
    this.name = 'ValidationError';
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

/**
 * Not found error - 404
 */
export class NotFoundError extends AppError {
  constructor(resource: string, details?: unknown) {
    super('NOT_FOUND', `${resource} not found`, 404, details);
    this.name = 'NotFoundError';
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

/**
 * Unauthorized error - 401
 */
export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized', details?: unknown) {
    super('UNAUTHORIZED', message, 401, details);
    this.name = 'UnauthorizedError';
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

/**
 * Forbidden error - 403
 */
export class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden', details?: unknown) {
    super('FORBIDDEN', message, 403, details);
    this.name = 'ForbiddenError';
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

/**
 * Network error
 */
export class NetworkError extends AppError {
  constructor(message: string = 'Network request failed', details?: unknown) {
    super('NETWORK_ERROR', message, 0, details);
    this.name = 'NetworkError';
    Object.setPrototypeOf(this, NetworkError.prototype);
  }
}

/**
 * Safe JSON parse - returns null instead of throwing on invalid JSON
 * @param json - JSON string to parse
 * @returns Parsed object or null
 */
export const safeJsonParse = <T = any>(json: string): T | null => {
  try {
    return JSON.parse(json);
  } catch (error) {
    console.error('JSON parse error:', error);
    return null;
  }
};

/**
 * Get user-friendly error message
 * @param error - Error object
 * @returns User-friendly message
 */
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AppError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return 'An unexpected error occurred';
};

/**
 * Log error with context
 * @param error - Error object
 * @param context - Additional context information
 */
export const logError = (error: unknown, context?: Record<string, any>): void => {
  const timestamp = new Date().toISOString();

  if (error instanceof AppError) {
    console.error(`[${timestamp}] ${error.name}:`, {
      code: error.code,
      message: error.message,
      statusCode: error.statusCode,
      details: error.details,
      context,
    });
  } else if (error instanceof Error) {
    console.error(`[${timestamp}] ${error.name}:`, {
      message: error.message,
      stack: error.stack,
      context,
    });
  } else {
    console.error(`[${timestamp}] Unknown error:`, { error, context });
  }
};

/**
 * Handle async errors safely
 * @param promise - Promise to handle
 * @returns [data, error] tuple
 */
export const handlePromise = async <T>(
  promise: Promise<T>
): Promise<[T | null, Error | null]> => {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    logError(error);
    return [null, error instanceof Error ? error : new Error(String(error))];
  }
};

/**
 * Safe async handler for API calls
 * @param callback - Async function to execute
 * @returns Result or null on error
 */
export const safeAsync = async <T>(callback: () => Promise<T>): Promise<T | null> => {
  const [data, error] = await handlePromise(callback());
  if (error) {
    logError(error);
    return null;
  }
  return data;
};

/**
 * Error boundary fallback component data
 * Structured error information for UI display
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
 * Create structured error info for UI
 * @param error - Error object
 * @returns Structured error info
 */
export const createErrorInfo = (error: unknown): ErrorInfo => {
  const isDevelopment = process.env.NODE_ENV === 'development';

  if (error instanceof AppError) {
    return {
      code: error.code,
      message: error.message,
      statusCode: error.statusCode,
      timestamp: new Date().toISOString(),
      isDevelopment,
      details: isDevelopment ? error.details : undefined,
    };
  }

  if (error instanceof Error) {
    return {
      code: 'UNKNOWN_ERROR',
      message: error.message,
      statusCode: 500,
      timestamp: new Date().toISOString(),
      isDevelopment,
      details: isDevelopment ? error.stack : undefined,
    };
  }

  return {
    code: 'UNEXPECTED_ERROR',
    message: 'An unexpected error occurred',
    statusCode: 500,
    timestamp: new Date().toISOString(),
    isDevelopment,
  };
};

/**
 * Retry failed operations
 * @param fn - Function to retry
 * @param maxRetries - Maximum retry attempts
 * @param delay - Delay between retries (ms)
 * @returns Result or throws error
 */
export const retryOperation = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: Error = new Error('No error');

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      if (attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, delay * attempt));
      }
    }
  }

  throw lastError;
};
