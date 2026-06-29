# Unique array

**Task:** "Remove duplicate numbers from `[1, 2, 2, 3, 3, 3]`."

## Without greybeard

```bash
npm install lodash
```

```js
import uniq from "lodash/uniq";

const result = uniq(values);
```

Or hand-rolled:

```js
const result = values.filter((value, index) => values.indexOf(value) === index);
```

The filter is O(n²) and the dependency is a whole package for one primitive operation.

## With greybeard

```js
const result = [...new Set(values)];
```

`Set` dedupes by `SameValueZero`, so primitives just work. If you need uniqueness by an object key, that is a different requirement, say so before reaching for lodash.

## Check

```js
const result = [...new Set([1, 2, 2, 3, 3, 3])];
console.assert(result.length === 3);
console.assert(result.join(",") === "1,2,3");
```

No dependency. No quadratic scan.
