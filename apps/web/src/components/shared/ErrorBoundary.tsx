'use client';

import React from 'react';
import { createErrorInfo } from '@/utils/error-handling';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

/**
 * Error Boundary component
 * Catches React errors and displays fallback UI
 */
export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ errorInfo });

    // Log to error reporting service
    console.error('Error caught by boundary:', error, errorInfo);

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <DefaultErrorFallback
            error={this.state.error}
            resetError={this.resetError}
          />
        )
      );
    }

    return this.props.children;
  }
}

interface DefaultErrorFallbackProps {
  error: Error | null;
  resetError: () => void;
}

/**
 * Default error fallback UI
 */
function DefaultErrorFallback({ error, resetError }: DefaultErrorFallbackProps) {
  const errorInfo = createErrorInfo(error);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>

        <p className="text-gray-600 mb-4">
          {errorInfo.message || 'An unexpected error occurred. Please try again.'}
        </p>

        {process.env.NODE_ENV === 'development' && (
          <details className="mb-4 p-3 bg-gray-100 rounded text-sm">
            <summary className="cursor-pointer font-semibold">Error Details</summary>
            <pre className="mt-2 text-xs overflow-auto max-h-32">
              {error?.stack}
            </pre>
          </details>
        )}

        <button
          onClick={resetError}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
