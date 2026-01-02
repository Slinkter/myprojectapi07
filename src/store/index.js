import { configureStore } from "@reduxjs/toolkit";
import { pokemonReducer } from "@/features/pokemon";
import { searchReducer } from "@/features/search";
import { favoritesReducer } from "@/features/favorites";
import { themeReducer } from "@/features/theme";

/**
 * The main Redux store for the application.
 * It combines all the feature-specific reducers into a single store.
 * @type {import('@reduxjs/toolkit').EnhancedStore}
 */
const store = configureStore({
    reducer: {
        pokemon: pokemonReducer,
        search: searchReducer,
        favorites: favoritesReducer,
        theme: themeReducer,
    },
});

export default store;
