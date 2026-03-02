

# Documentation, Structure, and Cleanup Plan

## 1. Add business-logic comments to key files

Add "why" comments (not "what") to the files with non-obvious logic:

- **`AuthContext.tsx`**: Explain why `onAuthStateChange` is set up before `getSession` (prevents race condition where session is established before listener catches it). Explain why `createProfileIfNeeded` is deferred with `setTimeout(fn, 0)` (avoids Supabase auth callback deadlock).
- **`useAuthForm.ts`**: Explain why known error messages are string-matched (Supabase returns generic errors; we map them to user-friendly messages). Explain why `emailRedirectTo` is set on signup (required for email confirmation flow to return users to the app).
- **`useProfile.ts`**: Explain the `PGRST116` error code check (means "no rows found" — expected for new users who haven't set up a profile yet). Explain the cache-busting `?t=${Date.now()}` on avatar URLs (CDN caching would otherwise show stale avatars). Explain why `upsert` with `onConflict: "user_id"` is used instead of update (handles the edge case where a profile row doesn't exist yet).
- **`useStudioDrawers.ts`**: Explain the `setTimeout` delays in `handleDetailClose` (300ms) and `handleProductClickFromDrawer` (200ms) — these let the closing drawer animation complete before opening the next one, preventing visual glitches.
- **`useLocalGearList.ts`**: Explain why state initializer reads from localStorage synchronously (avoids a flash of empty state on mount). Explain the SSR guard (`typeof window === "undefined"`).
- **`feedback.ts`**: Explain the musical note frequencies (C5/E5/G5 form a C-major chord for a pleasant ascending chime). Explain why `AudioContext` is a singleton with `resume()` (browser autoplay policies suspend contexts created before user interaction). Explain why volume is kept at 0.1-0.15 (subtle enough for a baby-product app — parents may have sleeping children nearby).
- **`validation.ts`**: Explain the `.transform().pipe()` pattern (Zod runs the transform first, then validates the result — this catches inputs that are only whitespace after sanitization). Explain why control characters are stripped but `\n`, `\r`, `\t` are kept (users need line breaks in forum posts).
- **`safeAsync.ts`**: Explain the Go-style `[data, error]` tuple pattern and why it's preferred over try/catch in calling code (enables cleaner control flow without nested blocks).

## 2. Generate comprehensive README.md

Replace the current generic Lovable README with a project-specific one covering:

- **Project description**: "The Little Voyage" — a baby gear discovery and community platform for parents
- **Tech stack**: React 18, Vite, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Lovable Cloud (backend)
- **Getting started**: Clone, `npm install`, `npm run dev`
- **Project structure overview**: A directory tree with descriptions for each folder (`pages/`, `components/`, `hooks/`, `lib/`, `data/`, `contexts/`, `integrations/`)
- **Architecture notes**: Logic/UI separation pattern, constants centralization, shared components
- **Available scripts**: `dev`, `build`, `lint`, `test`
- **Key conventions**: File naming, component organization, validation approach

## 3. Remove dead code and reorganize folder structure

**Delete unused files** (confirmed zero imports):
- `src/components/NavLink.tsx` — never imported
- `src/components/studio/StrollerCard.tsx` — superseded by `ProductCard.tsx`
- `src/components/studio/StrollerCarousel.tsx` — superseded by `ProductCarousel.tsx`
- `src/components/studio/HighlightPanel.tsx` — superseded by `ProductHighlightPanel.tsx`

**Move misplaced file**:
- `src/components/community/PostAuthorMeta.tsx` is a shared UI primitive (renders an avatar + name + timestamp). However, since it's only used by community components, it stays where it is — no move needed.

**The existing structure is already well-organized.** The current grouping (by feature domain: `studio/`, `community/`, `layout/`, `sections/`, `ui/`) follows established conventions. No major reorganization is warranted — only the dead file cleanup above.

## 4. Suggest Git commit message

Provide a conventional-commit-format message the user can use for the cumulative recent changes.

## Summary of changes

| Action | Files |
|--------|-------|
| Add business-logic comments | `AuthContext.tsx`, `useAuthForm.ts`, `useProfile.ts`, `useStudioDrawers.ts`, `useLocalGearList.ts`, `feedback.ts`, `validation.ts`, `safeAsync.ts` |
| Rewrite README.md | `README.md` |
| Delete dead code | `NavLink.tsx`, `StrollerCard.tsx`, `StrollerCarousel.tsx`, `HighlightPanel.tsx` |

No database or configuration changes needed.

