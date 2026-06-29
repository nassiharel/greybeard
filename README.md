<p align="center">
  <img src="assets/logo.svg" alt="greybeard" width="220">
</p>

# greybeard

> A zero-dependency skill for coding agents: less AI slop, more correct code.

Most coding-agent mistakes are judgment failures, not syntax failures: guessing instead of asking,
building abstractions before the second case exists, patching symptoms, accepting review comments
blindly, touching unrelated code, and saying "done" without evidence.

greybeard is one unified operating discipline for that:

1. **Think from facts** - surface load-bearing assumptions, ask only questions that change the implementation, and push back when the request is unsafe or overbuilt.
2. **Build the minimum** - reuse what exists, prefer stdlib and native platform features, avoid speculative dependencies and abstractions.
3. **Debug systematically** - reproduce, read the full error, trace bad data to its source, form one hypothesis, and fix the root cause.
4. **Cut surgically** - every changed line traces to the request, verified root cause, or cleanup created by the change.
5. **Use agents like tools** - delegate only independent or review-worthy work, with complete task-specific context.
6. **Verify before done** - run the narrowest check that proves the behavior, then report the result plainly.

## Install

### `npx skills`

```bash
npx skills add nassiharel/greybeard
```

This installs the reusable skill from `skills/greybeard/SKILL.md`.

### Claude Code plugin

```text
/plugin marketplace add nassiharel/greybeard
/plugin install greybeard@greybeard
```

The plugin manifest points at the same `skills/` directory.

### Codex

Codex can use the native plugin manifest in `.codex-plugin/plugin.json`, or the portable
instructions file:

```bash
curl -o AGENTS.md \
  https://raw.githubusercontent.com/nassiharel/greybeard/main/AGENTS.md
```

Use `~/.codex/AGENTS.md` if you want the compact rules globally.

### Gemini CLI

This repo ships `gemini-extension.json` with `contextFileName` set to `AGENTS.md`, so the compact
rules load as extension context.

```bash
gemini extensions install https://github.com/nassiharel/greybeard
```

Restart Gemini CLI after installing or updating the extension.

### OpenCode

OpenCode can read `AGENTS.md` from the project root. This repo also ships a thin plugin that
registers `skills/` and injects `AGENTS.md` only when it has not already been loaded.

Add the plugin to your `opencode.json`:

```json
{
  "plugin": ["./.opencode/plugins/greybeard.mjs"]
}
```

If you keep one shared checkout, point that entry at the plugin's absolute path.

### GitHub Copilot

Copilot reads `.github/copilot-instructions.md` from a repository. Install the compact rules with:

```bash
curl --create-dirs -o .github/copilot-instructions.md \
  https://raw.githubusercontent.com/nassiharel/greybeard/main/.github/copilot-instructions.md
```

## Files

| File | Purpose |
|------|---------|
| `skills/greybeard/SKILL.md` | Canonical long-form skill |
| `AGENTS.md` | Compact portable rules for agents that read project instructions |
| `.github/copilot-instructions.md` | Copilot adapter generated from `AGENTS.md` |
| `.claude-plugin/plugin.json` | Claude Code plugin metadata |
| `.codex-plugin/plugin.json` | Codex plugin metadata |
| `gemini-extension.json` | Gemini CLI extension metadata |
| `opencode.json` and `.opencode/plugins/greybeard.mjs` | OpenCode plugin adapter |

## How to know it is working

You should see smaller diffs, fewer invented abstractions, earlier clarifying questions, more
root-cause debugging, review feedback checked before implementation, and final answers that lead
with what changed and what was verified.

See [`examples/`](examples/) for small before/after proof cases, and [`PROOF.md`](PROOF.md) for a
manual A/B proof table.

## Philosophy

- **Truth over momentum** - name uncertainty instead of hiding it.
- **Simplicity over cleverness** - the best code is still the code never written.
- **Root cause over symptoms** - patch once where the bug begins.
- **Evidence over confidence** - done means checked.
- **Brevity over filler** - cut prose, not precision.

## License

[MIT](LICENSE).
