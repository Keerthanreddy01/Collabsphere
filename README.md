<div align="center">

```
  ██████╗ ██████╗ ██╗     ██╗      █████╗ ██████╗ ███████╗██████╗ ██╗  ██╗███████╗██████╗ ███████╗
 ██╔════╝██╔═══██╗██║     ██║     ██╔══██╗██╔══██╗██╔════╝██╔══██╗██║  ██║██╔════╝██╔══██╗██╔════╝
 ██║     ██║   ██║██║     ██║     ███████║██████╔╝███████╗██████╔╝███████║█████╗  ██████╔╝█████╗  
 ██║     ██║   ██║██║     ██║     ██╔══██║██╔══██╗╚════██║██╔═══╝ ██╔══██║██╔══╝  ██╔══██╗██╔══╝  
 ╚██████╗╚██████╔╝███████╗███████╗██║  ██║██████╔╝███████║██║     ██║  ██║███████╗██║  ██║███████╗
  ╚═════╝ ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝╚═════╝ ╚══════╝╚═╝     ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝
```

**Where teams move faster. Together.**

---

[![Platform](https://img.shields.io/badge/Platform-iOS%20%7C%20Android%20%7C%20Web-0A0A0A?style=for-the-badge&logo=apple&logoColor=white)](https://collabsphere.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Next.js](https://img.shields.io/badge/Next.js-16+-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![Expo](https://img.shields.io/badge/Expo-52+-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev)
[![License](https://img.shields.io/badge/License-MIT-22C55E?style=for-the-badge)](./LICENSE)

</div>

---

## ✦ What is Collabsphere?

**Collabsphere** is a high-performance collaboration platform built for modern teams — available on iOS, Android, and the web. Designed from the ground up with speed, reliability, and developer experience as core principles.

> *Built for teams who demand more. Engineered for scale.*

---

## ✦ Platform Availability

<div align="center">

|  | Platform | Status |
|---|---|---|
| 📱 | **iOS** (iPhone & iPad) | iOS 13+ |
| 🤖 | **Android** | Android 9+ |
| 🌐 | **Web** | All modern browsers |

</div>

---

## ✦ Core Features

### 🚀 Performance First
- Sub-second navigation with optimized routing
- Smart caching layer — up to **~70% cache hit rate**
- Lazy-loaded screens and components
- Offline-ready on mobile

### 🔒 Security by Default
- JWT-based authentication
- Request/response middleware validation
- Input sanitization across all layers
- No third-party data exposure

### 🎨 Polished UI/UX
- Dark mode support
- Fully responsive across breakpoints
- Accessible components (WCAG compliant)
- Smooth native-feel animations

### 🧩 Extensible Architecture
- Clean separation of concerns
- Unified API client with interceptors
- Custom hook library (14+ hooks)
- Reusable component system

---

## ✦ Tech Stack

```
┌─────────────────────────────────────────────────────────┐
│                     COLLABSPHERE                        │
├──────────────────────┬──────────────────────────────────┤
│     📱  MOBILE       │          🌐  WEB                 │
│  React Native 0.76+  │       Next.js 16 (App Router)    │
│  Expo Router         │       React 19                   │
│  NativeWind          │       Tailwind CSS               │
│  AsyncStorage        │       Context API                │
├──────────────────────┴──────────────────────────────────┤
│                  SHARED LAYER                           │
│        TypeScript 5 · Axios · Custom Hooks             │
│       Validation Utils · Error Handling · Types        │
├─────────────────────────────────────────────────────────┤
│                  TOOLING                                │
│         Turbo · ESLint · Prettier · EAS Build          │
└─────────────────────────────────────────────────────────┘
```

---

## ✦ Quick Start

### Prerequisites

```bash
node -v  # 18+
npm -v   # 10+
```

### Setup

```bash
# 1. Clone
git clone https://github.com/yourusername/Collabsphere.git
cd Collabsphere

# 2. Install
npm install

# 3. Configure environment
cp apps/web/.env.example apps/web/.env.local
cp apps/mobile/.env.example apps/mobile/.env

# 4. Run
npm run dev
```

| App | URL |
|-----|-----|
| Web | http://localhost:3000 |
| Mobile | http://localhost:19000 (Expo) |

---

## ✦ Project Structure

```
Collabsphere/
│
├── apps/
│   ├── web/                 ← Next.js (App Router)
│   │   └── src/
│   │       ├── app/         ← Pages & Layouts
│   │       ├── components/  ← UI Component Library
│   │       ├── hooks/       ← 6+ Custom Hooks
│   │       ├── services/    ← API Layer
│   │       ├── utils/       ← Helpers & Validation
│   │       └── types/       ← TypeScript Interfaces
│   │
│   └── mobile/              ← React Native (Expo)
│       ├── app/             ← Expo Router Screens
│       ├── components/      ← Native UI Components
│       ├── hooks/           ← 8+ Custom Hooks
│       ├── services/        ← Mobile API Client
│       └── store/           ← Persistent State
│
└── packages/
    └── types/               ← Shared Type Definitions
```

---

## ✦ Key APIs

```typescript
// Data fetching with caching
const { data, isLoading, error } = useFetch('/api/projects');

// Form management
const { values, errors, handleSubmit } = useForm({
  initialValues: { name: '' },
  onSubmit: async (data) => { /* ... */ },
  validate: (values) => { /* ... */ }
});

// Persistent storage
const [theme, setTheme] = useLocalStorage('theme', 'light');

// API client
const result = await apiClient.post('/projects', payload);
```

---

## ✦ Build & Deploy

### Web (Next.js)

```bash
npm run build        # Production build
vercel deploy        # Deploy to Vercel
```

### Mobile (Expo + EAS)

```bash
eas build --platform android   # Android APK/AAB
eas build --platform ios       # iOS IPA
eas submit --platform ios      # Submit to App Store
eas submit --platform android  # Submit to Play Store
```

---

## ✦ Environment Variables

> ⚠️ **Never commit `.env` files.** Use `.env.example` as reference only.

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_API_URL` | ✅ | Backend API base URL |
| `SESSION_SECRET` | ✅ | Session encryption key |
| `NEXT_PUBLIC_ANALYTICS_ID` | ○ | Analytics tracking |

See `ENV_CONFIG.md` for complete configuration reference.

---

## ✦ Performance

| Metric | Value |
|--------|-------|
| First Contentful Paint | ~1.2s |
| Time to Interactive | ~2.5s |
| Web Bundle (gzip) | ~85KB |
| Cache Hit Rate | ~70% |
| Mobile Load (4G) | 2–3s |

---

## ✦ Documentation

| Doc | Description |
|-----|-------------|
| [`ARCHITECTURE.md`](./ARCHITECTURE.md) | System design & patterns |
| [`API_DOCS.md`](./API_DOCS.md) | Endpoint reference |
| [`ENV_CONFIG.md`](./ENV_CONFIG.md) | Environment configuration |
| [`SETUP.md`](./SETUP.md) | Local development guide |
| [`CHANGELOG.md`](./CHANGELOG.md) | Version history |

---

## ✦ Open Source

Collabsphere is **fully open source** under the MIT License. We welcome contributions from developers of all experience levels — whether it's fixing a typo, reporting a bug, improving docs, or shipping a new feature.

### 🌍 Ways to Contribute

| Type | How |
|------|-----|
| 🐛 **Found a bug?** | [Open an Issue](https://github.com/yourusername/Collabsphere/issues/new?template=bug_report.md) |
| 💡 **Have an idea?** | [Start a Discussion](https://github.com/yourusername/Collabsphere/discussions) |
| 📖 **Improve docs** | Edit any `.md` file and open a PR |
| 🔧 **Fix something** | Pick an issue labeled `good first issue` |
| ⭐ **Show support** | Star the repo — it genuinely helps |

### 🔁 Contribution Workflow

```bash
# 1. Fork the repo on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/Collabsphere.git
cd Collabsphere

# 2. Create a branch — one feature per branch
git checkout -b feat/your-feature-name

# 3. Install and run
npm install && npm run dev

# 4. Make changes, then lint and format
npm run lint && npm run format

# 5. Commit using conventional commits
git commit -m "feat(mobile): add push notification support"
git commit -m "fix(web): resolve auth redirect loop"
git commit -m "docs: update API endpoint reference"

# 6. Push and open a Pull Request
git push origin feat/your-feature-name
```

### ✅ PR Checklist

- [ ] TypeScript compiles with no errors (`tsc --noEmit`)
- [ ] ESLint passes (`npm run lint`)
- [ ] Code is formatted (`npm run format`)
- [ ] Tested locally on web and/or mobile
- [ ] Docs updated if your change affects usage
- [ ] Commits follow [Conventional Commits](https://www.conventionalcommits.org/)

### 🏷️ Commit Message Format

```
<type>(<scope>): <short description>

Types:  feat | fix | docs | style | refactor | test | chore
Scopes: web  | mobile | packages | ci | docs

feat(web): add dark mode toggle
fix(mobile): resolve tab bar flicker on Android
docs: update contributing guide
chore: upgrade Expo to 52
```

### 🌱 Good First Issues

New to the codebase? Look for issues tagged:

- `good first issue` — beginner friendly, well scoped
- `help wanted` — community help appreciated
- `documentation` — no code required

> **Not sure where to start?** Open a Discussion and say hi — we'll point you in the right direction.

---

## ✦ Support

| Channel | Link |
|---------|------|
| 🐛 Bug Reports | [GitHub Issues](https://github.com/yourusername/Collabsphere/issues) |
| 💬 Discussions | [GitHub Discussions](https://github.com/yourusername/Collabsphere/discussions) |
| 📖 Documentation | See `/docs` folder |

---

## ✦ License

MIT License — see [`LICENSE`](./LICENSE) for details.

---

<div align="center">

```
  ╔═══════════════════════════════════════╗
  ║   Built with precision. Open source.  ║
  ╚═══════════════════════════════════════╝
```

**Collabsphere** · MIT Licensed · Made with care

</div>
