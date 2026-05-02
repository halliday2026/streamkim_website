# Build Sequence — Stream Kim Website

Ordered list of ~15 future Claude Code sessions. Each is scoped to a single working session.
Execute in order — later sessions depend on earlier ones.

Before each session: read `CLAUDE.md` (root), then the relevant spec in `docs/`.

---

## Session 01 — Foundation Complete ✓

**Title:** Astro scaffold, Tailwind, content schemas, working docs, BaseLayout
**Status:** This session (bootstrap). Skip and proceed to Session 02.

---

## Session 02 — Global Styles & Font Integration

**Title:** Brand theme, typography, global CSS, font loading verification

**Files to create/modify:**
- `src/styles/global.css` — add `@theme` block with brand colors; `@layer base` typography; focus styles; print styles
- `src/layouts/BaseLayout.astro` — verify font imports render correctly in browser

**Acceptance criteria:**
- `npm run dev` shows Source Serif 4 on headings, Inter on body in browser
- Brand color classes (`bg-navy`, `text-oxblood`, etc.) work in Tailwind markup
- Focus-visible outline renders at 2px navy on a test element
- No FOUT (flash of unstyled text) — fonts load from local npm package, not network
- `npx astro check` passes with zero errors

---

## Session 03 — Content Schemas & Placeholder Content

**Title:** Finalize Zod schemas, add placeholder .md files for all collections

**Files to create/modify:**
- `src/content/config.ts` — verify/adjust schemas after font session
- `src/content/attorneys/` — add 1 placeholder `.md` per attorney (attorney list from firm)
- `src/content/practice-areas/` — add 9 `.md` files (one per practice, in strategic order)
- `src/content/notable-matters/` — add 5 placeholder `.md` files
- `src/content/insights/` — add 3 placeholder `.md` files

**Acceptance criteria:**
- `npx astro check` passes with all collection schemas validating
- Each placeholder file has correct frontmatter with `[PLACEHOLDER` strings in all content fields
- `npm run build` fails (placeholder check triggers) — confirming the guard works
- `npm run build` passes after setting `draft: true` on insight placeholders (or using a test bypass)

---

## Session 04 — UI Primitives

**Title:** Button, Link, Card, FormField components (no pages yet)

**Files to create/modify:**
- `src/components/ui/Button.astro`
- `src/components/ui/Card.astro`
- `src/components/ui/FormField.astro`

**Acceptance criteria (per component):**
- All three variants render (primary/secondary/ghost for Button)
- All interactive states applied via Tailwind (hover, focus-visible, disabled)
- Focus ring visible in keyboard navigation
- WCAG AA color contrast on all variants
- TypeScript props interface matches spec in `docs/component-library.md`
- `npx astro check` passes

---

## Session 05 — Layout Shell (Header + Footer)

**Title:** Header and Footer components, BaseLayout wiring

**Files to create/modify:**
- `src/components/layout/Header.astro`
- `src/components/layout/Footer.astro`
- `src/layouts/BaseLayout.astro` — add Header and Footer slots
- `src/pages/index.astro` — minimal test page to verify layout renders

**Acceptance criteria:**
- Header renders logo, nav links, phone, "Schedule Consultation" CTA at all breakpoints
- Mobile hamburger menu opens/closes with keyboard; focus trap active; Escape closes
- Practice Areas nav item has mega-menu stub (can be static links for now)
- Footer renders full practice list, attorney list stub, address placeholder, disclaimer
- Skip-to-main-content link present and functional
- `npm run build` produces deployable `dist/`

---

## Session 06 — Homepage Section Components

**Title:** Hero, PracticeGrid, AttorneysPreview, NotableMattersStrip, InsightsPreview, GeographicPositioning, ContactCTA

**Files to create/modify:**
- `src/components/sections/Hero.astro`
- `src/components/sections/PracticeGrid.astro`
- `src/components/sections/PracticeCard.astro`
- `src/components/sections/AttorneysPreview.astro`
- `src/components/sections/AttorneyCard.astro`
- `src/components/sections/NotableMattersStrip.astro`
- `src/components/sections/NotableMatterCard.astro`
- `src/components/sections/InsightsPreview.astro`
- `src/components/sections/InsightCard.astro`
- `src/components/sections/GeographicPositioning.astro`
- `src/components/sections/ContactCTA.astro`
- `src/components/ui/IntakeForm.astro`

**Acceptance criteria:**
- Each component renders with placeholder props
- No component reads from content collections yet (collections wired in Session 07)
- All acceptance criteria from `docs/component-library.md` met
- Responsive at sm/md/lg breakpoints

---

## Session 07 — Homepage Page

**Title:** Wire homepage sections to content collections

**Files to create/modify:**
- `src/pages/index.astro` — full homepage using Session 06 components + real collection data

**Acceptance criteria:**
- All 7 homepage sections rendered in order (Hero, PracticeGrid, AttorneysPreview, NotableMattersStrip, InsightsPreview, GeographicPositioning, ContactCTA)
- Data sourced from `src/content/` collections (not hardcoded)
- Placeholder strings visible (acceptable at this stage — build check still fails)
- Passes axe DevTools automated scan with zero critical violations
- Lighthouse Performance ≥ 90, Accessibility ≥ 95

