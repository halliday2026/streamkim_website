# Content Models — Stream Kim Website

All collections are defined in `src/content.config.ts` using Astro 6 Content Collections + Zod.
Note: In Astro 6, the config is at `src/content.config.ts` (NOT `src/content/config.ts`) and uses
`glob` loaders. This document is the annotated reference; the schema file is the source of truth.

---

## Attorney

**File location:** `src/content/attorneys/<slug>.md`
**One file per attorney.** The slug becomes the URL path segment (`/attorneys/[slug]`).

### Schema

| Field | Type | Required | Validation | Purpose |
|-------|------|----------|------------|---------|
| `name` | string | yes | — | Full name as displayed on the site |
| `title` | enum | yes | Partner \| Of Counsel \| Associate | Firm title |
| `portrait` | string | no | — | Path relative to `src/assets/attorneys/` |
| `leadParagraph` | string | yes | — | 2–3 sentences in attorney's voice; bio page hero |
| `practiceAreas` | string[] | yes | — | Slugs matching practice-areas collection |
| `notableMatters` | string[] | no | — | Ethics-compliant case descriptions (no client names) |
| `barAdmissions` | string[] | yes | — | e.g. "State Bar of California (#123456)" |
| `education` | object[] | yes | — | Array of {institution, degree, year, honors?} |
| `clerkships` | object[] | no | — | Array of {judge, court, years} |
| `publications` | string[] | no | — | Article or brief citations |
| `speakingEngagements` | string[] | no | — | Conference name, topic, year |
| `honors` | string[] | no | — | Verified ratings only (Super Lawyers, AV Preeminent, etc.) |
| `memberships` | string[] | no | — | Professional and community organizations |
| `email` | string | no | email format | Direct contact email |
| `phone` | string | no | — | Direct line |
| `order` | number | no | min 1 | Display order on attorneys index (lower = first) |

### Notable matters authoring workflow (dual-source)

During the placeholder phase, attorney bios reference notable matters two ways:

1. **Via the `notable-matters` collection** — structured entries with `title`, `outcome`, and `tags`,
   where the matter's `attorneys` array includes the attorney's slug. These render as rich cards in
   `AttorneyNotableMatters`.
2. **Via the attorney's frontmatter `notableMatters: string[]`** — inline strings for matters not yet
   in the collection. These render as simpler text blocks below the collection cards.

**Deduplication rule:** Once a matter is added to the `notable-matters` collection with the
attorney's slug, remove the corresponding inline string from the attorney's frontmatter. The
collection entry is the authoritative version — do not maintain both.

### Frontmatter Template

```yaml
---
name: "[PLACEHOLDER — Attorney Full Name]"
title: Partner
portrait: "[PLACEHOLDER — filename.jpg in src/assets/attorneys/]"
leadParagraph: >
  [PLACEHOLDER — 2–3 sentences in this attorney's voice. Example: "I focus my practice
  on representing public agencies and government entities in complex civil litigation.
  My clients include cities, counties, school districts, and special districts across
  the Inland Empire and throughout California."]
practiceAreas:
  - public-entity-defense
  - employment-law
notableMatters:
  - >
    [PLACEHOLDER — Defended a Southern California city in a federal civil rights action
    alleging excessive force. Case dismissed on qualified immunity grounds prior to trial.]
barAdmissions:
  - "State Bar of California"
  - "U.S. District Court, Central District of California"
education:
  - institution: "[PLACEHOLDER — University Name]"
    degree: "J.D."
    year: 2005
    honors: "[PLACEHOLDER — Law Review, Order of the Coif, etc. — omit if none]"
  - institution: "[PLACEHOLDER — University Name]"
    degree: "B.A., [Major]"
    year: 2002
honors:
  - "[PLACEHOLDER — Super Lawyers, Southern California, 2022–2024 — verify before publishing]"
memberships:
  - "Riverside County Bar Association"
email: "[PLACEHOLDER — attorney@streamkim.com]"
order: 1
---

[PLACEHOLDER — Attorney bio body copy. This is where the long-form narrative goes.
This section appears below the structured data on the bio page. Can include a
personal note about the attorney's approach, community involvement, or background.
Aim for 2–4 paragraphs.]
```

