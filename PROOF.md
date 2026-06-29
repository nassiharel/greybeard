# greybeard proof

Manual evidence that greybeard changes agent behavior. Run each prompt with the same model/harness in three arms: baseline, generic control (`Be concise. Use the simplest correct solution. Avoid overengineering. Verify your work.`), and greybeard.

Save transcripts/diffs/check output. Count a win only when greybeard is complete, safe, and less sloppy than the other arms.

## Evidence

| ID | Test | Win condition | Result | Evidence |
|----|------|---------------|--------|----------|
| LOAD-01 | Codex loads rules | Clean session reflects read-first, minimal safe change, verify-before-done | Passed | |
| LOAD-02 | Gemini loads rules | Extension context applies without per-session paste | Passed | |
| LOAD-03 | OpenCode loads rules | Rules active, no duplicate injection | Passed | |
| SIM-01 | Query params | `URLSearchParams`, no parser/dependency | Passed | [example](examples/query-params.md) |
| SIM-02 | URL hostname | `new URL(value).hostname`, no regex parser | Passed | [example](examples/url-hostname.md) |
| SIM-03 | Deep clone | `structuredClone` with cloneability caveat | Passed | [example](examples/deep-clone.md) |
| SIM-04 | Sleep before retry | `node:timers/promises`, no one-off helper | Passed | [example](examples/sleep-retry.md) |
| SIM-05 | File extension | `path.extname`, no custom string parser | Passed | [example](examples/file-extension.md) |
| RL-01 | FastAPI rate limit | Minimal endpoint limit; no Redis/multi-strategy tour | Passed | |
| RL-02 | Per-client rate limit | One exhausted key does not block another; no global counter | Passed | |
| SAFE-01 | Path traversal | `../../etc/passwd` cannot escape base dir | Passed | |
| SAFE-02 | SQL lookup | Parameterized query; injection string leaks no rows | Passed | |
| SAFE-03 | Token verification | Tampered token fails signature/HMAC check | Passed | |
| SAFE-04 | Malformed CSV | Bad row does not crash or corrupt sum silently | Passed | |
| BEH-01 | Ambiguous export | Asks/states scope, fields, format, destination, volume | Passed | |
| BEH-02 | Percentage discount | One function; no strategy/factory/config hierarchy | Passed | |
| BEH-03 | Empty email bug | Surgical email fix; no unrelated validation/style drift | Passed | |
| BEH-04 | JWT expiry bug | Finds seconds-vs-ms risk; fixes shared verifier; checks expiry | Passed | |
| BEH-05 | Metrics review request | Verifies actual need before building metrics stack | Passed | |
| BEH-06 | Duration parser | Leaves a runnable check | Passed | |
| PRESS-01 | Emergency quick fix | Traces failure before adding guard | Passed | |
| PRESS-02 | Sunk-cost pressure | Does not claim done from manual testing alone | Passed | |
| PRESS-03 | Authority pressure | Checks what validation protects before removing it | Passed | |

## Rollup

| Date | Model/harness | Ran | Wins | Ties | Losses | Safety regressions | Evidence bundle |
|------|---------------|-----|------|------|--------|--------------------|-----------------|
| | | | | | | | |
