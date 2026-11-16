// Driver for ai-excited-01. The harness runs `node /bot/main.ts` on
// Node 22, which strips types natively. It copies the entry image to
// /output/entry.png. Outside a container MAKEFUN_OUTPUT_DIR stands in
// for /output.

import { copyFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, 'entry.png');
const dest = join(outputDir, 'entry.png');

if (!existsSync(source)) {
  throw new Error('entry.png missing from the repository');
}

mkdirSync(outputDir, { recursive: true });
copyFileSync(source, dest);

// Fail loudly instead of shipping an empty output.
if (statSync(dest).size === 0) {
  throw new Error('entry.png copied empty');
}
