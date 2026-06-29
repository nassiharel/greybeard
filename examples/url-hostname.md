# URL hostname

**Task:** "Get the hostname from `https://api.example.com:8443/v1/users?limit=10`."

## Without greybeard

```js
function hostnameOf(url) {
  return url
    .replace(/^https?:\/\//, "")
    .split("/")[0]
    .split(":")[0];
}
```

This looks short, but it starts owning URL parsing: credentials, IPv6, ports, relative URLs, invalid input, and protocol-specific edge cases.

## With greybeard

```js
const hostname = new URL("https://api.example.com:8443/v1/users?limit=10").hostname;
```

If the input can be invalid, keep that explicit at the boundary:

```js
function hostnameOf(value) {
  return new URL(value).hostname;
}
```

Let `URL` throw for invalid input unless the caller needs a softer error shape.

## Check

```js
console.assert(
  new URL("https://api.example.com:8443/v1/users?limit=10").hostname === "api.example.com"
);
console.assert(new URL("https://user:pass@example.org/path").hostname === "example.org");
console.assert(new URL("https://[2001:db8::1]:443/").hostname === "[2001:db8::1]");
```
