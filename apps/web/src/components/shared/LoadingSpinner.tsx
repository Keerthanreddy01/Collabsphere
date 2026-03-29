'use client';

import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
  message?: string;
}

/**
 * Loading Spinner Component
 * Displays loading state with optional message
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  fullScreen = false,
  message,
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4',
  };

  const spinnerContent = (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`${sizeClasses[size]} border-blue-200 border-t-blue-600 rounded-full animate-spin`}
      />
      {message && <p className="text-gray-600 text-sm">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/5 backdrop-blur-sm z-50">
        {spinnerContent}
      </div>
    );
  }

  return spinnerContent;
};

/**
 * Skeleton Loading Component
 * Shows placeholder while content loads
 */
interface SkeletonProps {
  className?: string;
  count?: number;
  height?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = 'h-4 w-full',
  count = 1,
  height,
}) => {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`bg-gray-200 rounded animate-pulse ${className}`}
          style={height ? { height } : undefined}
        />
      ))}
    </div>
  );
};
