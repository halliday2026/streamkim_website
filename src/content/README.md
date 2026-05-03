# Content Authoring Guide — Stream Kim Website

This directory contains all site content as Markdown files with YAML frontmatter.
Each subdirectory is an Astro Content Collection with a Zod schema that validates
every file before the site builds. The full schema specification with field descriptions
and validation rules is in [`docs/content-models.md`](../docs/content-models.md).

---

## Collections Overview

| Directory | What it contains | One file per |
|-----------|-----------------|--------------|
| `attorneys/` | Attorney biography pages | Attorney |
| `practice-areas/` | Practice area pages | Practice area (9 total) |
| `notable-matters/` | Representative matter entries | Matter |
| `insights/` | Articles and client alerts | Article |

---

## Attorneys

Attorney pages are among the most-trafficked pages on the site. Each file becomes
one attorney bio page at `/attorneys/[filename-without-extension]`. The filename
(slug) must be lowercase, hyphen-separated, and match any cross-references from
other collections.

### Frontmatter template

```yaml
---
name: "Full Name"
title: Partner                       # Partner | Of Counsel | Associate
portrait: "filename.jpg"             # Optional; relative to src/assets/attorneys/
leadParagraph: >
  2–3 sentences in the attorney's voice positioning their practice and clientele.
  Written in first person or third person — pick one style and use it consistently.
practiceAreas:
  - public-entity-defense            # Must match filenames in practice-areas/
  - healthcare-law
notableMatters:                      # Optional; ethics review required before publishing
  - >
    2–4 sentences, no client identification (CRPC 7.1). E.g.: "Defended a Southern
    California city in a federal civil rights action. Jury returned a defense verdict."
barAdmissions:
  - "State Bar of California (#000000)"
  - "U.S. District Court, Central District of California"
education:
  - institution: "School Name"
    degree: "J.D."
    year: 2005
    honors: "Law Review"             # Optional
  - institution: "University Name"
    degree: "B.A., Political Science"
    year: 2002
clerkships:                          # Optional
  - judge: "Honorable Judge Name"
    court: "U.S. District Court, C.D. Cal."
    years: "2005–2006"
publications:                        # Optional
  - "Article title, Publication Name, Vol. X (Year)"
speakingEngagements:                 # Optional
  - "Conference Name, Topic, Year"
honors:                              # Optional; verify all claims before publishing
  - "Super Lawyers, Southern California, 2020–2024"
memberships:                         # Optional
  - "Riverside County Bar Association"
email: "name@streamkim.com"          # Optional
phone: "(951) 555-0000"              # Optional
order: 1                             # Optional; controls sort order on the index page
---

Attorney bio body copy goes here. 2–4 paragraphs. Can be written in third person or
first person — match the voice established in leadParagraph. This body content appears
below the structured data on the bio page.
```

### Easy to forget

- The filename becomes the URL slug. `jane-doe.md` → `/attorneys/jane-doe`
- `practiceAreas` values must exactly match filenames in `practice-areas/` (without `.md`)
- `title` must be exactly one of: `Partner`, `Of Counsel`, `Associate` (case-sensitive)
- `education[].year` is a number, not a string — do not quote it
- `honors` entries are verified ratings only — all claims are subject to CRPC 7.1 review
- `notableMatters` must not identify clients by name unless the client has authorized it

**Working example:** [`attorneys/placeholder-attorney-1.md`](attorneys/placeholder-attorney-1.md)

---

## Practice Areas

There are exactly nine practice areas. Each becomes one page at
`/practice-areas/[slug]`. Files should be named using the practice area slug
(e.g., `public-entity-defense.md`). The `order` field controls display order on
the homepage and practice areas index — it should match the strategic priority
ordering in `docs/strategic-brief.md` §5.2.

### Frontmatter template

```yaml
---
name: "Practice Area Full Name"
order: 1                             # 1–9; strategic priority (1 = highest)
tagline: >
  One-sentence positioning used in the homepage practice grid. Max 160 characters.
  Should name the client type, the practice, and the geography.
heroBody: >
  One paragraph (3–5 sentences) for the practice page hero. Who does the firm
  represent in this area? What kinds of matters? What is the firm's specific
  approach? Institutional tone, no superlatives.
capabilitiesList:
  - "Specific matter type or service"
  - "Another specific capability"
attorneys:
  - attorney-slug                    # Must match filenames in attorneys/
jurisdictionNotes: >                 # Optional
  Note on California courts and venues for this practice. Inland Empire courts,
  federal district courts, any specialized tribunals.
faqItems:                            # Optional; 5–8 items recommended for SEO
  - question: "Question text?"
    answer: >
      2–4 sentence answer. Plain language. No marketing-speak. Addresses a genuine
      question from a prospective client or referring attorney.
---

Practice area body copy. 800–1500 words total across the page. Use H2/H3 headings.
Actual notable matters and attorney cards are rendered from their respective
collections — do not duplicate that content in the body.
```

