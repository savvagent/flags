import { NgModule, ModuleWithProviders } from '@angular/core';
import { SavvagentFlagsService, SavvagentFlagsConfig, SAVVAGENT_FLAGS_CONFIG } from './service';

/**
 * Angular module for Savvagent Flags feature flags.
 *
 * @example
 * ```typescript
 * // app.module.ts
 * import { SavvagentFlagsModule } from '@savvagent/flags-angular';
 *
 * @NgModule({
 *   imports: [
 *     SavvagentFlagsModule.forRoot({
 *       config: {
 *         apiKey: 'sdk_your_api_key',
 *         baseUrl: 'https://flags.savvagent.com'
 *       },
 *       defaultContext: {
 *         applicationId: 'my-app',
 *         environment: 'production',
 *         userId: 'user-123'
 *       }
 *     })
 *   ]
 * })
 * export class AppModule {}
 * ```
 *
 * @example
 * ```typescript
 * // For standalone components (Angular 14+)
 * import { SavvagentFlagsModule } from '@savvagent/flags-angular';
 *
 * bootstrapApplication(AppComponent, {
 *   providers: [
 *     importProvidersFrom(
 *       SavvagentFlagsModule.forRoot({
 *         config: { apiKey: 'sdk_...' }
 *       })
 *     )
 *   ]
 * });
 * ```
 */
@NgModule({
  providers: [SavvagentFlagsService]
})
export class SavvagentFlagsModule {
  /**
   * Configure the Savvagent Flags module with API key and default context.
   *
   * @param savvagentFlagsConfig - Configuration including API key and optional default context
   * @returns Module with providers
   */
  static forRoot(savvagentFlagsConfig: SavvagentFlagsConfig): ModuleWithProviders<SavvagentFlagsModule> {
    return {
      ngModule: SavvagentFlagsModule,
      providers: [
        {
          provide: SAVVAGENT_FLAGS_CONFIG,
          useValue: savvagentFlagsConfig
        },
        SavvagentFlagsService
      ]
    };
  }
}
