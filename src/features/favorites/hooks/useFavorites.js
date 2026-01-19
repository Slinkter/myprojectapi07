import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "@/features/favorites/state/favoritesSlice";

/**
 * Hook personalizado `useFavorites`.
 *
 * **Funcionalidad:**
 * * Gestiona la lista de IDs de Pokémon marcados como favoritos.
 * * Abstrae la lógica de despacho de acciones de Redux para favoritos.
 *
 * **Flujo de interacción / ejecución:**
 * 1. Obtiene el array `favoriteIds` desde el store.
 * 2. Provee `togglePokemonFavorite` para añadir/quitar un ID.
 * 3. La persistencia (LocalStorage) suele estar manejada en el middleware o reducer, no aquí directamente.
 *
 * **Estado y efectos secundarios:**
 * * Interactúa con `state.favorites`.
 *
 * @returns {{
 *   favoriteIds: number[],
 *   togglePokemonFavorite: (pokemonId: number) => void
 * }} Datos y acciones de favoritos.
 */
export const useFavorites = () => {
    const dispatch = useDispatch();
    const favoriteIds = useSelector((state) => state.favorites.favoriteIds);

    /**
     * Alterna el estado de favorito para un Pokémon dado.
     *
     * @param {number} pokemonId - ID numérico del Pokémon.
     */
    const togglePokemonFavorite = useCallback(
        (pokemonId) => {
            dispatch(toggleFavorite(pokemonId));
        },
        [dispatch],
    );

    return {
        favoriteIds,
        togglePokemonFavorite,
    };
};
