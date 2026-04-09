# AGENTS.md

## Commands
- Dev server: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Deploy: `npm run deploy` (runs `predeploy` which calls `npm run build`)

## Architecture
- **Frontend**: React 18, Vite, React Router 7
- **State**: Redux Toolkit with redux-thunk, store in `src/store/index.js`
- **Slices**: `pokemon`, `search`, `favorites`, `theme`
- **Styling**: Tailwind CSS with `darkMode: "class"` and custom colors: `primary` (#EF4444), `secondary` (#3B82F6), `tertiary` (#10B981)
- **Data**: PokéAPI via Axios
- **Structure**: Feature-based in `src/features/{feature_name}/`
- **Routing**: Lazy loading with `Suspense` fallback (`<PokemonSkeleton />`) in `src/routes/AppRoutes.jsx`

## Conventions
- **Path Aliases**: Use `@/` for `src/` directory (defined in `jsconfig.json` and `vite.config.js`)
- **Deployment**: GitHub Pages at `https://slinkter.github.io/myprojectapi07`
- **Base URL**: Vite `base` is full URL (not just "/myprojectapi07/"), same basename in `BrowserRouter`
- **Package Manager**: pnpm (referenced in README, but npm scripts work)
