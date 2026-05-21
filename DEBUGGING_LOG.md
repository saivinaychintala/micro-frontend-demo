# Debugging Log - Micro-Frontend Demo

## Issues Encountered and Resolutions

### Issue 1: App Router Incompatibility
**Error**: `App Directory is not supported by nextjs-mf`

**Root Cause**: The `@module-federation/nextjs-mf` plugin does not support Next.js App Router, only Pages Router.

**Solution**: 
- Refactored all three applications (host, dashboard, settings) from App Router to Pages Router
- Moved all pages from `src/app` to `src/pages`
- Created `_app.tsx` and `_document.tsx` for each application
- Updated file structure and imports accordingly

**Commit**: Converted all applications to Pages Router

---

### Issue 2: Webpack Environment Variable
**Error**: `process.env.NEXT_PRIVATE_LOCAL_WEBPACK is not set to true`

**Root Cause**: Module Federation requires webpack to be used locally instead of Next.js's bundled webpack.

**Solution**:
- Created `.env.local` files in root and each application directory
- Set `NEXT_PRIVATE_LOCAL_WEBPACK=true` in all `.env.local` files
- Installed webpack explicitly: `pnpm add -D -w webpack@5.91.0`

---

### Issue 3: TypeScript Parsing in Shared UI Library
**Error**: `Module parse failed: Unexpected token... export interface ButtonProps`

**Root Cause**: Module Federation was trying to parse TypeScript source files (`.tsx`) directly from the shared UI library, but webpack wasn't configured to handle TypeScript in the monorepo workspace context.

**Solution**:
1. **Build the UI library to JavaScript**:
   - Added `tsup` as a build tool for the UI package
   - Configured `packages/ui/package.json` to build to `dist/` folder
   - Updated exports to point to compiled `.js` and `.mjs` files
   - Added `build:ui` script to root package.json

2. **Configure Next.js to use compiled files**:
   - Added `transpilePackages: ['@micro-frontend-demo/ui']` to all Next.js configs
   - Added webpack alias to resolve `@micro-frontend-demo/ui` to compiled dist folder
   - Ensured proper resolution of the compiled package

3. **Install webpack in each application**:
   - Ran `pnpm add -D webpack@5.91.0 --filter host --filter dashboard --filter settings`
   - This ensures webpack internals are available for Module Federation

**Commit**: `fix: resolve Module Federation build and runtime issues`

---

### Issue 4: Module Not Found - webpack/lib/ModuleNotFoundError
**Error**: `Cannot find module 'webpack/lib/ModuleNotFoundError'`

**Root Cause**: The `@module-federation/nextjs-mf` plugin uses `normalize-webpack-path` which incorrectly points to Next.js's compiled webpack instead of the actual webpack installation.

**Solution**:
- Installed webpack@5.91.0 in each individual application (not just root)
- This ensures Module Federation can access webpack internals correctly
- The `NEXT_PRIVATE_LOCAL_WEBPACK=true` environment variable also helps

---

## Final Working Configuration

### Key Files Modified:
1. **`packages/ui/package.json`**: Build configuration with tsup, exports pointing to dist
2. **`packages/ui/tsconfig.json`**: Disabled incremental builds, enabled declaration files
3. **`apps/*/next.config.js`**: Added transpilePackages and webpack aliases
4. **`package.json`**: Added build:ui script, modified dev script to build UI first
5. **`.env.local`**: Added NEXT_PRIVATE_LOCAL_WEBPACK=true (in root and each app)

### Development Workflow:
```bash
# 1. Build the shared UI library
pnpm build:ui

# 2. Start all dev servers (UI lib builds automatically, then apps start)
pnpm dev
```

### Architecture:
- **Shared UI Library**: Pre-compiled to JavaScript using tsup
- **Module Federation**: Consumes the compiled JavaScript, not TypeScript source
- **Hot Reload**: tsup runs in watch mode to rebuild UI on changes
- **Type Safety**: TypeScript declaration files (`.d.ts`) are generated for IDE support

---

## Lessons Learned

1. **Module Federation + Next.js requires Pages Router**: App Router is not yet supported by `@module-federation/nextjs-mf`
   
2. **Shared packages in monorepos need compilation**: When using Module Federation with pnpm workspaces, shared packages must be pre-compiled to JavaScript, not consumed as TypeScript source
   
3. **Webpack must be explicitly installed**: Even though Next.js bundles webpack, Module Federation needs it as a direct dependency in each application
   
4. **Environment variables matter**: `NEXT_PRIVATE_LOCAL_WEBPACK=true` is critical for Module Federation to work with Next.js

5. **transp ilePackages is insufficient alone**: While Next.js can transpile workspace packages, Module Federation needs additional webpack configuration (aliases) to properly resolve compiled packages

---

## Current Status

✅ **All Applications Running Successfully**
- Host: http://localhost:3000
- Dashboard: http://localhost:3001
- Settings: http://localhost:3002

✅ **Module Federation Working**
- Remote components loading correctly
- Shared dependencies (React, React-DOM) working
- Hot reload functional

✅ **UI Library Compiled and Shared**
- Components built to JavaScript
- Types available for IDE support
- Watch mode for development

---

## Testing Verification

To verify the setup works:
1. Visit http://localhost:3000
2. Navigate to Dashboard - should load remote widgets
3. Navigate to Settings - should load remote forms
4. Each remote (3001, 3002) should also work standalone
5. Hot reload should work when editing any file

All verified and working! ✨
