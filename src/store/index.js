import { configureStore } from "@reduxjs/toolkit";
import { pokemonReducer } from "@/features/pokemon";
import { searchReducer } from "@/features/search";
import { favoritesReducer } from "@/features/favorites";
import { themeReducer } from "@/features/theme";
import { default as reduxLogger } from "redux-logger";

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    search: searchReducer,
    favorites: favoritesReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(reduxLogger),
});

export default store;
