import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchFilter } from "@/features/search";

/**
 * @hook usePokemonSearch
 * @description
 * Patrón Fachada: Aísla la sincronización del input de búsqueda con el estado global.
 * Desacopla el componente SearchBar de la acción de dispatcher de Redux.
 */
export const usePokemonSearch = () => {
    const searchFilter = useSelector((state) => state.search.searchFilter);
    const dispatch = useDispatch();

    const updateSearch = useCallback((term) => {
        dispatch(setSearchFilter(term));
    }, [dispatch]);

    return {
        searchFilter,
        updateSearch,
    };
};
