# Contributing to Collabsphere

Thank you for reaching out to contribute! We're excited to have you help improve Collabsphere.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Branch Naming Convention](#branch-naming-convention)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Code Style Guidelines](#code-style-guidelines)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)
- [Code of Conduct](#code-of-conduct)

## Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/yourusername/Collabsphere.git
   cd Collabsphere
   ```
3. **Add** upstream remote:
   ```bash
   git remote add upstream https://github.com/Keerthanreddy01/Collabsphere.git
   ```
4. **Create** a feature branch for your work

## Development Setup

### Prerequisites

- **Node.js** 18+ and **npm** 10+
- **Git** 2.30+
- **Expo CLI** (for mobile development)

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp apps/web/.env.example apps/web/.env.local
cp apps/mobile/.env.example apps/mobile/.env

# Verify setup
npm run lint
tsc --noEmit
```

### Running Locally

```bash
# Start all development servers
npm run dev

# Or individually:
cd apps/web && npm run dev        # Web at http://localhost:3000
cd apps/mobile && npm run dev     # Expo at http://localhost:19000
```

## Branch Naming Convention

Use descriptive branch names with one of these prefixes:

| Prefix | Purpose | Example |
|--------|---------|---------|
| `feat/` | New feature | `feat/add-user-profile` |
| `fix/` | Bug fix | `fix/auth-token-refresh` |
| `docs/` | Documentation | `docs/update-api-guide` |
| `chore/` | Maintenance, deps | `chore/upgrade-typescript` |
| `refactor/` | Code refactoring | `refactor/simplify-hooks` |
| `perf/` | Performance | `perf/optimize-bundle` |
| `test/` | Add/update tests | `test/add-form-validation` |

## Commit Guidelines

We follow **Conventional Commits** specification for clear, semantic commit messages.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat** — A new feature
- **fix** — A bug fix
- **docs** — Documentation changes
- **style** — Code style changes (formatting, semicolons, etc.)
- **refactor** — Code refactoring without changing functionality
- **perf** — Performance improvements
- **test** — Adding or updating tests
- **chore** — Build, dependencies, tooling

### Scope (Optional)

The scope is the area affected:
- `web` — Web app changes
- `mobile` — Mobile app changes
- `types` — Type definitions
- `api` — API services
- `hooks` — React hooks
- `components` — UI components
- `utils` — Utility functions

### Examples

```
feat(auth): add JWT token refresh logic

- Implement automatic token refresh on API 401 responses
- Add retry mechanism for failed requests
- Update AuthProvider to handle token rotation

Closes #42
```

```
fix(web): correct useForm validation error display

User was seeing validation errors even after correcting input.
The error state was not being cleared on value change.

Fixes #85
```

```
docs(api): update API endpoint documentation

- Add authentication examples
- Document error response formats
- Add rate limiting info
```

### Commit Checklist

Before committing, ensure:
- ✅ Tests pass locally
- ✅ Linter passes: `npm run lint -- --fix`
- ✅ TypeScript compiles: `tsc --noEmit`
- ✅ No sensitive data (secrets, API keys, tokens) committed
- ✅ Messages follow conventional commit format

## Pull Request Process

### Before You Start

1. **Sync** your fork with upstream:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Check** existing issues/PRs to avoid duplicates

### Creating Your PR

1. **Push** your branch to your fork:
   ```bash
   git push origin feat/your-feature
   ```

2. **Open** a Pull Request on GitHub (main branch)

3. **Fill out** the PR template completely:
   - Clear description of changes
   - Type of change (feature/fix/docs)
   - Link related issues with `Closes #XX`
   - Check all boxes in the verification checklist

4. **Address** review comments promptly

### PR Requirements

For your PR to be merged:

- ✅ **Passes CI** — All GitHub Actions checks pass
- ✅ **TypeScript strict** — `tsc --noEmit` passes
- ✅ **ESLint** — `npm run lint` passes with no errors
- ✅ **Code style** — Matches project conventions (see below)
- ✅ **Tests** — Existing tests still pass
- ✅ **Docs updated** — Changes reflected in ARCHITECTURE.md, API_DOCS.md, etc. if needed
- ✅ **No secrets** — No .env, API keys, or tokens committed
- ✅ **Tested locally** — Verified to work on web/mobile as applicable

### Handling Feedback

- 📝 Request changes? Make updates and push to the same branch
- ✅ Ready to merge? Maintainers will merge when approval is given
- ❓ Questions? Comment on the PR or reach out in Discussions

## Code Style Guidelines

### TypeScript

- **Strict mode** always enabled: `"strict": true`
- **Explicit types** — Avoid `any`, use proper types
- **Interfaces** for object shapes, `type` for unions/primitives
- **JSDoc comments** for public functions:

```typescript
/**
 * Fetches user profile by ID
 * @param userId - The user's unique identifier
 * @returns Promise resolving to user data
 * @throws {NotFoundError} If user doesn't exist
 */
function getUserProfile(userId: string): Promise<User> {
  // ...
}
```

### ESLint & Prettier

All files must pass formatting checks:

```bash
# Format all files
npm run format

# Check linting
npm run lint

# Fix linting issues
npm run lint -- --fix
```

**Do not** commit unformatted code. Configure your editor to format on save.

### Component Conventions

**React Components:**
```typescript
interface ComponentProps {
  title: string;
  onClose?: () => void;
  variant?: 'primary' | 'secondary';
}

export const MyComponent: React.FC<ComponentProps> = ({
  title,
  onClose,
  variant = 'primary',
}) => {
  return (
    <div className={`component-${variant}`}>
      <h2>{title}</h2>
    </div>
  );
};
```

**Custom Hooks:**
```typescript
export function useCustomHook(initialValue: string) {
  const [value, setValue] = useState(initialValue);
  
  useEffect(() => {
    // Cleanup on unmount
    return () => {
      // cleanup logic
    };
  }, []);
  
  return { value, setValue };
}
```

### File Organization

```
apps/web/src/
├── app/              # Next.js pages and layouts
├── components/       # React components (organized by feature)
├── hooks/           # Custom React hooks
├── lib/             # Utilities and helpers
├── services/        # API services
├── types/           # TypeScript interfaces
└── utils/           # Pure utility functions
```

## Reporting Bugs

### Before Reporting

1. **Check** existing issues to avoid duplicates
2. **Read** documentation and ARCHITECTURE.md
3. **Try** on latest code: `git pull upstream main`

### Reporting Template

When opening a bug report, include:

1. **Clear title** — `useFetch hook returns stale data on component remount`
2. **Description** — What is the problem?
3. **Reproduction steps** — How do you trigger the bug?
4. **Expected behavior** — What should happen?
5. **Actual behavior** — What actually happens?
6. **Environment:**
   - OS (Windows / macOS / Linux)
   - Node.js version
   - App (web/mobile)
   - App version/commit
7. **Screenshots** — If applicable, include visual evidence
8. **Logs** — Error messages, stack traces

### Bug Report Example

```
**Title:** AuthProvider loses session token on manual page refresh

**Description:**
When I refresh the page manually (F5), the user session is lost
even though the token should be persisted in localStorage.

**Steps to Reproduce:**
1. Log in to web app
2. Check browser console - token is in localStorage
3. Press F5 to refresh page manually
4. User is logged out

**Expected:** User should remain logged in after refresh

**Actual:** User is logged out, token is missing from localStorage

**Environment:**
- OS: Windows 11
- Node: v18.16.0
- App: web
- Browser: Chrome 121
```

## Suggesting Features

### Before Suggesting

1. **Check** existing issues and Discussions
2. **Verify** it aligns with project scope

### Feature Request Template

1. **Clear title** — `Support OAuth login via GitHub`
2. **Problem** — What problem does this solve?
3. **Solution** — How should it work?
4. **Alternatives** — Other ways to solve this?
5. **Additional context** — Links, references, sketches

### Feature Request Example

```
**Title:** Add dark mode toggle in settings

**Problem:**
Currently the app uses system theme preference only. Users with
light system theme can't use dark mode in the app.

**Solution:**
Add a theme selector in user settings:
- Auto (system preference)
- Light
- Dark

**Alternatives Considered:**
- Just use system preference (current approach)
- Force dark mode with CSS variables override

**Additional Context:**
Theme provider already supports this in the codebase
(see ThemeProvider.tsx). Just needs UI to change it.
```

## Code of Conduct

All contributors must follow our [Code of Conduct](CODE_OF_CONDUCT.md).

**In short:**
- ✅ Be respectful and inclusive
- ✅ Welcome different perspectives
- ✅ Focus on constructive feedback
- ❌ No harassment, discrimination, or hostile behavior
- ❌ No spam or self-promotion

---

## Getting Help

- 📚 **Documentation** — See ARCHITECTURE.md, API_DOCS.md, SETUP.md
- 💬 **Discussions** — Ask questions in GitHub Discussions
- 🐛 **Issues** — Report bugs or request features
- 📧 **Email** — Contact maintainers at support@collabsphere.com

## Recognition

Contributors are recognized in:
- GitHub contributors page
- CHANGELOG.md for significant contributions
- Project README.md for major features

---

**Thank you for contributing to Collabsphere! 🎉**
