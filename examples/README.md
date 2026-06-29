# Examples

Small before/after examples showing greybeard's core behavior: use the platform, avoid speculative code, keep caveats precise, and leave a small check when useful.

| Example | What it proves |
|---------|----------------|
| [Random ID](random-id.md) | Native crypto before a UUID dependency |
| [Unique array](unique-array.md) | `Set` before lodash or O(n²) filtering |
| [URL hostname](url-hostname.md) | `URL` before regex/string parsing |
| [Sleep before retry](sleep-retry.md) | Stdlib helper before custom promise wrappers |
| [File extension](file-extension.md) | Node `path` before regex/string parsing |

These are small proof cases, not a benchmark.
