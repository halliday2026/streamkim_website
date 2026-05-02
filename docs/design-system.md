# Design System — Stream Kim Website

> Pull this into Tailwind via `@theme` in `src/styles/global.css`. No `tailwind.config.mjs` needed
> (Tailwind v4 is CSS-first).

---

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `navy` | `#1F2A44` | Primary brand — headings, nav background, CTA buttons |
| `oxblood` | `#8B0000` | Accent — links, key CTAs, active states, the Redbird mark |
| `offwhite` | `#FAF8F5` | Page background, card backgrounds |
| `midgray` | `#6B7280` | Body text secondary, meta text, captions |
| `charcoal` | `#222222` | Primary body text |
| `white` | `#FFFFFF` | Text on dark backgrounds, reversed components |

**Avoid:** Bright blues, gradients, drop shadows, glassmorphism, any palette that signals "modern
SaaS" over "serious institution."

### Tailwind v4 @theme snippet

Add to `src/styles/global.css` inside the `@theme` block:

```css
@theme {
  --color-navy: #1F2A44;
  --color-oxblood: #8B0000;
  --color-offwhite: #FAF8F5;
  --color-midgray: #6B7280;
  --color-charcoal: #222222;
}
```

Usage in markup: `bg-navy`, `text-oxblood`, `border-midgray`, etc.

---

## Typography

### Font Choices

| Role | Family | Package | Rationale |
|------|--------|---------|-----------|
| Display / Headlines | Source Serif 4 Variable | `@fontsource-variable/source-serif-4` | Editorial weight, reading-room authority |
| Body | Inter Variable | `@fontsource-variable/inter` | Clean, highly legible, WCAG-friendly |

### Loading (in BaseLayout.astro)

```astro
---
import '@fontsource-variable/source-serif-4';
import '@fontsource-variable/inter';
---
```

Both packages are installed as npm dependencies. No external network requests, no Google Fonts
privacy concerns, works offline.

### CSS font-family defaults (in global.css)

```css
@layer base {
  html {
    font-family: 'Inter Variable', Inter, system-ui, sans-serif;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Source Serif 4 Variable', 'Source Serif 4', Georgia, serif;
  }
}
```

### Type Scale

| Element | Size | Weight | Line-height | Letter-spacing |
|---------|------|--------|-------------|----------------|
| Display H1 | `text-5xl` / `text-6xl` (lg) | 400 (regular) | `leading-tight` | `-0.02em` |
| H2 | `text-3xl` / `text-4xl` (lg) | 400 | `leading-snug` | `-0.01em` |
| H3 | `text-2xl` | 500 | `leading-snug` | `0` |
| H4 | `text-xl` | 600 | `leading-normal` | `0` |
| Body large | `text-lg` | 400 | `leading-relaxed` | `0` |
| Body default | `text-base` | 400 | `leading-relaxed` | `0` |
| Small / meta | `text-sm` | 400 | `leading-normal` | `0.01em` |
| Label / caps | `text-xs` | 600 | `leading-normal` | `0.08em` uppercase |

---

## Spacing Scale

Use Tailwind's default spacing scale (4px base). Document deviations here as they arise.

Standard section vertical padding: `py-16` (64px) desktop, `py-10` (40px) mobile.
Standard container max-width: `max-w-6xl` (72rem) with `mx-auto px-4 sm:px-6 lg:px-8`.

---

## Layout Grid & Breakpoints

Tailwind v4 defaults:

| Breakpoint | Min-width | Use |
|------------|-----------|-----|
| `sm` | 640px | Mobile landscape / large phone |
| `md` | 768px | Tablet |
| `lg` | 1024px | Desktop (primary design target) |
| `xl` | 1280px | Wide desktop |
| `2xl` | 1536px | Ultra-wide (max-width container kicks in before this) |

**Column grid:** 12-column, `gap-6` (24px). Most content sections use a 2- or 3-column grid at `lg`.

---

## Component Primitives

### Button

Three variants. All must have visible focus ring (`ring-2 ring-offset-2`) and 44×44px minimum
touch target (WCAG 2.5.5).

#### Primary

```
bg-navy text-white px-6 py-3 text-sm font-semibold tracking-wide uppercase
hover: bg-[#162035]
focus-visible: ring-2 ring-navy ring-offset-2
disabled: opacity-50 cursor-not-allowed
```

#### Secondary (outlined)

```
border-2 border-navy text-navy bg-transparent px-6 py-3 text-sm font-semibold
hover: bg-navy text-white
focus-visible: ring-2 ring-navy ring-offset-2
disabled: opacity-50 cursor-not-allowed
```

#### Ghost

```
text-oxblood bg-transparent px-4 py-2 text-sm font-medium underline-offset-4
hover: underline
focus-visible: ring-2 ring-oxblood ring-offset-2
disabled: opacity-40 cursor-not-allowed
```

**Accessibility:** Always set `type="button"` unless it's a submit. Use `<a>` for navigation,
`<button>` for actions.

---

### Link

```
text-oxblood underline-offset-4 hover:underline
focus-visible: outline-2 outline-oxblood outline-offset-2
```

For navigation links (not body copy): no underline by default, underline on hover.

---

### Card

White background (`bg-white`), subtle border (`border border-gray-200`), padding `p-6`.
No drop shadows — use border instead.

```
bg-white border border-gray-200 p-6
hover: border-navy transition-colors duration-150
```

**Attorney Card variant:** portrait image at top, `aspect-[3/4]` or `aspect-square`, name as H3,
title as small-caps label, practice areas as comma-separated links.

**Practice Card variant:** no image, practice name as H3, one-line tagline, arrow-link to page.

**Insight Card variant:** publication date + practice tag above title, excerpt below, author byline.

---

### FormField

```html
<label class="block text-sm font-medium text-charcoal mb-1" for="field-id">
  Label text <span aria-hidden="true" class="text-oxblood">*</span>
  <span class="sr-only">(required)</span>
</label>
<input
  id="field-id"
  class="block w-full border border-gray-300 px-3 py-2 text-base
         focus:border-navy focus:ring-2 focus:ring-navy focus:outline-none
         aria-invalid:border-red-600 aria-invalid:ring-red-600"
  aria-describedby="field-id-error"
/>
<p id="field-id-error" role="alert" class="mt-1 text-sm text-red-700 hidden">
  Error message
</p>
```

**States:** default, focus (navy ring), error (`aria-invalid="true"`, red border/ring), disabled
(50% opacity, `cursor-not-allowed`).

**Required fields:** mark with `required` attribute + visible asterisk + SR-only "(required)" text.

---

## Photography Rules

- **Use:** Original attorney portraits (neutral backdrop, natural light), Riverside architectural shots
- **Never use:** Stock photos of gavels, scales, handshakes, marble columns, generic suits
- **Treatment:** Black-and-white attorney portraits are acceptable and suit the editorial register
- **Alt text:** Every attorney portrait must have descriptive alt text; decorative texture shots use `alt=""`
