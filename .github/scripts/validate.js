#!/usr/bin/env node
/**
 * Validates the greybeard repo:
 *  1. Every skills/<name>/SKILL.md has `name` and `description` frontmatter.
 *  2. The folder name equals the frontmatter `name` (kebab-case), and the
 *     frontmatter carries only the allowed keys.
 *  2b. The description follows the house contract: it starts with "Use when".
 *  3. .claude-plugin/plugin.json and marketplace.json are valid JSON.
 *  4. Every skill listed in plugin.json exists on disk, and vice versa.
 *  5. The body of .github/copilot-instructions.md matches AGENTS.md (no drift).
 *  6. Per-host plugin manifests (.codex-plugin) are valid JSON, version-synced
 *     with .claude-plugin/plugin.json, and carry the identical canonical
 *     `description`.
 *
 * Exits non-zero on any failure. Warnings are printed but do not fail.
 * Zero dependencies (Node stdlib only).
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', '..');
const errors = [];
const warnings = [];
const fail = (msg) => errors.push(msg);
const warn = (msg) => warnings.push(msg);

function readFrontmatter(file) {
  const text = fs.readFileSync(file, 'utf8');
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null;
  const fm = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^\s*([A-Za-z0-9_-]+):\s*(.*)$/);
    if (kv) fm[kv[1]] = kv[2].trim();
  }
  return fm;
}

// 1 + 2: skills
const skillsDir = path.join(root, 'skills');
let skillFolders = [];
try {
  skillFolders = fs
    .readdirSync(skillsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
} catch (e) {
  fail(`Could not read skills/ directory: ${e.message}`);
}

if (skillFolders.length === 0) fail('No skills found under skills/');

for (const folder of skillFolders) {
  const skillFile = path.join(skillsDir, folder, 'SKILL.md');
  if (!fs.existsSync(skillFile)) {
    fail(`skills/${folder}/SKILL.md is missing`);
    continue;
  }
  let fm;
  try {
    fm = readFrontmatter(skillFile);
  } catch (e) {
    fail(`skills/${folder}/SKILL.md could not be read: ${e.message}`);
    continue;
  }
  if (!fm) {
    fail(`skills/${folder}/SKILL.md has no YAML frontmatter`);
    continue;
  }
  if (!fm.name) fail(`skills/${folder}/SKILL.md is missing 'name'`);
  if (!fm.description) fail(`skills/${folder}/SKILL.md is missing 'description'`);
  if (fm.name && fm.name !== folder) {
    fail(`skills/${folder}/SKILL.md name '${fm.name}' != folder '${folder}'`);
  }
  if (fm.name && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(fm.name)) {
    fail(`skill name '${fm.name}' is not kebab-case`);
  }
  // frontmatter may carry only name + description + license (repo convention)
  const allowed = new Set(['name', 'description', 'license']);
  for (const key of Object.keys(fm)) {
    if (!allowed.has(key)) {
      fail(`skills/${folder}/SKILL.md has unexpected frontmatter key '${key}' (only name, description, license allowed)`);
    }
  }
  // 2b: description contract — triggers, not a workflow summary
  if (fm.description && !/^Use when /.test(fm.description)) {
    fail(`skills/${folder}/SKILL.md description must start with "Use when "`);
  }
}

// 3 + 4: plugin manifest
const pluginPath = path.join(root, '.claude-plugin', 'plugin.json');
let plugin;
try {
  plugin = JSON.parse(fs.readFileSync(pluginPath, 'utf8'));
} catch (e) {
  fail(`.claude-plugin/plugin.json is not valid JSON: ${e.message}`);
}
let marketplace;
try {
  marketplace = JSON.parse(fs.readFileSync(path.join(root, '.claude-plugin', 'marketplace.json'), 'utf8'));
} catch (e) {
  fail(`.claude-plugin/marketplace.json is not valid JSON: ${e.message}`);
}

// marketplace version(s) must match the plugin version
if (plugin && marketplace) {
  if (marketplace.metadata && marketplace.metadata.version !== plugin.version) {
    fail(`marketplace.json metadata version '${marketplace.metadata.version}' != plugin version '${plugin.version}'`);
  }
  if (marketplace.plugins !== undefined && !Array.isArray(marketplace.plugins)) {
    fail(`marketplace.json 'plugins' must be an array`);
  } else {
    for (const entry of marketplace.plugins || []) {
      if (entry.version && entry.version !== plugin.version) {
        fail(`marketplace.json plugin '${entry.name}' version '${entry.version}' != plugin version '${plugin.version}'`);
      }
    }
  }
}

if (plugin) {
  if (!Array.isArray(plugin.skills)) {
    fail(`.claude-plugin/plugin.json 'skills' must be an array`);
  } else {
    const listed = [];
    for (const ref of plugin.skills) {
      if (typeof ref !== 'string') {
        fail(`plugin.json skill entry ${JSON.stringify(ref)} must be a string`);
        continue;
      }
      const normalized = ref.replace(/\\/g, '/').replace(/^\.\//, '').replace(/\/+$/, '');
      const segments = normalized.split('/');
      if (!normalized.startsWith('skills/') || segments.length !== 2) {
        fail(`plugin.json skill path '${ref}' must be of the form 'skills/<name>' or './skills/<name>'`);
        continue;
      }
      listed.push(segments[1]);
      const abs = path.join(root, ...segments);
      if (!fs.existsSync(abs) || !fs.statSync(abs).isDirectory()) {
        fail(`plugin.json lists skill path '${ref}', which is not an existing directory`);
      }
    }
    for (const folder of skillFolders) {
      if (!listed.includes(folder)) fail(`skills/${folder} is not listed in plugin.json`);
    }
    for (const s of listed) {
      if (!skillFolders.includes(s)) fail(`plugin.json lists '${s}' but skills/${s} does not exist`);
    }
  }
}

// 6: per-host plugin manifests valid + version-synced with the Claude manifest
for (const hostDir of ['.codex-plugin']) {
  const p = path.join(root, hostDir, 'plugin.json');
  if (!fs.existsSync(p)) continue;
  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch (e) {
    fail(`${hostDir}/plugin.json is not valid JSON: ${e.message}`);
    continue;
  }
  if (plugin && manifest.version !== plugin.version) {
    fail(`${hostDir}/plugin.json version '${manifest.version}' != .claude-plugin version '${plugin.version}'`);
  }
  if (plugin && manifest.description !== plugin.description) {
    fail(`${hostDir}/plugin.json description differs from the canonical .claude-plugin description`);
  }
  const skillsRef = typeof manifest.skills === 'string' ? manifest.skills : null;
  if (skillsRef) {
    const abs = path.resolve(root, skillsRef);
    const within = abs === root || abs.startsWith(root + path.sep);
    if (!within) {
      fail(`${hostDir}/plugin.json points skills at '${skillsRef}', which escapes the repo root`);
    } else if (!fs.existsSync(abs) || !fs.statSync(abs).isDirectory()) {
      fail(`${hostDir}/plugin.json points skills at '${skillsRef}', which is not an existing directory`);
    }
  }
}

// 5: drift between AGENTS.md and the Copilot adapter
function bodyOf(file) {
  let text = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  // strip a leading frontmatter block if present
  text = text.replace(/^---\n[\s\S]*?\n---(\n|$)/, '');
  return text.trim();
}
let agents, copilot;
try {
  agents = bodyOf(path.join(root, 'AGENTS.md'));
} catch (e) {
  fail(`Could not read AGENTS.md: ${e.message}`);
}
try {
  copilot = bodyOf(path.join(root, '.github', 'copilot-instructions.md'));
} catch (e) {
  fail(`Could not read .github/copilot-instructions.md: ${e.message}`);
}
if (agents !== undefined && copilot !== undefined && agents !== copilot) {
  fail('Drift: .github/copilot-instructions.md body does not match AGENTS.md');
}

if (warnings.length) {
  console.warn('Validation warnings:');
  for (const w of warnings) console.warn('  - ' + w);
}
if (errors.length) {
  console.error('Validation FAILED:');
  for (const e of errors) console.error('  - ' + e);
  process.exit(1);
}
console.log(`Validation passed: ${skillFolders.length} skill(s) OK, manifests valid, no drift.`);
