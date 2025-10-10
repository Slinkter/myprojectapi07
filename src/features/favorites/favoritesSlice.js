import { createSlice } from "@reduxjs/toolkit";

// La clave única para guardar los favoritos en el localStorage.
const FAVORITES_STORAGE_KEY = 'pokemon_favorites';

/**
 * Carga los IDs de los Pokémon favoritos desde el localStorage.
 * Es una buena práctica envolver las interacciones con localStorage en un try-catch,
 * ya que puede fallar en algunos navegadores o en modo incógnito.
 * @returns {number[]} Un array con los IDs de los Pokémon favoritos.
 */
const getFavoritesFromStorage = () => {
    try {
        const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
        console.error("No se pudieron cargar los favoritos desde localStorage", error);
        return [];
    }
};

/**
 * Guarda un array de IDs de Pokémon favoritos en el localStorage.
 * @param {number[]} favoriteIds - Un array con los IDs de los Pokémon a guardar.
 */
const saveFavoritesToStorage = (favoriteIds) => {
    try {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds));
    } catch (error) {
        console.error("No se pudieron guardar los favoritos en localStorage", error);
    }
};

const favoritesSlice = createSlice({
    name: "favorites",
    initialState: {
        favoriteIds: getFavoritesFromStorage(),
    },
    reducers: {
        toggleFavorite: (state, action) => {
            const id = action.payload;
            if (state.favoriteIds.includes(id)) {
                state.favoriteIds = state.favoriteIds.filter(favId => favId !== id);
            } else {
                state.favoriteIds.push(id);
            }
            saveFavoritesToStorage(state.favoriteIds);
        },
    },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
