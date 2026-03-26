export const colors = {
    bg: '#050505',           // Deeper black
    bgSecondary: '#0a0a0a',
    surface: '#121212',
    surfaceHigh: '#1a1a1a',
    surfaceGlass: 'rgba(255, 255, 255, 0.03)',
    border: '#222222',
    borderGlass: 'rgba(255, 255, 255, 0.08)',
    textPrimary: '#ffffff',
    textSecondary: '#a1a1aa',
    textMuted: '#52525b',
    accent: '#3b82f6',       // Blue-500
    accentSecondary: '#8b5cf6', // Violet-500
    success: '#10b981',
    danger: '#ef4444',
    warning: '#f59e0b',
    glow: 'rgba(59, 130, 246, 0.5)',
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
