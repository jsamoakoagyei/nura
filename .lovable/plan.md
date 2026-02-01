

# Phase 1: Expanded Data Model + Category Carousels

## Overview
Transform The Studio from a single stroller carousel into a multi-category browsing experience with sectioned carousels for **Strollers** and **Infant Car Seats**. This phase establishes the foundation for the full MVP including the enhanced data model and reusable carousel components.

---

## What You'll Get

**Sectioned Studio Page**
- Strollers carousel section (existing 5 products, enhanced data)
- Infant Car Seats carousel section (5 new products)
- Lifestyle filter chips at the top
- Each section with its own 3D carousel + highlight panel

**Enhanced Product Data**
- Lifestyle tags (apartment-friendly, travel-heavy, budget-conscious, etc.)
- Verdict field (buy / skip / depends)
- Best for / Not for summaries
- Structured review sections for detail pages (Phase 2)

---

## New Files to Create

```text
src/data/products.ts              - Unified product types and lifestyle tag constants
src/data/infantCarSeats.ts        - Infant car seat products data
src/components/studio/
  CategorySection.tsx             - Reusable section with title + carousel
  ProductCarousel.tsx             - Generic carousel (refactored from StrollerCarousel)
  ProductCard.tsx                 - Generic card (refactored from StrollerCard)
  ProductHighlightPanel.tsx       - Generic panel (refactored from HighlightPanel)
  LifestyleFilters.tsx            - Filter chips component
src/hooks/useLocalGearList.ts     - Local storage hook for saved products
```

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/pages/Studio.tsx` | Replace single carousel with sectioned layout + filters |
| `src/data/strollers.ts` | Migrate to new schema with lifestyle tags, verdict, bestFor/notFor |

---

## Data Model

**New Product Interface:**
```typescript
interface Product {
  id: string;
  name: string;
  brand: string;
  category: "stroller" | "infant-car-seat" | "monitor";
  image: string;
  
  // Lifestyle & filtering
  lifestyleTags: LifestyleTag[];
  
  // Quick verdict
  verdict: "buy" | "skip" | "depends";
  bestFor: string;
  notFor: string;
  
  // Existing fields
  highlights: string[];
  specs: Record<string, string>;
  
  // For detail page (Phase 2)
  reviewSections?: ReviewSection[];
}

type LifestyleTag = 
  | "apartment-friendly"
  | "travel-heavy" 
  | "budget-conscious"
  | "design-forward"
  | "eco-conscious";
```

---

## Infant Car Seat Products

| Product | Brand | Verdict | Best For |
|---------|-------|---------|----------|
| Mesa V2 | UPPAbaby | buy | UPPAbaby stroller compatibility, easy install |
| Cloud G | Cybex | buy | Lie-flat position, premium safety |
| KeyFit 35 | Chicco | buy | Budget-friendly, trusted safety ratings |
| Pipa Urbn | Nuna | buy | No base needed, travel-friendly |
| Aton 2 | Cybex | depends | Compact size, lighter weight |

---

## Studio Page Layout

```text
+--------------------------------------------------+
|              The Baby Gear Studio                |
|    Real parent experiences. Real decisions.      |
+--------------------------------------------------+
|  [ All ] [ Strollers ] [ Car Seats ]             |  <- Category tabs
+--------------------------------------------------+
|  [Apartment] [Travel] [Budget] [Design] [Eco]    |  <- Lifestyle filters
+--------------------------------------------------+
|                                                  |
|              === STROLLERS ===                   |
|         [  3D Carousel with 5 products  ]        |
|            [ Highlight Panel ]                   |
|                                                  |
+--------------------------------------------------+
|                                                  |
|           === INFANT CAR SEATS ===               |
|         [  3D Carousel with 5 products  ]        |
|            [ Highlight Panel ]                   |
|                                                  |
+--------------------------------------------------+
```

---

## Implementation Sequence

1. **Create unified data model** (`src/data/products.ts`)
   - Define Product interface with all new fields
   - Export type definitions and lifestyle tag constants

2. **Migrate stroller data** 
   - Add lifestyle tags, verdict, bestFor/notFor to existing 5 strollers
   - Update specs to use generic Record format

3. **Add infant car seat data** (`src/data/infantCarSeats.ts`)
   - 5 infant car seat products with full data
   - Placeholder images initially (gradient backgrounds)

4. **Create generic components**
   - `ProductCard.tsx` - Accept Product instead of Stroller
   - `ProductCarousel.tsx` - Accept products array + category
   - `ProductHighlightPanel.tsx` - Show lifestyle tags + verdict badge
   - `CategorySection.tsx` - Wraps carousel with section header

5. **Build filter component** (`LifestyleFilters.tsx`)
   - Horizontal scroll on mobile
   - Multi-select lifestyle chips
   - "All" chip to clear filters

6. **Rebuild Studio page**
   - Add filter state management
   - Render CategorySection for each category
   - Filter products based on selected lifestyle tags

7. **Create local storage hook**
   - `useLocalGearList()` for saved products (prep for Phase 2)

---

## Technical Notes

- Carousel physics remain unchanged (stiffness: 220, damping: 22, mass: 0.8)
- Each category section operates independently
- Filters apply across all categories simultaneously
- Placeholder images for car seats until assets are added
- Original StrollerCarousel components kept until migration complete

---

## Phase 2 Preview (Next Session)
- Product detail drawer with structured reviews
- Save functionality with floating "My Gear" drawer
- Compare up to 3 products feature

