# AGENTS.md

## Commands
- Dev server: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Deploy: `npm run deploy` (includes `predeploy` build)

## Architecture
- **Frontend**: React 18, Vite, React Router 7.
- **State**: Redux Toolkit. Store divided into feature slices (Pokemon, Search, Favorites, Theme).
- **Styling**: Tailwind CSS with a custom color palette (`primary: #EF4444`, `secondary: #3B82F6`, `tertiary: #10B981`).
- **Data**: PokéAPI via Axios.
- **Structure**: Feature-based organization in `src/features/{feature_name}/`.

## Conventions
- **Path Aliases**: Use `@/` for `src/` directory.
- **Deployment**: Configured for GitHub Pages with `base: "/myprojectapi07/"`.
- **Theming**: Dark mode is class-based (`darkMode: "class"`) and handled by `ThemeWrapper`.
