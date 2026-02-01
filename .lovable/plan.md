
# Rebrand from NURTURR to nura

## Overview
This plan covers updating all branding across the platform from "NURTURR" to "nura", integrating your new logo assets, and updating the favicon.

## Logo Assets Integration

Your uploaded assets will be used as follows:
- **n_icon.png**: Will be used as the favicon and the icon in the navigation bar
- **pg_16_nura.png**: Contains the full logo with the adorable ladybug mascot - this design can be referenced for future marketing pages

## Changes Summary

### 1. Copy Logo Assets to Project
- Copy `n_icon.png` to `public/favicon.png` (for favicon)
- Copy `n_icon.png` to `src/assets/nura-icon.png` (for React components)

### 2. Update HTML Meta Tags (index.html)
- Page title: "nura - Confident Parenting Starts Here"
- Meta description: Update "NURTURR" to "nura"
- Author meta tag: "nura"
- Open Graph title: "nura - Confident Parenting Starts Here"
- Twitter site: "@nuraparenting"
- Add favicon link to the new icon

### 3. Update Navigation Bar (Navbar.tsx)
- Replace the styled "N" box with the actual nura icon image
- Update brand text from "NURTURR" to "nura"
- Use lowercase styling to match your logo design

### 4. Update Footer (Footer.tsx)
- Replace logo section with nura icon image
- Update brand name from "NURTURR" to "nura"
- Update copyright text to "nura"

### 5. Update Content Sections
- **Features.tsx**: Update brand mention in description
- **HowItWorks.tsx**: Change "How NURTURR works" to "How nura works"
- **Testimonials.tsx**: Update quote mentioning the brand

### 6. Update CSS Comments (index.css)
- Update design system header comment from "NURTURR" to "nura"

---

## Technical Details

### Files to Modify
| File | Changes |
|------|---------|
| `index.html` | Title, meta tags, favicon link |
| `src/components/layout/Navbar.tsx` | Logo image + brand text |
| `src/components/layout/Footer.tsx` | Logo image + brand text + copyright |
| `src/components/sections/Features.tsx` | Brand mention in copy |
| `src/components/sections/HowItWorks.tsx` | Section heading |
| `src/components/sections/Testimonials.tsx` | Testimonial quote |
| `src/index.css` | Comment header |

### Files to Create/Copy
| Source | Destination | Purpose |
|--------|-------------|---------|
| `user-uploads://n_icon.png` | `public/favicon.png` | Favicon |
| `user-uploads://n_icon.png` | `src/assets/nura-icon.png` | Logo in components |

### Logo Component Updates

The current logo in Navbar and Footer looks like this:
```text
+----------+
| Styled N | + "NURTURR" text
+----------+
```

It will become:
```text
+----------+
| Icon Img | + "nura" text
+----------+
```

The icon will use your uploaded image which features the rounded lowercase "n" on the baby blue background, matching your brand aesthetic perfectly.
