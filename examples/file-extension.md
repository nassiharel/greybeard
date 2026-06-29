# File extension

**Task:** "Get the file extension from `report.final.csv` in Node.js."

## Without greybeard

```js
function extension(filename) {
  const parts = filename.split(".");
  return parts.length > 1 ? "." + parts.pop() : "";
}
```

This misses edge cases like paths, trailing separators, and dotfiles unless you keep adding rules.

## With greybeard

```js
import path from "node:path";

const ext = path.extname("report.final.csv");
```

For `.env`, `path.extname(".env")` returns an empty string. If dotfiles need special treatment, make that requirement explicit.

## Check

```js
import path from "node:path";

console.assert(path.extname("report.final.csv") === ".csv");
console.assert(path.extname("archive.tar.gz") === ".gz");
console.assert(path.extname(".env") === "");
```
