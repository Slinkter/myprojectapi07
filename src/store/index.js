import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "../features/pokemon/state/pokemonSlice";
import searchReducer from "../features/search/state/searchSlice";
import favoritesReducer from "../features/favorites/state/favoritesSlice";
import themeReducer from "../features/theme/state/themeSlice";

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
