import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchFilter } from "../features/search/searchSlice";

export const useSearch = () => {
    const dispatch = useDispatch();
    const searchFilter = useSelector((state) => state.search.searchFilter);

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
