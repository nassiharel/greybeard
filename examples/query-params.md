# Query params

**Task:** "Parse `?page=2&sort=name` and read `page` and `sort` in browser JavaScript."

## Without greybeard

```bash
npm install qs
```

```js
import qs from "qs";

const query = qs.parse(window.location.search, { ignoreQueryPrefix: true });
const page = query.page;
const sort = query.sort;
```

Or a custom parser:

```js
function parseQuery(search) {
  return search
    .replace(/^\?/, "")
    .split("&")
    .reduce((params, pair) => {
      const [key, value] = pair.split("=");
      params[decodeURIComponent(key)] = decodeURIComponent(value);
      return params;
    }, {});
}
```

## With greybeard

```js
const params = new URLSearchParams(location.search);
const page = params.get("page");
const sort = params.get("sort");
```

## Check

```js
const params = new URLSearchParams("?page=2&sort=name");
console.assert(params.get("page") === "2");
console.assert(params.get("sort") === "name");
```

No dependency. No parser to own.
