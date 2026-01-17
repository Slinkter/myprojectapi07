
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemons as fetchPokemonsThunk } from '@/features/pokemon/state/pokemonSlice';

/**
 * @typedef {import('@/features/pokemon/state/pokemonSlice').Pokemon} Pokemon
 */

/**
 * @typedef {object} PokemonState
 * @property {Pokemon[]} pokemons - La lista de Pokémon obtenida del estado de Redux.
 * @property {boolean} isLoading - Indica si la petición de Pokémon está en curso.
 * @property {boolean} isError - Indica si ha ocurrido un error durante la petición.
 * @property {string|null} error - El mensaje de error, si existe.
 * @property {number} totalCount - El número total de Pokémon disponibles en la API.
 * @property {function(): void} fetchPokemons - Función para disparar la carga de Pokémon para la página actual.
 */

/**
 * Hook personalizado para interactuar con el estado de Pokémon en Redux.
 * Su única responsabilidad es proporcionar acceso a los datos de Pokémon
 * y a la acción para cargarlos. No contiene lógica de filtrado,
 * paginación o favoritos.
 *
 * @returns {PokemonState} Un objeto con el estado y las acciones relacionadas con los Pokémon.
 */
export const usePokemon = () => {
  const dispatch = useDispatch();

  // Selecciona los datos crudos del slice de Pokémon
  const { pokemons, isLoading, isError, error, currentPage, itemsPerPage, totalCount } =
    useSelector((state) => state.pokemon);

  /**
   * Dispara el thunk `fetchPokemonsThunk` con los parámetros de paginación
   * actuales del estado de Redux.
   */
  const fetchPokemons = useCallback(() => {
    dispatch(fetchPokemonsThunk({ page: currentPage, limit: itemsPerPage }));
  }, [dispatch, currentPage, itemsPerPage]);

  return {
    pokemons,
    isLoading,
    isError,
    error,
    totalCount,
    fetchPokemons,
  };
};

