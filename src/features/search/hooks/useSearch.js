import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchFilter } from "@/features/search/state/searchSlice";

/**
 * Hook personalizado `useSearch`.
 *
 * **Funcionalidad:**
 * * Maneja el término de búsqueda global de la aplicación.
 * * Conecta la barra de búsqueda con el store de Redux.
 *
 * **Flujo de interacción / ejecución:**
 * 1. Se suscribe al valor `searchFilter` en el store.
 * 2. Expone `filterPokemons` que despacha la acción `setSearchFilter`.
 * 3. Cualquier cambio aquí afectará reactivamente a las listas que filtren por este término.
 *
 * **Estado y efectos secundarios:**
 * * Lectura/Escritura en `state.search.searchFilter`.
 *
 * @returns {{
 *   searchFilter: string,
 *   filterPokemons: (searchTerm: string) => void
 * }} Objeto con el filtro actual y función de actualización.
 */
export const useSearch = () => {
    const searchFilter = useSelector((state) => state.search.searchFilter);
    const dispatch = useDispatch();

    /**
     * Actualiza el filtro de búsqueda en el Store.
     *
     * @param {string} searchTerm - Nuevo término de búsqueda.
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
