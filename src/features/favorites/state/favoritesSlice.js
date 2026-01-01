import { createSlice } from "@reduxjs/toolkit";

// The unique key for storing favorites in localStorage.
const FAVORITES_STORAGE_KEY = 'pokemon_favorites';

/**
 * Loads the favorite Pokémon IDs from localStorage.
 * It's good practice to wrap localStorage interactions in a try-catch block,
 * as it can fail in some browsers or in private browsing mode.
 * @returns {number[]} An array of favorite Pokémon IDs.
 */
const getFavoritesFromStorage = () => {
    try {
        const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
        console.error("Could not load favorites from localStorage", error);
        return [];
    }
};

/**
 * Saves an array of favorite Pokémon IDs to localStorage.
 * @param {number[]} favoriteIds - An array of Pokémon IDs to save.
 */
const saveFavoritesToStorage = (favoriteIds) => {
    try {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds));
    } catch (error) {
        console.error("Could not save favorites to localStorage", error);
    }
};

const favoritesSlice = createSlice({
    name: "favorites",
    initialState: {
        favoriteIds: getFavoritesFromStorage(),
    },
    reducers: {
        /**
         * Toggles the favorite status of a Pokémon.
         * If the Pokémon is already a favorite, it's removed; otherwise, it's added.
         * The updated list of favorites is then saved to localStorage.
         * @param {object} state - The current state.
         * @param {object} action - The Redux action.
         * @param {number} action.payload - The ID of the Pokémon to toggle.
         */
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

