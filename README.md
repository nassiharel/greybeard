<p align="center">
  <img src="assets/logo.svg" alt="greybeard" width="220">
</p>

# greybeard

> One sharp skill that makes your coding agent write like a senior engineer — less code, more
> correctly, with assumptions surfaced and results verified.

Most mistakes a coding agent makes aren't about not knowing the language. They're about
*judgment*: guessing instead of asking, over-engineering a simple task, touching code it
shouldn't, and declaring victory without checking. greybeard encodes the habits a seasoned
engineer has internalized into a single skill that triggers automatically when it's relevant.

## The four moves

A greybeard, before and during any change:

1. **Think first** — understand the problem and the code it touches *fully*; surface
   assumptions, interpretations, and confusion *before* writing.
2. **Build the minimum** — climb the simplicity ladder (YAGNI → reuse what's here → stdlib →
   native feature → installed dep → one line → minimum) and stop at the first rung that holds.
3. **Cut surgically** — every changed line traces to the request; fix the root cause once, not
   the symptom in N places; match the existing style.
4. **Verify** — define success as something observable, run it, read the output, *then* claim
   done; leave one runnable check behind.

Plus a hard **safety floor** (what you never simplify away), terse **output discipline**, and an
**anti-rationalization** layer so the discipline survives pressure.

## The problems it solves

| Problem | The skill's answer |
|---------|--------------------|
| Assumes what you meant and runs with it. | Surface assumptions; ask the questions that change the approach. |
| Over-complicates code, bloats abstractions, adds unrequested "flexibility". | Climb the simplicity ladder; stop at the first rung that holds. |
| Reinvents a helper that already exists. | Read first — reuse what's there before writing new code. |
| Changes more than it needs to; leaves messes. | Surgical changes — every line traces to the request. |
| Patches the line in the ticket and leaves sibling callers broken. | Fix the root cause once, where all callers route through. |
| Says "this should work" without running anything. | Verify with fresh evidence before claiming done. |
| Cuts corners on safety in the name of simplicity. | The safety floor — simplicity never removes the check that makes it safe. |
| Buries the result under a wall of justifying prose. | Lead with the outcome; if the explanation outgrows the change, cut it. |

## Install

### Option A — `npx skills` (recommended, any host)

```bash
npx skills add nassiharel/greybeard
```

One command, no marketplace step — the skill installs and triggers automatically.

### Option B — Claude Code plugin

```
/plugin marketplace add nassiharel/greybeard
/plugin install greybeard@greybeard
```

The skill then loads automatically when its triggers match — you don't have to invoke it by name.

### Option C — GitHub Copilot

Copilot reads `.github/copilot-instructions.md` from a project automatically. Drop the ruleset in:

```bash
curl --create-dirs -o .github/copilot-instructions.md \
  https://raw.githubusercontent.com/nassiharel/greybeard/main/.github/copilot-instructions.md
```

### Option D — Codex / portable rules file (any agent)

Codex and other agents that read a project rules file pick up the generic `AGENTS.md` ruleset:

```bash
curl -o AGENTS.md \
  https://raw.githubusercontent.com/nassiharel/greybeard/main/AGENTS.md
```

Codex also ships a native plugin manifest at `.codex-plugin/plugin.json` — point your host's
plugin install at this repository and it discovers the manifest for that host. All manifests
reference the same `skills/` directory.

`AGENTS.md` and `.github/copilot-instructions.md` are compact distillations of the skill; the
full long-form version is `skills/greybeard/SKILL.md`.

## How to know it's working

You should notice your agent:

- Asking a sharp clarifying question *before* building, instead of after rebuilding.
- Producing smaller diffs — changes that map cleanly to what you asked for, preferring a 10-line
  fix over a 200-line redesign.
- Reusing existing code and reaching for the stdlib first instead of inventing new abstractions.
- Reporting results with evidence ("I ran X and saw Y") instead of "this should work."
- Saying out loud when it *couldn't* verify something, instead of papering over the gap.

## Philosophy

- **First principles over intuition** — understand the goal fully; don't guess about anything load-bearing.
- **Simplicity, not carelessness** — the least code that solves the real problem, with the safety checks intact.
- **Surgical changes** — every changed line traces to the request.
- **Evidence over claims** — "done" means you watched it work, not that you wrote it.
- **Craftsmanship** — clear names, linear flow, risks surfaced early; polish is part of the job.
- **Decisive execution** — understand deeply, then pick one path and ship it; momentum matters.
- **Honest trade-offs** — this biases toward caution over speed. For trivial tasks, move fast.

## License

[MIT](LICENSE).
