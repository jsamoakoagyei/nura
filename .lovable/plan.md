
# Create About Page with Founder's Note

## Overview
Create a new About page that features the "Note from the Founder" content in a warm, personal, and visually elegant layout that aligns with The Little Voyage brand aesthetic.

## Page Design

The About page will feature:
- A hero section with a soft, welcoming header
- The founder's note displayed in an elegant, letter-style format
- Decorative watercolor clouds for brand consistency
- Responsive design for mobile and desktop

## Files to Create/Modify

### 1. Create New Page: `src/pages/About.tsx`
- Include Navbar and Footer for consistent layout
- Hero section with "About The Little Voyage" heading
- Founder's note section styled as a personal letter:
  - Serif typography for warmth
  - Centered, readable width (max-w-2xl)
  - Subtle card background with soft border
  - Signature line at the end
- Watercolor cloud decorations for brand consistency

### 2. Update Routing: `src/App.tsx`
- Add route for `/about` pointing to the new About page

### 3. Update Navigation: `src/components/layout/Navbar.tsx`
- Add "About" link to the navigation items

### 4. Update Footer: `src/components/layout/Footer.tsx`
- Update "About Us" link to point to `/about` instead of `#`

## Visual Layout

```text
+------------------------------------------+
|              Navbar                      |
+------------------------------------------+
|                                          |
|   [Watercolor clouds - decorative]       |
|                                          |
|     "About The Little Voyage"            |
|     (subtitle text)                      |
|                                          |
+------------------------------------------+
|                                          |
|   +----------------------------------+   |
|   |                                  |   |
|   |   "A Note from the Founder"      |   |
|   |                                  |   |
|   |   Parenthood begins long         |   |
|   |   before the first sleepless...  |   |
|   |                                  |   |
|   |   [Full letter content]          |   |
|   |                                  |   |
|   |   Welcome to The Little Voyage.  |   |
|   |   We're glad you're here.        |   |
|   |                                  |   |
|   |   —                              |   |
|   |                                  |   |
|   +----------------------------------+   |
|                                          |
+------------------------------------------+
|              Footer                      |
+------------------------------------------+
```

## Technical Details

### Page Structure (`src/pages/About.tsx`)
- Uses Framer Motion for fade-in animations (consistent with other pages)
- Includes `WatercolorCloud` component for brand consistency
- Typography: `font-serif` for headings and letter content
- Letter card: rounded corners, subtle border, cream/card background
- Responsive padding and spacing

### Animation Approach
- Staggered fade-in for hero text and letter content
- Gentle entrance animations matching existing page patterns

### Navigation Updates
- Navbar: Add "About" between "Home" and "The Studio"
- Footer: Update company section "About Us" href to `/about`
