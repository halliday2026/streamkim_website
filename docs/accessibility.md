# Accessibility — Stream Kim Website

**Target standard:** WCAG 2.1 Level AA.
ADA website lawsuits against law firms are a documented litigation risk (3,500+ filed in 2025).
This is not optional.

---

## Color Contrast Minimums

| Use | Minimum ratio | Tailwind check |
|-----|--------------|----------------|
| Normal body text (< 18pt / < 14pt bold) | 4.5:1 | `text-charcoal` (#1A1A1A) on `bg-bone` (#FAF7F2) = ~18:1 ✓ |
| Large text (≥ 18pt or ≥ 14pt bold) | 3:1 | All display headings must meet 3:1 minimum |
| UI components (buttons, inputs, focus rings) | 3:1 | `charcoal` (#1A1A1A) on `bone` = ~18:1 ✓ |
| Placeholder text in inputs | 4.5:1 | Use `midgray` (#6B7280) on white — check this; may need darker value |
| Disabled state | No requirement | Still aim for 3:1 for usability |

**Check before shipping:** Run every unique text/background combination through
[WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) or axe DevTools.

Dark backgrounds (`bg-charcoal`): Use `text-white` or `text-bone`. Verify at 4.5:1.
`bordeaux` (#6B0F1A) on `bone` (#FAF7F2): ~12:1 ✓

---

## Keyboard Navigation Requirements

Every interactive element must be:
1. **Reachable by Tab key** in a logical reading order
2. **Activatable by Enter/Space** (buttons) or Enter (links)
3. **Visible when focused** — focus indicator must be clearly visible (not just the browser default)

### Focus Style

Apply globally in `global.css`:
```css
@layer base {
  :focus-visible {
    outline: 2px solid #1A1A1A;  /* charcoal */
    outline-offset: 3px;
  }
  /* Override for dark backgrounds */
  .bg-charcoal :focus-visible,
  [data-bg="dark"] :focus-visible {
    outline-color: #FAF7F2;  /* bone */
  }
}
```

Do NOT use `outline: none` or `outline: 0` without providing a visible custom focus indicator.

### Mobile Menu (hamburger)

- Toggle button: `aria-expanded="true/false"` + `aria-controls="[menu-id]"`
- When open: focus is trapped within the menu
- Pressing `Escape` closes the menu and returns focus to the toggle button
- Menu items must be navigable by Tab and arrow keys

### Mega-menu (Practice Areas)

- Opener: `aria-haspopup="true"` + `aria-expanded`
- Menu panel: `role="menu"` with `role="menuitem"` children
- Arrow keys navigate menu items; `Escape` closes and returns focus to opener
- Must be fully operable without a mouse

---

## Semantic HTML & Landmark Requirements

Every page must have these landmark regions in order:

```html
<!-- Skip link (first focusable element) -->
<a href="#main-content" class="sr-only focus:not-sr-only ...">Skip to main content</a>

<header role="banner">
  <nav aria-label="Main navigation">...</nav>
</header>

<main id="main-content" tabindex="-1">
  <!-- Page content -->
</main>

<footer role="contentinfo">
  <nav aria-label="Footer navigation">...</nav>
</footer>
```

**Heading hierarchy:** Must be strictly sequential — never skip from H1 to H3.
Every page has exactly one `<h1>`. Component sections use H2 for section titles, H3 for cards
within sections, etc.

**Lists:** Navigation links inside `<nav>` should use `<ul>/<li>` structure.
Practice capabilities lists use `<ul>` (unordered), FAQ uses `<dl>` (description list) or
`<details>/<summary>` pairs.

---

## Form Accessibility Rules

### Labels

Every input must have an explicitly associated `<label>` with matching `for` / `id`:
```html
<label for="email">Email address <span aria-hidden="true">*</span>
  <span class="sr-only">(required)</span></label>
<input id="email" type="email" required />
```

Never use placeholder text as a substitute for a label.

### Error States

When a field has an error:
1. Set `aria-invalid="true"` on the input
2. Set `aria-describedby="[field-id]-error"` on the input
3. Render error message with `role="alert"` or inside an `aria-live="polite"` region
4. Error message must be visible (not just color-coded — also use text + icon)

```html
<input id="email" type="email" aria-invalid="true" aria-describedby="email-error" />
<p id="email-error" role="alert" class="text-red-700 text-sm mt-1">
  Please enter a valid email address.
</p>
```

### Form Success

On successful submission, display a confirmation message in an `aria-live="polite"` region.
Do not use `alert()` JavaScript dialogs.

### Required Fields

Mark required fields with:
- The `required` HTML attribute (enables native browser validation)
- A visible asterisk `*` (with `aria-hidden="true"`)
- An `(required)` text in a `.sr-only` span

### Disclaimer

The attorney-client disclaimer must not be inside a `<form>` element — place it below the submit
button as a `<p>` with appropriate contrast.

---

## Image Alt Text Rules

| Image type | Alt text |
|------------|----------|
| Attorney portrait | `"[Full Name], [Title], Stream Kim Hicks Wrage & Alfaro"` |
| Firm logo | `"Stream Kim Hicks Wrage & Alfaro, P.C."` |
| Office / architectural photography | Descriptive alt text explaining what is shown |
| Decorative texture images | `alt=""` (empty, so screen readers skip it) |
| Charts or infographics (if any) | Full description of the data conveyed |

Avoid: redundant alt text that repeats adjacent caption text. If an image is captioned, alt text
can be shorter or empty (decorative in context).

---

## Pre-Launch Audit Checklist

Complete all of the following before launch:

### Automated tools

- [ ] **axe DevTools** browser extension: zero violations on every page template
  (home, practice area, attorney bio, insight article, contact)
- [ ] **WAVE** (wave.webaim.org): zero errors; review all alerts
- [ ] **Lighthouse**: Accessibility score ≥ 95 on all page templates

### Manual checks

- [ ] **Keyboard-only navigation:** Tab through every page template without a mouse.
  Verify: all interactive elements reachable, focus always visible, mobile menu operable,
  forms completable, no focus traps except intentional modal/menu traps.
- [ ] **Screen reader test (NVDA + Chrome or VoiceOver + Safari):**
  - [ ] Landmark regions announced correctly
  - [ ] All images have meaningful alt text or are skipped as decorative
  - [ ] Form labels and error messages announced correctly
  - [ ] Links have descriptive text (no "click here")
  - [ ] Heading hierarchy logical
- [ ] **Zoom to 200%:** No content clipped or overlapping
- [ ] **Color contrast:** All text/background combinations verified via contrast checker
- [ ] **Touch targets:** All buttons/links ≥ 44×44px on mobile (check with Chrome DevTools mobile emulation)
- [ ] **Reduced motion:** Confirm no animations play when `prefers-reduced-motion: reduce` is set
  (add `@media (prefers-reduced-motion: reduce)` rules as needed)

### Legal compliance

- [ ] Accessibility statement page live at `/accessibility`
- [ ] Contact method for accessibility issues included in statement
- [ ] CCPA/CPRA privacy policy live at `/privacy`
- [ ] Cookie consent banner present if any third-party tracking scripts are loaded
