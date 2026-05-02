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
