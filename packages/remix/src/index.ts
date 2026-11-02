/**
 * @savvagent/flags-remix - Remix SDK for Savvagent Flags feature flags
 *
 * This package provides Remix-specific integrations including:
 * - Loader and action helpers
 * - Client-side hooks from @savvagent/flags-react
 * - Server-side flag evaluation
 *
 * @packageDocumentation
 */

// Server-side exports (for loaders and actions)
export {
  initRemixClient,
  getRemixClient,
  getRequestContext,
  isEnabled,
  evaluate,
  withFlag,
  trackError,
  evaluateForRequest,
  setEnvironment,
  getEnvironment,
} from './server';

// Client-side exports (re-export from React SDK)
export {
  SavvagentFlagsProvider,
  useSavvagentFlags,
  useFlag,
  useFlags,
  useWithFlag,
  useUser,
  useTrackError,
  useEnvironment,
} from '@savvagent/flags-react';

export type {
  SavvagentFlagsProviderProps,
  DefaultFlagContext,
  UseFlagOptions,
  UseFlagResult,
  UseFlagsOptions,
  UseFlagsResult,
} from '@savvagent/flags-react';

// Re-export types from core SDK
export type {
  FlagClientConfig,
  FlagContext,
  FlagEvaluationResult,
  EvaluationEvent,
  ErrorEvent,
  FlagUpdateEvent,
  FlagDefinition,
  FlagListResponse,
  // Generated API types for advanced users
  ApiTypes,
  components,
} from '@savvagent/flags-sdk';

// Re-export FlagClient for advanced use cases
export { FlagClient } from '@savvagent/flags-sdk';
