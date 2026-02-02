
# Replace Bubbles with Watercolor Clouds

## Overview
Replace the animated bubble decorations with soft, faint watercolor-style clouds that create a dreamy, nurturing aesthetic. The clouds will be static or gently animated to provide a calming visual without the rising bubble motion.

## Sections to Update

### 1. Hero Section (`src/components/sections/Hero.tsx`)
- Remove the `Bubble` component (lines 7-27)
- Remove the floating bubbles container (lines 42-54)
- Add new `WatercolorCloud` component with:
  - SVG-based cloud shapes with soft, organic edges
  - Watercolor effect using gradients and blur filters
  - Subtle opacity and gentle floating animation
  - Multiple clouds positioned at various locations

### 2. CTA Section (`src/components/sections/CTA.tsx`)
- Remove the `CTABubble` component (lines 6-24)
- Remove the decorative bubbles container (lines 33-41)
- Add watercolor clouds with white/light styling to match the blue gradient background

### 3. Create Reusable Cloud Component
Create a new shared component `src/components/decorations/WatercolorCloud.tsx`:
- Accept props for position, size, color variant, and animation delay
- Use SVG paths for organic cloud shapes
- Apply CSS filters for watercolor effect (blur, opacity gradients)
- Support both light mode (azure tones) and dark/CTA variant (white tones)

## Visual Design

**Cloud Appearance:**
- Soft, irregular edges (not perfectly round)
- Gradient fills from azure-200 to transparent
- Multiple blur layers for watercolor "bleeding" effect
- Very low opacity (0.15-0.35) for subtlety

**Animation:**
- Gentle horizontal drift (3-5px movement)
- Slow, organic motion (15-25 second duration)
- No vertical rising motion

## Cloud Positions

**Hero Section:**
- Top-left corner: Large cloud, low opacity
- Top-right area: Medium cloud
- Middle-left: Small wispy cloud
- Bottom-right: Medium-large cloud

**CTA Section:**
- Similar positioning with white-tinted clouds
- Slightly higher opacity to show against blue gradient

---

## Technical Details

### WatercolorCloud Component Structure
```text
+------------------------------------------+
|  WatercolorCloud Component               |
|  Props:                                  |
|  - className: positioning                |
|  - variant: 'light' | 'white'            |
|  - size: 'sm' | 'md' | 'lg' | 'xl'       |
|  - delay: animation delay                |
+------------------------------------------+
|  SVG with:                               |
|  - Organic cloud path                    |
|  - Gradient fill (radial)                |
|  - Blur filter for watercolor effect     |
|  - Framer Motion for gentle drift        |
+------------------------------------------+
```

### CSS Approach
- Use `filter: blur()` for soft edges
- Radial gradients for color fading
- `mix-blend-mode: multiply` or `soft-light` for watercolor blending
- Very low opacity with transparency in gradients

### Files to Modify
1. Create: `src/components/decorations/WatercolorCloud.tsx`
2. Update: `src/components/sections/Hero.tsx`
3. Update: `src/components/sections/CTA.tsx`

### Cleanup
- Remove bubble-related keyframes from `tailwind.config.ts` if no longer needed
