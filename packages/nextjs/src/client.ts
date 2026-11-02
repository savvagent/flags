/**
 * Client-side exports for Next.js Client Components
 * Use these in components marked with 'use client' directive
 */

'use client';

// Re-export all client-side functionality from React SDK
export {
  SavvagentFlagsProvider,
  useSavvagentFlags,
  useFlag,
  useFlags,
  useWithFlag,
  useUser,
  useTrackError,
  useEnvironment,
  // Re-export FlagClient for advanced use cases
  FlagClient,
} from '@savvagent/flags-react';

export type {
  SavvagentFlagsProviderProps,
  DefaultFlagContext,
  UseFlagOptions,
  UseFlagResult,
  UseFlagsOptions,
  UseFlagsResult,
  FlagClientConfig,
  FlagContext,
  FlagEvaluationResult,
  FlagDefinition,
  FlagListResponse,
  EvaluationEvent,
  ErrorEvent,
  FlagUpdateEvent,
  // Generated API types for advanced users
  ApiTypes,
  components,
} from '@savvagent/flags-react';
