# QWEN.md - myprojectapi07

## Project Overview

**Pokédex App** - A modern React application for exploring Pokémon, built with Feature-Sliced Design (FSD) architecture. Features real-time search, favorites with localStorage persistence, dark/light theme, Motion animations, and responsive design.

**Live Demo**: https://slinkter.github.io/myprojectapi07

---

## Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| Framework | React | 18.3 |
| Build Tool | Vite | 5.4 |
| Styling | Tailwind CSS | 3.4 |
| State | Redux Toolkit | 2.11 |
| Routing | React Router (Hash) | 7 |
| Animations | Motion | 12 |
| HTTP | Axios | 1.15 |
| Package Manager | pnpm | 10.3 |
| Component Dev | Storybook | 10.3 |
| Testing | Vitest + Playwright | configured, no tests yet |

---

## Building and Running

```bash
pnpm dev              # Dev server: http://localhost:5173
pnpm build            # Production build to dist/
pnpm preview          # Preview production build
pnpm lint             # ESLint check
pnpm storybook        # Storybook: http://localhost:6006
pnpm build-storybook  # Build Storybook documentation
pnpm deploy           # Deploy to GitHub Pages (gh-pages -d dist)
```

**Prerequisites**: Node.js 18+, pnpm 8+

---

## Architecture: Feature-Sliced Design (FSD)

```
src/
├── app/                    # Router and global config
│   └── router/
│       ├── index.jsx       # Hash router configuration
│       ├── MainLayout.jsx  # Layout for main pages
│       ├── DetailLayout.jsx# Layout for detail pages (no navbar)
│       └── ErrorPage.jsx   # 404 fallback
├── pages/                  # Page compositions
│   ├── PokedexPage.jsx     # Main pokedex list page
│   └── PokemonDetailPage.jsx # Pokemon detail view
├── features/               # Business logic (encapsulated)
│   ├── pokemon/           # Pokemon feature (11 files)
│   │   ├── api/pokemonApi.js      # API client with cache
│   │   ├── components/            # PokemonCard, PokemonList, PokemonDetail, etc.
│   │   ├── hooks/                 # usePokemon, usePokemonList, usePokemonCard
│   │   ├── state/                 # pokemonSlice, pokemonSelectors
│   │   └── index.js               # Barrel export
│   ├── favorites/         # Favorites system with localStorage
│   ├── search/            # Search and filter logic
│   └── theme/             # Dark/light theme toggle
├── entities/               # Domain models
│   └── pokemon/
│       ├── data/seed.js   # Static Pokemon seed data (3206 lines)
│       ├── model/
│       │   ├── mapper.js  # API -> entity mapper
│       │   ├── selectors.js # Redux selectors (cross-slice)
│       │   └── utils.js   # enrichWithFavorites, filterBySearch
│       ├── types/index.js # JSDoc type definitions
│       └── index.js       # Barrel export
├── shared/                 # Reusable UI components
│   ├── components/
│   │   ├── layout/
│   │   │   ├── MainLayout.jsx      # DUPLICATE - see audit
│   │   │   ├── Navbar.jsx
│   │   │   └── GlobalErrorBoundary.jsx
│   │   └── Pagination.jsx
│   └── hooks/
│       ├── usePagination.js
│       └── useLifecycleLog.js
├── store/
│   └── index.js            # Redux store (4 slices)
├── services/
│   └── api/config.js       # API base URL, endpoints, defaults
├── lib/
│   ├── httpClient.js       # Axios instance with interceptors
│   ├── logger.js           # Structured logger with categories
│   ├── utils.js            # cn() utility (clsx + tailwind-merge)
│   └── domainTypes.js      # JSDoc type definitions (DUPLICATE)
├── utils/
│   └── constants.js        # UI_CONSTANTS, TYPE_COLORS
└── index.css               # Global styles, custom animations
```

---

## Configuration

### Vite (`vite.config.js`)
- **Base path**: `/myprojectapi07` (GitHub Pages)
- **Alias**: `@` → `src/`
- **Manual chunks**: `vendor` (react, react-dom, react-router), `redux` (RTK, react-redux), `pokemonSeed` (seed data)

### Tailwind (`tailwind.config.cjs`)
- **Dark mode**: `class` strategy
- **Custom colors**: `primary: #EF4444`, `secondary: #3B82F6`, `tertiary: #10B981`
- **Custom font**: Inter
- **Custom animations**: fade-in, slide-in, bounce-in
- **Plugin**: tailwindcss-animate

### ESLint (`.eslintrc.cjs`)
- Extends: react/recommended, react/jsx-runtime, react-hooks/recommended, storybook/recommended
- Plugin: react-refresh (warn on non-exported components)

### jsconfig.json
- Path alias: `@/*` → `./src/*`

---

## Redux Store

