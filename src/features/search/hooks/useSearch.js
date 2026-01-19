import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchFilter } from "@/features/search";

/**
 * @hook useSearch
 * @description
 * Un hook personalizado que actúa como una "Fachada" (Facade) para interactuar con el estado
 * de búsqueda en Redux (`searchSlice`).
 *
 * @details
 * Encapsula la lógica de acceso al estado de búsqueda:
 * 1.  **Selecciona el estado:** Usa `useSelector` para obtener el `searchFilter` actual.
 * 2.  **Abstrae acciones:** Expone una función `filterPokemons` que internamente despacha la
 *     acción `setSearchFilter`, ocultando la complejidad de `dispatch`.
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
    [dispatch]
  );

  return {
    searchFilter,
    filterPokemons,
  };
};