---

## Session 08 — Practice Area Pages

**Title:** Practice area page template and all 9 pages

**Files to create/modify:**
- `src/pages/practice-areas/[slug].astro` — dynamic route
- `src/pages/practice-areas/index.astro` — practice areas overview page

**Acceptance criteria:**
- All 9 practice area pages render from content collections
- Template includes: hero, overview body, capabilities list, attorneys section, insights section, FAQ section, jurisdiction note, ContactCTA
- BreadcrumbList schema injected in `<head>`
- LegalService schema injected
- `npx astro check` passes
- Internal links: each practice page links to its attorneys and to 3 tagged insights

---

## Session 09 — Attorney Pages

**Title:** Attorney bio page template and all attorney pages

**Files to create/modify:**
- `src/pages/attorneys/[slug].astro` — dynamic route
- `src/pages/attorneys/index.astro` — attorneys index page

**Acceptance criteria:**
- All attorney pages render from collection data
- Bio page template: portrait, name/title, lead paragraph, notable matters, practice areas, bar admissions, education, clerkships, publications, honors, memberships, contact form
- Person schema injected
- Portrait renders via Astro `<Image>` component; graceful fallback when no portrait file
- Each attorney page links back to their practice areas and authored insights

---

## Session 10 — Insights (Blog)

**Title:** Insights index, article template, topic filtering

**Files to create/modify:**
- `src/pages/insights/index.astro`
- `src/pages/insights/[slug].astro`
- `src/pages/insights/topic/[tag].astro` (optional — can be a later session)

**Acceptance criteria:**
- Insights index filters by practice area; sorted by date descending; draft articles excluded
- Article page: full reading layout (~700px), author byline with portrait + bio link, related articles, practice area tags
- Article schema (Article + Person) injected
- Newsletter signup section at end (stub — can wire in later session)

---

## Session 11 — Notable Matters Page

**Title:** Notable matters index with practice area filtering

**Files to create/modify:**
- `src/pages/notable-matters/index.astro`

**Acceptance criteria:**
- Filterable by practice area (static filter via URL param or client-side JS)
- Each matter: title, description, outcome, practice area tag
- Ethics-compliant framing confirmed (no client names in any content)
- Links back to relevant practice pages

---

## Session 12 — Contact Page & Form Integration

**Title:** Contact page and Formspree/Web3Forms integration

**Files to create/modify:**
- `src/pages/contact/index.astro`
- `src/components/ui/IntakeForm.astro` — wire to third-party endpoint

**Pre-requisite:** Choose Formspree or Web3Forms; obtain endpoint URL from client.

**Acceptance criteria:**
- Form submits successfully to third-party handler (test with real submission)
- Success and error states display correctly
- Attorney-client disclaimer present
- Map or address block present
- All form accessibility requirements met (labels, aria-invalid, aria-live)

---

## Session 13 — SEO Layer

**Title:** Sitemap, robots.txt, all schema markup, meta tags, canonical URLs

**Files to create/modify:**
- `astro.config.mjs` — add `@astrojs/sitemap` integration
- `public/robots.txt`
- `src/layouts/BaseLayout.astro` — Organization + LocalBusiness schema
- Each page template — page-specific schema (LegalService, Person, Article, BreadcrumbList)

**Acceptance criteria:**
- `sitemap.xml` generated at build; draft articles excluded
- `robots.txt` present with sitemap pointer
- Every page has unique title + meta description (no template defaults)
- Canonical URL on every page
- OG and Twitter Card tags on every page
- All 6 schema types implemented per `docs/seo-checklist.md`
- Google Search Console: submit sitemap (requires DNS access)

---

## Session 14 — Accessibility Audit & Remediation

**Title:** Full WCAG 2.1 AA audit and fix pass

**Files to modify:** Any files flagged by audit tools.

**Acceptance criteria:**
- axe DevTools: zero violations on all page templates
- WAVE: zero errors
- Lighthouse Accessibility: ≥ 95 on all pages
- Manual keyboard test: all interactive elements reachable and operable
- Screen reader test (NVDA + Chrome): landmarks, headings, forms announced correctly
- Accessibility statement page live at `/accessibility`

---

## Session 15 — Performance, Polish & Deploy Prep

**Title:** Performance audit, Core Web Vitals, final QA, deployment

**Files to modify:** As needed based on audit findings.

**Acceptance criteria:**
- Lighthouse Performance ≥ 95 on all page templates
- LCP < 2.0s, CLS < 0.05 on mobile (Chrome DevTools)
- All images converted to WebP via Astro `<Image>` (no raw JPG/PNG served)
- No `[PLACEHOLDER` strings in any content file (all content authored and approved)
- `npm run build` completes without errors (placeholder check passes — no placeholders remain)
- `dist/` output verified: sitemap.xml, robots.txt, all pages present
- GitHub Pages deployment workflow tested end-to-end
- 301 redirect map implemented for any old URLs
- Google Analytics 4 tag installed (requires client GA property ID)
- Google Search Console verified
