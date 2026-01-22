import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchFilter } from "@/features/search";

/**
 * @hook useSearch
 * @description
 * Un hook personalizado que actúa como una "Fachada" (Facade) para interactuar con el estado
 * de búsqueda en Redux (`searchSlice`).
 *
 * **Responsabilidades:**
 * 1.  **Selección de Estado:** Provee el término de búsqueda actual desde Redux.
 * 2.  **Abstracción de Acciones:** Expone `filterPokemons` para actualizar el filtro de búsqueda.
 *
 * **Efectos Secundarios:**
 * - `filterPokemons`: Despacha la acción `setSearchFilter` que actualiza el estado global de Redux.
 *
 * @returns {{
 *   searchFilter: string,
 *   filterPokemons: (searchTerm: string) => void
 * }} Un objeto que contiene el filtro de búsqueda actual y la función para actualizarlo.
 */
export const useSearch = () => {
    const searchFilter = useSelector((state) => state.search.searchFilter);
    const dispatch = useDispatch();

    /**
     * Actualiza el filtro de búsqueda en el store de Redux.
     * @param {string} searchTerm - El nuevo término de búsqueda.
     */
    const filterPokemons = useCallback(
        (searchTerm) => {
            dispatch(setSearchFilter(searchTerm));
        },
        [dispatch],
    );

    return {
        searchFilter,
        filterPokemons,
    };
};
