/**
 * Error Handling Utilities
 * Production-ready error management
 */

export class AppError extends Error {
  constructor(
    public code: string,
    public statusCode: number = 500,
    message: string = 'An error occurred'
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super('VALIDATION_ERROR', 400, message);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super('NOT_FOUND', 404, `${resource} not found`);
    this.name = 'NotFoundError';
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized') {
    super('UNAUTHORIZED', 401, message);
    this.name = 'UnauthorizedError';
  }
}

/**
 * Safe JSON parsing
 */
export const safeJsonParse = <T = any>(json: string, fallback: T): T => {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
};

/**
 * Error to user-friendly message
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
  return 'An unexpected error occurred. Please try again.';
};

/**
 * Handle promise rejection
 */
export const handlePromise = async <T>(
  promise: Promise<T>
): Promise<[null, T] | [Error]> => {
  try {
    const data = await promise;
    return [null, data];
  } catch (error) {
    return [error as Error];
  }
};
