import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemons as fetchPokemonsThunk } from "@/features/pokemon";
import { UI_CONSTANTS } from "@/utils/constants";

/**
 * @hook usePokemon
 * @description
 * Un hook personalizado que actúa como una "Fachada" (Facade) para interactuar con el estado
 * de Pokémon en Redux.
 *
 * @details
 * Encapsula toda la lógica de acceso al `pokemonSlice`:
 * 1.  **Selecciona el estado:** Usa `useSelector` para obtener `pokemons`, `isLoading`, `isError`, etc.
 * 2.  **Abstrae acciones:** Expone una función `fetchPokemons` que internamente despacha el `thunk`
 *     asíncrono correspondiente, ocultando la complejidad de `dispatch`.
 *
 * Esto desacopla los componentes de la implementación de Redux.
 *
 * @returns {{
 *   pokemons: Array<object>,
 *   isLoading: boolean,
 *   isError: boolean,
 *   error: string|null,
 *   totalCount: number,
 *   fetchPokemons: (params: { page: number, limit?: number }) => void
 * }} Un objeto con el estado y las acciones de la feature de Pokémon.
 */
export const usePokemon = () => {
  const dispatch = useDispatch();

  const { pokemons, isLoading, isError, error, totalCount } = useSelector(
    (state) => state.pokemon,
  );

  /**
   * Dispara el thunk para cargar los Pokémon de una página específica.
   * @type {({ page, limit }: { page: number, limit?: number }) => void}
   */
  const fetchPokemons = useCallback(
    ({ page, limit = UI_CONSTANTS.POKEMON_GRID.ITEMS_PER_PAGE }) => {
      dispatch(fetchPokemonsThunk({ page, limit }));
    },
    [dispatch],
  );

  return {
    pokemons,
    isLoading,
    isError,
    error,
    totalCount,
    fetchPokemons,
  };
};
