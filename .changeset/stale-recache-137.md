---
"@savvagent/flags-node-server": patch
"@savvagent/flags-sdk": patch
---

Drop an evaluation result from the cache when its flag was invalidated while the request was in flight, so a stale answer is never served after a kill switch.
