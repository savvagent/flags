/**
 * @savvagent/flags-angular - Angular SDK for Savvagent Flags feature flags
 *
 * This package provides Angular services and modules for easy integration
 * of Savvagent Flags feature flags into Angular applications.
 *
 * @packageDocumentation
 */

// Module
export { SavvagentFlagsModule } from './module';

// Service and types
export { SavvagentFlagsService, SAVVAGENT_FLAGS_CONFIG } from './service';
export type {
  SavvagentFlagsConfig,
  DefaultFlagContext,
  FlagObservableResult,
  FlagOptions,
} from './service';

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
