# Savvagent Flags Astro Example

Example Astro application demonstrating how to use the Savvagent Flags Astro integration.

## Features

- Astro with server-side rendering
- TypeScript
- Savvagent Flags Astro integration
- Server-side feature flag evaluation
- Static site generation support

## Setup

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```

   Edit `.env`:
   ```bash
   SAVVAGENT_FLAGS_API_URL=http://localhost:8080
   SAVVAGENT_FLAGS_SDK_KEY=your-sdk-key-here
   ```

3. **Run the development server:**
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:4321](http://localhost:4321)

## Usage

### Configuration

```typescript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import savvagentFlags from '@savvagent/flags-astro';

export default defineConfig({
  integrations: [
    savvagentFlags({
      apiUrl: process.env.SAVVAGENT_FLAGS_API_URL,
      sdkKey: process.env.SAVVAGENT_FLAGS_SDK_KEY,
    }),
  ],
});
```

### Using in Pages

```astro
---
const isEnabled = await Astro.locals.savvagentFlags.isEnabled('new-feature', {
  userId: 'user-123',
  attributes: {
    email: 'user@example.com',
  },
});
---

{isEnabled ? (
  <NewFeature />
) : (
  <OldFeature />
)}
```

## Learn More

- [Astro Documentation](https://docs.astro.build/)
- [Savvagent Flags Astro SDK Documentation](../../packages/astro/README.md)
- [SDK Integration Guide](../../docs/SDK-INTEGRATION.md)
