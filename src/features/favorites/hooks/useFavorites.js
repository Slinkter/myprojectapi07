import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "@/features/favorites";

/**
 * @hook useFavorites
 * @description
 * Un hook personalizado que actúa como una "Fachada" (Facade) para interactuar con el estado
 * de los Pokémon favoritos en Redux (`favoritesSlice`).
 *
 * @details
 * Encapsula la lógica de acceso al estado de favoritos:
 * 1.  **Selecciona el estado:** Usa `useSelector` para obtener el array `favoriteIds` actual.
 * 2.  **Abstrae acciones:** Expone una función `togglePokemonFavorite` que internamente despacha la
 *     acción `toggleFavorite` correspondiente, ocultando la complejidad de `dispatch`.
 *
 * @returns {{
 *   favoriteIds: number[],
 *   togglePokemonFavorite: (pokemonId: number) => void
 * }} Un objeto que contiene la lista de IDs favoritos y la función para alternar un favorito.
 */
export const useFavorites = () => {
  const dispatch = useDispatch();
  const favoriteIds = useSelector((state) => state.favorites.favoriteIds);

  /**
   * Alterna el estado de favorito para un Pokémon específico por su ID.
   * @param {number} pokemonId - El ID del Pokémon a añadir o quitar de favoritos.
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