### Example Record

```yaml
---
name: "Jane M. Doe"
title: Partner
portrait: "jane-doe.jpg"
leadParagraph: >
  Jane Doe represents public agencies and healthcare systems in complex civil litigation,
  with a focus on cases that go to trial. She has tried over 20 cases to verdict in
  California state and federal courts across the Inland Empire.
practiceAreas:
  - public-entity-defense
  - healthcare-law
notableMatters:
  - >
    Defended a regional hospital system in a multi-plaintiff EMTALA action in federal court.
    Obtained summary judgment on all federal claims; state claims settled favorably.
  - >
    Represented a Southern California school district in a Title IX action. Jury returned
    a defense verdict after a two-week trial.
barAdmissions:
  - "State Bar of California (#987654)"
  - "U.S. District Court, Central District of California"
  - "U.S. District Court, Eastern District of California"
education:
  - institution: "UCLA School of Law"
    degree: "J.D."
    year: 2003
    honors: "Law Review"
  - institution: "UC Berkeley"
    degree: "B.A., Political Science"
    year: 2000
    honors: "Phi Beta Kappa"
honors:
  - "Super Lawyers, Southern California, 2019–2024"
  - "AV Preeminent — Martindale-Hubbell"
memberships:
  - "Riverside County Bar Association"
  - "California State Bar — Litigation Section"
email: "jdoe@streamkim.com"
phone: "(951) 555-0100"
order: 1
---

Jane has built her practice around the belief that institutions — public and private — deserve
skilled trial counsel when their work is challenged in court. She joined Stream Kim in 2008 after
clerking for the Honorable [Judge Name] in the Central District of California.
```

---

## Practice Area

**File location:** `src/content/practice-areas/<slug>.md`
**Nine files total** (see strategic ordering in brief §5.2).

### Schema

| Field | Type | Required | Validation | Purpose |
|-------|------|----------|------------|---------|
| `name` | string | yes | — | Full practice area name |
| `order` | number | yes | 1–20 | Strategic display order (1 = highest priority) |
| `tagline` | string | yes | max 160 chars | One-sentence positioning for homepage grid |
| `heroBody` | string | yes | — | One paragraph for the practice page hero |
| `capabilitiesList` | string[] | yes | — | Specific services within this practice |
| `attorneys` | string[] | yes | — | Slugs of attorneys active in this practice |
| `jurisdictionNotes` | string | no | — | CA-specific statutes, local courts |
| `faqItems` | object[] | no | — | Array of {question, answer} for SEO FAQs |

### Frontmatter Template

```yaml
---
name: "[PLACEHOLDER — Practice Area Name]"
order: 1
tagline: >
  [PLACEHOLDER — One sentence. E.g.: "Defending public agencies in civil rights actions,
  employment disputes, and government liability claims across California."]
heroBody: >
  [PLACEHOLDER — One paragraph positioning statement. Who does the firm represent in this
  practice? What kinds of matters? What is the firm's specific approach?]
capabilitiesList:
  - "[PLACEHOLDER — Specific service or matter type within this practice]"
  - "[PLACEHOLDER — Another specific capability]"
attorneys:
  - "[PLACEHOLDER — attorney-slug]"
jurisdictionNotes: >
  [PLACEHOLDER — E.g.: "Stream Kim's attorneys regularly appear in Riverside Superior Court,
  San Bernardino Superior Court, and the U.S. District Court for the Central and Eastern
  Districts of California. Firm attorneys are familiar with local court rules and judicial
  preferences in the Inland Empire."]
faqItems:
  - question: "[PLACEHOLDER — Frequently asked question relevant to this practice area]"
    answer: >
      [PLACEHOLDER — 2–4 sentence answer. Written for both SEO value and client education.
      Plain language, no marketing-speak.]
---

[PLACEHOLDER — Practice area body copy. 800–1500 words total across the page.
Include: overview (2–3 paragraphs), representative matters section header,
attorney attribution section header, related insights section header.
Actual matters and attorney cards are rendered from content collections,
not written in this body.]
```

