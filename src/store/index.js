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
 * @summary El store principal de Redux de la aplicación.
 * @description
 * Creado con `configureStore`, este objeto combina todos los reducers de las diferentes
 * features en un único árbol de estado. `configureStore` automáticamente añade middlewares
 * útiles como `redux-thunk` y habilita la integración con las Redux DevTools.
 *
 * La forma del estado global es:
 * ```
 * {
 *   pokemon: PokemonState,
 *   search: SearchState,
 *   favorites: FavoritesState,
 *   theme: ThemeState
 * }
 * ```
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
