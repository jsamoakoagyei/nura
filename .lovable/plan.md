
# Rebrand: nura → The Little Voyage

This plan covers renaming the site from "nura" to "The Little Voyage", updating the hero messaging, and integrating your new cloud logo.

---

## Summary of Changes

### 1. New Logo Asset
**Action:** Copy the uploaded cloud icon to the project assets folder.

| Location | Details |
|----------|---------|
| Source | `user-uploads://cloud_icon_TLV.png` |
| Destination | `src/assets/tlv-logo.png` |
| Usage | Navbar, Footer, Auth page |

---

### 2. Hero Section - New Messaging
**File:** `src/components/sections/Hero.tsx`

| Element | Current | New |
|---------|---------|-----|
| Headline | "Parenthood is full of decisions. nura helps you make the right ones." | "Navigating early parenthood, together." |
| Subheadline | "Real-world reviews, expert insight..." | "Thoughtfully tested essentials and trusted guidance for life with little ones." |
| Support text | "Built for expecting and new parents..." | Two-paragraph subtext (see below) |
| Button text | "See how nura works" | "See how it works" |

**New Support Text:**
> Parenthood is a journey—one filled with questions, choices, and quiet moments of doubt.
> The Little Voyage exists to gently guide you through it, with carefully researched reviews, honest recommendations, and a steady hand when you need it most.

---

### 3. Brand Name Updates Across All Files

| File | Changes |
|------|---------|
| `index.html` | Title: "The Little Voyage - Navigating Early Parenthood, Together"<br>Meta description, og:title, author updated |
| `src/components/layout/Navbar.tsx` | Logo image, brand text "The Little Voyage" |
| `src/components/layout/Footer.tsx` | Logo image, brand text, copyright |
| `src/pages/Auth.tsx` | Logo image, brand text |
| `src/components/sections/HowItWorks.tsx` | "How it works" (section title), step 1 description |
| `src/components/sections/Features.tsx` | "The Little Voyage brings together..." |
| `src/components/sections/Testimonials.tsx` | Update testimonial quote |

---

### 4. Internal Storage Keys
These are not visible to users but will be updated for consistency:

| File | Old Key | New Key |
|------|---------|---------|
| `src/hooks/useLocalGearList.ts` | `nura-gear-list` | `tlv-gear-list` |
| `src/hooks/useFeedbackSettings.ts` | `nura-feedback-settings` | `tlv-feedback-settings` |

---

## File-by-File Changes

### index.html
```text
title: "The Little Voyage - Navigating Early Parenthood, Together"
description: "Thoughtfully tested essentials and trusted guidance for life with little ones."
og:title: "The Little Voyage - Navigating Early Parenthood, Together"
author: "The Little Voyage"
keywords: updated to match new branding
```

### Navbar.tsx
- Import new logo from `@/assets/tlv-logo.png`
- Change brand text from "nura" to "The Little Voyage"
- Update alt text accordingly

### Footer.tsx
- Import new logo from `@/assets/tlv-logo.png`
- Change brand text and copyright to "The Little Voyage"

### Auth.tsx
- Import new logo
- Update brand text and alt attributes

### Hero.tsx
- Replace headline, subheadline, and support text with your new copy
- Change "See how nura works" button to "See how it works"

### HowItWorks.tsx
- Section title: "How nura works" → "How it works"
- Step 1 description: "nura curates..." → "The Little Voyage curates..."

### Features.tsx
- Line 81: "No more juggling apps. nura brings together..." → "No more juggling apps. The Little Voyage brings together..."

### Testimonials.tsx
- First testimonial: "nura completely changed..." → "The Little Voyage completely changed..."

### useLocalGearList.ts & useFeedbackSettings.ts
- Update storage key constants

---

## Files to Be Modified

1. **New file:** `src/assets/tlv-logo.png` (copied from upload)
2. `index.html`
3. `src/components/sections/Hero.tsx`
4. `src/components/layout/Navbar.tsx`
5. `src/components/layout/Footer.tsx`
6. `src/pages/Auth.tsx`
7. `src/components/sections/HowItWorks.tsx`
8. `src/components/sections/Features.tsx`
9. `src/components/sections/Testimonials.tsx`
10. `src/hooks/useLocalGearList.ts`
11. `src/hooks/useFeedbackSettings.ts`

