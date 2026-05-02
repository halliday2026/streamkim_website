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

## File Structure Conventions

```
src/
  assets/          Original images (attorney portraits, office photos, logo files)
  components/
    layout/        Header, Footer, Navigation — site-wide structural components
    sections/      Page-section components (Hero, PracticeGrid, AttorneysPreview, etc.)
    ui/            Primitive components (Button, Card, Link, FormField)
  content/
    attorneys/     One .md file per attorney
    practice-areas/ One .md file per practice area (9 total)
    notable-matters/ One .md file per representative matter
    insights/      One .md file per article
    config.ts      Zod schemas for all collections
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
