import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "@/features/favorites";

/**
 * @hook useFavorites
 * @description
 * Un hook personalizado que actúa como una "Fachada" (Facade) para interactuar con el estado
 * de los Pokémon favoritos en Redux (`favoritesSlice`).
 *
 *
 * **Responsabilidades:**
 * 1.  **Acceso al Estado:** Selecciona y devuelve la lista de IDs de favoritos desde el store de Redux.
 * 2.  **Abstracción de Acciones:** Proporciona una función simplificada `togglePokemonFavorite` para modificar los favoritos, ocultando el uso de `dispatch`.
 *
 * **Efectos Secundarios:**
 * - Al invocar `togglePokemonFavorite`, se despacha una acción que modifica el estado global de Redux y actualiza el `localStorage` (a través del reducer).
 *
 * @returns {{
 *   favoriteIds: number[],
 *   togglePokemonFavorite: (pokemonId: number) => void
 * }} Un objeto que contiene la lista de IDs favoritos y la función para alternar un favorito.
 */
export const useFavorites = () => {
    const favoriteIds = useSelector((state) => state.favorites.favoriteIds);
    const dispatch = useDispatch();

    /**
     * Alterna el estado de favorito para un Pokémon específico por su ID.
     * @param {number} pokemonId - El ID del Pokémon a añadir o quitar de favoritos.
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
