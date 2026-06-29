# Examples

Small before/after examples showing greybeard's core behavior: use the platform, avoid speculative code, keep caveats precise, and leave a small check when useful.

| Example | What it proves |
|---------|----------------|
| [Query params](query-params.md) | Browser API before custom parsing or dependencies |
| [URL hostname](url-hostname.md) | `URL` before regex/string parsing |
| [Deep clone](deep-clone.md) | Native clone with honest caveats |
| [Sleep before retry](sleep-retry.md) | Stdlib helper before custom promise wrappers |
| [File extension](file-extension.md) | Node `path` before regex/string parsing |

These are small proof cases, not a benchmark.
