import React, { createContext, useContext, useEffect, useState, useRef, useMemo } from 'react';
import { FlagClient, FlagClientConfig, FlagContext } from '@savvagent/flags-sdk';

/**
 * Default context values that apply to all flag evaluations
 * Per SDK Developer Guide: https://github.com/savvagent/flags/blob/main/docs/SDK-DEVELOPER-GUIDE.md
 */
export interface DefaultFlagContext {
  /** Application ID for application-scoped flags */
  applicationId?: string;
  /** Environment (development, staging, production) */
  environment?: string;
  /** Organization ID for multi-tenant apps */
  organizationId?: string;
  /** Default user ID (required for percentage rollouts) */
  userId?: string;
  /** Default anonymous ID (alternative to userId for anonymous users) */
  anonymousId?: string;
  /** Session ID as fallback identifier */
  sessionId?: string;
  /** User's language code (e.g., "en", "es") */
  language?: string;
  /** Default attributes for targeting */
  attributes?: Record<string, any>;
}

interface SavvagentFlagsContextValue {
  client: FlagClient | null;
  isReady: boolean;
  defaultContext: FlagContext;
}

const SavvagentFlagsContext = createContext<SavvagentFlagsContextValue>({
  client: null,
  isReady: false,
  defaultContext: {},
});

export interface SavvagentFlagsProviderProps {
  config: FlagClientConfig;
  children: React.ReactNode;
  /** Default context values applied to all flag evaluations */
  defaultContext?: DefaultFlagContext;
  /** Initial flag overrides to apply on mount (e.g., from localStorage) */
  initialOverrides?: Record<string, boolean>;
}

/**
 * Provider component that initializes and provides the Savvagent Flags client
 * to all child components via React context.
 *
 * @example
 * ```tsx
 * <SavvagentFlagsProvider
 *   config={{ apiKey: 'sdk_...' }}
 *   defaultContext={{
 *     applicationId: 'my-app-id',
 *     environment: 'development',
 *     userId: 'user-123',
 *     attributes: { plan: 'pro' }
 *   }}
 * >
 *   <App />
 * </SavvagentFlagsProvider>
 * ```
 */
export function SavvagentFlagsProvider({ config, children, defaultContext, initialOverrides }: SavvagentFlagsProviderProps) {
  const [isReady, setIsReady] = useState(false);
  const clientRef = useRef<FlagClient | null>(null);

  // Convert DefaultFlagContext to FlagContext format (camelCase to snake_case)
  // Per SDK Developer Guide: Context fields for flag evaluation
  // Memoized to prevent unnecessary re-renders of consuming components
  const normalizedDefaultContext: FlagContext = useMemo(
    () => ({
      application_id: defaultContext?.applicationId,
      environment: defaultContext?.environment,
      organization_id: defaultContext?.organizationId,
      user_id: defaultContext?.userId,
      anonymous_id: defaultContext?.anonymousId,
      session_id: defaultContext?.sessionId,
      language: defaultContext?.language,
      attributes: defaultContext?.attributes,
    }),
    [
      defaultContext?.applicationId,
      defaultContext?.environment,
      defaultContext?.organizationId,
      defaultContext?.userId,
      defaultContext?.anonymousId,
      defaultContext?.sessionId,
      defaultContext?.language,
      defaultContext?.attributes,
    ]
  );

  useEffect(() => {
    // Initialize client
    try {
      clientRef.current = new FlagClient(config);

      // Initialize userId from defaultContext if provided
      // Per SDK Developer Guide: User ID should be set for consistent rollout behavior
      if (defaultContext?.userId) {
        clientRef.current.setUserId(defaultContext.userId);
      }

      // Apply initial overrides if provided (e.g., loaded from localStorage)
      // This ensures overrides are applied before any flag evaluations occur
      if (initialOverrides && Object.keys(initialOverrides).length > 0) {
        clientRef.current.setOverrides(initialOverrides);
      }

      setIsReady(true);
    } catch (error) {
      console.error('[Savvagent Flags] Failed to initialize client:', error);
      config.onError?.(error as Error);
    }

    // Cleanup on unmount
    return () => {
      if (clientRef.current) {
        clientRef.current.close();
        clientRef.current = null;
      }
    };
  }, [config.apiKey, config.baseUrl, defaultContext?.userId]); // Re-initialize if key/url/userId changes

  // Memoize the context value to prevent unnecessary re-renders of all consumers
  // Only re-creates when isReady or normalizedDefaultContext actually change
  const contextValue = useMemo<SavvagentFlagsContextValue>(
    () => ({
      client: clientRef.current,
      isReady,
      defaultContext: normalizedDefaultContext,
    }),
    [isReady, normalizedDefaultContext]
  );

  return (
    <SavvagentFlagsContext.Provider value={contextValue}>
      {children}
    </SavvagentFlagsContext.Provider>
  );
}

/**
 * Hook to access the Savvagent Flags client instance and default context.
 * Must be used within a SavvagentFlagsProvider.
 *
 * @returns The FlagClient instance, ready state, and default context
 * @throws Error if used outside of SavvagentFlagsProvider
 *
 * @example
 * ```tsx
 * const { client, isReady, defaultContext } = useSavvagentFlags();
 *
 * if (!isReady) {
 *   return <div>Loading...</div>;
 * }
 *
 * const enabled = await client.isEnabled('my-feature');
 * ```
 */
export function useSavvagentFlags(): SavvagentFlagsContextValue {
  const context = useContext(SavvagentFlagsContext);

  if (context === undefined) {
    throw new Error('useSavvagentFlags must be used within a SavvagentFlagsProvider');
  }

  return context;
}
