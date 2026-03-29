# Collabsphere Production Architecture & Best Practices Guide

## Overview
This guide outlines the production-ready architecture and best practices implemented across the Collabsphere monorepo (mobile and web apps).

## Project Structure

### Monorepo Organization
```
apps/
  mobile/          # React Native app (Expo Router)
    - app/        # Expo Router screens
    - components/ # Reusable UI components
    - hooks/      # Custom React hooks
    - services/   # API clients and external services
    - store/      # Global state management
    - utils/      # Utility functions
    - constants/  # App-wide constants
    - types/      # TypeScript type definitions
  
  web/            # Next.js web application
    - app/       # Next.js App Router pages and layouts
    - components/ # Reusable UI components
    - hooks/     # Custom React hooks
    - services/  # API clients
    - providers/ # Context providers
    - lib/       # Library functions (HTTP, interceptors)
    - utils/     # Utility functions
    - constants/ # Configuration and constants

packages/
  types/          # Shared TypeScript interfaces
```

## Architecture Patterns

### 1. API Layer Architecture
- **HTTP Client**: Centralized HTTP utilities for consistent API communication
- **Interceptors**: Request/response middleware for auth, logging, and error handling
- **Error Handling**: Custom error classes (AppError, ValidationError, etc.)
- **API Client**: Abstraction layer over HTTP client for domain-specific endpoints

### 2. State Management
- **Web**: React Context API with custom hooks for authentication and data
- **Mobile**: AppStore class with AsyncStorage persistence and lifecycle management

### 3. Component Architecture
- **Atomic Design**: Components organized by functionality (buttons, modals, cards, etc.)
- **Reusable Patterns**: ErrorBoundary, Loading states, Empty states
- **Variants & Sizes**: Components support multiple variants and sizes for consistency

### 4. Form Handling
- **useForm Hook**: Complete form state management with validation
- **Validation Utils**: Email, password, username, URL validators
- **Error Display**: Field-level error tracking with touched state

## Best Practices

### TypeScript Usage
```typescript
// ✅ Use proper types
interface RequestOptions {
  headers?: Record<string, string>;
  timeout?: number;
}

// ❌ Avoid any
async function fetchData(options: any) { }
```

### Error Handling
```typescript
// ✅ Use custom error classes
throw new ValidationError('Invalid email', 'emailField');

// ✅ Use try-catch with proper logging
try {
  await apiClient.post('/api/users', data);
} catch (error) {
  logError(error, { context: 'userRegistration' });
}
```

### Async Operations
```typescript
// ✅ Use useAsync hook
const { data, error, isLoading, execute } = useAsync(fetchUsers);

// ✅ Use handlePromise for error handling
const [data, error] = await handlePromise(apiCall());
```

### API Communication
```typescript
// ✅ Use API client with interceptors
const response = await apiClient.get('/api/users');

// ✅ Register interceptors once at startup
registerDefaultInterceptors();
```

### Component Patterns
```typescript
// ✅ Use ErrorBoundary for error safety
<ErrorBoundary fallback={<ErrorUI />}>
  <App />
</ErrorBoundary>

// ✅ Show loading states
{isLoading ? <LoadingSpinner /> : <Content />}

// ✅ Handle empty states
{items.length === 0 ? <EmptyState /> : <ItemList />}
```

## Configuration Files

### Mobile App
- **app-config.ts**: API endpoints, feature flags, cache settings
- **design-system.ts**: Colors, typography, spacing, border-radius

### Web App
- **config.ts**: API configuration, feature flags, pagination settings
- **routes.ts**: Route definitions and API endpoints
- **http.ts**: HTTP utilities with error handling

## Hooks Reference

### Custom Hooks - Web
- `useFetch`: Data fetching with caching
- `useForm`: Form state management with validation
- `useLocalStorage`: localStorage synchronization
- `usePagination`: Pagination logic
- `useDebounce`: Debounce values and callbacks
- `useAsync`: Async operation management

