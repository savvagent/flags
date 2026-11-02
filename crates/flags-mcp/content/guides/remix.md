# Savvagent Flags Remix SDK (app: {{APP_NAME}})

`@savvagent/flags-remix` provides server helpers for loaders and actions, and re-exports the hooks of
`@savvagent/flags-react` for components. It wraps `@savvagent/flags-sdk` and `@savvagent/flags-react`; its install
includes both.

The client key is public by design: it can ship in a browser bundle and sits in source control
without harm. It can evaluate flags but cannot read targeting rules. Do not put the app's server key
in this package: its client accepts only the public client key, and a server key must never reach a
browser.

The server helpers use the same core client as the browser, so they also take the public client key,
not a server key. For a Node.js service that holds a server key, use `@savvagent/flags-node-server`.

## Install

These packages are not installable by name yet. Install from source, pinned to a full commit SHA of
`savvagent/flags`. Pin to `{{SDK_REF}}`, a commit on `main` of `savvagent/flags` that the
maintainers have reviewed. Use it exactly: do not substitute a branch, a newer commit, or a commit
from a fork, and use the same commit everywhere in one project. Build and pack each package in
dependency order (`@savvagent/flags-sdk`, `@savvagent/flags-react`, `@savvagent/flags-remix`), because a package's
tarball names the others it depends on and they cannot be resolved by name. You need `git`, Node.js
and `pnpm`.

On pnpm 9, `pnpm install` runs the install scripts of this repository's dependencies on your
machine; pnpm 10 and later skip them unless allowed. The lockfile fixes which versions you get, not
what their scripts do. None of these packages needs them to build, so skip them with
`--ignore-scripts`.

```bash
git clone https://github.com/savvagent/flags
cd flags
git checkout {{SDK_REF}}
pnpm install --frozen-lockfile --ignore-scripts
mkdir -p ../savvagent-flags-tarballs
pnpm --filter @savvagent/flags-sdk build
pnpm --filter @savvagent/flags-sdk pack --pack-destination ../savvagent-flags-tarballs
pnpm --filter @savvagent/flags-react build
pnpm --filter @savvagent/flags-react pack --pack-destination ../savvagent-flags-tarballs
pnpm --filter @savvagent/flags-remix build
pnpm --filter @savvagent/flags-remix pack --pack-destination ../savvagent-flags-tarballs
```

Then, in your own project, install all of the tarballs in one command (use the real path to the
`savvagent-flags-tarballs` directory):

```bash
npm install \
  /path/to/savvagent-flags-tarballs/savvagent-flags-sdk-*.tgz \
  /path/to/savvagent-flags-tarballs/savvagent-flags-react-*.tgz \
  /path/to/savvagent-flags-tarballs/savvagent-flags-remix-*.tgz
```

The tarball file names carry the package version, hence the `*`. Another package manager's
install-from-tarball command works the same way, as long as every tarball goes in together. Pin a
SHA, not a branch, so a build is reproducible.

## Initialize

Server side: initialize once, in a module the server loads (the root route works).

```tsx
// app/root.tsx
import { initRemixClient } from "@savvagent/flags-remix";

initRemixClient({
  apiKey: "{{CLIENT_KEY}}",
  applicationId: "{{APP_ID}}",
  environment: "production",
});
```

Client side: the hooks need `SavvagentFlagsProvider` around the app.

```tsx
// app/root.tsx
import { Outlet } from "@remix-run/react";
import { SavvagentFlagsProvider } from "@savvagent/flags-remix";

const config = { apiKey: "{{CLIENT_KEY}}", applicationId: "{{APP_ID}}" };

export default function App() {
  return (
    <html lang="en">
      <body>
        <SavvagentFlagsProvider config={config}>
          <Outlet />
        </SavvagentFlagsProvider>
      </body>
    </html>
  );
}
```

The config takes the core client's fields: `baseUrl` (default `https://flags.savvagent.com`),
`environment` (default `"production"`), `enableRealtime` (default `true`), `cacheTtl` (milliseconds,
default 60000), `enableTelemetry` (default `true`), `defaults` and `onError`.

**Environment.** The `environment` this app evaluates in, wherever this guide sets it (the client
configuration or a context), must be one of the app's environments: {{ENVIRONMENTS}}. Read it from the
build's or deployment's configuration instead of hardcoding it.

## Evaluate a flag

In a loader:

```tsx
// app/routes/dashboard.tsx
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { evaluateForRequest } from "@savvagent/flags-remix";

export async function loader({ request }: LoaderFunctionArgs) {
  const showNewDashboard = await evaluateForRequest(request, "new-dashboard");
  return json({ showNewDashboard });
}

export default function Dashboard() {
  const { showNewDashboard } = useLoaderData<typeof loader>();
  return showNewDashboard ? <NewDashboard /> : <OldDashboard />;
}
```

`evaluateForRequest` builds the context from the request: `user_id` from the `user_id` cookie,
`anonymous_id` from the `savvagent_flags_anonymous_id` cookie, `session_id` from the `session_id` cookie,
and `language` from `Accept-Language`. Percentage rollouts bucket on the user id, so make sure it
reaches the evaluation. To pass your own, use `isEnabled("new-dashboard", { user_id: ... })`;
context fields are snake_case (`user_id`, `anonymous_id`, `session_id`, `organization_id`,
`language`, `attributes`). The other server exports are `evaluate(flagKey, context)` (full result),
`withFlag(flagKey, callback, context)`, `trackError(flagKey, error, context)` (use it in an action's
`catch`), `getRequestContext(request, overrides)`, `setEnvironment`, `getEnvironment` and
`getRemixClient()`.

In a component, under the provider:

```tsx
import { useFlag } from "@savvagent/flags-remix";

export function Feature() {
  const { value, loading } = useFlag("new-feature", { defaultValue: false });
  if (loading) return <Spinner />;
  return value ? <NewFeature /> : <OldFeature />;
}
```

The hooks are those of `@savvagent/flags-react`: `useFlag`, `useFlags`, `useWithFlag`, `useUser`,
`useTrackError`, `useEnvironment` and `useSavvagentFlags`.

## Notes

- Flag keys are 1 to 128 characters of letters, digits, `.`, `_` and `-`. A lookup with any other
  key is not sent; it returns the default and reports the problem to `onError`.
- A flag lookup never throws into the app: on a network or server error the value falls back to the
  `defaultValue` you pass (or to `defaults` in the config) and `reason` is `"error"`. Only a missing
  or malformed key makes the client constructor throw.
- Results are cached per flag and per evaluation context, so two users never share a cached result.
  With real-time updates on (the default) a change made with `set_flag_environment` or
  `rollback_flag` reaches the page within moments.
- Telemetry (evaluation counts and tracked errors) feeds `flag_health` and auto-rollback; set
  `enableTelemetry: false` in the config to turn it off.
- Create flags before code references them: an unknown flag key evaluates to its default.
- The wire contract the SDK speaks is `docs/SDK-DEVELOPER-GUIDE.md` in the repository.
