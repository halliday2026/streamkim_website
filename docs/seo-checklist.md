# SEO Checklist — Stream Kim Website

---

## Title Tag Rules

Format: `[Page-Specific Title] | Stream Kim Hicks Wrage & Alfaro, P.C.`
Maximum: 60 characters for the page-specific part (total title ~80 chars is fine for most engines).

| Page type | Title pattern | Example |
|-----------|---------------|---------|
| Homepage | `Civil Litigation Attorneys — Riverside, CA \| Stream Kim...` | Keep under 60 chars |
| Practice area | `[Practice Name] Attorneys — Inland Empire \| Stream Kim...` | "Public Entity Defense Attorneys — Inland Empire \| Stream Kim..." |
| Attorney bio | `[Full Name], [Title] \| Stream Kim...` | "Jane M. Doe, Partner \| Stream Kim..." |
| Insights index | `Legal Insights — Civil Litigation \| Stream Kim...` | — |
| Insight article | `[Article Title] \| Stream Kim...` | Article title alone, then firm name |
| Notable Matters | `Representative Matters \| Stream Kim...` | — |
| Contact | `Contact Stream Kim Hicks Wrage & Alfaro` | — |

---

## Meta Description Rules

- 140–160 characters
- Must include primary keyword + geographic modifier + a differentiating claim
- Never duplicate across pages
- Do not truncate mid-sentence

| Page type | Pattern |
|-----------|---------|
| Homepage | "[X]-sentence positioning summary. Serving public entities, healthcare, and businesses across Riverside and the Inland Empire." |
| Practice area | "Stream Kim represents [client type] in [practice area] matters. [One differentiator]. Serving [geography]." |
| Attorney bio | "[Name] is a [title] at Stream Kim focusing on [practices]. [One credential or notable matter type]." |
| Insight article | Use `metaDescription` frontmatter field. Falls back to `excerpt`. |

---

## Schema Markup Requirements

All schema markup is JSON-LD, injected in `<head>` via BaseLayout or page-level head slot.

### Organization

Used on: every page (in BaseLayout).

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Stream Kim Hicks Wrage & Alfaro, P.C.",
  "url": "https://streamkim.com",
  "logo": "https://streamkim.com/logo.png",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Street Address]",
    "addressLocality": "Riverside",
    "addressRegion": "CA",
    "postalCode": "[ZIP]",
    "addressCountry": "US"
  },
  "telephone": "[Main Phone]",
  "sameAs": [
    "https://www.linkedin.com/company/stream-kim",
    "https://www.martindale.com/..."
  ]
}
```

### LocalBusiness

Used on: homepage and contact page. Supplements Organization.

```json
{
  "@context": "https://schema.org",
  "@type": "LegalService",
  "name": "Stream Kim Hicks Wrage & Alfaro, P.C.",
  "image": "https://streamkim.com/logo.png",
  "url": "https://streamkim.com",
  "telephone": "[Main Phone]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Street Address]",
    "addressLocality": "Riverside",
    "addressRegion": "CA",
    "postalCode": "[ZIP]",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 33.9806,
    "longitude": -117.3755
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "08:30",
    "closes": "17:30"
  },
  "priceRange": "$$$$",
  "areaServed": ["Riverside", "San Bernardino", "Los Angeles", "Orange County"]
}
```

### LegalService (per practice area)

Used on: each practice area page.

```json
{
  "@context": "https://schema.org",
  "@type": "LegalService",
  "name": "Public Entity Defense — Stream Kim Hicks Wrage & Alfaro, P.C.",
  "serviceType": "Public Entity Defense",
  "provider": {
    "@type": "Organization",
    "name": "Stream Kim Hicks Wrage & Alfaro, P.C.",
    "url": "https://streamkim.com"
  },
  "areaServed": {
    "@type": "State",
    "name": "California"
  },
  "url": "https://streamkim.com/practice-areas/public-entity-defense"
}
```

### Attorney (Person)

Used on: each attorney bio page.

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Jane M. Doe",
  "jobTitle": "Partner",
  "worksFor": {
    "@type": "Organization",
    "name": "Stream Kim Hicks Wrage & Alfaro, P.C.",
    "url": "https://streamkim.com"
  },
  "url": "https://streamkim.com/attorneys/jane-doe",
  "email": "mailto:jdoe@streamkim.com",
  "telephone": "[Direct Line]",
  "image": "https://streamkim.com/attorneys/jane-doe.jpg",
  "alumniOf": [
    { "@type": "EducationalOrganization", "name": "UCLA School of Law" }
  ],
  "knowsAbout": ["Public Entity Defense", "Healthcare Law", "Civil Litigation"]
}
```

