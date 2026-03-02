

# Performance Optimization Plan

## 1. Code-Splitting & Lazy Loading (Bundle Size)

Every page is eagerly imported in `App.tsx`, meaning the entire app downloads on first load. Pages like Studio, Community, Auth, Profile, and About are never needed on the landing page.

**Changes to `App.tsx`:**
- Replace static imports with `React.lazy()` for all pages except `Index`
- Wrap routes in `<Suspense>` with a lightweight spinner fallback
- This defers ~60% of page-level code (Studio alone pulls in all product data, carousels, drawers, etc.)

```tsx
const Studio = lazy(() => import("./pages/Studio"));
const Community = lazy(() => import("./pages/Community"));
const Auth = lazy(() => import("./pages/Auth"));
const Profile = lazy(() => import("./pages/Profile"));
const About = lazy(() => import("./pages/About"));
```

## 2. Dependency Audit & Unused Library Removal

| Library | Size | Status | Action |
|---------|------|--------|--------|
| `recharts` | ~200KB | Only imported in `chart.tsx`, never used by any page | **Remove from package.json** and delete `chart.tsx` |
| `framer-motion` | ~130KB | Used in 31 files | Keep, but already tree-shaken; no action needed |
| `cmdk` | ~15KB | Only in `command.tsx` UI component | Check if used; if not, remove |
| `react-resizable-panels` | ~20KB | Only in `resizable.tsx` UI component | Check if used; if not, remove |
| `embla-carousel-react` | ~15KB | Only in `carousel.tsx` UI component | Check if used; if not, remove |
| `react-day-picker` | ~30KB | Only in `calendar.tsx` UI component | Check if used; if not, remove |
| `input-otp` | ~10KB | Only in `input-otp.tsx` UI component | Check if used; if not, remove |
| `vaul` | ~8KB | Used in `PostDetailDrawer` and `drawer.tsx` | Keep |

I'll verify which shadcn UI components are actually imported by application code and remove unused ones along with their dependencies.

## 3. Parallel Data Fetching (`PostDetailDrawer`)

`PostDetailDrawer` fires **3 sequential queries** when opened (post, comments, hasLiked), and both post and comments do a secondary sequential call to fetch profiles. This can be optimized:

**Current flow (sequential within each query):**
1. Fetch post → then fetch post author profile
2. Fetch comments → then fetch comment author profiles
3. Fetch hasLiked

**Optimized flow:**
- Post + comments queries already run in parallel via separate `useQuery` hooks (good)
- Within the **comments** query: use `Promise.all` to fetch comments and profiles simultaneously instead of sequentially
- Within the **post** query: same — fetch post and profile in parallel
- **Select only needed fields** instead of `select("*")`: both `forum_posts_secure` and `forum_comments_secure` use `select("*")` but only need specific columns

**PostList** has the same sequential pattern — fetch posts, then fetch profiles. Refactor to use `Promise.all`.

## 4. Rendering Optimization (React.memo, useCallback)

**No `React.memo` is used anywhere in the project.** Key candidates:

| Component | Why | Benefit |
|-----------|-----|---------|
| `ProductCard` | Re-renders on every carousel state change for all cards, not just the active one | Prevents re-render when `offset`, `isActive` haven't changed |
| `PostAuthorMeta` | Pure presentational, receives primitive props | Skips re-render when parent list re-renders |
| `ProductHighlightPanel` | Re-renders when any Studio state changes | Only re-render when `product` prop changes |
| `PaginationDots` | Re-renders on every carousel interaction | Only needs `total`, `activeIndex` |
| `CategorySection` | Re-renders when unrelated Studio state (drawer open/close) changes | Memo with products array comparison |
| `Navbar` / `Footer` | Static content, re-render on every page state change | Wrap in `React.memo` |

**PostList rendering:** The list renders all posts with `motion.article` and staggered animations. For now the list is paginated server-side so virtualization isn't needed (posts are loaded per-category, typically <50 items). Add `React.memo` to individual post items instead.

## 5. Image Optimization

The project has **13 images** in `src/assets/` — all are `.png` or `.jpg`. Vite doesn't auto-convert to WebP.

**Approach:** Create a Node script (`scripts/optimize-images.js`) that:
1. Reads all images from `src/assets/`
2. Uses the `sharp` library to:
   - Convert to WebP format
   - Resize to max dimensions (product cards display at 320x380, so cap at 640x760 for 2x retina)
   - Compress at quality 80
3. Outputs optimized files alongside originals with `.webp` extension
4. Updates import references in data files

**However**, since this is a Lovable project without a Node script runner, the practical approach is:
- Add `loading="lazy"` to all images not above the fold (already done on `ProductCard`)
- Add `loading="lazy"` to hero background image — it's decorative and below the fold threshold can be deferred
- Add explicit `width` and `height` attributes to images to prevent layout shift
- Use CSS `aspect-ratio` on image containers

## Summary of Changes

**Files to modify:**
- `App.tsx` — lazy loading routes
- `package.json` — remove `recharts` + unused shadcn dependencies
- `PostDetailDrawer.tsx` — parallel fetches + select specific fields
- `PostList.tsx` — parallel fetches + select specific fields  
- `ProductCard.tsx` — wrap in `React.memo`
- `PostAuthorMeta.tsx` — wrap in `React.memo`
- `ProductHighlightPanel.tsx` — wrap in `React.memo`
- `PaginationDots.tsx` — wrap in `React.memo`
- `CategorySection.tsx` — wrap in `React.memo`
- `Navbar.tsx` — wrap in `React.memo`
- `Footer.tsx` — wrap in `React.memo`
- Remove unused UI components: `chart.tsx` + others confirmed unused
- `Hero.tsx` — add width/height to hero image

