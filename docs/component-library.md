# Component Library — Stream Kim Website

Specs only — no implementation. Each component should be built as a `.astro` file in the
appropriate subdirectory (`src/components/sections/`, `src/components/ui/`, etc.).

---

## Section Components (`src/components/sections/`)

---

### Hero

**Purpose:** Homepage hero section — first thing a visitor sees. Must communicate who the firm is,
where they are, and what they do within 10 seconds.

**Props:**
```typescript
interface HeroProps {
  headline: string;               // Short declarative positioning statement
  subhead: string;                // One sentence: geography + core practices
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryPhone: string;         // Click-to-call phone number
  backgroundImage?: ImageMetadata; // Optional; if omitted, typographic hero only
}
```

**Variants:**
- `typographic` — Clean type on off-white background, no image (default; Williams & Connolly style)
- `image` — Single still photograph as background/side panel

**Layout rules:**
- Full viewport height on desktop; auto height on mobile
- Headline: Source Serif 4, large (56–72px desktop, 36–48px mobile)
- Maximum 12 words in headline
- Subhead: Inter, 18–20px, `midgray`
- Primary CTA: navy button, full-width on mobile
- Phone: ghost link, click-to-call `href="tel:+1..."`, visible at all sizes

**Responsive behavior:**
- Mobile: stacked, full-width, centered or left-aligned
- Desktop: headline + CTAs left, image right (if image variant)

**Accessibility:**
- Heading must be `<h1>` — only one `<h1>` per page
- Background images must be `role="img"` with descriptive `aria-label`, or purely decorative with no alt
- CTA button: clear label; no "click here"

**Acceptance criteria:**
- Done means: renders headline, subhead, and two CTAs; no carousel; no video; no animated elements;
  passes Lighthouse accessibility score ≥ 95; correct `<h1>` semantics

---

### PracticeGrid

**Purpose:** Homepage section listing all 9 practice areas in strategic order.

**Props:**
```typescript
interface PracticeGridProps {
  practices: Array<{
    name: string;
    slug: string;
    tagline: string;
    order: number;
  }>;
}
```

**Variants:**
- `grid` — 3-column grid on desktop, 2-column on tablet, 1-column on mobile (default)
- `stacked` — Single-column stacked rows with right arrow

**Layout rules:**
- Each cell: practice name as H3, tagline below, arrow link to practice page
- No icons or illustrations (unless explicitly approved and bespoke)
- Consistent card height within a row

**Accessibility:**
- Each card is a landmark `<article>` or wrapped `<a>` — decide during implementation
- Grid must reflow, not scroll horizontally

**Acceptance criteria:**
- Done means: all 9 practices rendered in strategic order (not alphabetical); links functional;
  responsive at all breakpoints; no images required

---

### PracticeCard

**Purpose:** Single practice area card — used in PracticeGrid and elsewhere.

**Props:**
```typescript
interface PracticeCardProps {
  name: string;
  slug: string;
  tagline: string;
}
```

**Acceptance criteria:**
- Done means: name as H3, tagline as paragraph, link to `/practice-areas/[slug]`,
  hover state on card border (navy), no image required

---

### AttorneysPreview

**Purpose:** Homepage section — featured attorneys (3–5) with link to full index.

**Props:**
```typescript
interface AttorneysPreviewProps {
  attorneys: Array<{
    name: string;
    slug: string;
    title: string;
    practiceAreas: string[];
    portrait?: ImageMetadata;
  }>;
  viewAllHref: string;
}
```

**Layout rules:**
- 4-column grid (desktop), 2-column (tablet), 1-column (mobile)
- "View all attorneys" link below grid

**Acceptance criteria:**
- Done means: renders 3–5 attorney cards; portrait placeholder gracefully degraded when no image;
  "View all attorneys" link present; works without any images

---

### AttorneyCard

**Purpose:** Single attorney preview card — portrait, name, title, practice focus.

**Props:**
```typescript
interface AttorneyCardProps {
  name: string;
  slug: string;
  title: string;              // Partner | Of Counsel | Associate
  practiceAreas: string[];    // First 2 shown; remainder truncated
  portrait?: ImageMetadata;
}
```

**Portrait type (current implementation):** The schema stores `portrait` as `z.string().optional()` — a
path string, not a static import. Until real portrait files are committed to `src/assets/attorneys/`,
`AttorneyCard` accepts `portrait?: string` and renders a styled placeholder div when the value is
absent or starts with `[PLACEHOLDER`. This will migrate to `portrait?: ImageMetadata` (using Astro's
`<Image>` component) when real portrait files are available. **Do not change the component's portrait
type without also adding the corresponding image files.**

**Accessibility:**
- Portrait `alt="[Name], [Title], Stream Kim"`
- Card link wraps entire card OR anchor is on the name (not both)