### Easy to forget

- The filename becomes the URL slug. `public-entity-defense.md` → `/practice-areas/public-entity-defense`
- `tagline` has a 160-character maximum — keep it to one sentence
- `attorneys` values must exactly match filenames in `attorneys/` (without `.md`)
- `order` should follow the strategic priority in the brief — do not sort alphabetically
- `capabilitiesList` items are the building block of the "What We Do" section — be specific

**Working example:** [`practice-areas/placeholder-practice-1.md`](practice-areas/placeholder-practice-1.md)

---

## Notable Matters

Representative matters are the firm's primary proof of experience. Each entry
becomes one filterable card on the `/notable-matters` page. Files can be named
anything descriptive; the filename is not used as a URL for individual matter pages.

**All notable matter descriptions must be ethics-reviewed by a Stream Kim partner
before the file's `draft` flag is removed (or before the entry is approved for
production) — California Rule of Professional Conduct 7.1.**

### Frontmatter template

```yaml
---
title: "Short Descriptive Title — No Client Names"
practiceArea: public-entity-defense  # Primary practice area slug
description: >
  2–4 sentences. Ethics-compliant framing (CRPC 7.1–7.5). No client identification
  unless the client has explicitly authorized it in writing. Describe the matter
  type, forum, and outcome in factual, restrained terms.
outcome: "Defense verdict"           # Optional: Defense verdict | Summary judgment |
                                     # Case dismissed | Favorable settlement | etc.
tags:                                # Optional; additional practice slugs for filtering
  - public-entity-defense
  - employment-law
attorneys:                           # Optional; slugs of attorneys who handled this matter
  - attorney-slug-1                  # Include to surface this matter on attorney bio pages
  - attorney-slug-2                  # Omit if the matter is not attorney-specific
order: 1                             # Optional; controls sort order within a practice
---

Optional extended description for contexts where more detail is shown.
```

### Easy to forget

- `practiceArea` and `tags` values must match practice-area filenames (without `.md`)
- Never include a client name unless the client has authorized it in writing
- `outcome` is optional but strongly recommended — it is a key credibility signal
- The matter description is governed by CRPC 7.1 — partner review is not optional

**Working example:** [`notable-matters/placeholder-matter-1.md`](notable-matters/placeholder-matter-1.md)

---

## Insights

Articles authored by attorneys. Each file becomes one article page at
`/insights/[slug]`. The filename is the URL slug. Set `draft: true` while an
article is being written or is awaiting attorney approval — draft articles are
excluded from production builds.

### Frontmatter template

```yaml
---
title: "Article Title"
publishDate: "2026-01-15"            # ISO date: YYYY-MM-DD
author: attorney-slug                # Must match a filename in attorneys/
practiceAreas:
  - public-entity-defense            # Must match filenames in practice-areas/
excerpt: >
  1–2 sentences for index pages and cards. Max 280 characters. Should convey
  the topic and key takeaway without requiring the reader to click through.
tags:                                # Optional; topic tags for filtering
  - government-claims-act
draft: false                         # Set true while drafting or awaiting review
featuredImage: "insights/image.jpg"  # Optional; relative to src/assets/
metaDescription: >                   # Optional; SEO override, max 160 chars
  Falls back to excerpt if not provided.
---

Article body copy. 600–1200 words. Written by or attributed to the named attorney.
Use H2/H3 headings. Include at least one concrete takeaway for the reader.
```

### Easy to forget

- The filename is the URL slug — keep it lowercase and hyphen-separated
- `author` must exactly match a filename in `attorneys/` (without `.md`)
- `excerpt` has a 280-character maximum — test it by counting before saving
- `draft: true` prevents the article from appearing in production — remove it only
  after the attorney has approved the final text
- `publishDate` is the public-facing date — use the intended publication date, not today

**Working example:** [`insights/placeholder-insight-1.md`](insights/placeholder-insight-1.md)

---

## Authoring Workflow

1. Copy the relevant frontmatter template from this README into a new `.md` file
   in the appropriate collection directory.
2. Name the file using the intended URL slug (lowercase, hyphens only, no spaces).
3. Replace all `[PLACEHOLDER — ...]` values with reviewed, approved content.
4. Run `npx astro check` to validate the schema — this catches type errors and
   missing required fields before you open a PR.
5. Run `npm run build` to confirm the full build succeeds with the new content.
6. Remove `draft: true` (insights only) only after the authoring attorney has
   reviewed and approved the final text.

---

## Ethics Reminder

All attorney bios, notable matter descriptions, and credential claims (honors,
bar memberships, recognitions) must be reviewed and approved by a Stream Kim
partner before publication. This is required by California Rule of Professional
Conduct 7.1, which prohibits false or misleading statements about legal services.
When in doubt, mark the file `draft: true` and get partner sign-off before it goes live.
