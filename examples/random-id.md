# Random ID

**Task:** "Generate a unique ID for each new record in a Node.js 22 service."

## Without greybeard

```bash
npm install uuid
```

```js
import { v4 as uuid } from "uuid";

const id = uuid();
```

Or hand-rolled:

```js
const id = Math.random().toString(36).slice(2) + Date.now().toString(36);
```

The hand-rolled version has no real collision guarantee, and `Math.random` is not a CSPRNG. The dependency is fine, but it is a dependency you now own for one call.

## With greybeard

```js
const id = crypto.randomUUID();
```

`crypto.randomUUID` is a global in Node 19+ and every modern browser. It returns a v4 UUID from a cryptographically secure source. If you need a different format (short IDs, sortable IDs), name that requirement before reaching for a library.

## Check

```js
const id = crypto.randomUUID();
console.assert(/^[0-9a-f-]{36}$/.test(id));
console.assert(crypto.randomUUID() !== crypto.randomUUID());
```

No dependency. No collisions to worry about.
