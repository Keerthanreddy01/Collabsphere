export const colors = {
    bg: '#0d0d0d',
    surface: '#141414',
    surfaceHigh: '#1c1c1c',
    border: '#2a2a2a',
    textPrimary: '#ffffff',
    textSecondary: '#8a8a8a',
    textMuted: '#555555',
    accent: '#2563eb',       // one blue only
    success: '#22c55e',
    danger: '#ef4444',
    warning: '#f59e0b',
};

export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
};

export const typography = {
    heading1: {
        fontSize: 28,
        fontWeight: 'bold' as const,
    },
    heading2: {
        fontSize: 22,
        fontWeight: 'bold' as const,
    },
    heading3: {
        fontSize: 18,
        fontWeight: '600' as const,
    },
    body: {
        fontSize: 15,
        lineHeight: 22,
    },
    bodyMedium: {
        fontSize: 15,
        fontWeight: '500' as const,
        lineHeight: 22,
    },
    caption: {
        fontSize: 12,
        color: '#8a8a8a',
    },
};
