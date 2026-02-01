

# Simplify Features Section

## Overview
Reduce the Features section from 4 pillars to 2 by removing the Trusted Care Directory and combining Baby Gear Studio with Curated Marketplace into a single unified feature.

## Changes Summary

### Current State (4 Features)
1. Baby Gear Studio - Research and reviews
2. Curated Marketplace - Shop vetted products
3. Community Forum - Peer support
4. Trusted Care Directory - Find care providers

### New State (2 Features)
1. **The Baby Gear Studio** (combined) - Research-driven reviews plus curated shopping
2. **Community Forum** - Peer support (unchanged)

## Detailed Changes

### 1. Features Section (Features.tsx)

**Combined Feature: "The Baby Gear Studio"**
| Element | Value |
|---------|-------|
| **Title** | The Baby Gear Studio |
| **Icon** | ShoppingBag (represents the shopping aspect with reviews implied) |
| **Description** | Independent, research-driven product reviews meet a curated marketplace. Side-by-side testing, real parent insights, and vetted products you can shop with confidence. |
| **Highlights** | Expert Testing, Vetted Products, Stage Bundles, Registry |
| **Color** | bg-azure-100 text-azure-600 |
| **Link** | #shop |

**Community Forum** (kept as-is)

**Section Header Updates**
- Change "Four Pillars of Support" → "Two Pillars of Support"
- Update description to remove "care provider access"

### 2. Navigation (Navbar.tsx)

**Remove** the "Care" link from navigation:

| Current | New |
|---------|-----|
| Studio, Shop, Community, Care | Reviews, Shop, Community |

### 3. Footer (Footer.tsx)

**Update Product Links:**
| Current | New |
|---------|-----|
| Baby Gear Studio | Reviews & Shop |
| Marketplace | (remove - merged above) |
| Community | Community |
| Care Directory | (remove) |

---

## Technical Details

### Files to Modify

| File | Changes |
|------|---------|
| `src/components/sections/Features.tsx` | Reduce features array to 2 items, update section header text |
| `src/components/layout/Navbar.tsx` | Remove "Care" nav item, update to reflect new structure |
| `src/components/layout/Footer.tsx` | Update product links to match new features |

### Features.tsx Changes
- Lines 14-46: Replace 4-item features array with 2 items
- Line 82: Change "Four Pillars" to "Two Pillars"
- Line 102: Update description to remove "care provider access"
- Remove unused `Stethoscope` import

### Navbar.tsx Changes
- Lines 7-12: Update navItems array to remove "Care" and adjust structure

### Footer.tsx Changes
- Lines 5-10: Update product array to reflect 2 features

### Layout Consideration
With only 2 features, the grid can remain `md:grid-cols-2` but the cards will be larger and more prominent, which actually enhances their visual impact.