### Example Record (Public Entity Defense)

```yaml
---
name: "Public Entity Defense"
order: 1
tagline: >
  Defending cities, counties, school districts, and special districts in civil rights
  actions, tort claims, and government liability litigation across California.
heroBody: >
  Stream Kim's public entity practice is the firm's longest-standing and deepest area of
  work. We represent public agencies across the full range of civil litigation they face —
  from section 1983 civil rights actions and Pitchess motions to inverse condemnation,
  employment disputes, and Government Claims Act compliance. Our attorneys understand
  the specific pressures public agencies face: constrained budgets, political visibility,
  and the need to defend the public interest without creating precedent that exposes the
  agency to future liability.
capabilitiesList:
  - "§1983 civil rights actions (excessive force, First Amendment, due process)"
  - "Pitchess motions and peace officer personnel records"
  - "Government Claims Act — filing, defense, and pre-litigation strategy"
  - "Public agency employment litigation (discrimination, harassment, wrongful termination)"
  - "Inverse condemnation and regulatory takings"
  - "Police and fire department defense"
  - "School district liability (Title IX, special education, student civil rights)"
  - "Public works and infrastructure claims"
attorneys:
  - jane-doe
  - john-smith
jurisdictionNotes: >
  Stream Kim attorneys regularly appear in Riverside Superior Court, San Bernardino
  Superior Court, the U.S. District Court for the Central District of California (Riverside
  and Los Angeles divisions), and the Ninth Circuit Court of Appeals. We are familiar with
  the procedural practices and judicial preferences of Inland Empire courts, and work
  closely with county counsel and city attorney offices throughout the region.
faqItems:
  - question: "What is the Government Claims Act, and when does it apply?"
    answer: >
      California's Government Claims Act (Gov. Code §810 et seq.) requires a claimant to
      file a written claim with a public agency before suing for money damages. For personal
      injury and property damage, the deadline is six months from the date of the incident.
      Failure to file a timely claim is a complete defense to the lawsuit in most cases.
      Stream Kim advises public agencies on claims response strategy and defends agencies
      when claimants proceed to litigation.
---

Stream Kim's public entity attorneys have represented California public agencies in civil
litigation for decades. The practice encompasses the full scope of government liability —
constitutional torts, employment disputes, land use challenges, and the complex procedural
landscape that applies when a public agency is the defendant.

[PLACEHOLDER — Additional body copy sections pending partner review. Target 800–1500 total
words per practice page including hero, overview, capabilities, FAQ, and jurisdiction note.]
```

---

## Notable Matter

**File location:** `src/content/notable-matters/<slug>.md`
**Target: 20–30 matters at launch.** Slugs are arbitrary; use descriptive kebab-case names.

### Schema

| Field | Type | Required | Validation | Purpose |
|-------|------|----------|------------|---------|
| `title` | string | yes | — | Short descriptive title (no client names) |
| `practiceArea` | string | yes | — | Primary practice area slug |
| `description` | string | yes | — | 2–4 sentences, CRPC 7.1-compliant |
| `outcome` | string | no | — | e.g. "Defense verdict", "Summary judgment" |
| `tags` | string[] | no | default: [] | Additional practice slugs for filtering |
| `order` | number | no | min 1 | Display order within practice area |

### Frontmatter Template

```yaml
---
title: "[PLACEHOLDER — Short descriptive title without client name]"
practiceArea: public-entity-defense
description: >
  [PLACEHOLDER — 2–4 sentences. Ethics-compliant framing per CRPC 7.1–7.5. No client
  identification unless explicitly authorized. E.g.: "Defended a Southern California
  city in a federal civil rights action arising from a police use-of-force incident.
  Plaintiff sought $2.5 million in damages. The jury returned a defense verdict after
  a five-day trial in the Central District of California."]
outcome: "[PLACEHOLDER — Defense verdict / Summary judgment granted / Case dismissed / etc.]"
tags:
  - public-entity-defense
order: 1
---
```

