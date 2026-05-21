# 🚀 Quick Start Guide

Get up and running with the Micro-Frontend Demo in 5 minutes!

## Prerequisites Check

Before starting, verify you have:

```bash
# Check Node.js (needs >= 18)
node --version

# Check pnpm (needs >= 8)
pnpm --version

# If pnpm is not installed:
npm install -g pnpm
```

## Step 1: Clone & Install

```bash
# Clone the repository
git clone https://github.com/saivinaychintala/micro-frontend-demo.git
cd micro-frontend-demo

# Install all dependencies (takes ~15 seconds)
pnpm install
```

## Step 2: Start Development Servers

```bash
# Start all 3 applications at once
pnpm dev
```

This command starts:
- Host app on http://localhost:3000
- Dashboard app on http://localhost:3001
- Settings app on http://localhost:3002

## Step 3: Open in Browser

Visit **http://localhost:3000** to see the host application!

You'll see:
- ✅ Home page explaining the architecture
- ✅ Sidebar navigation (Home, Dashboard, Settings)
- ✅ Click "Dashboard" to see remote micro-app loading
- ✅ Click "Settings" to see another remote micro-app

## What You're Seeing

### Host Application (Port 3000)
The main container with navigation that loads remote apps dynamically.

### Dashboard Remote (Port 3001)
Try visiting http://localhost:3001 directly - it's a standalone app!
- Stats cards (users, revenue, sessions, conversion)
- Revenue growth chart
- Recent activity feed

### Settings Remote (Port 3002)
Also try http://localhost:3002 - another standalone app!
- Profile settings form
- Preferences (theme, language, notifications)
- Security settings (password, 2FA)

## Making Changes

### Edit a Component

Try editing any file and see hot reload:

```bash
# Edit a dashboard widget
nano apps/dashboard/src/widgets/StatsWidget.tsx

# Edit host navigation
nano apps/host/src/components/Navigation.tsx

# Edit shared UI button
nano packages/ui/src/Button.tsx
```

Changes appear instantly in the browser!

## Common Commands

```bash
# Start everything
pnpm dev

# Start individual apps
pnpm dev:host
pnpm dev:dashboard
pnpm dev:settings

# Build for production
pnpm build

# Lint code
pnpm lint

# Type check
pnpm type-check

# Clean everything
pnpm clean
```

## Project Structure at a Glance

```
micro-frontend-demo/
├── apps/
│   ├── host/         → Main container (Port 3000)
│   ├── dashboard/    → Dashboard remote (Port 3001)
│   └── settings/     → Settings remote (Port 3002)
├── packages/
│   └── ui/           → Shared components
└── package.json      → Root workspace
```

## Testing Module Federation

### 1. Stop Dashboard

```bash
# In a new terminal, find and kill dashboard process
lsof -ti:3001 | xargs kill
```

Now visit http://localhost:3000/dashboard - you'll see an error boundary!
The host doesn't crash, it shows a friendly error message.

### 2. Restart Dashboard

```bash
pnpm dev:dashboard
```

Refresh the page - dashboard loads again! This demonstrates:
- Error isolation
- Graceful failure handling
- Independent deployment

## Next Steps

1. **Explore the Code**
   - Check `apps/host/next.config.js` for Module Federation setup
   - Look at `apps/dashboard/src/widgets/` for exposed components
   - See `packages/ui/src/` for shared components

2. **Read Documentation**
   - `README.md` - Full project documentation
   - `ARCHITECTURE.md` - Deep dive into Module Federation

3. **Make It Yours**
   - Add a new remote application
   - Create new shared components
   - Customize the styling

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000, 3001, or 3002
lsof -ti:3000 | xargs kill
lsof -ti:3001 | xargs kill
lsof -ti:3002 | xargs kill
```

### Module Not Found Error

```bash
# Reinstall dependencies
pnpm clean
pnpm install
```

### TypeScript Errors

```bash
# Rebuild TypeScript
pnpm type-check
```

### Remote Not Loading

Make sure all 3 apps are running:
```bash
# Check running processes
lsof -i:3000
lsof -i:3001
lsof -i:3002
```

## Quick Tips

1. **Use concurrently**: The `pnpm dev` command runs all apps at once
2. **Standalone testing**: Each app can run independently
3. **Hot reload**: No need to restart after changes
4. **Error boundaries**: Host won't crash if a remote fails
5. **Tailwind only**: No custom CSS files, just utilities

## Development Workflow

```
1. Start all apps → pnpm dev
2. Make changes → Auto hot reload
3. Test in browser → http://localhost:3000
4. Build production → pnpm build
5. Deploy → Independent deployments for each app
```

## Getting Help

- **Issues**: Open an issue on GitHub
- **Questions**: Check README.md
- **Architecture**: Read ARCHITECTURE.md

---

**You're all set! Start exploring the micro-frontend architecture! 🎉**
