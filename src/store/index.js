import { configureStore } from "@reduxjs/toolkit";
// Se importa desde los 'barrel files' para respetar la encapsulación de cada feature
import { pokemonReducer } from "@/features/pokemon";
import { searchReducer } from "@/features/search";
import { favoritesReducer } from "@/features/favorites";
import { themeReducer } from "@/features/theme";

/**
 * @module redux-store
 * @description
 * Este módulo configura y exporta el store principal de Redux para la aplicación.
 * Es la "única fuente de verdad" que contiene todo el estado de la aplicación.
 */

/**
 * @constant {import('@reduxjs/toolkit').Store} store
 * **Responsabilidades:**
 * 1.  **Fuente de Verdad:** Centraliza el estado global de la aplicación.
 * 2.  **Configuración:** Combina todos los reducers de las features (Pokemon, Search, Favorites, Theme).
 * 3.  **Middleware:** Aplica middlewares predeterminados (Thunk, DevTools).
 *
 * **Efectos Secundarios:**
 * - Inicializa el estado de la aplicación al cargar.
 */
const store = configureStore({
    reducer: {
        pokemon: pokemonReducer,
        search: searchReducer,
        favorites: favoritesReducer,
        theme: themeReducer,
    },
});

/**
 * @typedef {ReturnType<typeof store.getState>} RootState
 * @description El tipo que representa el estado raíz (root) de la aplicación.
 * Se infiere automáticamente del store y puede ser usado para tipar hooks
 * como `useSelector` y selectores.
 */

export default store;
