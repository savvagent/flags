# Savvagent Flags Next.js Example

Example Next.js application demonstrating how to use the Savvagent Flags SDK with React Server Components and Client Components.

## Features

- Next.js 14 with App Router
- TypeScript
- Client-side feature flag evaluation
- Real-time updates (optional)
- Tailwind CSS styling

## Setup

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local`:
   ```bash
   NEXT_PUBLIC_SAVVAGENT_FLAGS_API_URL=http://localhost:8080
   NEXT_PUBLIC_SAVVAGENT_FLAGS_SDK_KEY=your-sdk-key-here
   ```

3. **Run the development server:**
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

## Usage

### Client Component Example

```typescript
'use client';

import { SavvagentFlagsClient } from '@savvagent/flags-sdk';
import { useEffect, useState } from 'react';

export default function MyComponent() {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const client = new SavvagentFlagsClient({
      apiUrl: process.env.NEXT_PUBLIC_SAVVAGENT_FLAGS_API_URL!,
      sdkKey: process.env.NEXT_PUBLIC_SAVVAGENT_FLAGS_SDK_KEY!,
    });

    client.isEnabled('new-feature', { userId: 'user-123' })
      .then(setIsEnabled);
  }, []);

  return isEnabled ? <NewFeature /> : <OldFeature />;
}
```

### Custom Hook

See `app/hooks/useFeatureFlag.ts` for a reusable hook.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Savvagent Flags SDK Documentation](../../packages/typescript/README.md)
- [SDK Integration Guide](../../docs/SDK-INTEGRATION.md)
