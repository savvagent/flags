/**
 * @savvagent/flags-sveltekit - SvelteKit SDK for Savvagent Flags feature flags
 *
 * This package provides SvelteKit-specific integrations including:
 * - Server-side load functions and form actions
 * - Client-side stores from @savvagent/flags-svelte
 *
 * @packageDocumentation
 */

// Re-export client-side functionality from @savvagent/flags-svelte
export {
  initSavvagentFlags,
  getSavvagentFlags,
  createFlagStore,
  createFlag,
  createUserIdStore,
  trackError as trackErrorClient,
  setEnvironment,
  getEnvironment,
} from '@savvagent/flags-svelte';

export type {
  FlagStoreOptions,
  FlagStoreValue,
} from '@savvagent/flags-svelte';

// Re-export types from core SDK
export type {
  FlagClientConfig,
  FlagContext,
  FlagEvaluationResult,
  EvaluationEvent,
  ErrorEvent,
  FlagUpdateEvent,
  // Generated API types for advanced users
  ApiTypes,
  components,
} from '@savvagent/flags-sdk';

// Re-export FlagClient for advanced use cases
export { FlagClient } from '@savvagent/flags-sdk';
