/**
 * Design System - Colors and Themes
 * Consistent color palette for mobile app
 */

export const COLORS = {
  // Primary Colors
  PRIMARY: {
    50: '#f0f7ff',
    100: '#e0effe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c3d66',
  },

  // Semantic Colors
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  ERROR: '#ef4444',
  INFO: '#3b82f6',

  // Neutral Colors
  NEUTRAL: {
    0: '#ffffff',
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },

  // Gradients
  GRADIENT: {
    PRIMARY: ['#0ea5e9', '#0284c7'],
    SUCCESS: ['#10b981', '#059669'],
    ERROR: ['#ef4444', '#dc2626'],
  },
} as const;

export const TYPOGRAPHY = {
  SIZES: {
    XS: 12,
    SM: 14,
    BASE: 16,
    LG: 18,
    XL: 20,
    '2XL': 24,
    '3XL': 30,
  },

  WEIGHTS: {
    LIGHT: '300',
    REGULAR: '400',
    MEDIUM: '500',
    SEMIBOLD: '600',
    BOLD: '700',
  },
} as const;

export const SPACING = {
  XS: 4,
  SM: 8,
  MD: 16,
  LG: 24,
  XL: 32,
  '2XL': 48,
} as const;

export const BORDER_RADIUS = {
  SM: 4,
  MD: 8,
  LG: 12,
  XL: 16,
  FULL: 9999,
} as const;
