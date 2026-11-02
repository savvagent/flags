# @savvagent/flags-sveltekit

SvelteKit SDK for Savvagent Flags with server-side load functions and client-side stores.

## Installation

```bash
npm install @savvagent/flags-sveltekit
```

## Quick Start

### Server-Side (Load Functions)

```ts
// src/hooks.server.ts
import { initSvelteKitServer } from '@savvagent/flags-sveltekit/server';

initSvelteKitServer({
  apiKey: process.env.SAVVAGENT_FLAGS_API_KEY!,
});
```

```ts
// +page.server.ts
import { isEnabled } from '@savvagent/flags-sveltekit/server';

export async function load({ cookies }) {
  const enabled = await isEnabled('new-feature', {
    user_id: cookies.get('user_id'),
  });

  return { enabled };
}
```

### Client-Side (Stores)

```svelte
<!-- +layout.svelte -->
<script>
import { initSavvagentFlags } from '@savvagent/flags-sveltekit';

initSavvagentFlags({
  apiKey: import.meta.env.VITE_SAVVAGENT_FLAGS_API_KEY,
});
</script>
```

```svelte
<!-- +page.svelte -->
<script>
import { createFlag } from '@savvagent/flags-sveltekit';

const isEnabled = createFlag('client-feature');
</script>

{#if $isEnabled}
  <NewFeature />
{/if}
```

## API Reference

### Server-Side (`@savvagent/flags-sveltekit/server`)

- `initSvelteKitServer(config)` - Initialize server client
- `isEnabled(flagKey, context?)` - Check if flag is enabled
- `evaluate(flagKey, context?)` - Get detailed result
- `evaluateForEvent(event, flagKey, context?)` - Evaluate with event context
- `getEventContext(event, overrides?)` - Extract context from event
- `trackError(flagKey, error, context?)` - Track errors

### Client-Side

All stores and functions from `@savvagent/flags-svelte` are available.

## License

MIT
