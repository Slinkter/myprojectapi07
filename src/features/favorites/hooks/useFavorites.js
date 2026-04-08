import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "@/features/favorites";
import { pokemonApi } from "@/features/pokemon/api/pokemonApi";

/**
 * @hook useFavorites
 * @description
 * Patrón Fachada: Centraliza el acceso a los favoritos y la resolución de entidades de dominio.
 * Separa la persistencia de localStorage y Redux de la representación visual.
 */
export const useFavorites = () => {
    const favoriteIds = useSelector((state) => state.favorites.favoriteIds);
    const dispatch = useDispatch();

    const togglePokemonFavorite = useCallback(
        (pokemonId) => {
            dispatch(toggleFavorite(pokemonId));
        },
        [dispatch],
    );

    /**
     * Resuelve los detalles de los Pokémon favoritos utilizando el caché de la API.
     * @returns {Promise<Array<import("@/lib/domainTypes").Pokemon>>}
     */
    const getFavoritePokemons = useCallback(async () => {
        try {
            const detailPromises = favoriteIds.map((id) => 
                pokemonApi.getPokemonDetails(id)
            );
            return await Promise.all(detailPromises);
        } catch (error) {
            console.error("SDR-01: Error resolving favorite pokemons", error);
            return [];
        }
    }, [favoriteIds]);

    return {
        favoriteIds,
        togglePokemonFavorite,
        getFavoritePokemons,
    };
};
