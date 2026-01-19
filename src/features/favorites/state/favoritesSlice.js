import { createSlice } from "@reduxjs/toolkit";

/**
 * @module favoritesSlice
 * @description
 * Este módulo define el "slice" de Redux para la gestión de Pokémon favoritos.
 * Se encarga de añadir, eliminar y persistir los IDs de los favoritos en el localStorage.
 */

// La clave única para almacenar los favoritos en localStorage.
const FAVORITES_STORAGE_KEY = 'pokemon_favorites';

/**
 * Carga los IDs de los Pokémon favoritos desde localStorage.
 * Es una buena práctica envolver las interacciones con localStorage en un bloque try-catch,
 * ya que puede fallar en algunos navegadores o en modo de navegación privada.
 * @returns {number[]} Un array de IDs de Pokémon favoritos.
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
 * Guarda un array de IDs de Pokémon favoritos en localStorage.
 * @param {number[]} favoriteIds - Un array de IDs de Pokémon para guardar.
 */
const saveFavoritesToStorage = (favoriteIds) => {
    try {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds));
    } catch (error) {
        console.error("No se pudieron guardar los favoritos en localStorage", error);
    }
};

/**
 * @typedef {object} FavoritesState
 * @property {number[]} favoriteIds - Una lista que contiene los IDs numéricos de los Pokémon marcados como favoritos.
 */

/**
 * El estado inicial para el slice de favoritos.
 * @type {FavoritesState}
 */
const initialState = {
    favoriteIds: getFavoritesFromStorage(),
};

/**
 * @constant {import('@reduxjs/toolkit').Slice} favoritesSlice
 * @summary Slice de Redux para gestionar el estado de los favoritos.
 * @description Este slice maneja la lista de IDs de Pokémon favoritos.
 * Incluye un efecto secundario en su reducer `toggleFavorite` para persistir
 * los cambios en localStorage, una decisión pragmática para este proyecto.
 */
const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        /**
         * @function toggleFavorite
         * @description Reducer que añade o elimina un ID de la lista de favoritos.
         * Si el ID ya existe, se elimina. Si no existe, se añade.
         * Después de la modificación, actualiza el localStorage.
         * @param {FavoritesState} state - El estado actual del slice.
         * @param {import('@reduxjs/toolkit').PayloadAction<number>} action - La acción con el ID del Pokémon a modificar.
         */
        toggleFavorite: (state, action) => {
            const id = action.payload;
            const isFavorite = state.favoriteIds.includes(id);

            if (isFavorite) {
                state.favoriteIds = state.favoriteIds.filter(favId => favId !== id);
            } else {
                state.favoriteIds.push(id);
            }
            // Side effect: Persist to localStorage
            saveFavoritesToStorage(state.favoriteIds);
        },
    },
});

/**
 * @constant {object} actions
 * @summary Acciones de Redux exportadas del slice de favoritos.
 * @property {import('@reduxjs/toolkit').ActionCreatorWithPayload<number>} toggleFavorite - Acción para añadir/eliminar un favorito.
 */
export const { toggleFavorite } = favoritesSlice.actions;

/**
 * @constant {import('@reduxjs/toolkit').Reducer<FavoritesState>} reducer
 * @summary Reducer principal del slice de favoritos.
 */
export default favoritesSlice.reducer;