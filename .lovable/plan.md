

# The Studio - Interactive Stroller Carousel

## Overview

Create an immersive, swipeable carousel experience for The Baby Gear Studio that allows users to explore stroller models in a calm, tactile way. This is a decision-support experience focused on helping parents understand real-life tradeoffs.

## Architecture

### New Files to Create

| File | Purpose |
|------|---------|
| `src/pages/Studio.tsx` | Dedicated page for The Studio carousel experience |
| `src/components/studio/StrollerCarousel.tsx` | Main carousel component with 3D effects |
| `src/components/studio/StrollerCard.tsx` | Individual stroller card with scale/rotation animations |
| `src/components/studio/HighlightPanel.tsx` | Frosted glass info panel below carousel |
| `src/components/studio/PaginationDots.tsx` | Subtle pagination indicator |
| `src/data/strollers.ts` | Sample stroller data with highlights |

### Files to Modify

| File | Changes |
|------|---------|
| `src/App.tsx` | Add route for `/studio` |
| `src/components/layout/Navbar.tsx` | Update "Reviews" link to point to `/studio` |

## Component Structure

```text
Studio Page
├── Header (minimal, with back to home)
├── StrollerCarousel
│   ├── CarouselContainer (with perspective)
│   │   ├── StrollerCard (inactive left)
│   │   ├── StrollerCard (active center)
│   │   └── StrollerCard (inactive right)
│   └── PaginationDots
└── HighlightPanel (frosted glass)
```

## Stroller Data Structure

```text
Stroller {
  id: string
  name: string
  brand: string
  image: string (placeholder initially)
  highlights: string[] (2-3 observational points)
  specs: { weight, foldedSize, suitableAge }
}
```

### Sample Strollers

| Model | Brand | Sample Highlights |
|-------|-------|-------------------|
| Vista V2 | UPPAbaby | Smooth over uneven sidewalks, Bulky fold for small trunks, Great for long daily walks |
| Butterfly | Bugaboo | Ultra-compact fold, Lighter for travel, Less suspension on rough terrain |
| Cruz V2 | UPPAbaby | Good balance of size and features, Narrower for tight spaces, Simpler than Vista |
| YOYO2 | Stokke | One-hand fold, Cabin-bag approved, Best for urban parents |
| Donkey 5 | Bugaboo | Converts to double, Widest footprint, Maximum cargo space |

## Visual Design Specifications

### 3D Carousel Effect

| State | Scale | Opacity | Y Offset | Rotation |
|-------|-------|---------|----------|----------|
| Active | 1.0 | 1.0 | 0px | rotateY(0deg) |
| Adjacent | 0.92 | 0.7 | +6px | rotateY(-6deg) or rotateY(6deg) |
| Far | 0.85 | 0.5 | +10px | rotateY(-12deg) or rotateY(12deg) |

### Container Perspective

```text
perspective: 1200px
perspective-origin: center
```

### Spring Animation (Framer Motion)

```text
type: "spring"
stiffness: 220
damping: 22
mass: 0.8
```

### Highlight Panel (Frosted Glass)

```text
Background: rgba(255, 255, 255, 0.55)
Backdrop-filter: blur(12px)
Border: 1px solid rgba(255, 255, 255, 0.25)
Border-radius: 20px
Shadow: Very subtle
Width: 70% desktop, 90% mobile
```

## Interaction Specifications

### Navigation Methods

| Method | Platform | Implementation |
|--------|----------|----------------|
| Drag | Desktop | Mouse events with Framer Motion drag |
| Swipe | Mobile/Tablet | Touch events with gesture detection |
| Scroll Wheel | Desktop | Horizontal scroll listener |
| Keyboard | All | Left/Right arrows (accessibility) |

### Snapping Behavior

- Spring physics for snap animation
- Slight overshoot then settle
- Respects `prefers-reduced-motion`

## Responsiveness

### Desktop (lg and above)

- Carousel centered with max-width
- 3 strollers visible (center + 2 adjacent)
- Full perspective effects
- Highlight panel at 70% width

### Mobile (below lg)

- Full-width swipe area
- Larger touch targets
- Reduced blur for performance
- Highlight panel at 90% width
- Slightly reduced perspective effects

## Accessibility

| Feature | Implementation |
|---------|----------------|
| Reduced motion | Detect and reduce bounce/rotation |
| Keyboard nav | Arrow keys navigate carousel |
| Screen readers | Alt text on all images, aria-labels |
| Focus states | Visible focus indicators |

## Implementation Phases

### Phase 1: Core Structure
1. Create Studio page with route
2. Build basic carousel layout
3. Add sample stroller data with placeholder images

### Phase 2: Carousel Mechanics
4. Implement drag/swipe using Framer Motion
5. Add spring snapping animation
6. Track active index state

### Phase 3: Visual Effects
7. Add 3D perspective and transforms
8. Implement scale/opacity/rotation transitions
9. Create frosted glass highlight panel

### Phase 4: Refinements
10. Add pagination dots
11. Implement scroll wheel navigation
12. Add keyboard navigation
13. Add reduced motion support

---

## Technical Details

### StrollerCarousel Component Logic

The carousel will use Framer Motion's drag capabilities with custom constraints and spring animations:

```text
- useState for activeIndex
- useMotionValue for drag position
- useTransform to calculate card transforms based on position
- onDragEnd handler to snap to nearest card
- useEffect for scroll wheel listener
```

### Key Calculations

```text
Card offset from center = (cardIndex - activeIndex) * cardWidth
Transform properties derived from offset:
  - scale = 1 - (Math.abs(offset) * 0.08)
  - opacity = 1 - (Math.abs(offset) * 0.3)
  - rotateY = offset * -6 degrees
```

### Performance Considerations

| Optimization | Implementation |
|--------------|----------------|
| Lazy loading | Load images as they approach viewport |
| Transform GPU | Use transform and opacity for animations |
| Image format | WebP with PNG fallback |
| Reduced blur | Less blur on mobile for performance |

### Files Summary

| File | Type | Lines (est.) |
|------|------|--------------|
| `src/pages/Studio.tsx` | New | ~80 |
| `src/components/studio/StrollerCarousel.tsx` | New | ~150 |
| `src/components/studio/StrollerCard.tsx` | New | ~60 |
| `src/components/studio/HighlightPanel.tsx` | New | ~50 |
| `src/components/studio/PaginationDots.tsx` | New | ~30 |
| `src/data/strollers.ts` | New | ~60 |
| `src/App.tsx` | Modify | +3 lines |
| `src/components/layout/Navbar.tsx` | Modify | +1 line change |

