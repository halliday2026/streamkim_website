# CLAUDE.md — Stream Kim Website

> **Strategic context:** Read [`docs/strategic-brief.md`](docs/strategic-brief.md) for positioning,
> voice, and design rationale. The brief is background context. The files in `docs/` are the
> authoritative, executable working specs — use those for implementation decisions.

---

## Project Mission

Stream Kim Hicks Wrage & Alfaro, P.C. is a Riverside civil litigation firm with over a century of
combined experience representing public entities, healthcare providers, and businesses in their most
complex disputes. This site repositions the firm at the elite civil-litigation tier — restrained,
content-forward, and locally rooted in the Inland Empire. Every implementation decision serves one
outcome: a general counsel or public agency administrator lands on the site and concludes within
ten seconds that this is the firm to call.

---

## Locked Technical Decisions

Do not deviate from these without explicit instruction:

| Decision | Choice |
|----------|--------|
| Framework | Astro (latest stable — currently 6.x) |
| Language | TypeScript, strict mode (`astro/tsconfigs/strict`) |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite` — CSS `@theme` config (no tailwind.config.mjs) |
| Content | Markdown + Astro Content Collections with Zod schemas (Astro 6+ `src/content.config.ts` with `glob()` loaders — do NOT use legacy `src/content/config.ts`) |
| Package manager | npm |
| Deployment | GitHub Pages (static output; `SITE` and `BASE` set via repo variables) |
| Node version | ≥ 22.12.0 (LTS) |
| Forms | Third-party handler only (Formspree or Web3Forms) — no backend |
| Images | Astro `<Image>` component; source files in `src/assets/` |
| Display font | Source Serif 4 Variable (`@fontsource-variable/source-serif-4`) |
| Body font | Inter Variable (`@fontsource-variable/inter`) |

---

## Voice Rules

**Use:**
- "We represent public entities in their most sensitive matters."
- "Stream Kim has tried over [X] cases to verdict in California state and federal courts."
- "Our healthcare practice advises hospital systems and ambulance providers on regulatory and litigation matters."
- Institutional, confident, restrained. Assumes a sophisticated reader.

**Avoid — forbidden words and phrases:**
- premier, award-winning, #1, top-rated, leading, best
- trust, passionate, dedicated, committed, family, community-focused
- Exclamation points in body copy or CTAs
- "Don't hesitate to call"
- "We are here for you"
- Sales-page CTAs ("Act now", "Call today for a free consultation")
- Any superlative that isn't substantiated by a specific, verifiable fact

---

## Forbidden Patterns

These must never appear in a build:

1. **Stock photography** — no gavels, scales of justice, marble columns, handshakes, generic suits.
   Use original attorney portraiture and Riverside architectural photography only.
2. **Fabricated content** — never invent attorney credentials, bar admissions, notable matters,
   case outcomes, recognitions, or firm statistics. All such content must come from human-authored
   files in `src/content/`.
3. **Animated counters** — the current site has a broken "0+ Cases / 0% Success" counter. Do not
   recreate any animated stat blocks.
4. **Carousels / sliders** — no rotating content of any kind. Static grids only.
5. **Marketing vocabulary** — see Voice Rules above.
6. **Placeholder strings in production** — `[PLACEHOLDER` strings in source are allowed during
   development; the `postbuild` script (`scripts/check-placeholders.mjs`) fails the build if any
   survive into `dist/`.

---

## Non-Obvious Implementation Decisions

These decisions look like they could be simplified or "improved" but must not be changed without understanding why they were made.

**1. `astro.config.mjs` uses `||` not `??` for env var fallbacks**
GitHub Actions evaluates `${{ vars.SITE }}` to `""` (empty string) when the repo variable is unset — not `null` or `undefined`. `??` (nullish coalescing) does not treat empty string as falsy, so `"" ?? fallback` returns `""`, and Astro would receive `site: ""` — an invalid URL causing a CI build failure. `||` treats empty string as falsy and falls through correctly. Do not modernize `||` to `??` in `astro.config.mjs`.

**2. `astro.config.mjs` uses `process.argv[2] === 'dev'` for mode detection**
`npm run dev` needs `site: localhost` and `base: /` while production builds need the GitHub Pages URL and base path. `process.argv[2]` is the most direct signal — it's literally the command Astro was invoked with. Do not replace this with `import.meta.env.MODE` (Astro internals, subject to change) without a specific reason.

**3. GitHub Pages defaults are hardcoded in `astro.config.mjs`**
`site: 'https://halliday2026.github.io'` and `base: '/streamkim_website/'` are the hardcoded production defaults. When the site moves to a custom domain, update both the defaults in `astro.config.mjs` and the comments in `.github/workflows/deploy.yml`. The `SITE`/`BASE` env vars (set via GitHub repo Actions variables) can override these without code changes — useful for staging — but the defaults are intentionally hardcoded for simplicity.

**4. `/dev/` pages are excluded via a build-time Astro integration, not runtime gating**
`src/pages/dev/` contains dev-only pages (component showcase, etc.) that must not appear in production output. The exclusion happens via the `excludeDevPages` integration in `astro.config.mjs`, which deletes `dist/dev/` in the `astro:build:done` hook. Runtime gating with `import.meta.env.DEV` does not work for static output — Astro pages render at build time, not at request time. Any new page added under `src/pages/dev/` is automatically excluded; do not add a second exclusion mechanism.

**5. `check-placeholders.mjs` scans `dist/`, not `src/`**
`[PLACEHOLDER — ...]` strings are allowed and expected in `src/content/` during development. The postbuild script only fails if those strings reach `dist/`. A placeholder string in a source file will not break the build until something renders it into production output — which is intentional, so content stubs can live in source while page templates are being built.

**6. Validator-required fields cannot use `[PLACEHOLDER]` strings**
Zod schemas with format validators (email, coerce.date, numeric range, URL) reject `[PLACEHOLDER — ...]` strings because they fail validation. For these fields, use syntactically valid but obviously synthetic values:

- Email: `placeholder@example.com`
- Date: `2026-01-01` or another obviously placeholder date
- Year (number): `0` or `2000`
- URL: `https://example.com`

The `[PLACEHOLDER]` convention applies to free-text string fields only. Validator-required fields surface in the postbuild check via the synthetic values themselves — `placeholder@example.com` reaching production is the signal that real data is missing.

---

## File Structure Conventions

```
src/
  assets/          Original images (attorney portraits, office photos, logo files)
  components/
    layout/        Header, Footer, Navigation — site-wide structural components
    sections/      Page-section components (Hero, PracticeGrid, AttorneysPreview, etc.)
    ui/            Primitive components (Button, Card, Link, FormField)
  content/
    attorneys/       One .md file per attorney
    practice-areas/  One .md file per practice area (9 total)
    notable-matters/ One .md file per representative matter
    insights/        One .md file per article
  content.config.ts  Zod schemas for all collections (Astro 6+ — sibling of src/content/, NOT inside it)
  layouts/         BaseLayout.astro and any page-specific layout wrappers
  pages/           Astro page files — one per route
  styles/          global.css (Tailwind base + brand theme)

docs/              Working specifications (not deployed)
scripts/           Build utilities (check-placeholders.mjs, etc.)
.github/workflows/ GitHub Actions (deploy.yml)
```

Content files in `src/content/` are the source of truth for all client-facing facts. Do not
hardcode attorney names, case descriptions, recognitions, or statistics anywhere in `.astro` or
`.ts` files — query them from collections.

---

## Commit Message Conventions

Use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` new page, new component, new functionality
- `fix:` bug fix
- `docs:` changes to docs/, CLAUDE.md, README.md
- `chore:` config changes, dependency updates, tooling
- `content:` changes to src/content/ files
- `style:` CSS / Tailwind changes with no logic change
- `refactor:` code restructure without behavior change
- `test:` adding or fixing tests

Examples:
```
feat: add PracticeGrid section component
content: add attorney bio for [name]
chore: upgrade Astro to 6.3.0
fix: correct canonical URL on practice area pages
```

---

## Never-Invent Rule

Claude Code must never fabricate:
- Attorney names, titles, bar numbers, or credentials
- Education, clerkships, or honors
- Notable matters or case outcomes
- Client names or descriptions
- Firm history, founding dates, or attorney counts
- Any statistic prefaced with a number

If content is needed that doesn't yet exist in `src/content/`, use a clearly marked placeholder:
`[PLACEHOLDER — pending attorney review]`

The build will fail if this string reaches `dist/`.
