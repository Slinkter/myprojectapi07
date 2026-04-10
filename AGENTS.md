# AGENTS.md - myprojectapi07

## Commands

```bash
pnpm dev              # Dev server: http://localhost:5173
pnpm build           # Production build to dist/
pnpm lint            # ESLint check
pnpm storybook       # Storybook: http://localhost:6006
pnpm deploy          # Deploy to GitHub Pages (gh-pages -d dist)
```

## Important Details

- **Package manager**: pnpm (not npm/yarn)
- **Base path**: `/myprojectapi07` (configured in vite.config.js for GitHub Pages)
- **Router**: Hash-based (`/#/pokemon`) for GitHub Pages compatibility
- **Import alias**: `@` resolves to `src/`

## Architecture

Feature-Sliced Design (FSD):
- `src/app/` - Router and global config
- `src/features/` - Business logic (pokemon, theme, favorites, search)
- `src/entities/` - Domain models (pokemon types, API, seed data)
- `src/shared/` - Reusable UI components (layout, hooks)
- `src/pages/` - Page compositions
- `src/store/` - Redux store configuration

## Testing

Project has vitest and playwright configured but no test files exist yet.

## Build Output

- Production build outputs to `dist/`
- Vite config uses manualChunks: vendor, redux, pokemonSeed
- Dark mode via Tailwind `class` strategy

## Conventions

- Components use `React.memo` for optimization
- Custom hooks live in feature's `hooks/` folder
- Story stories in `src/stories/`