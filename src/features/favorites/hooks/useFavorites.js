import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "@/features/favorites/state/favoritesSlice";

/**
 * Custom hook for managing Pokémon favorites.
 * It provides access to the list of favorite Pokémon IDs and a function to toggle a Pokémon's favorite status.
 *
 * @returns {{
 *   favoriteIds: number[],
 *   togglePokemonFavorite: (pokemonId: number) => void
 * }}
 */
export const useFavorites = () => {
    const dispatch = useDispatch();
    const favoriteIds = useSelector((state) => state.favorites.favoriteIds);

    /**
     * Toggles the favorite status of a Pokémon.
     * @param {number} pokemonId - The ID of the Pokémon to toggle.
     */
    const togglePokemonFavorite = useCallback(
        (pokemonId) => {
            dispatch(toggleFavorite(pokemonId));
        },
        [dispatch]
    );

    return {
        favoriteIds,
        togglePokemonFavorite,
    };
};
