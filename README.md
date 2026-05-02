# Stream Kim Hicks Wrage & Alfaro, P.C. — Website

Website for Stream Kim Hicks Wrage & Alfaro, P.C., a Riverside civil litigation firm.

## Tech Stack

| | |
|---|---|
| Framework | [Astro 6](https://astro.build) |
| Language | TypeScript (strict mode) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) via `@tailwindcss/vite` |
| Content | Markdown + [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/) |
| Fonts | Source Serif 4 + Inter (via [Fontsource](https://fontsource.org), loaded from npm) |
| Deployment | GitHub Pages (static output) |

## Local Development

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:4321`.

## Build

```bash
npm run build
```

Output goes to `dist/`. The build also runs `scripts/check-placeholders.mjs` to fail if any
`[PLACEHOLDER` strings appear in the output — all placeholder content must be replaced before
deploying.

## Deployment (GitHub Pages)

Set these repository variables in **Settings → Variables → Actions**:

| Variable | Value |
|----------|-------|
| `SITE` | `https://halliday2026.github.io` (or custom domain) |
| `BASE` | `/streamkim_website` (or empty for custom domain) |

The GitHub Actions workflow (`.github/workflows/deploy.yml`) deploys automatically on push to
`main`.

## Project Documentation

All working specs live in [`docs/`](docs/):

| File | Contents |
|------|----------|
| [`docs/strategic-brief.md`](docs/strategic-brief.md) | Background context — positioning, voice, competitive benchmarks |
| [`docs/design-system.md`](docs/design-system.md) | Colors, typography, components, spacing |
| [`docs/content-models.md`](docs/content-models.md) | Zod schemas, frontmatter templates, example content |
| [`docs/component-library.md`](docs/component-library.md) | Component specs with props, variants, and acceptance criteria |
| [`docs/seo-checklist.md`](docs/seo-checklist.md) | Title rules, schema markup, internal linking matrix |
| [`docs/accessibility.md`](docs/accessibility.md) | WCAG 2.1 AA requirements and pre-launch audit checklist |
| [`docs/build-sequence.md`](docs/build-sequence.md) | Ordered list of ~15 future build sessions |

**For Claude Code sessions:** Read [`CLAUDE.md`](CLAUDE.md) first. It contains voice rules,
forbidden patterns, commit conventions, and the never-invent rule for legal content.

## Content

Content files are in `src/content/`. Each collection has one Markdown file per record:

- `src/content/attorneys/` — one `.md` per attorney
- `src/content/practice-areas/` — one `.md` per practice area (9 total)
- `src/content/notable-matters/` — one `.md` per representative matter
- `src/content/insights/` — one `.md` per article

**Never fabricate** attorney credentials, case descriptions, or firm statistics. All factual
content must be authored and approved by Stream Kim attorneys before publication.

## Legal

This is a private project. All content is confidential and proprietary.
