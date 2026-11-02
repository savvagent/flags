---
"@savvagent/flags-sdk": patch
"@savvagent/flags-node-server": patch
---

Default `baseUrl` to `https://flags.savvagent.com`, the canonical host, instead of the legacy `https://otto-flags.savvagent.com`. The legacy host keeps serving, so a `baseUrl` set to it still works.
