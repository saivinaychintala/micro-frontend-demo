# 🏗️ Architecture Documentation

Deep dive into the micro-frontend architecture, Module Federation setup, and design decisions.

## Table of Contents

- [Overview](#overview)
- [Micro-Frontend Architecture](#micro-frontend-architecture)
- [Module Federation](#module-federation)
- [Application Structure](#application-structure)
- [Data Flow](#data-flow)
- [Styling Strategy](#styling-strategy)
- [Build & Deployment](#build--deployment)
- [Best Practices](#best-practices)

## Overview

This project implements a **Micro-Frontend architecture** using Webpack 5's Module Federation plugin with Next.js. The system consists of three independent applications that work together seamlessly at runtime.

### Why Micro-Frontends?

**Benefits:**
- Independent development and deployment
- Technology agnosticism (different frameworks possible)
- Team autonomy
- Incremental upgrades
- Fault isolation
- Scalability

**Trade-offs:**
- Increased complexity
- Bundle size considerations
- Cross-app communication complexity
- Shared dependency management

## Micro-Frontend Architecture

### Component Hierarchy

```
┌───────────────────────────────────────────────────────────┐
│                    Host Application                        │
│                     (Container)                            │
│  ┌─────────────────────────────────────────────────────┐  │
│  │              Navigation Shell                        │  │
│  │  - Sidebar with routing                             │  │
│  │  - Error boundaries                                 │  │
│  │  - Layout structure                                 │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                            │
│  ┌──────────────────────┐  ┌──────────────────────┐      │
│  │  Dashboard Remote    │  │  Settings Remote     │      │
│  │                      │  │                      │      │
│  │  Exposed:            │  │  Exposed:            │      │
│  │  - StatsWidget       │  │  - ProfileForm       │      │
│  │  - ChartWidget       │  │  - PreferencesForm   │      │
│  │  - ActivityWidget    │  │  - SecurityForm      │      │
│  │                      │  │                      │      │
│  │  Standalone: ✅      │  │  Standalone: ✅      │      │
│  │  Port: 3001          │  │  Port: 3002          │      │
│  └──────────────────────┘  └──────────────────────┘      │
│                                                            │
│                 ▼                          ▼               │
│            Consumes                   Consumes            │
│                 │                          │               │
│                 └──────────┬───────────────┘               │
│                            │                               │
│                 ┌──────────▼─────────┐                     │
│                 │   Shared UI Lib    │                     │
│                 │                    │                     │
│                 │  - Button          │                     │
│                 │  - Card            │                     │
│                 │  - Input           │                     │
│                 │  - Container       │                     │
│                 └────────────────────┘                     │
└───────────────────────────────────────────────────────────┘
```

### Application Roles

**Host (Container):**
- Provides shell and navigation
- Loads remote applications dynamically
- Manages routing between micro-apps
- Handles global error boundaries
- Defines shared layout

**Remote Applications:**
- Standalone, independent applications
- Expose specific components via Module Federation
- Can be developed and deployed independently
- Have their own routes when run standalone
- Share dependencies with host

**Shared Library:**
- Common UI components
- Used by all applications
- Single source of truth for design system
- Versioned independently

## Module Federation

### How It Works

Module Federation is a Webpack 5 plugin that enables:

1. **Code Sharing at Runtime**: Share code between applications without build-time bundling
2. **Dynamic Remote Loading**: Load remote modules on-demand
3. **Shared Dependencies**: Avoid duplicating common libraries
4. **Independent Builds**: Each app builds separately

### Configuration Breakdown

#### Host Configuration

```javascript
// apps/host/next.config.js
new NextFederationPlugin({
  name: 'host',                    // Unique application name
  filename: 'static/chunks/remoteEntry.js',
  
  // Remote applications to consume
  remotes: {
    dashboard: 'dashboard@http://localhost:3001/_next/static/chunks/remoteEntry.js',
    settings: 'settings@http://localhost:3002/_next/static/chunks/remoteEntry.js',
  },
  
  // Shared dependencies
  shared: {
    react: { singleton: true, requiredVersion: false },
    'react-dom': { singleton: true, requiredVersion: false },
  },
})
```

**Key Points:**
- `name`: Unique identifier for this application
- `remotes`: Map of remote applications to consume
- `shared`: Dependencies shared between apps
- `singleton`: Ensures only one version of React loads

#### Remote Configuration (Dashboard)

```javascript
// apps/dashboard/next.config.js
new NextFederationPlugin({
  name: 'dashboard',
  filename: 'static/chunks/remoteEntry.js',
  
  // Components exposed to other applications
  exposes: {
    './StatsWidget': './src/widgets/StatsWidget',
    './ChartWidget': './src/widgets/ChartWidget',
    './ActivityWidget': './src/widgets/ActivityWidget',
  },
  
  // Same shared dependencies
  shared: {
    react: { singleton: true, requiredVersion: false },
    'react-dom': { singleton: true, requiredVersion: false },
  },
})
```

**Key Points:**
- `exposes`: Components available to other apps
- Key = Import path used by consumers
- Value = Actual file path in this app
- Must share same React version with host

### Loading Remote Components

In the host application:

```typescript
// apps/host/src/remotes/DashboardRemote.tsx
import React, { Suspense } from 'react';

// Dynamic import of remote component
const StatsWidget = React.lazy(() => import('dashboard/StatsWidget'));

export function DashboardRemote() {
  return (
    <Suspense fallback={<Loading />}>
      <StatsWidget />
    </Suspense>
  );
}
```

**Process:**
1. `import('dashboard/StatsWidget')` triggers Module Federation
2. Webpack resolves 'dashboard' from remotes config
3. Fetches remoteEntry.js from dashboard app
4. Loads required chunks
5. Returns the component

### Shared Dependencies

```javascript
shared: {
  react: {
    singleton: true,        // Only one version across all apps
    requiredVersion: false, // Don't enforce specific version
    eager: false,           // Load on-demand, not upfront
  },
}
```

**Why Share?**
- Avoid loading React multiple times
- Reduce bundle size
- Ensure single React instance for context/state

**Singleton Mode:**
- All apps use the same React instance
- Prevents version conflicts
- Critical for React Context API

## Application Structure

### Monorepo Layout

```
micro-frontend-demo/
├── apps/                   # Applications
│   ├── host/              # Port 3000
│   ├── dashboard/         # Port 3001
│   └── settings/          # Port 3002
├── packages/              # Shared packages
│   └── ui/               # Component library
├── package.json          # Root workspace
└── pnpm-workspace.yaml   # Workspace config
```

### Why Monorepo?

**Pros:**
- Single repository for all code
- Shared tooling and configuration
- Easier cross-app refactoring
- Consistent dependencies

**Cons:**
- Larger repository size
- Need workspace tooling (pnpm)

### Workspace Configuration

```yaml
# pnpm-workspace.yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

This enables:
- Shared dependencies
- Cross-package imports
- Unified scripts

## Data Flow

### Component Communication

```
┌────────────┐
│    Host    │
│  (Router)  │
└─────┬──────┘
      │
      ├─────► URL Changes
      │
      ▼
┌──────────────┐
│   Remote     │
│  Component   │
└──────────────┘
```

**Communication Methods:**

1. **URL/Routing**: Primary method
   - Host manages routes
   - Remotes render based on route

2. **Props Passing**: Simple data
   ```typescript
   <RemoteComponent data={data} />
   ```

3. **Shared State** (if needed):
   - Context API
   - Custom events
   - Shared state library

4. **Events**: Custom events
   ```typescript
   window.dispatchEvent(new CustomEvent('app:event', { detail }));
   ```

### Error Handling

```
┌────────────────┐
│  Error         │
│  Boundary      │
└────────┬───────┘
         │
         ├──► Remote Load Failed
         │      ↓
         │    Show Fallback UI
         │
         ├──► Remote Crashed
         │      ↓
         │    Isolate Error
         │
         └──► Host Continues Working
```

## Styling Strategy

### Tailwind CSS Only

**Approach:**
- No custom CSS files
- Pure utility classes
- Component composition

**Example:**
```typescript
export const Button = ({ variant }) => {
  const base = 'px-4 py-2 rounded-lg font-medium transition-colors';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
  };
  
  return (
    <button className={`${base} ${variants[variant]}`}>
      Click Me
    </button>
  );
};
```

**Benefits:**
- Consistent styling
- No CSS conflicts
- Fast development
- Smaller bundles

**Shared Tailwind Config:**
```javascript
// packages/ui/tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: { /* custom colors */ },
      },
    },
  },
};
```

All apps extend this base configuration.

## Build & Deployment

### Build Process

```
┌────────────────────────────────────────────┐
│  Build Process                             │
│                                            │
│  1. Install Dependencies (pnpm install)    │
│  2. Build Shared UI Package               │
│  3. Build Remote Apps (parallel)          │
│  4. Build Host App                        │
│  5. Generate remoteEntry.js files         │
└────────────────────────────────────────────┘
```

### Deployment Strategy

#### Option 1: Same Domain

```
https://myapp.com           → Host
https://myapp.com/dashboard → Dashboard remote
https://myapp.com/settings  → Settings remote
```

**Pros:**
- Simple routing
- No CORS issues
- Single SSL certificate

**Cons:**
- Tied together
- Not truly independent

#### Option 2: Separate Domains (Recommended)

```
https://main.myapp.com      → Host
https://dashboard.myapp.com → Dashboard
https://settings.myapp.com  → Settings
```

**Pros:**
- True independence
- Separate deployments
- Team autonomy

**Cons:**
- CORS configuration needed
- Multiple SSL certificates
- More complex routing

### CI/CD Pipeline

```
┌─────────────────────────────────────────────────────┐
│  Push to Git                                        │
└────────────────┬────────────────────────────────────┘
                 │
     ┌───────────┴────────────┬─────────────────┐
     │                        │                 │
     ▼                        ▼                 ▼
┌─────────┐            ┌──────────┐      ┌──────────┐
│  Host   │            │Dashboard │      │Settings  │
│  Build  │            │  Build   │      │  Build   │
└────┬────┘            └────┬─────┘      └────┬─────┘
     │                      │                   │
     ▼                      ▼                   ▼
┌─────────┐            ┌──────────┐      ┌──────────┐
│ Deploy  │            │ Deploy   │      │ Deploy   │
│ Vercel  │            │ Vercel   │      │ Vercel   │
└─────────┘            └──────────┘      └──────────┘
```

Each app has independent pipeline.

## Best Practices

### Module Federation

1. **Version Shared Dependencies**: Use singleton for React
2. **Expose Granularly**: Expose specific components, not entire apps
3. **Error Boundaries**: Wrap remote loads
4. **Loading States**: Always provide fallbacks
5. **Type Safety**: Share types between apps

### Styling

1. **Use Utility Classes**: No custom CSS
2. **Shared Config**: Extend base Tailwind config
3. **Component Composition**: Build complex UIs from simple utilities
4. **Responsive First**: Mobile-first approach

### Performance

1. **Lazy Loading**: Use React.lazy for remotes
2. **Code Splitting**: Leverage Webpack's code splitting
3. **Caching**: Configure proper cache headers
4. **Bundle Size**: Monitor with webpack-bundle-analyzer

### Development

1. **Run All Apps**: Use `pnpm dev` for best experience
2. **Hot Reload**: Take advantage of fast refresh
3. **Type Checking**: Run `pnpm type-check` regularly
4. **Linting**: Enforce code quality with ESLint

### Testing

1. **Standalone Testing**: Test each app independently
2. **Integration Testing**: Test host with remotes
3. **Error Scenarios**: Test remote failures
4. **Performance Testing**: Monitor load times

## Conclusion

This architecture provides:
- ✅ Independence: Apps develop and deploy separately
- ✅ Scalability: Easy to add new remotes
- ✅ Maintainability: Clear boundaries and contracts
- ✅ Performance: Efficient code sharing
- ✅ Developer Experience: Fast development workflow

---

**Questions? Check the README or open an issue on GitHub!**
