# Date formatting

**Task:** "Format `2026-06-28T10:00:00Z` as an English date for users in `Asia/Jerusalem`."

## Without greybeard

```bash
npm install dayjs
```

```js
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const label = dayjs("2026-06-28T10:00:00Z")
  .tz("Asia/Jerusalem")
  .format("MMM D, YYYY");
```

## With greybeard

```js
const date = new Date("2026-06-28T10:00:00Z");
const label = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
  timeZone: "Asia/Jerusalem",
}).format(date);
```

Use a date library when you need parsing policy, relative time, duration math, or a project already depends on one. Not for one display format.

## Check

```js
const date = new Date("2026-06-28T10:00:00Z");
const label = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
  timeZone: "Asia/Jerusalem",
}).format(date);

console.assert(label.length > 0);
```
