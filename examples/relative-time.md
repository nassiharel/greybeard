# Relative time

**Task:** "Show '3 days ago' from a past date in JavaScript."

## Without greybeard

```bash
npm install moment
```

```js
import moment from "moment";

const label = moment(then).fromNow();
```

Or hand-rolled:

```js
function fromNow(then) {
  const days = Math.round((then - Date.now()) / 86400000);
  return days === 0 ? "today" : `${Math.abs(days)} days ago`;
}
```

`moment` is ~290 KB and in maintenance mode. The hand-rolled version handles only days, in English, and gets pluralization, "yesterday", and future dates wrong.

## With greybeard

```js
const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
const days = Math.round((then - Date.now()) / 86400000);
const label = rtf.format(days, "day");
```

`Intl.RelativeTimeFormat` is built in everywhere and localized. It gives "yesterday" / "3 days ago" / "in 2 hours" for free. If you need automatic unit selection (seconds vs days), name that, otherwise pick the unit you have.

## Check

```js
const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
console.assert(rtf.format(-3, "day") === "3 days ago");
console.assert(rtf.format(-1, "day") === "yesterday");
console.assert(rtf.format(2, "hour") === "in 2 hours");
```

No dependency. Localized and correctly pluralized.
