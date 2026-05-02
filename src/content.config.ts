import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

// ─── Attorney ────────────────────────────────────────────────────────────────

const attorneys = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/attorneys' }),
  schema: z.object({
    name: z.string(),
    title: z.enum(['Partner', 'Of Counsel', 'Associate']),
    // Path relative to src/assets/attorneys/, e.g. "john-doe.jpg"
    portrait: z.string().optional(),
    // 2–3 sentences in the attorney's voice positioning their practice
    leadParagraph: z.string(),
    // Slugs matching entries in the practice-areas collection
    practiceAreas: z.array(z.string()),
    // Ethics-compliant case descriptions (no client identification)
    notableMatters: z.array(z.string()).optional(),
    // e.g. ["State Bar of California", "U.S. District Court, C.D. Cal."]
    barAdmissions: z.array(z.string()),
    education: z.array(
      z.object({
        institution: z.string(),
        degree: z.string(),
        year: z.number().int().min(1950).max(2030),
        honors: z.string().optional(),
      })
    ),
    clerkships: z
      .array(
        z.object({
          judge: z.string(),
          court: z.string(),
          years: z.string(),
        })
      )
      .optional(),
    publications: z.array(z.string()).optional(),
    speakingEngagements: z.array(z.string()).optional(),
    // e.g. ["Super Lawyers 2023", "AV Preeminent — Martindale-Hubbell"]
    honors: z.array(z.string()).optional(),
    // e.g. ["Riverside County Bar Association", "CAOC"]
    memberships: z.array(z.string()).optional(),
    email: z.string().email({ message: 'Invalid email address' }).optional(),
    phone: z.string().optional(),
    // Controls display order on the attorneys index page (lower = first)
    order: z.number().int().min(1).optional(),
  }),
});

// ─── Practice Area ───────────────────────────────────────────────────────────

const practiceAreas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/practice-areas' }),
  schema: z.object({
    name: z.string(),
    // Strategic display order (1 = Public Entity Defense, highest priority)
    order: z.number().int().min(1).max(20),
    // One-sentence positioning line used in the homepage practice grid
    tagline: z.string().max(160),
    // One-paragraph positioning statement for the practice page hero
    heroBody: z.string(),
    // Bulleted capabilities list — each item is one specific service
    capabilitiesList: z.array(z.string()),
    // Slugs matching entries in the attorneys collection
    attorneys: z.array(z.string()),
    // Jurisdiction and local court familiarity note
    jurisdictionNotes: z.string().optional(),
    faqItems: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        })
      )
      .optional(),
  }),
});

// ─── Notable Matter ───────────────────────────────────────────────────────────

const notableMatters = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notable-matters' }),
  schema: z.object({
    // Short descriptive title — no client names
    title: z.string(),
    // Slug matching an entry in the practice-areas collection
    practiceArea: z.string(),
    // 2–4 sentences, ethics-compliant framing per CRPC 7.1–7.5
    description: z.string(),
    // Optional outcome summary (e.g. "Defense verdict", "Summary judgment granted")
    outcome: z.string().optional(),
    // Additional practice-area tags for filtering (can overlap practiceArea)
    tags: z.array(z.string()).default([]),
    // Controls display order within a practice area (lower = first)
    order: z.number().int().min(1).optional(),
  }),
});

// ─── Insight Article ──────────────────────────────────────────────────────────

const insights = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/insights' }),
  schema: z.object({
    title: z.string(),
    publishDate: z.coerce.date(),
    // Slug matching an entry in the attorneys collection
    author: z.string(),
    // Slugs matching entries in the practice-areas collection
    practiceAreas: z.array(z.string()),
    // 1–2 sentence excerpt shown in index and cards (max ~280 chars)
    excerpt: z.string().max(280),
    tags: z.array(z.string()).default([]),
    // Set true to exclude from production build
    draft: z.boolean().default(false),
    // Optional featured image path relative to src/assets/
    featuredImage: z.string().optional(),
    // SEO override — falls back to excerpt if not set
    metaDescription: z.string().max(160).optional(),
  }),
});

// ─── Exports ─────────────────────────────────────────────────────────────────

export const collections = {
  attorneys,
  'practice-areas': practiceAreas,
  'notable-matters': notableMatters,
  insights,
};
