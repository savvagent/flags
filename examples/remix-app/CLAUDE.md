# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a Remix example application demonstrating the integration of the Savvagent Flags SDK for feature flag management. It's part of a larger monorepo (`savvagent-flags`) managed with pnpm workspaces.

## Development Commands

```bash
# Install dependencies (from monorepo root or this directory)
pnpm install

# Start development server (runs on port 5177)
pnpm dev

# Build for production
pnpm build

# Run production build
pnpm start

# Type checking
pnpm typecheck
```

## Environment Configuration

Required environment variables in `.env`:
- `SAVVAGENT_FLAGS_API_URL`: API endpoint (default: http://localhost:8080)
- `SAVVAGENT_FLAGS_SDK_KEY`: SDK authentication key

Copy `.env.example` to `.env` and configure before running.

## Architecture

### Workspace Dependencies
This example depends on workspace packages:
- `@savvagent/flags-remix`: Remix-specific SDK utilities (workspace:*)
- `@savvagent/flags-sdk`: Core Savvagent Flags SDK (workspace:*)

Changes to these packages require rebuilding or restarting the dev server.

### Savvagent Flags Integration Pattern
The application uses a server-side feature flag evaluation pattern:

1. **Loader Setup**: Create a `savvagentFlagsLoader` instance in route loaders using `createSavvagentFlagsLoader()` with API configuration
2. **Server Evaluation**: Feature flags are evaluated server-side in Remix loaders using `savvagentFlags.isEnabled()`
3. **Client Hydration**: Feature flag states are returned via `json()` and consumed in components via `useLoaderData()`

See `app/routes/_index.tsx:6-30` for the canonical implementation pattern.

### File Structure
- `app/root.tsx`: Root layout with stylesheet import
- `app/routes/_index.tsx`: Main route demonstrating Savvagent Flags loader usage
- `app/styles.css`: Global styles
- `vite.config.ts`: Vite configuration with dev server on port 5177

### TypeScript Configuration
- Path alias `~/*` maps to `./app/*`
- Strict mode enabled
- Uses Remix v2 with Vite plugin
