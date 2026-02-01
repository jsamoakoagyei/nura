

# Update Hero & How It Works Sections

## Overview
Update the copy in both the Hero section and How It Works section with the new messaging that emphasizes nura's focus on real parent experiences, trusted reviews, and unbiased information.

## Hero Section Changes

### Current vs New Content

| Element | Current | New |
|---------|---------|-----|
| **Headline** | "Confident parenting starts here" | "Parenthood is full of decisions. nura helps you make the right ones." |
| **Subheadline** | "Expert guidance, vetted products..." | "Real-world reviews, expert insight, and parent-to-parent wisdom—without the noise, ads, or pressure." |
| **Support Line** | (none) | "Built for expecting and new parents navigating baby gear, services, and care with confidence." |
| **Primary CTA** | "Start Your Journey" | "Start Your Journey" |
| **Secondary CTA** | "Explore Features" | "See how nura works" |

### Structure Update
- Add a new support line element below the subheadline with smaller, muted text
- The headline will be reformatted as two lines with "nura" highlighted in the primary color

## How It Works Section Changes

### Current: 3 Steps → New: 4 Steps

The section will be restructured from 3 steps to 4 steps with completely new content:

| Step | New Title | New Description |
|------|-----------|-----------------|
| **01** | Built from real parent experiences | nura curates in-depth reviews from parents who've actually used the product, across diverse family structures, budgets, and needs. |
| **02** | Designed around real life—not marketing | Insights focus on daily use, tradeoffs, and long-term value instead of polished brand claims or sponsored rankings. |
| **03** | Context that reflects your family | Filter insights by lifestyle, space, income range, caregiving needs, and values to see what truly applies to you. |
| **04** | Decisions you can trust | No paid placements. No affiliate bias. Just transparent information you can feel confident acting on. |

### Layout Adjustment
- Grid will change from 3 columns to 4 columns on large screens (`lg:grid-cols-4`)
- New icons will be selected to match the new content themes:
  - Step 1: Users (real parent experiences)
  - Step 2: Baby (real life focus)
  - Step 3: Heart (Context that reflects your family)
  - Step 4: ShieldCheck (trust/transparency)

---

## Technical Details

### Files to Modify

| File | Changes |
|------|---------|
| `src/components/sections/Hero.tsx` | Update headline, subheadline, add support line, update CTA text |
| `src/components/sections/HowItWorks.tsx` | New 4-step content, update icons, adjust grid layout |

### Hero.tsx Specific Changes
- Line 77-81: Replace headline content
- Line 88-91: Replace subheadline content  
- Add new support line element after subheadline (around line 92)
- Line 100-106: Update CTA button text

### HowItWorks.tsx Specific Changes
- Lines 5-24: Replace `steps` array with 4 new items
- Line 2: Update icon imports (Keep Baby, Sparkles, Heart, Add ShieldCheck)
- Line 53: Change grid class to `lg:grid-cols-4` and reduce gap for 4 columns

