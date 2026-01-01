import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchFilter } from "@/features/search/state/searchSlice";

/**
 * Custom hook for managing the search functionality.
 * It provides access to the current search filter and a function to update it.
 *
 * @returns {{
 *   searchFilter: string,
 *   filterPokemons: (searchTerm: string) => void
 * }}
 */
export const useSearch = () => {
    const searchFilter = useSelector((state) => state.search.searchFilter);
    const dispatch = useDispatch();

    /**
     * Updates the search filter in the Redux store.
     * @param {string} searchTerm - The new search term.
     */
    const filterPokemons = useCallback(
        (searchTerm) => {
            dispatch(setSearchFilter(searchTerm));
        },
        [dispatch]
    );

    return {
        searchFilter,
        filterPokemons,
    };
};