**Acceptance criteria:**
- Done means: renders without portrait (placeholder); name links to bio page; practice areas
  listed; meets 3:1 contrast on all text

---

### NotableMattersStrip

**Purpose:** Homepage credibility strip — 3–5 representative matters.

**Props:**
```typescript
interface NotableMattersStripProps {
  matters: Array<{
    title: string;
    slug: string;
    practiceArea: string;
    outcome?: string;
    description: string;
  }>;
  viewAllHref: string;
}
```

**Layout rules:**
- Alternating rows or 2-column grid on desktop
- Dark background variant (`bg-navy text-white`) to visually separate from adjacent sections

**Acceptance criteria:**
- Done means: 3–5 matters shown; no client names; ethics-compliant descriptions;
  "View all representative matters" link; passes color contrast in dark variant

---

### NotableMatterCard

**Purpose:** Single notable matter card — ethics-compliant description + outcome.

**Props:**
```typescript
interface NotableMatterCardProps {
  title: string;
  slug: string;
  practiceArea: string;
  description: string;
  outcome?: string;
}
```

**Acceptance criteria:**
- Done means: title, description, outcome (if present), practice area tag; no client identification

**Body content:** The NotableMatter schema accepts an optional markdown body. NotableMatterCard does NOT render this body — all card data comes from frontmatter. Body content is reserved for potential future detailed-view contexts (e.g., a per-matter archive page) and should not be assumed available or rendered in card form.

---

### InsightsPreview

**Purpose:** Homepage section — 3 most recent insights with link to full index.

**Props:**
```typescript
interface InsightsPreviewProps {
  articles: Array<{
    title: string;
    slug: string;
    publishDate: Date;
    author: string;
    practiceAreas: string[];
    excerpt: string;
  }>;
  viewAllHref: string;
}
```

**Layout rules:**
- 3-column grid on desktop, 1-column on mobile
- Date formatted as "Month DD, YYYY"; author name linked to bio

**Acceptance criteria:**
- Done means: 3 articles shown; publish date and author attribution present; no drafts shown;
  "View all insights" link; responsive grid

---

### InsightCard

**Purpose:** Single article preview card.

**Props:**
```typescript
interface InsightCardProps {
  title: string;
  slug: string;
  publishDate: Date;
  author: { name: string; slug: string };
  practiceAreas: string[];
  excerpt: string;
}
```

**Author resolution:** The `author` prop expects a resolved `{ name, slug }` object. The InsightArticle content collection stores `author` as a slug string only. Pages that render insights are responsible for looking up the attorney by slug (via `getEntry('attorneys', slug)`) and passing the resolved object to the card. This pattern keeps the card a pure presentational component and matches Astro's content-collection idioms.

**Acceptance criteria:**
- Done means: title links to article; date formatted; author linked; excerpt truncated if needed;
  practice area tag(s) present

---

### GeographicPositioning

**Purpose:** Establish firm's Riverside / Inland Empire identity — a homepage section that is also
an SEO signal.

**Props:**
```typescript
interface GeographicPositioningProps {
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  phone: string;
  tagline: string;   // e.g. "Headquartered in Riverside, serving clients throughout California."
}
```

**Layout rules:**
- Two-column on desktop: text left, map/address right
- Embedded map: Google Maps embed or static image with link (do not use JS maps SDK)
- Include parking note if provided

**Acceptance criteria:**
- Done means: address rendered as `<address>` landmark; phone as click-to-call link;
  tagline references Riverside and Inland Empire; map present or graceful fallback

---

### ContactCTA

**Purpose:** Section-level CTA with intake form — used at bottom of homepage and practice pages.

**Props:**
```typescript
interface ContactCTAProps {
  heading: string;
  subhead?: string;
  formAction: string;    // Formspree or Web3Forms endpoint URL
  practiceArea?: string; // Pre-fills the practice area dropdown if provided
}
```

**Form fields:** name (required), email (required), phone (optional), practiceArea (dropdown),
matterDescription (textarea, required). Max 5 required fields.

**Required disclaimer:** "Submission of this form does not create an attorney-client relationship."

**Acceptance criteria:**
- Done means: form submits to third-party handler; disclaimer present; all required fields labeled;
  error states visible; accessible (labels, aria-invalid, aria-live); no backend required

---

## Layout Components (`src/components/layout/`)

---

### Header

**Purpose:** Site-wide persistent header — logo, primary nav, phone, CTA button.

**Props:**
```typescript
interface HeaderProps {
  currentPath: string;   // For active nav state
}
```

**Layout rules:**
- Logo left, nav center (desktop), phone + "Schedule Consultation" button right
- Mega-menu under "Practice Areas" listing all 9 practices with one-line descriptors
- Sticky on scroll (desktop); hamburger menu (mobile)
- Phone number visible at all sizes (not hidden behind nav collapse)

