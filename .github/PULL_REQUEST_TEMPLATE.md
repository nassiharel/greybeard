<!--
Thanks for improving greybeard. It is deliberately one sharp, focused skill.
Fill in the checklist so a reviewer can judge the behavior change, not just the wording.
See CONTRIBUTING.md for the house voice.
-->

## The real problem

<!-- What did an agent actually get wrong? Describe the observed failure — the rationalization
or wrong turn you saw (a transcript snippet is ideal). "Improving" something is not a problem
statement. -->

## Intended behavior change

<!-- After this change, what will the agent do differently? Be concrete and observable. -->

## Checklist

- [ ] **Observed failure** stated above (not just a rationale for nicer wording).
- [ ] **Validation run:** `node .github/scripts/validate.js` passes.
- [ ] **Portable files synced** if I touched rule content: `AGENTS.md` and
      `.github/copilot-instructions.md` bodies match (run `node .github/scripts/sync-rules.js`),
      and the plugin manifests share the canonical `description`. (Don't hand-bump `version` —
      release-please owns it.)
- [ ] **Surgical:** one concern per PR; no unrelated cleanup bundled in.

## Notes for the reviewer

<!-- Anything that needs context: a deliberate variant, a skipped suggestion, a trade-off. -->
