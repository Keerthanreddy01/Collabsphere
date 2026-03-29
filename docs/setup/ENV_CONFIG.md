# Environment Configuration Guide

This guide explains all environment variables and how to configure them for development, staging, and production environments.

## Overview

The Collabsphere monorepo uses environment variables to configure:
- Backend API endpoints
- Feature flags
- Third-party service credentials
- Performance settings
- Analytics configuration

## Web App Configuration (`.env.local`)

### API Configuration
```bash
# Backend API
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_API_TIMEOUT=30000

# Authentication
NEXT_PUBLIC_AUTH_MODE=jwt    # jwt, oauth, custom

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_DARK_MODE=true
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true

# Third-party Services
NEXT_PUBLIC_GITHUB_CLIENT_ID=your_github_client_id
NEXT_PUBLIC_SENTRY_DSN=https://xxxx@sentry.io/xxxx

# App Configuration
NEXT_PUBLIC_APP_NAME=Collabsphere
NEXT_PUBLIC_APP_VERSION=1.0.0
```

### Build Configuration
```bash
# Analytics
NEXT_PUBLIC_GA_ID=UA-xxxxxxxxx-x

# Performance
NEXT_PUBLIC_CACHE_DURATION=300000
NEXT_PUBLIC_MAX_RETRIES=3

# Security
NEXT_PUBLIC_CSP_ENABLED=true
```

## Mobile App Configuration (`.env`)

### API Configuration
```bash
REACT_APP_API_URL=http://localhost:3000/api
REACT_APP_API_TIMEOUT=30000

# Feature Flags
REACT_APP_ENABLE_ANALYTICS=true
REACT_APP_ENABLE_OFFLINE_MODE=true

# Build Configuration
REACT_APP_BUILD_VERSION=1.0.0
REACT_APP_BUILD_TYPE=development

# Third-party Services
REACT_APP_SENTRY_DSN=https://xxxx@sentry.io/xxxx
```

## Environment-Specific Configurations

### Development Environment (`.env.development`)

**Web App:**
```bash
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_DEBUG_MODE=true
NODE_ENV=development
```

**Mobile App:**
```bash
REACT_APP_API_URL=http://localhost:3000/api
REACT_APP_DEBUG_MODE=true
REACT_APP_LOG_LEVEL=debug
```

### Staging Environment (`.env.staging`)

**Web App:**
```bash
NEXT_PUBLIC_API_URL=https://api-staging.collabsphere.com
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_SENTRY_DSN=https://xxxx-staging@sentry.io/xxxx
NODE_ENV=production
```

**Mobile App:**
```bash
REACT_APP_API_URL=https://api-staging.collabsphere.com
REACT_APP_LOG_LEVEL=warn
```

### Production Environment (`.env.production`)

**Web App:**
```bash
NEXT_PUBLIC_API_URL=https://api.collabsphere.com
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_SENTRY_DSN=https://xxxx-prod@sentry.io/xxxx
NEXT_PUBLIC_CSP_ENABLED=true
NODE_ENV=production
```

**Mobile App:**
```bash
REACT_APP_API_URL=https://api.collabsphere.com
REACT_APP_LOG_LEVEL=error
```

## Quick Start

### 1. Copy Environment Template
```bash
# Web app
cp apps/web/.env.example apps/web/.env.local

# Mobile app
cp apps/mobile/.env.example apps/mobile/.env
```

### 2. Update Variables
Edit the copied files and add your configuration values.

### 3. Run Application
```bash
# Web app with specific environment
npm run dev -- --env=development

# Mobile app
npm run mobile:dev
```

## Feature Flags Reference

### Analytics Features
- `NEXT_PUBLIC_ENABLE_ANALYTICS`: Enable/disable analytics tracking
- `NEXT_PUBLIC_ENABLE_ERROR_TRACKING`: Enable/disable error reporting to Sentry
- `NEXT_PUBLIC_GA_ID`: Google Analytics ID

### UI Features
- `NEXT_PUBLIC_ENABLE_DARK_MODE`: Enable/disable dark mode toggle
- `NEXT_PUBLIC_ENABLE_ANIMATIONS`: Enable/disable animations
- `NEXT_PUBLIC_ENABLE_NOTIFICATIONS`: Enable/disable notification system

### Performance Flags
- `NEXT_PUBLIC_ENABLE_CACHING`: Enable/disable HTTP caching
- `NEXT_PUBLIC_CACHE_DURATION`: Cache duration in milliseconds
- `NEXT_PUBLIC_ENABLE_COMPRESSION`: Enable/disable response compression

### Mobile-Specific Flags
- `REACT_APP_ENABLE_OFFLINE_MODE`: Enable/disable offline functionality
- `REACT_APP_ENABLE_PUSH_NOTIFICATIONS`: Enable/disable push notifications
- `REACT_APP_ENABLE_LOCAL_STORAGE_SYNC`: Enable/disable AsyncStorage sync

## Third-Party Service Configuration

### Sentry (Error Tracking)
```bash
# Get DSN from sentry.io
NEXT_PUBLIC_SENTRY_DSN=https://key@sentry.io/projectid
```

### GitHub OAuth
```bash
# Register app at https://github.com/settings/developers
NEXT_PUBLIC_GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
```

### Google OAuth
```bash
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
```

## Accessing Environment Variables in Code

### Web App (Next.js)
```typescript
// Client-side (public variables only)
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Server-side (all variables)
const secret = process.env.SECRET_KEY;
```

### Mobile App (React Native)
```typescript
// Use .env variables
const apiUrl = process.env.REACT_APP_API_URL;
```

### Shared Code
```typescript
// Type-safe environment variables
export const getConfig = () => ({
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000'),
  isDevelopment: process.env.NODE_ENV === 'development',
});
```

## Validation

### Validate on Startup
```typescript
// apps/web/src/lib/validate-env.ts
export function validateEnvironment() {
  const required = [
    'NEXT_PUBLIC_API_URL',
    'NEXT_PUBLIC_APP_NAME',
  ];

  for (const env of required) {
    if (!process.env[env]) {
      throw new Error(`Missing required environment variable: ${env}`);
    }
  }
}
```

## Security Best Practices

1. **Never commit .env files** - Add to .gitignore
2. **Use different credentials** for each environment
3. **Rotate secrets regularly** - Especially API keys
4. **Use HTTPS only** in production
5. **Validate all user input** regardless of environment
6. **Minimize logging** of sensitive data

## Troubleshooting

### Variables Not Loading
- Check file is named correctly (`.env.local`, `.env`, etc.)
- Restart development server after changes
- Ensure no trailing spaces in variable definitions

### CORS Errors
- Check `NEXT_PUBLIC_API_URL` matches backend URL
- Verify backend CORS headers are configured
- Check no extra slashes in API URL

### API Connection Issues
- Verify API server is running
- Check `NEXT_PUBLIC_API_TIMEOUT` is appropriate
- Check network connectivity

## Additional Resources

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Expo Environment Variables](https://docs.expo.dev/guides/environment-variables/)
- [Best Practices](../ARCHITECTURE.md)

---

**Last Updated**: 2024
**Status**: Active