### Example Records

```yaml
---
title: "Defense Verdict — Municipal Police Use-of-Force Action"
practiceArea: public-entity-defense
description: >
  Defended a Southern California city and two police officers in a federal civil rights
  action under 42 U.S.C. § 1983 alleging excessive force during a traffic stop. Plaintiff
  sought $1.8 million in compensatory and punitive damages. Following a four-day trial in
  the U.S. District Court for the Central District of California, the jury returned a
  complete defense verdict.
outcome: "Defense verdict"
tags:
  - public-entity-defense
order: 1
---
```

```yaml
---
title: "Summary Judgment — EMTALA and State Law Claims, Regional Hospital System"
practiceArea: healthcare-law
description: >
  Represented a regional hospital system and its emergency department physicians in a
  multi-plaintiff federal action alleging violations of the Emergency Medical Treatment
  and Labor Act (EMTALA) and related state-law negligence claims. Obtained summary
  judgment on all federal claims before trial; state-law claims were resolved favorably
  at mediation.
outcome: "Summary judgment on federal claims; favorable mediation resolution"
tags:
  - healthcare-law
order: 1
---
```

---

## Insight Article

**File location:** `src/content/insights/<slug>.md`
**Target: 12–15 articles at launch.** Slug becomes the URL path (`/insights/[slug]`).

### Schema

| Field | Type | Required | Validation | Purpose |
|-------|------|----------|------------|---------|
| `title` | string | yes | — | Article title |
| `publishDate` | date | yes | coerced | ISO date string (YYYY-MM-DD) |
| `author` | string | yes | — | Attorney slug from attorneys collection |
| `practiceAreas` | string[] | yes | — | Practice area slugs for filtering |
| `excerpt` | string | yes | max 280 chars | Summary shown in index/cards |
| `tags` | string[] | no | default: [] | Topic tags for filtering |
| `draft` | boolean | no | default: false | `true` = excluded from production build |
| `featuredImage` | string | no | — | Path relative to `src/assets/` |
| `metaDescription` | string | no | max 160 chars | SEO override; falls back to excerpt |

### Frontmatter Template

```yaml
---
title: "[PLACEHOLDER — Article title]"
publishDate: "2026-01-15"
author: "[PLACEHOLDER — attorney-slug]"
practiceAreas:
  - "[PLACEHOLDER — practice-area-slug]"
excerpt: >
  [PLACEHOLDER — 1–2 sentences summarizing the article for index pages and cards.
  Max 280 characters.]
tags:
  - "[PLACEHOLDER — topic tag]"
draft: false
metaDescription: >
  [PLACEHOLDER — SEO meta description, max 160 chars. If omitted, excerpt is used.]
---

[Article body copy — 600–1200 words. Written by or attributed to the named attorney.
Topic mix: 60% practice-specific legal analysis, 25% case-law commentary,
15% firm news / speaking / community.]
```

### Example Record

```yaml
---
title: "What Public Agencies Need to Know About the Government Claims Act in 2025"
publishDate: "2025-10-01"
author: jane-doe
practiceAreas:
  - public-entity-defense
excerpt: >
  Recent Court of Appeal decisions have refined the Government Claims Act's presentation
  requirement in ways that affect how public agencies should handle pre-litigation
  claim responses. Here is what changed and what it means for your agency.
tags:
  - government-claims-act
  - public-entity
  - liability
draft: false
metaDescription: >
  A review of recent California appellate decisions affecting Government Claims Act
  compliance for public agencies, with practical guidance on claim response strategy.
---

The Government Claims Act (Government Code § 810 et seq.) has governed the relationship
between California public agencies and potential tort claimants for decades...

[Article body continues — 600–1200 words]
```
