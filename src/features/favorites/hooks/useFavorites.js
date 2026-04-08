import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "@/features/favorites";
import { pokemonApi } from "@/features/pokemon/api/pokemonApi";

/**
 * @hook useFavorites
 * @description
 * Fachada para interactuar con los favoritos. Ahora incluye la capacidad de
 * resolver los detalles de los Pokémon favoritos independientemente de la paginación.
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
     * Resuelve los detalles completos de todos los Pokémon marcados como favoritos.
     * Utiliza la capa de API optimizada con caché para evitar peticiones redundantes.
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
