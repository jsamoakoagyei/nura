

# Add Robust Input Validation and Sanitization

## Current State

There are four user input points that write to the database:

1. **CreatePostDialog** — title (maxLength=200 on input) and content (no maxLength), no Zod validation
2. **PostDetailDrawer** — comment content (no maxLength, no validation beyond empty check)
3. **Profile page** — display name (maxLength=50 on input), avatar upload (has file type/size checks)
4. **Auth page** — email and password (already uses Zod validation)

The database has CHECK constraints for title (200), post content (10,000), comments (5,000), and display names (50), but client-side validation is inconsistent and there is no sanitization.

## Plan

### 1. Create shared validation schemas (`src/lib/validation.ts`)

Define Zod schemas and a sanitization helper in one place:

- `sanitizeText(input)` — trims whitespace, collapses excessive newlines, strips null bytes and control characters
- `postTitleSchema` — string, trimmed, 1–200 chars
- `postContentSchema` — string, trimmed, 1–10,000 chars
- `commentContentSchema` — string, trimmed, 1–5,000 chars
- `displayNameSchema` — string, trimmed, 1–50 chars (optional/nullable)
- `categoryIdSchema` — UUID format validation

### 2. Update CreatePostDialog

- Import schemas, validate title + content with Zod before mutation
- Show per-field error messages with character counts
- Add `maxLength={10000}` to the Textarea
- Sanitize inputs before insert

### 3. Update PostDetailDrawer

- Validate comment content with `commentContentSchema` before insert
- Add `maxLength={5000}` to the comment Textarea
- Show character count and validation error
- Sanitize before insert

### 4. Update Profile page

- Validate display name with `displayNameSchema` before upsert
- Show validation error inline
- Sanitize before save
- Restrict avatar file extensions to known safe types (jpg, png, gif, webp)

### 5. Render safety

- Audit all places where user-generated text is rendered — React's JSX already escapes by default, so no `dangerouslySetInnerHTML` concerns. Confirm no raw HTML rendering exists.

## Technical Details

The `sanitizeText` utility will:
```typescript
function sanitizeText(input: string): string {
  return input
    .replace(/\0/g, '')           // strip null bytes
    .replace(/[\x01-\x08\x0B\x0C\x0E-\x1F]/g, '') // strip control chars (keep \n, \r, \t)
    .replace(/\n{4,}/g, '\n\n\n') // collapse excessive newlines
    .trim();
}
```

All Zod schemas will use `.transform(sanitizeText)` to ensure sanitization happens as part of validation. Character count indicators will be added to content fields so users know their limits.

