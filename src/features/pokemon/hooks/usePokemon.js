import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchPokemons as fetchPokemonsThunk,
    setPage,
} from "@/features/pokemon/state/pokemonSlice";

/**
 * @typedef {object} Pokemon
 * @property {number} id - The ID of the Pokemon.
 * @property {string} name - The name of the Pokemon.
 * @property {Array<object>} types - The types of the Pokemon.
 * @property {object} sprites - The sprites of the Pokemon.
 */

/**
 * Custom hook for managing Pokémon data.
 * This hook provides access to the Pokémon list, loading and error states,
 * and functions for fetching Pokémon and handling pagination.
 *
 * @returns {{
 *   pokemons: Pokemon[],
 *   isLoading: boolean,
 *   isError: boolean,
 *   error: string | null,
 *   fetchPokemons: () => Promise<void>,
 *   currentPage: number,
 *   itemsPerPage: number,
 *   totalCount: number,
 *   totalPages: number,
 *   goToPage: (pageNumber: number) => void
 * }}
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

    /**
     * Fetches the list of Pokémon for the current page.
     * @type {() => Promise<void>}
     */
    const fetchPokemons = useCallback(async () => {
        dispatch(
            fetchPokemonsThunk({ page: currentPage, limit: itemsPerPage })
        );
    }, [dispatch, currentPage, itemsPerPage]);

    /**
     * Navigates to a specific page in the Pokémon list.
     * @param {number} pageNumber - The page number to navigate to.
     */
    const goToPage = useCallback(
        (pageNumber) => {
            dispatch(setPage(pageNumber));
        },
        [dispatch]
    );

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    return {
        pokemons,
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
