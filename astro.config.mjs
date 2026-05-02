// @ts-check
import { rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// DEPLOY TARGETS
// ─────────────────────────────────────────────────────────────────────────────
// Local dev:       no env vars needed — site/base default to localhost values
//                  npm run dev
//
// GitHub Pages:    set in repo Settings → Variables → Actions
//                  SITE = https://halliday2026.github.io
//                  BASE = /streamkim_website
//                  (or whatever the repo slug is)
//
// Custom domain:   SITE = https://streamkim.com
//                  BASE = (leave unset or empty)
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
  site: process.env.SITE ?? 'http://localhost:4321',
  base: process.env.BASE ?? '/',
  output: 'static',
  integrations: [excludeDevPages()],
  vite: {
    plugins: [tailwindcss()],
  },
});