**Accessibility:**
- `<header>` landmark with `role="banner"`
- Nav: `<nav aria-label="Main navigation">`
- Mobile menu: `aria-expanded` on toggle button; focus trap when open; `Escape` closes
- Skip-to-main-content link as first focusable element on page

**Acceptance criteria:**
- Done means: renders at all breakpoints; mobile menu opens/closes; practice areas mega-menu
  functions; phone click-to-call; active page indicated; keyboard-navigable; skip link present

---

### Footer

**Purpose:** Site-wide footer — full practice list, attorney list, address, contact, legal.

**Props:** No props — reads all content from collections or config constants.

**Layout rules:**
- 4-column grid (desktop): firm info | practice areas | attorneys | contact
- Mobile: stacked single-column
- Full practice area list in strategic order
- Attorney list (names only, linked to bios)
- Address, phone, fax, email
- Social links (if applicable)
- Required legal disclaimer: "The information on this website is for general informational
  purposes only. Nothing on this site should be taken as legal advice for any individual case
  or situation."
- Copyright line with current year

**Accessibility:**
- `<footer>` landmark with `role="contentinfo"`
- Each column as a `<nav>` with `aria-label` or a `<section>` with a visible or sr-only heading

**Acceptance criteria:**
- Done means: all practices and attorneys listed; address present; disclaimer present; copyright
  year is dynamic; responsive; no broken links

---

## Practice Page Components (`src/components/sections/practice/`)

Components specific to the practice area page template. All live in the `practice/` sub-directory.

---

### AttorneyNotableMatters

**Purpose:** Renders notable matters on an attorney bio page. Uses a dual-source pattern: structured
matters from the `notable-matters` collection (richer data: title, outcome) plus inline matter
strings from the attorney's frontmatter `notableMatters[]` as a fallback.

**Data sources (queried at page level, passed as props):**
```typescript
interface AttorneyNotableMatterProps {
  // From notable-matters collection, filtered by attorneys array containing this attorney's slug
  collectionMatters: Array<{
    title: string;
    practiceArea: string;
    description: string;
    outcome?: string;
  }>;
  // From attorney.data.notableMatters — inline strings, ethics-compliant case descriptions
  inlineMatters: string[];
}
```

**Rendering logic:**
- Collection matters render first as structured cards (same styling as NotableMatterCard)
- Inline matters render below as simpler text blocks if any are present
- The whole component renders only if at least one of the two arrays is non-empty
- **Deduplication note:** In production, once a matter is added to the collection with the
  attorney's slug in the `attorneys` field, the corresponding inline string should be removed
  from the attorney's frontmatter. There is no automatic deduplication — maintaining them as two
  separate lists is intentional during the transition period.

**Acceptance criteria:**
- Done means: collection matters render as cards with title/outcome; inline matters render as
  text; both render correctly when either or both sources are empty; section hidden if both empty

---

### AttorneyAuthoredInsights

**Purpose:** Displays insights authored by this attorney on their bio page. Reuses the same
`InsightCard` + author-resolution pattern as `InsightsPreview` and `PracticeRelatedInsights`.

**Data source:** `notable-matters` collection filtered at page level — insights where
`data.author === attorneySlug` and `data.draft === false`, sorted newest-first, capped at 3.

**Props:**
```typescript
interface AttorneyAuthoredInsightsProps {
  articles: Array<{
    title: string;
    slug: string;
    publishDate: Date;
    author: string; // raw slug — resolved internally to { name, slug } before InsightCard
    practiceAreas: string[];
    excerpt: string;
  }>;
}
```

**Rendering:** 3-column grid of InsightCard. Section heading: "Authored Insights". Hidden if
`articles.length === 0` (e.g., attorney has no published non-draft insights yet).

**Acceptance criteria:**
- Done means: 1–3 insight cards rendered; author self-link resolves; section hidden when empty;
  follows same author-resolution pattern as InsightsPreview and PracticeRelatedInsights

---

## UI Components (`src/components/ui/`)

---

### FormField

See design system spec. Wrapper component for label + input/textarea + error message.

**Props:**
```typescript
interface FormFieldProps {
  id: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  required?: boolean;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>; // for select
  errorMessage?: string;
}
```

---

### IntakeForm

**Purpose:** Structured consultation request form. Used in ContactCTA and on the Contact page.

**Props:**
```typescript
interface IntakeFormProps {
  formAction: string;           // Third-party endpoint (Formspree/Web3Forms)
  defaultPracticeArea?: string; // Pre-selected value for practice area dropdown
  submitLabel?: string;         // Default: "Request a Consultation"
}
```

**Fields:**
1. Full name (text, required)
2. Email (email, required)
3. Phone (tel, optional)
4. Practice area (select, optional — all 9 practices in strategic order)
5. Brief matter description (textarea, required, max 500 chars)

