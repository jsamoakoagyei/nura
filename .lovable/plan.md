

# Responsive, Loading, Empty States, and Error Handling Improvements

## Current State Assessment

The app is already well-built across most of these areas. Here's what exists and what needs improvement:

### Already Good
- **Responsiveness**: Most layouts use Tailwind responsive classes (`sm:`, `lg:`, `xl:`), container + px-4 pattern, mobile-first breakpoints. Hero, Footer, Navbar, Auth, Profile, CategoryGrid all responsive.
- **Loading states**: Profile page has full loading spinner + button disable. PostDetailDrawer has skeleton screens. CategoryGrid has skeleton grid. ForumSection has skeleton for category header. Auth buttons disable during submission.
- **Empty states**: PostList has a nice empty state with icon + message. ProductCarousel has "no products match" text. Studio has empty filter state with "Clear filters" CTA.
- **Error handling**: Auth page handles specific error types (invalid credentials, email not confirmed, user exists). Profile handles upload/save errors with toasts. CreatePostDialog and PostDetailDrawer show error toasts.

### Gaps to Fix

1. **Responsive issues**:
   - `CategoryGrid` error state is missing (only loading + data states exist; no error UI)
   - `ForumSection` "New Post" button text gets cramped on small screens
   - `CompareDrawer` table is not usable on narrow mobile (120px label column is too wide)
   - `ProductCard` is hardcoded at `280px` width which can overflow very narrow screens (<320px)

2. **Loading states missing**:
   - `CategoryGrid` has no error/retry state when fetch fails
   - `PostList` has no error state — a failed query just shows loading forever

3. **Empty states missing**:
   - `CategoryGrid` shows nothing if the categories array is empty after loading (no CTA)
   - `PostDetailDrawer` comments section says "No comments yet" but no icon/visual cue
   - `ForumSection` has no empty state if category fetch fails

4. **Error handling gaps**:
   - `PostList` query has no `onError` or error UI — failures are silent
   - `CategoryGrid` query has no error UI
   - `ForumSection` category query has no error UI
   - `toggleLike` mutation in `PostDetailDrawer` has no error toast

## Plan

### 1. Add error + empty states to `CategoryGrid`
- Add `error` + `isError` from `useQuery`, show a friendly error card with retry button
- Add empty state when `categories` is loaded but empty

### 2. Add error state to `PostList`
- Destructure `error`, `isError` from `useQuery`
- Show error card with `AlertCircle` icon, friendly message, and retry button

### 3. Add error state to `ForumSection`
- Show error card when category fetch fails, with back + retry actions

### 4. Add error toast to `toggleLike` in `PostDetailDrawer`
- Add `onError` callback to the `toggleLike` mutation

### 5. Improve empty state in `PostDetailDrawer` comments
- Add `MessageCircle` icon and softer visual styling to the "No comments yet" message

### 6. Responsive fixes
- `ForumSection`: Hide "New Post" text on mobile, show icon-only button
- `CompareDrawer`: Reduce label column to `100px` on mobile
- `ProductCard`: Use `min(280px, 80vw)` for card width so it doesn't overflow narrow screens

### 7. Minor touch-target improvements
- Ensure all interactive elements have at least `min-h-[44px]` / `min-w-[44px]` tap targets (review Navbar mobile links, pagination dots)

All changes are incremental edits to existing files. No new files or database changes needed.

