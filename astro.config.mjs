// @ts-check
import { rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// DEPLOY TARGETS
// ─────────────────────────────────────────────────────────────────────────────
// Defaults are hardcoded to the GitHub Pages target so CI works without
// any repository variables needing to be set.
//
// Override by setting environment variables (locally or in CI):
//
// Local dev:       BASE=/ npm run dev  (omit to accept the /streamkim_website/ prefix)
//
// GitHub Pages:    SITE and BASE default to the values below — no vars needed.
//                  If you want to override: SITE=https://halliday2026.github.io
//                                           BASE=/streamkim_website/
//
// Custom domain:   SITE=https://streamkim.com  BASE=/
// ─────────────────────────────────────────────────────────────────────────────

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
  site: process.env.SITE || 'https://halliday2026.github.io',
  base: process.env.BASE || '/streamkim_website/',
  output: 'static',
  integrations: [excludeDevPages()],
  vite: {
    plugins: [tailwindcss()],
  },
});
