'use client';

import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onConfirm?: () => void | Promise<void>;
  closeButtonText?: string;
  confirmButtonText?: string;
  isLoading?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Modal/Dialog Component
 * Displays content in a centered modal overlay
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  children,
  onClose,
  onConfirm,
  closeButtonText = 'Close',
  confirmButtonText = 'Confirm',
  isLoading = false,
  size = 'md',
}) => {
  useEffect(() => {
    // Lock body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className={`relative bg-white rounded-lg shadow-lg p-6 w-full mx-4 ${sizeClasses[size]}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            <span className="text-xl">×</span>
          </button>
        </div>

        {/* Body */}
        <div className="mb-6 max-h-96 overflow-y-auto">{children}</div>

        {/* Footer */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 transition"
          >
            {closeButtonText}
          </button>
          {onConfirm && (
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50 transition"
            >
              {isLoading ? 'Loading...' : confirmButtonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Toast Notification Component
 * Simple notification that auto-dismisses
 */
interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 3000,
  onClose,
}) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const typeClasses = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500',
  };

  return (
    <div
      className={`fixed bottom-4 right-4 max-w-sm px-6 py-3 text-white rounded-lg shadow-lg ${typeClasses[type]} z-50 animate-pulse`}
    >
      {message}
    </div>
  );
};
