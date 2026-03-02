

# Code Refactoring: Components, Logic Separation, Constants, and DRY

## Analysis Summary

After reviewing all files, the codebase is reasonably well-organized but has clear opportunities for improvement across four areas: duplicate UI patterns, hardcoded strings, large components, and mixed logic/UI.

## Plan

### 1. Extract reusable `ErrorState` and `EmptyState` components

The same error UI (icon + title + message + retry button) appears in `CategoryGrid`, `PostList`, and `ForumSection`. The same empty state pattern (icon + title + message) appears in `PostList`, `PostDetailDrawer`, and `MyGearDrawer`.

**Create `src/components/ui/ErrorState.tsx`** — accepts `title`, `message`, `onRetry`, and optional `onBack`.

**Create `src/components/ui/EmptyState.tsx`** — accepts `icon`, `title`, `message`, and optional `action` (label + onClick).

Update `CategoryGrid`, `PostList`, `ForumSection`, `PostDetailDrawer`, and `MyGearDrawer` to use these shared components instead of inline markup.

### 2. Extract reusable `ProductImagePlaceholder` component

The product image fallback (gradient background + emoji icon) is duplicated in `ProductCard`, `ProductDetailDrawer`, `CompareDrawer` (ProductHeader), and `MyGearDrawer` (GearCard).

**Create `src/components/studio/ProductImagePlaceholder.tsx`** — accepts `category` and optional `className`. Renders the gradient + emoji. Update all four locations.

### 3. Extract `PostAuthorMeta` component

The author display pattern (User icon + anonymous check + display name + timestamp) is duplicated between `PostList` and `PostDetailDrawer`.

**Create `src/components/community/PostAuthorMeta.tsx`** — accepts `isAnonymous`, `displayName`, `createdAt`. Used in both post list items and the detail drawer header.

### 4. Extract constants file

**Create `src/lib/constants.ts`** with:
- `NAV_ITEMS` — currently hardcoded in `Navbar.tsx`
- `FOOTER_LINKS` — currently hardcoded in `Footer.tsx`
- `ROUTES` — path constants (`AUTH`, `COMMUNITY`, `PROFILE`, `STUDIO`, `HOME`, `ABOUT`) used throughout redirects and links
- `APP_NAME` — "The Little Voyage"
- `STATS` — hero/community stats ("50,000+", "10,000+", etc.)

Update `Navbar.tsx`, `Footer.tsx`, `Hero.tsx`, `CommunityHero.tsx`, `Auth.tsx`, and other files with hardcoded paths to import from constants.

### 5. Extract `useAuthForm` hook from Auth page

`Auth.tsx` (~340 lines) mixes form state, validation, submission logic, and UI.

**Create `src/hooks/useAuthForm.ts`** — encapsulates:
- Form state (`email`, `password`, `displayName`, `showPassword`, `errors`)
- `validateForm()`, `handleSubmit()`, `handleGoogleSignIn()`
- Loading states (`isSubmitting`, `isGoogleLoading`)
- `toggleMode()` (login ↔ signup)

`Auth.tsx` becomes a pure UI component that calls the hook and renders JSX.

### 6. Extract `useStudioDrawers` hook from Studio page

`Studio.tsx` manages 6 pieces of drawer state and 5+ callbacks. 

**Create `src/hooks/useStudioDrawers.ts`** — encapsulates:
- `detailProduct`, `isDetailOpen`, `isGearDrawerOpen`, `isCompareOpen`
- `handleDetailOpen`, `handleDetailClose`, `handleGearDrawerOpen`, `handleCompareOpen`, `handleProductClickFromDrawer`

`Studio.tsx` becomes cleaner, focused on filtering logic and layout.

### 7. Extract `useProfile` hook from Profile page

`Profile.tsx` (~330 lines) mixes profile fetching, avatar upload, and save logic with UI.

**Create `src/hooks/useProfile.ts`** — encapsulates:
- Profile fetch on mount
- `handleFileChange` (avatar upload)
- `handleSave` (profile update)
- All related loading/error states

### 8. Wrap async operations with consistent error handling

Create a small utility **`src/lib/safeAsync.ts`**:
```
async function safeAsync<T>(fn: () => Promise<T>): Promise<[T, null] | [null, Error]>
```
This provides a consistent try/catch pattern that can be used across hooks and mutations, replacing ad-hoc try/catch blocks.

---

## Files Created (8 new)
- `src/components/ui/ErrorState.tsx`
- `src/components/ui/EmptyState.tsx`
- `src/components/studio/ProductImagePlaceholder.tsx`
- `src/components/community/PostAuthorMeta.tsx`
- `src/lib/constants.ts`
- `src/hooks/useAuthForm.ts`
- `src/hooks/useStudioDrawers.ts`
- `src/hooks/useProfile.ts`

## Files Modified (~15)
- `CategoryGrid.tsx`, `PostList.tsx`, `ForumSection.tsx`, `PostDetailDrawer.tsx`, `MyGearDrawer.tsx` — use ErrorState/EmptyState
- `ProductCard.tsx`, `ProductDetailDrawer.tsx`, `CompareDrawer.tsx`, `MyGearDrawer.tsx` — use ProductImagePlaceholder
- `PostList.tsx`, `PostDetailDrawer.tsx` — use PostAuthorMeta
- `Navbar.tsx`, `Footer.tsx`, `Hero.tsx`, `CommunityHero.tsx` — import from constants
- `Auth.tsx`, `Studio.tsx`, `Profile.tsx` — use extracted hooks

No database or configuration changes needed.

