

# Semantic HTML, Keyboard Accessibility, Screen Reader & Contrast Improvements

## Current State

The codebase is in good shape for many of these concerns. The Navbar already uses `<nav>`, Footer uses `<footer>`, pages use `<main>`, Hero has `<h1>`, sections use `<section>`. Many buttons have `aria-label` attributes. The main gaps are:

**Semantic HTML gaps:**
- Navbar desktop links wrapper uses `<div>` instead of a `<ul>` list
- Footer link groups use `<div>` wrappers where `<nav>` is more appropriate
- Testimonials use `<div>` instead of `<blockquote>` + `<cite>`/`<figcaption>`
- CommunityHero stats use `<div>` where `<ul>` is appropriate
- Hero trust indicators use `<div>` where `<ul>` is appropriate
- `ProductCard` is a `<motion.div>` with `onClick` — should be keyboard-accessible (not a `<button>` due to absolute positioning, but needs `role="button"`, `tabIndex`, `onKeyDown`)

**Focus visibility gaps:**
- Global focus styles rely on default browser or per-component `focus-visible:ring-2` — need a global baseline in `index.css`
- Auth page password toggle `<button>` has no visible focus indicator
- Auth page sign-in/sign-up toggle link-button has no focus ring
- Mobile nav links have no focus styles
- Footer links have no focus styles
- Features section "Learn more" links have no focus indicator

**Screen reader gaps:**
- Navbar Search and Bell icon buttons lack `aria-label`
- WatercolorCloud SVGs are decorative but missing `aria-hidden="true"` and `role="presentation"`
- Google sign-in SVG needs `aria-hidden="true"` (the button text provides the label)
- Star rating icons in Testimonials need `aria-hidden` + a text alternative for the "4.9 out of 5" meaning
- Hero badge pulsing dot is decorative — needs `aria-hidden`

**Contrast concerns:**
- `text-muted-foreground` is `hsl(202, 15%, 45%)` on `hsl(40, 33%, 98%)` background — approximately 3.7:1 ratio, below 4.5:1 for normal text. Darken to ~38% lightness to reach 4.5:1.
- CTA section `text-white/80` on blue gradient — may be borderline. Change to `text-white/90`.

## Plan

### 1. Global focus-visible styles (index.css)
Add a global `focus-visible` outline style in `@layer base` so all interactive elements get a visible 2px ring by default without needing per-component classes:
```css
:focus-visible {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
}
```

### 2. Fix muted-foreground contrast (index.css)
Change `--muted-foreground` from `202 15% 45%` to `202 15% 38%` in light mode to meet WCAG AA 4.5:1 ratio against the background.

### 3. Navbar semantic improvements
- Wrap desktop nav links in `<ul>` with `<li>` items
- Add `aria-label="Search"` to Search button, `aria-label="Notifications"` to Bell button
- Add `aria-expanded={isOpen}` to mobile menu toggle button

### 4. Footer semantic improvements
- Wrap the entire footer links grid in a `<nav aria-label="Footer">` and each link group `<ul>` already exists — just add the outer `<nav>`

### 5. Hero accessibility
- Add `aria-hidden="true"` to the pulsing dot span
- Convert trust indicators wrapper to `<ul>` with `<li>` items

### 6. Features section
- Add `aria-hidden="true"` to decorative feature icons

### 7. Testimonials semantics
- Use `<blockquote>` for the quote, `<figcaption>` or `<cite>` for author
- Add `aria-hidden="true"` to star icons and ensure the "4.9 out of 5" text is the accessible label via `aria-label` on the container

### 8. CTA contrast fix
- Change `text-white/80` to `text-white/90` for body text

### 9. WatercolorCloud accessibility
- Add `aria-hidden="true"` to the root element since it's purely decorative

### 10. ProductCard keyboard access
- Add `role="button"`, `tabIndex={0}`, `onKeyDown` (Enter/Space triggers click) to the card container
- Already has good alt text on images

### 11. Auth page minor fixes
- Add `aria-label="Toggle password visibility"` to password toggle button
- Add focus styles to password toggle and sign-in/up toggle link
- Add `aria-hidden="true"` to Google SVG icon

### 12. CommunityHero semantics
- Convert stats wrapper to `<ul>` with `<li>` items

All changes are incremental edits to existing files. No new files or database changes needed. Approximately 12 files touched with small, targeted edits.

