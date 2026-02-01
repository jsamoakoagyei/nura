
# Connect "See how nura works" Button to Section

## Overview
Link the hero button to smoothly scroll down to the "How It Works" section when clicked.

## Implementation Steps

### 1. Add Section ID
Add an `id="how-it-works"` attribute to the HowItWorks section element so it can be targeted by anchor links.

**File:** `src/components/sections/HowItWorks.tsx`
```
Line 34: <section className="py-24 lg:py-32 bg-azure-50">
       ↓
Line 34: <section id="how-it-works" className="py-24 lg:py-32 bg-azure-50">
```

### 2. Add Scroll Behavior to Button
Wrap the button in an anchor tag or add an onClick handler to scroll smoothly to the section.

**File:** `src/components/sections/Hero.tsx`
```
Line 114-116:
  <Button variant="hero-outline" size="xl">
    See how nura works
  </Button>
       ↓
  <Button 
    variant="hero-outline" 
    size="xl"
    onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
  >
    See how nura works
  </Button>
```

## Technical Notes
- Uses native `scrollIntoView` with smooth behavior for a polished scroll animation
- No additional dependencies needed
- Works across all modern browsers
