# 🚀 Micro-Frontend Architecture Demo

A demonstration of Micro-Frontend architecture using Next.js, Module Federation, and Tailwind CSS. This project showcases how to build scalable, independently deployable frontend applications that work together seamlessly.

> **⚠️ Important**: This project uses `@module-federation/nextjs-mf@8.x` which has known compatibility issues with Next.js 14+ SSR. It serves as an educational example of micro-frontend patterns, but production deployments should consider newer Module Federation versions or alternative solutions. See [Known Issues](#known-issues) for details.

## 📋 Table of Contents

- [Overview](#overview)
- [Known Issues](#known-issues)
- [Architecture](#architecture)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Applications](#applications)
- [Module Federation](#module-federation)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

This project demonstrates a complete micro-frontend setup with three independent Next.js applications:

1. **Host Application** (Port 3000) - Main container that loads remote applications
2. **Dashboard Remote** (Port 3001) - Analytics and metrics micro-app
3. **Settings Remote** (Port 3002) - Configuration and preferences micro-app

All applications share a common UI component library and use Webpack 5 Module Federation for runtime integration.

## ⚠️ Known Issues

### React Context SSR Compatibility

**Issue**: The application may encounter React context/hook errors during development with Server-Side Rendering (SSR) enabled. This is a known limitation of `@module-federation/nextjs-mf` v8.x with Next.js Pages Router.

**Error**: `TypeError: Cannot read properties of null (reading 'useContext')`

**Workarounds**:

1. **Development Mode** (Currently Most Reliable):
   ```bash
   # Run in development mode
   pnpm dev
   ```
   While development mode has SSR context issues, it currently works better than production builds which encounter webpack plugin errors.

2. **Docker Deployment** (May encounter build issues):
   ```bash
   docker-compose up
   ```
   The Docker setup uses production builds which typically work correctly.

3. **Disable SSR for Affected Components**:
   The Navigation component has been configured to handle SSR gracefully, but if you encounter issues with other components, wrap them with `dynamic` import:
   ```typescript
   import dynamic from 'next/dynamic';
   
   const MyComponent = dynamic(() => import('./MyComponent'), {
     ssr: false
   });
   ```

4. **Client-Side Only Testing**:
   Access the standalone applications directly:
   - Dashboard: http://localhost:3001
   - Settings: http://localhost:3002

**Root Cause**: Module Federation's runtime dependency sharing conflicts with Next.js SSR's React context during development hot reloading. Additionally, production builds may encounter webpack plugin errors (`_resolveContext_stack.delete is not a function`) due to compatibility issues between `@module-federation/nextjs-mf@8.x` and Next.js 14.2.35.

**Status**: The codebase demonstrates micro-frontend architecture patterns. The Module Federation plugin version used (`@module-federation/nextjs-mf@8.x`) has known compatibility issues with Next.js 14+ SSR. Consider upgrading to `@module-federation/nextjs-mf@9.x` or newer versions when they become stable, or use alternative micro-frontend solutions for production deployments.

For detailed debugging information, see [DEBUGGING_LOG.md](./DEBUGGING_LOG.md).

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                  Host Application                    │
│                    (Port 3000)                       │
│                                                      │
│  ┌────────────────────┐  ┌────────────────────┐   │
│  │  Dashboard Remote  │  │  Settings Remote   │   │
│  │    (Port 3001)     │  │    (Port 3002)     │   │
│  │                    │  │                    │   │
│  │  • Stats Widget    │  │  • Profile Form    │   │
│  │  • Chart Widget    │  │  • Preferences     │   │
│  │  • Activity Widget │  │  • Security Form   │   │
│  └────────────────────┘  └────────────────────┘   │
│                                                      │
│              Shared UI Library                       │
│        (Button, Card, Input, Container)             │
└─────────────────────────────────────────────────────┘
```

## ✨ Features

### Core Features
- **Runtime Integration**: Remote applications load dynamically at runtime
- **Independent Deployment**: Each micro-app can be deployed separately
- **Shared Dependencies**: React shared as singleton to avoid duplication
- **Type Safety**: Full TypeScript support across all applications
- **Hot Reloading**: Changes reflect immediately during development
- **Error Isolation**: Remote failures don't crash the host application
- **Lazy Loading**: Remotes load on-demand for optimal performance
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### UI Features
- Modern, clean interface built entirely with Tailwind CSS utility classes
- Comprehensive dashboard with statistics, charts, and activity feed
- Complete settings forms (Profile, Preferences, Security)
- Error boundaries with friendly fallback UI
- Loading states with skeleton screens
- Interactive components (toggles, selects, forms)

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 14 (App Router) |
| **Module Federation** | @module-federation/nextjs-mf |
| **Styling** | Tailwind CSS (utility classes only) |
| **Language** | TypeScript |
| **Package Manager** | pnpm (monorepo) |
| **Build Tool** | Webpack 5 |

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18
- pnpm >= 8
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/saivinaychintala/micro-frontend-demo.git
cd micro-frontend-demo

# Install dependencies
pnpm install
```

### Running the Application

**Option 1: Development Mode (Recommended)**

```bash
# Start all applications concurrently
pnpm dev

# Or start individually
pnpm dev:host      # http://localhost:3000
pnpm dev:dashboard # http://localhost:3001
pnpm dev:settings  # http://localhost:3002
```

> **Note**: Development mode has known SSR context issues but is currently more stable than production builds. See the [Known Issues](#known-issues) section for details.

**Option 2: Production Mode** (Currently experiencing build issues)

```bash
# Build all applications
pnpm build

# If build succeeds, start applications
pnpm start
```

**Option 3: Docker** (May encounter build issues)

```bash
# Build and run with Docker Compose
docker-compose up

# Access at http://localhost:3000
```

### Access the Applications

- **Host Application**: http://localhost:3000
- **Dashboard (Standalone)**: http://localhost:3001
- **Settings (Standalone)**: http://localhost:3002

The host application will load Dashboard and Settings as remote modules at runtime.

## 📁 Project Structure

```
micro-frontend-demo/
├── apps/
│   ├── host/                 # Host container application
│   │   ├── src/
│   │   │   ├── app/         # Next.js pages
│   │   │   ├── components/  # Navigation, ErrorBoundary
│   │   │   └── remotes/     # Remote loading wrappers
│   │   ├── next.config.js   # Module Federation config
│   │   └── package.json
│   │
│   ├── dashboard/           # Dashboard remote
│   │   ├── src/
│   │   │   ├── app/
│   │   │   └── widgets/     # StatsWidget, ChartWidget, ActivityWidget
│   │   ├── next.config.js   # Exposes widgets
│   │   └── package.json
│   │
│   └── settings/            # Settings remote
│       ├── src/
│       │   ├── app/
│       │   └── forms/       # ProfileForm, PreferencesForm, SecurityForm
│       ├── next.config.js   # Exposes forms
│       └── package.json
│
├── packages/
│   └── ui/                  # Shared UI component library
│       ├── src/
│       │   ├── Button.tsx
│       │   ├── Card.tsx
│       │   ├── Input.tsx
│       │   ├── Container.tsx
│       │   └── index.ts
│       └── package.json
│
├── package.json             # Root workspace config
├── pnpm-workspace.yaml      # pnpm workspace definition
├── docker-compose.yml       # Docker setup
├── tsconfig.json            # Shared TypeScript config
└── README.md
```

## 📱 Applications

### Host Application

The main container that:
- Provides navigation shell with sidebar
- Loads remote applications dynamically
- Handles routing between micro-apps
- Implements error boundaries
- Manages shared state (if needed)

**Module Federation Config:**
```javascript
remotes: {
  dashboard: 'dashboard@http://localhost:3001/_next/static/.../remoteEntry.js',
  settings: 'settings@http://localhost:3002/_next/static/.../remoteEntry.js',
}
```

### Dashboard Remote

Independent micro-app that exposes:
- **StatsWidget**: Key metrics cards (Users, Revenue, Sessions, Conversion)
- **ChartWidget**: Revenue growth bar chart
- **ActivityWidget**: Recent activity feed

**Module Federation Config:**
```javascript
exposes: {
  './StatsWidget': './src/widgets/StatsWidget',
  './ChartWidget': './src/widgets/ChartWidget',
  './ActivityWidget': './src/widgets/ActivityWidget',
}
```

### Settings Remote

Independent micro-app that exposes:
- **ProfileForm**: User profile settings (name, email, bio, avatar)
- **PreferencesForm**: App preferences (theme, language, timezone, notifications)
- **SecurityForm**: Security settings (password, 2FA, active sessions)

**Module Federation Config:**
```javascript
exposes: {
  './ProfileForm': './src/forms/ProfileForm',
  './PreferencesForm': './src/forms/PreferencesForm',
  './SecurityForm': './src/forms/SecurityForm',
}
```

### Shared UI Library

Common components used across all applications:
- **Button**: Multiple variants (primary, secondary, outline, danger)
- **Card**: With Header, Body, Footer sub-components
- **Input**: With label, error states, and helper text
- **Container**: Responsive container with max-width options

All components use Tailwind CSS utility classes exclusively.

## 🔌 Module Federation

### How It Works

1. **Remote Entry**: Each remote app generates a `remoteEntry.js` file
2. **Dynamic Loading**: Host loads remotes at runtime using dynamic imports
3. **Shared Dependencies**: React is shared as a singleton to avoid duplication
4. **Code Splitting**: Each remote loads only when needed
5. **Independent Versioning**: Remotes can be updated independently

### Key Configuration

**Host (Consumer):**
```javascript
remotes: {
  dashboard: 'dashboard@http://localhost:3001/...',
  settings: 'settings@http://localhost:3002/...',
}
```

**Remote (Provider):**
```javascript
exposes: {
  './ComponentName': './src/path/to/Component',
}
```

**Shared Dependencies:**
```javascript
shared: {
  react: { singleton: true, requiredVersion: false },
  'react-dom': { singleton: true, requiredVersion: false },
}
```

## 💻 Development

### Available Scripts

```bash
# Development
pnpm dev              # Run all apps concurrently
pnpm dev:host         # Run host only
pnpm dev:dashboard    # Run dashboard only
pnpm dev:settings     # Run settings only

# Build
pnpm build            # Build all apps
pnpm build:host       # Build host only
pnpm build:dashboard  # Build dashboard only
pnpm build:settings   # Build settings only

# Linting & Type Checking
pnpm lint             # Lint all apps
pnpm type-check       # Type check all apps

# Cleanup
pnpm clean            # Clean all build artifacts and node_modules
```

### Development Workflow

1. Start all applications: `pnpm dev`
2. Make changes in any app
3. Changes hot-reload automatically
4. Test in browser at http://localhost:3000

### Styling Guidelines

This project uses **Tailwind CSS exclusively** with no custom CSS files:

- Use utility classes for all styling
- Compose utilities for complex components
- Use responsive prefixes: `md:`, `lg:`
- Colors from Tailwind's palette
- No `.css` or `.scss` files (only `globals.css` with Tailwind imports)

## 🚢 Deployment

### Production Build

```bash
# Build all applications
pnpm build

# Start production servers
pnpm --filter host start      # Port 3000
pnpm --filter dashboard start # Port 3001
pnpm --filter settings start  # Port 3002
```

### Docker Deployment

```bash
# Build and run all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Cloud Deployment

**Recommended Strategy:**

1. **Host**: Deploy to Vercel/Netlify
   ```bash
   cd apps/host
   vercel --prod
   ```

2. **Dashboard**: Deploy separately
   ```bash
   cd apps/dashboard
   vercel --prod
   ```

3. **Settings**: Deploy separately
   ```bash
   cd apps/settings
   vercel --prod
   ```

4. **Update Environment Variables**: Point host to production remote URLs
   ```env
   NEXT_PUBLIC_DASHBOARD_URL=https://dashboard.yourdomain.com
   NEXT_PUBLIC_SETTINGS_URL=https://settings.yourdomain.com
   ```

### Environment Variables

**Host Application:**
```env
NEXT_PUBLIC_DASHBOARD_URL=http://localhost:3001
NEXT_PUBLIC_SETTINGS_URL=http://localhost:3002
NODE_ENV=production
```

## 🧪 Testing

Each application can be tested independently:

```bash
# Test host loading remotes
curl http://localhost:3000

# Test dashboard standalone
curl http://localhost:3001

# Test settings standalone
curl http://localhost:3002
```

## 📚 Learn More

### Resources

- [Module Federation Documentation](https://webpack.js.org/concepts/module-federation/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [pnpm Workspaces](https://pnpm.io/workspaces)

### Key Concepts

1. **Micro-Frontends**: Breaking down frontends into smaller, independent applications
2. **Module Federation**: Webpack 5 plugin for runtime code sharing
3. **Monorepo**: Managing multiple packages in a single repository
4. **Independent Deployment**: Deploy apps separately without affecting others
5. **Shared Dependencies**: Avoid duplication by sharing libraries

## 🤝 Contributing

This is a portfolio project, but contributions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

MIT License - see LICENSE file for details

## 👤 Author

**Vinay Chintala**

- GitHub: [@saivinaychintala](https://github.com/saivinaychintala)
- LinkedIn: [Vinay Chintala](https://www.linkedin.com/in/vinay-chintala)
- Email: vinay.schintala@gmail.com

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Webpack team for Module Federation
- Tailwind CSS for the utility-first approach
- Open source community for inspiration

---

**Built with ❤️ to demonstrate modern micro-frontend architecture**

⭐ Star this repo if you find it helpful!
