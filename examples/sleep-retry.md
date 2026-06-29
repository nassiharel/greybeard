# Sleep before retry

**Task:** "Wait 250ms in a Node.js 22 script before retrying once."

## Without greybeard

```js
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function retry(fn) {
  try {
    return await fn();
  } catch {
    await sleep(250);
    return fn();
  }
}
```

The wrapper is not wrong, but owning it is unnecessary for one retry path.

## With greybeard

```js
import { setTimeout as sleep } from "node:timers/promises";

try {
  await fn();
} catch {
  await sleep(250);
  await fn();
}
```

Extract a retry helper only when a second call site needs the same policy.

## Check

```js
import { setTimeout as sleep } from "node:timers/promises";

let attempts = 0;
const fn = async () => {
  attempts += 1;
  if (attempts === 1) throw new Error("try again");
};

try {
  await fn();
} catch {
  await sleep(250);
  await fn();
}

console.assert(attempts === 2);
```