**Behavior:**
- On success: display confirmation message in-place (no redirect)
- On error: display error message via `aria-live="polite"` region
- Disclaimer below submit button (not in form, not dismissible)

**Acceptance criteria:**
- Done means: all 5 fields present; third-party endpoint wired; disclaimer below submit;
  success/error states handled accessibly; no backend code

---

## Article Page Components (`src/components/sections/article/`)

Components specific to the individual article page template (`/insights/[slug]`). All live in
the `article/` sub-directory.

---

### ArticleHeader

**Purpose:** Article page header — practice area tags, H1 title, author/date/reading-time byline,
and optional featured image.

**Props:**
```typescript
interface ArticleHeaderProps {
  title: string;
  publishDate: Date;
  author: { name: string; slug: string };   // resolved at page level
  practiceAreas: Array<{ name: string; slug: string }>; // resolved at page level
  readingTime: string;                      // from calculateReadingTime() in src/utils/readingTime.ts
  featuredImage?: string;                   // real path only — caller strips placeholder strings
}
```

**Note:** Practice area tags appear here (top of article) only. There is no separate footer
practice-tag component — the header tags are the sole navigation entry point for practice areas
on this page.

**Acceptance criteria:**
- Done means: H1 renders; byline shows author linked to bio, formatted date, reading time;
  practice tags link to `/practice-areas/[slug]`; featured image conditional on prop

---

### ArticleBody

**Purpose:** Renders the article's markdown body with scoped prose styles.

**Props:**
```typescript
interface ArticleBodyProps {
  Content: AstroComponentFactory;   // from render(entry) in astro:content
}
```

Applies scoped `.article-prose` styles (paragraphs at `text-lg`, headings in Source Serif 4,
bordeaux links) without requiring `@tailwindcss/typography`.

**Acceptance criteria:**
- Done means: markdown body renders; paragraphs, headings, lists, links, and blockquotes styled;
  scoped so styles do not leak to surrounding sections

---

### ArticleToC

**Purpose:** Sticky sidebar table of contents — desktop only, generated from article H2/H3 headings
with IntersectionObserver highlighting of the active section.

**Props:**
```typescript
interface ArticleToCProps {
  headings: Array<{ level: 2 | 3; text: string; id: string }>;
}
```

**Key behavior:** Heading IDs must be sourced from `render(entry).headings[].slug` (Astro's
pipeline), not from a custom slugify function. Renders nothing if `headings.length < 2`. Hidden
on mobile via `hidden lg:block`. The IntersectionObserver `<script>` is the only JavaScript
used on the article page.

**Acceptance criteria:**
- Done means: ≥2 headings → nav renders; `href="#id"` values match rendered heading `id`
  attributes; active heading highlighted; hidden on mobile; keyboard navigable

---

### ArticleAuthorCard

**Purpose:** Author attribution section below the article body — portrait or silhouette, name,
title, truncated bio, link to full bio page.

**Props:**
```typescript
interface ArticleAuthorCardProps {
  name: string;
  slug: string;
  title: string;
  leadParagraph: string;    // truncated to ~120 chars
  portrait?: string;        // real path only; silhouette rendered if absent or placeholder
}
```

**Acceptance criteria:**
- Done means: renders with and without portrait; name and "View bio" link to `/attorneys/[slug]`;
  silhouette matches AttorneyCard placeholder style; section hidden if `authorEntry` is null

---

### ArticleRelatedInsights

**Purpose:** Grid of up to 3 related articles — same practice area(s), excluding the current
article, newest-first. Reuses `InsightCard`; resolves author slugs internally.

**Props:**
```typescript
interface ArticleRelatedInsightsProps {
  articles: Array<{
    title: string;
    slug: string;
    publishDate: Date;
    author: string;       // raw slug — resolved internally before InsightCard
    practiceAreas: string[];
    excerpt: string;
  }>;
}
```

Renders nothing if `articles.length === 0`.

**Acceptance criteria:**
- Done means: 1–3 cards shown; author resolved; section absent when no related articles exist

---

### ArticleNewsletter

**Purpose:** Newsletter signup section at the end of each article — structural placeholder until
a real form endpoint is wired.

**Props:** None.

The form `action` attribute holds `[PLACEHOLDER — newsletter form endpoint]`, which causes the
postbuild placeholder check to fail — intentional until a real endpoint is configured. A
`{import.meta.env.DEV && ...}` block displays a reminder in development that the endpoint is
not yet wired. This block is excluded from production builds because `import.meta.env.DEV` is
`false` at build time (not runtime) and is tree-shaken by Vite.

**Acceptance criteria:**
- Done means: form renders with email input and submit button; DEV reminder visible in dev;
  DEV reminder absent in production build output
