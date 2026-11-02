# Savvagent Flags Angular Example

This example demonstrates how to use the `@savvagent/flags-angular` SDK in an Angular application.

## Features

- Feature flag evaluation with reactive updates
- Real-time flag updates via SSE
- User management (set/clear user ID)
- Error tracking for AI-powered correlation
- Local flag overrides for development/testing
- Flag override panel with keyboard shortcut (Ctrl+Shift+F)

## Getting Started

### 1. Install Dependencies

From the monorepo root:

```bash
pnpm install
```

### 2. Configure Environment

Copy the environment example and update with your API key:

```bash
cp .env.example .env.local
```

Edit `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  savvagentFlagsApiUrl: 'http://localhost:8080',
  savvagentFlagsSdkKey: 'sdk_your_actual_key',
};
```

### 3. Run the Development Server

```bash
pnpm dev
```

Or from the monorepo root:

```bash
pnpm --filter angular-example dev
```

The app will be available at `http://localhost:3001`

## Project Structure

```
src/
├── app/
│   ├── app.component.ts           # Root component
│   ├── feature-demo.component.ts  # Main feature demo
│   └── flag-override-panel.component.ts  # Dev tools panel
├── environments/
│   ├── environment.ts             # Development config
│   └── environment.prod.ts        # Production config
├── main.ts                        # Bootstrap with SavvagentFlagsModule
├── index.html                     # HTML entry point
└── styles.css                     # Global styles
```

## Key Concepts

### Module Configuration

The SDK is configured in `main.ts` using `SavvagentFlagsModule.forRoot()`:

```typescript
import { SavvagentFlagsModule } from '@savvagent/flags-angular';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      SavvagentFlagsModule.forRoot({
        config: {
          apiKey: 'sdk_...',
          applicationId: 'your-app-id',
          enableRealtime: true,
        },
        defaultContext: {
          environment: 'development',
          userId: 'user-123',
        },
      })
    ),
  ],
});
```

### Reactive Flag Evaluation

Use `flag$()` for reactive flag values with automatic updates:

```typescript
import { SavvagentFlagsService, FlagObservableResult } from '@savvagent/flags-angular';

@Component({...})
export class MyComponent {
  constructor(private savvagentFlags: SavvagentFlagsService) {}

  ngOnInit() {
    this.savvagentFlags.flag$('my-feature', { defaultValue: false })
      .subscribe((result: FlagObservableResult) => {
        console.log('Flag value:', result.value);
        console.log('Loading:', result.loading);
        console.log('Error:', result.error);
      });
  }
}
```

### Simple Boolean Observable

Use `flagValue$()` when you only need the boolean value:

```typescript
isEnabled$ = this.savvagentFlags.flagValue$('my-feature');

// In template
<button *ngIf="isEnabled$ | async">New Button</button>
```

### Local Overrides

The SDK supports local overrides for development:

```typescript
// Set an override
this.savvagentFlags.setOverride('my-feature', true);

// Clear an override
this.savvagentFlags.clearOverride('my-feature');

// Clear all overrides
this.savvagentFlags.clearAllOverrides();
```

### Flag Override Panel

Press `Ctrl+Shift+F` to open the flag override panel for easy debugging.

## Learn More

- [Savvagent Flags Angular SDK Documentation](../../packages/angular/README.md)
- [SDK Developer Guide](../../docs/SDK-DEVELOPER-GUIDE.md)
