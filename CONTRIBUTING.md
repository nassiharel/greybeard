# Contributing

Thanks for wanting to improve greybeard. It is deliberately **one sharp, focused skill** — the
bar for changing it is "does this measurably improve how an agent behaves, across the tasks people
actually do?"

**What doesn't qualify:**

- *Style preferences* — "the wording reads better" is not a problem statement.
- *Language-specific rules* — these belong in your project's own rules file, not in a general skill.
- *Rules that duplicate existing ones* — check whether the behavior is already covered before adding.
- *Additions without an observed failure* — if you haven't seen the agent do the wrong thing, you're speculating. Don't pre-write rules for problems you haven't encountered.

## Repository layout

```
skills/greybeard/SKILL.md      # the canonical long-form skill
.claude-plugin/                # plugin.json + marketplace.json (Claude Code)
.codex-plugin/                 # plugin.json (Codex native plugin)
gemini-extension.json          # Gemini CLI extension, loads AGENTS.md as context
opencode.json + .opencode/     # OpenCode plugin adapter
AGENTS.md                      # one-page portable digest (Codex and other rules-file agents)
.github/copilot-instructions.md # Copilot adapter; body must match AGENTS.md
```

## SKILL.md conventions

**Frontmatter:**

```yaml
---
name: greybeard
description: Use when <triggers and symptoms>. ...
license: MIT
---
```

- `name`: kebab-case, and **must equal the folder name**.
- `description`: third person, **triggers and symptoms only — never a summary of the workflow.**
  This matters: if the description summarizes the steps, agents tend to follow the description and
  skip reading the skill body. Start with "Use when …" and pack in the concrete situations and
  symptoms that should activate the skill.

**Body — keep the house voice:**

- Open with a **priority order** for principle conflicts (safety → truth → simplicity → quality → evidence → brevity) so agents always know which rule wins.
- Open each principle (move) with a **bold one-line maxim**, then short bullets, then a single
  checkable **gut-check**.
- Use a numbered **ladder** for the simplicity decision; stop at the first rung that holds.
- Include an **execution loop** section: frame success → read → assumptions → options → change → verify → report.
- Include systematic debugging guidance: reproduce, read errors, trace data flow, compare working examples, test one hypothesis, and fix the root cause.
- Include agentic workflow guidance: delegate only independent or review-worthy work, give focused context, and treat review findings as claims to verify.
- Include a **Red flags — STOP** list and a **rationalization table** (`Excuse | Reality`), built
  from real failure modes you've observed.
- Always keep the **safety floor** — the non-negotiables the skill must never simplify away.
- Include **tone guidance** in Output discipline: concise and confident, why before what, surface risks early, rollback notes when relevant.
- Keep it scannable. Imperative and direct; avoid hedging ("you might consider…").

## Keeping the portable files in sync

`AGENTS.md` and `.github/copilot-instructions.md` share the same body. The Copilot file is just
`AGENTS.md`'s body — so **edit `AGENTS.md`, then regenerate the adapter** rather than hand-editing
both:

```bash
node .github/scripts/sync-rules.js   # rewrites copilot-instructions.md from AGENTS.md
```

CI (`.github/workflows/validate.yml`) fails if they drift, and also checks that:

- `skills/greybeard/SKILL.md` has `name` + `description` frontmatter, the description starts with
  "Use when", and the folder name matches `name`,
- `.claude-plugin/plugin.json` and `marketplace.json` are valid JSON with matching versions, and
- per-host manifests (`.codex-plugin`, `gemini-extension.json`) are valid JSON and carry the
  **same `version`** *and* the identical canonical `description` as `.claude-plugin/plugin.json`,
- OpenCode config points at an in-repo plugin file.

Don't bump the `version` fields by hand — release-please owns versioning (it bumps every manifest
listed in `release-please-config.json` from `.release-please-manifest.json` on merge to `main`).
If you change the canonical `description`, change it in every plugin or extension manifest together.

## Testing that a change actually changes behavior

A skill is behavior-shaping text, not prose — validate it the way you'd validate code: by
observing behavior, not by re-reading the wording. There's no automated eval harness (kept
deliberately host-agnostic and zero-dependency), so do it by hand before a behavior-changing PR:

1. **Establish a baseline.** Run the target scenario with the skill *absent* and capture what the
   agent does wrong — the exact rationalization or wrong turn, verbatim.
2. **Write the minimum that addresses *those* failures.** Don't pre-write rules for failures you
   never observed.
3. **Re-run with the skill present** and confirm the behavior changed. If the agent finds a new
   loophole, capture its new rationalization and close that too.
4. **Pressure-test, don't spot-check.** Try a few phrasings and an adversarial "talk yourself out
   of it" framing.

Put the before/after behavior in the PR. "The wording reads better" is not evidence; "without
this, the agent did X; with it, it did Y" is.

## Before opening a PR

1. Run the validation locally: `node .github/scripts/validate.js`. If you edited `AGENTS.md`, run
   `node .github/scripts/sync-rules.js` first so the Copilot adapter matches.
2. State the **real problem** your change addresses — what did an agent get wrong that this fixes?
3. Keep changes surgical — one concern per PR.

By contributing you agree your contributions are licensed under the repository's
[MIT License](LICENSE).
