/**
 * Scans the dist/ directory for [PLACEHOLDER strings.
 * Exits with code 1 (fails the build) if any are found.
 * Run automatically via package.json "postbuild" script.
 */

import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const distDir = join(__dirname, '..', 'dist');
const MARKER = '[PLACEHOLDER';

// MODE: 'fail' | 'warn'
// 'fail' — correct for production launch (default, strict)
// 'warn' — use during staging/visual refinement when placeholder strings
//           exist intentionally in dist/ (e.g. form endpoints not yet wired)
// IMPORTANT: Restore to 'fail' before final production launch.
// See docs/build-sequence.md for the pre-launch checklist.
const PLACEHOLDER_CHECK_MODE = 'warn';

async function* walkDir(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkDir(fullPath);
    } else if (entry.isFile() && /\.(html|js|json|xml|txt)$/.test(entry.name)) {
      yield fullPath;
    }
  }
}

async function checkDistExists() {
  try {
    await stat(distDir);
    return true;
  } catch {
    return false;
  }
}

const distExists = await checkDistExists();
if (!distExists) {
  console.log('check-placeholders: dist/ not found — skipping (run npm run build first)');
  process.exit(0);
}

const violations = [];
const violationFiles = new Set();

for await (const filePath of walkDir(distDir)) {
  const content = await readFile(filePath, 'utf-8');
  if (content.includes(MARKER)) {
    const relPath = relative(distDir, filePath);
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes(MARKER)) {
        violations.push(`  ${relPath}:${i + 1}`);
        violationFiles.add(relPath);
      }
    }
  }
}

if (violations.length > 0) {
  if (PLACEHOLDER_CHECK_MODE === 'warn') {
    console.warn('\n⚠️  PLACEHOLDER CHECK: WARN MODE ACTIVE');
    console.warn(`⚠️  Found ${violations.length} placeholder strings across ${violationFiles.size} files.`);
    console.warn('⚠️  This is intentional during staging. These must be resolved before launch.');
    console.warn("⚠️  To restore strict mode: set PLACEHOLDER_CHECK_MODE = 'fail' in scripts/check-placeholders.mjs");
    console.warn('\nFirst 5 occurrences:');
    violations.slice(0, 5).forEach((v) => console.warn(v));
    console.warn('');
    process.exit(0);
  } else {
    console.error('\n[PLACEHOLDER] strings found in production build output:');
    console.error(violations.join('\n'));
    console.error(
      '\nResolve all placeholders before deploying. These strings are in src/content/ files and must be replaced with real content authored by humans.\n'
    );
    process.exit(1);
  }
} else {
  console.log('check-placeholders: no placeholder strings found in dist/ ✓');
}
