# Design System — Stream Kim Website

> Pull this into Tailwind via `@theme` in `src/styles/global.css`. No `tailwind.config.mjs` needed
> (Tailwind v4 is CSS-first).

---

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `charcoal` | `#1A1A1A` | Primary — headings, dark backgrounds, CTA buttons |
| `bordeaux` | `#6B0F1A` | Accent — links, key CTAs, eyebrow labels |
| `brass` | `#C4A572` | Rare accent — hairline dividers, ornamental moments only |
| `bone` | `#FAF7F2` | Page background, card backgrounds |
| `midgray` | `#6B7280` | Body text secondary, meta text, captions |
| `white` | `#FFFFFF` | Text on dark backgrounds, reversed components |

**Avoid:** Bright blues, gradients, drop shadows, glassmorphism, any palette that signals "modern
SaaS" over "serious institution." `brass` is for hairlines and small ornamental accents only —
never use it for large blocks.

### Tailwind v4 @theme snippet

Add to `src/styles/global.css` inside the `@theme` block:

```css
@theme {
  --color-charcoal: #1A1A1A;
  --color-bordeaux: #6B0F1A;
  --color-brass: #C4A572;
  --color-bone: #FAF7F2;
  --color-midgray: #6B7280;
}
```

Usage in markup: `bg-charcoal`, `text-bordeaux`, `bg-bone`, `text-brass`, etc.

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
    font-weight: 500;
  }
}
```

### Type Scale

| Element | Size | Weight | Line-height | Letter-spacing |
|---------|------|--------|-------------|----------------|
| Display H1 | `text-5xl` / `text-7xl` (hero) | 500 (medium) | `leading-[1.05]` | `-0.02em` |
| H2 (section) | `text-3xl` / `text-4xl` (lg) | 500 (medium) | `leading-snug` | `-0.01em` |
| H3 (card) | `text-xl` | 500 (medium) | `leading-snug` | `0` |
| Body large | `text-lg` | 400 | `leading-relaxed` | `0` |
| Body default | `text-base` | 400 | `leading-relaxed` | `0` |
| Small / meta | `text-sm` | 400 | `leading-normal` | `0.01em` |
| Label / caps | `text-xs` | 600 | `leading-normal` | `0.08em` uppercase |
| Eyebrow | `text-xs` | 600 | — | `0.25em` uppercase (`tracking-[0.25em]`) |

---

## Spacing Scale

Use Tailwind's default spacing scale (4px base). Document deviations here as they arise.

Standard section vertical padding: `py-16 lg:py-20`. Hero: `min-h-[80vh] lg:min-h-[90vh]`.
Standard container max-width: `max-w-6xl` (72rem) with `mx-auto px-4 sm:px-6 lg:px-8`.

SectionDivider adds `py-8` (2rem each side) between sections.

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

Five variants. All must have visible focus ring and `min-h-[44px]` (project accessibility floor).
Two size options: `default` (px-6 py-3) and `sm` (px-4 py-2, for header use).

#### Primary (light backgrounds)

```
bg-charcoal text-white px-6 py-3 min-h-[44px] text-sm font-semibold tracking-wide uppercase
hover: bg-[#0d0d0d]
focus-visible: ring-2 ring-charcoal ring-offset-2
disabled: opacity-50 cursor-not-allowed
```

#### Secondary (light backgrounds)

```
border-2 border-charcoal text-charcoal bg-transparent px-6 py-3 min-h-[44px] text-sm font-semibold
hover: bg-charcoal text-white
focus-visible: ring-2 ring-charcoal ring-offset-2
disabled: opacity-50 cursor-not-allowed
```

#### Ghost (light backgrounds)

```
text-bordeaux bg-transparent px-4 py-2 min-h-[44px] text-sm font-medium underline-offset-4
hover: underline
focus-visible: ring-2 ring-bordeaux ring-offset-2
disabled: opacity-40 cursor-not-allowed
```

#### Primary Inverse (dark/image backgrounds — hero, charcoal sections)

```
bg-bone text-charcoal px-6 py-3 min-h-[44px] text-sm font-semibold tracking-wide uppercase
hover: bg-[#e8e3db]
focus-visible: ring-2 ring-bone ring-offset-2 ring-offset-charcoal
disabled: opacity-50 cursor-not-allowed
```

#### Ghost Inverse (dark/image backgrounds)

```
text-bone/90 bg-transparent px-4 py-2 min-h-[44px] text-sm font-medium underline-offset-4
hover: underline text-bone
focus-visible: ring-2 ring-bone/60 ring-offset-2 ring-offset-charcoal
disabled: opacity-40 cursor-not-allowed
```

**Accessibility:** Always set `type="button"` unless it's a submit. Use `<a>` for navigation,
`<button>` for actions. Disabled links render as `<span aria-disabled="true">`.

---

### Link

```
text-bordeaux underline underline-offset-4   (body variant)
hover: text-[#4a0812]
focus-visible: outline-2 outline-bordeaux outline-offset-2
```

Nav variant (menus): no underline by default, underline on hover, `text-charcoal`.

---

### Card

White background (`bg-white`), subtle border (`border border-gray-200`), padding `p-6`.
No drop shadows — use border instead.

```
bg-white border border-gray-200 p-6
hover: border-charcoal transition-colors duration-150
```

---

### FormField

```html
<label class="block text-sm font-medium text-charcoal mb-1" for="field-id">
  Label text <span aria-hidden="true" class="text-bordeaux">*</span>
  <span class="sr-only">(required)</span>
</label>
<input
  id="field-id"
  class="block w-full border border-gray-300 px-3 py-2 text-base
         focus:border-charcoal focus:ring-2 focus:ring-charcoal focus:outline-none"
  aria-describedby="field-id-error"
/>
<p id="field-id-error" role="alert" class="mt-1 text-sm text-red-700">
  Error message
</p>
```

**States:** default, focus (charcoal ring), error (`aria-invalid="true"`, red border/ring), disabled
(50% opacity, `cursor-not-allowed`).

---

### SectionDivider

Ornamental brass hairline rendered between homepage sections. No props.

```html
<div role="presentation" aria-hidden="true" class="flex justify-center py-8">
  <div class="h-px w-32 bg-brass"></div>
</div>
```

---

## Photography Rules

- **Use:** Original attorney portraits (neutral backdrop, natural light), Riverside architectural shots
- **Never use:** Stock photos of gavels, scales, handshakes, marble columns, generic suits
- **Treatment:** Black-and-white attorney portraits are acceptable and suit the editorial register
- **Alt text:** Every attorney portrait must have descriptive alt text; decorative images (hero background) use `alt=""`
- **Hero image:** Photo by Jim Witkowski (@jcw), Mission Inn Riverside CA — https://unsplash.com/photos/aFF_Tr-TyJE. Free under Unsplash License. Replace with commissioned photography when available.
