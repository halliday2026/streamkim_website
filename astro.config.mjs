// @ts-check
import { rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// DEPLOY TARGETS
// ─────────────────────────────────────────────────────────────────────────────
// Defaults are mode-aware: dev server gets localhost/no-prefix, builds get
// the GitHub Pages URL/base. Override either value with env vars (both
// locally and in CI). The || operator (not ??) treats empty strings as unset,
// which matters when GitHub Actions evaluates ${{ vars.SITE }} to "" when
// no repo variable is configured.
//
// Dev:           npm run dev               → localhost:4321/
// Build/CI:      npm run build             → halliday2026.github.io/streamkim_website/
// Custom domain: SITE=https://streamkim.com  BASE=/ npm run build
// ─────────────────────────────────────────────────────────────────────────────

const isDev = process.argv[2] === 'dev';

/**
 * Astro integration: removes src/pages/dev/** from production dist/.
 * Runs after the static build via astro:build:done so the files are
 * built (required for Astro's route manifest) then deleted before the
 * artifact is packaged. The dev server still serves these pages normally.
 */
function excludeDevPages() {
  return {
    name: 'exclude-dev-pages',
    hooks: {
      /** @param {{ dir: URL }} opts */
      'astro:build:done': async ({ dir }) => {
        const devDir = fileURLToPath(new URL('./dev/', dir));
        await rm(devDir, { recursive: true, force: true });
        console.log('[exclude-dev-pages] Removed dist/dev/ from production build ✓');
      },
    },
  };
}

export default defineConfig({
  site: process.env.SITE || (isDev ? 'http://localhost:4321' : 'https://halliday2026.github.io'),
  base: process.env.BASE || (isDev ? '/' : '/streamkim_website/'),
  output: 'static',
  integrations: [excludeDevPages()],
  vite: {
    plugins: [tailwindcss()],
  },
});
