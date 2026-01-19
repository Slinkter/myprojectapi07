# Pokédex API 07

* * *

**Pokédex API 07** is a modern web application, built with **React** and **Vite**, that allows users to explore the world of Pokémon. The application consumes the [PokéAPI v2](https://pokeapi.co/) and presents the data in a clean, fast, and fully responsive user interface.

This project not only serves as a functional tool for Pokémon fans but also as an advanced case study in frontend software architecture. It demonstrates Clean Architecture principles through patterns like **Feature-Sliced Design**, a clear **Routing** system, **reusable Presentational Components**, and robust global state management with **Redux Toolkit** and **memoized selectors**.

![Project Screenshot](api07.png)

## ✨ Key Features

-   **Pokémon Catalogue & Pagination:** Browse the complete Pokémon list with an efficient pagination system.
-   **Real-time Search:** Instantly filter Pokémon by name.
-   **Favorites Management:** Mark your favorite Pokémon and see them in a dedicated section.
-   **Dark Mode:** Switch between light and dark themes for visual comfort.
-   **Fully Responsive Design:** Enjoy an optimal user experience on any device.
-   **Smooth Animations & Transitions:** The UI is enhanced with animations that improve user experience without sacrificing performance.

## 🚀 Tech Stack

-   **Framework:** [React 18](https://reactjs.org/)
-   **Build Tool:** [Vite](https://vitejs.dev/)
-   **Routing:** [React Router](https://reactrouter.com/)
-   **Language:** JavaScript (ES6+)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **Global State Management:** [Redux Toolkit](https://redux-toolkit.js.org/)
-   **HTTP Client:** [Axios](https://axios-http.com/)
-   **Icons:** [React Icons](https://react-icons.github.io/react-icons/)
-   **Deployment:** [GitHub Pages](https://pages.github.com/)

---

## 🏛️ Applied Architecture

The project's architecture is designed to be modular, scalable, and maintainable, adhering to **Clean Architecture** and **SOLID** principles.

### Core Principles

-   **Feature-Sliced Design:** The codebase is organized by features (e.g., `pokemon`, `search`, `favorites`). Each feature is a self-contained module that encapsulates its own UI (components), logic (hooks), state (Redux slice), and API services. This promotes low coupling and high cohesion.
-   **Separation of Concerns:** A strict separation is maintained between different layers of the application:
    -   **Components (UI):** Dumb/Presentational components are used for rendering UI, while smart/Container components orchestrate logic.
    -   **Hooks (Stateful Logic):** Custom hooks encapsulate reusable stateful logic (e.g., `usePagination`).
    -   **Redux (Global State):** Redux Toolkit manages global state. Business logic that involves multiple features is handled by **memoized selectors** (`createSelector`) to compute derived data efficiently.
    -   **Services (API):** A dedicated API layer (`pokemonApi.js`) handles all network requests, abstracting away the implementation details from the rest of the app.

### Key Architectural Patterns

1.  **Layout & Routing:**
    -   A declarative routing system is managed by **`react-router-dom`**.
    -   A `MainLayout` component provides a consistent UI shell (Navbar, background) for all main pages.
    -   The `AppRoutes` component defines the application's page structure, using `<Outlet>` to render content within the layout.

2.  **Reusable Components:**
    -   Common, stateless UI elements are located in `src/components/common` (e.g., `Pagination.jsx`). These components are designed to be highly reusable and receive all their data and callbacks via props.

3.  **State Management & Data Flow:**
    -   **Single Source of Truth:** Global state is managed by Redux. For local or UI-specific state, React's native hooks (`useState`, `useCallback`) are used, as seen in `usePagination`.
    -   **Unidirectional Data Flow:** Data flows from Redux or hooks down to components. Events flow up from components via callbacks.
    -   **Memoized Selectors:** To prevent unnecessary re-renders and keep business logic out of components, `createSelector` is used to compute derived state (e.g., filtering and mapping Pokémon lists). Components subscribe to this processed data, not the raw state.

---

## 📦 Installation and Setup

To run this project in your local environment, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/slinkter/myprojectapi07.git
    cd myprojectapi07
    ```

2.  **Install dependencies:**
    It is recommended to use `pnpm` for efficient package management.
    ```bash
    pnpm install
    ```

3.  **Run the development server:**
    ```bash
    pnpm run dev
    ```
    The application will be available at `http://localhost:5173` (or the port indicated by Vite).

##  NPM Scripts

-   `pnpm dev`: Starts the Vite development server.
-   `pnpm build`: Compiles the application for production.
-   `pnpm lint`: Analyzes the code with ESLint.
-   `pnpm preview`: Serves the production build locally for preview.

## 📄 Additional Documentation

Detailed project documentation, including architectural decisions and diagrams, can be found in the [`/src/docs`](./src/docs/) directory.
