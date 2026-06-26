#!/usr/bin/env node
/**
 * Regenerates .github/copilot-instructions.md from AGENTS.md so the two never
 * need hand-syncing. Copilot reads a plain markdown instructions file with no
 * frontmatter, so the copy is AGENTS.md's body verbatim.
 *
 * validate.js enforces that the bodies match; this script makes them match.
 * Run after editing AGENTS.md. Zero dependencies (Node stdlib only).
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', '..');
const agentsPath = path.join(root, 'AGENTS.md');
const copilotPath = path.join(root, '.github', 'copilot-instructions.md');

const agents = fs.readFileSync(agentsPath, 'utf8').replace(/\r\n/g, '\n');
const next = `${agents.replace(/\s*$/, '')}\n`;

const existing = fs.existsSync(copilotPath)
  ? fs.readFileSync(copilotPath, 'utf8').replace(/\r\n/g, '\n')
  : null;

if (next === existing) {
  console.log('copilot-instructions.md already in sync with AGENTS.md.');
} else {
  fs.writeFileSync(copilotPath, next);
  console.log('Regenerated .github/copilot-instructions.md from AGENTS.md.');
}