### Custom Hooks - Mobile
- `useAuth`: Authentication state management
- `useAppStorage`: Persistent storage helper
- `useDebounce`: Debounce values
- `usePrevious`: Track previous values
- `useTimeout`: Manage setTimeout
- `useInterval`: Manage setInterval

## Utility Functions

### String Formatting
- `formatDate`: Format dates with multiple options
- `formatNumber`: Format numbers with localization
- `formatCurrency`: Format as currency
- `formatFileSize`: Human-readable file sizes
- `truncateText`: Truncate with ellipsis
- `slugify`: Create URL-friendly slugs

### Array Helpers
- `chunkArray`: Split array into chunks
- `removeDuplicates`: Remove duplicate items
- `groupBy`: Group items by property
- `sortBy`: Sort array by property
- `paginate`: Paginate array items
- `flattenArray`: Flatten nested arrays

### Validation
- `isValidEmail`: Validate email format
- `isStrongPassword`: Check password strength
- `isValidUsername`: Validate username format
- `isValidUrl`: Validate URL format
- `isValidPhoneNumber`: Validate phone number
- `isValidFileSize`: Check file size limits

## Environment Setup

### Required Environment Variables
```
# Backend API
NEXT_PUBLIC_API_URL=http://localhost:3000/api
REACT_APP_API_URL=http://localhost:3000/api

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_DARK_MODE=true
```

## Security Practices

### Authentication
- JWT tokens stored in localStorage (web) / AsyncStorage (mobile)
- Auth token included in request headers via interceptors
- Token refresh mechanism on 401 responses
- User logout clears all stored auth data

### Error Handling
- Sensitive error details hidden in production
- Development mode shows full error stack traces
- Error logging for monitoring and debugging

## Performance Optimization

### Caching
- HTTP response caching in useFetch hook
- Configurable cache duration
- Cache invalidation on state changes

### Pagination
- Default page size of 20 items
- Max page size of 100 items
- Client-side pagination with hook

### Bundle Optimization
- Tree-shaking enabled for utility functions
- Code splitting in Next.js via dynamic imports
- Lazy loading of routes and components

## Testing Patterns

### Unit Testing
```typescript
describe('formatDate', () => {
  it('should format date correctly', () => {
    const result = formatDate(new Date('2024-01-01'), 'short');
    expect(result).toBe('Jan 1');
  });
});
```

### Component Testing
```typescript
describe('Button Component', () => {
  it('should handle click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalled();
  });
});
```

## Maintenance Guidelines

### Code Reviews
- Review TypeScript types before merging
- Ensure error handling is comprehensive
- Check for proper use of hooks and utilities

### Documentation
- Comment complex algorithms and logic
- Document public APIs and exported functions
- Keep README files up to date

### Version Management
- Use semantic versioning for releases
- Maintain CHANGELOG.md with updates
- Tag releases in git

## Migration Checklist

### Firebase to Backend Migration
- [ ] Replace Firebase imports with local stubs
- [ ] Implement backend API endpoints
- [ ] Update authentication flow
- [ ] Migrate database queries
- [ ] Test error handling
- [ ] Update environment variables
- [ ] Deploy and monitor

## Troubleshooting

### Common Issues

#### 1. Auth Token Not Persisting
- Check AsyncStorage/localStorage availability
- Verify token is being saved before redirect
- Check network interceptor includes token

#### 2. API Requests Failing
- Verify API endpoint configuration
- Check CORS headers on backend
- Review request/response interceptors
- Check error logs for details

#### 3. Build Errors
- Clear cache: `rm -rf node_modules && npm i`
- Update package: `npm update package-name`
- Check TypeScript errors: `tsc --noEmit`

## Future Improvements

- [ ] Implement automated error reporting (Sentry)
- [ ] Add offline-first synchronization
- [ ] Implement advanced caching strategies
- [ ] Add performance monitoring
- [ ] Set up E2E testing framework
- [ ] Implement feature flags service
- [ ] Add real-time notifications

---

**Last Updated**: 2024
**Status**: Production Ready
