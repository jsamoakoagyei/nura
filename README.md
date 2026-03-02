# The Little Voyage

A baby gear discovery and community platform for parents. Browse curated strollers and car seats, save favorites to your gear list, compare products side-by-side, and connect with other parents in the community forum.

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS, shadcn/ui
- **Animation:** Framer Motion
- **Backend:** Lovable Cloud (authentication, database, file storage)
- **Routing:** React Router v6
- **State:** React Query (server), React Context (auth), localStorage (gear list)
- **Validation:** Zod

## Getting Started

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run Vitest tests |

## Project Structure

```
src/
├── assets/              # Images (product photos, logos, hero background)
├── components/
│   ├── auth/            # Authentication guards (ProtectedRoute)
│   ├── community/       # Forum UI (posts, comments, categories)
│   ├── decorations/     # Visual embellishments (WatercolorCloud)
│   ├── layout/          # App shell (Navbar, Footer, UserMenu)
│   ├── sections/        # Landing page sections (Hero, Features, CTA)
│   ├── studio/          # Gear studio (product cards, carousels, drawers)
│   └── ui/              # shadcn/ui primitives (Button, Dialog, etc.)
├── contexts/            # React Context providers (AuthContext)
├── data/                # Static product catalogs (strollers, car seats)
├── hooks/               # Custom hooks (useAuthForm, useProfile, useLocalGearList)
├── integrations/        # Third-party clients (Supabase, Lovable)
├── lib/                 # Utilities (validation, feedback sounds, constants)
├── pages/               # Route-level components (Index, Studio, Community, Auth, Profile)
└── test/                # Test setup and example tests
```

## Architecture

### Logic / UI Separation

Business logic lives in custom hooks (`hooks/`) and utility modules (`lib/`). Page components in `pages/` compose hooks and presentational components from `components/` — they contain minimal logic themselves.

### Constants Centralization

Route paths, app metadata, and other magic strings are defined in `src/lib/constants.ts` and imported everywhere. No hardcoded route strings in components.

### Validation

All user input is validated with Zod schemas defined in `src/lib/validation.ts`. The schemas use a `.transform().pipe()` pattern to sanitize input (strip control characters, collapse whitespace) before validating the cleaned result.

### Error Handling

`src/lib/safeAsync.ts` provides a Go-style `[data, error]` tuple wrapper for async operations, keeping error handling flat and explicit.

## Key Conventions

- **File naming:** PascalCase for components (`ProductCard.tsx`), camelCase for hooks and utilities (`useProfile.ts`, `feedback.ts`)
- **Component organization:** Grouped by feature domain (`studio/`, `community/`, `layout/`), not by type
- **Exports:** Named exports for components; default exports only for page-level components (required by React.lazy)
- **Styling:** Tailwind semantic tokens from the design system — no hardcoded color values in components
