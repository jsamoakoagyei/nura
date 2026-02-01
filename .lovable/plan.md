
# Phase 2: Product Detail Drawer, Save Functionality & Compare Feature

## Overview
Build on Phase 1's foundation to add interactive product exploration with a slide-up detail drawer, save-to-list functionality with a floating "My Gear" drawer, and a comparison feature for viewing up to 3 products side-by-side.

---

## What You'll Get

**Product Detail Drawer**
- Slide-up drawer when tapping a product card
- Structured review sections with ratings
- Full specs display
- Save/unsave button with heart icon

**My Gear List (Floating Drawer)**
- Floating action button showing saved count
- Bottom drawer with saved products grid
- Quick remove functionality
- "Compare" button when 2-3 items saved

**Compare Feature**
- Side-by-side comparison of up to 3 products
- Synced specs rows for easy comparison
- Verdict badges and key highlights
- Full-screen drawer/dialog experience

---

## New Files to Create

```text
src/components/studio/
  ProductDetailDrawer.tsx      - Slide-up drawer with full product details
  SaveButton.tsx               - Heart icon save/unsave button
  MyGearFAB.tsx                - Floating action button with badge
  MyGearDrawer.tsx             - Saved products drawer
  CompareDrawer.tsx            - Side-by-side comparison view
  CompareProductCard.tsx       - Compact card for comparison grid
```

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/pages/Studio.tsx` | Add gear list state provider, floating FAB, drawers |
| `src/components/studio/ProductCard.tsx` | Add tap handler for detail drawer |
| `src/components/studio/ProductHighlightPanel.tsx` | Add save button |
| `src/data/products.ts` | Add ReviewSection data to products (optional enhancement) |

---

## User Flow

```text
1. User browses carousel
   └── Tap card → ProductDetailDrawer opens
       └── Tap "Save" → Added to gear list
           └── FAB shows count badge

2. User taps FAB
   └── MyGearDrawer opens
       └── View saved items
       └── Remove items
       └── Tap "Compare" (if 2-3 items) → CompareDrawer opens

3. Compare view
   └── Side-by-side specs
   └── Close to return to studio
```

---

## Component Details

### ProductDetailDrawer
- Uses Vaul drawer (already installed)
- Shows product image at top
- Verdict badge + best for/not for
- Expandable review sections
- Save button prominently placed

### SaveButton
- Heart icon (outline = unsaved, filled = saved)
- Animated state change
- Uses `useLocalGearList` hook

### MyGearFAB
- Fixed position bottom-right
- Badge showing count (hidden if 0)
- Opens MyGearDrawer on tap

### MyGearDrawer
- Bottom sheet with saved products
- Grid of compact product cards
- Remove button per item
- "Compare Selected" button (enabled with 2-3 items)

### CompareDrawer
- Full-screen drawer or dialog
- Products in columns
- Rows: Image, Name, Verdict, Best For, each spec
- Highlight differences

---

## Implementation Sequence

1. **Create SaveButton component**
   - Heart icon with animation
   - Connect to useLocalGearList hook

2. **Create ProductDetailDrawer**
   - Vaul drawer with product details
   - Integrate SaveButton
   - Review sections with optional ratings

3. **Update ProductCard**
   - Add onDetailOpen callback
   - Pass to parent for drawer control

4. **Create MyGearFAB**
   - Floating button with count badge
   - Fixed positioning

5. **Create MyGearDrawer**
   - List of saved products
   - Remove functionality
   - Compare button logic

6. **Create CompareDrawer**
   - Side-by-side layout
   - Specs comparison table
   - Mobile-friendly scrolling

7. **Wire up Studio page**
   - Add state for active product (detail drawer)
   - Add state for compare selection
   - Render all drawer components

---

## Technical Notes

- Uses existing Vaul drawer component for smooth mobile UX
- localStorage persistence via `useLocalGearList` (already built)
- Maximum 3 items for comparison (enforced in UI)
- All drawers use consistent spring physics
- Mobile-first responsive design
- Heart animation uses Framer Motion scale/fill transition

---

## Visual Reference

**Detail Drawer Layout:**
```text
┌─────────────────────────────┐
│  ─────  (drag handle)       │
│                             │
│  [  Product Image  ]        │
│                             │
│  Brand · [Buy Badge]        │
│  Product Name               │
│                             │
│  ✓ Best for: ...           │
│  ✗ Not for: ...            │
│                             │
│  ▸ Design & Build          │
│  ▸ Daily Use               │
│  ▸ Value                   │
│                             │
│  [ ♡ Save to My Gear ]     │
└─────────────────────────────┘
```

**Compare Layout:**
```text
┌─────────────────────────────────────┐
│  Compare (3)              [Close]   │
├───────────┬───────────┬─────────────┤
│  [Image]  │  [Image]  │  [Image]    │
│  Vista V2 │  Cruz V2  │  Butterfly  │
│  [Buy]    │  [Buy]    │  [Buy]      │
├───────────┼───────────┼─────────────┤
│  27 lbs   │  23 lbs   │  16.1 lbs   │  Weight
│  17x25x33 │  17x25x33 │  17x9x21    │  Folded
│  0-50 lbs │  0-50 lbs │  6m-50 lbs  │  Age
└───────────┴───────────┴─────────────┘
```