| Slice | State Shape | Key Actions |
|-------|------------|-------------|
| `pokemon` | `{ pokemons: [], status, error, pagination }` | `fetchPokemons.pending/fulfilled/rejected` |
| `search` | `{ searchFilter: "" }` | `setSearchFilter` |
| `favorites` | `{ favoriteIds: [] }` | `togglePokemonFavorite`, `setFavorites`, `loadFavoritesFromStorage` |
| `theme` | `{ mode: "light" | "dark" }` | `setTheme`, `toggleTheme` |

**Middleware**: `serializableCheck: false` (allows non-serializable state), `redux-logger` (dev only)

---

## Routing

| Path | Layout | Component |
|------|--------|-----------|
| `/` | MainLayout (with Navbar) | PokedexPage (lazy) |
| `/pokemon/:id` | DetailLayout (no Navbar) | PokemonDetailPage (lazy) |
| `*` | — | ErrorPage (404) |

---

## Audit Findings: Critical Issues

> These are the highest-priority issues found during code audit. Address these first.

### BUG: Invalid React prop in Navbar
**File**: `src/shared/components/layout/Navbar.jsx`
```jsx
// BUG: sm:size={24} is NOT valid React. React will pass "sm:size" as a literal prop.
<HiSun size={20} sm:size={24} />
```
**Fix**: Use a responsive wrapper or detect screen size via hook/MQ.

### BUG: Logger category mismatch silences errors
**File**: `src/lib/logger.js`
Both `logger.warn()` and `logger.error()` map to category `"API"`. Disabling `"API"` category also silences error logs.
**Fix**: Map `error()` to its own `"ERROR"` category.

### BUG: `process.env.NODE_ENV` may not work in Vite
**File**: `src/lib/logger.js`
Vite uses `import.meta.env.PROD`, not `process.env.NODE_ENV`. Debug logs may leak in production.
**Fix**: Replace with `import.meta.env.PROD`.

### BUG: `<a>` tag causes full page reload on 404
**File**: `src/app/router/ErrorPage.jsx`
```jsx
<a href="/myprojectapi07/">Volver al inicio</a>
```
**Fix**: Use `<Link to="/" />` from react-router-dom for client-side navigation.

### BUG: Hardcoded base path breaks on different deployments
**File**: `src/app/router/ErrorPage.jsx`
**Fix**: Use `import.meta.env.BASE_URL` or `useNavigate`.

---

## Audit Findings: Performance Issues

### 1. `selectPokemonById` is NOT memoized
**File**: `src/features/pokemon/state/pokemonSelectors.js`
Creates a new selector function on every call, defeating Redux memoization. Every render re-computes.
**Fix**: Use `createSelector` with a factory pattern or `useMemoizedSelector`.

### 2. Unbounded memory cache
**File**: `src/features/pokemon/api/pokemonApi.js`
`memoryCache` Map grows forever. No LRU eviction or max size.
**Fix**: Add max size limit with LRU eviction.

### 3. localStorage serialization on every write
**File**: `src/features/pokemon/api/pokemonApi.js`
`saveCacheToStorage` serializes entire cache on every single write → O(n) per write, O(n²) total.
**Fix**: Debounce/throttle persistence; only persist periodically.

### 4. Motion animation overload
**Files**: PokemonCard, PokemonDetail, PokemonSkeleton, PokedexHeader
A 20-card grid mounts 80+ `motion.div` instances simultaneously → jank on low-end devices.
**Fix**: Reduce animations for grid items; use CSS transitions for simple cases; respect `prefers-reduced-motion`.

### 5. `useLifecycleLog` runs on EVERY render
**File**: `src/shared/hooks/useLifecycleLog.js`
Second `useEffect` has no dependency array → runs after every render → console spam.
**Fix**: Add proper dependency array or remove hook from production builds.

### 6. `useMemo` in PokemonList re-computes every render
**File**: `src/features/pokemon/components/PokemonList.jsx`
`[pokemons]` dependency is a new array reference every Redux state change.
**Fix**: Use `selectProcessedPokemons` (already memoized) directly in component.

---

## Audit Findings: Code Quality (DRY Violations)

| Duplication | Files Involved | Severity |
|-------------|---------------|----------|
| `MainLayout.jsx` duplicate | `src/shared/components/layout/` vs `src/app/router/` | HIGH |
| Pokemon types duplicated | `src/lib/domainTypes.js` vs `src/entities/pokemon/types/` | MEDIUM |
| `typeColors` vs `TYPE_COLORS` | `PokemonCard.jsx` vs `utils/constants.js` (different values!) | MEDIUM |
| `usePokemon` vs `usePokemonList` | Nearly identical hooks | MEDIUM |
| Fallback object `{id:0, name:"Unknown"}` | `mapper.js`, `pokemonApi.js` (multiple places) | LOW |
| Layout Tailwind classes | `MainLayout`, `DetailLayout`, `GlobalErrorBoundary`, `ErrorPage` | LOW |
| `selectProcessedPokemons` logic | Entity layer vs feature layer (different implementations!) | HIGH |

