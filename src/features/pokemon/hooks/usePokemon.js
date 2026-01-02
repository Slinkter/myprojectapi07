import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchPokemons as fetchPokemonsThunk,
    setPage,
} from "@/features/pokemon/state/pokemonSlice";
import { useSearch } from "@/features/search";
import { useFavorites } from "@/features/favorites";

/**
 * @typedef {Object} Pokemon
 * @property {number} id - The ID of the Pokemon.
 * @property {string} name - The name of the Pokemon.
 * @property {Array<Object>} types - The types of the Pokemon.
 * @property {Object} sprites - The sprites of the Pokemon.
 * @property {boolean} favorite - Whether the Pokemon is marked as favorite.
 */

/**
 * Custom hook for managing Pokémon data, search, and favorites.
 * This hook integrates all logic to provide the final lists of Pokémon to the UI.
 */
export const usePokemon = () => {
    const dispatch = useDispatch();
    const {
        pokemons,
        isLoading,
        isError,
        error,
        currentPage,
        itemsPerPage,
        totalCount,
    } = useSelector((state) => state.pokemon);

    const { searchFilter } = useSearch();
    const { favoriteIds } = useFavorites();

    /**
     * Fetches the list of Pokémon for the current page.
     */
    const fetchPokemons = useCallback(async () => {
        dispatch(
            fetchPokemonsThunk({ page: currentPage, limit: itemsPerPage })
        );
    }, [dispatch, currentPage, itemsPerPage]);

    /**
     * Navigates to a specific page in the Pokémon list.
     */
    const goToPage = useCallback(
        (pageNumber) => {
            dispatch(setPage(pageNumber));
        },
        [dispatch]
    );

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    /**
     * Integrates favorite status into the Pokémon objects.
     */
    const processedPokemons = useMemo(() => {
        return pokemons.map((pokemon) => ({
            ...pokemon,
            favorite: favoriteIds.includes(pokemon.id),
        }));
    }, [pokemons, favoriteIds]);

    /**
     * Filters Pokémon based on the current search filter.
     */
    const filteredPokemons = useMemo(() => {
        if (!searchFilter) return processedPokemons;
        return processedPokemons.filter((p) =>
            p.name.toLowerCase().includes(searchFilter.toLowerCase())
        );
    }, [processedPokemons, searchFilter]);

    /**
     * Extracts only the favorite Pokémon from the currently loaded list.
     */
    const favoritePokemonsList = useMemo(
        () => processedPokemons.filter((p) => p.favorite),
        [processedPokemons]
    );

    return {
        pokemons: filteredPokemons, // Now returns filtered and processed list
        favoritePokemons: favoritePokemonsList,
        isLoading,
        isError,
        error,
        fetchPokemons,
        currentPage,
        itemsPerPage,
        totalCount,
        totalPages,
        goToPage,
    };
};
