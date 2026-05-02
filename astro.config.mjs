// @ts-check
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

export default defineConfig({
  site: process.env.SITE ?? 'http://localhost:4321',
  base: process.env.BASE ?? '/',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
