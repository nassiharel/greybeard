# Examples

Small before/after examples showing greybeard's core behavior: use the platform, avoid speculative code, keep caveats precise, and leave a small check when useful.

| Example | What it proves |
|---------|----------------|
| [Query params](query-params.md) | Browser API before custom parsing or dependencies |
| [Date formatting](date-formatting.md) | `Intl` before date libraries for one format |
| [Deep clone](deep-clone.md) | Native clone with honest caveats |
| [Sleep before retry](sleep-retry.md) | Stdlib helper before custom promise wrappers |
| [File extension](file-extension.md) | Node `path` before regex/string parsing |

These are proof cases, not a benchmark. Use `PROOF.md` to record manual A/B results.
