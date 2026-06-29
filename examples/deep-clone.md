# Deep clone

**Task:** "Deep-clone this plain JSON-like settings object in modern JavaScript."

## Without greybeard

```bash
npm install lodash
```

```js
import cloneDeep from "lodash/cloneDeep";

const copy = cloneDeep(settings);
```

Or:

```js
const copy = JSON.parse(JSON.stringify(settings));
```

The JSON round trip drops values like `Date`, `Map`, `undefined`, and `Infinity`. It may be fine for strict JSON, but it is a hidden assumption.

## With greybeard

```js
const copy = structuredClone(settings);
```

This is for cloneable data. If the object contains functions, class instances, DOM nodes, or custom prototypes, name that requirement before choosing a different approach.

## Check

```js
const settings = { theme: { name: "dark" } };
const copy = structuredClone(settings);

copy.theme.name = "light";
console.assert(settings.theme.name === "dark");
console.assert(copy.theme.name === "light");
```
