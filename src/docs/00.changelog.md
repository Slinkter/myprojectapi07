# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2025-04-09

### Added
- **Motion Animations**: Integrated Framer Motion for smooth animations across all components:
  - PokemonCard: entrance, hover lift, image bounce, favorite star spring
  - PokemonSkeleton: shimmer pulse effect
  - FavoritesBar: staggered items, AnimatePresence for removals
  - FavoritePokemon: hover scale, image rotate, tap shrink
  - SearchBar: focus glow, clear button fade
  - PokedexHeader: letter-by-letter spring entrance
  - Pagination: button hover/tap, page number transitions
  - PokemonDetailPage: page transitions, back button animations
  - PokemonDetail: stat bars animate width with staggered delay

- **Storybook Integration**: Added component documentation:
  - Configured `.storybook/main.jsx` and `.storybook/preview.jsx`
  - Created stories for: PokemonCard, PokemonSkeleton, PokedexHeader, Pagination, SearchBar

- **UI Plugins**:
  - `clsx` + `tailwind-merge`: Utility function `cn()` in `src/lib/utils.js`
  - `react-hot-toast`: Toast notifications configured in `main.jsx`
  - `react-lazy-load-image-component`: Lazy loading with blur effect on PokemonCard

- **Mobile-First Optimizations**:
  - Responsive breakpoints for all components (xs, sm, md, lg, xl)
  - PokemonList: 2-column grid on mobile, 5-column on XL
  - Improved FavoritePokemon pill sizes
  - Touch-friendly spacing

### Changed
- **Router**: Migrated from `createBrowserRouter` to `createHashRouter` for GitHub Pages compatibility
- **Layout**: Separated MainLayout (with Navbar) and DetailLayout (without Navbar) for better UX
- **Vite Config**: Updated `base` to `/myprojectapi07`

### Fixed
- **Navbar on Detail Page**: Removed navbar from Pokemon detail page, now shows only "Volver" button
- **404 on Refresh**: Fixed by using hash router for SPA routing on GitHub Pages
- **FavoritePokemon Size**: Increased padding, image size, and font for better visibility

---

## [0.9.0] - 2025-04-XX

### Added
- **Redux Logger**: Integrated redux-logger middleware in store
- **FSD Architecture**: Refactored project structure following Feature-Sliced Design

### Changed
- Moved seed data from `src/entities/pokemon/model/` to `src/entities/pokemon/data/`
- Created `src/entities/pokemon/types/index.js` for domain types
- Created `src/app/router/index.jsx` for centralized routing

---

## [0.8.0] - 2025-03-XX

### Added
- **PokemonDetail Component**: New page showing Pokemon details with stats
- **PokemonDetailPage**: Route for individual Pokemon viewing
- **Custom Logger**: Enhanced logging with levels (DEBUG, INFO, WARN, ERROR), categories, timestamps

### Fixed
- Component imports after folder restructuring

---

## [0.7.0] - 2025-02-XX

### Added
- **Search Functionality**: SearchBar component with filtering
- **Favorites System**: FavoritesBar with FavoritePokemon components
- **Pagination**: Reusable Pagination component

### Changed
- Updated PokemonList grid layout
- Improved PokemonCard mobile responsiveness

---

## [0.6.0] - 2025-01-XX

### Added
- **Theme Toggle**: Light/Dark mode with persistence (localStorage)
- **Motion Animations**: Initial animation setup

---

## [0.5.0] - 2024-12-XX

### Added
- **Pokemon API Integration**: Fetching data from PokéAPI
- **Redux Store**: Centralized state management with Redux Toolkit
- **Components**: PokemonCard, PokemonList, PokemonContent, PokedexHeader, PokemonSkeleton

---

## [0.1.0] - Project Init

### Added
- Initial project setup with Vite + React
- Basic Tailwind CSS configuration
- Project structure with features, entities, shared folders

---

## Archived Entries

### Pre-0.1.0 History
- Multiple refactorings following Clean Architecture principles
- Tutorial documentation created
- Spanish translations added to README
- Format improvements across API config and components
- FavoritePokemon sprite handling fixes

---

## Migration Notes

### v1.0.0 Breaking Changes
- Router now uses hash-based URLs (`/#/pokemon/1` instead of `/pokemon/1`)
- For Vercel deployment, switch to `createBrowserRouter` and update vite config `base`

### Future v2.0.0 (Planned)
- Migration to Next.js + TypeScript
- Server-side rendering
- Remove Redux in favor of Zustand or React Query