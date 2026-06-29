# Date formatting

**Task:** "Format `2026-06-28T10:00:00Z` as an English date for users in `Asia/Jerusalem`."

## Observed baseline

Claude already gave the right shape without the skill:

```js
const date = new Date("2026-06-28T10:00:00Z");
const label = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
  timeZone: "Asia/Jerusalem",
}).format(date);
```

This is a tie, not proof that greybeard improves the answer.

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
