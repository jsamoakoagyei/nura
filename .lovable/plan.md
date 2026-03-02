

# Authentication Middleware and Authorization Checks

## Current State Analysis

After auditing the codebase, the backend (RLS policies) is well-configured. The gaps are on the client side:

### Issues Found

1. **No reusable auth guard** -- The Profile page uses an inline `useEffect` redirect, and the Community page has no auth guard at all (queries fail silently for unauthenticated users since RLS requires `auth.uid() IS NOT NULL`).

2. **Incorrect table for fetching other users' profiles** -- `PostList` and `PostDetailDrawer` query the `profiles` table for other users' display names, but RLS on `profiles` only allows `auth.uid() = user_id`. This means other users' names silently fail to load. The `profiles_public` view exists exactly for this purpose but isn't being used.

3. **Mutations are properly guarded** -- All write operations (`CreatePostDialog`, `PostDetailDrawer`, `Profile`) already check `if (!user) throw new Error("Not authenticated")`, and RLS enforces `user_id = auth.uid()` on all inserts/updates. No changes needed here.

## Plan

### 1. Create `ProtectedRoute` component (`src/components/auth/ProtectedRoute.tsx`)
A wrapper that checks `useAuth()` and redirects to `/auth` if unauthenticated. Shows a loading spinner while auth state resolves.

### 2. Apply `ProtectedRoute` in `App.tsx`
Wrap the `/profile` and `/community` routes with `ProtectedRoute`. Remove the inline `useEffect` redirect from `Profile.tsx`.

### 3. Fix profile queries to use `profiles_public` view
Update `PostList.tsx` and `PostDetailDrawer.tsx` to query `profiles_public` instead of `profiles` when fetching other users' display names. This fixes the silent failure where other users' names don't load.

### 4. Add RLS policy on `profiles_public` view
Add a SELECT policy so only authenticated users can read from `profiles_public` (matching the existing forum access pattern).

## Technical Details

### ProtectedRoute Component
```tsx
// Checks auth state, redirects to /auth if not logged in
// Shows loading spinner while auth resolves
// Renders children (via <Outlet />) when authenticated
```

### Route Changes in App.tsx
```tsx
<Route element={<ProtectedRoute />}>
  <Route path="/profile" element={<Profile />} />
  <Route path="/community" element={<Community />} />
</Route>
```

### Profile Query Fix
In `PostList.tsx` and `PostDetailDrawer.tsx`, change:
```typescript
// Before: fails for other users due to RLS
.from("profiles")
// After: uses public view designed for community visibility  
.from("profiles_public")
```

### Database Migration
```sql
ALTER TABLE profiles_public ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view public profiles"
  ON profiles_public FOR SELECT
  USING (auth.uid() IS NOT NULL);
```