---

## Audit Findings: Accessibility

| Issue | File | Fix |
|-------|------|-----|
| Clickable div without `role="button"`, `tabIndex`, or keyboard handler | `PokemonCard.jsx` | Add `role="button" tabIndex={0} onKeyDown` |
| Favorite button missing `aria-pressed` | `PokemonCard.jsx` | Add `aria-pressed={favorite}` |
| Skeleton missing `role="status"` and `aria-label` | `PokemonSkeleton.jsx` | Add `role="status" aria-label="Loading"` |
| Image missing descriptive `alt` | `PokemonDetail.jsx` | Use `alt={`${name} sprite`}` |
| Nav element missing `aria-label` | `Navbar.jsx` | Add `aria-label="Main navigation"` |
| 404 page missing `role="alert"` | `ErrorPage.jsx` | Add `role="alert"` |
| No `prefers-reduced-motion` support | All Motion components | Check `window.matchMedia("(prefers-reduced-motion: reduce)")` |

---

## Audit Findings: Architecture

### FSD Violations
1. **Entity layer exports Redux selectors** (`selectProcessedPokemons`, `selectPokemons` from `entities/pokemon/`). Selectors belong in features.
2. **`enrichWithFavorites` depends on 3 Redux slices** (pokemon, favorites, search) from the entity layer. Entities should be state-agnostic.
3. **Seed data (85KB+) exported from barrel file** — any import from `@/entities/pokemon` may bundle the entire seed.

### Race Conditions
1. **Cache read-modify-write** in `pokemonApi.js` — concurrent async calls can overwrite each other.
2. **`PokedexPage` favorites loading** — `useEffect` with `isMounted` flag but no `AbortController`.
3. **Rapid pagination clicks** — no debounce, requests resolve out of order.

### Error Handling
1. **No retry logic** for failed API calls.
2. **Silent error swallowing** in cache layer — localStorage failures are invisible.
3. **`id: 0` sentinel pattern** instead of `null`/`throw` for invalid data detection.

---

## Development Conventions

### Code Style
- **Naming**: `camelCase` (functions/variables), `PascalCase` (components)
- **Imports**: `@/` alias for `src/`
- **Components**: Functional with `React.memo`
- **Hooks**: Custom hooks in feature's `hooks/` folder

### State Management
- Redux Toolkit with thunk middleware
- localStorage persistence for favorites (side effect in reducer — not ideal)
- `serializableCheck: false` in store config

### Styling
- Tailwind CSS utility-first
- `clsx` + `tailwind-merge` via `cn()` in `src/lib/utils.js`
- Custom classes: `.btn-primary`, `.card-base` in `index.css`
- Custom animations: `.animate-fade-in`, `.animate-slide-in`

---

## Key API Details

### PokeAPI Integration
- **Base URL**: `https://pokeapi.co/api/v2`
- **Endpoints**: `/pokemon` (list), `/pokemon/{id}` (details)
- **Default limit**: 20
- **Caching**: In-memory Map + localStorage fallback (needs optimization)

### Data Flow
```
API → transformPokemonData → mapToPokemonEntity → Redux slice → Selector → Component
                                              ↘ enrichWithFavorites → Component
```

---

## Important Notes for AI Agent

1. **ALWAYS use pnpm** — never npm or yarn
2. **Hash routing** — paths use `/#/` for GitHub Pages
3. **Base path** — `/myprojectapi07` in vite.config.js; use `import.meta.env.BASE_URL` for dynamic paths
4. **`React.memo`** — wrap all new components
5. **FSD layers** — features should NOT import from pages; entities should be state-agnostic
6. **Storybook** — new components need stories
7. **Dark mode** — Tailwind `class` strategy (toggle `dark` class on `<html>`)
8. **No TypeScript** — project uses JSDoc for type hints
9. **No i18n** — all UI text is in Spanish, hardcoded
10. **No tests** — vitest/playwright configured but zero test files

---

## Roadmap (from project docs)

- [ ] Migrate to Next.js + TypeScript
- [ ] Implement E2E tests
- [ ] Performance optimization (cache, animations, memoization)
- [ ] Fix accessibility issues
- [ ] Resolve duplicated code (MainLayout, types, colors, selectors)
- [ ] Add `prefers-reduced-motion` support
- [ ] Implement i18n
- [ ] Add proper error boundaries
- [ ] Fix logger category bug
- [ ] Add AbortController for async operations
- [ ] Implement LRU cache eviction

---

*Audited: April 10, 2026 | Total files analyzed: 75 (50 code + 23 docs + 2 config)*
