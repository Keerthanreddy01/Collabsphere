# Setup & Installation Guide

Complete guide for setting up Collabsphere development environment.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.0.0 or higher
- **npm**: v10.0.0 or higher (comes with Node.js)
- **Git**: v2.30.0 or higher
- **Ruby** (for mobile development): v2.7.0 or higher
- **Xcode** (macOS only): v13.0 or higher
- **Android Studio** (for Android development)

## System Requirements

### Minimum
- RAM: 8 GB
- Disk Space: 10 GB (for dependencies and build artifacts)
- OS: macOS 11, Windows 10, or Ubuntu 20.04

### Recommended
- RAM: 16 GB
- Disk Space: 20 GB
- OS: Latest macOS, Windows 11, or Ubuntu 22.04

## Installation Steps

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/Collabsphere.git
cd Collabsphere
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install workspace dependencies (automatic with npm workspaces)
# or manually:
npm install --workspaces
```

### 3. Environment Setup

#### Web App
```bash
# Copy environment template
cp apps/web/.env.example apps/web/.env.local

# Edit with your values
# Configure NEXT_PUBLIC_API_URL and other variables
```

#### Mobile App
```bash
# Copy environment template
cp apps/mobile/.env.example apps/mobile/.env

# Edit with your values
# Configure REACT_APP_API_URL and other variables
```

### 4. Install Workspace Dependencies

```bash
# Install for specific workspace
cd apps/web
npm install

cd ../mobile
npm install

cd ../..
```

## Development Server Setup

### Web App

```bash
# Navigate to web app
cd apps/web

# Start development server
npm run dev

# Server will run at http://localhost:3000
```

### Mobile App

```bash
# Navigate to mobile app
cd apps/mobile

# Start Expo development server
npm run dev

# Options:
# - Press 'i' to run iOS simulator
# - Press 'a' to run Android emulator
# - Scan QR code with Expo Go app
```

### Both Apps

```bash
# From root directory
npm run dev

# This starts both web and mobile dev servers
```

## Backend Setup

### Local Backend

If running backend locally:

```bash
# Clone backend repository
git clone https://github.com/yourusername/collabsphere-backend.git
cd collabsphere-backend

# Install dependencies
npm install

# Set up environment
cp .env.example .env

# Run migrations
npm run migrate

# Start server
npm run dev

# Server will run at http://localhost:3000
```

### Environment Variables

Update `.env.local` (web) or `.env` (mobile):

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000/api
REACT_APP_API_URL=http://localhost:3000/api
```

## Database Setup

### Option 1: Docker

```bash
# Start PostgreSQL container
docker run --name collabsphere-db \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=collabsphere \
  -p 5432:5432 \
  -d postgres:15

# Connect string:
# DATABASE_URL=postgresql://postgres:password@localhost:5432/collabsphere
```

### Option 2: Manual Installation

```bash
# macOS (Homebrew)
brew install postgresql@15
brew services start postgresql@15

# Ubuntu
sudo apt-get install postgresql postgresql-contrib

# Windows
# Download from https://www.postgresql.org/download/windows/
```

## IDE Setup (VS Code)

### Recommended Extensions

```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "swisskyrepo.open-in-browser",
    "ms-vscode.remote-repositories",
    "prisma.prisma",
    "GraphQL.vscode-graphql"
  ]
}
```

Install with:
```bash
code --install-extension esbenp.prettier-vscode
# ... repeat for others
```

## Build & Distribution

### Web App Build
```bash
cd apps/web
npm run build

# Output: .next/ directory
```

### Mobile App Build

#### iOS
```bash
cd apps/mobile

# Development build
eas build --platform ios --local

# Production build
eas build --platform ios --profile production
```

#### Android
```bash
cd apps/mobile

# Development build
eas build --platform android --local

# Production build
eas build --platform android --profile production
```

## Testing Setup

### Run Tests
```bash
# Web app tests
cd apps/web
npm run test

# Mobile app tests
cd apps/mobile
npm run test

# All tests
npm test --workspaces
```

## Troubleshooting

### Installation Issues

**Node version error:**
```bash
# Check Node version
node --version

# Update Node (using nvm)
nvm install 18
nvm use 18
```

**npm workspace issues:**
```bash
# Clear cache
npm cache clean --force

# Reinstall
rm -rf node_modules
npm install
```

### Development Server Issues

**Port already in use:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

**CORS errors:**
- Check backend CORS configuration
- Verify `NEXT_PUBLIC_API_URL` is correct
- Ensure backend server is running

**Module not found:**
```bash
# Clear caches
rm -rf .next node_modules
npm install
npm run build

# Check TypeScript
tsc --noEmit
```

### Mobile App Issues

**Expo connection issues:**
```bash
# Restart Expo
Ctrl+C to stop
npm run dev

# Clear Expo cache
expo cache --clear
npm run dev
```

**iOS build errors:**
```bash
# Clear Xcode cache
rm -rf ~/Library/Developer/Xcode/DerivedData

# Try building again
npm run build:ios
```

**Android build errors:**
```bash
# Clear Android cache
rm -rf android/build

# Try building again
npm run build:android
```

## Common Commands

### Development
```bash
npm run dev              # Start dev servers
npm run build           # Build for production
npm run test            # Run tests
npm run lint            # Lint code
npm run format          # Format code
```

### Database
```bash
npm run migrate         # Run migrations
npm run migrate:dev     # Run migrations in dev
npm run db:seed        # Seed database
npm run db:reset       # Reset database
```

### Git
```bash
git status              # Check status
git add .              # Stage changes
git commit -m "message" # Commit
git push origin main    # Push to main
```

## Documentation

- **Architecture**: See [ARCHITECTURE.md](./ARCHITECTURE.md)
- **API Docs**: See [API_DOCS.md](./API_DOCS.md)
- **Environment**: See [ENV_CONFIG.md](./ENV_CONFIG.md)
- **Changelog**: See [CHANGELOG.md](./CHANGELOG.md)

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Documentation](https://docs.expo.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Getting Help

- **Discord**: [Community Server](#)
- **GitHub Issues**: Report bugs here
- **Email**: support@collabsphere.com

---

**Last Updated**: 2024
**Version**: 1.0.0
**Status**: Active
