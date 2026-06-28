import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..', '..');
const skillsDir = path.join(root, 'skills');
const agentsPath = path.join(root, 'AGENTS.md');
const marker = '# greybeard';

function readInstructions() {
  return fs.readFileSync(agentsPath, 'utf8').trim();
}

function alreadyInjected(system) {
  return system.some((entry) => typeof entry === 'string' && entry.includes(marker));
}

export default async () => ({
  config: async (config) => {
    config.skills = config.skills || {};
    config.skills.paths = config.skills.paths || [];
    if (!config.skills.paths.includes(skillsDir)) {
      config.skills.paths.push(skillsDir);
    }
  },

  'experimental.chat.system.transform': async (_input, output) => {
    if (!Array.isArray(output.system)) {
      output.system = [];
    }
    if (!alreadyInjected(output.system)) {
      output.system.push(readInstructions());
    }
  },
});
