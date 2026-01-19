# 🧩 Patrones de Diseño Aplicados

Este documento detalla los patrones de diseño de software clave utilizados en la aplicación para garantizar un código limpio, modular, eficiente y escalable.

---

### 1. Componentes de Presentación y Contenedores (Presentational and Container Components)

Este patrón separa la lógica y el manejo del estado de la renderización de la UI.

-   **Componentes Contenedores (o Páginas):**
    -   **Responsabilidad:** Se preocupan de *cómo funcionan las cosas*. Orquestan la obtención de datos (a través de hooks), manejan el estado y despachan acciones.
    -   **Implementación:** En este proyecto, las páginas como `PokedexPage.jsx` actúan como contenedores. No contienen JSX de bajo nivel, sino que componen componentes de presentación.

-   **Componentes de Presentación:**
    -   **Responsabilidad:** Se preocupan de *cómo se ven las cosas*. Reciben datos y callbacks exclusivamente a través de props. No tienen conocimiento del estado global (Redux) ni de dónde vienen los datos.
    -   **Beneficio:** Son altamente reutilizables, fáciles de probar y de razonar.
    -   **Ejemplo:** `PokemonList.jsx` o el nuevo `Pagination.jsx`.

    ```jsx
    // src/components/common/Pagination.jsx
    // Componente de presentación puro. Recibe todo por props.
    const Pagination = ({ currentPage, totalPages, onPageChange }) => {
      // ... lógica de renderizado ...
    };
    ```

### 2. Componente de Layout (Layout Component)

Este patrón se utiliza para crear una estructura de página consistente (ej. con una barra de navegación y un pie de página) que puede ser reutilizada por múltiples vistas.

-   **Responsabilidad:** Define el "marco" o "cascarón" de la UI. Utiliza `react-router-dom` para renderizar el contenido específico de la página dentro de él.
-   **Beneficio:** Evita la duplicación de código de layout en cada página y centraliza la estructura visual de la aplicación.
-   **Implementación:** `MainLayout.jsx` y su uso en `AppRoutes.jsx`.

    ```jsx
    // src/components/layout/MainLayout.jsx
    const MainLayout = () => {
      return (
        <div className="min-h-screen ...">
          <Navbar />
          <main>
            <Outlet /> {/* El contenido de la ruta anidada se renderiza aquí */}
          </main>
        </div>
      );
    };

    // src/routes/AppRoutes.jsx
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<PokedexPage />} />
      </Route>
    </Routes>
    ```

### 3. Hooks Personalizados (Custom Hooks)

Los hooks personalizados se utilizan para encapsular y reutilizar lógica con estado. En este proyecto, se usan de dos maneras principales:

-   **Para Lógica de UI Aislada:** Como en `usePagination`, que encapsula toda la lógica para gestionar el estado de la paginación de forma autocontenida.
-   **Como Fachada (Facade) para Features:** Como en `usePokemon`, que actúa como un punto de entrada simple a la lógica más compleja de una feature de Redux. El componente no necesita saber sobre `useDispatch` o las acciones de Redux; solo consume el hook.

    ```javascript
    // src/features/pokemon/hooks/usePokemon.js
    // Este hook es una "fachada" que simplifica la interacción con el slice de Pokémon.
    export const usePokemon = () => {
        const dispatch = useDispatch();

        const { totalCount, isLoading, error } = useSelector((state) => state.pokemon);

        const fetchPokemons = useCallback(({ page, limit = 20 }) => {
            dispatch(fetchPokemonsThunk({ page, limit }));
        }, [dispatch]);

        return { totalCount, isLoading, error, fetchPokemons };
    };
    ```

### 4. Selector Memoizado (Memoized Selector)

Este es un patrón de optimización y de separación de lógica. Se utiliza para calcular datos derivados del estado de Redux.

-   **Responsabilidad:** Tomar datos "crudos" del store y transformarlos en la estructura que la UI necesita.
-   **Beneficio:**
    1.  **Rendimiento:** El selector solo se recalcula si sus datos de entrada cambian, evitando re-renders innecesarios en los componentes.
    2.  **Abstracción:** La lógica de negocio compleja se mueve del componente al selector, manteniendo los componentes limpios.
-   **Implementación:** Usando `createSelector` de Redux Toolkit.

    ```javascript
    // src/features/pokemon/state/pokemonSelectors.js
    import { createSelector } from "@reduxjs/toolkit";

    const selectPokemons = (state) => state.pokemon.pokemons;
    const selectFavoriteIds = (state) => state.favorites.favoriteIds;

    export const selectProcessedPokemons = createSelector(
      [selectPokemons, selectFavoriteIds],
      (pokemons, favoriteIds) => {
        // ... lógica para combinar los datos ...
        return processedData;
      }
    );
    ```

### 5. Servicio Singleton (Singleton Service)

Este patrón asegura que solo exista una única instancia de un servicio a lo largo de toda la aplicación, compartiendo su configuración y estado (si lo tuviera).

-   **Responsabilidad:** Centralizar la configuración y la lógica de acceso a recursos externos.
-   **Beneficio:** Proporciona un punto único para gestionar la comunicación con APIs, incluyendo interceptores para tokens, manejo de errores, etc.
-   **Implementación:** El módulo `httpClient.js` crea y exporta una única instancia de Axios configurada.

    ```javascript
    // src/lib/httpClient.js
    import axios from "axios";

    const httpClient = axios.create({
        baseURL: "...",
        timeout: 10000,
    });

    // ... interceptores ...

    export default httpClient; // Se exporta la instancia, no la clase.
    ```

---

[Regresar al README](../../README.md)
