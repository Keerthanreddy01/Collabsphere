# Collabsphere - Production Ready Monorepo

> A modern, scalable monorepo for collaborative project management with React Native (Expo) and Next.js web applications.

<div align="center">

![React](https://img.shields.io/badge/React-18.0+-blue?logo=react)
![Next.js](https://img.shields.io/badge/Next.js-16.0+-black?logo=nextdotjs)
![React Native](https://img.shields.io/badge/React%20Native-0.76+-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178c6?logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green)

[Features](#features) • [Quick Start](#quick-start) • [Architecture](#architecture) • [Documentation](#documentation)

</div>

## Overview

Collabsphere is a production-ready monorepo demonstrating best practices for:
- **Complete Firebase removal** with production backend integration stubs
- **Comprehensive type safety** with TypeScript across all platforms
- **Modern architecture patterns** including API layers, middleware, error handling
- **Reusable utilities** for common operations (validation, formatting, state management)
- **Well-documented code** with examples and best practices

## Features

### ✨ Production-Ready Architecture
- **Complete Firebase Migration**: All Firebase dependencies removed, replaced with backend stubs
- **Type-Safe Across All Platforms**: Full TypeScript implementation for web and mobile
- **Centralized API Layer**: Unified HTTP client with interceptors and error handling
- **State Management**: Context API (web) and AsyncStorage-based store (mobile)
- **Comprehensive Error Handling**: Custom error classes with proper logging

### 🎨 UI Components & Utilities
- **Reusable Components**: Button, Card, Modal, ErrorBoundary, LoadingSpinner
- **Form Handling**: Complete form management with validation
- **String Utilities**: 20+ string formatting and manipulation functions
- **Array Helpers**: Comprehensive array operations (chunk, group, sort, paginate)
- **Performance Optimization**: Memoization, throttling, debouncing, LRU cache

### 🪝 Custom React Hooks
- **useFetch**: Data fetching with automatic caching
- **useForm**: Complete form state management
- **useLocalStorage/useAppStorage**: Persistent state synchronization
- **usePagination**: Client-side pagination logic
- **useDebounce/useAsync**: Async operation management

### 📱 Mobile & Web Support
- **React Native (Expo)**: Mobile app with Expo Router
- **Next.js 16**: Web app with App Router
- **Monorepo Structure**: Shared types and utilities
- **Build Optimization**: Turbo for efficient builds

### 📚 Comprehensive Documentation
- **ARCHITECTURE.md**: Design patterns and best practices
- **API_DOCS.md**: Complete API endpoint reference
- **ENV_CONFIG.md**: Environment configuration guide
- **SETUP.md**: Installation and development setup
- **CHANGELOG.md**: Detailed change history

## Quick Start

### Prerequisites
- Node.js 18+ and npm 10+
- Git 2.30+

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/Collabsphere.git
cd Collabsphere

# Install dependencies
npm install

# Set up environment variables
cp apps/web/.env.example apps/web/.env.local
cp apps/mobile/.env.example apps/mobile/.env

# Start development servers
npm run dev
```

**Web App**: http://localhost:3000  
**Mobile App**: Expo on http://localhost:19000

## Project Structure

```
Collabsphere/
├── apps/
│   ├── web/                 # Next.js web application
│   │   ├── src/
│   │   │   ├── app/        # Next.js App Router pages
│   │   │   ├── components/ # Reusable React components
│   │   │   ├── hooks/      # Custom React hooks
│   │   │   ├── services/   # API service layer
│   │   │   ├── lib/        # HTTP client, interceptors
│   │   │   ├── utils/      # Utility functions
│   │   │   └── types/      # TypeScript interfaces
│   │   └── package.json
│   │
│   └── mobile/              # React Native (Expo) mobile app
│       ├── app/            # Expo Router screens
│       ├── components/     # React Native components
│       ├── hooks/          # Custom React Native hooks
│       ├── services/       # API client for mobile
│       ├── store/          # AsyncStorage state management
│       ├── utils/          # Utility functions
│       └── package.json
│
├── packages/
│   └── types/              # Shared TypeScript type definitions
│       ├── src/
│       │   └── index.ts   # Shared interfaces
│       └── package.json
│
├── ARCHITECTURE.md         # Architecture guide
├── API_DOCS.md            # API endpoint documentation
├── ENV_CONFIG.md          # Environment configuration
├── SETUP.md               # Setup and installation guide
├── CHANGELOG.md           # Version history
└── README.md              # This file
```

## Technology Stack

### Frontend
- **React 19** - UI library
- **Next.js 16** - Web framework
- **React Native** - Cross-platform mobile
- **Expo** - React Native development platform
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling

### Backend
- **Node.js** - Runtime
- **API Layer** - Centralized HTTP client
- **Middleware** - Request/response interceptors
- **Error Handling** - Custom error classes

### Tools & Libraries
- **Turbo** - Monorepo build system
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Axios** - HTTP client (mobile)
- **AsyncStorage** - Mobile persistence

## Key Features by App

### Web App (`apps/web`)
- ✅ Next.js 16 with App Router
- ✅ 6+ custom React hooks
- ✅ API interceptor middleware
- ✅ Form validation and error handling
- ✅ UI component library
- ✅ Dark mode support
- ✅ Real-time notifications
- ✅ Comprehensive type definitions

### Mobile App (`apps/mobile`)
- ✅ Expo Router navigation
- ✅ AsyncStorage persistence
- ✅ API client with middleware
- ✅ 8+ custom React Native hooks
- ✅ Offline support
- ✅ Push notifications ready
- ✅ Production configurations

## Code Examples

### Using Custom Hooks

```typescript
// Data Fetching
const { data, error, isLoading } = useFetch('/api/projects');

// Form Management
const { values, errors, handleSubmit } = useForm({
  initialValues: { email: '', password: '' },
  onSubmit: async (data) => { /* ... */ },
  validate: (values) => { /* ... */ }
});

// Persistent Storage
const [theme, setTheme] = useLocalStorage('theme', 'light');
```

### API Communication

```typescript
import { apiClient } from '@/services/api-client';

// GET request
const users = await apiClient.get('/users');

// POST with data
const newUser = await apiClient.post('/users', userData);

// With error handling
try {
  const data = await apiClient.get('/data');
} catch (error) {
  handleApiError(error);
}
```

### Error Handling

```typescript
import { ValidationError, AppError } from '@/utils/error-handling';

try {
  if (!isValidEmail(email)) {
    throw new ValidationError('Invalid email', 'email');
  }
} catch (error) {
  const message = getErrorMessage(error);
  logError(error, { context: 'registration' });
}
```

## Documentation

- **📖 [Architecture Guide](./ARCHITECTURE.md)** - Design patterns and best practices
- **🔌 [API Documentation](./API_DOCS.md)** - Complete endpoint reference
- **⚙️ [Environment Setup](./ENV_CONFIG.md)** - Configuration guide
- **🚀 [Installation Guide](./SETUP.md)** - Development setup
- **📝 [Changelog](./CHANGELOG.md)** - Version history

## Git History

The repository includes production-level commits demonstrating:
- Firebase removal and cleanup
- Utility layer implementation
- Custom hooks development
- API service layer
- UI component library
- Comprehensive documentation
- Performance optimization

View commit history: `git log --oneline`

## Development

### Common Commands

```bash
# Development
npm run dev              # Start all dev servers
npm run build           # Build for production
npm run lint            # Lint code
npm run format          # Format with Prettier

# Web app specific
cd apps/web
npm run dev             # Start Next.js dev server
npm run build           # Build Next.js app
npm run test            # Run tests

# Mobile app specific
cd apps/mobile
npm run dev             # Start Expo server
npm run build:web       # Build web
npm run build:ios       # Build iOS
```

### TypeScript

```bash
# Check TypeScript errors
tsc --noEmit

# Generate types
tsc --declaration
```

## Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

## Performance

### Optimizations Included
- **Request Caching**: Automatic HTTP response caching with TTL
- **Memoization**: Function result caching
- **Debouncing**: User input optimization
- **Lazy Loading**: Component and route code splitting
- **Bundle Analysis**: Built-in Next.js optimization

### Metrics
- ⚡ Fast page loads with Next.js optimization
- 📦 Minimal bundle size with tree-shaking
- 🔄 Efficient state management with Context API
- 💾 Smart caching with LRU cache implementation

## Security

- ✅ JWT token-based authentication
- ✅ Request/response middleware validation
- ✅ CORS configuration support
- ✅ Input validation utilities
- ✅ Secure error handling

## Testing

Comprehensive testing utilities included:
- Mock data generators
- API mocking helpers
- Assertion utilities
- Spy tracking
- Async/await testing helpers

```bash
npm run test             # Run test suite
npm run test:watch      # Watch mode
npm run test:coverage   # Coverage report
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari 14+
- Edge (latest)

## Mobile Support

- iOS 13+ (iPhone & iPad)
- Android 9+ (via Expo Go or APK)

## License

MIT License - see LICENSE file for details

## Support

- 💬 **GitHub Discussions**: Ask questions and share ideas
- 🐛 **GitHub Issues**: Report bugs
- 📧 **Email**: support@collabsphere.com

## Acknowledgments

Built with modern technologies and best practices for production-grade applications.

---

<div align="center">

**[⬆ back to top](#collabsphere---production-ready-monorepo)**

Made with ❤️ by [Your Team]

</div>