### Article

Used on: each insight article page.

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "What Public Agencies Need to Know About the Government Claims Act",
  "author": {
    "@type": "Person",
    "name": "Jane M. Doe",
    "url": "https://streamkim.com/attorneys/jane-doe"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Stream Kim Hicks Wrage & Alfaro, P.C.",
    "logo": {
      "@type": "ImageObject",
      "url": "https://streamkim.com/logo.png"
    }
  },
  "datePublished": "2025-10-01",
  "dateModified": "2025-10-01",
  "image": "https://streamkim.com/insights/featured-image.jpg",
  "url": "https://streamkim.com/insights/government-claims-act-2025",
  "description": "A review of recent California appellate decisions affecting Government Claims Act compliance."
}
```

### BreadcrumbList

Used on: practice area pages, attorney bio pages, insight article pages.

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://streamkim.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Practice Areas",
      "item": "https://streamkim.com/practice-areas/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Public Entity Defense",
      "item": "https://streamkim.com/practice-areas/public-entity-defense"
    }
  ]
}
```

---

## Canonical URL Rules

- Every page must have `<link rel="canonical" href="[absolute URL]" />`
- Use `Astro.site` + `Astro.url.pathname` to construct canonical URLs
- No trailing slash inconsistency — pick one standard and enforce in `astro.config.mjs` (`trailingSlash: 'never'` or `'always'`)
- Paginated pages (insights archive): canonical on page 2+ should point to page 2+, NOT page 1

---

## Open Graph & Twitter Card

Required on every page:

```html
<!-- Open Graph -->
<meta property="og:type" content="website" /> <!-- or "article" for insights -->
<meta property="og:title" content="[Page Title]" />
<meta property="og:description" content="[Meta description]" />
<meta property="og:url" content="[Canonical URL]" />
<meta property="og:image" content="[Absolute URL to OG image — 1200×630px]" />
<meta property="og:site_name" content="Stream Kim Hicks Wrage & Alfaro, P.C." />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="[Page Title]" />
<meta name="twitter:description" content="[Meta description]" />
<meta name="twitter:image" content="[OG image URL]" />
```

OG image fallback: use a branded static image at `public/og-default.png` (1200×630) when no
page-specific image is available.

---

## Sitemap & robots.txt

- `sitemap.xml`: use `@astrojs/sitemap` integration; configure in `astro.config.mjs`
- Exclude: `draft: true` insight articles, `/legal/`, `/privacy/`, `/disclaimer/`
- `robots.txt`: allow all crawlers, point to sitemap
  ```
  User-agent: *
  Allow: /
  Sitemap: https://streamkim.com/sitemap.xml
  ```
- Submit sitemap to Google Search Console on launch day

---

## Internal Linking Matrix

| Page | Must link to |
|------|-------------|
| Practice area page | All attorneys active in that practice + 3 most recent tagged insights |
| Attorney bio page | All practice areas attorney works in + all insights authored by that attorney |
| Insight article | Relevant practice area(s) + author bio + 2–3 related articles |
| Homepage | All 9 practice pages + featured attorney bios + 3 recent insights |
| Notable Matters | Filtered by practice area; links to relevant practice pages |

Every internal link must use a descriptive anchor text — never "click here" or "read more".
