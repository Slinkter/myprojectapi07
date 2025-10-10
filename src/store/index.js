import pokemonReducer from "../features/pokemon/pokemonSlice";
import searchReducer from "../features/search/searchSlice";
import favoritesReducer from "../features/favorites/favoritesSlice";
import themeReducer from "../features/theme/themeSlice";

const rootReducer = {
    pokemon: pokemonReducer,
    search: searchReducer,
    favorites: favoritesReducer,
    theme: themeReducer,
};

export default rootReducer;