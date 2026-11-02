/**
 * @savvagent/flags-react - React SDK for Savvagent Flags feature flags
 *
 * This package provides React hooks and components for easy integration
 * of Savvagent Flags feature flags into React applications.
 *
 * @packageDocumentation
 */

// Context and Provider
export { SavvagentFlagsProvider, useSavvagentFlags } from './context';
export type { SavvagentFlagsProviderProps, DefaultFlagContext } from './context';

// Hooks
export {
  useFlag,
  useFlags,
  useWithFlag,
  useUser,
  useTrackError,
  useEnvironment,
} from './hooks';
export type {
  UseFlagOptions,
  UseFlagResult,
  UseFlagsOptions,
  UseFlagsResult,
} from './hooks';

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
